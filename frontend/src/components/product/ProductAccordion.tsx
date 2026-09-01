'use client';

import React, { useState } from 'react';
import { ChevronDown, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '@/types';

interface ProductAccordionProps {
  product: Product;
}

export const ProductAccordion: React.FC<ProductAccordionProps> = ({ product }) => {
  const [openSection, setOpenSection] = useState<string | null>('description');

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: 'description',
      title: 'Full Description',
      content: (
        <div className="space-y-3 text-xs md:text-sm text-butterfly-textMuted leading-relaxed">
          <p>{product.description}</p>
          {product.shortDescription && <p className="italic">{product.shortDescription}</p>}
        </div>
      )
    },
    {
      id: 'materials',
      title: 'Materials & Craftsmanship',
      content: (
        <div className="space-y-2 text-xs md:text-sm text-butterfly-textMuted leading-relaxed">
          <p className="font-semibold text-butterfly-text">{product.materials || '100% Certified Organic Materials'}</p>
          <p>
            Dermatologist tested, free of BPA, phthalates, parabens, synthetic dyes, and harsh allergens.
            Safe for contact with newborn skin from Day 1.
          </p>
        </div>
      )
    },
    {
      id: 'care',
      title: 'Care Instructions',
      content: (
        <div className="space-y-2 text-xs md:text-sm text-butterfly-textMuted leading-relaxed">
          <p>{product.careInstructions || 'Hand wash or gentle cold machine wash. Lay flat or line dry in shade.'}</p>
        </div>
      )
    },
    {
      id: 'delivery',
      title: 'Islandwide Delivery & Returns',
      content: (
        <div className="space-y-2.5 text-xs text-butterfly-textMuted leading-relaxed">
          <div className="flex items-center gap-2 text-butterfly-text font-medium">
            <Truck className="w-4 h-4 text-butterfly-primary" />
            <span>Islandwide Delivery within 2-4 business days across Sri Lanka.</span>
          </div>
          <div className="flex items-center gap-2 text-butterfly-text font-medium">
            <ShieldCheck className="w-4 h-4 text-butterfly-primary" />
            <span>Cash on Delivery & Direct Bank Transfer supported.</span>
          </div>
          <div className="flex items-center gap-2 text-butterfly-text font-medium">
            <RefreshCw className="w-4 h-4 text-butterfly-primary" />
            <span>7-day gentle return policy for unused, unopened products.</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="divide-y divide-butterfly-border border-y border-butterfly-border">
      {sections.map((sec) => (
        <div key={sec.id} className="py-4">
          <button
            onClick={() => toggle(sec.id)}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="font-serif text-sm md:text-base font-semibold text-butterfly-text group-hover:text-butterfly-primary transition-colors">
              {sec.title}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-butterfly-textMuted transition-transform duration-300 ${
                openSection === sec.id ? 'rotate-180 text-butterfly-primary' : ''
              }`}
            />
          </button>
          {openSection === sec.id && (
            <div className="pt-3 pb-1 text-butterfly-text animate-in fade-in slide-in-from-top-1">
              {sec.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
