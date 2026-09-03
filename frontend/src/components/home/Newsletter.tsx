'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToastStore } from '@/context/toastStore';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useToastStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsSubscribed(true);
    showToast('Welcome to the Butterfly family! Check your inbox for your 10% welcome coupon.');
    setEmail('');
  };

  return (
    <section className="py-16 md:py-24 bg-[#F1E2DC]/50 border-t border-butterfly-border/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-butterfly-border shadow-card space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Stay Connected
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-butterfly-text">
            Join the BUTTERFLY Family
          </h2>

          <p className="text-xs sm:text-sm text-butterfly-textMuted max-w-lg mx-auto leading-relaxed">
            Be the first to discover new arrivals, special offers, parenting insights, and exclusive discounts for moms and little ones.
          </p>

          {isSubscribed ? (
            <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you for subscribing! You are now part of our caring community.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-butterfly-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-butterfly-bg border border-butterfly-border text-xs text-butterfly-text placeholder-butterfly-textMuted/60 focus:outline-none focus:border-butterfly-primary shadow-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold tracking-widest uppercase transition-all shadow-card hover:scale-105 active:scale-95 shrink-0"
              >
                SUBSCRIBE
              </button>
            </form>
          )}

          <p className="text-[11px] text-butterfly-textMuted">
            We respect your privacy. Unsubscribe anytime with a single click.
          </p>
        </div>
      </div>
    </section>
  );
};
