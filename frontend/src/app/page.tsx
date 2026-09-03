'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Truck, ShieldCheck, HeartHandshake, Headphones } from 'lucide-react';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/shop/ProductCard';

const CATEGORIES = [
  {
    name: 'BABY BOY',
    tag: '💙 Baby Boy',
    href: '/products?gender=boy',
    image: '/products/img10.jpg',
    color: 'bg-[#E5F4FC] border-[#8EC5E8]/60 text-[#4F7FA0]',
  },
  {
    name: 'BABY GIRL',
    tag: '🩷 Baby Girl',
    href: '/products?gender=girl',
    image: '/products/img13.jpg',
    color: 'bg-[#FCE8EE] border-[#E8A6B8]/60 text-[#B86F84]',
  },
  {
    name: 'MOM CARE',
    tag: '🤍 Mom Care',
    href: '/products?gender=mom',
    image: '/products/img16.avif',
    color: 'bg-white border-[#EFEAE6] text-[#454545]',
  },
  {
    name: 'FEEDING',
    tag: '🍼 Feeding',
    href: '/products?category=feeding-nursing',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop',
    color: 'bg-[#E5F4FC] border-[#8EC5E8]/60 text-[#4F7FA0]',
  },
  {
    name: 'BATH & CARE',
    tag: '🛁 Bath & Care',
    href: '/products?category=bath-care',
    image: '/products/img2.jpg',
    color: 'bg-[#FCE8EE] border-[#E8A6B8]/60 text-[#B86F84]',
  },
  {
    name: 'TOYS & GIFTS',
    tag: '🧸 Toys & Gifts',
    href: '/products?category=toys-gifts',
    image: '/products/img1.webp',
    color: 'bg-white border-[#EFEAE6] text-[#454545]',
  },
];

const BENEFITS = [
  {
    icon: HeartHandshake,
    title: 'Carefully Selected',
    desc: 'Thoughtfully curated for mothers & gentle infant skin.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality You Trust',
    desc: 'Hypoallergenic, non-toxic & pure safe materials.',
  },
  {
    icon: Truck,
    title: 'Islandwide Delivery',
    desc: 'Doorstep delivery across all 25 Sri Lankan districts.',
  },
  {
    icon: Headphones,
    title: 'Friendly Support',
    desc: 'Fast assistance via WhatsApp hotline (+94 74 022 5855).',
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await api.get<{ products: Product[] }>('/products', { limit: 8 });
        if (data && data.products) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="w-full bg-[#FFFDFB]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E5F4FC]/40 via-[#FFFDFB] to-[#FFFDFB] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#EFEAE6] text-xs font-semibold text-[#454545] shadow-soft">
                <Sparkles className="w-3.5 h-3.5 text-[#E8A6B8]" />
                <span>care for every mom</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#454545] leading-[1.15]">
                BUTTERFLY
              </h1>

              <p className="text-base sm:text-lg text-[#7A7A7A] max-w-lg mx-auto lg:mx-0 font-normal">
                &ldquo;Everything you need for you and your little one.&rdquo;
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-soft active:scale-95"
                >
                  <span>SHOP NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/products?gender=mom"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#FCE8EE] hover:bg-[#F9DDE5] text-[#B86F84] border border-[#E8A6B8]/40 text-xs font-bold uppercase tracking-wider transition-all active:scale-95"
                >
                  <span>SHOP MOM CARE</span>
                </Link>
              </div>
            </div>

            {/* Hero Right Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-card border-4 border-white bg-[#E5F4FC]">
                <Image
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop"
                  alt="Mother and baby moments"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY (6 Simple Image Cards) */}
      <section className="py-12 md:py-16 bg-[#FFFDFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#454545]">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7A7A]">
              Click any category to find what you need quickly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#EFEAE6] hover:shadow-card transition-all"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#FFFDFB]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-2.5 sm:p-3 text-center bg-white border-t border-[#EFEAE6]">
                  <span className="text-xs font-bold text-[#454545] group-hover:text-[#4F7FA0] transition-colors line-clamp-1">
                    {cat.tag}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (8 Items with 1-Click Add to Cart) */}
      <section className="py-12 md:py-16 bg-[#FFFDFB] border-t border-[#EFEAE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#454545]">
                Popular Essentials
              </h2>
              <p className="text-xs sm:text-sm text-[#7A7A7A] mt-0.5">
                Loved by mothers across Sri Lanka.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4F7FA0] hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY MOMS CHOOSE US */}
      <section className="py-12 md:py-16 bg-[#FFFDFB] border-t border-[#EFEAE6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-1">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#454545]">
              Why Moms Choose Us
            </h2>
            <p className="text-xs sm:text-sm text-[#7A7A7A]">
              Simple, gentle, and reliable for your family.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {BENEFITS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#EFEAE6] flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E5F4FC] text-[#4F7FA0] flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#454545] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#7A7A7A] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
