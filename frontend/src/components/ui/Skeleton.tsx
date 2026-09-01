import React from 'react';

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl overflow-hidden border border-[#E9E9E9] p-4 shadow-sm flex flex-col gap-3 animate-pulse">
    <div className="w-full aspect-square bg-[#F8F9FA] rounded-2xl" />
    <div className="h-3 w-1/3 bg-[#F8F9FA] rounded-full" />
    <div className="h-4 w-3/4 bg-[#F8F9FA] rounded-full" />
    <div className="flex items-center justify-between pt-2 mt-auto">
      <div className="h-5 w-1/2 bg-[#F8F9FA] rounded-full" />
      <div className="h-8 w-8 bg-[#F8F9FA] rounded-full" />
    </div>
  </div>
);

export const ProductSkeleton = ProductCardSkeleton;

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ProductDetailSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
    <div className="aspect-square bg-[#F8F9FA] rounded-3xl" />
    <div className="space-y-4">
      <div className="h-4 w-1/4 bg-[#F8F9FA] rounded" />
      <div className="h-8 w-3/4 bg-[#F8F9FA] rounded" />
      <div className="h-6 w-1/3 bg-[#F8F9FA] rounded" />
      <div className="h-20 w-full bg-[#F8F9FA] rounded-2xl" />
      <div className="h-12 w-full bg-[#F8F9FA] rounded-2xl" />
    </div>
  </div>
);
