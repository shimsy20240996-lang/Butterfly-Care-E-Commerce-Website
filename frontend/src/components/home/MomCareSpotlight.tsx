'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { formatLKR } from '@/lib/currency';

interface MomCareSpotlightProps {
  momProducts: Product[];
}

export const MomCareSpotlight: React.FC<MomCareSpotlightProps> = ({ momProducts }) => {
  const displayMomProducts = momProducts.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-[#FFFDF9] border-t border-b border-[#E9E9E9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Mom Focus Story & Curated Products */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E9E9E9] text-xs font-bold uppercase tracking-widest text-[#3F4650] shadow-xs">
              <Heart className="w-3.5 h-3.5 text-[#E8A6B8] fill-current" />
              <span>For Every Mom</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3F4650] leading-[1.18]">
              Because Every Mom Deserves Care Too
            </h2>

            <p className="text-sm sm:text-base text-[#747A82] leading-relaxed">
              Motherhood is a profound journey of love. Our dedicated Mama Care collection is formulated
              with restorative botanicals to nourish and comfort you through pregnancy, postpartum healing, and daily bonding.
            </p>

            {/* Quick mini-product previews */}
            <div className="space-y-3 pt-2">
              {displayMomProducts.map((p) => (
                <Link
                  key={p._id}
                  href={`/product/${p.slug}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white hover:bg-white border border-[#E9E9E9] hover:border-[#3F4650]/40 transition-all shadow-xs group"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FFFDF9] shrink-0 border border-[#E9E9E9]">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#3F4650] truncate group-hover:text-[#5BA7D1] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-[#747A82] truncate">{p.shortDescription}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-[#3F4650]">
                      {formatLKR(p.discountPrice || p.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/products?tab=mom"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3F4650] hover:bg-[#5A4945] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:scale-105 active:scale-95"
              >
                <span>SHOP MOM CARE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large Lifestyle Motherhood Image with Overlay Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] max-w-lg mx-auto rounded-4xl overflow-hidden shadow-lg border-4 border-white bg-white">
              <Image
                src="https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1200&auto=format&fit=crop"
                alt="Mother and baby moments"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Bottom Floating Card */}
            <div className="absolute -bottom-5 -left-2 sm:left-6 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-[#E9E9E9] max-w-xs">
              <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                <Sparkles className="w-4 h-4 text-[#8EC5E8]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F4650]">100% Clean & Pure</span>
              </div>
              <p className="text-xs text-[#747A82] leading-relaxed">
                Formulated safely for nursing, 100% plant-based, and dermatologist verified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
