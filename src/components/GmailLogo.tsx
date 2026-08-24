import React from 'react';

interface GmailLogoProps {
  className?: string;
  size?: number | string;
  withBadge?: boolean;
  badgeText?: string;
}

/**
 * High-definition Gmail brand logo vector with accurate Google palette
 * (#4285F4 Blue, #EA4335 Red, #FBBC05 Amber/Yellow, #34A853 Green)
 * and optional PVA Verified badge overlay.
 */
export const GmailLogo: React.FC<GmailLogoProps> = ({
  className = 'w-6 h-6',
  size,
  withBadge = false,
  badgeText = 'PVA'
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`} style={style}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
      >
        {/* White background card backing for contrast */}
        <rect x="4" y="8" width="40" height="32" rx="4" fill="#FFFFFF" fillOpacity="0.95" />

        {/* Left Google Blue Pillar */}
        <path
          d="M6 13.5V36C6 38.2091 7.79086 40 10 40H14V22L6 13.5Z"
          fill="#4285F4"
        />

        {/* Right Google Green Pillar */}
        <path
          d="M42 13.5V36C42 38.2091 40.2091 40 38 40H34V22L42 13.5Z"
          fill="#34A853"
        />

        {/* Center / Bottom Mail Tray (#EA4335 soft red) */}
        <path
          d="M14 22V40H34V22L24 29.5L14 22Z"
          fill="#EA4335"
          fillOpacity="0.92"
        />

        {/* Left Chevron Fold (#FBBC05 Amber) */}
        <path
          d="M6 13.5L14 22L24 14.5L18 9.5C16.2 8 14 8 12.2 9.5L6 13.5Z"
          fill="#FBBC05"
        />

        {/* Right Top Flap (#EA4335 Red) */}
        <path
          d="M42 13.5L34 22L24 14.5L30 9.5C31.8 8 34 8 35.8 9.5L42 13.5Z"
          fill="#EA4335"
        />

        {/* Top Central Arch Accent (#C5221F Dark Red) */}
        <path
          d="M18 9.5L24 14.5L30 9.5C28.2 8 25.8 7.5 24 7.5C22.2 7.5 19.8 8 18 9.5Z"
          fill="#C5221F"
        />
      </svg>

      {withBadge && (
        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[8px] font-black px-1 py-0.2 rounded-full border border-white shadow-xs leading-none">
          {badgeText}
        </span>
      )}
    </div>
  );
};

interface SiteIdentityLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  subtitle?: boolean;
  className?: string;
}

/**
 * Official Site Identity Logo combining the authentic Gmail vector mark
 * with crisp typography and verified trust signals.
 */
export const SiteIdentityLogo: React.FC<SiteIdentityLogoProps> = ({
  size = 'md',
  variant = 'light',
  subtitle = true,
  className = ''
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-7 h-7 p-1',
    md: 'w-10 h-10 p-1.5',
    lg: 'w-12 h-12 p-2'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1 py-0.5',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-xs px-2 py-0.5'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Gmail Icon Container with Glass Glow & Rounded Card */}
      <div 
        className={`relative rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${iconSizes[size]} ${
          isDark 
            ? 'bg-slate-800/90 border border-slate-700 shadow-md shadow-black/20 group-hover:border-blue-500/50' 
            : 'bg-white border border-slate-200/90 shadow-md shadow-slate-200/60 group-hover:border-blue-300 group-hover:shadow-blue-500/10'
        }`}
      >
        <GmailLogo className="w-full h-full" />
        
        {/* Verification Check Badge Pin */}
        <span 
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white shadow-xs"
          title="Verified PVA Identity"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span 
            className={`font-black tracking-tight font-sans ${textSizes[size]} ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            BuyPva<span className="text-red-600">Gmail</span>
          </span>
          <span className={`font-extrabold uppercase rounded-md tracking-wider ${badgeSizes[size]} ${
            isDark 
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
              : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            PVA
          </span>
        </div>

        {subtitle && (
          <span className={`text-[11px] font-medium leading-tight ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            100% Real SIM Verified Accounts
          </span>
        )}
      </div>
    </div>
  );
};
