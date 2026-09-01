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

  const textColor = inverted ? 'text-white' : 'text-butterfly-text';
  const taglineColor = inverted ? 'text-white/80' : 'text-butterfly-textMuted';
  const wingColor1 = inverted ? '#FFFFFF' : '#B98276';
  const wingColor2 = inverted ? '#E8D5CE' : '#DDB9AE';

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Sophisticated Butterfly Heart Icon */}
      <svg
        width={isSmall ? 28 : isLarge ? 42 : 34}
        height={isSmall ? 28 : isLarge ? 42 : 34}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Left Upper Wing - Soft Heart Petal */}
        <path
          d="M48 45C48 45 42 22 26 22C14 22 10 33 13 46C15.5 56.5 28 64 47 68"
          fill={wingColor1}
          fillOpacity="0.88"
        />
        {/* Right Upper Wing - Soft Heart Petal */}
        <path
          d="M52 45C52 45 58 22 74 22C86 22 90 33 87 46C84.5 56.5 72 64 53 68"
          fill={wingColor1}
          fillOpacity="0.88"
        />
        {/* Left Lower Wing - Delicate Leaf Drop */}
        <path
          d="M47 52C47 52 35 56 28 66C22 75 28 84 38 82C46 80 49 71 50 63"
          fill={wingColor2}
          fillOpacity="0.85"
        />
        {/* Right Lower Wing - Delicate Leaf Drop */}
        <path
          d="M53 52C53 52 65 56 72 66C78 75 72 84 62 82C54 80 51 71 50 63"
          fill={wingColor2}
          fillOpacity="0.85"
        />
        {/* Subtle Central Butterfly Body / Stem */}
        <path
          d="M50 32C49.2 32 48.5 45 48.5 58C48.5 66 50 72 50 72C50 72 51.5 66 51.5 58C51.5 45 50.8 32 50 32Z"
          fill={inverted ? '#FFFFFF' : '#5A4945'}
          fillOpacity="0.75"
        />
        {/* Delicate Antennae */}
        <path
          d="M48 33C46 25 40 20 37 21"
          stroke={inverted ? '#FFFFFF' : '#8A7771'}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M52 33C54 25 60 20 63 21"
          stroke={inverted ? '#FFFFFF' : '#8A7771'}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Text & Tagline */}
      <div className="flex flex-col text-left leading-tight">
        <span
          className={`font-serif tracking-[0.14em] uppercase font-medium ${textColor} ${
            isSmall ? 'text-base' : isLarge ? 'text-2xl' : 'text-lg md:text-xl'
          }`}
        >
          BUTTERFLY CARE
        </span>
        {showTagline && (
          <span
            className={`font-sans tracking-[0.22em] text-[10px] md:text-[11px] lowercase italic font-normal ${taglineColor}`}
          >
            for every mom
          </span>
        )}
      </div>
    </Link>
  );
};
