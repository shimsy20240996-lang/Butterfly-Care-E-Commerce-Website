'use client';

import React from 'react';
import { useSettingsStore } from '@/context/settingsStore';
import { Users, PackageCheck, Layers, MapPin } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const { settings } = useSettingsStore();

  const stats = [
    {
      icon: Users,
      value: `${settings.stats?.happyCustomers || '1,250'}+`,
      label: 'Happy Customers',
      sub: 'Mothers & families across Sri Lanka'
    },
    {
      icon: PackageCheck,
      value: `${settings.stats?.totalProducts || '500'}+`,
      label: 'Curated Essentials',
      sub: 'Certified non-toxic & pure'
    },
    {
      icon: Layers,
      value: `${settings.stats?.totalCategories || '25'}+`,
      label: 'Specialized Categories',
      sub: 'From maternity to toddlerhood'
    },
    {
      icon: MapPin,
      value: '25 Districts',
      label: 'Islandwide Delivery',
      sub: 'Safe doorstep courier with COD'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F1E2DC]/40 border-y border-butterfly-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text">
            Chosen with Care. Loved by Families.
          </h2>
          <p className="text-xs sm:text-sm text-butterfly-textMuted mt-1">
            Bringing peace of mind, quality comfort, and smiles to homes every single day.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-butterfly-border text-center flex flex-col items-center hover:bg-white transition-all shadow-soft group"
              >
                <div className="w-10 h-10 rounded-2xl bg-butterfly-soft text-butterfly-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-butterfly-text tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-butterfly-primary mt-1">
                  {s.label}
                </div>
                <p className="text-[11px] text-butterfly-textMuted mt-0.5">{s.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
