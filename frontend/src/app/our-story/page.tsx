'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#F8F3EF] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24">
        {/* Top Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Our Brand Journey
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-butterfly-text leading-tight">
            Care That Begins With Mom
          </h1>
          <p className="text-sm sm:text-base text-butterfly-textMuted leading-relaxed">
            At BUTTERFLY, we believe that when a mother is nurtured and supported, her whole family thrives.
            We exist to make shopping for mothers and little ones easier, more thoughtful, and profoundly joyful.
          </p>
        </div>

        {/* Split Editorial Story 1: The Metaphor of the Butterfly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1200&auto=format&fit=crop"
                alt="Motherhood moments"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-butterfly-primary">
              Why the Butterfly?
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text leading-snug">
              A Symbol of Tender Transformation, Love, and Beautiful Beginnings
            </h2>
            <p className="text-xs sm:text-sm text-butterfly-textMuted leading-relaxed">
              The delicate butterfly embodies the miraculous transition into motherhood: gentle, resilient,
              ever-evolving, and breathtakingly beautiful. Our logo combines the soft wings of a butterfly
              with the contour of a heart, serving as an everyday reminder that true care begins with gentle compassion.
            </p>
            <p className="text-xs sm:text-sm text-butterfly-textMuted leading-relaxed">
              We spent months working alongside mothers, pediatric nurses, and botanical formulators in Sri Lanka
              to curate products that meet the highest international safety standards while remaining pure and comforting.
            </p>
          </div>
        </div>

        {/* 4 Core Brand Pillars */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-butterfly-border shadow-soft space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text">
              Our Guiding Values
            </h3>
            <p className="text-xs text-butterfly-textMuted">
              Every formula, fabric, and keepsake in our collection is held to four unwavering promises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-butterfly-bg/60 border border-butterfly-border space-y-2.5 text-center">
              <div className="w-12 h-12 rounded-xl bg-butterfly-soft text-butterfly-primary flex items-center justify-center mx-auto">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-sm text-butterfly-text">Pure & Clean</h4>
              <p className="text-xs text-butterfly-textMuted leading-relaxed">
                Zero harmful chemicals, phthalates, parabens, or synthetic fragrance. Only pure soothing botanicals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-butterfly-bg/60 border border-butterfly-border space-y-2.5 text-center">
              <div className="w-12 h-12 rounded-xl bg-butterfly-soft text-butterfly-primary flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-sm text-butterfly-text">Mother-Focused</h4>
              <p className="text-xs text-butterfly-textMuted leading-relaxed">
                Crafted to honor both baby and mother, because every mom deserves dedicated restoration.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-butterfly-bg/60 border border-butterfly-border space-y-2.5 text-center">
              <div className="w-12 h-12 rounded-xl bg-butterfly-soft text-butterfly-primary flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-sm text-butterfly-text">Dermatologist Verified</h4>
              <p className="text-xs text-butterfly-textMuted leading-relaxed">
                Hypoallergenic, pediatrician endorsed, and safe for sensitive newborn and postpartum skin.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-butterfly-bg/60 border border-butterfly-border space-y-2.5 text-center">
              <div className="w-12 h-12 rounded-xl bg-butterfly-soft text-butterfly-primary flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-sm text-butterfly-text">Islandwide Delivery</h4>
              <p className="text-xs text-butterfly-textMuted leading-relaxed">
                Fast, reliable courier dispatch directly to homes in all 25 Sri Lankan districts with Cash on Delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Callout */}
        <div className="text-center max-w-xl mx-auto space-y-6 pt-4">
          <h3 className="font-serif text-2xl font-bold text-butterfly-text">
            Experience the Comfort of Butterfly
          </h3>
          <p className="text-xs sm:text-sm text-butterfly-textMuted leading-relaxed">
            Join thousands of happy Sri Lankan families who have chosen our thoughtfully curated collections.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-card"
          >
            <span>EXPLORE OUR COLLECTIONS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
