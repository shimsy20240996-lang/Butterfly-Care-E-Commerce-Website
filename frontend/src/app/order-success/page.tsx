'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useToastStore } from '@/context/toastStore';
import { api } from '@/lib/api';
import { Order } from '@/types';
import { formatLKR } from '@/lib/currency';
import {
  formatWhatsAppOrderMessage,
  getWhatsAppOrderUrl,
  formatPaymentMethod,
  formatOrderDate
} from '@/lib/whatsapp';
import {
  Copy,
  Check,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Truck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const paramOrderId = searchParams.get('orderId') || searchParams.get('orderNumber') || '';
  const { showToast } = useToastStore();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadOrder = async () => {
      try {
        setLoading(true);

        // 1. First check local storage for instant rendering
        const cachedOrderJson = localStorage.getItem('butterfly_last_order');
        let parsedCached: Order | null = null;
        if (cachedOrderJson) {
          try {
            parsedCached = JSON.parse(cachedOrderJson);
            if (active && parsedCached) {
              setOrder(parsedCached);
            }
          } catch (e) {
            console.error('Failed to parse cached order', e);
          }
        }

        // 2. Fetch fresh order from backend if orderId is present
        const searchId = paramOrderId || parsedCached?.orderNumber || parsedCached?._id;
        if (searchId) {
          try {
            const res = await api.get<{ success: boolean; order: Order }>(
              `/orders/track/${encodeURIComponent(searchId)}`
            );
            if (active && res && res.order) {
              setOrder(res.order);
              localStorage.setItem('butterfly_last_order', JSON.stringify(res.order));
            }
          } catch (fetchErr) {
            // Try by ID fallback
            try {
              const resById = await api.get<{ success: boolean; order: Order }>(
                `/orders/${encodeURIComponent(searchId)}`
              );
              if (active && resById && resById.order) {
                setOrder(resById.order);
                localStorage.setItem('butterfly_last_order', JSON.stringify(resById.order));
              }
            } catch (err2) {
              console.warn('[OrderSuccess] Could not re-fetch from API, using cached order.');
            }
          }
        }
      } catch (err: any) {
        console.error('[OrderSuccess Error]', err);
        setErrorMessage(
          'Your order was saved successfully. Please copy the order details and contact us on WhatsApp.'
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    loadOrder();

    return () => {
      active = false;
    };
  }, [paramOrderId]);

  // Fallback synthetic order if neither DB nor cache is accessible
  const displayOrder: Order = order || {
    _id: 'ord-temp',
    orderNumber: paramOrderId || 'BC-1025',
    customerDetails: {
      fullName: 'Valued Customer',
      email: '',
      phone: ''
    },
    deliveryAddress: {
      addressLine: 'Delivery Address Provided',
      city: 'Colombo',
      district: 'Colombo'
    },
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    discount: 0,
    total: 0,
    paymentMethod: 'cash_on_delivery',
    paymentStatus: 'pending',
    deliveryType: 'standard',
    status: 'Pending',
    timeline: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const handleSendToWhatsApp = () => {
    try {
      const url = getWhatsAppOrderUrl(displayOrder);

      // Asynchronously record that WhatsApp was clicked
      const orderIdentifier = displayOrder._id || displayOrder.orderNumber;
      if (orderIdentifier) {
        api.put(`/orders/${orderIdentifier}/whatsapp-opened`, {}).catch(() => {});
      }

      // Open in a new tab/window (compatible with Mobile WhatsApp app & WhatsApp Web)
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('WhatsApp Click Error:', err);
      setErrorMessage(
        'Your order was saved successfully. Please copy the order details and contact us on WhatsApp.'
      );
      showToast('Could not open WhatsApp automatically. Please copy order details.', 'error');
    }
  };

  const handleCopyOrderDetails = async () => {
    try {
      const msg = formatWhatsAppOrderMessage(displayOrder);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(msg);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = msg;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      showToast('Order details copied! 📋');
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Copy error:', err);
      showToast('Failed to copy to clipboard. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#FFFDFB] py-10 sm:py-16 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Main Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFEAE6] shadow-card text-center space-y-6">
          {/* 🦋 Butterfly Icon */}
          <div className="w-20 h-20 rounded-full bg-[#E5F4FC] border-2 border-[#8EC5E8]/40 flex items-center justify-center mx-auto text-4xl shadow-soft animate-bounce-short">
            🦋
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#4F7FA0] bg-[#E5F4FC]">
              Order Confirmed
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#454545]">
              Order Placed Successfully!
            </h1>
            <p className="text-xs sm:text-sm text-[#7A7A7A] leading-relaxed max-w-sm mx-auto">
              Thank you for shopping with <strong className="text-[#454545]">BUTTERFLY CARE</strong>.
            </p>
          </div>

          {/* Order ID Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#EFEAE6] space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7A7A7A] block">
              Your Order ID
            </span>
            <p className="font-mono text-2xl sm:text-3xl font-extrabold text-[#4F7FA0] tracking-wider">
              {displayOrder.orderNumber}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Your order has been saved successfully in our system.
            </p>
          </div>

          {/* Notice to Send WhatsApp */}
          <div className="bg-[#E5F4FC]/40 border border-[#8EC5E8]/50 rounded-2xl p-4 text-xs text-[#454545] space-y-1">
            <p className="font-semibold">
              Please send your order details to our WhatsApp so we can confirm your order & arrange delivery.
            </p>
            <p className="text-[11px] text-[#7A7A7A]">
              We have already pre-filled your entire order info. You only need to press <strong>SEND</strong>.
            </p>
          </div>

          {/* Fallback Message if URL/API warning occurred */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Primary Action: 💬 SEND ORDER TO WHATSAPP */}
            <button
              onClick={handleSendToWhatsApp}
              type="button"
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm sm:text-base font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>💬 SEND ORDER TO WHATSAPP</span>
            </button>

            {/* Secondary Action: 📋 COPY ORDER DETAILS */}
            <button
              onClick={handleCopyOrderDetails}
              type="button"
              className={`w-full py-3.5 px-6 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2 active:scale-95 cursor-pointer ${
                copied
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white hover:bg-[#FFFDFB] text-[#454545] border-[#EFEAE6]'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#7A7A7A]" />}
              <span>{copied ? 'ORDER DETAILS COPIED!' : '📋 COPY ORDER DETAILS'}</span>
            </button>

            {/* Tertiary Action: CONTINUE SHOPPING */}
            <Link
              href="/products"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2 active:scale-95 text-center"
            >
              <span>CONTINUE SHOPPING</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/orders"
              className="block text-xs font-semibold text-[#7A7A7A] hover:text-[#454545] pt-1 underline-offset-4 hover:underline"
            >
              View Order History
            </Link>
          </div>
        </div>

        {/* Expandable Order Summary Preview Card */}
        <div className="bg-white rounded-3xl border border-[#EFEAE6] shadow-soft overflow-hidden">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#FFFDFB] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#4F7FA0]" />
              <span className="font-serif text-sm font-bold text-[#454545]">
                Order Details Summary ({displayOrder.items?.length || 0} Items)
              </span>
            </div>
            {showDetails ? (
              <ChevronUp className="w-4 h-4 text-[#7A7A7A]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#7A7A7A]" />
            )}
          </button>

          {showDetails && (
            <div className="p-5 sm:p-6 border-t border-[#EFEAE6] space-y-4 text-xs">
              {/* Customer & Shipping Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FFFDFB] border border-[#EFEAE6]">
                <div>
                  <p className="font-bold text-[#454545]">Customer:</p>
                  <p className="text-[#7A7A7A]">{displayOrder.customerDetails?.fullName}</p>
                  <p className="text-[#7A7A7A] font-mono">{displayOrder.customerDetails?.phone}</p>
                </div>
                <div>
                  <p className="font-bold text-[#454545]">Delivery Address:</p>
                  <p className="text-[#7A7A7A]">{displayOrder.deliveryAddress?.addressLine}</p>
                  <p className="text-[#7A7A7A]">
                    {displayOrder.deliveryAddress?.city}, {displayOrder.deliveryAddress?.district}
                  </p>
                </div>
              </div>

              {/* Items List */}
              {displayOrder.items && displayOrder.items.length > 0 && (
                <div className="space-y-2">
                  <p className="font-bold text-[#454545]">Purchased Items:</p>
                  <div className="divide-y divide-[#EFEAE6] border border-[#EFEAE6] rounded-2xl p-3">
                    {displayOrder.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.image && (
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#FFFDFB] shrink-0 border border-[#EFEAE6]">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-[#454545] truncate">{item.name}</p>
                            <p className="text-[11px] text-[#7A7A7A]">
                              Qty: {item.quantity}
                              {item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}
                              {item.selectedColor ? ` • Color: ${item.selectedColor}` : ''}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-[#454545] shrink-0">
                          {formatLKR(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Totals Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-[#EFEAE6]">
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Subtotal</span>
                  <span>{formatLKR(displayOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Delivery Fee</span>
                  <span>{displayOrder.deliveryFee === 0 ? 'FREE' : formatLKR(displayOrder.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#454545] pt-2 border-t border-[#EFEAE6]">
                  <span>Total Amount</span>
                  <span className="text-[#4F7FA0]">{formatLKR(displayOrder.total)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#7A7A7A]">
                  <span>Payment Method</span>
                  <span>{formatPaymentMethod(displayOrder.paymentMethod)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#7A7A7A]">
                  <span>Order Date</span>
                  <span>{formatOrderDate(displayOrder.createdAt)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center bg-[#FFFDFB]">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-[#8EC5E8] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-[#7A7A7A]">Loading your order confirmation...</p>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
