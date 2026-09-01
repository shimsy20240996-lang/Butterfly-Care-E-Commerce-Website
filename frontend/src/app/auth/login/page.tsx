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
          // Trigger the gentle welcome message!
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
      <div className="min-h-[75vh] flex items-center justify-center bg-[#FFFDFB] px-4 py-12 sm:py-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-10 border border-[#EFEAE6] shadow-soft space-y-6">
          <div className="text-center space-y-1.5">
            <Logo size="md" className="justify-center mb-2" />
            <h1 className="font-serif text-2xl font-bold text-[#454545]">Login</h1>
            <p className="text-xs text-[#7A7A7A]">
              Sign in to manage your orders and view your cart.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#454545] mb-1">Email / Phone</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7A7A7A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dilani.p@gmail.com"
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] text-[#454545] focus:outline-none focus:border-[#4F7FA0]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#454545] mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7A7A7A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-[#EFEAE6] bg-[#FFFDFB] text-[#454545] focus:outline-none focus:border-[#4F7FA0]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95"
            >
              <span>{loading ? 'LOGGING IN...' : 'LOGIN'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="p-3 rounded-xl bg-[#E5F4FC]/50 border border-[#8EC5E8]/40 text-[11px] text-[#454545] space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-[#4F7FA0]">
              <ShieldCheck className="w-3.5 h-3.5" /> Demo Accounts:
            </p>
            <div className="flex justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@butterflycare.com');
                  setPassword('Admin@123456');
                }}
                className="text-[#4F7FA0] underline font-semibold"
              >
                Fill Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('dilani.p@gmail.com');
                  setPassword('Customer@123');
                }}
                className="text-[#B86F84] underline font-semibold"
              >
                Fill Customer
              </button>
            </div>
          </div>

          <div className="text-center pt-1 text-xs text-[#7A7A7A]">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-bold text-[#4F7FA0] hover:underline">
              Register Here
            </Link>
          </div>
        </div>
      </div>

      {/* Post-Login Welcome Card */}
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
