import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  inverted = false,
}) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const textColor = inverted ? 'text-white' : 'text-[#3F4650]';
  const taglineColor = inverted ? 'text-white/80' : 'text-[#747A82]';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group select-none ${className}`}
      aria-label="Butterfly Care - Home"
    >
      {/* Sophisticated Dual-Wing Blue + Pink Butterfly Emblem */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          width={isSmall ? 32 : isLarge ? 48 : 38}
          height={isSmall ? 32 : isLarge ? 48 : 38}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* LEFT WINGS: 💙 BABY BOY BLUE (#8EC5E8 & #5BA7D1) */}
          <path
            d="M48 48C48 48 38 20 20 20C8 20 5 32 8 45C11 56 26 64 47 70"
            fill="url(#boyWingGrad)"
          />
          <path
            d="M47 54C47 54 32 58 24 68C18 78 24 86 35 84C44 82 48 72 49 64"
            fill="#DFF2FC"
          />

          {/* RIGHT WINGS: 🩷 BABY GIRL PINK (#E8A6B8 & #D77F99) */}
          <path
            d="M52 48C52 48 62 20 80 20C92 20 95 32 92 45C89 56 74 64 53 70"
            fill="url(#girlWingGrad)"
          />
          <path
            d="M53 54C53 54 68 58 76 68C82 78 76 86 65 84C56 82 52 72 51 64"
            fill="#F9DDE5"
          />

          {/* CENTER: 🤍 MOTHER & HEART SILHOUETTE */}
          <circle cx="50" cy="30" r="4" fill="#3F4650" />
          <path
            d="M50 36C49 36 48.5 48 48.5 60C48.5 68 50 74 50 74C50 74 51.5 68 51.5 60C51.5 48 51 36 50 36Z"
            fill="#3F4650"
          />
          {/* Subtle Antennae */}
          <path
            d="M48 28C45 20 38 15 34 16"
            stroke="#8EC5E8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M52 28C55 20 62 15 66 16"
            stroke="#E8A6B8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Gradients Definition */}
          <defs>
            <linearGradient id="boyWingGrad" x1="10" y1="20" x2="48" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8EC5E8" />
              <stop offset="1" stopColor="#5BA7D1" />
            </linearGradient>
            <linearGradient id="girlWingGrad" x1="90" y1="20" x2="52" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E8A6B8" />
              <stop offset="1" stopColor="#D77F99" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left leading-tight">
        <span
          className={`font-serif tracking-[0.14em] uppercase font-bold ${textColor} ${
            isSmall ? 'text-base' : isLarge ? 'text-2xl' : 'text-lg md:text-xl'
          }`}
        >
          BUTTERFLY CARE
        </span>
        {showTagline && (
          <span
            className={`font-sans tracking-[0.2em] text-[10px] md:text-[11px] font-medium lowercase italic ${taglineColor}`}
          >
            for every mom
          </span>
        )}
      </div>
    </Link>
  );
};
