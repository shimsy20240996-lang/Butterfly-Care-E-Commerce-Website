'use client';

import React, { useEffect, useState } from 'react';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { BoyGirlCollection } from '@/components/home/BoyGirlCollection';
import { NewArrivals } from '@/components/home/NewArrivals';
import { BestSellers } from '@/components/home/BestSellers';
import { MomCareSpotlight } from '@/components/home/MomCareSpotlight';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TrustStats } from '@/components/home/TrustStats';
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel';
import { Newsletter } from '@/components/home/Newsletter';
import { Product, Category } from '@/types';
import { api } from '@/lib/api';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          api.get<{ products: Product[] }>('/products', { limit: 40 }),
          api.get<{ categories: Category[] }>('/categories')
        ]);

        if (prodData && prodData.products) {
          setProducts(prodData.products);
        }
        if (catData && catData.categories) {
          setCategories(catData.categories);
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const momProducts = products.filter(
    (p) => p.gender === 'mom' || p.categorySlug === 'mom-care' || p.categoryName === 'Mom Care'
  );

  return (
    <div className="w-full bg-[#FFFDF9]">
      {/* 1. Hero Carousel ("Everything Little. Everything Loved.") */}
      <HeroCarousel />

      {/* 2. Boy & Girl Collection Cards ("Made for Every Little One") */}
      <BoyGirlCollection />

      {/* 3. Category Grid (8 Curated Image Cards) */}
      <CategoryGrid categories={categories} />

      {/* 4. New Arrivals (Responsive Grid with 1-Click Add to Cart) */}
      <NewArrivals products={products} />

      {/* 5. Best Sellers ("Loved by Moms" Horizontal Carousel) */}
      <BestSellers products={products} />

      {/* 6. Mom Care Spotlight ("Because Every Mom Deserves Care Too") */}
      <MomCareSpotlight momProducts={momProducts.length > 0 ? momProducts : products.slice(4, 7)} />

      {/* 7. Why Moms Choose Us */}
      <WhyChooseUs />

      {/* 8. Animated Trust Statistics Counter */}
      <TrustStats />

      {/* 9. Verified Customer Reviews Carousel */}
      <ReviewsCarousel />

      {/* 10. Soft Newsletter Subscription */}
      <Newsletter />
    </div>
  );
}
