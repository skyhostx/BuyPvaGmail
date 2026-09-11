import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GmailLogo } from './GmailLogo';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';

interface PageLoaderProps {
  isLoading: boolean;
  onFinish?: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ isLoading, onFinish }) => {
  const [progress, setProgress] = useState(15);
  const [statusText, setStatusText] = useState('Initializing Secure PVA Cluster...');

  useEffect(() => {
    if (!isLoading) return;

    const timer1 = setTimeout(() => {
      setProgress(45);
      setStatusText('Synchronizing 100% Real Carrier SIM Nodes...');
    }, 150);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStatusText('Connecting 256-Bit SSL Encrypted Gateway...');
    }, 400);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Ready • Automated Dispatch Active');
    }, 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="page-reload-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white select-none overflow-hidden"
          onAnimationComplete={() => {
            if (!isLoading && onFinish) onFinish();
          }}
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-blue-600/15 via-red-500/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Logo Center Container with Ambient Orbit & Rings */}
            <div className="relative mb-6">
              {/* Spinning Glow Ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500 via-red-500 to-amber-500 opacity-30 blur-md animate-spin" style={{ animationDuration: '4s' }} />
              
              {/* Outer Glass Card */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-blue-500/20 flex items-center justify-center"
              >
                <GmailLogo className="w-full h-full drop-shadow-md" />

                {/* Verified PVA Tag */}
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-white shadow-md shadow-emerald-500/40">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </motion.div>
            </div>

            {/* Brand Title */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center gap-2 mb-2"
            >
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
                BuyPva<span className="text-red-500">Gmail</span>
              </div>
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[10px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                PVA
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5 mb-6"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Real Carrier SIM Verified Accounts
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-64 bg-slate-900/90 border border-slate-800 rounded-full h-1.5 overflow-hidden p-0.5 mb-3 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-red-500 to-amber-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Live Loading Status Text */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
              <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span>{statusText}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
