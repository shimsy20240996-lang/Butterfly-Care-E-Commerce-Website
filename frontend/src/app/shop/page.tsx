'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ShopRedirectContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = searchParams.toString();
    router.replace(params ? `/products?${params}` : '/products');
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#FFFDFB] flex items-center justify-center">
      <div className="text-center space-y-2">
        <div className="w-8 h-8 border-2 border-[#8EC5E8] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-[#7A7A7A]">Loading products...</p>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFFDFB] flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-[#8EC5E8] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#7A7A7A]">Loading products...</p>
          </div>
        </div>
      }
    >
      <ShopRedirectContent />
    </Suspense>
  );
}
