import { Request, Response } from 'express';
import { store, InMemoryCoupon } from '../config/store';

// @desc    Validate coupon code at checkout
// @route   POST /api/coupons/validate
export const validateCoupon = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, subtotal = 0 } = req.body;

    if (!code) {
      res.status(400).json({ success: false, message: 'Please enter a coupon code.' });
      return;
    }

    const coupon = store.coupons.find(c => c.code.toUpperCase() === code.toUpperCase().trim());

    if (!coupon || !coupon.active) {
      res.status(404).json({ success: false, message: 'Invalid or inactive coupon code.' });
      return;
    }

    if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
      res.status(400).json({
        success: false,
        message: `This coupon requires a minimum order value of Rs. ${coupon.minOrderValue.toLocaleString()}.`
      });
      return;
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    res.status(200).json({
      success: true,
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discount,
      message: `Coupon "${coupon.code}" applied! You save Rs. ${discount.toLocaleString()}.`
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
export const getCouponsAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      count: store.coupons.length,
      coupons: store.coupons
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new coupon (Admin)
// @route   POST /api/coupons
export const createCouponAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, discountType, discountValue, minOrderValue, maxDiscount, usageLimit, active } = req.body;

    if (!code || !discountType || discountValue === undefined) {
      res.status(400).json({ success: false, message: 'Code, discount type and discount value are required.' });
      return;
    }

    const cleanCode = code.toUpperCase().trim();
    if (store.coupons.some(c => c.code === cleanCode)) {
      res.status(400).json({ success: false, message: 'A coupon with this code already exists.' });
      return;
    }

    const newCoupon: InMemoryCoupon = {
      _id: `coup-${Date.now()}`,
      code: cleanCode,
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue) || 0,
      maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
      usageLimit: usageLimit ? Number(usageLimit) : undefined,
      usedCount: 0,
      active: active !== undefined ? Boolean(active) : true,
      createdAt: new Date().toISOString()
    };

    store.coupons.unshift(newCoupon);

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully!',
      coupon: newCoupon
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update coupon (Admin)
// @route   PUT /api/coupons/:id
export const updateCouponAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const coupon = store.coupons.find(c => c._id === id);

    if (!coupon) {
      res.status(404).json({ success: false, message: 'Coupon not found.' });
      return;
    }

    const { discountValue, minOrderValue, maxDiscount, active, usageLimit } = req.body;

    if (discountValue !== undefined) coupon.discountValue = Number(discountValue);
    if (minOrderValue !== undefined) coupon.minOrderValue = Number(minOrderValue);
    if (maxDiscount !== undefined) coupon.maxDiscount = Number(maxDiscount);
    if (usageLimit !== undefined) coupon.usageLimit = Number(usageLimit);
    if (active !== undefined) coupon.active = Boolean(active);

    res.status(200).json({
      success: true,
      message: 'Coupon updated successfully!',
      coupon
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete coupon (Admin)
// @route   DELETE /api/coupons/:id
export const deleteCouponAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const index = store.coupons.findIndex(c => c._id === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: 'Coupon not found.' });
      return;
    }

    store.coupons.splice(index, 1);

    res.status(200).json({
      success: true,
      message: 'Coupon deleted successfully.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
