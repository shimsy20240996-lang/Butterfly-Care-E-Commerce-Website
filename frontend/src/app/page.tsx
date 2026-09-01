'use client';

import React, { useEffect, useState } from 'react';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { EditorialFeature } from '@/components/home/EditorialFeature';
import { NewArrivals } from '@/components/home/NewArrivals';
import { BestSellers } from '@/components/home/BestSellers';
import { MomCareSpotlight } from '@/components/home/MomCareSpotlight';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TrustStats } from '@/components/home/TrustStats';
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel';
import { InstagramGrid } from '@/components/home/InstagramGrid';
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
          api.get<{ products: Product[] }>('/products', { limit: 30 }),
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
    (p) => p.categorySlug === 'mom-care' || p.categoryName === 'Mom Care'
  );

  return (
    <div className="w-full">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Category Grid (8 Image Cards) */}
      <CategoryGrid categories={categories} />

      {/* 3. Editorial Collection Feature ("Made with Care for Moms & Little Ones") */}
      <EditorialFeature />

      {/* 4. New Arrivals (4-column responsive grid) */}
      <NewArrivals products={products} />

      {/* 5. Best Sellers ("Loved by Moms" Horizontal Carousel) */}
      <BestSellers products={products} />

      {/* 6. Mom & Baby Feature Spotlight ("Because Every Mom Deserves a Little Care Too") */}
      <MomCareSpotlight momProducts={momProducts.length > 0 ? momProducts : products.slice(4, 7)} />

      {/* 7. Why Butterfly Care Benefit Cards */}
      <WhyChooseUs />

      {/* 8. Animated Trust Statistics Counter */}
      <TrustStats />

      {/* 9. Verified Customer Reviews Carousel */}
      <ReviewsCarousel />

      {/* 10. Instagram Social Moments Grid */}
      <InstagramGrid />

      {/* 11. Soft Newsletter Subscription */}
      <Newsletter />
    </div>
  );
}
