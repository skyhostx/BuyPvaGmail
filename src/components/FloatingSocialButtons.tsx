import React from 'react';

export const FloatingSocialButtons: React.FC = () => {
  return (
    <aside aria-label="Quick contact channels" className="fixed bottom-6 right-6 z-50 flex flex-col gap-3.5 items-center select-none">
      {/* Telegram Floating Button */}
      <a
        id="floating-telegram-btn"
        href="https://t.me/BuyPvaGmail"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with 24/7 Support on Telegram"
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0288d1] via-[#24A1DE] to-[#29b6f6] text-white flex items-center justify-center shadow-xl shadow-sky-500/35 border-2 border-white transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
      >
        {/* Glowing Ambient Background Ring */}
        <span className="absolute inset-0 rounded-full bg-sky-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />

        {/* Telegram Paper Plane Icon */}
        <div className="relative w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white flex items-center justify-center shadow-xs">
          <svg 
            viewBox="0 0 24 24" 
            className="w-4.5 h-4.5 text-[#24A1DE] fill-current translate-x-[-1px] translate-y-[0.5px]"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
          </svg>
        </div>

        {/* Top-Right Online Pulse Badge */}
        <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-cyan-400 shadow-xs" />
        </span>

        {/* Hover Tooltip (Left Side) */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-xl border border-slate-700 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Telegram: @BuyPvaGmail</span>
        </span>
      </a>

      {/* WhatsApp Floating Button */}
      <a
        id="floating-whatsapp-btn"
        href="https://wa.me/12534080049"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with 24/7 Support on WhatsApp"
        className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#16a34a] via-[#22c55e] to-[#4ade80] text-white flex items-center justify-center shadow-xl shadow-emerald-500/35 border-2 border-white transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
      >
        {/* Glowing Ambient Background Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity" />

        {/* WhatsApp Phone Bubble Icon */}
        <div className="relative w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white flex items-center justify-center shadow-xs">
          <svg 
            viewBox="0 0 24 24" 
            className="w-4.5 h-4.5 text-[#22c55e] fill-current"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.29-.44.04-1.02.16-3.32-.78-2.78-1.15-4.56-3.98-4.7-4.16-.14-.19-1.13-1.51-1.13-2.88 0-1.37.72-2.04.97-2.32.26-.28.56-.35.75-.35.19 0 .37 0 .53.01.17.01.4.06.61.57.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.19-.15.31-.3.48-.15.17-.31.38-.45.51-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.17 1.38 2.48 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.7-.15.28.1.1.78 1.78 2.09.21.16.35.25.4.34.05.09.05.53-.19 1.21z" />
          </svg>
        </div>

        {/* Top-Right Online Pulse Badge */}
        <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400 shadow-xs" />
        </span>

        {/* Hover Tooltip (Left Side) */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-xl border border-slate-700 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 hidden sm:flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>WhatsApp: +1 (253) 408-0049</span>
        </span>
      </a>
    </aside>
  );
};
