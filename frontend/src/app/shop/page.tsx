'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, Category } from '@/types';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/shop/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { SlidersHorizontal, ChevronDown, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function ShopPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialFilter = searchParams.get('filter') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true);
        const catData = await api.get<{ categories: Category[] }>('/categories');
        if (catData && catData.categories) {
          setCategories(catData.categories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchInitial();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        setLoading(true);
        const params: Record<string, any> = {
          category: selectedCategory !== 'all' ? selectedCategory : undefined,
          maxPrice: priceRange[1] < 20000 ? priceRange[1] : undefined,
          ageGroup: selectedAgeGroup !== 'all' ? selectedAgeGroup : undefined,
          inStock: inStockOnly ? 'true' : undefined,
          rating: minRating > 0 ? minRating : undefined,
          sort: sortOption,
          search: initialSearch || undefined
        };

        if (initialFilter === 'newArrival') params.newArrival = 'true';
        if (initialFilter === 'bestSeller') params.bestSeller = 'true';

        const data = await api.get<{ products: Product[] }>('/products', params);
        if (data && data.products) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory, priceRange, selectedAgeGroup, inStockOnly, minRating, sortOption, initialFilter, initialSearch]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 20000]);
    setSelectedAgeGroup('all');
    setInStockOnly(false);
    setMinRating(0);
    setSortOption('featured');
  };

  const getActiveCategoryTitle = () => {
    if (initialSearch) return `Search Results for "${initialSearch}"`;
    if (selectedCategory === 'all') return 'All Collections';
    const found = categories.find((c) => c.slug === selectedCategory);
    return found ? found.name : 'Curated Essentials';
  };

  return (
    <div className="min-h-screen bg-[#F8F3EF] py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header Banner */}
        <div className="mb-8 md:mb-12 bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-butterfly-border">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Boutique Catalog
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-butterfly-text">
            {getActiveCategoryTitle()}
          </h1>
          <p className="text-xs sm:text-sm text-butterfly-textMuted mt-1.5 max-w-xl">
            Thoughtfully chosen baby and mother care items with islandwide delivery across Sri Lanka.
          </p>
        </div>

        {/* Main Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft sticky top-24">
              <FilterSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedAgeGroup={selectedAgeGroup}
                onSelectAgeGroup={setSelectedAgeGroup}
                inStockOnly={inStockOnly}
                onToggleInStock={setInStockOnly}
                minRating={minRating}
                onSelectRating={setMinRating}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Control Bar: Mobile Filter Button & Sorting */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 border border-butterfly-border shadow-soft">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-butterfly-soft hover:bg-butterfly-secondary text-butterfly-text text-xs font-semibold transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-butterfly-primary" />
                <span>Filter Products</span>
              </button>

              <span className="text-xs text-butterfly-textMuted hidden sm:inline">
                Showing <strong>{products.length}</strong> items
              </span>

              {/* Sorting Select */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-butterfly-textMuted hidden md:inline">Sort By:</span>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    aria-label="Sort products"
                    className="appearance-none text-xs font-semibold bg-butterfly-bg border border-butterfly-border text-butterfly-text pl-3 pr-8 py-2 rounded-xl focus:outline-none focus:border-butterfly-primary cursor-pointer shadow-sm"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="bestSeller">Best Selling</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-butterfly-textMuted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid Content / Skeletons / Empty State */}
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-butterfly-border space-y-4 shadow-soft">
                <div className="w-16 h-16 rounded-full bg-butterfly-soft text-butterfly-primary flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-butterfly-text">
                  We couldn&apos;t find what you&apos;re looking for.
                </h3>
                <p className="text-xs text-butterfly-textMuted max-w-sm mx-auto">
                  Try adjusting or clearing your filters to explore our full range of essentials.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-butterfly-primary text-white text-xs font-bold uppercase tracking-wider transition-all hover:bg-butterfly-primaryHover shadow-card"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-butterfly-text/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-card p-6 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-butterfly-border">
                  <h3 className="font-serif text-base font-semibold">Filter Products</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full hover:bg-butterfly-soft"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(slug) => {
                    setSelectedCategory(slug);
                    setIsMobileFilterOpen(false);
                  }}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  selectedAgeGroup={selectedAgeGroup}
                  onSelectAgeGroup={(age) => {
                    setSelectedAgeGroup(age);
                    setIsMobileFilterOpen(false);
                  }}
                  inStockOnly={inStockOnly}
                  onToggleInStock={setInStockOnly}
                  minRating={minRating}
                  onSelectRating={setMinRating}
                  onResetFilters={handleResetFilters}
                />
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="mt-6 w-full py-3 rounded-2xl bg-butterfly-primary text-white text-xs font-bold tracking-wider uppercase text-center"
              >
                Apply Filters
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <React.Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs text-butterfly-textMuted">Loading Catalog...</div>}>
      <ShopPageContent />
    </React.Suspense>
  );
}
