'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/context/cartStore';
import { useSettingsStore } from '@/context/settingsStore';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { formatLKR } from '@/lib/currency';
import { api } from '@/lib/api';
import { Order } from '@/types';
import {
  ShieldCheck,
  Truck,
  Building2,
  Banknote,
  CreditCard,
  CheckCircle2,
  Lock,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const SRI_LANKAN_DISTRICTS = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Moneragala', 'Ratnapura', 'Kegalle'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, appliedCoupon, clearCart } = useCartStore();
  const { settings } = useSettingsStore();
  const { user } = useAuthStore();
  const { showToast } = useToastStore();

  // Form State
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine, setAddressLine] = useState(user?.addresses?.[0]?.addressLine || '');
  const [city, setCity] = useState(user?.addresses?.[0]?.city || '');
  const [district, setDistrict] = useState(user?.addresses?.[0]?.district || 'Colombo');
  const [postalCode, setPostalCode] = useState(user?.addresses?.[0]?.postalCode || '');
  const [orderNotes, setOrderNotes] = useState('');

  // Shipping & Payment
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'bank_transfer' | 'online_gateway'>('cash_on_delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name);
      if (!email) setEmail(user.email);
      if (!phone && user.phone) setPhone(user.phone);
      if (user.addresses && user.addresses.length > 0) {
        const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
        if (!addressLine) setAddressLine(defaultAddr.addressLine);
        if (!city) setCity(defaultAddr.city);
        if (defaultAddr.district) setDistrict(defaultAddr.district);
        if (!postalCode && defaultAddr.postalCode) setPostalCode(defaultAddr.postalCode);
      }
    }
  }, [user]);

  const subtotal = getSubtotal();

  // Dynamic delivery fee calculation based on Sri Lankan District
  const districtObj = settings.districtDeliveryFees?.find(
    (d) => d.district.toLowerCase() === district.toLowerCase()
  );
  let baseDeliveryFee = districtObj ? districtObj.fee : settings.defaultDeliveryFee || 450;
  if (subtotal >= (settings.freeShippingThreshold || 7500)) {
    baseDeliveryFee = 0;
  }
  const deliveryFee = deliveryType === 'express' ? baseDeliveryFee + 400 : baseDeliveryFee;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F3EF] px-4 py-16">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 border border-butterfly-border shadow-soft space-y-4">
          <h2 className="font-serif text-2xl font-bold text-butterfly-text">Your Cart is Empty</h2>
          <p className="text-xs text-butterfly-textMuted">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="inline-flex px-8 py-3.5 rounded-full bg-butterfly-primary text-white text-xs font-bold uppercase tracking-widest"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !addressLine.trim() || !city.trim()) {
      showToast('Please complete all required customer & delivery fields.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      const orderPayload = {
        customerDetails: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim()
        },
        deliveryAddress: {
          addressLine: addressLine.trim(),
          city: city.trim(),
          district,
          postalCode: postalCode.trim()
        },
        items: items.map((i) => ({
          product: i.product,
          name: i.name,
          slug: i.slug,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
          selectedSize: i.selectedSize,
          selectedColor: i.selectedColor,
          sku: i.sku
        })),
        deliveryType,
        paymentMethod,
        couponCode: appliedCoupon ? appliedCoupon.code : undefined,
        notes: orderNotes.trim()
      };

      const data = await api.post<{ success: boolean; order: Order; message: string }>('/orders', orderPayload);

      if (data && data.order) {
        showToast('Order placed successfully! Thank you for trusting Butterfly Care.');
        clearCart();
        router.push(`/order-success?orderNumber=${data.order.orderNumber}`);
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to place order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EF] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-8 pb-4 border-b border-butterfly-border">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text">
            Secure Checkout
          </h1>
          <p className="text-xs text-butterfly-textMuted mt-1">
            Carefully packaged and dispatched with love for moms & little ones across Sri Lanka.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Customer & Delivery Info + Payment Methods */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Customer Contact Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
              <h2 className="font-serif text-lg font-bold text-butterfly-text pb-2 border-b border-butterfly-border">
                1. Customer Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-butterfly-text mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dilani Perera"
                    className="w-full text-xs p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-butterfly-text mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +94 77 123 4567"
                    className="w-full text-xs p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-butterfly-text mb-1">
                  Email Address (For Order Updates)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dilani@example.com"
                  className="w-full text-xs p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                />
              </div>
            </div>

            {/* 2. Delivery Address in Sri Lanka */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
              <h2 className="font-serif text-lg font-bold text-butterfly-text pb-2 border-b border-butterfly-border">
                2. Delivery Address (Sri Lanka)
              </h2>

              <div>
                <label className="block text-xs font-semibold text-butterfly-text mb-1">
                  Street Address / House No. <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="e.g. 15/3 Flower Road"
                  className="w-full text-xs p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-butterfly-text mb-1">
                    District <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary cursor-pointer font-medium"
                    required
                  >
                    {SRI_LANKAN_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-butterfly-text mb-1">
                    City / Town <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Colombo 03"
                    className="w-full text-xs p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-butterfly-text mb-1">
                    Postal Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="00300"
                    className="w-full text-xs p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-butterfly-text mb-1">
                  Order Notes / Delivery Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Please call before arriving or leave with security."
                  className="w-full text-xs p-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                />
              </div>
            </div>

            {/* 3. Delivery Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
              <h2 className="font-serif text-lg font-bold text-butterfly-text pb-2 border-b border-butterfly-border">
                3. Delivery Options
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryType('standard')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === 'standard'
                      ? 'border-butterfly-primary bg-butterfly-soft/40 shadow-sm'
                      : 'border-butterfly-border bg-white hover:bg-butterfly-bg'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'standard'}
                      onChange={() => setDeliveryType('standard')}
                      className="accent-butterfly-primary"
                    />
                    <div>
                      <p className="text-xs font-bold text-butterfly-text">Standard Doorstep Delivery</p>
                      <p className="text-[11px] text-butterfly-textMuted">Dispatched via registered islandwide courier (2-4 business days)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-butterfly-text">
                    {baseDeliveryFee === 0 ? 'FREE' : formatLKR(baseDeliveryFee)}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryType('express')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    deliveryType === 'express'
                      ? 'border-butterfly-primary bg-butterfly-soft/40 shadow-sm'
                      : 'border-butterfly-border bg-white hover:bg-butterfly-bg'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === 'express'}
                      onChange={() => setDeliveryType('express')}
                      className="accent-butterfly-primary"
                    />
                    <div>
                      <p className="text-xs font-bold text-butterfly-text">Priority Express Dispatch</p>
                      <p className="text-[11px] text-butterfly-textMuted">Priority packing & rapid 1-2 day dispatch</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-butterfly-text">
                    {formatLKR(baseDeliveryFee + 400)}
                  </span>
                </label>
              </div>
            </div>

            {/* 4. Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft space-y-4">
              <h2 className="font-serif text-lg font-bold text-butterfly-text pb-2 border-b border-butterfly-border">
                4. Payment Method
              </h2>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-butterfly-primary bg-butterfly-soft/40 shadow-sm'
                      : 'border-butterfly-border bg-white hover:bg-butterfly-bg'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="accent-butterfly-primary mt-1"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-butterfly-primary" />
                      <span className="text-xs font-bold text-butterfly-text">Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-butterfly-textMuted leading-relaxed">
                      Pay in cash directly to the courier agent upon receiving your Butterfly Care package at your doorstep.
                    </p>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-butterfly-primary bg-butterfly-soft/40 shadow-sm'
                      : 'border-butterfly-border bg-white hover:bg-butterfly-bg'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="accent-butterfly-primary mt-1"
                  />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-butterfly-primary" />
                      <span className="text-xs font-bold text-butterfly-text">Direct Bank Deposit / Online Banking Transfer</span>
                    </div>
                    <p className="text-[11px] text-butterfly-textMuted leading-relaxed">
                      Transfer directly to our corporate bank account. Once transferred, send the deposit slip via WhatsApp.
                    </p>

                    {/* Bank Details Dropdown Card */}
                    {paymentMethod === 'bank_transfer' && (
                      <div className="p-4 rounded-xl bg-white border border-butterfly-border text-xs space-y-1.5 font-sans mt-2">
                        <p className="font-bold text-butterfly-text">
                          Bank: {settings.bankDetails?.bankName || 'Commercial Bank of Ceylon'}
                        </p>
                        <p className="text-butterfly-textMuted">Branch: {settings.bankDetails?.branch || 'Colombo 07 Branch'}</p>
                        <p className="text-butterfly-textMuted">Account Name: {settings.bankDetails?.accountName || 'Butterfly Care (Pvt) Ltd'}</p>
                        <p className="font-mono font-bold text-butterfly-primary text-sm">
                          Acc No: {settings.bankDetails?.accountNumber || '1000 4589 3210'}
                        </p>
                        <p className="text-[11px] text-butterfly-textMuted pt-1 italic">
                          {settings.bankDetails?.instructions}
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary Sidebar & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-butterfly-border shadow-soft sticky top-24 space-y-5">
              <h2 className="font-serif text-lg font-bold text-butterfly-text pb-3 border-b border-butterfly-border">
                Order Summary ({items.length} Items)
              </h2>

              {/* Items Mini List */}
              <div className="max-h-64 overflow-y-auto divide-y divide-butterfly-border/50 pr-1">
                {items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-butterfly-soft shrink-0 border border-butterfly-border">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-butterfly-text truncate">{item.name}</p>
                      <p className="text-[11px] text-butterfly-textMuted">
                        Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                      </p>
                    </div>
                    <span className="font-semibold text-butterfly-text shrink-0">
                      {formatLKR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Calculation */}
              <div className="space-y-2.5 pt-3 border-t border-butterfly-border text-xs text-butterfly-text">
                <div className="flex justify-between text-butterfly-textMuted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-butterfly-text">{formatLKR(subtotal)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-{formatLKR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-butterfly-textMuted">
                  <span>Delivery ({district})</span>
                  <span className="font-semibold text-butterfly-text">
                    {deliveryFee === 0 ? 'FREE' : formatLKR(deliveryFee)}
                  </span>
                </div>

                <div className="pt-3 border-t border-butterfly-border flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold text-butterfly-text">Total</span>
                  <span className="font-serif text-2xl font-bold text-butterfly-primary">
                    {formatLKR(total)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase text-center transition-all shadow-card flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}</span>
              </button>

              {/* Security badges */}
              <div className="pt-2 text-center text-[11px] text-butterfly-textMuted flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Guaranteed Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
