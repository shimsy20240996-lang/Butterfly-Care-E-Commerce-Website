'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/context/cartStore';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { formatLKR } from '@/lib/currency';
import { api } from '@/lib/api';
import { Order } from '@/types';
import { ShieldCheck, ArrowRight, ShoppingBag, Truck, CreditCard } from 'lucide-react';

const SRI_LANKAN_DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Moneragala', 'Ratnapura', 'Kegalle'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { showToast } = useToastStore();

  // Form State
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('Colombo');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'bank_transfer'>('cash_on_delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      if (!fullName && user.name) setFullName(user.name);
      if (!phone && user.phone) setPhone(user.phone);
      if (user.addresses && user.addresses.length > 0) {
        const addr = user.addresses[0];
        if (!addressLine) setAddressLine(addr.addressLine);
        if (!city) setCity(addr.city);
        if (addr.district) setDistrict(addr.district);
      }
    }
  }, [user]);

  const subtotal = getSubtotal();
  const deliveryFee = subtotal >= 7500 ? 0 : 450;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#FFFDFB] px-4 py-16">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 border border-[#EFEAE6] shadow-card space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E5F4FC] flex items-center justify-center mx-auto text-[#4F7FA0]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#454545]">Your Cart is Empty</h2>
          <p className="text-xs text-[#7A7A7A]">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="inline-flex px-8 py-3.5 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-soft"
          >
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !addressLine.trim() ||
      !city.trim() ||
      !district.trim()
    ) {
      showToast('Please complete all required delivery details.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      const orderPayload = {
        customerDetails: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: user?.email ? user.email.trim() : ''
        },
        deliveryAddress: {
          addressLine: addressLine.trim(),
          city: city.trim(),
          district: district.trim(),
          postalCode: ''
        },
        items: items.map((i) => ({
          product: i.product,
          name: i.name,
          slug: i.slug,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
          selectedSize: i.selectedSize || '',
          selectedColor: i.selectedColor || '',
          sku: i.sku || ''
        })),
        paymentMethod,
        deliveryType: 'standard'
      };

      const res = await api.post<{
        success: boolean;
        order: Order;
        whatsappUrl?: string;
        whatsappMessage?: string;
        message?: string;
      }>('/orders', orderPayload);

      if (!res || !res.success || !res.order) {
        throw new Error(res?.message || "Sorry, we couldn't place your order. Please try again.");
      }

      const createdOrder: Order = {
        ...res.order,
        whatsappUrl: res.whatsappUrl || res.order.whatsappUrl,
        whatsappMessage: res.whatsappMessage || res.order.whatsappMessage
      };

      // Save authoritative order snapshot to localStorage for instant rendering on Order Success
      if (typeof window !== 'undefined') {
        localStorage.setItem('butterfly_last_order', JSON.stringify(createdOrder));
      }

      // Clear the cart only after successful order creation
      clearCart();

      showToast('Order placed successfully! 🦋');
      router.push(`/order-success?orderId=${encodeURIComponent(createdOrder.orderNumber || createdOrder._id)}`);
    } catch (err: any) {
      console.error('Order creation error:', err);
      showToast(err.message || "Sorry, we couldn't place your order. Please try again.", 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8 text-center sm:text-left space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#454545]">
            Checkout
          </h1>
          <p className="text-xs sm:text-sm text-[#7A7A7A]">
            Safe, gentle, and reliable ordering — care for every mom.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Delivery Information */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-[#EFEAE6] shadow-soft space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#EFEAE6]">
                <Truck className="w-4 h-4 text-[#4F7FA0]" />
                <h2 className="font-serif text-base font-bold text-[#454545]">
                  1. Delivery Details
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#454545] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ahamed / Dilani Perera"
                    className="w-full text-xs p-3.5 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#454545] mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0771234567"
                    className="w-full text-xs p-3.5 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0] transition-colors font-mono"
                  />
                  <p className="text-[11px] text-[#7A7A7A] mt-1">
                    We will send your order confirmation and dispatch updates to this number.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#454545] mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="e.g. No. 25, Main Street"
                    className="w-full text-xs p-3.5 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#454545] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Colombo"
                      className="w-full text-xs p-3.5 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#454545] mb-1">
                      District *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0] transition-colors font-medium cursor-pointer"
                    >
                      {SRI_LANKAN_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Options */}
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-[#EFEAE6] shadow-soft space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#EFEAE6]">
                <CreditCard className="w-4 h-4 text-[#4F7FA0]" />
                <h2 className="font-serif text-base font-bold text-[#454545]">
                  2. Payment Method
                </h2>
              </div>

              <div className="space-y-2.5">
                <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'cash_on_delivery'
                    ? 'border-[#4F7FA0] bg-[#E5F4FC]/40 shadow-sm'
                    : 'border-[#EFEAE6] bg-white hover:bg-[#FFFDFB]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="accent-[#4F7FA0] mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#454545]">Cash on Delivery</p>
                    <p className="text-[11px] text-[#7A7A7A]">Pay in cash when your package is delivered to your doorstep.</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#4F7FA0] bg-[#E5F4FC]/40 shadow-sm'
                    : 'border-[#EFEAE6] bg-white hover:bg-[#FFFDFB]'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="accent-[#4F7FA0] mt-0.5"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#454545]">Bank Transfer / Online Deposit</p>
                    <p className="text-[11px] text-[#7A7A7A]">Deposit directly to our Commercial Bank / Sampath Bank account.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 bg-white rounded-3xl border border-[#EFEAE6] shadow-card space-y-4">
              <h2 className="font-serif text-base font-bold text-[#454545] pb-2 border-b border-[#EFEAE6]">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} Items)
              </h2>

              <div className="divide-y divide-[#EFEAE6] max-h-64 overflow-y-auto pr-1">
                {items.map((item, idx) => (
                  <div key={`${item.product}-${idx}`} className="py-2.5 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FFFDFB] shrink-0 border border-[#EFEAE6]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#454545] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#7A7A7A]">
                        Qty: {item.quantity}
                        {item.selectedSize ? ` • Size: ${item.selectedSize}` : ''}
                        {item.selectedColor ? ` • Color: ${item.selectedColor}` : ''}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#454545] shrink-0">
                      {formatLKR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EFEAE6] space-y-2 text-xs">
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#454545]">{formatLKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Islandwide Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatLKR(deliveryFee)}</span>
                </div>
                {subtotal < 7500 && (
                  <p className="text-[10px] text-[#B86F84]">
                    Add {formatLKR(7500 - subtotal)} more for FREE delivery!
                  </p>
                )}
                <div className="flex justify-between text-base font-bold text-[#454545] pt-2 border-t border-[#EFEAE6]">
                  <span>Total</span>
                  <span className="text-[#4F7FA0]">{formatLKR(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                <span>{isSubmitting ? 'SAVING ORDER...' : 'PLACE ORDER'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#7A7A7A] flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Safe & Secure BUTTERFLY Ordering</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
