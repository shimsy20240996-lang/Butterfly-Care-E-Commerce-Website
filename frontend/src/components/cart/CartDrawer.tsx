'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/context/cartStore';
import { formatLKR } from '@/lib/currency';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const { isDrawerOpen, closeDrawer, items, updateQuantity, removeItem, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

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
          className="fixed inset-0 bg-[#454545]/40 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="fixed inset-y-0 right-0 w-full max-w-md bg-[#FFFDFB] shadow-2xl flex flex-col justify-between border-l border-[#EFEAE6]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EFEAE6] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4F7FA0]" />
              <h3 className="font-serif text-lg font-bold text-[#454545]">
                Your Cart ({totalItems})
              </h3>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-full hover:bg-black/5 text-[#7A7A7A] hover:text-[#454545] transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E5F4FC] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-[#4F7FA0]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#454545]">
                    Your Cart is Empty
                  </h4>
                  <p className="text-xs text-[#7A7A7A] mt-1">
                    Explore our gentle essentials for you and your little one.
                  </p>
                </div>
                <Link
                  href="/products"
                  onClick={closeDrawer}
                  className="px-6 py-2.5 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-soft"
                >
                  START SHOPPING
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={`${item.product}-${idx}`}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#EFEAE6]"
                  >
                    {/* Image */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FFFDFB] shrink-0 border border-[#EFEAE6]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#454545] truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-[#4F7FA0] mt-0.5">
                        {formatLKR(item.price)}
                      </p>

                      {/* Quantity Stepper: − 1 + */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-[#EFEAE6] rounded-lg bg-[#FFFDFB]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product, item.quantity - 1, item.selectedSize, item.selectedColor)}
                            className="p-1 hover:bg-black/5 text-[#454545] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-[#454545]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            className="p-1 hover:bg-black/5 text-[#454545] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.product, item.selectedSize, item.selectedColor)}
                          className="p-1 text-[#7A7A7A] hover:text-rose-500 transition-colors ml-auto"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Subtotal & Checkout Button */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EFEAE6] bg-white space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#7A7A7A]">Subtotal</span>
                <span className="font-bold text-[#454545] text-base">{formatLKR(subtotal)}</span>
              </div>

              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full py-3.5 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold tracking-wider uppercase text-center transition-all shadow-soft flex items-center justify-center gap-2 active:scale-95"
              >
                <span>CHECKOUT • {formatLKR(subtotal)}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
