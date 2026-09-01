'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { useAuthStore } from '@/context/authStore';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Star,
  Tag,
  Boxes,
  Settings,
  ArrowLeft,
  LogOut,
  ShieldCheck
} from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Layers },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Inventory & Stock', href: '/admin/inventory', icon: Boxes },
  { name: 'Coupons & Promos', href: '/admin/coupons', icon: Tag },
  { name: 'Reviews Moderation', href: '/admin/reviews', icon: Star },
  { name: 'Store Settings', href: '/admin/settings', icon: Settings }
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-64 bg-white border-r border-butterfly-border min-h-screen flex flex-col justify-between shrink-0 p-5">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="pb-4 border-b border-butterfly-border">
          <Logo size="sm" />
          <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-butterfly-soft text-butterfly-primary text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Control Panel</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-butterfly-primary text-white shadow-soft font-bold'
                    : 'text-butterfly-text hover:bg-butterfly-bg hover:text-butterfly-primary'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Actions */}
      <div className="pt-4 border-t border-butterfly-border space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-butterfly-text hover:bg-butterfly-soft font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-butterfly-primary" />
          <span>Back to Live Store</span>
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out ({user?.name?.split(' ')[0] || 'Admin'})</span>
        </button>
      </div>
    </aside>
  );
};
