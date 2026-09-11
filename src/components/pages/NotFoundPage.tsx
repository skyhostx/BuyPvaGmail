import React, { useState } from 'react';
import { 
  Compass, 
  Home, 
  Search, 
  Layers, 
  ShieldAlert, 
  ArrowRight, 
  Headphones, 
  Send, 
  MessageSquare, 
  Sparkles, 
  HelpCircle,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { detailedServicesData } from '../../data/servicesData';
import { AppView } from '../../App';
import { handleLinkClick } from '../../utils/navigation';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateToPage: (page: AppView) => void;
  onNavigateToServiceDetail: (serviceId: string) => void;
  invalidPath?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onNavigateHome,
  onNavigateToPage,
  onNavigateToServiceDetail,
  invalidPath
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = searchQuery.trim()
    ? detailedServicesData.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : detailedServicesData.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigateToPage('services-catalog');
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-950 text-slate-100 flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        
        {/* Error Code Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-widest mb-6">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span>HTTP 404 — Page Not Found</span>
        </div>

        {/* Large 404 Graphic */}
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-red-400 mb-4 select-none drop-shadow-sm">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          The requested page could not be located
        </h2>

        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          {invalidPath ? (
            <span>The URL <code className="text-blue-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono text-xs">{invalidPath}</code> does not exist or has been relocated.</span>
          ) : (
            <span>The link you followed may be broken, expired, or mistyped. Use our search below or explore our verified Gmail services.</span>
          )}
        </p>

        {/* Interactive Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-lg mx-auto mb-10">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search USA PVA, 2008–2025 Aged, or Reviews..."
              className="w-full pl-11 pr-28 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Search</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </form>

        {/* Quick Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <a
            href="/"
            onClick={(e) => {
              handleLinkClick(e, onNavigateHome);
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-900/20 flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </a>

          <a
            href="/services"
            onClick={(e) => {
              handleLinkClick(e, () => onNavigateToPage('services-catalog'));
            }}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Browse All Services</span>
          </a>

          <a
            href="/pricing"
            onClick={(e) => {
              handleLinkClick(e, () => onNavigateToPage('pricing'));
            }}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Pricing &amp; Discounts</span>
          </a>

          <a
            href="/sitemap"
            onClick={(e) => {
              handleLinkClick(e, () => onNavigateToPage('sitemap'));
            }}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-purple-400" />
            <span>HTML Sitemap Index</span>
          </a>
        </div>

        {/* Suggested Verified Products */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 text-left mb-10 backdrop-blur-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Popular Verified Gmail Inventories
              </h3>
            </div>
            <a
              href="/services"
              onClick={(e) => {
                handleLinkClick(e, () => onNavigateToPage('services-catalog'));
              }}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View 6 Types</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <a
                key={service.id}
                href={`/services/${encodeURIComponent(service.id)}`}
                onClick={(e) => {
                  handleLinkClick(e, () => onNavigateToServiceDetail(service.id));
                }}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/50">
                      {service.age}
                    </span>
                    <span className="text-xs font-black text-emerald-400">
                      ${service.unitPrice.toFixed(2)}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors mb-1 line-clamp-1">
                    {service.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {service.shortDesc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                  <span>7-Day Warranty</span>
                  <span className="text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform">Explore &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 24/7 Live Support Recovery */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900/40 to-slate-950 border border-blue-900/30 text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Need immediate help finding an order or invoice?</h4>
              <p className="text-[11px] text-slate-400">Our live Telegram and WhatsApp support engineers are online 24/7.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://t.me/Go2Rapid"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Desk</span>
            </a>
            <a
              href="https://wa.me/12534080049"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
