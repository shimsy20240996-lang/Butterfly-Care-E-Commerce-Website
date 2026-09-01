'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { useCartStore } from '@/context/cartStore';
import { formatLKR } from '@/lib/currency';

interface CartItemRowProps {
  item: CartItem;
  compact?: boolean;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item, compact = false }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-3.5 py-3 border-b border-butterfly-border/60 last:border-0 group">
      {/* Thumbnail */}
      <Link
        href={`/product/${item.slug}`}
        className={`relative ${compact ? 'w-16 h-16' : 'w-20 h-20'} rounded-2xl overflow-hidden bg-butterfly-soft shrink-0 border border-butterfly-border/80`}
      >
        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
      </Link>

      {/* Info & Quantity */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${item.slug}`}
          className="text-xs md:text-sm font-medium text-butterfly-text hover:text-butterfly-primary line-clamp-1 transition-colors"
        >
          {item.name}
        </Link>

        {/* Variants */}
        {(item.selectedSize || item.selectedColor) && (
          <div className="flex items-center gap-2 text-[11px] text-butterfly-textMuted mt-0.5">
            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
            {item.selectedSize && item.selectedColor && <span>•</span>}
            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
          </div>
        )}

        {/* Price & Quantity Controls */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center border border-butterfly-border rounded-xl bg-white/80 overflow-hidden shadow-sm">
            <button
              onClick={() => updateQuantity(item.product, item.quantity - 1, item.selectedSize, item.selectedColor)}
              className="p-1.5 hover:bg-butterfly-soft text-butterfly-textMuted hover:text-butterfly-text transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2.5 text-xs font-semibold text-butterfly-text select-none min-w-[20px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.product, item.quantity + 1, item.selectedSize, item.selectedColor)}
              className="p-1.5 hover:bg-butterfly-soft text-butterfly-textMuted hover:text-butterfly-text transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right">
            <span className="text-xs md:text-sm font-semibold text-butterfly-text">
              {formatLKR(item.price * item.quantity)}
            </span>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.product, item.selectedSize, item.selectedColor)}
        className="p-1.5 text-butterfly-textMuted hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors shrink-0 self-start"
        aria-label="Remove item"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
