'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { api } from '@/lib/api';
import { Order } from '@/types';
import { formatLKR } from '@/lib/currency';
import { ShoppingBag, Search, Eye, X, CheckCircle2, Truck, ShieldAlert } from 'lucide-react';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrdersPage() {
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { showToast } = useToastStore();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await api.get<{ orders: Order[] }>('/orders/admin/all');
      if (data && data.orders) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async () => {
    if (!viewOrder || !newStatus) return;
    try {
      setIsUpdating(true);
      const data = await api.put<{ success: boolean; order: Order }>(`/orders/${viewOrder._id}/status`, {
        status: newStatus,
        note: statusNote || undefined
      });

      if (data && data.order) {
        showToast(`Order ${viewOrder.orderNumber} status updated to ${newStatus}!`);
        setViewOrder(data.order);
        setOrders(orders.map((o) => (o._id === data.order._id ? data.order : o)));
        setStatusNote('');
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to update order status.', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerDetails.fullName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerDetails.phone.includes(search);
    const matchesStatus = selectedStatus === 'all' || o.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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
              Order Fulfillment & Management
            </h1>
            <p className="text-xs text-butterfly-textMuted mt-1">
              Track customer orders, verify payments, and update delivery timelines.
            </p>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8 bg-white rounded-2xl p-3.5 border border-butterfly-border shadow-soft flex items-center gap-3">
            <Search className="w-4 h-4 text-butterfly-textMuted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Order #, Customer Name, or Phone..."
              className="w-full text-xs bg-transparent focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4 bg-white rounded-2xl p-2 border border-butterfly-border shadow-soft">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs p-2 bg-transparent focus:outline-none font-semibold cursor-pointer"
            >
              <option value="all">All Statuses ({orders.length})</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-butterfly-border shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-butterfly-text">
              <thead className="bg-butterfly-soft/60 border-b border-butterfly-border text-[11px] font-bold uppercase tracking-wider text-butterfly-textMuted">
                <tr>
                  <th className="p-4">Order #</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Items</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-butterfly-border">
                {filtered.map((order) => (
                  <tr key={order._id} className="hover:bg-butterfly-bg/50 transition-colors">
                    <td className="p-4 font-mono font-bold">{order.orderNumber}</td>
                    <td className="p-4">
                      <p className="font-semibold">{order.customerDetails.fullName}</p>
                      <p className="text-[11px] text-butterfly-textMuted">{order.customerDetails.phone}</p>
                    </td>
                    <td className="p-4 text-butterfly-textMuted">
                      {order.deliveryAddress.city}, {order.deliveryAddress.district}
                    </td>
                    <td className="p-4 font-medium">{order.items.length} items</td>
                    <td className="p-4 font-bold">{formatLKR(order.total)}</td>
                    <td className="p-4">
                      <span className="text-[11px] font-medium capitalize">
                        {order.paymentMethod === 'cash_on_delivery' ? 'COD' : 'Bank Deposit'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-butterfly-soft text-butterfly-primary'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setViewOrder(order);
                          setNewStatus(order.status);
                        }}
                        className="p-2 rounded-xl bg-butterfly-soft hover:bg-butterfly-secondary text-butterfly-text transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View / Manage Order Detail Modal */}
        {viewOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setViewOrder(null)} className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-card border border-butterfly-border p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-butterfly-border">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-butterfly-textMuted block">Order Details</span>
                  <h3 className="font-serif text-lg font-bold text-butterfly-text">{viewOrder.orderNumber}</h3>
                </div>
                <button onClick={() => setViewOrder(null)}><X className="w-5 h-5" /></button>
              </div>

              {/* Status Updater Control */}
              <div className="p-4 rounded-2xl bg-butterfly-soft/40 border border-butterfly-border space-y-3 text-xs">
                <h4 className="font-bold text-butterfly-text">Update Order Status:</h4>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setNewStatus(status)}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        newStatus === status
                          ? 'bg-butterfly-primary text-white shadow-sm'
                          : 'bg-white border border-butterfly-border text-butterfly-text hover:bg-butterfly-soft'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Optional note for timeline (e.g. Dispatched via Courier #48892)"
                  className="w-full p-2.5 rounded-xl border border-butterfly-border bg-white text-xs"
                />

                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  disabled={isUpdating || newStatus === viewOrder.status}
                  className="px-6 py-2 rounded-xl bg-butterfly-text text-white font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  {isUpdating ? 'Updating...' : 'Save New Status'}
                </button>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-butterfly-bg">
                  <h5 className="font-bold text-butterfly-text mb-1">Customer:</h5>
                  <p>{viewOrder.customerDetails.fullName}</p>
                  <p className="text-butterfly-textMuted">{viewOrder.customerDetails.phone}</p>
                  <p className="text-butterfly-textMuted">{viewOrder.customerDetails.email}</p>
                </div>

                <div className="p-4 rounded-2xl bg-butterfly-bg">
                  <h5 className="font-bold text-butterfly-text mb-1">Delivery Address:</h5>
                  <p>{viewOrder.deliveryAddress.addressLine}</p>
                  <p>{viewOrder.deliveryAddress.city}, {viewOrder.deliveryAddress.district}</p>
                  <p className="text-butterfly-textMuted">Method: {viewOrder.deliveryType} delivery</p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h5 className="font-bold text-xs text-butterfly-text">Items Ordered:</h5>
                <div className="divide-y divide-butterfly-border border border-butterfly-border rounded-2xl p-3">
                  {viewOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-[11px] text-butterfly-textMuted">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold">{formatLKR(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-butterfly-border text-sm">
                <span className="font-bold text-butterfly-text">Total Order Amount:</span>
                <span className="font-serif font-bold text-lg text-butterfly-primary">{formatLKR(viewOrder.total)}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
