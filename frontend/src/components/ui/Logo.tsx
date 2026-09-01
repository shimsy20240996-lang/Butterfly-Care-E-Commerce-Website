'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Dimensions based on size preset
  const sizeClasses = {
    sm: 'h-9 w-auto',
    md: 'h-12 sm:h-14 w-auto',
    lg: 'h-16 sm:h-20 w-auto',
    xl: 'h-24 w-auto'
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center group select-none transition-transform duration-300 hover:scale-105 ${className}`}
      aria-label="Butterfly Care - Home"
    >
      <div className="relative flex items-center justify-center">
        <Image
          src="/logo.jpeg"
          alt="Butterfly Care - for every mom"
          width={180}
          height={120}
          priority
          className={`${sizeClasses[size]} object-contain mix-blend-multiply drop-shadow-xs transition-opacity`}
        />
      </div>
    </Link>
  );
};
