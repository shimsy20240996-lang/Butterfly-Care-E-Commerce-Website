'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const EditorialFeature: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F1E2DC]/50 border-y border-butterfly-border/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Mother/baby Lifestyle Image with Floating Accent Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] max-w-lg mx-auto rounded-3xl overflow-hidden shadow-card border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1200&auto=format&fit=crop"
                alt="Mother holding baby softly"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Soft Badge */}
            <div className="absolute -bottom-5 -right-2 sm:right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-card border border-butterfly-border max-w-[220px] animate-bounce-subtle">
              <div className="flex items-center gap-2 text-butterfly-primary mb-1">
                <Heart className="w-4 h-4 fill-current" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Thoughtful Love</span>
              </div>
              <p className="text-xs text-butterfly-text font-medium leading-snug">
                Designed by mothers, certified safe for little ones.
              </p>
            </div>
          </div>

          {/* Right: Editorial Story & CTA */}
          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-butterfly-border text-xs font-bold uppercase tracking-widest text-butterfly-primary shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Our Commitment
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-butterfly-text leading-[1.18]">
              Made with Care for Moms & Little Ones
            </h2>

            <p className="text-sm sm:text-base text-butterfly-textMuted leading-relaxed">
              From everyday essentials to thoughtful little comforts, discover products chosen to make
              motherhood a little easier and every moment a little more special.
            </p>

            {/* Value Points */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-butterfly-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-butterfly-text uppercase tracking-wider">
                    Non-Toxic & Hypoallergenic
                  </h4>
                  <p className="text-xs text-butterfly-textMuted">
                    Free of harsh chemicals, synthetic fragrances, sulfates, and parabens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-butterfly-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-butterfly-text uppercase tracking-wider">
                    Pure GOTS Organic Fabrics
                  </h4>
                  <p className="text-xs text-butterfly-textMuted">
                    Ultra-soft breathable bamboo and combed organic cotton that pampers sensitive newborn skin.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-butterfly-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-butterfly-text uppercase tracking-wider">
                    Tailored for Sri Lankan Families
                  </h4>
                  <p className="text-xs text-butterfly-textMuted">
                    Reliable islandwide doorstep delivery with Cash on Delivery and prompt customer support.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-card hover:scale-105 active:scale-95"
              >
                <span>DISCOVER COLLECTION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
