'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface NewArrivalsProps {
  products: Product[];
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  const newProducts = products.filter((p) => p.newArrival).slice(0, 8);
  const displayList = newProducts.length >= 4 ? newProducts : products.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-[#F8F3EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Just Landed
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-butterfly-text">
              New Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-butterfly-textMuted mt-1">
              Fresh comforting additions crafted for modern nurseries and happy mothers.
            </p>
          </div>

          <Link
            href="/shop?filter=newArrival"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-butterfly-primary hover:text-butterfly-primaryHover transition-colors shrink-0 group"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Grid: 4 Desktop / 3 Tablet / 2 Mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
