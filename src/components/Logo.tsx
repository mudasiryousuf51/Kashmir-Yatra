import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'footer';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl font-extrabold'
  };

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textColor = variant === 'footer' ? 'text-white' : variant === 'light' ? 'text-white' : 'text-emerald-950';
  const taglineColor = variant === 'footer' ? 'text-emerald-200' : variant === 'light' ? 'text-emerald-100' : 'text-emerald-800';

  return (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer select-none ${className}`} id="kashmiryatra-logo">
      {/* Unique handcrafted Kashmir Logo Icon: Chinar Leaf + Mountain Peaks Emblem */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 p-2 text-amber-400 shadow-md ring-1 ring-amber-400/30 transition-transform duration-300 group-hover:scale-105 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow"
        >
          {/* Snowy Mountain Peaks */}
          <path
            d="M5 28L13 15L18 22L24 12L31 28H5Z"
            fill="url(#mountainGrad)"
            opacity="0.9"
          />
          <path
            d="M13 15L15.5 19L18 22L24 12L27.5 18L31 28H5L13 15Z"
            stroke="#FDE68A"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          {/* Chinar Leaf Silhouette Overlay */}
          <path
            d="M18 4C18 4 19.5 8 21 9C23 10 26 8.5 27 10C27.8 11.2 25.5 13.5 26.5 15C27.5 16.5 30 17 29.5 18.5C29 20 26 20 25 21.5C24 23 24 26 22.5 26C21.5 26 20 24 18 24.5C16 24 14.5 26 13.5 26C12 26 12 23 11 21.5C10 20 7 20 6.5 18.5C6 17 8.5 16.5 9.5 15C10.5 13.5 8.2 11.2 9 10C10 8.5 13 10 15 9C16.5 8 18 4 18 4Z"
            fill="url(#chinarGrad)"
            opacity="0.85"
          />
          {/* Vein / Stem stroke */}
          <path
            d="M18 27V10"
            stroke="#D4AF37"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="mountainGrad" x1="18" y1="12" x2="18" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF3C7" />
              <stop offset="1" stopColor="#D97706" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="chinarGrad" x1="18" y1="4" x2="18" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="0.5" stopColor="#D97706" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <span className={`font-serif tracking-tight font-bold ${sizeClasses[size]} ${textColor}`}>
          Kashmir<span className="text-amber-600 font-extrabold">Yatra</span>
        </span>
        <span className={`text-[10px] sm:text-xs font-medium tracking-wider uppercase ${taglineColor}`}>
          Discover Kashmir, Your Way
        </span>
      </div>
    </div>
  );
};
