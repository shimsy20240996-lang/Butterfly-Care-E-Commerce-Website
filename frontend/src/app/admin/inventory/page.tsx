'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { api } from '@/lib/api';
import { Product } from '@/types';
import { formatLKR } from '@/lib/currency';
import { Boxes, AlertTriangle, CheckCircle, Search, Save, ShieldAlert } from 'lucide-react';

export default function AdminInventoryPage() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { showToast } = useToastStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStock, setFilterStock] = useState<'all' | 'low' | 'out'>('all');
  const [stockUpdates, setStockUpdates] = useState<Record<string, number>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const threshold = 10;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.get<{ products: Product[] }>('/products', { all: 'true', limit: 100 });
      if (data && data.products) {
        setProducts(data.products);
        const initialMap: Record<string, number> = {};
        data.products.forEach((p) => {
          initialMap[p._id] = p.stock;
        });
        setStockUpdates(initialMap);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStockChange = (id: string, val: number) => {
    setStockUpdates({ ...stockUpdates, [id]: Math.max(0, val) });
  };

  const handleSaveStock = async (product: Product) => {
    const newStock = stockUpdates[product._id];
    try {
      setSavingId(product._id);
      await api.put(`/products/${product._id}`, { stock: newStock });
      showToast(`Stock for "${product.name}" updated to ${newStock}!`);
      setProducts(products.map((p) => (p._id === product._id ? { ...p, stock: newStock } : p)));
    } catch (err: any) {
      showToast(err.message || 'Failed to update stock.', 'error');
    } finally {
      setSavingId(null);
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    if (filterStock === 'low') return matchesSearch && p.stock > 0 && p.stock <= threshold;
    if (filterStock === 'out') return matchesSearch && p.stock <= 0;
    return matchesSearch;
  });

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= threshold).length;
  const outOfStockCount = products.filter((p) => p.stock <= 0).length;

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
              Inventory & Low-Stock Alerts
            </h1>
            <p className="text-xs text-butterfly-textMuted mt-1">
              Live warehouse inventory monitor with fast single-click stock adjustments.
            </p>
          </div>
        </div>

        {/* Quick Summary Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setFilterStock('all')}
            className={`p-5 rounded-3xl border text-left transition-all ${
              filterStock === 'all'
                ? 'bg-butterfly-primary text-white border-butterfly-primary shadow-soft'
                : 'bg-white border-butterfly-border text-butterfly-text hover:bg-butterfly-bg'
            }`}
          >
            <span className="text-xs uppercase tracking-wider block opacity-80">All Products</span>
            <span className="font-serif text-2xl font-bold block mt-1">{products.length} Items</span>
          </button>

          <button
            onClick={() => setFilterStock('low')}
            className={`p-5 rounded-3xl border text-left transition-all ${
              filterStock === 'low'
                ? 'bg-amber-500 text-white border-amber-500 shadow-soft'
                : 'bg-white border-butterfly-border text-butterfly-text hover:bg-butterfly-bg'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider opacity-90">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Low Stock Alert (&le; {threshold})</span>
            </div>
            <span className="font-serif text-2xl font-bold block mt-1">{lowStockCount} Items</span>
          </button>

          <button
            onClick={() => setFilterStock('out')}
            className={`p-5 rounded-3xl border text-left transition-all ${
              filterStock === 'out'
                ? 'bg-rose-500 text-white border-rose-500 shadow-soft'
                : 'bg-white border-butterfly-border text-butterfly-text hover:bg-butterfly-bg'
            }`}
          >
            <span className="text-xs uppercase tracking-wider block opacity-80">Out of Stock</span>
            <span className="font-serif text-2xl font-bold block mt-1">{outOfStockCount} Items</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-3.5 border border-butterfly-border shadow-soft flex items-center gap-3">
          <Search className="w-4 h-4 text-butterfly-textMuted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title or SKU..."
            className="w-full text-xs bg-transparent focus:outline-none"
          />
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-3xl border border-butterfly-border shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-butterfly-text">
              <thead className="bg-butterfly-soft/60 border-b border-butterfly-border text-[11px] font-bold uppercase tracking-wider text-butterfly-textMuted">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Current Status</th>
                  <th className="p-4">Adjust Stock</th>
                  <th className="p-4 text-right">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-butterfly-border">
                {filtered.map((p) => {
                  const currentStockVal = stockUpdates[p._id] !== undefined ? stockUpdates[p._id] : p.stock;
                  const isModified = currentStockVal !== p.stock;

                  return (
                    <tr key={p._id} className="hover:bg-butterfly-bg/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-butterfly-soft shrink-0 border border-butterfly-border">
                            <Image src={p.images[0]} alt="" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-butterfly-text line-clamp-1 max-w-xs">{p.name}</p>
                            <span className="text-[11px] text-butterfly-textMuted">{p.categoryName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-butterfly-textMuted">{p.sku}</td>
                      <td className="p-4 font-semibold">{formatLKR(p.discountPrice || p.price)}</td>
                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold ${
                            p.stock > threshold
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.stock > 0
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {p.stock > threshold ? 'IN STOCK' : p.stock > 0 ? 'LOW STOCK' : 'OUT OF STOCK'}
                        </span>
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          value={currentStockVal}
                          onChange={(e) => handleStockChange(p._id, Number(e.target.value))}
                          className="w-20 p-2 rounded-xl border border-butterfly-border bg-butterfly-bg text-center font-bold text-xs"
                        />
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleSaveStock(p)}
                          disabled={savingId === p._id || !isModified}
                          className="px-4 py-2 rounded-xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 flex items-center gap-1.5 ml-auto"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>{savingId === p._id ? 'Saving...' : 'Save'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
