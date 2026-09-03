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
        const cachedOrderJson = typeof window !== 'undefined' ? localStorage.getItem('butterfly_last_order') : null;
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

        // 2. Fetch fresh order snapshot from backend if search ID is available
        const searchId = paramOrderId || parsedCached?.orderNumber || parsedCached?._id;
        if (searchId) {
          try {
            const res = await api.get<{ success: boolean; order: Order }>(
              `/orders/track/${encodeURIComponent(searchId)}`
            );
            if (active && res && res.order) {
              setOrder(res.order);
              if (typeof window !== 'undefined') {
                localStorage.setItem('butterfly_last_order', JSON.stringify(res.order));
              }
            }
          } catch (fetchErr) {
            try {
              const resById = await api.get<{ success: boolean; order: Order }>(
                `/orders/${encodeURIComponent(searchId)}`
              );
              if (active && resById && resById.order) {
                setOrder(resById.order);
                if (typeof window !== 'undefined') {
                  localStorage.setItem('butterfly_last_order', JSON.stringify(resById.order));
                }
              }
            } catch (err2) {
              console.warn('[OrderSuccess] Using local order snapshot.');
            }
          }
        }
      } catch (err: any) {
        console.error('[OrderSuccess Error]', err);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadOrder();

    return () => {
      active = false;
    };
  }, [paramOrderId]);

  if (loading && !order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FFFDFB]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#8EC5E8] border-t-[#4F7FA0] rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-[#7A7A7A]">Loading your order confirmation...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FFFDFB] px-4 py-16">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-[#EFEAE6] shadow-card space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E5F4FC] flex items-center justify-center mx-auto text-2xl text-[#4F7FA0]">
            🦋
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#454545]">Order Placed</h2>
          <p className="text-xs text-[#7A7A7A]">
            Thank you for shopping with BUTTERFLY. If you recently completed checkout, your order is being processed.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/orders"
              className="w-full py-3.5 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-soft"
            >
              VIEW MY ORDERS
            </Link>
            <Link
              href="/products"
              className="w-full py-3.5 rounded-xl bg-[#FFFDFB] hover:bg-[#E5F4FC] text-[#4F7FA0] border border-[#8EC5E8]/60 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSendToWhatsApp = () => {
    try {
      const url = order.whatsappUrl || getWhatsAppOrderUrl(order);

      // Asynchronously record that WhatsApp was clicked
      const orderIdentifier = order._id || order.orderNumber;
      if (orderIdentifier) {
        api.put(`/orders/${encodeURIComponent(orderIdentifier)}/whatsapp-opened`, {}).catch(() => {});
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
      const msg = order.whatsappMessage || formatWhatsAppOrderMessage(order);
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
          <div className="w-20 h-20 rounded-full bg-[#E5F4FC] border-2 border-[#8EC5E8]/40 flex items-center justify-center mx-auto text-4xl shadow-soft">
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
              Thank you for shopping with <strong className="text-[#454545]">BUTTERFLY</strong>.
            </p>
          </div>

          {/* Order ID Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFFDFB] border border-[#EFEAE6] space-y-1.5 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7A7A7A] block">
              Your Order ID
            </span>
            <p className="font-mono text-2xl sm:text-3xl font-extrabold text-[#4F7FA0] tracking-wider">
              {order.orderNumber}
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
                Order Details Summary ({order.items?.length || 0} Items)
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
                  <p className="text-[#7A7A7A]">{order.customerDetails?.fullName}</p>
                  <p className="text-[#7A7A7A] font-mono">{order.customerDetails?.phone}</p>
                </div>
                <div>
                  <p className="font-bold text-[#454545]">Delivery Address:</p>
                  <p className="text-[#7A7A7A]">{order.deliveryAddress?.addressLine}</p>
                  <p className="text-[#7A7A7A]">
                    {order.deliveryAddress?.city}, {order.deliveryAddress?.district}
                  </p>
                </div>
              </div>

              {/* Items List */}
              {order.items && order.items.length > 0 && (
                <div className="space-y-2">
                  <p className="font-bold text-[#454545]">Purchased Items:</p>
                  <div className="divide-y divide-[#EFEAE6] border border-[#EFEAE6] rounded-2xl p-3">
                    {order.items.map((item, idx) => (
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
                  <span>{formatLKR(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Delivery Fee</span>
                  <span>{order.deliveryFee === 0 ? 'FREE' : formatLKR(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#454545] pt-2 border-t border-[#EFEAE6]">
                  <span>Total Amount</span>
                  <span className="text-[#4F7FA0]">{formatLKR(order.total)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#7A7A7A]">
                  <span>Payment Method</span>
                  <span>{formatPaymentMethod(order.paymentMethod)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#7A7A7A]">
                  <span>Order Date</span>
                  <span>{formatOrderDate(order.createdAt)}</span>
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
