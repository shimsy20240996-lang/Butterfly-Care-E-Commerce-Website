'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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

          {/* Official Logo Display */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 flex items-center justify-center"
          >
            <div className="relative p-4 rounded-3xl bg-white/90 shadow-sm border border-[#E9E9E9]">
              <Image
                src="/logo.jpeg"
                alt="Butterfly Care Logo"
                width={160}
                height={100}
                className="h-20 w-auto object-contain mix-blend-multiply"
              />
            </div>
          </motion.div>

          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 border border-[#E9E9E9] text-xs font-bold uppercase tracking-wider text-[#3F4650] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A6B8]" />
            <span>Welcome to Butterfly Care</span>
          </div>

          {/* Main Title */}
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3F4650] mb-2 leading-tight">
            {userName ? `Welcome back, ${userName.split(' ')[0]}! 🤍` : 'Welcome back, Mom! 🤍'}
          </h2>

          <p className="text-xs sm:text-sm text-[#747A82] max-w-sm mx-auto mb-8 leading-relaxed">
            Let&apos;s discover something soft, pure, and special for you and your little one today.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleShopProducts}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#3F4650] hover:bg-[#5A4945] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 group"
            >
              <span>SHOP OUR PRODUCTS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#3F4650] border border-[#E9E9E9] text-xs font-semibold uppercase tracking-wider transition-all hover:border-[#747A82]"
            >
              Go to Account
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
