'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductSkeleton } from '@/components/ui/Skeleton';
import { Sparkles, SlidersHorizontal, Search, RefreshCw } from 'lucide-react';

const FILTER_TABS = [
  { id: 'all', label: 'ALL', color: 'default' },
  { id: 'boy', label: 'BABY BOY 💙', color: 'boy' },
  { id: 'girl', label: 'BABY GIRL 🩷', color: 'girl' },
  { id: 'mom', label: 'MOM CARE', color: 'mom' },
  { id: 'newArrival', label: 'NEW ARRIVALS', color: 'default' },
  { id: 'bestSeller', label: 'BEST SELLERS', color: 'default' },
  { id: 'sale', label: 'SALE', color: 'sale' }
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get('tab') || searchParams.get('gender') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params: Record<string, any> = { limit: 50 };

        if (activeTab === 'boy') {
          params.gender = 'boy';
        } else if (activeTab === 'girl') {
          params.gender = 'girl';
        } else if (activeTab === 'mom') {
          params.gender = 'mom';
        } else if (activeTab === 'newArrival') {
          params.newArrival = 'true';
        } else if (activeTab === 'bestSeller') {
          params.bestSeller = 'true';
        } else if (activeTab === 'sale') {
          params.sale = 'true';
        }

        if (searchQuery) {
          params.search = searchQuery;
        }

        const data = await api.get<{ products: Product[]; total: number }>('/products', params);
        if (data && data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab, searchQuery]);

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tabId === 'all') {
      params.delete('tab');
      params.delete('gender');
      params.delete('filter');
    } else if (tabId === 'boy' || tabId === 'girl' || tabId === 'mom') {
      params.set('tab', tabId);
      params.set('gender', tabId);
      params.delete('filter');
    } else {
      params.set('tab', tabId);
      params.delete('gender');
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3F4650] bg-white px-3.5 py-1 rounded-full border border-[#E9E9E9]">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A6B8]" />
            <span>Gentle Essentials For Every Mom</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#3F4650]">
            Our Products
          </h1>
          <p className="text-sm md:text-base text-[#747A82] font-normal">
            Little essentials, big love.
          </p>
        </div>

        {/* Top Filter Bar & Search */}
        <div className="mb-8 space-y-4">
          {/* Main Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
            {FILTER_TABS.map((tab) => {
              const isSelected = activeTab === tab.id;

              let activeStyles = 'bg-[#3F4650] text-white shadow-sm';
              if (tab.color === 'boy' && isSelected) {
                activeStyles = 'bg-[#DFF2FC] text-[#3F4650] border-2 border-[#8EC5E8] font-bold shadow-boy';
              } else if (tab.color === 'girl' && isSelected) {
                activeStyles = 'bg-[#F9DDE5] text-[#3F4650] border-2 border-[#E8A6B8] font-bold shadow-girl';
              } else if (tab.color === 'mom' && isSelected) {
                activeStyles = 'bg-white text-[#3F4650] border-2 border-[#3F4650] font-bold shadow-sm';
              } else if (tab.color === 'sale' && isSelected) {
                activeStyles = 'bg-[#3F4650] text-white font-bold shadow-sm';
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? activeStyles
                      : 'bg-white text-[#747A82] border border-[#E9E9E9] hover:text-[#3F4650] hover:border-[#747A82]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Inline Search Bar */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for something special..."
                className="w-full pl-10 pr-20 py-2.5 rounded-full bg-white border border-[#E9E9E9] text-xs text-[#3F4650] placeholder:text-[#747A82] focus:outline-none focus:border-[#3F4650] shadow-xs transition-colors"
              />
              <Search className="w-4 h-4 text-[#747A82] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchInput && (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#3F4650] text-white text-[11px] font-bold rounded-full hover:bg-[#5A4945]"
                >
                  Search
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Product Count & Active Filters Indicator */}
        <div className="flex items-center justify-between border-b border-[#E9E9E9] pb-4 mb-6 text-xs text-[#747A82]">
          <div>
            Showing <strong className="text-[#3F4650]">{products.length}</strong> items
            {searchQuery && (
              <span> for &quot;<strong className="text-[#3F4650]">{searchQuery}</strong>&quot;</span>
            )}
          </div>
          {(searchQuery || activeTab !== 'all') && (
            <button
              onClick={() => {
                setSearchInput('');
                router.push('/products');
              }}
              className="text-xs text-[#5BA7D1] hover:underline font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Product Grid: 4 columns desktop, 3 columns tablet, 2 columns mobile */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF5F7] flex items-center justify-center mx-auto text-2xl">
              🦋
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3F4650]">
              No little treasures found
            </h3>
            <p className="text-xs text-[#747A82] leading-relaxed">
              We couldn&apos;t find any products matching your selection. Try clearing your filters or search keywords.
            </p>
            <button
              onClick={() => {
                setSearchInput('');
                router.push('/products');
              }}
              className="inline-flex px-6 py-2.5 rounded-full bg-[#3F4650] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5A4945] transition-colors"
            >
              VIEW ALL PRODUCTS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((prod, idx) => (
              <ProductCard key={prod._id} product={prod} priority={idx < 4} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFDF9] py-14 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-[#8EC5E8] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#747A82] font-medium tracking-wide">Loading treasures...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
