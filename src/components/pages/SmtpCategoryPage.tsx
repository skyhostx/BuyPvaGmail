import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  Server, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ChevronRight, 
  ShoppingCart, 
  HelpCircle, 
  Lock, 
  Clock, 
  Globe, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  Award,
  ExternalLink,
  MessageSquare,
  Flame,
  Check,
  Cpu,
  RefreshCw,
  PhoneCall,
  Terminal,
  BarChart3
} from 'lucide-react';
import { detailedServicesData, DetailedServiceInfo } from '../../data/servicesData';
import { ServiceProduct } from '../../types';
import { handleLinkClick } from '../../utils/navigation';

interface SmtpCategoryPageProps {
  onSelectServicePage: (serviceId: string) => void;
  onQuickBuy: (product: ServiceProduct, quantity: number) => void;
  onAddToCart: (product: ServiceProduct, quantity: number, packageId?: string, packageName?: string) => void;
  onNavigateHome?: () => void;
  onNavigateToPricing?: () => void;
  onNavigateToContact?: () => void;
}

export const SmtpCategoryPage: React.FC<SmtpCategoryPageProps> = ({
  onSelectServicePage,
  onQuickBuy,
  onAddToCart,
  onNavigateHome,
  onNavigateToPricing,
  onNavigateToContact
}) => {
  // Get all SMTP services from data
  const smtpServices = detailedServicesData.filter(s => s.category === 'smtp' || s.id.startsWith('smtp-'));

  // Active filter tab: 'all' or specific service ID
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Selected package per product card (default to 50k or popular package)
  const [selectedPackages, setSelectedPackages] = useState<Record<string, string>>({
    'smtp-mailgun-accounts': 'mailgun-100k',
    'smtp-brevo-accounts': 'brevo-100k',
    'smtp-relay-services-account': 'relay-100k'
  });

  // Open FAQ items accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Update document title and meta description for SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Buy SMTP Accounts (Mailgun, Brevo, Dedicated Relay) | 50k-200k/mo - BuyPvaGmail';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Buy verified high-deliverability SMTP accounts (Mailgun, Brevo & Dedicated SMTP Relays). 50k to 200k monthly sending limits, pre-warmed clean IPs, SPF/DKIM/DMARC configured.'
      );
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, []);

  const handlePackageSelect = (productId: string, packageId: string) => {
    setSelectedPackages(prev => ({
      ...prev,
      [productId]: packageId
    }));
  };

  const filteredServices = activeTab === 'all' 
    ? smtpServices 
    : smtpServices.filter(s => s.id === activeTab);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'smtp-mailgun-accounts':
        return Send;
      case 'smtp-brevo-accounts':
        return Mail;
      case 'smtp-relay-services-account':
        return Server;
      default:
        return Zap;
    }
  };

  const getBadgeStyling = (badge?: string) => {
    if (!badge) return 'bg-slate-100 text-slate-700';
    if (badge.includes('Popular') || badge.includes('Seller') || badge.includes('🔥')) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    if (badge.includes('Scale') || badge.includes('Value') || badge.includes('⚡')) {
      return 'bg-rose-100 text-rose-800 border-rose-200';
    }
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const comparisonRows = [
    {
      feature: 'Monthly Email Capacity',
      mailgun: '50,000 / 100,000 / 200,000',
      brevo: '50,000 / 100,000 / 200,000',
      relay: '50,000 / 100,000 / 200,000'
    },
    {
      feature: 'Best Use Case',
      mailgun: 'Cold outreach sequences (Smartlead, Instantly)',
      brevo: 'Multi-inbox outreach & newsletters',
      relay: 'Unlimited domains, custom MTAs & enterprise outbound'
    },
    {
      feature: 'Sending IP Infrastructure',
      mailgun: 'Pre-Warmed High-Reputation IP Pool',
      brevo: 'Tier 1 Clean European & US IP Pool',
      relay: 'Dedicated Static Clean Sending IP with PTR/rDNS'
    },
    {
      feature: 'DNS Authentication Records',
      mailgun: 'SPF, DKIM, DMARC & Custom Return-Path',
      brevo: 'SPF, DKIM & DMARC Configured',
      relay: 'Full SPF, DKIM, DMARC, PTR / Reverse DNS'
    },
    {
      feature: 'Supported Outbound Ports',
      mailgun: 'Port 587 (TLS), 465 (SSL), 2525',
      brevo: 'Port 587 (TLS), 465 (SSL), 2525',
      relay: 'Port 25, 465 (SSL), 587 (TLS), 2525'
    },
    {
      feature: 'Average Inbox Placement Rate',
      mailgun: '99.4% Primary Inbox Rate',
      brevo: '99.2% Deliverability',
      relay: '99.8% Enterprise Inboxing'
    },
    {
      feature: 'Cold Outreach Compatibility',
      mailgun: 'Instantly, Smartlead, Lemlist, Woodpecker',
      brevo: 'Smartlead, Instantly, Mailwizz, CRMs',
      relay: 'Universal (Any client, MTA or outreach engine)'
    },
    {
      feature: 'Credential Delivery Format',
      mailgun: 'Host : Port : User : Pass : API Key : Domain',
      brevo: 'Host : Port : Master Key : API Key : Domain',
      relay: 'Host : Port : User : Pass : Dedicated IP : PTR'
    },
    {
      feature: 'Starting Plan Price',
      mailgun: '$150 / 50k emails ($0.003/ea)',
      brevo: '$150 / 50k emails ($0.003/ea)',
      relay: '$190 / 50k emails with Dedicated IP'
    },
    {
      feature: 'Warranty & Replacement',
      mailgun: '7-Day 100% Free Replacement',
      brevo: '7-Day 100% Free Replacement',
      relay: '7-Day Dedicated Server Health Warranty'
    }
  ];

  const smtpFaqs = [
    {
      q: 'Why should I use dedicated SMTP accounts instead of standard Gmail accounts for cold outreach?',
      a: 'Standard Gmail inboxes are capped by Google at 500-2,000 emails per day and are strictly monitored by AI filters for sending velocity. If you send high volumes from standard inboxes, you risk sudden disconnects, phone verification flags, and spam jail. Enterprise SMTP accounts (Mailgun, Brevo, and Dedicated Relays) are engineered from the ground up for high throughput (50,000 to 200,000+ emails/month) with automated bounce management, pre-warmed reputation, and custom return-path alignment.'
    },
    {
      q: 'Are these SMTP accounts pre-warmed and ready to send immediately?',
      a: 'Yes. All our Mailgun, Brevo, and Dedicated Relay accounts are provisioned with pre-warmed sending IPs and established domain telemetry. You can immediately import the credentials into Instantly.ai, Smartlead.ai, or your outreach CRM and begin sending campaigns on day one without waiting weeks for initial reputation buildup.'
    },
    {
      q: 'Do you provide full DNS records (SPF, DKIM, DMARC) with my order?',
      a: 'Yes, absolutely. Every order includes a complete technical manifest detailing the exact TXT, CNAME, and MX records to configure in your domain registrar (Cloudflare, Namecheap, GoDaddy, etc.). This ensures 100% cryptographic alignment and guarantees SPF, DKIM, and DMARC pass tests on major mail providers like Google Workspace and Outlook 365.'
    },
    {
      q: 'Can I connect multiple sending domains to a single SMTP account?',
      a: 'Yes. Our Dedicated SMTP Relay accounts natively support unlimited sending domains from a single dedicated IP address. Mailgun and Brevo accounts also support custom domain additions, allowing you to scale multiple outreach domains and client accounts simultaneously.'
    },
    {
      q: 'How fast will I receive my SMTP credentials after payment?',
      a: 'Delivery is instant (typically under 60 seconds). Once your cryptocurrency, Skrill, or bank payment is confirmed, the secure credentials manifest (Host, Port, Username, Password, API Keys, and DNS guide) is made available immediately for on-screen view and encrypted TXT/CSV download.'
    },
    {
      q: 'What is your 7-day replacement warranty for SMTP services?',
      a: 'If your SMTP account experiences any premature technical fault, authentication mismatch, or delivery block within 7 days of purchase, our 24/7 technical desk will either resolve the configuration or issue a fresh replacement account within 1 hour. We stand 100% behind our sending infrastructure.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900 selection:bg-rose-500 selection:text-white">
      
      {/* Breadcrumb Navigation Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8 sticky top-16 z-30 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-semibold overflow-x-auto whitespace-nowrap py-0.5">
            <a 
              href="/" 
              onClick={(e) => {
                handleLinkClick(e, () => {
                  if (onNavigateHome) onNavigateHome();
                });
              }}
              className="hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Home</span>
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400">Categories</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
              SMTP Sending Accounts
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Pre-Warmed IPs in Stock (109 Available)
            </span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-inner">
            <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>Enterprise High-Deliverability Sending Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Buy High-Volume <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-red-400 to-amber-400">SMTP Accounts</span> &amp; Dedicated Relays
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            Pre-warmed, fully authenticated SMTP servers engineered for scale. Available in 
            <strong className="text-white font-bold"> 50,000</strong>, 
            <strong className="text-white font-bold"> 100,000</strong>, and 
            <strong className="text-white font-bold"> 200,000 monthly sending limits</strong> with 
            dedicated IPs, authentic SPF/DKIM/DMARC records, and instant Smartlead &amp; Instantly integration.
          </p>

          {/* Value Badges Pill Grid */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Zero Warmup Delay</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>SPF, DKIM, DMARC &amp; PTR</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Instant 60s Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 shadow-xs">
              <Terminal className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>Smartlead &amp; Instantly Ready</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-200 shadow-xs">
              <RefreshCw className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>7-Day Replacement Policy</span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-2xl font-black text-rose-400">99.4%</div>
              <div className="text-xs text-slate-400 font-medium">Avg Inbox Deliverability</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-2xl font-black text-amber-400">&lt;60s</div>
              <div className="text-xs text-slate-400 font-medium">Instant File &amp; API Dispatch</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-2xl font-black text-emerald-400">200k/mo</div>
              <div className="text-xs text-slate-400 font-medium">Max Monthly Volume/Account</div>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-2xl">
              <div className="text-2xl font-black text-blue-400">4.96/5</div>
              <div className="text-xs text-slate-400 font-medium">Rating (1,024+ Users)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              All SMTP Solutions ({smtpServices.length})
            </button>
            <button
              onClick={() => setActiveTab('smtp-mailgun-accounts')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'smtp-mailgun-accounts'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Mailgun SMTP</span>
            </button>
            <button
              onClick={() => setActiveTab('smtp-brevo-accounts')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'smtp-brevo-accounts'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Brevo SMTP</span>
            </button>
            <button
              onClick={() => setActiveTab('smtp-relay-services-account')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'smtp-relay-services-account'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Dedicated SMTP Relay</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900 font-bold">{filteredServices.length}</strong> enterprise SMTP packages
          </div>
        </div>

        {/* Product Cards Grid with Interactive Package Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          {filteredServices.map((service) => {
            const IconComp = getServiceIcon(service.id);
            const activePackageId = selectedPackages[service.id] || (service.packages?.[0]?.id || '');
            const activePkg = service.packages?.find(p => p.id === activePackageId) || service.packages?.[0];
            const currentPrice = activePkg ? activePkg.price : service.basePrice;
            const currentQty = activePkg ? activePkg.quantity : 50;

            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-slate-300 shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col h-full relative"
              >
                {/* Header Banner */}
                <div className="p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shadow-xs shrink-0">
                      <IconComp className="w-6 h-6 stroke-[2.2]" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {service.popular && (
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                          🔥 Best Seller
                        </span>
                      )}
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        In Stock ({service.inStock} Available)
                      </span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => onSelectServicePage(service.id)}
                    className="text-lg font-black text-slate-900 hover:text-rose-600 transition-colors cursor-pointer leading-tight mb-1.5"
                  >
                    {service.name}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {service.shortDescription || service.shortDesc}
                  </p>

                  <div className="mt-3 flex items-center gap-3 text-xs">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-slate-900 ml-1">{service.rating}</span>
                      <span className="text-slate-400 text-[11px] ml-0.5">({service.reviewsCount} reviews)</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 text-[11px] font-semibold">
                      {service.country || 'USA & Global'}
                    </span>
                  </div>
                </div>

                {/* Package Tier Switcher inside Card */}
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center justify-between">
                    <span>SELECT SENDING VOLUME TIER</span>
                    <span className="text-rose-600 font-bold">Monthly Plan</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {service.packages?.map((pkg) => {
                      const isSelected = activePackageId === pkg.id;
                      return (
                        <button
                          key={pkg.id}
                          type="button"
                          onClick={() => handlePackageSelect(service.id, pkg.id)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[76px] ${
                            isSelected
                              ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/20'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`text-xs font-black leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {pkg.quantity}k
                          </span>
                          <span className={`text-xs font-extrabold my-0.5 ${isSelected ? 'text-white' : 'text-rose-600'}`}>
                            ${pkg.price}
                          </span>
                          <span className={`text-[9px] font-bold px-1 rounded truncate max-w-full ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {pkg.badge || 'Active'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Pricing Overview Highlight */}
                  {activePkg && (
                    <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-bold text-slate-500">Total for {activePkg.name}</div>
                        <div className="text-xs text-slate-400 font-medium">Ready for instant dispatch</div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-slate-900">${currentPrice}</span>
                        <span className="text-xs text-slate-500 font-semibold block">USD</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="p-6 flex-1 space-y-4">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    INCLUDED SPECIFICATIONS &amp; PROTOCOLS
                  </div>

                  <ul className="space-y-2.5">
                    {service.features.slice(0, 5).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Compatibility Badges */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      OUTREACH TOOL COMPATIBILITY
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.bestTools?.slice(0, 4).map((tool, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="p-6 pt-0 space-y-2">
                  <button
                    onClick={() => onQuickBuy(service, currentQty)}
                    className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-all shadow-md shadow-rose-600/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-amber-300 fill-current" />
                    <span>Order {activePkg ? activePkg.name : 'Now'} - ${currentPrice}</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(service, currentQty, activePkg?.id, activePkg?.name)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-600" />
                    <span>Add {activePkg ? activePkg.name : 'Plan'} to Cart</span>
                  </button>

                  <button
                    onClick={() => onSelectServicePage(service.id)}
                    className="w-full py-2 text-center text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Full Technical Documentation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 mb-16 overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 text-rose-600 bg-rose-50 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>TECHNICAL BENCHMARKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Compare SMTP Providers Side-by-Side
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Choose the exact architecture suited for your sending volume, domain setup, and outreach software.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50/80">
                  <th className="py-3.5 px-4 font-black text-slate-900 uppercase tracking-wider text-[11px] w-1/4">
                    Specification
                  </th>
                  <th className="py-3.5 px-4 font-black text-rose-600 uppercase tracking-wider text-[11px] w-1/4">
                    Mailgun SMTP
                  </th>
                  <th className="py-3.5 px-4 font-black text-blue-600 uppercase tracking-wider text-[11px] w-1/4">
                    Brevo SMTP
                  </th>
                  <th className="py-3.5 px-4 font-black text-indigo-600 uppercase tracking-wider text-[11px] w-1/4">
                    Dedicated SMTP Relay
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonRows.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 bg-slate-50/30">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {row.mailgun}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {row.brevo}
                    </td>
                    <td className="py-3.5 px-4 text-slate-900 font-bold bg-indigo-50/20">
                      {row.relay}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Educational Section: SMTP vs Personal PVA Gmails */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 mb-16 border border-slate-800 relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                Agency Architecture Strategy
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                When to Use SMTP Accounts vs. Aged PVA Gmail Inboxes
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Top growth agencies deploy a hybrid model: PVA Gmail inboxes for high-touch hyper-personalized executive outreach, and Enterprise SMTP infrastructure for scalable outbound sequencing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Aged PVA Gmail */}
              <div className="bg-slate-800/70 border border-slate-700 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-blue-400 font-black text-sm">
                  <Mail className="w-4 h-4" />
                  <span>Aged PVA Gmail Inboxes</span>
                </div>
                <div className="text-xs font-bold text-slate-300">
                  Ideal for: 30–50 Emails/Day per Inbox
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Best for sending high-tier 1-on-1 personalized emails to corporate executives, warming up secondary domains, and managing Google Ads or Local Guide reviews.
                </p>
                <div className="pt-2 text-xs text-blue-300 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-blue-400" />
                  <span>Highest algorithmic trust on Google Workspace</span>
                </div>
              </div>

              {/* Box 2: Enterprise SMTP */}
              <div className="bg-slate-800/70 border border-rose-500/30 p-6 rounded-2xl space-y-3 relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-rose-500/20 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-500/40">
                    High Volume Scale
                  </span>
                </div>
                <div className="flex items-center gap-2 text-rose-400 font-black text-sm">
                  <Server className="w-4 h-4" />
                  <span>Enterprise SMTP Sending Accounts</span>
                </div>
                <div className="text-xs font-bold text-slate-300">
                  Ideal for: 2,000–10,000+ Emails/Day
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Best for high-volume outbound campaigns, automated newsletters, e-commerce triggers, and multi-domain agency scaling with dedicated bounce processing and IP telemetry.
                </p>
                <div className="pt-2 text-xs text-rose-300 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-rose-400" />
                  <span>Zero daily account throttling &amp; dedicated sending queues</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Setup & Integration Guide */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              QUICK DEPLOYMENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              How to Connect Your SMTP Account in Under 5 Minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                1
              </div>
              <h4 className="text-sm font-black text-slate-900">Instant Order Manifest</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediately receive your SMTP credentials, port specifications, API tokens, and dedicated domain keys.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-white font-black text-sm flex items-center justify-center shadow-xs">
                2
              </div>
              <h4 className="text-sm font-black text-slate-900">Add DNS TXT Records</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Copy the provided SPF, DKIM, and DMARC TXT records into your domain DNS (Cloudflare, Namecheap, etc.).
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-white font-black text-sm flex items-center justify-center shadow-xs">
                3
              </div>
              <h4 className="text-sm font-black text-slate-900">Connect to Smartlead</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste the SMTP host and credentials into Smartlead, Instantly, Lemlist, or your CRM with port 587 (TLS).
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                4
              </div>
              <h4 className="text-sm font-black text-slate-900">Launch Campaign</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Start sending high-volume cold email sequences with pre-warmed reputation and 99%+ deliverability.
              </p>
            </div>
          </div>
        </div>

        {/* Category FAQ Accordion */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              SMTP Accounts &amp; Relays FAQ
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {smtpFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-2xl transition-all ${
                    isOpen ? 'border-rose-300 bg-rose-50/20' : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm font-black text-slate-900">{faq.q}</span>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      ↓
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enterprise & Custom High Volume Contact Strip */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white rounded-3xl p-8 sm:p-10 shadow-lg mb-16">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black text-white">Need 500k+ to 2M+ Emails Per Month?</h3>
              <p className="text-xs sm:text-sm text-rose-100 max-w-xl">
                We build dedicated multi-node MTA clusters with customized IP rotation, dedicated ASN routing, and custom reverse DNS for enterprise cold outreach agencies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a 
                href="https://t.me/BuyPvaGmail"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-900 hover:bg-slate-100 font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-blue-500" />
                <span>Chat on Telegram (@BuyPvaGmail)</span>
              </a>

              <a 
                href="https://wa.me/12534080049"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
