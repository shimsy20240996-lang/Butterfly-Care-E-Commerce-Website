'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const BoyGirlCollection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3F4650] bg-white px-3.5 py-1 rounded-full border border-[#E9E9E9]">
            <Sparkles className="w-3.5 h-3.5 text-[#5BA7D1]" />
            <span>Curated Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3F4650]">
            Made for Every Little One
          </h2>
          <p className="text-sm md:text-base text-[#747A82] font-normal">
            Thoughtful baby boy and baby girl collections crafted from gentle organic fibers.
          </p>
        </div>

        {/* Split Balanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT: 💙 BABY BOY CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative rounded-4xl overflow-hidden bg-gradient-to-br from-[#DFF2FC] to-[#F3FAFE] border border-[#8EC5E8]/40 p-8 sm:p-12 flex flex-col justify-between min-h-[420px] md:min-h-[480px] shadow-sm hover:shadow-boy transition-all duration-300"
          >
            {/* Background Lifestyle Image Container */}
            <div className="absolute right-0 bottom-0 w-3/5 h-4/5 pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop"
                alt="Baby Boy Collection"
                fill
                className="object-contain object-bottom-right drop-shadow-md"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-xs space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-xs font-bold tracking-wider uppercase text-[#3F4650] border border-[#8EC5E8]/60 shadow-xs">
                💙 Baby Boy
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3F4650] leading-tight">
                Little Explorer Essentials
              </h3>
              <p className="text-xs sm:text-sm text-[#747A82] leading-relaxed">
                Ocean blues, breathable waffle knits, organic rompers, and soothing cloud swaddles.
              </p>
            </div>

            {/* Action CTA */}
            <div className="relative z-10 pt-6">
              <Link
                href="/products?tab=boy"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#3F4650] hover:bg-[#5A4945] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md group-hover:gap-3"
              >
                <span>SHOP BABY BOY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT: 🩷 BABY GIRL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group relative rounded-4xl overflow-hidden bg-gradient-to-br from-[#F9DDE5] to-[#FFF5F7] border border-[#E8A6B8]/40 p-8 sm:p-12 flex flex-col justify-between min-h-[420px] md:min-h-[480px] shadow-sm hover:shadow-girl transition-all duration-300"
          >
            {/* Background Lifestyle Image Container */}
            <div className="absolute right-0 bottom-0 w-3/5 h-4/5 pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop"
                alt="Baby Girl Collection"
                fill
                className="object-contain object-bottom-right drop-shadow-md"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-xs space-y-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-xs font-bold tracking-wider uppercase text-[#3F4650] border border-[#E8A6B8]/60 shadow-xs">
                🩷 Baby Girl
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3F4650] leading-tight">
                Sweet Blossom Keepsakes
              </h3>
              <p className="text-xs sm:text-sm text-[#747A82] leading-relaxed">
                Rose petal prints, delicate heirloom knitwear, soft headband sets, and cozy wraps.
              </p>
            </div>

            {/* Action CTA */}
            <div className="relative z-10 pt-6">
              <Link
                href="/products?tab=girl"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#3F4650] hover:bg-[#5A4945] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md group-hover:gap-3"
              >
                <span>SHOP BABY GIRL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
