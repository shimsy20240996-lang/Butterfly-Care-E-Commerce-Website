'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { api } from '@/lib/api';
import { Category } from '@/types';
import { Layers, Plus, Edit2, Trash2, X, ShieldAlert } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { showToast } = useToastStore();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [featured, setFeatured] = useState(true);
  const [active, setActive] = useState(true);
  const [order, setOrder] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await api.get<{ categories: Category[] }>('/categories', { all: 'true' });
      if (data && data.categories) setCategories(data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setImage('https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop');
    setFeatured(true);
    setActive(true);
    setOrder(categories.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setImage(cat.image);
    setFeatured(cat.featured);
    setActive(cat.active);
    setOrder(cat.order || 1);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !image.trim()) {
      showToast('Please provide category name and image.', 'error');
      return;
    }

    try {
      setIsSaving(true);
      const payload = { name: name.trim(), description: description.trim(), image: image.trim(), featured, active, order: Number(order) };

      if (editingCategory) {
        await api.put(`/categories/${editingCategory._id}`, payload);
        showToast(`Category "${name}" updated!`);
      } else {
        await api.post('/categories', payload);
        showToast(`Category "${name}" created!`);
      }

      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      showToast(err.message || 'Failed to save category.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;
    try {
      await api.delete(`/categories/${cat._id}`);
      showToast(`Category "${cat.name}" deleted.`);
      setCategories(categories.filter((c) => c._id !== cat._id));
    } catch (err: any) {
      showToast(err.message || 'Failed to delete category.', 'error');
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
              Category Management
            </h1>
            <p className="text-xs text-butterfly-textMuted mt-1">
              Organize products into curated collections for moms and little ones.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-5 py-3 rounded-2xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-card flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat._id} className="bg-white rounded-3xl overflow-hidden border border-butterfly-border shadow-soft flex flex-col justify-between group">
              <div className="relative aspect-[16/9] w-full bg-butterfly-soft">
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-butterfly-text">
                  {cat.itemCount || 0} Products
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif text-base font-bold text-butterfly-text">{cat.name}</h3>
                  <p className="text-xs text-butterfly-textMuted line-clamp-2 mt-1">{cat.description}</p>
                </div>

                <div className="pt-3 border-t border-butterfly-border flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${cat.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                    {cat.active ? 'Active' : 'Disabled'}
                  </span>

                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(cat)} className="p-2 rounded-xl bg-butterfly-soft hover:bg-butterfly-secondary text-butterfly-text">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(cat)} className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-card border border-butterfly-border p-6 sm:p-8 z-10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-butterfly-border">
                <h3 className="font-serif text-lg font-bold text-butterfly-text">
                  {editingCategory ? 'Edit Category' : 'New Category'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Category Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Baby Care"
                    className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Image URL *</label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-butterfly-primary" />
                    <span>Featured on Home</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="accent-butterfly-primary" />
                    <span>Active</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" disabled={isSaving} className="flex-1 py-3.5 rounded-full bg-butterfly-primary text-white font-bold uppercase tracking-wider">
                    {isSaving ? 'Saving...' : 'Save Category'}
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
