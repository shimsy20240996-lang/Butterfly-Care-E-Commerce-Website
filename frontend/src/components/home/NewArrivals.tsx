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
    <section className="py-16 md:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3F4650] bg-white border border-[#E9E9E9] px-3.5 py-1 rounded-full mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#5BA7D1]" />
              <span>Just Landed</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F4650]">
              New Arrivals
            </h2>
            <p className="text-sm text-[#747A82] mt-1">
              Fresh comforting additions crafted for modern nurseries and happy mothers.
            </p>
          </div>

          <Link
            href="/products?tab=newArrival"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3F4650] hover:text-[#5BA7D1] transition-colors shrink-0 group"
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
