'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Truck, Headphones, HeartHandshake } from 'lucide-react';

const BENEFITS = [
  {
    icon: HeartHandshake,
    title: 'Carefully Selected Products',
    description: 'Every product is thoughtfully reviewed and vetted by mother-specialists for safety, gentle touch, and real utility.'
  },
  {
    icon: ShieldCheck,
    title: 'Quality You Can Trust',
    description: '100% genuine, hypoallergenic, and non-toxic materials designed specifically for fragile infant skin and healing mothers.'
  },
  {
    icon: Truck,
    title: 'Islandwide Delivery',
    description: 'Prompt, dependable doorstep delivery across all 25 Sri Lankan districts with tracking and Cash on Delivery.'
  },
  {
    icon: Headphones,
    title: 'Friendly Customer Support',
    description: 'Warm, attentive assistance via WhatsApp and phone to help you pick the perfect fit for your little one.'
  }
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Our Difference
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-butterfly-text">
            Why Moms Choose BUTTERFLY CARE
          </h2>
          <p className="text-xs sm:text-sm text-butterfly-textMuted">
            Built on a foundation of tender love, uncompromising safety, and attentive family care.
          </p>
        </div>

        {/* 4 Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl bg-white border border-butterfly-border hover:border-butterfly-accent transition-all duration-300 hover:shadow-card flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-butterfly-soft group-hover:bg-butterfly-primary group-hover:text-white text-butterfly-primary flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-base font-semibold text-butterfly-text mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-butterfly-textMuted leading-relaxed">
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
