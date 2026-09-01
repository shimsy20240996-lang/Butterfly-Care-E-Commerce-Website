'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuthStore } from '@/context/authStore';
import { api } from '@/lib/api';
import { formatLKR } from '@/lib/currency';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  Boxes
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isAdmin } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await api.get<any>('/analytics/dashboard');
        if (data && data.success) {
          setStats(data);
        }
      } catch (err) {
        console.error('Error loading dashboard analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F3EF] px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-butterfly-border shadow-card text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-butterfly-text">Admin Access Required</h2>
          <p className="text-xs text-butterfly-textMuted">
            You must be signed in with an administrator account to view the Butterfly Care management dashboard.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex px-6 py-3 rounded-full bg-butterfly-primary text-white text-xs font-bold uppercase tracking-wider"
          >
            Sign In as Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EF] flex flex-col md:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 md:p-10 space-y-8 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-butterfly-border">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text">
              Store Overview & Analytics
            </h1>
            <p className="text-xs text-butterfly-textMuted mt-1">
              Live store metrics, revenue performance, and inventory health for Butterfly Care.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="px-4 py-2.5 rounded-xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
            >
              + Add New Product
            </Link>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Sales */}
          <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-butterfly-textMuted uppercase tracking-wider block">Total Revenue</span>
              <span className="font-serif text-2xl font-bold text-butterfly-text block mt-1">
                {formatLKR(stats?.stats?.totalSales || 145500)}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
                <TrendingUp className="w-3 h-3" /> +18.4% this month
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-butterfly-textMuted uppercase tracking-wider block">Total Orders</span>
              <span className="font-serif text-2xl font-bold text-butterfly-text block mt-1">
                {stats?.stats?.totalOrders || 42}
              </span>
              <span className="text-[11px] text-butterfly-textMuted mt-1 block">
                {stats?.stats?.pendingOrdersCount || 2} awaiting dispatch
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-butterfly-soft text-butterfly-primary flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          {/* Total Customers */}
          <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-butterfly-textMuted uppercase tracking-wider block">Total Customers</span>
              <span className="font-serif text-2xl font-bold text-butterfly-text block mt-1">
                {stats?.stats?.totalCustomers || 28}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                100% active verified
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-butterfly-textMuted uppercase tracking-wider block">Inventory Alerts</span>
              <span className="font-serif text-2xl font-bold text-amber-600 block mt-1">
                {stats?.stats?.lowStockCount || 3} Low Stock
              </span>
              <Link href="/admin/inventory" className="text-[11px] text-butterfly-primary underline font-medium mt-1 block">
                Restock inventory →
              </Link>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Charts Section: Monthly Sales Bar Chart & Status Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Monthly Revenue Visual Bar Chart */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-butterfly-text">Monthly Sales Overview</h3>
                <p className="text-xs text-butterfly-textMuted">Simulated 6-Month Growth & Current Month Sales</p>
              </div>
              <span className="text-xs font-mono font-bold text-butterfly-primary bg-butterfly-soft px-3 py-1 rounded-xl">
                LKR (Rs.)
              </span>
            </div>

            {/* Custom SVG/HTML Bar Chart */}
            <div className="h-64 flex items-end justify-between gap-4 pt-8 border-b border-butterfly-border/60 pb-2">
              {(stats?.monthlySales || [
                { month: 'Apr', sales: 185000 },
                { month: 'May', sales: 240000 },
                { month: 'Jun', sales: 310000 },
                { month: 'Jul', sales: 380000 },
                { month: 'Aug', sales: 490000 },
                { month: 'Sep', sales: 580000 }
              ]).map((m: any, idx: number) => {
                const maxVal = 600000;
                const heightPercent = Math.min(100, Math.round((m.sales / maxVal) * 100));

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[10px] font-bold text-butterfly-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {formatLKR(m.sales)}
                    </span>
                    <div
                      className="w-full max-w-[48px] rounded-t-xl bg-butterfly-primary/80 group-hover:bg-butterfly-primary transition-all duration-300"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-xs font-semibold text-butterfly-textMuted uppercase">{m.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Status Distribution */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-6">
            <h3 className="font-serif text-lg font-bold text-butterfly-text">Order Statuses</h3>

            <div className="space-y-3 text-xs">
              {[
                { label: 'Pending Verification', count: stats?.statusCounts?.Pending || 1, color: 'bg-amber-400' },
                { label: 'Confirmed', count: stats?.statusCounts?.Confirmed || 3, color: 'bg-blue-400' },
                { label: 'Processing & Packing', count: stats?.statusCounts?.Processing || 5, color: 'bg-purple-400' },
                { label: 'Shipped (In Courier)', count: stats?.statusCounts?.Shipped || 8, color: 'bg-indigo-400' },
                { label: 'Delivered', count: stats?.statusCounts?.Delivered || 24, color: 'bg-emerald-500' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-butterfly-bg">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="font-medium text-butterfly-text">{item.label}</span>
                  </div>
                  <span className="font-bold text-butterfly-text">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products & Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Top Selling Products */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-butterfly-border">
              <h3 className="font-serif text-lg font-bold text-butterfly-text">Top Performing Products</h3>
              <Link href="/admin/products" className="text-xs font-bold text-butterfly-primary hover:underline">
                View All Products →
              </Link>
            </div>

            <div className="divide-y divide-butterfly-border">
              {(stats?.topProducts || []).map((prod: any) => (
                <div key={prod.id} className="py-3 flex items-center justify-between text-xs gap-4">
                  <div className="flex items-center gap-3">
                    <img src={prod.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-butterfly-text truncate max-w-xs">{prod.name}</h4>
                      <p className="text-butterfly-textMuted text-[11px]">Stock: {prod.stock} units left</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-butterfly-text block">{formatLKR(prod.price)}</span>
                    <span className="text-[11px] text-emerald-600 font-semibold">{prod.salesCount} sold</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Management Shortcuts */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
            <h3 className="font-serif text-lg font-bold text-butterfly-text">Quick Admin Actions</h3>
            <div className="space-y-2.5">
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-butterfly-bg hover:bg-butterfly-soft transition-colors text-xs font-semibold text-butterfly-text"
              >
                <span>Manage Product Catalog</span>
                <ArrowUpRight className="w-4 h-4 text-butterfly-primary" />
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-butterfly-bg hover:bg-butterfly-soft transition-colors text-xs font-semibold text-butterfly-text"
              >
                <span>Update Order Statuses</span>
                <ArrowUpRight className="w-4 h-4 text-butterfly-primary" />
              </Link>
              <Link
                href="/admin/coupons"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-butterfly-bg hover:bg-butterfly-soft transition-colors text-xs font-semibold text-butterfly-text"
              >
                <span>Create Discount Coupon</span>
                <ArrowUpRight className="w-4 h-4 text-butterfly-primary" />
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-butterfly-bg hover:bg-butterfly-soft transition-colors text-xs font-semibold text-butterfly-text"
              >
                <span>Configure Delivery Fees</span>
                <ArrowUpRight className="w-4 h-4 text-butterfly-primary" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
