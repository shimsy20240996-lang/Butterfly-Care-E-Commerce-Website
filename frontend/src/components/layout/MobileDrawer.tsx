'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { X, Heart, User, Search, ShoppingBag, PhoneCall, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/context/cartStore';
import { useWishlistStore } from '@/context/wishlistStore';
import { useAuthStore } from '@/context/authStore';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

const NAV_CATEGORIES = [
  { name: 'Shop All', href: '/shop' },
  { name: 'Baby Care', href: '/shop?category=baby-care' },
  { name: 'Mom Care', href: '/shop?category=mom-care' },
  { name: 'Feeding & Nursing', href: '/shop?category=feeding-nursing' },
  { name: 'Sleep & Snuggle', href: '/shop?category=sleep-snuggle' },
  { name: 'Bath & Care', href: '/shop?category=bath-care' },
  { name: 'Clothing', href: '/shop?category=clothing' },
  { name: 'Toys & Gifts', href: '/shop?category=toys-gifts' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Contact', href: '/contact' },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const { getItemCount, openDrawer } = useCartStore();
  const { wishlistIds } = useWishlistStore();
  const { user, isAuthenticated, isAdmin } = useAuthStore();

  const cartCount = getItemCount();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 lg:hidden">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-butterfly-text/40 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#FAF6F3] shadow-card flex flex-col justify-between border-r border-butterfly-border overflow-y-auto"
        >
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between p-5 border-b border-butterfly-border">
              <Logo size="sm" />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-butterfly-soft text-butterfly-text transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Bar (Search, Wishlist, Cart) */}
            <div className="grid grid-cols-3 gap-2 p-4 border-b border-butterfly-border bg-white/50">
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-butterfly-soft/40 hover:bg-butterfly-soft text-butterfly-text transition-colors text-xs"
              >
                <Search className="w-4 h-4 mb-1 text-butterfly-primary" />
                <span>Search</span>
              </button>

              <Link
                href="/account?tab=wishlist"
                onClick={onClose}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-butterfly-soft/40 hover:bg-butterfly-soft text-butterfly-text transition-colors text-xs relative"
              >
                <Heart className="w-4 h-4 mb-1 text-butterfly-primary" />
                <span>Wishlist</span>
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-3 w-4 h-4 bg-butterfly-primary text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {wishlistIds.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => {
                  onClose();
                  openDrawer();
                }}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-butterfly-soft/40 hover:bg-butterfly-soft text-butterfly-text transition-colors text-xs relative"
              >
                <ShoppingBag className="w-4 h-4 mb-1 text-butterfly-primary" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-3 w-4 h-4 bg-butterfly-primary text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Category Navigation Links */}
            <nav className="p-4 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-widest text-butterfly-textMuted px-3 py-2">
                Browse Collections
              </div>
              {NAV_CATEGORIES.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-butterfly-text hover:bg-butterfly-soft/60 hover:text-butterfly-primary transition-colors"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-butterfly-textMuted/60" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom Account & Support Links */}
          <div className="p-5 border-t border-butterfly-border bg-white/60 space-y-3">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  href="/account"
                  onClick={onClose}
                  className="flex items-center gap-2.5 text-sm font-medium text-butterfly-text hover:text-butterfly-primary"
                >
                  <User className="w-4 h-4 text-butterfly-primary" />
                  <span>{user?.name || 'My Account'}</span>
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="block text-xs font-semibold text-white bg-butterfly-primary px-3 py-1.5 rounded-lg text-center"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/auth/login"
                  onClick={onClose}
                  className="flex-1 py-2 text-center text-xs font-semibold rounded-xl bg-butterfly-soft hover:bg-butterfly-secondary text-butterfly-text transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={onClose}
                  className="flex-1 py-2 text-center text-xs font-semibold rounded-xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            <div className="pt-2 text-center">
              <Link
                href="/track-order"
                onClick={onClose}
                className="text-xs font-medium text-butterfly-textMuted hover:text-butterfly-text underline underline-offset-4"
              >
                Track My Order
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
