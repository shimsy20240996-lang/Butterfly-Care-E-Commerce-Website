import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F8F3EF] px-4 py-16">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-12 border border-butterfly-border shadow-card space-y-5">
        <Logo size="md" className="justify-center mb-2" />
        <span className="font-serif text-6xl font-bold text-butterfly-primary block">404</span>
        <h1 className="font-serif text-2xl font-bold text-butterfly-text">Page Not Found</h1>
        <p className="text-xs text-butterfly-textMuted leading-relaxed">
          The page you are looking for may have been moved or doesn&apos;t exist. Let&apos;s guide you back to our loving collection.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-card flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-full bg-butterfly-soft hover:bg-butterfly-secondary text-butterfly-text text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Browse Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
