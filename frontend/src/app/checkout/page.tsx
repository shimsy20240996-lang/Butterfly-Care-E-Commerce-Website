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
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

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

  // Simple Form State
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('Colombo');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'bank_transfer'>('cash_on_delivery');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name);
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
        <div className="max-w-md w-full text-center bg-white rounded-2xl p-8 border border-[#EFEAE6] shadow-soft space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#454545]">Your Cart is Empty</h2>
          <p className="text-xs text-[#7A7A7A]">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="inline-flex px-6 py-3 rounded-xl bg-[#4F7FA0] text-white text-xs font-bold uppercase tracking-wider"
          >
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !addressLine.trim() || !city.trim()) {
      showToast('Please fill in all required shipping details.', 'error');
      return;
    }

    try {
      setIsSubmitting(true);

      const orderPayload = {
        items: items.map((i) => ({
          product: i.product,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
          selectedSize: i.selectedSize,
          selectedColor: i.selectedColor,
          sku: i.sku,
        })),
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          addressLine: addressLine.trim(),
          city: city.trim(),
          district,
          postalCode: '00000',
        },
        paymentMethod,
        deliveryType: 'standard',
        deliveryFee,
        discountAmount: 0,
        subtotal,
        totalAmount: total,
      };

      const res = await api.post<{ success: boolean; order: any; message: string }>(
        '/orders',
        orderPayload
      );

      const createdOrder = res?.order || {
        _id: `BC-${Date.now().toString().slice(-6)}`,
        orderNumber: `BC-${Math.floor(10000 + Math.random() * 90000)}`,
        items,
        totalAmount: total,
        createdAt: new Date().toISOString(),
      };

      // Save to local storage for guest orders
      localStorage.setItem('butterfly_last_order', JSON.stringify(createdOrder));

      clearCart();
      showToast('Order placed successfully! 🦋');
      router.push(`/order-success?orderId=${createdOrder._id || createdOrder.orderNumber}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      showToast(err.message || 'Failed to place order. Please try again.', 'error');
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
            Safe and gentle ordering for your family.
          </p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Shipping & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Information */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#EFEAE6] shadow-soft space-y-4">
              <h2 className="font-serif text-base font-bold text-[#454545]">
                1. Delivery Details
              </h2>

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
                    placeholder="Dilani Perera"
                    className="w-full text-xs p-3 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0]"
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
                    placeholder="077 123 4567"
                    className="w-full text-xs p-3 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#454545] mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="No. 42, Flower Road"
                    className="w-full text-xs p-3 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0]"
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
                      placeholder="Colombo 07"
                      className="w-full text-xs p-3 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#454545] mb-1">
                      District *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] focus:outline-none focus:border-[#4F7FA0]"
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

            {/* Payment Options */}
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#EFEAE6] shadow-soft space-y-3">
              <h2 className="font-serif text-base font-bold text-[#454545]">
                2. Payment Method
              </h2>

              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cash_on_delivery'
                    ? 'border-[#4F7FA0] bg-[#E5F4FC]/40'
                    : 'border-[#EFEAE6] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cash_on_delivery"
                    checked={paymentMethod === 'cash_on_delivery'}
                    onChange={() => setPaymentMethod('cash_on_delivery')}
                    className="accent-[#4F7FA0]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#454545]">Cash on Delivery</p>
                    <p className="text-[11px] text-[#7A7A7A]">Pay in cash when your package arrives at your doorstep.</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#4F7FA0] bg-[#E5F4FC]/40'
                    : 'border-[#EFEAE6] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="accent-[#4F7FA0]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#454545]">Bank Transfer / Online Deposit</p>
                    <p className="text-[11px] text-[#7A7A7A]">Transfer directly to Commercial Bank / Sampath Bank.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 bg-white rounded-2xl border border-[#EFEAE6] shadow-soft space-y-4">
              <h2 className="font-serif text-base font-bold text-[#454545]">
                Order Summary
              </h2>

              <div className="divide-y divide-[#EFEAE6] max-h-60 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={`${item.product}-${idx}`} className="py-2.5 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#FFFDFB] shrink-0 border border-[#EFEAE6]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#454545] truncate">{item.name}</p>
                      <p className="text-[11px] text-[#7A7A7A]">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-[#454545]">
                      {formatLKR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EFEAE6] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#454545]">{formatLKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#7A7A7A]">
                  <span>Islandwide Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatLKR(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#454545] pt-2 border-t border-[#EFEAE6]">
                  <span>Total</span>
                  <span>{formatLKR(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
              >
                <span>{isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-[#7A7A7A] flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Safe & Secure Ordering</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
