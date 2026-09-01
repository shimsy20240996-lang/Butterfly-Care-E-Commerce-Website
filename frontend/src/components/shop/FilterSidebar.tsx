'use client';

import React from 'react';
import { Category } from '@/types';
import { RotateCcw, Star, Check } from 'lucide-react';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedAgeGroup: string;
  onSelectAgeGroup: (group: string) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  minRating: number;
  onSelectRating: (val: number) => void;
  onResetFilters: () => void;
}

const AGE_GROUPS = [
  { label: 'All Ages', value: 'all' },
  { label: '0-6 Months', value: '0-6' },
  { label: '6-18 Months', value: '6-18' },
  { label: '1-3 Years', value: '1-3' },
  { label: 'Moms & Maternity', value: 'moms' }
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  selectedAgeGroup,
  onSelectAgeGroup,
  inStockOnly,
  onToggleInStock,
  minRating,
  onSelectRating,
  onResetFilters
}) => {
  return (
    <div className="space-y-6 text-butterfly-text">
      {/* Top Title & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-butterfly-border">
        <h3 className="font-serif text-base font-semibold">Filter Products</h3>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-[11px] font-semibold text-butterfly-primary hover:text-butterfly-primaryHover uppercase tracking-wider transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-textMuted">Categories</h4>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-butterfly-soft font-bold text-butterfly-primary'
                : 'text-butterfly-text hover:bg-butterfly-soft/50'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                selectedCategory === cat.slug
                  ? 'bg-butterfly-soft font-bold text-butterfly-primary'
                  : 'text-butterfly-text hover:bg-butterfly-soft/50'
              }`}
            >
              <span>{cat.name}</span>
              {cat.itemCount !== undefined && (
                <span className="text-[10px] text-butterfly-textMuted">{cat.itemCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Price Range Filter */}
      <div className="space-y-3 pt-4 border-t border-butterfly-border">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-textMuted">Max Price</h4>
          <span className="text-xs font-semibold text-butterfly-text">
            Rs. {priceRange[1].toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="20000"
          step="500"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([0, Number(e.target.value)])}
          className="w-full accent-butterfly-primary cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-butterfly-textMuted">
          <span>Rs. 1,000</span>
          <span>Rs. 20,000</span>
        </div>
      </div>

      {/* 3. Age Group Filter */}
      <div className="space-y-2.5 pt-4 border-t border-butterfly-border">
        <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-textMuted">Age Group</h4>
        <div className="space-y-1">
          {AGE_GROUPS.map((age) => (
            <button
              key={age.value}
              onClick={() => onSelectAgeGroup(age.value)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                selectedAgeGroup === age.value
                  ? 'bg-butterfly-soft font-bold text-butterfly-primary'
                  : 'text-butterfly-text hover:bg-butterfly-soft/50'
              }`}
            >
              <span>{age.label}</span>
              {selectedAgeGroup === age.value && <Check className="w-3.5 h-3.5 text-butterfly-primary" />}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Minimum Rating */}
      <div className="space-y-2.5 pt-4 border-t border-butterfly-border">
        <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-textMuted">Customer Rating</h4>
        <div className="space-y-1">
          {[4, 3, 0].map((star) => (
            <button
              key={star}
              onClick={() => onSelectRating(star)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                minRating === star
                  ? 'bg-butterfly-soft font-bold text-butterfly-primary'
                  : 'text-butterfly-text hover:bg-butterfly-soft/50'
              }`}
            >
              <div className="flex items-center gap-1">
                {star === 0 ? (
                  <span>All Ratings</span>
                ) : (
                  <>
                    <div className="flex text-amber-400">
                      {Array.from({ length: star }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span>& Up</span>
                  </>
                )}
              </div>
              {minRating === star && <Check className="w-3.5 h-3.5 text-butterfly-primary" />}
            </button>
          ))}
        </div>
      </div>

      {/* 5. In Stock Toggle */}
      <div className="pt-4 border-t border-butterfly-border">
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="w-4 h-4 rounded text-butterfly-primary focus:ring-butterfly-primary accent-butterfly-primary"
          />
          <span className="text-xs font-medium text-butterfly-text">In Stock Items Only</span>
        </label>
      </div>
    </div>
  );
};
