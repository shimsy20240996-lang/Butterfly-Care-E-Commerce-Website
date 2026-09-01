'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle } from 'lucide-react';

const REVIEWS_DATA = [
  {
    name: 'Dilani Perera',
    location: 'Colombo 03',
    rating: 5,
    title: 'Pure magic for my baby’s sensitive skin!',
    comment:
      'I was hesitant to try new products on my 2-month-old daughter who had mild eczema, but this wash is exceptionally gentle. Soft subtle fragrance, zero redness, and silky soft skin!',
    date: 'August 2026'
  },
  {
    name: 'Kavindi Jayawardena',
    location: 'Wattala, Gampaha',
    rating: 5,
    title: 'Must-have for every expecting mother',
    comment:
      'Used the Butterfly Care belly oil throughout my entire second pregnancy and not a single new stretch mark appeared. Smells like a luxury spa and absorbs effortlessly without staining clothes.',
    date: 'August 2026'
  },
  {
    name: 'Sarah Fernando',
    location: 'Mount Lavinia',
    rating: 5,
    title: 'Incredible quality and gorgeous packaging',
    comment:
      'These organic muslin swaddles are hands down the softest we own in Sri Lanka. They wash beautifully without shrinking and the butterfly motif is so lovely. Delivered in 2 days!',
    date: 'July 2026'
  },
  {
    name: 'Thilini Senanayake',
    location: 'Kandy',
    rating: 5,
    title: 'Saved my posture during breastfeeding',
    comment:
      'The memory foam nursing pillow provides so much relief to my back and shoulders. Customer support was also exceptionally warm and guided me on WhatsApp.',
    date: 'July 2026'
  }
];

export const ReviewsCarousel: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => {
    setCurrentIdx((prev) => (prev - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  const next = () => {
    setCurrentIdx((prev) => (prev + 1) % REVIEWS_DATA.length);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8F3EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3.5 py-1 rounded-full mb-2">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              Verified Testimonials
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-butterfly-text">
              Loved by Moms
            </h2>
            <p className="text-xs sm:text-sm text-butterfly-textMuted mt-1">
              Read authentic feedback from loving parents who trust Butterfly Care.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white hover:bg-butterfly-soft text-butterfly-text border border-butterfly-border flex items-center justify-center transition-all shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white hover:bg-butterfly-soft text-butterfly-text border border-butterfly-border flex items-center justify-center transition-all shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS_DATA.map((rev, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl bg-white border border-butterfly-border flex flex-col justify-between shadow-soft hover:shadow-card transition-all ${
                idx === currentIdx ? 'ring-2 ring-butterfly-primary/30' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-butterfly-accent/40" />
                </div>

                <h3 className="font-serif text-base sm:text-lg font-semibold text-butterfly-text">
                  &quot;{rev.title}&quot;
                </h3>

                <p className="text-xs sm:text-sm text-butterfly-textMuted leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-6 mt-6 border-t border-butterfly-border/50 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-butterfly-text">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-butterfly-textMuted">{rev.location}</span>
                </div>
                <span className="text-[11px] text-butterfly-textMuted">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
