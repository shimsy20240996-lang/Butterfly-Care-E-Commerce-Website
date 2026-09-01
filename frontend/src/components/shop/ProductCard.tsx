'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatLKR } from '@/lib/currency';
import { useCartStore } from '@/context/cartStore';
import { useWishlistStore } from '@/context/wishlistStore';
import { useToastStore } from '@/context/toastStore';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
}) => {
  const { addItem } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { showToast } = useToastStore();

  const [isAdded, setIsAdded] = useState(false);

  const inWishlist = isInWishlist(product._id);
  const currentPrice = product.discountPrice || product.price;
  const isOutOfStock = product.stock <= 0;

  // Gender / Category Badge
  const isBoy = product.gender === 'boy' || product.name.toLowerCase().includes('boy');
  const isGirl = product.gender === 'girl' || product.name.toLowerCase().includes('girl');
  const isMom = product.gender === 'mom' || product.categorySlug === 'mom-care';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    // Direct 1-Click Add to Cart
    addItem({
      product: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: currentPrice,
      originalPrice: product.discountPrice ? product.price : undefined,
      quantity: 1,
      selectedSize: product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined,
      selectedColor: product.colors && product.colors.length > 0 ? product.colors[0] : undefined,
      sku: product.sku,
      maxStock: product.stock,
    });

    // Instant animation & feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);

    showToast('Added to cart ✓');
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-[#EFEAE6] overflow-hidden hover:shadow-card hover:border-[#8EC5E8]/60 transition-all duration-200">
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FFFDFB]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Wishlist Heart Icon */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-[#454545] hover:scale-110 active:scale-95 transition-all shadow-xs"
        >
          <Heart
            className={`w-4 h-4 ${
              inWishlist ? 'fill-[#E8A6B8] text-[#E8A6B8]' : 'text-[#7A7A7A]'
            }`}
          />
        </button>

        {/* Out of Stock Ribbon */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-[#454545] text-white text-[10px] font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        {/* Title */}
        <Link href={`/product/${product.slug}`} className="block mb-1">
          <h3 className="font-serif text-xs sm:text-sm font-bold text-[#454545] line-clamp-1 group-hover:text-[#4F7FA0] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Category / Gender Subtitle */}
        <div className="mb-2">
          {isBoy ? (
            <span className="inline-block text-[11px] font-semibold text-[#4F7FA0]">
              💙 Baby Boy
            </span>
          ) : isGirl ? (
            <span className="inline-block text-[11px] font-semibold text-[#B86F84]">
              🩷 Baby Girl
            </span>
          ) : isMom ? (
            <span className="inline-block text-[11px] font-semibold text-[#7A7A7A]">
              🤍 Mom Care
            </span>
          ) : (
            <span className="inline-block text-[11px] font-medium text-[#7A7A7A]">
              {product.categoryName || 'Baby Care'}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mb-3">
          <span className="text-sm sm:text-base font-bold text-[#454545]">
            {formatLKR(currentPrice)}
          </span>
          {product.discountPrice && (
            <span className="text-xs text-[#7A7A7A] line-through">
              {formatLKR(product.price)}
            </span>
          )}
        </div>

        {/* Prominent Full-Width [ ADD TO CART ] Button */}
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`w-full mt-auto py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : isOutOfStock
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#4F7FA0] hover:bg-[#3D6783] text-white shadow-soft'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added ✓</span>
            </>
          ) : (
            <span>ADD TO CART</span>
          )}
        </button>
      </div>
    </div>
  );
};
