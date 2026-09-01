'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, ShoppingBag, MessageCircle, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatLKR } from '@/lib/currency';
import { useCartStore } from '@/context/cartStore';
import { useWishlistStore } from '@/context/wishlistStore';
import { useToastStore } from '@/context/toastStore';
import { generateWhatsAppLink } from '@/lib/utils';
import { useSettingsStore } from '@/context/settingsStore';
import { QuickVariantModal } from './QuickVariantModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  priority = false,
}) => {
  const { addItem, openDrawer } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { showToast } = useToastStore();
  const { settings } = useSettingsStore();

  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const inWishlist = isInWishlist(product._id);
  const currentPrice = product.discountPrice || product.price;
  const isOutOfStock = product.stock <= 0;

  // Determine gender badge styling
  const isBoy = product.gender === 'boy' || product.name.toLowerCase().includes('boy');
  const isGirl = product.gender === 'girl' || product.name.toLowerCase().includes('girl');
  const isMom = product.gender === 'mom' || product.categorySlug === 'mom-care';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    // If product has size choices, open quick select modal
    if (product.sizes && product.sizes.length > 1) {
      setIsVariantModalOpen(true);
      return;
    }

    // Direct 1-Click Add to Cart
    addItem({
      product: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: currentPrice,
      originalPrice: product.discountPrice ? product.price : undefined,
      quantity: 1,
      selectedSize: product.sizes && product.sizes.length === 1 ? product.sizes[0] : undefined,
      selectedColor: product.colors && product.colors.length > 0 ? product.colors[0] : undefined,
      sku: product.sku,
      maxStock: product.stock
    });

    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1200);

    showToast(`Added "${product.name}" to your cart ✓`);
  };

  // WhatsApp link
  const whatsappNumber = settings.whatsappNumber || '+94 74 022 5855';
  const whatsappMsg = `Hello BUTTERFLY CARE, I'm interested in ${product.name} (SKU: ${product.sku}). Is it available?`;
  const whatsappUrl = generateWhatsAppLink(whatsappNumber, whatsappMsg);

  return (
    <>
      <div className="group relative flex flex-col bg-white rounded-3xl border border-[#E9E9E9] overflow-hidden hover:shadow-card hover:border-[#3F4650]/20 transition-all duration-300">
        {/* Top Image Container */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#FFFDF9]">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {isBoy && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DFF2FC] text-[#3F4650] border border-[#8EC5E8]/60 shadow-sm backdrop-blur-sm">
                <span>Baby Boy 💙</span>
              </span>
            )}
            {isGirl && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F9DDE5] text-[#3F4650] border border-[#E8A6B8]/60 shadow-sm backdrop-blur-sm">
                <span>Baby Girl 🩷</span>
              </span>
            )}
            {isMom && !isBoy && !isGirl && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-[#3F4650] border border-[#E9E9E9] shadow-sm">
                <span>Mom Care 🌸</span>
              </span>
            )}
            {product.discountPrice && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#3F4650] text-white self-start">
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product._id);
            }}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-[#3F4650] hover:bg-white hover:scale-110 active:scale-95 shadow-sm transition-all"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                inWishlist ? 'fill-[#E8A6B8] text-[#E8A6B8]' : 'text-[#747A82] hover:text-[#3F4650]'
              }`}
            />
          </button>

          {/* Out of Stock Ribbon */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center z-10">
              <span className="px-4 py-1.5 rounded-full bg-[#3F4650] text-white text-xs font-bold uppercase tracking-wider">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#747A82] truncate">
              {product.categoryName || 'Baby & Mom'}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#3F4650] shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#E8A6B8] text-[#E8A6B8]" />
              <span>{product.rating?.toFixed(1) || '5.0'}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block mb-2 group-hover:text-[#5BA7D1] transition-colors">
            <h3 className="font-serif text-sm sm:text-base font-bold text-[#3F4650] line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-[#3F4650]">
              {formatLKR(currentPrice)}
            </span>
            {product.discountPrice && (
              <span className="text-xs text-[#747A82] line-through">
                {formatLKR(product.price)}
              </span>
            )}
          </div>

          {/* Stock Alert */}
          {product.stock > 0 && product.stock <= 5 && (
            <span className="text-[10px] font-semibold text-amber-600 mb-2">
              • Only {product.stock} left in stock
            </span>
          )}

          {/* Action Buttons */}
          <div className="mt-auto pt-2 flex items-center gap-2">
            {/* 1-Click Add to Cart Button */}
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
              className={`flex-1 py-2.5 sm:py-3 px-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm ${
                isAddedAnimation
                  ? 'bg-emerald-600 text-white'
                  : isOutOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#3F4650] text-white hover:bg-[#5A4945]'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span>{product.sizes && product.sizes.length > 1 ? 'SELECT SIZE' : 'ADD TO CART'}</span>
                </>
              )}
            </button>

            {/* Quick WhatsApp Inquiry Icon */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Ask on WhatsApp"
              className="p-2.5 sm:p-3 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all shrink-0"
              aria-label="Ask on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Quick Variant Selection Modal */}
      <QuickVariantModal
        product={product}
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
      />
    </>
  );
};
