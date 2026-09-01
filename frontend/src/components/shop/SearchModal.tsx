'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { formatLKR } from '@/lib/currency';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await api.get<{ products: Product[] }>('/products', { search: query, limit: 6 });
        setResults(data.products || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = ['Muslin Swaddle', 'Belly Oil', 'Baby Wash', 'Teething Toy', 'Nursing Pillow', 'Footie Romper'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-16 md:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-butterfly-text/40 backdrop-blur-sm"
        />

        {/* Search Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-floating border border-butterfly-border overflow-hidden z-10 p-6"
        >
          {/* Top Search Input */}
          <div className="relative flex items-center border-b border-butterfly-border pb-4">
            <Search className="w-5 h-5 text-butterfly-primary mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for blankets, baby wash, belly oils, swaddles..."
              className="w-full text-base md:text-lg text-butterfly-text placeholder-butterfly-textMuted/60 bg-transparent focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-butterfly-textMuted hover:text-butterfly-text mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-butterfly-soft text-butterfly-textMuted hover:text-butterfly-text transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions / Results */}
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
            {!query.trim() ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-butterfly-textMuted mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-butterfly-primary" />
                  Popular Suggestions
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs md:text-sm px-3.5 py-1.5 rounded-full bg-butterfly-bg hover:bg-butterfly-soft border border-butterfly-border text-butterfly-text transition-all duration-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : isLoading ? (
              <div className="py-12 text-center text-sm text-butterfly-textMuted animate-pulse">
                Searching our collection...
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-butterfly-textMuted mb-2">
                  Products ({results.length})
                </div>
                {results.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-butterfly-bg transition-colors group"
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-butterfly-soft shrink-0 border border-butterfly-border">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-butterfly-text truncate group-hover:text-butterfly-primary transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-butterfly-textMuted capitalize">{product.categoryName || 'Care Essential'}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-semibold text-butterfly-text">
                        {formatLKR(product.discountPrice || product.price)}
                      </span>
                      {product.discountPrice && (
                        <span className="block text-xs text-butterfly-textMuted line-through">
                          {formatLKR(product.price)}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}

                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 mt-4 text-sm font-medium text-butterfly-primary bg-butterfly-soft/60 hover:bg-butterfly-soft rounded-xl transition-colors"
                >
                  <span>View all results for &quot;{query}&quot;</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-sm text-butterfly-text font-medium">We couldn&apos;t find what you&apos;re looking for.</p>
                <p className="text-xs text-butterfly-textMuted mt-1">
                  Try searching for general terms like &quot;baby&quot;, &quot;swaddle&quot;, or &quot;nursing&quot;.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
