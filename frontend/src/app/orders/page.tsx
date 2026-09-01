'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Order } from '@/types';
import { formatLKR } from '@/lib/currency';
import { useAuthStore } from '@/context/authStore';
import { Package, ArrowRight, CheckCircle2, Truck } from 'lucide-react';

export default function OrdersPage() {
  const { isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (isAuthenticated) {
          const data = await api.get<{ orders: Order[] }>('/orders/my-orders');
          if (data && data.orders) {
            setOrders(data.orders);
            return;
          }
        }

        // Fallback: check local storage placed order
        const localSavedOrder = localStorage.getItem('butterfly_last_order');
        if (localSavedOrder) {
          try {
            const parsed = JSON.parse(localSavedOrder);
            setOrders([parsed]);
          } catch (e) {}
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'shipped':
      case 'in-transit':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E5F4FC] text-[#4F7FA0]">
            <Truck className="w-3.5 h-3.5" />
            In Transit
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FCE8EE] text-[#B86F84]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ✓ Confirmed
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#454545]">
            My Orders
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7A7A]">
            Track and view your recent Butterfly Care purchases.
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center">
            <div className="w-8 h-8 border-2 border-[#8EC5E8] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-[#7A7A7A]">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-[#EFEAE6] space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#E5F4FC] flex items-center justify-center mx-auto text-[#4F7FA0]">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#454545]">
                No orders yet
              </h3>
              <p className="text-xs text-[#7A7A7A] mt-1">
                You haven&apos;t placed any orders with us yet.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-soft"
            >
              <span>EXPLORE PRODUCTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const productCount = order.items?.reduce((sum, i) => sum + i.quantity, 0) || order.items?.length || 1;
              const orderTotal = order.total || order.subtotal || 2490;
              return (
                <div
                  key={order._id || order.orderNumber}
                  className="p-5 rounded-2xl bg-white border border-[#EFEAE6] shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#454545]">
                        Order #{order.orderNumber || order._id?.slice(-7).toUpperCase()}
                      </span>
                      {getStatusBadge(order.status || 'Confirmed')}
                    </div>
                    <p className="text-xs text-[#7A7A7A]">
                      {productCount} {productCount === 1 ? 'Product' : 'Products'} • {formatLKR(orderTotal)}
                    </p>
                    <p className="text-[11px] text-[#7A7A7A]">
                      Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <Link
                    href={`/order-success?orderId=${order._id || order.orderNumber}`}
                    className="px-5 py-2.5 rounded-xl bg-[#FFFDFB] hover:bg-[#E5F4FC] text-[#4F7FA0] border border-[#8EC5E8]/60 text-xs font-bold uppercase tracking-wider text-center transition-colors shrink-0"
                  >
                    VIEW ORDER
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
