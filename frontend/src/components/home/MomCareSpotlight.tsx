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
    <section className="py-16 md:py-24 bg-[#F8F3EF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Mom Focus Story & Curated Products */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-butterfly-soft border border-butterfly-border text-xs font-bold uppercase tracking-widest text-butterfly-primary shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-current" />
              For Every Mom
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-butterfly-text leading-[1.18]">
              Because Every Mom Deserves a Little Care Too
            </h2>

            <p className="text-sm sm:text-base text-butterfly-textMuted leading-relaxed">
              Motherhood is a profound journey of giving. Our dedicated Mama Care collection is designed
              to replenish, nourish, and comfort you through pregnancy, postpartum recovery, and beyond.
            </p>

            {/* Quick mini-product previews */}
            <div className="space-y-3 pt-2">
              {displayMomProducts.map((p) => (
                <Link
                  key={p._id}
                  href={`/product/${p.slug}`}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/80 hover:bg-white border border-butterfly-border hover:border-butterfly-accent transition-all shadow-soft group"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-butterfly-soft shrink-0">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-butterfly-text truncate group-hover:text-butterfly-primary transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-butterfly-textMuted truncate">{p.shortDescription}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-butterfly-text">
                      {formatLKR(p.discountPrice || p.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/shop?category=mom-care"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-card hover:scale-105 active:scale-95"
              >
                <span>SHOP MOM CARE</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large Lifestyle Motherhood Image with Overlay Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] max-w-lg mx-auto rounded-3xl overflow-hidden shadow-card border-4 border-white bg-butterfly-soft">
              <Image
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop"
                alt="Mother cradling baby gently"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Bottom Floating Card */}
            <div className="absolute -bottom-5 -left-2 sm:left-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-card border border-butterfly-border max-w-xs">
              <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                <Sparkles className="w-4 h-4 text-butterfly-primary" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-butterfly-text">100% Plant-Based & Clean</span>
              </div>
              <p className="text-xs text-butterfly-textMuted leading-relaxed">
                Safe for nursing, fragrance-free options, and dermatologist approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
