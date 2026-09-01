'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuthStore } from '@/context/authStore';
import { api } from '@/lib/api';
import { formatLKR } from '@/lib/currency';
import { Users, Search, Mail, Phone, Calendar, ShoppingBag, ShieldAlert } from 'lucide-react';

export default function AdminCustomersPage() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get<{ users: any[] }>('/users')
      .then((data) => {
        if (data && data.users) setCustomers(data.users);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search))
  );

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F3EF]">
        <div className="text-center p-8 bg-white rounded-3xl">
          <ShieldAlert className="w-10 h-10 text-rose-500 mx-auto mb-2" />
          <p className="font-bold text-butterfly-text">Admin Access Required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EF] flex flex-col md:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 md:p-10 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-butterfly-border">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text">
              Customer Directory
            </h1>
            <p className="text-xs text-butterfly-textMuted mt-1">
              View registered mothers, total orders placed, and lifetime spend.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-3.5 border border-butterfly-border shadow-soft flex items-center gap-3">
          <Search className="w-4 h-4 text-butterfly-textMuted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, email, or phone..."
            className="w-full text-xs bg-transparent focus:outline-none"
          />
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-3xl border border-butterfly-border shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-butterfly-text">
              <thead className="bg-butterfly-soft/60 border-b border-butterfly-border text-[11px] font-bold uppercase tracking-wider text-butterfly-textMuted">
                <tr>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Orders Placed</th>
                  <th className="p-4">Lifetime Spend</th>
                  <th className="p-4">Member Since</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-butterfly-border">
                {filtered.map((c) => (
                  <tr key={c._id} className="hover:bg-butterfly-bg/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-butterfly-soft text-butterfly-primary flex items-center justify-center font-bold">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-butterfly-text">{c.name}</p>
                          <span className="text-[10px] text-butterfly-textMuted capitalize">{c.role}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-butterfly-textMuted">{c.email}</td>
                    <td className="p-4 text-butterfly-textMuted">{c.phone || '—'}</td>
                    <td className="p-4 font-semibold">{c.orderCount || 0} orders</td>
                    <td className="p-4 font-bold text-butterfly-primary">{formatLKR(c.totalSpent || 0)}</td>
                    <td className="p-4 text-butterfly-textMuted">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
