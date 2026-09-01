'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileDrawer } from './MobileDrawer';
import { SearchModal } from '@/components/shop/SearchModal';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useCartStore } from '@/context/cartStore';
import { useWishlistStore } from '@/context/wishlistStore';
import { useAuthStore } from '@/context/authStore';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'PRODUCTS', href: '/products', prominent: true },
  { name: 'BABY BOY 💙', href: '/products?gender=boy', isBoy: true },
  { name: 'BABY GIRL 🩷', href: '/products?gender=girl', isGirl: true },
  { name: 'MOM CARE', href: '/products?gender=mom' },
  { name: 'ABOUT', href: '/our-story' },
  { name: 'CONTACT', href: '/contact' }
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const { getItemCount, openDrawer } = useCartStore();
  const { wishlistIds } = useWishlistStore();
  const { user, isAuthenticated, isAdmin } = useAuthStore();

  const cartCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Main Header Container */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'glass-nav border-b border-[#E9E9E9] shadow-sm py-2 md:py-3'
              : 'bg-[#FFFDF9] border-b border-[#E9E9E9] py-3 md:py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              {/* LEFT: Search Trigger (Desktop) & Mobile Menu Toggle */}
              <div className="flex items-center gap-2 flex-1 md:flex-initial">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 -ml-2 rounded-xl text-[#3F4650] hover:bg-black/5 lg:hidden transition-colors"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-6 h-6" />
                </button>

                {/* Desktop Search Trigger */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full bg-white hover:bg-white/90 border border-[#E9E9E9] text-[#747A82] text-xs font-medium transition-all shadow-xs group w-56 lg:w-64"
                >
                  <Search className="w-3.5 h-3.5 text-[#5BA7D1] group-hover:scale-110 transition-transform" />
                  <span className="truncate">Search for something special...</span>
                  <kbd className="ml-auto text-[10px] bg-[#F8F9FA] px-1.5 py-0.5 rounded text-[#747A82] border border-[#E9E9E9]">
                    ⌘K
                  </kbd>
                </button>
              </div>

              {/* CENTER: Logo */}
              <div className="flex-1 flex justify-center">
                <Logo size="md" />
              </div>

              {/* RIGHT: Account, Wishlist, Cart */}
              <div className="flex items-center justify-end gap-1.5 sm:gap-3 flex-1 md:flex-initial">
                {/* Mobile Search Icon */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full text-[#3F4650] hover:bg-black/5 md:hidden transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Account / Profile Link */}
                {isAuthenticated ? (
                  <div className="relative group">
                    <Link
                      href={isAdmin ? '/admin' : '/account'}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-black/5 text-[#3F4650] transition-colors text-xs font-semibold"
                    >
                      <UserIcon className="w-4 h-4 text-[#8EC5E8]" />
                      <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0] || 'Account'}</span>
                    </Link>

                    {/* Quick Account Dropdown */}
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-2xl shadow-xl border border-[#E9E9E9] p-2 hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-1 z-50">
                      <div className="px-3 py-2 border-b border-[#E9E9E9] text-xs">
                        <p className="font-semibold text-[#3F4650] truncate">{user?.name}</p>
                        <p className="text-[#747A82] truncate text-[11px]">{user?.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#5BA7D1] hover:bg-[#F3FAFE] rounded-xl transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        href="/account?tab=orders"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-[#3F4650] hover:bg-black/5 rounded-xl transition-colors"
                      >
                        <Package className="w-3.5 h-3.5 text-[#747A82]" />
                        My Orders
                      </Link>
                      <Link
                        href="/account"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-[#3F4650] hover:bg-black/5 rounded-xl transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-[#747A82]" />
                        Profile Settings
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-black/5 border border-[#E9E9E9] text-[#3F4650] transition-colors text-xs font-semibold"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#8EC5E8]" />
                    <span>Sign In</span>
                  </Link>
                )}

                {/* Wishlist Link */}
                <Link
                  href="/account?tab=wishlist"
                  className="relative p-2 rounded-full text-[#3F4650] hover:bg-black/5 transition-colors"
                  aria-label="View wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistIds.length > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#E8A6B8] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-up">
                      {wishlistIds.length}
                    </span>
                  )}
                </Link>

                {/* Cart Icon & Drawer Trigger */}
                <button
                  onClick={openDrawer}
                  className="relative p-2 rounded-full text-[#3F4650] hover:bg-black/5 transition-colors flex items-center gap-1.5"
                  aria-label="View shopping cart"
                >
                  <ShoppingBag className="w-5 h-5 text-[#3F4650]" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#8EC5E8] text-[#3F4650] text-[10px] font-bold rounded-full flex items-center justify-center transition-transform scale-100 animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Menu Bar */}
          <nav className="hidden lg:block border-t border-[#E9E9E9]/60 mt-3 pt-2.5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ul className="flex items-center justify-center gap-7 xl:gap-9 text-xs font-medium tracking-[0.14em] text-[#3F4650]">
                {NAV_LINKS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`transition-all duration-200 pb-1 flex items-center gap-1 ${
                          item.prominent
                            ? 'px-3 py-1 rounded-full bg-[#3F4650] text-white font-bold tracking-wider hover:bg-[#5A4945]'
                            : item.isBoy
                            ? 'hover:text-[#5BA7D1] font-semibold'
                            : item.isGirl
                            ? 'hover:text-[#D77F99] font-semibold'
                            : 'hover:text-[#5BA7D1]'
                        } ${
                          isActive && !item.prominent
                            ? 'border-b-2 border-[#3F4650] font-bold'
                            : ''
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
