'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { MobileDrawer } from './MobileDrawer';
import { ShoppingBag, User as UserIcon, Menu } from 'lucide-react';
import { useCartStore } from '@/context/cartStore';
import { useAuthStore } from '@/context/authStore';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'PRODUCTS', href: '/products' },
  { name: 'ORDERS', href: '/orders' },
  { name: 'ABOUT', href: '/our-story' },
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { getItemCount, openDrawer } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const cartCount = getItemCount();

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFDFB] border-b border-[#EFEAE6] transition-all">
        {/* Top Minimal Notification */}
        <div className="bg-[#E5F4FC] text-[#4F7FA0] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide">
          <span>Made with love for moms & little ones • Islandwide Delivery 🚚</span>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button (Left on mobile) */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-xl text-[#454545] hover:bg-black/5 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Logo (Left on desktop, Centered on mobile) */}
            <div className="flex items-center">
              <Logo size="md" />
            </div>

            {/* Desktop Navigation Links (Center) */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider text-[#454545]">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`transition-colors py-1 ${
                      isActive
                        ? 'text-[#4F7FA0] font-bold border-b-2 border-[#4F7FA0]'
                        : 'hover:text-[#4F7FA0]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Account & Cart */}
            <div className="flex items-center gap-3">
              {/* Account / Login */}
              {isAuthenticated ? (
                <Link
                  href="/account"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black/5 text-[#454545] text-xs font-semibold transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#8EC5E8]" />
                  <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0] || 'Account'}</span>
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black/5 text-[#454545] text-xs font-semibold transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#8EC5E8]" />
                  <span>ACCOUNT</span>
                </Link>
              )}

              {/* 🛒 Cart Button with Animated Counter */}
              <button
                onClick={openDrawer}
                className="relative p-2 rounded-full hover:bg-black/5 text-[#454545] transition-all flex items-center gap-1.5"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#454545]" />
                <span className="hidden sm:inline text-xs font-bold text-[#454545]">CART</span>
                {cartCount > 0 && (
                  <span className="w-4 h-4 bg-[#E8A6B8] text-white text-[10px] font-bold rounded-full flex items-center justify-center -ml-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Simplified Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => {}}
      />
    </>
  );
};
