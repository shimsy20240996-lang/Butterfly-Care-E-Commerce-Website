'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { api } from '@/lib/api';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { showToast } = useToastStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }

    try {
      setLoading(true);
      const data = await api.post<{
        success: boolean;
        token: string;
        user: any;
        message: string;
      }>('/auth/login', { email, password });

      if (data && data.token && data.user) {
        login(data.token, data.user);
        showToast(data.message || 'Logged in successfully!');
        if (data.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/account');
        }
      }
    } catch (err: any) {
      showToast(err.message || 'Invalid credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F8F3EF] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-butterfly-border shadow-card space-y-6">
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center mb-2" />
          <h1 className="font-serif text-2xl font-bold text-butterfly-text">Welcome Back</h1>
          <p className="text-xs text-butterfly-textMuted">
            Sign in to view your orders, saved favorites, and member benefits.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-butterfly-text mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-butterfly-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dilani@example.com"
                className="w-full text-xs pl-11 pr-4 py-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-butterfly-text">Password</label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-butterfly-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs pl-11 pr-4 py-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-butterfly-primary hover:bg-butterfly-primaryHover text-white text-xs font-bold uppercase tracking-widest transition-all shadow-card flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Helper Card */}
        <div className="p-3.5 rounded-2xl bg-butterfly-soft/60 border border-butterfly-border/70 text-[11px] text-butterfly-text space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-butterfly-primary">
            <ShieldCheck className="w-3.5 h-3.5" /> Quick Demo Credentials:
          </p>
          <div className="flex justify-between">
            <button
              onClick={() => {
                setEmail('admin@butterflycare.com');
                setPassword('Admin@123456');
              }}
              className="text-butterfly-primary underline font-medium hover:text-black"
            >
              Fill Admin Account
            </button>
            <button
              onClick={() => {
                setEmail('dilani.p@gmail.com');
                setPassword('Customer@123');
              }}
              className="text-butterfly-text underline font-medium hover:text-black"
            >
              Fill Customer Account
            </button>
          </div>
        </div>

        <div className="text-center pt-2 text-xs text-butterfly-textMuted">
          Don&apos;t have an account yet?{' '}
          <Link href="/auth/register" className="font-bold text-butterfly-primary hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
