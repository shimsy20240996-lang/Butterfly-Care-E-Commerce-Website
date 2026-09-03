import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { store, InMemoryOrder } from '../config/store';
import { AuthRequest } from '../middleware/auth';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Coupon } from '../models/Coupon';
import { generateWhatsAppOrderMessage } from '../utils/whatsapp';

// @desc    Create new customer order (Supports Guest & Logged-in user)
// @route   POST /api/orders
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      customerDetails,
      deliveryAddress,
      items,
      deliveryType = 'standard',
      paymentMethod = 'cash_on_delivery',
      couponCode,
      notes
    } = req.body;

    // 1. Validate Customer Details & Delivery Address (Never allow empty or default dummy records)
    if (
      !customerDetails ||
      !customerDetails.fullName?.trim() ||
      !customerDetails.phone?.trim() ||
      !deliveryAddress ||
      !deliveryAddress.addressLine?.trim() ||
      !deliveryAddress.city?.trim() ||
      !deliveryAddress.district?.trim()
    ) {
      res.status(400).json({
        success: false,
        message: 'Please complete all required delivery details.'
      });
      return;
    }

    // 3. Validate Cart Items
    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, message: 'Cart items are required to place an order.' });
      return;
    }

    // 4. Validate Products, Stock & Calculate Subtotal from Server-Side Database
    const isMongoConnected = mongoose.connection.readyState === 1;
    let subtotal = 0;
    const validatedItems: any[] = [];

    for (const item of items) {
      const itemQty = Math.max(1, Math.floor(Number(item.quantity)) || 1);
      let prod: any = null;

      // Retrieve product from MongoDB if connected, else fallback to store
      if (isMongoConnected) {
        if (mongoose.isValidObjectId(item.product)) {
          prod = await Product.findById(item.product);
        }
        if (!prod && item.slug) {
          prod = await Product.findOne({ slug: item.slug });
        }
      }

      if (!prod) {
        prod = store.products.find(p => p._id === item.product || p.slug === item.slug);
      }

      if (!prod) {
        res.status(400).json({
          success: false,
          message: `Product "${item.name || item.slug || 'Unknown'}" was not found or is unavailable.`
        });
        return;
      }

      // Check stock
      if (prod.stock !== undefined && prod.stock < itemQty) {
        res.status(400).json({
          success: false,
          message: `Sorry, "${prod.name}" has only ${prod.stock} items left in stock.`
        });
        return;
      }

      // Server-side current price verification (Never trust frontend submitted price)
      const unitPrice = (prod.discountPrice && prod.discountPrice > 0 && prod.discountPrice < prod.price)
        ? prod.discountPrice
        : prod.price;

      subtotal += unitPrice * itemQty;

      // Deduct stock in MongoDB and store
      if (isMongoConnected && prod._id && mongoose.isValidObjectId(prod._id)) {
        await Product.findByIdAndUpdate(prod._id, { $inc: { stock: -itemQty } });
      }
      if (prod.stock !== undefined) {
        prod.stock = Math.max(0, prod.stock - itemQty);
      }

      if (isMongoConnected) {
        const matchingStoreProd = store.products.find(p => p.slug === prod.slug || p._id === prod._id);
        if (matchingStoreProd && matchingStoreProd !== prod && matchingStoreProd.stock !== undefined) {
          matchingStoreProd.stock = Math.max(0, matchingStoreProd.stock - itemQty);
        }
      }

      validatedItems.push({
        product: prod._id ? String(prod._id) : String(item.product),
        name: prod.name,
        slug: prod.slug,
        image: prod.images && prod.images.length > 0 ? prod.images[0] : (item.image || ''),
        price: unitPrice,
        quantity: itemQty,
        selectedSize: item.selectedSize?.trim() || '',
        selectedColor: item.selectedColor?.trim() || '',
        sku: prod.sku || item.sku || ''
      });
    }

    // 5. Calculate Delivery Fee based on District and Free Shipping Threshold
    let deliveryFee = store.settings.defaultDeliveryFee || 450;
    const districtMatch = store.settings.districtDeliveryFees.find(
      d => d.district.toLowerCase() === deliveryAddress.district.trim().toLowerCase()
    );
    if (districtMatch) {
      deliveryFee = districtMatch.fee;
    }

    if (deliveryType === 'express') {
      deliveryFee += (store.settings.expressDeliveryFee - store.settings.defaultDeliveryFee);
    }

    if (subtotal >= store.settings.freeShippingThreshold) {
      deliveryFee = 0;
    }

    // 6. Apply Coupon if provided
    let discount = 0;
    let validatedCouponCode: string | undefined = undefined;
    if (couponCode && typeof couponCode === 'string' && couponCode.trim()) {
      const codeUpper = couponCode.trim().toUpperCase();
      let coupon: any = null;

      if (isMongoConnected) {
        coupon = await Coupon.findOne({ code: codeUpper, active: true });
      }
      if (!coupon) {
        coupon = store.coupons.find(c => c.code.toUpperCase() === codeUpper && c.active);
      }

      if (coupon && subtotal >= (coupon.minOrderValue || 0)) {
        if (coupon.discountType === 'percentage') {
          discount = Math.round((subtotal * coupon.discountValue) / 100);
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }

        if (isMongoConnected && coupon._id && mongoose.isValidObjectId(coupon._id)) {
          await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } });
        }
        if (coupon.usedCount !== undefined) {
          coupon.usedCount += 1;
        }
        validatedCouponCode = codeUpper;
      }
    }

    const total = Math.max(0, subtotal + deliveryFee - discount);

    // 7. Generate Unique Sequential Order Number (Format: BC-1001, BC-1002, BC-1025)
    let orderNumber = store.generateOrderNumber();
    if (isMongoConnected) {
      try {
        const lastOrders = await Order.find({ orderNumber: /^BC-\d+$/ }).sort({ createdAt: -1 }).limit(10);
        let highest = 1000;
        for (const o of lastOrders) {
          const m = o.orderNumber?.match(/^BC-(\d+)$/i);
          if (m) {
            const val = parseInt(m[1], 10);
            if (!isNaN(val) && val > highest) highest = val;
          }
        }
        for (const o of store.orders) {
          const m = o.orderNumber?.match(/^BC-(\d+)$/i);
          if (m) {
            const val = parseInt(m[1], 10);
            if (!isNaN(val) && val > highest) highest = val;
          }
        }
        orderNumber = `BC-${highest + 1}`;
      } catch (err) {
        console.warn('[Order] Could not fetch latest MongoDB order number, using generator:', err);
      }
    }

    const createdAtIso = new Date().toISOString();

    const orderData = {
      orderNumber,
      user: req.user ? req.user.id : undefined,
      customerDetails: {
        fullName: customerDetails.fullName.trim(),
        email: customerDetails.email ? customerDetails.email.trim() : '',
        phone: customerDetails.phone.trim()
      },
      deliveryAddress: {
        addressLine: deliveryAddress.addressLine.trim(),
        city: deliveryAddress.city.trim(),
        district: deliveryAddress.district.trim(),
        postalCode: deliveryAddress.postalCode ? deliveryAddress.postalCode.trim() : ''
      },
      items: validatedItems,
      subtotal,
      deliveryFee,
      discount,
      couponCode: validatedCouponCode,
      total,
      paymentMethod,
      paymentStatus: 'pending' as const,
      deliveryType,
      status: 'Pending' as const,
      timeline: [
        {
          status: 'Order Placed',
          timestamp: createdAtIso,
          note: `Order received via ${paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Bank Transfer'}.`
        }
      ],
      notes: notes || '',
      whatsappOpened: false,
      whatsappMessage: '',
      whatsappUrl: '',
      createdAt: createdAtIso,
      updatedAt: createdAtIso
    };

    // Generate authoritative WhatsApp message and Click-to-Chat URL from this exact order snapshot
    const { rawMessage, whatsappUrl } = generateWhatsAppOrderMessage(orderData);
    orderData.whatsappMessage = rawMessage;
    orderData.whatsappUrl = whatsappUrl;

    let savedMongoOrder: any = null;
    if (isMongoConnected) {
      try {
        // Map items to valid MongoDB format
        const mongoItems = validatedItems.map(i => ({
          ...i,
          product: mongoose.isValidObjectId(i.product) ? new mongoose.Types.ObjectId(i.product) : new mongoose.Types.ObjectId()
        }));

        savedMongoOrder = await Order.create({
          ...orderData,
          user: req.user && mongoose.isValidObjectId(req.user.id) ? new mongoose.Types.ObjectId(req.user.id) : null,
          items: mongoItems,
          timeline: [
            {
              status: 'Order Placed',
              timestamp: new Date(),
              note: `Order received via ${paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Bank Transfer'}.`
            }
          ]
        });
      } catch (mongoErr: any) {
        console.error('[Order] MongoDB Order.create error:', mongoErr);
      }
    }

    const finalOrder: InMemoryOrder = {
      _id: savedMongoOrder ? String(savedMongoOrder._id) : `ord-${Date.now()}`,
      ...orderData
    };

    store.orders.unshift(finalOrder);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your order has been placed successfully.',
      order: finalOrder,
      whatsappUrl: finalOrder.whatsappUrl,
      whatsappMessage: finalOrder.whatsappMessage
    });
  } catch (error: any) {
    console.error('[Order Error]', error);
    res.status(500).json({
      success: false,
      message: "Sorry, we couldn't place your order. Please try again."
    });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Not authorized.' });
      return;
    }

    const isMongoConnected = mongoose.connection.readyState === 1;
    if (isMongoConnected && mongoose.isValidObjectId(req.user.id)) {
      const mongoOrders = await Order.find({
        $or: [
          { user: req.user.id },
          { 'customerDetails.email': req.user.email?.toLowerCase() }
        ]
      }).sort({ createdAt: -1 });

      if (mongoOrders.length > 0) {
        res.status(200).json({
          success: true,
          count: mongoOrders.length,
          orders: mongoOrders
        });
        return;
      }
    }

    const userOrders = store.orders.filter(
      o => o.user === req.user?.id || (req.user?.email && o.customerDetails.email.toLowerCase() === req.user?.email.toLowerCase())
    );

    res.status(200).json({
      success: true,
      count: userOrders.length,
      orders: userOrders
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get order by Order Number (Public Tracking)
// @route   GET /api/orders/track/:orderNumber
export const getOrderByNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderNumber } = req.params;
    const cleanNum = orderNumber.toUpperCase().trim();

    const isMongoConnected = mongoose.connection.readyState === 1;
    if (isMongoConnected) {
      const mongoOrder = await Order.findOne({ orderNumber: cleanNum });
      if (mongoOrder) {
        res.status(200).json({ success: true, order: mongoOrder });
        return;
      }
    }

    const order = store.orders.find(o => o.orderNumber.toUpperCase() === cleanNum);
    if (!order) {
      res.status(404).json({ success: false, message: 'No order found with this Order Number.' });
      return;
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single order by ID or Order Number
// @route   GET /api/orders/:id
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cleanId = id.trim();

    const isMongoConnected = mongoose.connection.readyState === 1;
    if (isMongoConnected) {
      const isObjectId = mongoose.isValidObjectId(cleanId);
      const mongoOrder = await Order.findOne({
        $or: [
          ...(isObjectId ? [{ _id: cleanId }] : []),
          { orderNumber: cleanId.toUpperCase() }
        ]
      });

      if (mongoOrder) {
        res.status(200).json({ success: true, order: mongoOrder });
        return;
      }
    }

    const order = store.orders.find(
      o => o._id === cleanId || o.orderNumber.toUpperCase() === cleanId.toUpperCase()
    );

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark WhatsApp opened for an order
// @route   PUT /api/orders/:id/whatsapp-opened
export const markWhatsAppOpened = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cleanId = id.trim();

    const isMongoConnected = mongoose.connection.readyState === 1;
    if (isMongoConnected) {
      const isObjectId = mongoose.isValidObjectId(cleanId);
      await Order.findOneAndUpdate(
        {
          $or: [
            ...(isObjectId ? [{ _id: cleanId }] : []),
            { orderNumber: cleanId.toUpperCase() }
          ]
        },
        { whatsappOpened: true }
      );
    }

    const order = store.orders.find(
      o => o._id === cleanId || o.orderNumber.toUpperCase() === cleanId.toUpperCase()
    );
    if (order) {
      order.whatsappOpened = true;
    }

    res.status(200).json({ success: true, message: 'WhatsApp click recorded.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
export const getAllOrdersAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    let orders = [...store.orders];

    const { status, search, paymentStatus } = req.query;

    if (status && status !== 'all') {
      orders = orders.filter(o => o.status.toLowerCase() === (status as string).toLowerCase());
    }

    if (paymentStatus && paymentStatus !== 'all') {
      orders = orders.filter(o => o.paymentStatus.toLowerCase() === (paymentStatus as string).toLowerCase());
    }

    if (search) {
      const q = (search as string).toLowerCase();
      orders = orders.filter(
        o =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerDetails.fullName.toLowerCase().includes(q) ||
          o.customerDetails.phone.toLowerCase().includes(q) ||
          o.customerDetails.email.toLowerCase().includes(q)
      );
    }

    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
export const updateOrderStatusAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, note, paymentStatus } = req.body;

    const isMongoConnected = mongoose.connection.readyState === 1;
    if (isMongoConnected) {
      const isObjectId = mongoose.isValidObjectId(id);
      const updateData: any = {};
      if (status) updateData.status = status;
      if (paymentStatus) updateData.paymentStatus = paymentStatus;

      await Order.findOneAndUpdate(
        {
          $or: [
            ...(isObjectId ? [{ _id: id }] : []),
            { orderNumber: id.toUpperCase() }
          ]
        },
        {
          ...updateData,
          ...(status ? {
            $push: {
              timeline: {
                status,
                timestamp: new Date(),
                note: note || `Status updated to ${status} by admin.`
              }
            }
          } : {})
        }
      );
    }

    const orderIndex = store.orders.findIndex(
      o => o._id === id || o.orderNumber.toUpperCase() === id.toUpperCase()
    );
    if (orderIndex === -1) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    const order = store.orders[orderIndex];

    if (status && status !== order.status) {
      order.status = status;
      order.timeline.push({
        status,
        timestamp: new Date().toISOString(),
        note: note || `Status updated to ${status} by admin.`
      });
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    order.updatedAt = new Date().toISOString();
    store.orders[orderIndex] = order;

    res.status(200).json({
      success: true,
      message: `Order status updated to ${order.status}.`,
      order
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
