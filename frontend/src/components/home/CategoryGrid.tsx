'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <section className="py-16 md:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3F4650] bg-white border border-[#E9E9E9] px-3.5 py-1 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A6B8]" />
            <span>Curated Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F4650]">
            Everything They Need, All in One Place
          </h2>
          <p className="text-sm text-[#747A82] leading-relaxed">
            Thoughtfully selected essentials for every stage of motherhood, from gentle newborn skincare to postpartum wellness.
          </p>
        </div>

        {/* 8-Card Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat._id}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#E9E9E9] hover:border-[#3F4650]/30 transition-all duration-500 hover:shadow-card flex flex-col"
            >
              {/* Category Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFFDF9]">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />

                {/* Tag on Image */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-[#3F4650] shadow-xs">
                  {cat.itemCount || 'Curated'} Items
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#3F4650] group-hover:text-[#5BA7D1] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#747A82] line-clamp-2 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#E9E9E9] flex items-center justify-between text-xs font-bold tracking-wider uppercase text-[#3F4650] group-hover:translate-x-1 transition-transform">
                  <span>View Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
