'use client';

import React from 'react';
import Image from 'next/image';
import { Instagram, Heart } from 'lucide-react';
import { useSettingsStore } from '@/context/settingsStore';

const INSTA_POSTS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800&auto=format&fit=crop', likes: 248 },
  { id: 2, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop', likes: 312 },
  { id: 3, image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=800&auto=format&fit=crop', likes: 450 },
  { id: 4, image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop', likes: 289 },
  { id: 5, image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop', likes: 374 },
  { id: 6, image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop', likes: 418 }
];

export const InstagramGrid: React.FC = () => {
  const { settings } = useSettingsStore();

  return (
    <section className="py-16 md:py-24 bg-[#FAF6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-butterfly-primary bg-butterfly-soft px-3.5 py-1 rounded-full">
            <Instagram className="w-3.5 h-3.5" />
            @butterflycare
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-butterfly-text">
            Follow Our Little Moments
          </h2>
          <p className="text-xs sm:text-sm text-butterfly-textMuted">
            Join our community of caring mamas sharing precious daily parenting stories.
          </p>
        </div>

        {/* 6-Photo Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTA_POSTS.map((post) => (
            <a
              key={post.id}
              href={settings.socialLinks?.instagram || 'https://instagram.com'}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-butterfly-soft border border-butterfly-border block shadow-soft"
            >
              <Image
                src={post.image}
                alt="Butterfly Care lifestyle moment"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover overlay with heart and likes */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-semibold">
                <Heart className="w-4 h-4 fill-current text-rose-400" />
                <span>{post.likes}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA Button */}
        <div className="text-center mt-10">
          <a
            href={settings.socialLinks?.instagram || 'https://instagram.com'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-butterfly-soft border border-butterfly-border text-xs font-bold uppercase tracking-widest text-butterfly-text hover:text-butterfly-primary transition-all shadow-soft"
          >
            <Instagram className="w-4 h-4 text-butterfly-primary" />
            <span>FOLLOW US ON INSTAGRAM</span>
          </a>
        </div>
      </div>
    </section>
  );
};
