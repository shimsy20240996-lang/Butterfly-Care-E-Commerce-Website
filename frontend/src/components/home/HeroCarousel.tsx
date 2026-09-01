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
    subtitle: 'Thoughtfully Chosen For Moms & Little Ones',
    title: 'Care for Every Little Moment',
    description:
      'Discover soft, pure, dermatologist-approved essentials crafted to bring comfort, calm, and joy to your motherhood journey.',
    primaryBtn: { text: 'SHOP NOW', href: '/shop' },
    secondaryBtn: { text: 'EXPLORE COLLECTIONS', href: '/shop?category=baby-care' }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1800&auto=format&fit=crop',
    subtitle: 'Because Every Mom Deserves Care Too',
    title: 'Nourishing Essentials for Every Mom',
    description:
      'Botanical belly elixirs, organic nursing comforts, and silky bamboo loungewear curated specifically with maternal wellness in mind.',
    primaryBtn: { text: 'EXPLORE MOM CARE', href: '/shop?category=mom-care' },
    secondaryBtn: { text: 'OUR STORY', href: '/our-story' }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1800&auto=format&fit=crop',
    subtitle: 'Pure Cloud-Like Comfort',
    title: 'Organic Dream Swaddles & Sleep',
    description:
      'GOTS certified organic muslin swaddles and safe sleepwear engineered for the sweet dreams your little one deserves.',
    primaryBtn: { text: 'SHOP SLEEP ESSENTIALS', href: '/shop?category=sleep-snuggle' },
    secondaryBtn: { text: 'VIEW BEST SELLERS', href: '/shop?filter=bestSeller' }
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
    <section className="relative w-full overflow-hidden bg-[#F8F3EF] min-h-[520px] md:min-h-[620px] lg:min-h-[700px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-[6500ms] ease-out"
          />

          {/* Luxury Soft Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F3EF]/95 via-[#F8F3EF]/75 to-transparent md:to-[#F8F3EF]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8F3EF] via-transparent to-transparent md:hidden" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
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
              {/* Soft Subtitle Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-butterfly-border text-xs font-semibold uppercase tracking-wider text-butterfly-primary shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-butterfly-primary" />
                <span>{slide.subtitle}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-butterfly-text font-bold leading-[1.12] tracking-tight">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-sm md:text-base text-butterfly-textMuted leading-relaxed max-w-lg font-normal">
                {slide.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2 md:pt-4">
                <Link
                  href={slide.primaryBtn.href}
                  className="px-7 py-3.5 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-card hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>{slide.primaryBtn.text}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={slide.secondaryBtn.href}
                  className="px-7 py-3.5 rounded-full bg-white/80 hover:bg-white text-butterfly-text border border-butterfly-border text-xs font-bold tracking-widest uppercase transition-all shadow-soft hover:scale-105 active:scale-95"
                >
                  <span>{slide.secondaryBtn.text}</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 flex items-center gap-2.5">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-butterfly-text border border-butterfly-border flex items-center justify-center transition-all shadow-sm hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-butterfly-border">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-butterfly-primary' : 'w-1.5 bg-butterfly-border'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-butterfly-text border border-butterfly-border flex items-center justify-center transition-all shadow-sm hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
