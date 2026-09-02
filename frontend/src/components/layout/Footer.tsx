'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

export const Footer: React.FC = () => {
  const whatsappUrl = generateWhatsAppLink(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '94740225855', 'Hello BUTTERFLY CARE, I have an inquiry.');

  return (
    <footer className="bg-white border-t border-[#EFEAE6] text-[#454545] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <Logo size="md" />
            <p className="text-xs text-[#7A7A7A] max-w-sm leading-relaxed">
              Thoughtfully curated baby and mother care essentials designed to bring comfort, pure gentleness, and peace of mind to your family.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-bold hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +94 74 022 5855</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-bold text-[#454545]">Quick Links</h4>
            <ul className="space-y-1.5 text-xs text-[#7A7A7A]">
              <li><Link href="/" className="hover:text-[#4F7FA0] transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-[#4F7FA0] transition-colors">Our Products</Link></li>
              <li><Link href="/orders" className="hover:text-[#4F7FA0] transition-colors">My Orders</Link></li>
              <li><Link href="/our-story" className="hover:text-[#4F7FA0] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#4F7FA0] transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h4 className="font-serif text-sm font-bold text-[#454545]">Categories</h4>
            <ul className="space-y-1.5 text-xs text-[#7A7A7A]">
              <li><Link href="/products?gender=boy" className="hover:text-[#4F7FA0] transition-colors">💙 Baby Boy</Link></li>
              <li><Link href="/products?gender=girl" className="hover:text-[#B86F84] transition-colors">🩷 Baby Girl</Link></li>
              <li><Link href="/products?gender=mom" className="hover:text-[#454545] transition-colors">🤍 Mom Care</Link></li>
              <li><Link href="/products?category=feeding-nursing" className="hover:text-[#4F7FA0] transition-colors">🍼 Feeding</Link></li>
              <li><Link href="/products?category=bath-care" className="hover:text-[#4F7FA0] transition-colors">🛁 Bath & Care</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#EFEAE6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A7A7A]">
          <p>© {new Date().getFullYear()} BUTTERFLY CARE. All rights reserved. • for every mom</p>
          <div className="flex items-center gap-4">
            <Link href="/our-story" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/account" className="hover:underline">My Account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
