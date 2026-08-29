import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Coins, 
  CreditCard, 
  ArrowUp, 
  Send, 
  CheckCircle2,
  Mail,
  Headphones,
  MessageSquare,
  Zap,
  RefreshCw,
  Server,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { SiteIdentityLogo } from './GmailLogo';

interface FooterProps {
  onOpenOrderModal: (productId?: string) => void;
  onOpenCheckerModal: () => void;
  onOpenTrackingModal: () => void;
  onNavigateToPage?: (page: string, serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenOrderModal, 
  onOpenCheckerModal, 
  onOpenTrackingModal,
  onNavigateToPage 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (serviceId: string) => {
    if (onNavigateToPage) {
      onNavigateToPage('service-detail', serviceId);
    } else {
      onOpenOrderModal(serviceId);
    }
  };

  const cryptoNetworks = [
    { name: 'USDT (TRC20)', tag: 'TRX', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { name: 'USDT (BEP20)', tag: 'BSC', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
    { name: 'Bitcoin', tag: 'BTC', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { name: 'Ethereum', tag: 'ETH', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    { name: 'Solana', tag: 'SOL', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { name: 'Litecoin', tag: 'LTC', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 relative overflow-hidden">
      {/* Background ambient glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Trust Pillars Ribbon */}
      <div className="border-b border-slate-850 bg-slate-900/60 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-white text-xs font-bold">100% Real Carrier SIM</h5>
                <p className="text-[11px] text-slate-400">Strictly non-VoIP phone verified</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-white text-xs font-bold">Instant 60s Dispatch</h5>
                <p className="text-[11px] text-slate-400">Automated crypto checkout &amp; file download</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-white text-xs font-bold">7-Day Free Warranty</h5>
                <p className="text-[11px] text-slate-400">Instant 1-click replacement policy</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-white text-xs font-bold">24/7 Agency Support</h5>
                <p className="text-[11px] text-slate-400">Direct VIP desk via Telegram &amp; WhatsApp</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-slate-850">
          
          {/* Brand Info (2 Columns on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToPage) onNavigateToPage('home');
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block"
            >
              <SiteIdentityLogo size="lg" variant="dark" subtitle={true} />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              BuyPvaGmail is the leading platform for 100% real carrier phone-verified (PVA) and aged USA Gmail accounts. 
              Built on clean static residential IPs, delivering maximum inbox deliverability for cold outreach, Google Ads, and local SEO.
            </p>

            {/* Quick Contact & Status Badges */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              <a
                href="https://t.me/Go2Rapid"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-blue-600 hover:text-white text-slate-300 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-800 transition-all flex items-center gap-2 shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-blue-400" />
                <span>Telegram: @Go2Rapid</span>
              </a>
              <a
                href="https://wa.me/12534080049"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-emerald-600 hover:text-white text-emerald-400 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-800 transition-all flex items-center gap-2 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +1 (253) 408-0049</span>
              </a>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-blue-500 rounded-xs" />
              Verified Services
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="/services/usa-gmail-accounts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('usa-gmail-accounts');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">USA Gmail Accounts</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">$6/2pcs</span>
                </a>
              </li>
              <li>
                <a 
                  href="/services/pva-gmail-accounts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('pva-gmail-accounts');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">PVA Phone Verified</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">$6/2pcs</span>
                </a>
              </li>
              <li>
                <a 
                  href="/services/aged-mix-country-gmail"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('aged-mix-country-gmail');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Aged Mix Country</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">$5/2pcs</span>
                </a>
              </li>
              <li>
                <a 
                  href="/services/aged-gmail-for-reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('aged-gmail-for-reviews');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Local Guide Reviews</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">$6/2pcs</span>
                </a>
              </li>
              <li>
                <a 
                  href="/services/aged-gmail-for-google-ads"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('aged-gmail-for-google-ads');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Google Ads Aged</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">$5/1pc</span>
                </a>
              </li>
              <li>
                <a 
                  href="/services/new-gmail-accounts"
                  onClick={(e) => {
                    e.preventDefault();
                    handleServiceClick('new-gmail-accounts');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left flex items-center justify-between group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">Fresh Bulk PVA</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">$3/2pcs</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Agency Guides */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-red-500 rounded-xs" />
              Agency Protocols
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a 
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('blog');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Aged Gmail Warmup Plan
                </a>
              </li>
              <li>
                <a 
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('blog');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  AdsPower &amp; Dolphin Anti-Detect
                </a>
              </li>
              <li>
                <a 
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('blog');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Google Ads Suspension Bypass
                </a>
              </li>
              <li>
                <a 
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('blog');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Google Maps Review Stick Protocol
                </a>
              </li>
              <li>
                <a 
                  href="/faq"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('faq');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  2FA TOTP Secret Key Guide
                </a>
              </li>
              <li>
                <a 
                  href="/instant-indexing"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('instant-indexing');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  Instant Indexing Protocol
                </a>
              </li>
              <li>
                <a 
                  href="/warranty"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateToPage) onNavigateToPage('warranty');
                  }} 
                  className="hover:text-white transition-colors cursor-pointer text-left block"
                >
                  7-Day Replacement Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Crypto Gateways & Trust */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-1.5 h-3 bg-emerald-500 rounded-xs" />
              Crypto Gateways
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              Automated 24/7 instant delivery upon 1 blockchain confirmation:
            </p>
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {cryptoNetworks.map((net) => (
                <div 
                  key={net.tag} 
                  className={`px-2 py-1.5 rounded-lg border text-[10px] font-bold flex items-center justify-between ${net.color}`}
                >
                  <span>{net.tag}</span>
                  <span className="text-[9px] opacity-75 font-mono">0% Fee</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-850 flex items-center gap-2 text-[11px] text-slate-400">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-bit SSL Encrypted Dispatch</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-[11px] text-center sm:text-left">
            &copy; {new Date().getFullYear()} BuyPvaGmail.com. All rights reserved. Follows industry standard PVA delivery protocols.
          </p>

          <div className="flex items-center gap-3 text-[11px] flex-wrap justify-center">
            <a 
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToPage) onNavigateToPage('privacy');
              }} 
              className="hover:text-white transition-colors cursor-pointer font-medium"
            >
              Privacy Policy
            </a>
            <span className="text-slate-700">•</span>
            <a 
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToPage) onNavigateToPage('terms');
              }} 
              className="hover:text-white transition-colors cursor-pointer font-medium"
            >
              Terms of Service
            </a>
            <span className="text-slate-700">•</span>
            <a 
              href="/warranty"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToPage) onNavigateToPage('warranty');
              }} 
              className="hover:text-white transition-colors cursor-pointer font-medium"
            >
              Warranty Guidelines
            </a>
            <button
              onClick={scrollToTop}
              className="ml-2 p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 transition-colors cursor-pointer flex items-center gap-1"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
