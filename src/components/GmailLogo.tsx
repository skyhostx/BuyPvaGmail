import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';

interface GmailLogoProps {
  className?: string;
  size?: number | string;
  withBadge?: boolean;
  badgeText?: string;
}

/**
 * Pixel-perfect Google Gmail Vector Logo with accurate geometry and official colors:
 * #4285F4 (Google Blue), #EA4335 (Google Red), #FBBC05 (Google Yellow), #34A853 (Google Green), #C5221F (Dark Red Arch)
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
        className="w-full h-full drop-shadow-xs select-none"
      >
        {/* Crisp envelope shadow layer */}
        <filter id="gmail-drop-shadow" x="0" y="4" width="48" height="42" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.12" />
        </filter>

        <g filter="url(#gmail-drop-shadow)">
          {/* Base white envelope backing */}
          <rect x="5" y="9" width="38" height="30" rx="3.5" fill="#FFFFFF" />

          {/* Left Vertical Pillar (Google Blue) */}
          <path
            d="M6 13V35.5C6 37.433 7.567 39 9.5 39H14V22L6 13Z"
            fill="#4285F4"
          />

          {/* Right Vertical Pillar (Google Green) */}
          <path
            d="M42 13V35.5C42 37.433 40.433 39 38.5 39H34V22L42 13Z"
            fill="#34A853"
          />

          {/* Center Bottom Mail Tray (Google Red Soft) */}
          <path
            d="M14 22V39H34V22L24 29.5L14 22Z"
            fill="#EA4335"
            fillOpacity="0.94"
          />

          {/* Left Top Fold (Google Yellow / Amber) */}
          <path
            d="M6 13L14 22L24 14.5L18.5 10C16.8 8.7 14.2 8.7 12.5 10L6 13Z"
            fill="#FBBC05"
          />

          {/* Right Top Fold (Google Red) */}
          <path
            d="M42 13L34 22L24 14.5L29.5 10C31.2 8.7 33.8 8.7 35.5 10L42 13Z"
            fill="#EA4335"
          />

          {/* Top Center Arch (Deep Dark Red Shadow) */}
          <path
            d="M18.5 10L24 14.5L29.5 10C27.8 8.6 25.9 8.2 24 8.2C22.1 8.2 20.2 8.6 18.5 10Z"
            fill="#C5221F"
          />
        </g>
      </svg>

      {withBadge && (
        <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-xs leading-none flex items-center gap-0.5">
          <Check className="w-2 h-2 stroke-[3]" />
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
 * High-end Site Identity Logo component combining the authentic Gmail vector mark,
 * glowing squircle glass enclosure, high-contrast typography, and live verification tag.
 */
export const SiteIdentityLogo: React.FC<SiteIdentityLogoProps> = ({
  size = 'md',
  variant = 'light',
  subtitle = true,
  className = ''
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8 p-1.5 rounded-xl',
    md: 'w-11 h-11 p-2 rounded-2xl',
    lg: 'w-14 h-14 p-2.5 rounded-2xl'
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl'
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1.5 py-0.5',
    md: 'text-[10px] px-2 py-0.5',
    lg: 'text-xs px-2.5 py-1'
  };

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Gmail Icon Container with Glass Sheen & Verification Pin */}
      <div 
        className={`relative flex items-center justify-center shrink-0 transition-all duration-300 transform group-hover:scale-105 ${iconSizes[size]} ${
          isDark 
            ? 'bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 shadow-lg shadow-black/40 group-hover:border-blue-500/50 group-hover:shadow-blue-500/20' 
            : 'bg-white border border-slate-200/90 shadow-md shadow-slate-200/80 group-hover:border-blue-300 group-hover:shadow-blue-500/15'
        }`}
      >
        <GmailLogo className="w-full h-full" />
        
        {/* Verified PVA Micro Pin in Corner */}
        <span 
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs"
          title="100% Real SIM PVA Verified"
        >
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </span>
      </div>

      {/* Brand Typography & Tag */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span 
            className={`font-black tracking-tight font-sans leading-none ${textSizes[size]} ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            BuyPva<span className="text-red-600">Gmail</span>
          </span>
          <span className={`font-black uppercase tracking-wider rounded-md inline-flex items-center gap-1 ${badgeSizes[size]} ${
            isDark 
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-xs' 
              : 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            PVA
          </span>
        </div>

        {subtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <ShieldCheck className={`w-3 h-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`text-[11px] font-semibold tracking-wide ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              100% Real Carrier SIM &amp; Aged Accounts
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
