'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { api } from '@/lib/api';
import { Order } from '@/types';
import { formatLKR } from '@/lib/currency';
import { CheckCircle2, Package, Truck, ArrowRight, Printer, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { useSettingsStore } from '@/context/settingsStore';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const { settings } = useSettingsStore();

  useEffect(() => {
    // Fire celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B98276', '#E8D5CE', '#DDB9AE', '#5A4945']
    });

    if (orderNumber) {
      api.get<{ success: boolean; order: Order }>(`/orders/track/${orderNumber}`)
        .then((data) => {
          if (data && data.order) {
            setOrder(data.order);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [orderNumber]);

  return (
    <div className="min-h-screen bg-[#F8F3EF] py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-butterfly-border shadow-card text-center space-y-6">
          {/* Success Animated Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto animate-scale-up">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Order Confirmed
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-butterfly-text">
              Thank You for Choosing BUTTERFLY CARE
            </h1>
            <p className="text-xs sm:text-sm text-butterfly-textMuted max-w-md mx-auto leading-relaxed">
              We have received your order and our caring team is preparing it for gentle packing and dispatch.
            </p>
          </div>

          {/* Order Reference Box */}
          <div className="p-4 sm:p-6 rounded-2xl bg-butterfly-bg border border-butterfly-border/80 text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-butterfly-border pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-butterfly-textMuted block">Order Number</span>
                <span className="font-serif text-lg font-bold text-butterfly-text tracking-wide">
                  {order?.orderNumber || orderNumber || 'BC-2026-CONFIRMED'}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] uppercase tracking-wider text-butterfly-textMuted block">Order Status</span>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {order?.status || 'Processing'}
                </span>
              </div>
            </div>

            {order && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-butterfly-text pt-1">
                <div>
                  <h4 className="font-bold text-butterfly-text mb-1">Delivery Address:</h4>
                  <p className="text-butterfly-textMuted leading-relaxed">
                    {order.customerDetails.fullName}<br />
                    {order.deliveryAddress.addressLine}, {order.deliveryAddress.city}<br />
                    {order.deliveryAddress.district} {order.deliveryAddress.postalCode}<br />
                    Phone: {order.customerDetails.phone}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-butterfly-text mb-1">Payment Method:</h4>
                  <p className="text-butterfly-textMuted capitalize">
                    {order.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery (COD)' : 'Direct Bank Deposit'}
                  </p>
                  <p className="text-butterfly-textMuted mt-2 font-semibold">
                    Total Amount: {formatLKR(order.total)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Items Preview */}
          {order && order.items && order.items.length > 0 && (
            <div className="border border-butterfly-border rounded-2xl p-4 text-left divide-y divide-butterfly-border">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-butterfly-soft shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-butterfly-text truncate max-w-xs">{item.name}</p>
                      <p className="text-[11px] text-butterfly-textMuted">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-butterfly-text">{formatLKR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href={`/track-order?orderNumber=${order?.orderNumber || orderNumber}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-card flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track My Order</span>
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-butterfly-soft border border-butterfly-border text-butterfly-text text-xs font-bold tracking-widest uppercase transition-all shadow-soft"
            >
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <React.Suspense fallback={<div className="max-w-3xl mx-auto p-12 text-center text-xs text-butterfly-textMuted">Loading Confirmation...</div>}>
      <OrderSuccessContent />
    </React.Suspense>
  );
}
