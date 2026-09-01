'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { X, User, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/context/cartStore';
import { useAuthStore } from '@/context/authStore';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
}

const MAIN_NAV = [
  { name: 'HOME', href: '/' },
  { name: 'PRODUCTS', href: '/products' },
  { name: 'ORDERS', href: '/orders' },
  { name: 'ABOUT', href: '/our-story' },
];

const CATEGORIES = [
  { name: '💙 Baby Boy', href: '/products?category=baby-boy' },
  { name: '🩷 Baby Girl', href: '/products?category=baby-girl' },
  { name: '🤍 Mom Care', href: '/products?category=mom-care' },
  { name: '🍼 Feeding', href: '/products?category=feeding-nursing' },
  { name: '🛁 Bath & Care', href: '/products?category=bath-care' },
  { name: '🧸 Toys & Gifts', href: '/products?category=toys-gifts' },
];

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const { getItemCount, openDrawer } = useCartStore();
  const { user, isAuthenticated, isAdmin } = useAuthStore();
  const cartCount = getItemCount();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 lg:hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#454545]/40 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="fixed inset-y-0 left-0 w-[80%] max-w-xs bg-[#FFFDFB] shadow-xl flex flex-col justify-between border-r border-[#EFEAE6] overflow-y-auto"
        >
          <div>
            {/* Top Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#EFEAE6]">
              <Logo size="sm" />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 text-[#454545] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Cart Trigger */}
            <div className="p-4 border-b border-[#EFEAE6]">
              <button
                onClick={() => {
                  onClose();
                  openDrawer();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#E5F4FC] text-[#4F7FA0] font-bold text-xs flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  Your Cart
                </span>
                <span className="bg-[#4F7FA0] text-white px-2 py-0.5 rounded-full text-[10px]">
                  {cartCount} items
                </span>
              </button>
            </div>

            {/* Main Navigation Links */}
            <nav className="p-4 space-y-1 border-b border-[#EFEAE6]">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-bold text-[#454545] hover:bg-[#E5F4FC]/50 hover:text-[#4F7FA0] transition-colors"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#7A7A7A]" />
                </Link>
              ))}
            </nav>

            {/* Quick Category Buttons */}
            <div className="p-4 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A7A] px-3 mb-1">
                Shop By Category
              </div>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  onClick={onClose}
                  className="block px-3 py-1.5 rounded-lg text-xs font-medium text-[#454545] hover:bg-[#FCE8EE]/50 hover:text-[#B86F84] transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Account Section */}
          <div className="p-4 border-t border-[#EFEAE6] bg-white space-y-2">
            {isAuthenticated ? (
              <div className="space-y-1.5">
                <Link
                  href="/account"
                  onClick={onClose}
                  className="flex items-center gap-2 text-xs font-bold text-[#454545] hover:text-[#4F7FA0]"
                >
                  <User className="w-4 h-4 text-[#8EC5E8]" />
                  <span>{user?.name || 'My Account'}</span>
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="block text-center text-xs font-semibold py-1.5 rounded-lg bg-[#4F7FA0] text-white"
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
                  className="flex-1 py-2 text-center text-xs font-bold rounded-xl bg-[#E5F4FC] text-[#4F7FA0]"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={onClose}
                  className="flex-1 py-2 text-center text-xs font-bold rounded-xl bg-[#FCE8EE] text-[#B86F84]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
