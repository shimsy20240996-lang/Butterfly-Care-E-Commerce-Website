'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1800&auto=format&fit=crop',
    subtitle: '💙 Baby Boy • 🩷 Baby Girl • 🤍 Mom & Family',
    title: 'Everything Little. Everything Loved.',
    description:
      'Thoughtfully chosen essentials — care for every mom and every little one. Pure organic comfort, hypoallergenic care, and islandwide delivery.',
    primaryBtn: { text: 'SHOP ALL PRODUCTS', href: '/products' },
    secondaryBtn: { text: 'SHOP MOM CARE', href: '/products?tab=mom' }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1800&auto=format&fit=crop',
    subtitle: 'Nourishing Self-Care For Expecting & New Mothers',
    title: 'Because Every Mom Deserves Care Too',
    description:
      'Luxurious postpartum recovery balms, pure botanical belly elixirs, and silky bamboo loungewear designed for maternal comfort.',
    primaryBtn: { text: 'SHOP MOM CARE', href: '/products?tab=mom' },
    secondaryBtn: { text: 'EXPLORE COLLECTIONS', href: '/products' }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1800&auto=format&fit=crop',
    subtitle: 'Gentle Swaddles, Soft Rompers & Nursery Keepsakes',
    title: 'Pure Comfort for Your Little Treasure',
    description:
      'GOTS certified organic cotton rompers, soothing muslin wraps, and safe infant teethers tailored for sweet beginnings.',
    primaryBtn: { text: 'SHOP BABY BOY 💙', href: '/products?gender=boy' },
    secondaryBtn: { text: 'SHOP BABY GIRL 🩷', href: '/products?gender=girl' }
  }
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-[#FFFDF9] min-h-[500px] md:min-h-[600px] lg:min-h-[680px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Lifestyle Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-[6500ms] ease-out"
          />

          {/* Soft Pastel Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9]/95 via-[#FFFDF9]/80 to-transparent md:to-[#FFFDF9]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent md:hidden" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Subtitle Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E9E9E9] text-xs font-semibold tracking-wide text-[#3F4650] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E8A6B8]" />
                <span>{slide.subtitle}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#3F4650] leading-[1.12] tracking-tight">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-[#747A82] font-normal leading-relaxed max-w-lg">
                {slide.description}
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href={slide.primaryBtn.href}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#3F4650] hover:bg-[#5A4945] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 group"
                >
                  <span>{slide.primaryBtn.text}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href={slide.secondaryBtn.href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#3F4650] border border-[#E9E9E9] text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-xs"
                >
                  <span>{slide.secondaryBtn.text}</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      <div className="absolute right-6 bottom-6 z-20 hidden md:flex items-center gap-2">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="p-3 rounded-full bg-white/90 hover:bg-white border border-[#E9E9E9] text-[#3F4650] shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="p-3 rounded-full bg-white/90 hover:bg-white border border-[#E9E9E9] text-[#3F4650] shadow-sm hover:scale-110 active:scale-95 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'w-8 bg-[#3F4650]' : 'w-2 bg-[#747A82]/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
