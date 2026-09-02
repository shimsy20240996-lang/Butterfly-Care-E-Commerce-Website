'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

  const imgHeight = isSmall ? 36 : isLarge ? 56 : 46;
  const imgWidth = isSmall ? 52 : isLarge ? 80 : 66;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group select-none transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="Butterfly Care - Home"
    >
      <div className="relative shrink-0 flex items-center justify-center overflow-hidden rounded-xl">
        <Image
          src="/logo.jpeg"
          alt="Butterfly Care - for every mom"
          width={imgWidth}
          height={imgHeight}
          className="object-contain h-9 sm:h-11 w-auto mix-blend-multiply"
          priority
        />
      </div>

      <div className="flex flex-col text-left leading-tight">
        <span
          className={`font-serif tracking-[0.08em] font-bold text-[#454545] ${
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
