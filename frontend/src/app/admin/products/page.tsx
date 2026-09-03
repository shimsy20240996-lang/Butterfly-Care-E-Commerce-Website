'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { api } from '@/lib/api';
import { Product, Category } from '@/types';
import { formatLKR } from '@/lib/currency';
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  ShieldAlert
} from 'lucide-react';

export default function AdminProductsPage() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { showToast } = useToastStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [discountPrice, setDiscountPrice] = useState<number | string>('');
  const [stock, setStock] = useState<number | string>(10);
  const [brand, setBrand] = useState('Butterfly');
  const [ageGroup, setAgeGroup] = useState('0-36 months');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('100% GOTS Organic Cotton / Non-toxic');
  const [gender, setGender] = useState<'boy' | 'girl' | 'unisex' | 'mom'>('unisex');
  const [sale, setSale] = useState(false);
  const [careInstructions, setCareInstructions] = useState('Gentle cold machine wash or hand wash.');
  const [imageUrl, setImageUrl] = useState('');
  const [sizesStr, setSizesStr] = useState('');
  const [colorsStr, setColorsStr] = useState('');
  const [featured, setFeatured] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [newArrival, setNewArrival] = useState(true);
  const [active, setActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodData, catData] = await Promise.all([
        api.get<{ products: Product[] }>('/products', { all: 'true', limit: 100 }),
        api.get<{ categories: Category[] }>('/categories', { all: 'true' })
      ]);
      if (prodData && prodData.products) setProducts(prodData.products);
      if (catData && catData.categories) {
        setCategories(catData.categories);
        if (catData.categories.length > 0 && !category) {
          setCategory(catData.categories[0]._id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setName('');
    setSku(`BC-${Math.floor(1000 + Math.random() * 9000)}`);
    setCategory(categories[0]?._id || '');
    setPrice('');
    setDiscountPrice('');
    setStock(15);
    setBrand('Butterfly Pure');
    setAgeGroup('0-36 months');
    setGender('unisex');
    setSale(false);
    setShortDescription('');
    setDescription('');
    setMaterials('100% GOTS Organic Cotton / Hypoallergenic');
    setCareInstructions('Gentle cold machine wash.');
    setImageUrl('https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop');
    setSizesStr('250ml, 500ml');
    setColorsStr('Natural, Cream');
    setFeatured(false);
    setBestSeller(false);
    setNewArrival(true);
    setActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setSku(p.sku);
    setCategory(p.category);
    setPrice(p.price);
    setDiscountPrice(p.discountPrice || '');
    setStock(p.stock);
    setBrand(p.brand);
    setAgeGroup(p.ageGroup);
    setGender(p.gender || 'unisex');
    setSale(Boolean(p.sale));
    setShortDescription(p.shortDescription);
    setDescription(p.description);
    setMaterials(p.materials);
    setCareInstructions(p.careInstructions);
    setImageUrl(p.images[0] || '');
    setSizesStr((p.sizes || []).join(', '));
    setColorsStr((p.colors || []).join(', '));
    setFeatured(p.featured);
    setBestSeller(p.bestSeller);
    setNewArrival(p.newArrival);
    setActive(p.active);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      showToast('Name and price are required.', 'error');
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        name: name.trim(),
        sku: sku.trim().toUpperCase(),
        category,
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : undefined,
        stock: Number(stock),
        brand,
        ageGroup,
        gender,
        sale,
        shortDescription,
        description,
        materials,
        careInstructions,
        images: [imageUrl],
        sizes: sizesStr.split(',').map((s) => s.trim()).filter(Boolean),
        colors: colorsStr.split(',').map((c) => c.trim()).filter(Boolean),
        featured,
        bestSeller,
        newArrival,
        active
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload);
        showToast(`Product "${name}" updated successfully!`);
      } else {
        await api.post('/products', payload);
        showToast(`Product "${name}" created successfully!`);
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'Failed to save product.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (p: Product) => {
    if (!window.confirm(`Are you sure you want to delete "${p.name}"?`)) return;
    try {
      await api.delete(`/products/${p._id}`);
      showToast(`Product "${p.name}" deleted.`);
      setProducts(products.filter((item) => item._id !== p._id));
    } catch (err: any) {
      showToast(err.message || 'Failed to delete product.', 'error');
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(search.toLowerCase()))
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
              Product Management
            </h1>
            <p className="text-xs text-butterfly-textMuted mt-1">
              Add, edit, restock, and manage all mother & baby care items in BUTTERFLY catalog.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-5 py-3 rounded-2xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-card flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Product</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-butterfly-border shadow-soft flex items-center gap-3">
          <Search className="w-4 h-4 text-butterfly-textMuted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title, SKU, or category..."
            className="w-full text-xs bg-transparent focus:outline-none text-butterfly-text"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-xs text-butterfly-textMuted hover:text-butterfly-text">
              Clear
            </button>
          )}
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-butterfly-border shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-butterfly-text">
              <thead className="bg-butterfly-soft/60 border-b border-butterfly-border text-[11px] font-bold uppercase tracking-wider text-butterfly-textMuted">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-butterfly-border">
                {filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-butterfly-bg/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-butterfly-soft shrink-0 border border-butterfly-border">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-butterfly-text line-clamp-1 max-w-xs">{p.name}</p>
                          <div className="flex gap-1.5 mt-0.5">
                            {p.featured && <span className="text-[9px] bg-butterfly-soft px-1.5 py-0.5 rounded font-bold text-butterfly-primary">Featured</span>}
                            {p.bestSeller && <span className="text-[9px] bg-amber-100 px-1.5 py-0.5 rounded font-bold text-amber-800">Best Seller</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-butterfly-textMuted">{p.categoryName || 'Care'}</td>
                    <td className="p-4 font-mono text-butterfly-textMuted">{p.sku}</td>
                    <td className="p-4 font-semibold">
                      <span>{formatLKR(p.discountPrice || p.price)}</span>
                      {p.discountPrice && (
                        <span className="block text-[10px] text-butterfly-textMuted line-through">
                          {formatLKR(p.price)}
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          p.stock > 10
                            ? 'bg-emerald-100 text-emerald-800'
                            : p.stock > 0
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {p.stock > 0 ? `${p.stock} units` : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          p.active ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                      />
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-2 rounded-xl bg-butterfly-soft hover:bg-butterfly-secondary text-butterfly-text transition-colors"
                        aria-label="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create / Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-card border border-butterfly-border p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-butterfly-border">
                <h3 className="font-serif text-xl font-bold text-butterfly-text">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-butterfly-soft">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Product Title *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Organic Chamomile Baby Wash"
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">SKU *</label>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value.toUpperCase())}
                      placeholder="BC-BW-001"
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg uppercase font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg font-medium"
                    >
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Gender / Target *</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg font-medium"
                    >
                      <option value="unisex">Unisex 🤍</option>
                      <option value="boy">Baby Boy 💙</option>
                      <option value="girl">Baby Girl 🩷</option>
                      <option value="mom">Mom Care 🌸</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Price (LKR) *</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="3200"
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Discount Price (LKR)</label>
                    <input
                      type="number"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="2850 (Optional)"
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Age Group</label>
                    <input
                      type="text"
                      value={ageGroup}
                      onChange={(e) => setAgeGroup(e.target.value)}
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-butterfly-text mb-1">Image URL (Unsplash or Cloudinary) *</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-butterfly-text mb-1">Short Summary (Sub-heading)</label>
                  <input
                    type="text"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Brief 1-sentence product summary"
                    className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-butterfly-text mb-1">Detailed Description *</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Full product story, benefits, and details..."
                    className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Available Sizes (Comma separated)</label>
                    <input
                      type="text"
                      value={sizesStr}
                      onChange={(e) => setSizesStr(e.target.value)}
                      placeholder="e.g. 0-3M, 3-6M, 6-12M"
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Available Colors (Comma separated)</label>
                    <input
                      type="text"
                      value={colorsStr}
                      onChange={(e) => setColorsStr(e.target.value)}
                      placeholder="e.g. Rose Dust, Warm Oat, Cream"
                      className="w-full p-3 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 rounded-2xl bg-butterfly-bg border border-butterfly-border text-xs font-semibold text-butterfly-text">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-butterfly-primary" />
                    <span>Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={bestSeller} onChange={(e) => setBestSeller(e.target.checked)} className="accent-butterfly-primary" />
                    <span>Best Seller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={newArrival} onChange={(e) => setNewArrival(e.target.checked)} className="accent-butterfly-primary" />
                    <span>New Arrival</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={sale} onChange={(e) => setSale(e.target.checked)} className="accent-butterfly-primary" />
                    <span>On Sale</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="accent-butterfly-primary" />
                    <span>Active in Store</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-butterfly-border">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-3.5 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white font-bold uppercase tracking-wider transition-all shadow-card"
                  >
                    {isSaving ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3.5 rounded-full bg-white border border-butterfly-border text-butterfly-text font-semibold"
                  >
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
