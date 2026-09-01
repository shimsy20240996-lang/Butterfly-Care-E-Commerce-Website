'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface WelcomeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({
  isOpen,
  onClose,
  userName
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleShopProducts = () => {
    onClose();
    router.push('/products');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#3F4650]/40 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F7] to-[#F3FAFE] p-8 sm:p-10 text-center shadow-2xl border border-white/80"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#747A82] hover:text-[#3F4650] rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close welcome message"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Dual Blue + Pink Butterfly Emblem */}
          <motion.div
            initial={{ scale: 0.6, rotate: -8 }}
            animate={{ scale: 1, rotate: [0, 4, -4, 0] }}
            transition={{
              scale: { duration: 0.5 },
              rotate: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
            }}
            className="mx-auto mb-6 flex items-center justify-center"
          >
            <div className="relative p-4 rounded-full bg-white/90 shadow-sm border border-[#E9E9E9]">
              <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 💙 Baby Boy Blue Wing */}
                <path
                  d="M48 48C48 48 38 20 20 20C8 20 5 32 8 45C11 56 26 64 47 70"
                  fill="url(#ovBoyWing)"
                />
                <path
                  d="M47 54C47 54 32 58 24 68C18 78 24 86 35 84C44 82 48 72 49 64"
                  fill="#DFF2FC"
                />
                {/* 🩷 Baby Girl Pink Wing */}
                <path
                  d="M52 48C52 48 62 20 80 20C92 20 95 32 92 45C89 56 74 64 53 70"
                  fill="url(#ovGirlWing)"
                />
                <path
                  d="M53 54C53 54 68 58 76 68C82 78 76 86 65 84C56 82 52 72 51 64"
                  fill="#F9DDE5"
                />
                {/* Center Silhouette */}
                <circle cx="50" cy="30" r="4" fill="#3F4650" />
                <path
                  d="M50 36C49 36 48.5 48 48.5 60C48.5 68 50 74 50 74C50 74 51.5 68 51.5 60C51.5 48 51 36 50 36Z"
                  fill="#3F4650"
                />
                <path d="M48 28C45 20 38 15 34 16" stroke="#8EC5E8" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M52 28C55 20 62 15 66 16" stroke="#E8A6B8" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="ovBoyWing" x1="10" y1="20" x2="48" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8EC5E8" />
                    <stop offset="1" stopColor="#5BA7D1" />
                  </linearGradient>
                  <linearGradient id="ovGirlWing" x1="90" y1="20" x2="52" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#E8A6B8" />
                    <stop offset="1" stopColor="#D77F99" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Welcome Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#E9E9E9] text-xs font-semibold tracking-wider text-[#3F4650] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A6B8]" />
            <span>Welcome back, {userName ? userName.split(' ')[0] : 'Mom'}! 🤍</span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F4650] mb-1">
            BUTTERFLY CARE
          </h2>
          <p className="font-sans text-xs tracking-widest uppercase text-[#747A82] mb-4">
            — for every mom —
          </p>

          <p className="text-sm text-[#747A82] leading-relaxed max-w-sm mx-auto mb-8">
            Let&apos;s find something gentle and special for you and your little one today.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleShopProducts}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#3F4650] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5A4945] active:scale-95 transition-all shadow-md group"
            >
              <span>SHOP OUR PRODUCTS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#3F4650] border border-[#E9E9E9] text-xs font-semibold hover:bg-black/5 transition-all"
            >
              Continue to Home
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
