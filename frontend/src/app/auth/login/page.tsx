'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { api } from '@/lib/api';
import { useAuthStore } from '@/context/authStore';
import { useToastStore } from '@/context/toastStore';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { WelcomeOverlay } from '@/components/auth/WelcomeOverlay';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { showToast } = useToastStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState('');

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
        setLoggedInUserName(data.user.name);

        if (data.user.role === 'admin') {
          showToast(data.message || 'Logged in as Admin');
          router.push('/admin');
        } else {
          // Trigger the beautiful welcome overlay!
          setShowWelcomeOverlay(true);
        }
      }
    } catch (err: any) {
      showToast(err.message || 'Invalid credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[80vh] flex items-center justify-center bg-[#FFFDF9] px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E9E9] shadow-card space-y-6">
          <div className="text-center space-y-2">
            <Logo size="md" className="justify-center mb-2" />
            <h1 className="font-serif text-2xl font-bold text-[#3F4650]">Welcome Back</h1>
            <p className="text-xs text-[#747A82]">
              Sign in to view your orders, saved favorites, and gentle baby essentials.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#3F4650] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#747A82] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dilani.p@gmail.com"
                  className="w-full text-xs pl-11 pr-4 py-3.5 rounded-xl border border-[#E9E9E9] bg-[#FFFDF9] text-[#3F4650] focus:outline-none focus:border-[#3F4650]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-[#3F4650]">Password</label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#747A82] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-11 pr-4 py-3.5 rounded-xl border border-[#E9E9E9] bg-[#FFFDF9] text-[#3F4650] focus:outline-none focus:border-[#3F4650]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#3F4650] hover:bg-[#5A4945] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Credentials Helper Card */}
          <div className="p-3.5 rounded-2xl bg-[#F3FAFE] border border-[#8EC5E8]/40 text-[11px] text-[#3F4650] space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-[#5BA7D1]">
              <ShieldCheck className="w-3.5 h-3.5" /> Quick Demo Credentials:
            </p>
            <div className="flex justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@butterflycare.com');
                  setPassword('Admin@123456');
                }}
                className="text-[#5BA7D1] underline font-semibold hover:text-black"
              >
                Fill Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('dilani.p@gmail.com');
                  setPassword('Customer@123');
                }}
                className="text-[#E8A6B8] underline font-semibold hover:text-black"
              >
                Fill Customer
              </button>
            </div>
          </div>

          <div className="text-center pt-2 text-xs text-[#747A82]">
            Don&apos;t have an account yet?{' '}
            <Link href="/auth/register" className="font-bold text-[#5BA7D1] hover:underline">
              Register Here
            </Link>
          </div>
        </div>
      </div>

      {/* Post-Login Welcome Modal Overlay */}
      <WelcomeOverlay
        isOpen={showWelcomeOverlay}
        onClose={() => {
          setShowWelcomeOverlay(false);
          router.push('/products');
        }}
        userName={loggedInUserName}
      />
    </>
  );
}
