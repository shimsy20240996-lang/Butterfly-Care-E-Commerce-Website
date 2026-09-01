import React from 'react';

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-butterfly-border p-3 shadow-soft flex flex-col gap-3 animate-pulse">
    <div className="w-full aspect-square bg-butterfly-soft rounded-xl" />
    <div className="h-3 w-1/3 bg-butterfly-soft rounded" />
    <div className="h-4 w-3/4 bg-butterfly-soft rounded" />
    <div className="flex items-center justify-between pt-2 mt-auto">
      <div className="h-5 w-1/2 bg-butterfly-soft rounded" />
      <div className="h-8 w-8 bg-butterfly-soft rounded-full" />
    </div>
  </div>
);

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ProductDetailSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
    <div className="aspect-square bg-butterfly-soft rounded-3xl" />
    <div className="space-y-4">
      <div className="h-4 w-1/4 bg-butterfly-soft rounded" />
      <div className="h-8 w-3/4 bg-butterfly-soft rounded" />
      <div className="h-6 w-1/3 bg-butterfly-soft rounded" />
      <div className="h-20 w-full bg-butterfly-soft rounded-xl" />
      <div className="h-12 w-full bg-butterfly-soft rounded-xl" />
    </div>
  </div>
);
