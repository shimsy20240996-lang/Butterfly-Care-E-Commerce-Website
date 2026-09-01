'use client';

import React from 'react';
import { useSettingsStore } from '@/context/settingsStore';
import { Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useSettingsStore();

  return (
    <div className="bg-butterfly-soft text-butterfly-text text-xs py-2 px-4 text-center font-medium tracking-wide border-b border-butterfly-border flex items-center justify-center gap-2">
      <Sparkles className="w-3.5 h-3.5 text-butterfly-primary shrink-0 animate-pulse" />
      <span>{settings.announcementText || 'Thoughtfully chosen for moms & little ones • Islandwide Delivery Available'}</span>
    </div>
  );
};
