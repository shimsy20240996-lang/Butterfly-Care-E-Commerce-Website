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
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Package
} from 'lucide-react';
import { useCartStore } from '@/context/cartStore';
import { useWishlistStore } from '@/context/wishlistStore';
import { useAuthStore } from '@/context/authStore';

const NAV_ITEMS = [
  { name: 'HOME', href: '/' },
  {
    name: 'SHOP ALL',
    href: '/shop',
    dropdown: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/shop?filter=newArrival' },
      { name: 'Best Sellers', href: '/shop?filter=bestSeller' },
      { name: 'Gift Sets & Hampers', href: '/shop?category=toys-gifts' }
    ]
  },
  {
    name: 'BABY CARE',
    href: '/shop?category=baby-care',
    dropdown: [
      { name: 'Organic Skincare', href: '/shop?category=baby-care' },
      { name: 'Nappy & Barrier Creams', href: '/shop?category=baby-care' },
      { name: 'Baby Massage Oils', href: '/shop?category=baby-care' },
      { name: 'Gentle Cleansers', href: '/shop?category=baby-care' }
    ]
  },
  {
    name: 'MOM CARE',
    href: '/shop?category=mom-care',
    dropdown: [
      { name: 'Belly & Stretchmark Care', href: '/shop?category=mom-care' },
      { name: 'Nipple Balms & Nursing', href: '/shop?category=mom-care' },
      { name: 'Postpartum Recovery', href: '/shop?category=mom-care' },
      { name: 'Bamboo Loungewear', href: '/shop?category=mom-care' }
    ]
  },
  { name: 'FEEDING & NURSING', href: '/shop?category=feeding-nursing' },
  { name: 'SLEEP & SNUGGLE', href: '/shop?category=sleep-snuggle' },
  { name: 'BATH & CARE', href: '/shop?category=bath-care' },
  { name: 'CLOTHING', href: '/shop?category=clothing' },
  { name: 'TOYS & GIFTS', href: '/shop?category=toys-gifts' },
  { name: 'OUR STORY', href: '/our-story' },
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
        {/* Announcement Bar */}
        <AnnouncementBar />

        {/* Main Header Container */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? 'glass-nav border-b border-butterfly-border shadow-soft py-2.5 md:py-3.5'
              : 'bg-[#F8F3EF] border-b border-butterfly-border/70 py-3 md:py-4'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              {/* LEFT: Search button (Desktop) & Mobile Menu Toggle */}
              <div className="flex items-center gap-2 flex-1 md:flex-initial">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 -ml-2 rounded-xl text-butterfly-text hover:bg-butterfly-soft lg:hidden transition-colors"
                  aria-label="Open mobile menu"
                >
                  <Menu className="w-6 h-6" />
                </button>

                {/* Desktop Search Trigger */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 hover:bg-white border border-butterfly-border text-butterfly-textMuted text-xs font-medium transition-all shadow-sm group w-52 lg:w-64"
                >
                  <Search className="w-3.5 h-3.5 text-butterfly-primary group-hover:scale-110 transition-transform" />
                  <span className="truncate">Search essentials...</span>
                  <kbd className="ml-auto text-[10px] bg-butterfly-soft px-1.5 py-0.5 rounded text-butterfly-textMuted">
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
                  className="p-2 rounded-full text-butterfly-text hover:bg-butterfly-soft md:hidden transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5 text-butterfly-text" />
                </button>

                {/* Account Link / Admin badge */}
                {isAuthenticated ? (
                  <div className="relative group">
                    <Link
                      href={isAdmin ? '/admin' : '/account'}
                      className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-butterfly-soft text-butterfly-text transition-colors text-xs font-medium"
                    >
                      <UserIcon className="w-4 h-4 text-butterfly-primary" />
                      <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0] || 'Account'}</span>
                    </Link>

                    {/* Quick Account Dropdown */}
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-2xl shadow-card border border-butterfly-border p-2 hidden group-hover:block transition-all animate-in fade-in slide-in-from-top-1">
                      <div className="px-3 py-2 border-b border-butterfly-border text-xs">
                        <p className="font-semibold text-butterfly-text truncate">{user?.name}</p>
                        <p className="text-butterfly-textMuted truncate text-[11px]">{user?.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-butterfly-primary hover:bg-butterfly-soft rounded-xl transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        href="/account?tab=orders"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-butterfly-text hover:bg-butterfly-soft rounded-xl transition-colors"
                      >
                        <Package className="w-3.5 h-3.5 text-butterfly-textMuted" />
                        My Orders
                      </Link>
                      <Link
                        href="/account"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-butterfly-text hover:bg-butterfly-soft rounded-xl transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-butterfly-textMuted" />
                        Profile Settings
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/auth/login"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-butterfly-soft text-butterfly-text transition-colors text-xs font-medium"
                  >
                    <UserIcon className="w-4 h-4 text-butterfly-primary" />
                    <span>Sign In</span>
                  </Link>
                )}

                {/* Wishlist Icon */}
                <Link
                  href="/account?tab=wishlist"
                  className="relative p-2 rounded-full text-butterfly-text hover:bg-butterfly-soft transition-colors"
                  aria-label="View wishlist"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistIds.length > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-butterfly-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-up">
                      {wishlistIds.length}
                    </span>
                  )}
                </Link>

                {/* Cart Icon & Drawer Trigger */}
                <button
                  onClick={openDrawer}
                  className="relative p-2 rounded-full text-butterfly-text hover:bg-butterfly-soft transition-colors flex items-center gap-1.5"
                  aria-label="View shopping cart"
                >
                  <ShoppingBag className="w-5 h-5 text-butterfly-text" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-butterfly-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale-up">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Menu Bar */}
          <nav className="hidden lg:block border-t border-butterfly-border/50 mt-3 pt-2.5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ul className="flex items-center justify-center gap-6 xl:gap-8 text-xs font-medium tracking-[0.12em] text-butterfly-text">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name} className="relative group py-1">
                      <Link
                        href={item.href}
                        className={`transition-colors flex items-center gap-1 hover:text-butterfly-primary pb-1 ${
                          isActive
                            ? 'text-butterfly-primary font-semibold border-b-2 border-butterfly-primary'
                            : 'text-butterfly-text/90'
                        }`}
                      >
                        <span>{item.name}</span>
                        {item.dropdown && (
                          <ChevronDown className="w-3 h-3 text-butterfly-textMuted group-hover:rotate-180 transition-transform duration-200" />
                        )}
                      </Link>

                      {/* Dropdown Menu */}
                      {item.dropdown && (
                        <div className="absolute left-0 top-full pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="bg-white rounded-2xl shadow-card border border-butterfly-border p-2">
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="block px-3.5 py-2 text-xs text-butterfly-text hover:text-butterfly-primary hover:bg-butterfly-soft/60 rounded-xl transition-colors font-normal tracking-normal"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
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
