import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  const sizeClasses = {
    sm: 'h-10 w-auto',
    md: 'h-14 sm:h-16 w-auto',
    lg: 'h-20 sm:h-24 w-auto',
  };

  return (
    <Link href="/" className={`inline-flex items-center group select-none ${className}`}>
      <div
        className={`relative transition-transform duration-300 group-hover:scale-105 ${
          inverted ? 'bg-white/90 p-1.5 rounded-2xl' : ''
        }`}
      >
        <Image
          src="/logo.png"
          alt="Butterfly Care - for every mom"
          width={size === 'sm' ? 120 : size === 'lg' ? 220 : 160}
          height={size === 'sm' ? 44 : size === 'lg' ? 84 : 58}
          priority
          className={`${sizeClasses[size]} object-contain mix-blend-multiply`}
        />
      </div>
    </Link>
  );
};
