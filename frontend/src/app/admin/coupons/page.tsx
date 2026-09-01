'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { api } from '@/lib/api';
import { Coupon } from '@/types';
import { Tag, Plus, Edit2, Trash2, X, Percent, DollarSign, ShieldAlert } from 'lucide-react';

export default function AdminCouponsPage() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { showToast } = useToastStore();

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState<number | string>(10);
  const [minOrderValue, setMinOrderValue] = useState<number | string>(3000);
  const [maxDiscount, setMaxDiscount] = useState<number | string>('');
  const [active, setActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const data = await api.get<{ coupons: Coupon[] }>('/coupons');
      if (data && data.coupons) setCoupons(data.coupons);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const openCreateModal = () => {
    setEditingCoupon(null);
    setCode('');
    setDiscountType('percentage');
    setDiscountValue(10);
    setMinOrderValue(3000);
    setMaxDiscount(1500);
    setActive(true);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !discountValue) {
      showToast('Please provide coupon code and discount value.', 'error');
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        code: code.trim().toUpperCase(),
        discountType,
        discountValue: Number(discountValue),
        minOrderValue: Number(minOrderValue) || 0,
        maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
        active
      };

      if (editingCoupon) {
        await api.put(`/coupons/${editingCoupon._id}`, payload);
        showToast(`Coupon "${code}" updated!`);
      } else {
        await api.post('/coupons', payload);
        showToast(`Coupon "${code}" created!`);
      }

      setIsModalOpen(false);
      fetchCoupons();
    } catch (err: any) {
      showToast(err.message || 'Failed to save coupon.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (c: Coupon) => {
    if (!window.confirm(`Delete coupon "${c.code}"?`)) return;
    try {
      await api.delete(`/coupons/${c._id}`);
      showToast(`Coupon "${c.code}" deleted.`);
      setCoupons(coupons.filter((item) => item._id !== c._id));
    } catch (err: any) {
      showToast(err.message || 'Failed to delete coupon.', 'error');
    }
  };

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
              Coupons & Promotional Discounts
            </h1>
            <p className="text-xs text-butterfly-textMuted mt-1">
              Create and manage checkout discount codes for customer promotions.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-5 py-3 rounded-2xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-card flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Coupon</span>
          </button>
        </div>

        {/* Coupons Table */}
        <div className="bg-white rounded-3xl border border-butterfly-border shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-butterfly-text">
              <thead className="bg-butterfly-soft/60 border-b border-butterfly-border text-[11px] font-bold uppercase tracking-wider text-butterfly-textMuted">
                <tr>
                  <th className="p-4">Coupon Code</th>
                  <th className="p-4">Discount Type</th>
                  <th className="p-4">Discount Value</th>
                  <th className="p-4">Min. Order Value</th>
                  <th className="p-4">Times Redeemed</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-butterfly-border">
                {coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-butterfly-bg/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-sm text-butterfly-primary">{c.code}</td>
                    <td className="p-4 font-medium capitalize">{c.discountType}</td>
                    <td className="p-4 font-bold">
                      {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `Rs. ${c.discountValue.toLocaleString()} OFF`}
                    </td>
                    <td className="p-4 font-medium">Rs. {c.minOrderValue?.toLocaleString() || 0}</td>
                    <td className="p-4 text-butterfly-textMuted">{c.usedCount || 0} times</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                        {c.active ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(c)} className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-card border border-butterfly-border p-6 sm:p-8 z-10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-butterfly-border">
                <h3 className="font-serif text-lg font-bold text-butterfly-text">Create Promotional Coupon</h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="e.g. MOMCARE15"
                    className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg uppercase font-mono font-bold"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Discount Type</label>
                    <select
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg font-semibold"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (LKR)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Discount Value *</label>
                    <input
                      type="number"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      placeholder={discountType === 'percentage' ? '15' : '500'}
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-1">Min. Order Value (LKR)</label>
                    <input
                      type="number"
                      value={minOrderValue}
                      onChange={(e) => setMinOrderValue(e.target.value)}
                      placeholder="3000"
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Max. Discount Cap (LKR)</label>
                    <input
                      type="number"
                      value={maxDiscount}
                      onChange={(e) => setMaxDiscount(e.target.value)}
                      placeholder="Optional"
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="accent-butterfly-primary" />
                  <span className="font-semibold">Coupon is Active</span>
                </label>

                <div className="flex gap-2 pt-2">
                  <button type="submit" disabled={isSaving} className="flex-1 py-3.5 rounded-full bg-butterfly-primary text-white font-bold uppercase tracking-wider">
                    {isSaving ? 'Saving...' : 'Save Coupon'}
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3.5 rounded-full bg-white border border-butterfly-border">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
