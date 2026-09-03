'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Order } from '@/types';
import { formatLKR } from '@/lib/currency';
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle, Sparkles } from 'lucide-react';

const ORDER_STEPS = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered'];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryOrderNumber = searchParams.get('orderNumber') || '';

  const [orderNumber, setOrderNumber] = useState(queryOrderNumber);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (queryOrderNumber) {
      handleTrack(queryOrderNumber);
    }
  }, [queryOrderNumber]);

  const handleTrack = async (numToTrack: string) => {
    if (!numToTrack.trim()) return;

    try {
      setLoading(true);
      setError('');
      setOrder(null);
      const data = await api.get<{ success: boolean; order: Order }>(`/orders/track/${numToTrack.trim()}`);
      if (data && data.order) {
        setOrder(data.order);
      } else {
        setError('No order found with this reference number.');
      }
    } catch (err: any) {
      setError(err.message || 'Could not find order. Please verify the order number.');
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status: string) => {
    const idx = ORDER_STEPS.findIndex((s) => s.toLowerCase() === status.toLowerCase());
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="min-h-screen bg-[#F8F3EF] py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Live Shipment Tracker
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-butterfly-text">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-butterfly-textMuted">
            Enter your BUTTERFLY Order Number (e.g., BC-1001) to view the current dispatch timeline.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack(orderNumber);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-butterfly-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                placeholder="Enter Order Number (e.g. BC-2026-00101)"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-butterfly-bg border border-butterfly-border text-xs sm:text-sm text-butterfly-text placeholder-butterfly-textMuted font-mono uppercase focus:outline-none focus:border-butterfly-primary"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !orderNumber.trim()}
              className="px-8 py-3.5 rounded-2xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-widest transition-all shadow-card disabled:opacity-60 shrink-0"
            >
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Order Details & Progress Timeline */}
        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-butterfly-border shadow-card space-y-8 animate-in fade-in slide-in-from-bottom-2">
            {/* Top Overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-butterfly-border">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-butterfly-textMuted block">Order Reference</span>
                <h3 className="font-serif text-xl font-bold text-butterfly-text">{order.orderNumber}</h3>
                <span className="text-xs text-butterfly-textMuted">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-butterfly-textMuted block">Current Status</span>
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-butterfly-soft text-butterfly-primary border border-butterfly-accent/40">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Visual Step Tracker */}
            <div className="py-4">
              <div className="relative flex items-center justify-between">
                {/* Progress bar background line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-butterfly-border -translate-y-1/2 z-0" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-butterfly-primary -translate-y-1/2 transition-all duration-500 z-0"
                  style={{
                    width: `${(getStepIndex(order.status) / (ORDER_STEPS.length - 1)) * 100}%`
                  }}
                />

                {ORDER_STEPS.map((step, idx) => {
                  const currentIdx = getStepIndex(order.status);
                  const isCompleted = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-butterfly-primary text-white shadow-md'
                            : 'bg-white border-2 border-butterfly-border text-butterfly-textMuted'
                        } ${isCurrent ? 'ring-4 ring-butterfly-primary/20 scale-110' : ''}`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <span
                        className={`text-[10px] md:text-xs font-semibold mt-2 text-center select-none ${
                          isCompleted ? 'text-butterfly-text' : 'text-butterfly-textMuted'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Timeline Notes */}
            {order.timeline && order.timeline.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-butterfly-border">
                <h4 className="font-serif text-sm font-semibold text-butterfly-text">Shipment Activity Log</h4>
                <div className="space-y-2">
                  {order.timeline.map((t, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs p-3 rounded-xl bg-butterfly-bg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-bold text-butterfly-text">{t.status}</p>
                        {t.note && <p className="text-butterfly-textMuted">{t.note}</p>}
                      </div>
                      <span className="text-[10px] text-butterfly-textMuted shrink-0">
                        {new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Items Summary */}
            <div className="pt-4 border-t border-butterfly-border">
              <h4 className="font-serif text-sm font-semibold text-butterfly-text mb-3">
                Items in This Package ({order.items.length})
              </h4>
              <div className="divide-y divide-butterfly-border">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-butterfly-soft shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-butterfly-text">{item.name}</p>
                        <p className="text-[11px] text-butterfly-textMuted">
                          Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-butterfly-text">{formatLKR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <React.Suspense fallback={<div className="max-w-4xl mx-auto p-12 text-center text-xs text-butterfly-textMuted">Loading Tracking...</div>}>
      <TrackOrderContent />
    </React.Suspense>
  );
}
