'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Check, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { formatLKR } from '@/lib/currency';
import { useCartStore } from '@/context/cartStore';
import { useToastStore } from '@/context/toastStore';

interface QuickVariantModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickVariantModal: React.FC<QuickVariantModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { addItem, openDrawer } = useCartStore();
  const { showToast } = useToastStore();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Initialize defaults whenever product opens
  React.useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else {
        setSelectedSize('');
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      } else {
        setSelectedColor('');
      }
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const currentPrice = product.discountPrice || product.price;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      showToast('Please select a size.', 'error');
      return;
    }

    addItem({
      product: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: currentPrice,
      originalPrice: product.discountPrice ? product.price : undefined,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
      sku: product.sku,
      maxStock: product.stock
    });

    onClose();
    showToast(`Added ${quantity}x "${product.name}" to your cart ✓`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#3F4650]/40 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-md bg-[#FFFDF9] rounded-3xl p-6 shadow-2xl border border-[#E9E9E9]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#747A82] hover:text-[#3F4650] rounded-full hover:bg-black/5"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Product Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white border border-[#E9E9E9] shrink-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <h3 className="font-serif text-base font-bold text-[#3F4650] line-clamp-1">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-base font-bold text-[#3F4650]">
                  {formatLKR(currentPrice)}
                </span>
                {product.discountPrice && (
                  <span className="text-xs text-[#747A82] line-through">
                    {formatLKR(product.price)}
                  </span>
                )}
              </div>
              <span className="inline-block text-[11px] text-[#747A82] mt-0.5">
                SKU: {product.sku}
              </span>
            </div>
          </div>

          {/* Size Selectors */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F4650] mb-2">
                Select Size: <span className="text-[#747A82] font-normal">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-[#3F4650] text-white shadow-sm'
                          : 'bg-white text-[#3F4650] border border-[#E9E9E9] hover:border-[#3F4650]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Color Selectors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3F4650] mb-2">
                Select Color: <span className="text-[#747A82] font-normal">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((col) => {
                  const isSelected = selectedColor === col;
                  return (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#F9DDE5] text-[#3F4650] border border-[#E8A6B8] font-bold'
                          : 'bg-white text-[#747A82] border border-[#E9E9E9] hover:text-[#3F4650]'
                      }`}
                    >
                      {col}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between py-3 border-t border-b border-[#E9E9E9] mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3F4650]">
              Quantity
            </span>
            <div className="flex items-center gap-3 bg-white border border-[#E9E9E9] rounded-full px-3 py-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 text-[#747A82] hover:text-[#3F4650]"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-xs font-bold text-[#3F4650]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-1 text-[#747A82] hover:text-[#3F4650]"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-3.5 rounded-full bg-[#3F4650] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5A4945] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ADD TO CART • {formatLKR(currentPrice * quantity)}</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
