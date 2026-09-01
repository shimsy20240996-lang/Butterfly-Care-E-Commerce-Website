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
  const totalItemCount = items.reduce((sum, i) => sum + i.quantity, 0);
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
          className="fixed inset-0 bg-[#3F4650]/40 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col justify-between border-l border-[#E9E9E9]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#E9E9E9] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg font-bold text-[#3F4650] flex items-center gap-2">
                <span>Your Little Cart 🛒</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F9DDE5] text-[#3F4650] font-sans font-bold">
                  {totalItemCount}
                </span>
              </h3>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-full hover:bg-black/5 text-[#747A82] hover:text-[#3F4650] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-[#F3FAFE] px-5 py-3 border-b border-[#E9E9E9]">
              <div className="flex items-center justify-between text-xs font-medium text-[#3F4650] mb-1.5">
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
                <span className="text-[11px] text-[#747A82] font-bold">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8EC5E8] transition-all duration-500 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List / Empty State */}
          <div className="flex-1 overflow-y-auto p-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#FFF5F7] flex items-center justify-center">
                  <ShoppingBag className="w-9 h-9 text-[#E8A6B8]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#3F4650]">
                    Your Little Cart is Empty
                  </h4>
                  <p className="text-xs text-[#747A82] mt-1.5 max-w-xs leading-relaxed">
                    Explore our gentle essentials thoughtfully chosen for mothers and little ones.
                  </p>
                </div>
                <Link
                  href="/products"
                  onClick={closeDrawer}
                  className="mt-2 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#3F4650] hover:bg-[#5A4945] text-white text-xs font-bold tracking-wider uppercase transition-colors shadow-sm"
                >
                  <span>SHOP OUR PRODUCTS</span>
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
            <div className="p-5 border-t border-[#E9E9E9] bg-white space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#747A82]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#3F4650] text-base">{formatLKR(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#747A82]">
                  <span>Delivery</span>
                  <span className="text-[#3F4650]">Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full py-3.5 rounded-full bg-[#3F4650] hover:bg-[#5A4945] text-white text-xs font-bold tracking-wider uppercase text-center transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>CHECKOUT • {formatLKR(subtotal)}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="w-full py-2.5 rounded-full bg-[#FFFDF9] hover:bg-[#F9DDE5]/40 text-[#3F4650] border border-[#E9E9E9] text-xs font-bold tracking-wider uppercase text-center transition-colors"
                >
                  VIEW CART
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
