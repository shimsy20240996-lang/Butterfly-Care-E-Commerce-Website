'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ShoppingBag } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || `BC-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#FFFDFB] px-4 py-16">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-[#EFEAE6] shadow-card space-y-5">
        {/* 🦋 Butterfly Icon */}
        <div className="w-20 h-20 rounded-full bg-[#E5F4FC] flex items-center justify-center mx-auto text-4xl shadow-soft">
          🦋
        </div>

        {/* Thank You Title */}
        <div className="space-y-1.5">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#454545]">
            Thank You!
          </h1>
          <p className="text-sm text-[#7A7A7A] leading-relaxed">
            Your BUTTERFLY CARE order has been placed successfully.
          </p>
        </div>

        {/* Order Number Box */}
        <div className="p-4 rounded-2xl bg-[#FFFDFB] border border-[#EFEAE6] text-xs text-[#454545] space-y-1">
          <p className="text-[#7A7A7A]">Order Reference Number:</p>
          <p className="font-mono text-base font-bold text-[#4F7FA0]">#{orderId}</p>
          <p className="text-[11px] text-[#7A7A7A]">We will send you a confirmation message shortly.</p>
        </div>

        {/* Action Button: CONTINUE SHOPPING */}
        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/products"
            className="w-full py-3.5 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2 active:scale-95"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/orders"
            className="w-full py-2.5 rounded-xl bg-white hover:bg-black/5 text-[#454545] border border-[#EFEAE6] text-xs font-semibold text-center transition-colors"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center bg-[#FFFDFB]">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-[#8EC5E8] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#7A7A7A]">Loading confirmation...</p>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
