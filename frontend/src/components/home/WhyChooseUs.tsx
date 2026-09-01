'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Truck, Headphones, HeartHandshake } from 'lucide-react';

const BENEFITS = [
  {
    icon: HeartHandshake,
    title: 'Carefully Selected Products',
    description: 'Every product is vetted by mother-care specialists for pure ingredients, soft touch, and everyday utility.'
  },
  {
    icon: ShieldCheck,
    title: 'Quality You Can Trust',
    description: '100% genuine, hypoallergenic, and non-toxic materials crafted safely for newborns, toddlers, and postpartum mothers.'
  },
  {
    icon: Truck,
    title: 'Islandwide Delivery',
    description: 'Prompt, dependable doorstep delivery across all 25 Sri Lankan districts with tracking and Cash on Delivery.'
  },
  {
    icon: Headphones,
    title: 'Friendly Support',
    description: 'Warm, attentive advice via WhatsApp (+94 74 022 5855) to assist you in picking the ideal size and fit for your baby.'
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FFFDF9] border-t border-[#E9E9E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3F4650] bg-white px-3.5 py-1 rounded-full border border-[#E9E9E9]">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A6B8]" />
            <span>The Butterfly Promise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3F4650]">
            Why Moms Choose Us
          </h2>
          <p className="text-sm text-[#747A82]">
            Built with gentle care, comfort, trust, and love for every mother and every little one.
          </p>
        </div>

        {/* 4 Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl bg-white border border-[#E9E9E9] hover:border-[#3F4650]/30 transition-all duration-300 hover:shadow-card flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FFF5F7] group-hover:bg-[#3F4650] group-hover:text-white text-[#E8A6B8] flex items-center justify-center mb-5 transition-colors duration-300 shadow-xs">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#3F4650] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#747A82] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
