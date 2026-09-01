'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/context/authStore';
import { useWishlistStore } from '@/context/wishlistStore';
import { useCartStore } from '@/context/cartStore';
import { useToastStore } from '@/context/toastStore';
import { api } from '@/lib/api';
import { Order, Product, Address } from '@/types';
import { formatLKR } from '@/lib/currency';
import {
  User,
  Package,
  Heart,
  MapPin,
  Lock,
  LogOut,
  ShoppingBag,
  Truck,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const SRI_LANKAN_DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Moneragala', 'Ratnapura', 'Kegalle'
];

function CustomerAccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';

  const { user, isAuthenticated, logout, updateUser } = useAuthStore();
  const { wishlistIds, toggleWishlist } = useWishlistStore();
  const { addItem, openDrawer } = useCartStore();
  const { showToast } = useToastStore();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [password, setPassword] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Address Form State
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddressLine, setNewAddressLine] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newDistrict, setNewDistrict] = useState('Colombo');
  const [newPostalCode, setNewPostalCode] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      setName(user.name);
      setPhone(user.phone || '');
    }

    // Fetch user orders
    setLoadingOrders(true);
    api.get<{ success: boolean; orders: Order[] }>('/orders/my-orders')
      .then((data) => {
        if (data && data.orders) setOrders(data.orders);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoadingOrders(false));

    // Fetch wishlist products
    if (wishlistIds.length > 0) {
      api.get<{ products: Product[] }>('/products', { limit: 50 })
        .then((data) => {
          if (data && data.products) {
            setWishlistProducts(data.products.filter((p) => wishlistIds.includes(p._id)));
          }
        })
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated, router, user, wishlistIds]);

  const handleLogout = () => {
    logout();
    showToast('You have been logged out.');
    router.push('/');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdatingProfile(true);
      const data = await api.put<{ success: boolean; user: any; message: string }>('/auth/profile', {
        name,
        phone,
        password: password ? password : undefined
      });

      if (data && data.user) {
        updateUser(data.user);
        showToast('Profile updated successfully!');
        setPassword('');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update profile.', 'error');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      _id: `addr-${Date.now()}`,
      fullName: newFullName,
      phone: newPhone,
      addressLine: newAddressLine,
      city: newCity,
      district: newDistrict,
      postalCode: newPostalCode,
      isDefault: !user?.addresses || user.addresses.length === 0
    };

    const updatedAddresses = [...(user?.addresses || []), newAddr];

    try {
      const data = await api.put<{ success: boolean; user: any }>('/auth/profile', {
        addresses: updatedAddresses
      });
      if (data && data.user) {
        updateUser(data.user);
        showToast('Address added to your address book!');
        setShowAddressModal(false);
        setNewFullName('');
        setNewPhone('');
        setNewAddressLine('');
        setNewCity('');
        setNewPostalCode('');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to save address.', 'error');
    }
  };

  const handleDeleteAddress = async (addrId: string) => {
    const updatedAddresses = (user?.addresses || []).filter((a) => a._id !== addrId);
    try {
      const data = await api.put<{ success: boolean; user: any }>('/auth/profile', {
        addresses: updatedAddresses
      });
      if (data && data.user) {
        updateUser(data.user);
        showToast('Address removed.');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to remove address.', 'error');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#F8F3EF] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-butterfly-soft flex items-center justify-center text-butterfly-primary text-xl font-bold font-serif">
              {user?.name?.charAt(0) || 'M'}
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-butterfly-text">
                Welcome, {user?.name}
              </h1>
              <p className="text-xs text-butterfly-textMuted">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-xl bg-butterfly-text text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Admin Panel</span>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-butterfly-border hover:bg-rose-50 text-rose-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Account Tabs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-4 border border-butterfly-border shadow-soft space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors text-left ${
                  activeTab === 'overview'
                    ? 'bg-butterfly-soft text-butterfly-primary'
                    : 'text-butterfly-text hover:bg-butterfly-bg'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Account Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors text-left ${
                  activeTab === 'orders'
                    ? 'bg-butterfly-soft text-butterfly-primary'
                    : 'text-butterfly-text hover:bg-butterfly-bg'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors text-left ${
                  activeTab === 'wishlist'
                    ? 'bg-butterfly-soft text-butterfly-primary'
                    : 'text-butterfly-text hover:bg-butterfly-bg'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Saved Wishlist ({wishlistIds.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors text-left ${
                  activeTab === 'addresses'
                    ? 'bg-butterfly-soft text-butterfly-primary'
                    : 'text-butterfly-text hover:bg-butterfly-bg'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Address Book ({user?.addresses?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors text-left ${
                  activeTab === 'profile'
                    ? 'bg-butterfly-soft text-butterfly-primary'
                    : 'text-butterfly-text hover:bg-butterfly-bg'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Profile & Password</span>
              </button>
            </div>
          </div>

          {/* Tab Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft">
                    <span className="text-xs text-butterfly-textMuted uppercase tracking-wider block">Orders Placed</span>
                    <span className="font-serif text-2xl font-bold text-butterfly-text mt-1 block">
                      {orders.length}
                    </span>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft">
                    <span className="text-xs text-butterfly-textMuted uppercase tracking-wider block">Wishlist Items</span>
                    <span className="font-serif text-2xl font-bold text-butterfly-text mt-1 block">
                      {wishlistIds.length}
                    </span>
                  </div>

                  <div className="bg-white rounded-3xl p-6 border border-butterfly-border shadow-soft">
                    <span className="text-xs text-butterfly-textMuted uppercase tracking-wider block">Saved Addresses</span>
                    <span className="font-serif text-2xl font-bold text-butterfly-text mt-1 block">
                      {user?.addresses?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-butterfly-border">
                    <h3 className="font-serif text-base font-bold text-butterfly-text">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-butterfly-primary hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  {orders.slice(0, 2).map((order) => (
                    <div key={order._id} className="p-4 rounded-2xl bg-butterfly-bg border border-butterfly-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-mono font-bold text-butterfly-text">{order.orderNumber}</span>
                        <p className="text-butterfly-textMuted mt-0.5">
                          {order.items.length} items • {formatLKR(order.total)} • Status: <strong>{order.status}</strong>
                        </p>
                      </div>
                      <Link
                        href={`/track-order?orderNumber=${order.orderNumber}`}
                        className="px-4 py-2 rounded-xl bg-white border border-butterfly-border hover:bg-butterfly-soft font-semibold text-butterfly-text text-center transition-colors"
                      >
                        Track Status
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-6">
                <h3 className="font-serif text-lg font-bold text-butterfly-text pb-3 border-b border-butterfly-border">
                  My Order History ({orders.length})
                </h3>

                {orders.length === 0 ? (
                  <div className="py-12 text-center text-xs text-butterfly-textMuted">
                    <p className="text-sm font-medium text-butterfly-text">No orders placed yet.</p>
                    <Link href="/shop" className="mt-2 inline-block font-bold text-butterfly-primary hover:underline">
                      Explore our collections
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="p-5 rounded-3xl border border-butterfly-border bg-white shadow-soft space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-butterfly-border text-xs">
                          <div>
                            <span className="font-serif font-bold text-base text-butterfly-text">{order.orderNumber}</span>
                            <span className="text-butterfly-textMuted block text-[11px]">
                              Placed on {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-butterfly-soft text-butterfly-primary">
                              {order.status}
                            </span>
                            <Link
                              href={`/track-order?orderNumber=${order.orderNumber}`}
                              className="px-4 py-1.5 rounded-xl bg-butterfly-primary text-white font-semibold text-xs hover:bg-butterfly-primaryHover transition-colors"
                            >
                              Track
                            </Link>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="divide-y divide-butterfly-border">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-2 flex items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-butterfly-soft shrink-0">
                                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div>
                                  <p className="font-semibold text-butterfly-text">{item.name}</p>
                                  <p className="text-butterfly-textMuted text-[11px]">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-bold text-butterfly-text">{formatLKR(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex justify-between items-baseline text-xs border-t border-butterfly-border">
                          <span className="text-butterfly-textMuted">
                            Payment: {order.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : 'Bank Transfer'}
                          </span>
                          <span className="font-serif font-bold text-base text-butterfly-text">
                            Total: {formatLKR(order.total)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-6">
                <h3 className="font-serif text-lg font-bold text-butterfly-text pb-3 border-b border-butterfly-border">
                  Saved Wishlist ({wishlistProducts.length})
                </h3>

                {wishlistProducts.length === 0 ? (
                  <div className="py-12 text-center text-xs text-butterfly-textMuted">
                    <p className="text-sm font-medium text-butterfly-text">Save the little things you love.</p>
                    <p className="text-xs text-butterfly-textMuted mt-1">Tap the heart icon on any product to save it here.</p>
                    <Link href="/shop" className="mt-3 inline-block px-6 py-2.5 rounded-full bg-butterfly-primary text-white font-bold uppercase tracking-wider">
                      Browse Shop
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistProducts.map((p) => (
                      <div key={p._id} className="p-4 rounded-2xl border border-butterfly-border bg-white shadow-soft space-y-3 flex flex-col justify-between">
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-butterfly-soft">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                          <button
                            onClick={() => {
                              toggleWishlist(p._id);
                              setWishlistProducts(wishlistProducts.filter((w) => w._id !== p._id));
                              showToast('Removed from wishlist');
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-rose-500 shadow-sm"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div>
                          <h4 className="font-semibold text-xs text-butterfly-text line-clamp-1">{p.name}</h4>
                          <span className="font-bold text-xs text-butterfly-text block mt-1">
                            {formatLKR(p.discountPrice || p.price)}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            addItem({
                              product: p._id,
                              name: p.name,
                              slug: p.slug,
                              image: p.images[0],
                              price: p.discountPrice || p.price,
                              quantity: 1,
                              maxStock: p.stock
                            });
                            showToast(`Added "${p.name}" to cart!`);
                            openDrawer();
                          }}
                          className="w-full py-2 rounded-xl bg-butterfly-soft hover:bg-butterfly-primary hover:text-white text-butterfly-text text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. ADDRESS BOOK TAB */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-butterfly-border">
                  <h3 className="font-serif text-lg font-bold text-butterfly-text">Saved Delivery Addresses</h3>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-butterfly-primary hover:text-butterfly-primaryHover uppercase tracking-wider"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user?.addresses?.map((addr) => (
                    <div key={addr._id} className="p-5 rounded-2xl border border-butterfly-border bg-butterfly-bg/50 space-y-2 text-xs relative">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-butterfly-text text-sm">{addr.fullName}</span>
                        <button
                          onClick={() => addr._id && handleDeleteAddress(addr._id)}
                          className="text-butterfly-textMuted hover:text-rose-500 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-butterfly-textMuted leading-relaxed">
                        {addr.addressLine}<br />
                        {addr.city}, {addr.district} {addr.postalCode}
                      </p>
                      <p className="font-semibold text-butterfly-text">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>

                {/* Add Address Modal */}
                {showAddressModal && (
                  <div className="p-6 rounded-2xl bg-butterfly-soft/40 border border-butterfly-border space-y-4">
                    <h4 className="font-bold text-sm text-butterfly-text">Add Sri Lankan Address</h4>
                    <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={newFullName}
                          onChange={(e) => setNewFullName(e.target.value)}
                          placeholder="Contact Full Name"
                          className="p-3 rounded-xl border border-butterfly-border bg-white"
                          required
                        />
                        <input
                          type="tel"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          placeholder="Contact Phone Number"
                          className="p-3 rounded-xl border border-butterfly-border bg-white"
                          required
                        />
                      </div>
                      <input
                        type="text"
                        value={newAddressLine}
                        onChange={(e) => setNewAddressLine(e.target.value)}
                        placeholder="Street Address / Residence"
                        className="w-full p-3 rounded-xl border border-butterfly-border bg-white"
                        required
                      />
                      <div className="grid grid-cols-3 gap-3">
                        <select
                          value={newDistrict}
                          onChange={(e) => setNewDistrict(e.target.value)}
                          className="p-3 rounded-xl border border-butterfly-border bg-white"
                        >
                          {SRI_LANKAN_DISTRICTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={newCity}
                          onChange={(e) => setNewCity(e.target.value)}
                          placeholder="City / Town"
                          className="p-3 rounded-xl border border-butterfly-border bg-white"
                          required
                        />
                        <input
                          type="text"
                          value={newPostalCode}
                          onChange={(e) => setNewPostalCode(e.target.value)}
                          placeholder="Postal Code"
                          className="p-3 rounded-xl border border-butterfly-border bg-white"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl bg-butterfly-primary text-white font-bold uppercase tracking-wider"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddressModal(false)}
                          className="px-6 py-2.5 rounded-xl bg-white border border-butterfly-border text-butterfly-text"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* 5. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-6">
                <h3 className="font-serif text-lg font-bold text-butterfly-text pb-3 border-b border-butterfly-border">
                  Personal Information & Password
                </h3>

                <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs max-w-md">
                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Email Address</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="w-full p-3.5 rounded-xl border border-butterfly-border bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-butterfly-text mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>

                  <div className="pt-2 border-t border-butterfly-border">
                    <label className="block font-semibold text-butterfly-text mb-1">Change Password (Optional)</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Leave blank to keep unchanged"
                      className="w-full p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="px-8 py-3.5 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white font-bold uppercase tracking-wider transition-all shadow-card disabled:opacity-60"
                  >
                    {isUpdatingProfile ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomerAccountPage() {
  return (
    <React.Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs text-butterfly-textMuted">Loading Account...</div>}>
      <CustomerAccountContent />
    </React.Suspense>
  );
}
