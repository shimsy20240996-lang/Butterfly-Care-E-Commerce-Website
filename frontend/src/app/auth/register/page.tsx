'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { api } from '@/lib/api';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { User, Mail, Lock, Phone, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { showToast } = useToastStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    try {
      setLoading(true);
      const data = await api.post<{
        success: boolean;
        token: string;
        user: any;
        message: string;
      }>('/auth/register', { name, email, phone, password });

      if (data && data.token && data.user) {
        login(data.token, data.user);
        showToast(data.message || 'Welcome to Butterfly!');
        router.push('/account');
      }
    } catch (err: any) {
      showToast(err.message || 'Registration failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F8F3EF] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-butterfly-border shadow-card space-y-6">
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center mb-2" />
          <h1 className="font-serif text-2xl font-bold text-butterfly-text">Join BUTTERFLY</h1>
          <p className="text-xs text-butterfly-textMuted">
            Create an account to save your favorite baby essentials, track orders, and receive member perks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-butterfly-text mb-1">Full Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-butterfly-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dilani Perera"
                className="w-full text-xs pl-11 pr-4 py-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-butterfly-text mb-1">Email Address *</label>
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
            <label className="block text-xs font-semibold text-butterfly-text mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-butterfly-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+94 77 123 4567"
                className="w-full text-xs pl-11 pr-4 py-3.5 rounded-xl border border-butterfly-border bg-butterfly-bg focus:outline-none focus:border-butterfly-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-butterfly-text mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-butterfly-textMuted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                minLength={6}
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
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-butterfly-textMuted">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-bold text-butterfly-primary hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
