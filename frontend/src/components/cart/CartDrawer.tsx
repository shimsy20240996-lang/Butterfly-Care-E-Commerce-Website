'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/context/cartStore';
import { useSettingsStore } from '@/context/settingsStore';
import { CartItemRow } from './CartItemRow';
import { formatLKR } from '@/lib/currency';
import { X, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer, items, getSubtotal } = useCartStore();
  const { settings } = useSettingsStore();

  const subtotal = getSubtotal();
  const freeShippingThreshold = settings.freeShippingThreshold || 7500;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (!isDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
          className="fixed inset-0 bg-butterfly-text/40 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FAF6F3] shadow-card flex flex-col justify-between border-l border-butterfly-border"
        >
          {/* Header */}
          <div className="p-5 border-b border-butterfly-border flex items-center justify-between bg-white/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-butterfly-primary" />
              <h3 className="font-serif text-lg font-semibold text-butterfly-text">
                Shopping Cart ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-full hover:bg-butterfly-soft text-butterfly-text transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-butterfly-soft/60 px-5 py-3 border-b border-butterfly-border/60">
              <div className="flex items-center justify-between text-xs font-medium text-butterfly-text mb-1.5">
                {remainingForFreeShipping === 0 ? (
                  <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Congratulations! You unlocked FREE Islandwide Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatLKR(remainingForFreeShipping)}</strong> more for <strong>FREE Delivery</strong>
                  </span>
                )}
                <span className="text-[11px] text-butterfly-textMuted">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-butterfly-primary transition-all duration-500 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List / Empty State */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-butterfly-soft flex items-center justify-center">
                  <ShoppingBag className="w-9 h-9 text-butterfly-primary/70" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-butterfly-text">
                    Your cart is waiting
                  </h4>
                  <p className="text-xs text-butterfly-textMuted mt-1 max-w-xs">
                    Your little one&apos;s cart is waiting for something special. Explore our gentle mother and baby essentials.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeDrawer}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-soft"
                >
                  <span>Start Exploring</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-1">
                {items.map((item, idx) => (
                  <CartItemRow
                    key={`${item.product}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                    item={item}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer with Subtotal & Checkout CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-butterfly-border bg-white/80 space-y-3">
              <div className="space-y-1.5 text-xs text-butterfly-text">
                <div className="flex items-center justify-between text-butterfly-textMuted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-butterfly-text text-sm">{formatLKR(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-butterfly-textMuted">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full py-3.5 rounded-2xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase text-center transition-all shadow-card flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="w-full py-2.5 rounded-2xl bg-butterfly-soft/60 hover:bg-butterfly-soft text-butterfly-text text-xs font-semibold text-center transition-colors"
                >
                  View Full Cart & Apply Coupon
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
