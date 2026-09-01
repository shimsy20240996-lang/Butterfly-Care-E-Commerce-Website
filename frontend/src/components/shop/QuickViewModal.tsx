'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatLKR } from '@/lib/currency';
import { useCartStore } from '@/context/cartStore';
import { useWishlistStore } from '@/context/wishlistStore';
import { useToastStore } from '@/context/toastStore';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showToast } = useToastStore();

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product._id);
  const currentPrice = product.discountPrice || product.price;

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }

    addItem({
      product: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images[selectedImage] || product.images[0],
      price: currentPrice,
      originalPrice: product.discountPrice ? product.price : undefined,
      quantity,
      selectedSize: selectedSize || (product.sizes?.[0] || ''),
      selectedColor: selectedColor || (product.colors?.[0] || ''),
      sku: product.sku,
      maxStock: product.stock
    });

    showToast(`Added "${product.name}" to cart!`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-butterfly-text/50 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-card overflow-hidden z-10 border border-butterfly-border max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-butterfly-soft text-butterfly-text transition-colors shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Gallery */}
          <div className="w-full md:w-1/2 p-6 bg-butterfly-bg/40 flex flex-col justify-between">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-butterfly-border">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === idx ? 'border-butterfly-primary shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Purchase */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-butterfly-primary">
                  {product.categoryName || 'Care Essential'}
                </span>
                <h3 className="font-serif text-lg md:text-xl font-semibold text-butterfly-text mt-1 leading-snug">
                  {product.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-butterfly-text font-medium">{product.rating}</span>
                <span className="text-xs text-butterfly-textMuted">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-xl md:text-2xl font-bold text-butterfly-text">
                  {formatLKR(currentPrice)}
                </span>
                {product.discountPrice && (
                  <span className="text-sm text-butterfly-textMuted line-through">
                    {formatLKR(product.price)}
                  </span>
                )}
              </div>

              <p className="text-xs text-butterfly-textMuted leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Size variants */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-butterfly-text">Size / Option:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          (selectedSize || product.sizes[0]) === s
                            ? 'bg-butterfly-text text-white border-butterfly-text'
                            : 'bg-white hover:bg-butterfly-soft text-butterfly-text border-butterfly-border'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color variants */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-butterfly-text">Color / Theme:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          (selectedColor || product.colors[0]) === c
                            ? 'bg-butterfly-primary text-white border-butterfly-primary'
                            : 'bg-white hover:bg-butterfly-soft text-butterfly-text border-butterfly-border'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-butterfly-border space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 py-3 px-6 rounded-2xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-card flex items-center justify-center gap-2 disabled:bg-gray-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>

                <button
                  onClick={() => {
                    const added = toggleWishlist(product._id);
                    showToast(added ? 'Saved to Wishlist!' : 'Removed from Wishlist');
                  }}
                  className={`p-3 rounded-2xl border transition-colors ${
                    inWishlist
                      ? 'bg-rose-50 text-rose-500 border-rose-200'
                      : 'border-butterfly-border text-butterfly-text hover:bg-butterfly-soft'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              <Link
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 text-xs font-medium text-butterfly-textMuted hover:text-butterfly-primary pt-1 transition-colors"
              >
                <span>View Complete Product Details & Materials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
