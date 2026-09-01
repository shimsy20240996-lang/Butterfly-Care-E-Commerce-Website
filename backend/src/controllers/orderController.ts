import { Request, Response } from 'express';
import { store, InMemoryOrder } from '../config/store';
import { AuthRequest } from '../middleware/auth';

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

    if (!customerDetails || !customerDetails.fullName || !customerDetails.phone) {
      res.status(400).json({ success: false, message: 'Please provide customer name and phone number.' });
      return;
    }

    if (!deliveryAddress || !deliveryAddress.addressLine || !deliveryAddress.district || !deliveryAddress.city) {
      res.status(400).json({ success: false, message: 'Please provide complete delivery address and district.' });
      return;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, message: 'Cart items are required to place an order.' });
      return;
    }

    // Calculate item pricing and verify items
    let subtotal = 0;
    const validatedItems = items.map((item: any) => {
      const prod = store.products.find(p => p._id === item.product || p.slug === item.slug);
      const unitPrice = prod ? (prod.discountPrice || prod.price) : Number(item.price);
      const itemQty = Math.max(1, Number(item.quantity) || 1);
      subtotal += unitPrice * itemQty;

      // Adjust stock
      if (prod && prod.stock >= itemQty) {
        prod.stock -= itemQty;
      }

      return {
        product: prod ? prod._id : item.product,
        name: prod ? prod.name : item.name,
        slug: prod ? prod.slug : item.slug,
        image: prod && prod.images.length > 0 ? prod.images[0] : item.image,
        price: unitPrice,
        quantity: itemQty,
        selectedSize: item.selectedSize || '',
        selectedColor: item.selectedColor || '',
        sku: prod ? prod.sku : (item.sku || '')
      };
    });

    // Calculate delivery fee
    let deliveryFee = store.settings.defaultDeliveryFee;
    const districtMatch = store.settings.districtDeliveryFees.find(
      d => d.district.toLowerCase() === deliveryAddress.district.toLowerCase()
    );
    if (districtMatch) {
      deliveryFee = districtMatch.fee;
    }

    // Express delivery surcharge
    if (deliveryType === 'express') {
      deliveryFee += (store.settings.expressDeliveryFee - store.settings.defaultDeliveryFee);
    }

    // Free shipping check
    if (subtotal >= store.settings.freeShippingThreshold) {
      deliveryFee = 0;
    }

    // Apply Coupon if provided
    let discount = 0;
    if (couponCode) {
      const coupon = store.coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.active);
      if (coupon && subtotal >= coupon.minOrderValue) {
        if (coupon.discountType === 'percentage') {
          discount = Math.round((subtotal * coupon.discountValue) / 100);
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discountValue;
        }
        coupon.usedCount += 1;
      }
    }

    const total = Math.max(0, subtotal + deliveryFee - discount);
    const orderNumber = store.generateOrderNumber();

    const newOrder: InMemoryOrder = {
      _id: `ord-${Date.now()}`,
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
      couponCode: couponCode ? couponCode.toUpperCase() : undefined,
      total,
      paymentMethod,
      paymentStatus: 'pending',
      deliveryType,
      status: 'Pending',
      timeline: [
        {
          status: 'Order Placed',
          timestamp: new Date().toISOString(),
          note: `Order received via ${paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Bank Transfer'}.`
        }
      ],
      notes: notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.orders.unshift(newOrder);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your order has been placed successfully.',
      order: newOrder
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
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
    const order = store.orders.find(o => o.orderNumber.toUpperCase() === orderNumber.toUpperCase().trim());

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

// @desc    Get single order by ID
// @route   GET /api/orders/:id
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = store.orders.find(o => o._id === id || o.orderNumber === id);

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

    const orderIndex = store.orders.findIndex(o => o._id === id || o.orderNumber === id);
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
