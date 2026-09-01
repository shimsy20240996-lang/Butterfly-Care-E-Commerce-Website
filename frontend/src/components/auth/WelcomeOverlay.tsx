'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface WelcomeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({
  isOpen,
  onClose,
  userName,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleShopProducts = () => {
    onClose();
    router.push('/products');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#454545]/40 backdrop-blur-xs">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 sm:p-8 text-center shadow-xl border border-[#EFEAE6] space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-[#7A7A7A] hover:text-[#454545] rounded-full hover:bg-black/5"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <Logo size="sm" className="justify-center mb-1" />

        <div className="space-y-1">
          <h2 className="font-serif text-xl font-bold text-[#454545]">
            Welcome back! 🦋
          </h2>
          <p className="text-xs text-[#7A7A7A] leading-relaxed">
            Let&apos;s find something special for you and your little one.
          </p>
        </div>

        <button
          onClick={handleShopProducts}
          className="w-full py-3 rounded-xl bg-[#4F7FA0] hover:bg-[#3D6783] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2 active:scale-95"
        >
          <span>SHOP PRODUCTS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
