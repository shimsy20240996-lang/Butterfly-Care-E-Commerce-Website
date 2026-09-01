'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuthStore } from '@/context/authStore';
import { useSettingsStore } from '@/context/settingsStore';
import { useToastStore } from '@/context/toastStore';
import { api } from '@/lib/api';
import { StoreSettings } from '@/types';
import { Settings, Save, ShieldAlert, Truck, Building2, MessageCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { settings, updateLocalSettings } = useSettingsStore();
  const { showToast } = useToastStore();

  const [form, setForm] = useState<StoreSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const data = await api.put<{ success: boolean; settings: StoreSettings; message: string }>('/settings', form);
      if (data && data.settings) {
        updateLocalSettings(data.settings);
        showToast('Store settings and delivery rules saved successfully!');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to save settings.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDistrictFeeChange = (index: number, fee: number) => {
    const updated = [...(form.districtDeliveryFees || [])];
    updated[index] = { ...updated[index], fee: Number(fee) };
    setForm({ ...form, districtDeliveryFees: updated });
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
        <div className="pb-4 border-b border-butterfly-border flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text">
              Store Configuration & Delivery Rules
            </h1>
            <p className="text-xs text-butterfly-textMuted mt-1">
              Customize brand info, announcement bar, WhatsApp numbers, and Sri Lankan district delivery fees.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6 text-xs max-w-4xl">
          {/* 1. General Brand Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
            <h2 className="font-serif text-base font-bold text-butterfly-text pb-2 border-b border-butterfly-border">
              Brand & Contact Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Store Name</label>
                <input
                  type="text"
                  value={form.storeName || ''}
                  onChange={(e) => setForm({ ...form, storeName: e.target.value })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={form.tagline || ''}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Top Announcement Bar Text</label>
              <input
                type="text"
                value={form.announcementText || ''}
                onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
                className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">WhatsApp Hotline Phone</label>
                <input
                  type="text"
                  value={form.whatsappNumber || ''}
                  onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Contact Email</label>
                <input
                  type="email"
                  value={form.contactEmail || ''}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Customer Care Phone</label>
                <input
                  type="text"
                  value={form.contactPhone || ''}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Physical Boutique / HQ Address</label>
              <input
                type="text"
                value={form.address || ''}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
              />
            </div>
          </div>

          {/* 2. Sri Lankan District Delivery Fees */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-butterfly-border">
              <h2 className="font-serif text-base font-bold text-butterfly-text flex items-center gap-2">
                <Truck className="w-4 h-4 text-butterfly-primary" />
                <span>Sri Lanka Delivery Rules & Thresholds</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">Free Delivery Threshold (LKR)</label>
                <input
                  type="number"
                  value={form.freeShippingThreshold || 7500}
                  onChange={(e) => setForm({ ...form, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg font-bold text-butterfly-primary"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Default Standard Delivery Fee (LKR)</label>
                <input
                  type="number"
                  value={form.defaultDeliveryFee || 450}
                  onChange={(e) => setForm({ ...form, defaultDeliveryFee: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Express Delivery Fee (LKR)</label>
                <input
                  type="number"
                  value={form.expressDeliveryFee || 850}
                  onChange={(e) => setForm({ ...form, expressDeliveryFee: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>
            </div>

            <div className="pt-2">
              <h4 className="font-bold text-xs text-butterfly-text mb-2">District Delivery Rates (Configurable):</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-56 overflow-y-auto p-2 border border-butterfly-border rounded-2xl bg-butterfly-bg/50">
                {(form.districtDeliveryFees || []).map((d, idx) => (
                  <div key={d.district} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-butterfly-border">
                    <span className="font-semibold">{d.district}</span>
                    <input
                      type="number"
                      value={d.fee}
                      onChange={(e) => handleDistrictFeeChange(idx, Number(e.target.value))}
                      className="w-16 p-1 text-center font-bold text-xs rounded border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Bank Account Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
            <h2 className="font-serif text-base font-bold text-butterfly-text pb-2 border-b border-butterfly-border flex items-center gap-2">
              <Building2 className="w-4 h-4 text-butterfly-primary" />
              <span>Direct Bank Deposit Account (Displayed at Checkout)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Bank Name</label>
                <input
                  type="text"
                  value={form.bankDetails?.bankName || ''}
                  onChange={(e) => setForm({ ...form, bankDetails: { ...form.bankDetails, bankName: e.target.value } })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Branch</label>
                <input
                  type="text"
                  value={form.bankDetails?.branch || ''}
                  onChange={(e) => setForm({ ...form, bankDetails: { ...form.bankDetails, branch: e.target.value } })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={form.bankDetails?.accountName || ''}
                  onChange={(e) => setForm({ ...form, bankDetails: { ...form.bankDetails, accountName: e.target.value } })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Account Number</label>
                <input
                  type="text"
                  value={form.bankDetails?.accountNumber || ''}
                  onChange={(e) => setForm({ ...form, bankDetails: { ...form.bankDetails, accountNumber: e.target.value } })}
                  className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg font-mono font-bold text-butterfly-primary"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Deposit Slip Instructions</label>
              <input
                type="text"
                value={form.bankDetails?.instructions || ''}
                onChange={(e) => setForm({ ...form, bankDetails: { ...form.bankDetails, instructions: e.target.value } })}
                className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSaving}
              className="px-10 py-4 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-widest transition-all shadow-card flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving Changes...' : 'Save All Settings'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
