'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const iconSize = isSmall ? 28 : isLarge ? 42 : 34;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="Butterfly Care - Home"
    >
      {/* 💙 Blue & 🩷 Pink Butterfly Vector Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 💙 LEFT WINGS: BABY BOY (#8EC5E8) */}
          <path
            d="M48 48C48 48 38 18 18 18C8 18 4 30 7 42C10 52 24 62 46 68"
            fill="#8EC5E8"
          />
          <path
            d="M46 54C46 54 30 58 22 68C16 76 22 84 32 82C40 80 46 72 48 64"
            fill="#E5F4FC"
          />

          {/* 🩷 RIGHT WINGS: BABY GIRL (#E8A6B8) */}
          <path
            d="M52 48C52 48 62 18 82 18C92 18 96 30 93 42C90 52 76 62 54 68"
            fill="#E8A6B8"
          />
          <path
            d="M54 54C54 54 70 58 78 68C84 76 78 84 68 82C60 80 54 72 52 64"
            fill="#FCE8EE"
          />

          {/* 🤍 CENTER: MOTHER & BABY HEART SILHOUETTE (#454545) */}
          <circle cx="50" cy="28" r="3.5" fill="#454545" />
          <path
            d="M50 34C48.5 34 48 46 48 58C48 68 50 72 50 72C50 72 52 68 52 58C52 46 51.5 34 50 34Z"
            fill="#454545"
          />

          {/* Antennae */}
          <path
            d="M48 26C45 18 39 14 35 15"
            stroke="#8EC5E8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M52 26C55 18 61 14 65 15"
            stroke="#E8A6B8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography: BUTTERFLY CARE - for every mom */}
      <div className="flex flex-col text-left leading-tight">
        <span
          className={`font-serif tracking-[0.12em] font-bold text-[#454545] ${
            isSmall ? 'text-sm' : isLarge ? 'text-xl' : 'text-base sm:text-lg'
          }`}
        >
          BUTTERFLY CARE
        </span>
        {showTagline && (
          <span className="font-sans text-[10px] sm:text-[11px] font-medium text-[#7A7A7A] tracking-wider -mt-0.5">
            for every mom
          </span>
        )}
      </div>
    </Link>
  );
};
