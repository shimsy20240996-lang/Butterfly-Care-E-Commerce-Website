'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { useSettingsStore } from '@/context/settingsStore';
import { Instagram, Facebook, MessageCircle, Phone, Mail, MapPin, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings } = useSettingsStore();

  return (
    <footer className="bg-[#FAF6F3] border-t border-butterfly-border text-butterfly-text pt-16 pb-10">
      {/* Brand Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-white/70 border border-butterfly-border">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-butterfly-soft flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-butterfly-primary" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-text">100% Certified Safe</h4>
              <p className="text-[11px] text-butterfly-textMuted">Pure, organic & gentle materials</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-butterfly-soft flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-butterfly-primary" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-text">Islandwide Delivery</h4>
              <p className="text-[11px] text-butterfly-textMuted">Fast dispatch to all 25 districts</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-butterfly-soft flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-butterfly-primary" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-text">Hassle-Free Returns</h4>
              <p className="text-[11px] text-butterfly-textMuted">7-day gentle return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-butterfly-soft flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-butterfly-primary" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-text">Made for Every Mom</h4>
              <p className="text-[11px] text-butterfly-textMuted">Thoughtfully designed with love</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Intro (Span 2 columns on large screens) */}
          <div className="col-span-2 space-y-4 pr-0 lg:pr-6">
            <Logo size="lg" />
            <p className="text-xs text-butterfly-textMuted leading-relaxed max-w-sm mt-3">
              Thoughtfully curated baby and mother care essentials created to make parenting a little easier,
              calmer, and full of heartfelt warmth.
            </p>

            <div className="space-y-2 pt-2 text-xs text-butterfly-textMuted">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-butterfly-primary shrink-0" />
                <span>{settings.address || 'No. 42, Lotus Avenue, Colombo 07, Sri Lanka'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-butterfly-primary shrink-0" />
                <span>{settings.contactPhone || '+94 11 234 5678'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-butterfly-primary shrink-0" />
                <span>{settings.contactEmail || 'care@butterflycare.lk'}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={settings.socialLinks?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-butterfly-soft hover:bg-butterfly-primary hover:text-white flex items-center justify-center text-butterfly-text transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-butterfly-soft hover:bg-butterfly-primary hover:text-white flex items-center justify-center text-butterfly-text transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.whatsapp || 'https://wa.me/94771234567'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-butterfly-soft hover:bg-[#25D366] hover:text-white flex items-center justify-center text-butterfly-text transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: SHOP */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-text mb-4">SHOP</h4>
            <ul className="space-y-2.5 text-xs text-butterfly-textMuted">
              <li>
                <Link href="/shop" className="hover:text-butterfly-primary transition-colors">Shop All</Link>
              </li>
              <li>
                <Link href="/shop?filter=newArrival" className="hover:text-butterfly-primary transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link href="/shop?filter=bestSeller" className="hover:text-butterfly-primary transition-colors">Best Sellers</Link>
              </li>
              <li>
                <Link href="/shop?category=toys-gifts" className="hover:text-butterfly-primary transition-colors">Special Offers</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: BABY */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-text mb-4">BABY</h4>
            <ul className="space-y-2.5 text-xs text-butterfly-textMuted">
              <li>
                <Link href="/shop?category=baby-care" className="hover:text-butterfly-primary transition-colors">Baby Care</Link>
              </li>
              <li>
                <Link href="/shop?category=feeding-nursing" className="hover:text-butterfly-primary transition-colors">Feeding</Link>
              </li>
              <li>
                <Link href="/shop?category=sleep-snuggle" className="hover:text-butterfly-primary transition-colors">Sleep & Snuggle</Link>
              </li>
              <li>
                <Link href="/shop?category=bath-care" className="hover:text-butterfly-primary transition-colors">Bath & Care</Link>
              </li>
              <li>
                <Link href="/shop?category=clothing" className="hover:text-butterfly-primary transition-colors">Clothing</Link>
              </li>
              <li>
                <Link href="/shop?category=toys-gifts" className="hover:text-butterfly-primary transition-colors">Toys & Gifts</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: MOM */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-text mb-4">MOM</h4>
            <ul className="space-y-2.5 text-xs text-butterfly-textMuted">
              <li>
                <Link href="/shop?category=mom-care" className="hover:text-butterfly-primary transition-colors">Mom Care</Link>
              </li>
              <li>
                <Link href="/shop?category=mom-care" className="hover:text-butterfly-primary transition-colors">Nursing Essentials</Link>
              </li>
              <li>
                <Link href="/shop?category=mom-care" className="hover:text-butterfly-primary transition-colors">Postpartum Recovery</Link>
              </li>
              <li>
                <Link href="/shop?category=mom-care" className="hover:text-butterfly-primary transition-colors">Mother Loungewear</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: HELP & COMPANY */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-butterfly-text mb-4">HELP & INFO</h4>
            <ul className="space-y-2.5 text-xs text-butterfly-textMuted">
              <li>
                <Link href="/contact" className="hover:text-butterfly-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-butterfly-primary transition-colors">Track Order</Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-butterfly-primary transition-colors">Our Story</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-butterfly-primary transition-colors">Delivery & Returns</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-butterfly-primary transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-butterfly-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-butterfly-textMuted">
          <p>© 2026 BUTTERFLY CARE. All Rights Reserved. Crafted with love for every mom.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Currency: <strong>LKR (Sri Lankan Rupee)</strong></span>
            <span>Islandwide Delivery Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
