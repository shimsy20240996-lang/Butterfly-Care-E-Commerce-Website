'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductSkeleton } from '@/components/ui/Skeleton';
import { Search } from 'lucide-react';

const CATEGORY_TABS = [
  { id: 'all', label: 'ALL', color: 'default' },
  { id: 'boy', label: '💙 BABY BOY', color: 'boy', gender: 'boy' },
  { id: 'girl', label: '🩷 BABY GIRL', color: 'girl', gender: 'girl' },
  { id: 'mom', label: '🤍 MOM CARE', color: 'mom', gender: 'mom' },
  { id: 'feeding-nursing', label: 'FEEDING', color: 'default', category: 'feeding-nursing' },
  { id: 'bath-care', label: 'BATH & CARE', color: 'default', category: 'bath-care' },
  { id: 'toys-gifts', label: 'TOYS', color: 'default', category: 'toys-gifts' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategoryParam = searchParams.get('category') || '';
  const activeGenderParam = searchParams.get('gender') || '';
  const searchQuery = searchParams.get('search') || '';

  // Determine active tab ID
  let currentTab = 'all';
  if (activeGenderParam === 'boy') currentTab = 'boy';
  else if (activeGenderParam === 'girl') currentTab = 'girl';
  else if (activeGenderParam === 'mom') currentTab = 'mom';
  else if (activeCategoryParam) currentTab = activeCategoryParam;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params: Record<string, any> = { limit: 50 };

        if (activeGenderParam) {
          params.gender = activeGenderParam;
        }
        if (activeCategoryParam) {
          params.category = activeCategoryParam;
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
  }, [activeGenderParam, activeCategoryParam, searchQuery]);

  const handleTabClick = (tab: typeof CATEGORY_TABS[0]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab.id === 'all') {
      params.delete('gender');
      params.delete('category');
    } else if (tab.gender) {
      params.set('gender', tab.gender);
      params.delete('category');
    } else if (tab.category) {
      params.set('category', tab.category);
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
    <div className="min-h-screen bg-[#FFFDFB] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#454545]">
            Our Products
          </h1>
          <p className="text-sm text-[#7A7A7A]">
            Everything for mom and little ones.
          </p>
        </div>

        {/* 🔍 Search Input Bar */}
        <div className="max-w-md mx-auto mb-6">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-20 py-2.5 rounded-full bg-white border border-[#EFEAE6] text-xs text-[#454545] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[#4F7FA0] shadow-soft transition-colors"
            />
            <Search className="w-4 h-4 text-[#7A7A7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchInput && (
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#4F7FA0] text-white text-[11px] font-bold rounded-full hover:bg-[#3D6783]"
              >
                Search
              </button>
            )}
          </form>
        </div>

        {/* 🔘 Simple Category Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none justify-start sm:justify-center">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = currentTab === tab.id;

            let activeStyles = 'bg-[#4F7FA0] text-white shadow-soft font-bold';
            if (tab.color === 'boy' && isSelected) {
              activeStyles = 'bg-[#E5F4FC] text-[#4F7FA0] border-2 border-[#8EC5E8] font-bold shadow-soft';
            } else if (tab.color === 'girl' && isSelected) {
              activeStyles = 'bg-[#FCE8EE] text-[#B86F84] border-2 border-[#E8A6B8] font-bold shadow-soft';
            } else if (tab.color === 'mom' && isSelected) {
              activeStyles = 'bg-white text-[#454545] border-2 border-[#454545] font-bold shadow-soft';
            }

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 ${
                  isSelected
                    ? activeStyles
                    : 'bg-white text-[#7A7A7A] border border-[#EFEAE6] hover:text-[#454545] hover:border-[#7A7A7A]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Count / Status */}
        <div className="flex items-center justify-between border-b border-[#EFEAE6] pb-3 mb-6 text-xs text-[#7A7A7A]">
          <span>
            Showing <strong className="text-[#454545]">{products.length}</strong> products
            {searchQuery && (
              <span> for &quot;<strong className="text-[#454545]">{searchQuery}</strong>&quot;</span>
            )}
          </span>
          {(searchQuery || currentTab !== 'all') && (
            <button
              onClick={() => {
                setSearchInput('');
                router.push('/products');
              }}
              className="text-xs text-[#4F7FA0] hover:underline font-semibold"
            >
              Show All
            </button>
          )}
        </div>

        {/* 📦 Product Grid: 4 columns desktop, 3 columns tablet, 2 columns mobile */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center max-w-sm mx-auto space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#E5F4FC] flex items-center justify-center mx-auto text-xl">
              🦋
            </div>
            <h3 className="font-serif text-lg font-bold text-[#454545]">
              No products found
            </h3>
            <p className="text-xs text-[#7A7A7A]">
              Try searching with different keywords or choosing another category.
            </p>
            <button
              onClick={() => {
                setSearchInput('');
                router.push('/products');
              }}
              className="px-6 py-2 rounded-xl bg-[#4F7FA0] text-white text-xs font-bold uppercase tracking-wider"
            >
              VIEW ALL PRODUCTS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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
        <div className="min-h-screen bg-[#FFFDFB] py-14 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-[#8EC5E8] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#7A7A7A]">Loading products...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
