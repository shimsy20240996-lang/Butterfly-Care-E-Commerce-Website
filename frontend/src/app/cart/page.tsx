'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/context/cartStore';
import { useSettingsStore } from '@/context/settingsStore';
import { useToastStore } from '@/context/toastStore';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { formatLKR } from '@/lib/currency';
import { api } from '@/lib/api';
import { ShoppingBag, ArrowRight, Tag, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const { items, getSubtotal, appliedCoupon, applyCoupon, removeCoupon, clearCart } = useCartStore();
  const { settings } = useSettingsStore();
  const { showToast } = useToastStore();

  const [couponCode, setCouponCode] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const subtotal = getSubtotal();
  const freeThreshold = settings.freeShippingThreshold || 7500;
  const remainingForFreeShipping = Math.max(0, freeThreshold - subtotal);
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    try {
      setIsValidatingCoupon(true);
      const data = await api.post<{
        success: boolean;
        valid: boolean;
        code: string;
        discount: number;
        discountType: string;
        message: string;
      }>('/coupons/validate', { code: couponCode, subtotal });

      if (data && data.valid) {
        applyCoupon({
          code: data.code,
          discount: data.discount,
          discountType: data.discountType
        });
        showToast(data.message || 'Coupon applied successfully!');
        setCouponCode('');
      }
    } catch (err: any) {
      showToast(err.message || 'Invalid coupon code.', 'error');
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F3EF] px-4 py-16">
        <div className="max-w-md w-full text-center bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-butterfly-border shadow-soft space-y-4">
          <div className="w-20 h-20 rounded-full bg-butterfly-soft flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10 text-butterfly-primary/70" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-butterfly-text">
            Your Cart is Waiting
          </h2>
          <p className="text-xs sm:text-sm text-butterfly-textMuted leading-relaxed">
            Your little one&apos;s cart is waiting for something special. Explore our gentle mother and baby essentials.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-card"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EF] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-butterfly-border">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text">
            Shopping Cart ({items.reduce((sum, i) => sum + i.quantity, 0)} Items)
          </h1>
          <button
            onClick={clearCart}
            className="text-xs text-rose-500 hover:text-rose-700 font-semibold transition-colors"
          >
            Clear Entire Cart
          </button>
        </div>

        {/* Free Shipping Alert */}
        <div className="mb-8 p-4 rounded-2xl bg-white/80 border border-butterfly-border flex items-center gap-3">
          <Truck className="w-5 h-5 text-butterfly-primary shrink-0" />
          <div className="flex-1 text-xs text-butterfly-text">
            {remainingForFreeShipping === 0 ? (
              <span className="font-semibold text-emerald-700">
                You have qualified for FREE Islandwide Delivery across Sri Lanka!
              </span>
            ) : (
              <span>
                Add <strong>{formatLKR(remainingForFreeShipping)}</strong> more to unlock <strong>FREE Islandwide Delivery</strong>!
              </span>
            )}
          </div>
        </div>

        {/* Layout: Items Table + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft">
            <div className="divide-y divide-butterfly-border/60">
              {items.map((item, idx) => (
                <CartItemRow key={`${item.product}-${item.selectedSize}-${idx}`} item={item} />
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-butterfly-border flex justify-between items-center">
              <Link
                href="/shop"
                className="text-xs font-bold text-butterfly-primary hover:text-butterfly-primaryHover uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coupon Box */}
            <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft space-y-3">
              <h3 className="font-serif text-sm font-semibold text-butterfly-text flex items-center gap-2">
                <Tag className="w-4 h-4 text-butterfly-primary" />
                <span>Promotional Coupon</span>
              </h3>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div>
                    <span className="font-bold text-emerald-800">{appliedCoupon.code}</span>
                    <span className="text-emerald-700 block text-[11px]">
                      Savings: -{formatLKR(appliedCoupon.discount)}
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="e.g. WELCOME10"
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary font-mono uppercase"
                  />
                  <button
                    type="submit"
                    disabled={isValidatingCoupon || !couponCode.trim()}
                    className="px-4 py-2.5 rounded-xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {isValidatingCoupon ? '...' : 'Apply'}
                  </button>
                </form>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft space-y-4">
              <h3 className="font-serif text-base font-semibold text-butterfly-text pb-3 border-b border-butterfly-border">
                Order Summary
              </h3>

              <div className="space-y-2.5 text-xs text-butterfly-text">
                <div className="flex justify-between">
                  <span className="text-butterfly-textMuted">Subtotal</span>
                  <span className="font-semibold">{formatLKR(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{formatLKR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-butterfly-textMuted">
                  <span>Estimated Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-3 border-t border-butterfly-border flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-butterfly-text">Total</span>
                <span className="font-serif text-xl font-bold text-butterfly-text">
                  {formatLKR(total)}
                </span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 rounded-2xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase text-center transition-all shadow-card flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
