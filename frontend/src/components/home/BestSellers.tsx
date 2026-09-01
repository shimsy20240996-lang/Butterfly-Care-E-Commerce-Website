'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { Heart, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface BestSellersProps {
  products: Product[];
}

export const BestSellers: React.FC<BestSellersProps> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const bestSellerProducts = products.filter((p) => p.bestSeller || p.rating >= 4.9);
  const displayList = bestSellerProducts.length > 0 ? bestSellerProducts : products.slice(0, 8);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FFFDF9] border-t border-[#E9E9E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Carousel Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3F4650] bg-white border border-[#E9E9E9] px-3.5 py-1 rounded-full mb-2 shadow-xs">
              <Heart className="w-3.5 h-3.5 text-[#E8A6B8] fill-current" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F4650]">
              Loved by Moms
            </h2>
            <p className="text-sm text-[#747A82] mt-1">
              Our highest-rated essentials tested, trusted, and recommended by Sri Lankan families.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products?tab=bestSeller"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3F4650] hover:text-[#5BA7D1] mr-4"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#F3FAFE] text-[#3F4650] border border-[#E9E9E9] flex items-center justify-center transition-all shadow-xs hover:scale-105"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-white hover:bg-[#F3FAFE] text-[#3F4650] border border-[#E9E9E9] flex items-center justify-center transition-all shadow-xs hover:scale-105"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {displayList.map((product) => (
            <div
              key={product._id}
              className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
