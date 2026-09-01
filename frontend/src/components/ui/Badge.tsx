import React from 'react';

export type BadgeType = 'new' | 'bestSeller' | 'sale' | 'lowStock' | 'outOfStock' | 'default';

interface BadgeProps {
  type?: BadgeType;
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type = 'default', children, className = '' }) => {
  const getStyles = () => {
    switch (type) {
      case 'new':
        return 'bg-butterfly-secondary text-butterfly-text border border-butterfly-accent/40';
      case 'bestSeller':
        return 'bg-butterfly-primary text-white';
      case 'sale':
        return 'bg-[#9D5447] text-white';
      case 'lowStock':
        return 'bg-[#C27D56] text-white';
      case 'outOfStock':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-butterfly-soft text-butterfly-text';
    }
  };

  const getDefaultText = () => {
    switch (type) {
      case 'new':
        return 'NEW';
      case 'bestSeller':
        return 'BEST SELLER';
      case 'sale':
        return 'SALE';
      case 'lowStock':
        return 'LOW STOCK';
      case 'outOfStock':
        return 'OUT OF STOCK';
      default:
        return '';
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm select-none ${getStyles()} ${className}`}
    >
      {children || getDefaultText()}
    </span>
  );
};
