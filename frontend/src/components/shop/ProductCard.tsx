'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatLKR } from '@/lib/currency';
import { Badge } from '@/components/ui/Badge';
import { useCartStore } from '@/context/cartStore';
import { useWishlistStore } from '@/context/wishlistStore';
import { useToastStore } from '@/context/toastStore';
import { QuickViewModal } from './QuickViewModal';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { showToast } = useToastStore();

  const inWishlist = isInWishlist(product._id);
  const currentPrice = product.discountPrice || product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      product: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: currentPrice,
      originalPrice: product.discountPrice ? product.price : undefined,
      quantity: 1,
      selectedSize: product.sizes?.[0] || '',
      selectedColor: product.colors?.[0] || '',
      sku: product.sku,
      maxStock: product.stock
    });

    showToast(`Added "${product.name}" to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product._id);
    showToast(added ? 'Saved to Wishlist!' : 'Removed from Wishlist');
  };

  // Determine which badge to show
  let badgeType: 'new' | 'bestSeller' | 'sale' | 'lowStock' | 'outOfStock' | null = null;
  if (product.stock <= 0) {
    badgeType = 'outOfStock';
  } else if (product.discountPrice && product.discountPrice < product.price) {
    badgeType = 'sale';
  } else if (product.newArrival) {
    badgeType = 'new';
  } else if (product.bestSeller) {
    badgeType = 'bestSeller';
  } else if (product.stock <= 5) {
    badgeType = 'lowStock';
  }

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative bg-white rounded-3xl overflow-hidden border border-butterfly-border hover:border-butterfly-accent transition-all duration-300 hover:shadow-card flex flex-col justify-between ${className}`}
      >
        {/* Image & Quick Action Overlays */}
        <div className="relative aspect-square w-full bg-butterfly-bg overflow-hidden">
          {/* Badge */}
          {badgeType && (
            <div className="absolute top-3 left-3 z-10">
              <Badge type={badgeType} />
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
              inWishlist
                ? 'bg-rose-50 text-rose-500 shadow-sm'
                : 'bg-white/80 backdrop-blur-sm text-butterfly-text hover:bg-white hover:text-rose-500 shadow-sm'
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-rose-500' : ''}`} />
          </button>

          {/* Primary & Secondary Image Hover Swap */}
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                product.images.length > 1 && isHovered ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {product.images.length > 1 && (
              <Image
                src={product.images[1]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={`object-cover transition-opacity duration-500 absolute inset-0 ${
                  isHovered ? 'opacity-100 scale-105' : 'opacity-0'
                }`}
              />
            )}
          </Link>

          {/* Quick Action Floating Bar on Hover (Desktop) */}
          <div className="absolute inset-x-3 bottom-3 hidden md:flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/95 backdrop-blur-md hover:bg-white text-butterfly-text text-xs font-semibold shadow-card flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-butterfly-primary" />
              <span>Quick View</span>
            </button>
            <button
              onClick={handleQuickAdd}
              disabled={product.stock <= 0}
              className="p-2.5 rounded-xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white shadow-card transition-colors disabled:bg-gray-300"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
          <div className="space-y-1.5">
            {/* Category */}
            <span className="text-[10px] md:text-[11px] uppercase tracking-wider font-semibold text-butterfly-textMuted">
              {product.categoryName || 'Care Essential'}
            </span>

            {/* Product Title */}
            <Link
              href={`/product/${product.slug}`}
              className="block font-medium text-xs md:text-sm text-butterfly-text hover:text-butterfly-primary transition-colors line-clamp-2 leading-snug"
            >
              {product.name}
            </Link>

            {/* Rating Stars */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-butterfly-textMuted font-medium">({product.reviewCount})</span>
            </div>
          </div>

          {/* Price & Mobile Add to Cart */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-butterfly-border/50">
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-bold text-butterfly-text">
                {formatLKR(currentPrice)}
              </span>
              {product.discountPrice && (
                <span className="text-[10px] md:text-xs text-butterfly-textMuted line-through">
                  {formatLKR(product.price)}
                </span>
              )}
            </div>

            {/* Mobile Add to Cart Button */}
            <button
              onClick={handleQuickAdd}
              disabled={product.stock <= 0}
              className="md:hidden p-2 rounded-xl bg-butterfly-soft hover:bg-butterfly-primary hover:text-white text-butterfly-text transition-colors disabled:opacity-50"
              aria-label="Add to cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
