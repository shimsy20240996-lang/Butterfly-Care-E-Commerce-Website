'use client';

import React from 'react';
import { useSettingsStore } from '@/context/settingsStore';
import { MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

interface FloatingWhatsAppProps {
  customMessage?: string;
  className?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  customMessage,
  className = ''
}) => {
  const { settings } = useSettingsStore();

  const phone = settings.whatsappNumber || '+94 74 022 5855';
  const message =
    customMessage ||
    'Hello Butterfly Care! I would love some assistance with baby and mom care products.';

  const whatsappUrl = generateWhatsAppLink(phone, message);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Butterfly Care on WhatsApp"
      className={`fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-floating hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-300 group ${className}`}
    >
      <MessageCircle className="w-5 h-5 fill-current shrink-0" />
      <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
        Chat With Us
      </span>
      {/* Pulse indicator */}
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-[#25D366] animate-ping" />
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full border-2 border-[#25D366]" />
    </a>
  );
};
