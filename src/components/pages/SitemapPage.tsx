import React, { useState } from 'react';
import { 
  Network, 
  ChevronRight, 
  ExternalLink, 
  Search, 
  FileCode2, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Mail,
  FileText,
  DollarSign,
  HelpCircle,
  BookOpen,
  Headphones,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { detailedServicesData, VINTAGE_YEAR_TIERS } from '../../data/servicesData';
import { blogGuides } from '../../data/blogData';
import { AppView } from '../../App';
import { handleLinkClick } from '../../utils/navigation';

interface SitemapPageProps {
  onNavigateToPage: (page: AppView) => void;
  onNavigateToServiceDetail: (serviceId: string) => void;
  onNavigateHome: () => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({
  onNavigateToPage,
  onNavigateToServiceDetail,
  onNavigateHome
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const mainPages = [
    { 
      title: 'Homepage', 
      url: 'https://buypvagmail.com/', 
      path: '/', 
      view: 'home' as AppView,
      desc: 'Main landing page featuring live pricing calculator, stock status, and instant checkout.',
      icon: Globe,
      priority: '1.0',
      changefreq: 'Daily'
    },
    { 
      title: 'Services Catalog', 
      url: 'https://buypvagmail.com/services', 
      path: '/services', 
      view: 'services-catalog' as AppView,
      desc: 'Comprehensive inventory of USA PVA, Aged 2008–2025, Review, and Google Ads accounts.',
      icon: Layers,
      priority: '0.95',
      changefreq: 'Daily'
    },
    { 
      title: 'SMTP Sending Accounts Category', 
      url: 'https://buypvagmail.com/smtp', 
      path: '/smtp', 
      view: 'smtp' as AppView,
      desc: 'Enterprise Mailgun, Brevo & Dedicated SMTP Relays (50k - 200k/mo) with pre-warmed IPs and verified SPF/DKIM/DMARC.',
      icon: Mail,
      priority: '0.95',
      changefreq: 'Daily'
    },
    { 
      title: 'Pricing & Packages', 
      url: 'https://buypvagmail.com/pricing', 
      path: '/pricing', 
      view: 'pricing' as AppView,
      desc: 'Transparent tiered pricing table with volume bulk discounts and instant crypto checkout.',
      icon: DollarSign,
      priority: '0.85',
      changefreq: 'Weekly'
    },
    { 
      title: 'Agency Warmup Guides & Blog', 
      url: 'https://buypvagmail.com/blog', 
      path: '/blog', 
      view: 'blog' as AppView,
      desc: 'Technical warmup SOPs, Anti-detect browser setups, and inbox deliverability protocols.',
      icon: BookOpen,
      priority: '0.85',
      changefreq: 'Weekly'
    },
    { 
      title: 'Frequently Asked Questions (FAQ)', 
      url: 'https://buypvagmail.com/faq', 
      path: '/faq', 
      view: 'faq' as AppView,
      desc: 'Answers to login security, replacement warranties, 2FA secret keys, and payment gateways.',
      icon: HelpCircle,
      priority: '0.80',
      changefreq: 'Weekly'
    },
    { 
      title: 'About Us & Infrastructure', 
      url: 'https://buypvagmail.com/about', 
      path: '/about', 
      view: 'about' as AppView,
      desc: 'Our residential ISP infrastructure, physical SIM validation standards, and company mission.',
      icon: ShieldCheck,
      priority: '0.75',
      changefreq: 'Monthly'
    },
    { 
      title: 'Contact & 24/7 Support', 
      url: 'https://buypvagmail.com/contact', 
      path: '/contact', 
      view: 'contact' as AppView,
      desc: 'Direct Telegram desk (@BuyPvaGmail), WhatsApp (+1-253-408-0049), and support tickets.',
      icon: Headphones,
      priority: '0.75',
      changefreq: 'Monthly'
    }
  ];

  const legalPages = [
    {
      title: 'Privacy Policy',
      url: 'https://buypvagmail.com/privacy',
      path: '/privacy',
      view: 'privacy' as AppView,
      desc: 'Zero telemetry logging policy, cryptographic transaction processing, and data confidentiality.',
      icon: Lock,
      priority: '0.60'
    },
    {
      title: 'Terms of Service',
      url: 'https://buypvagmail.com/terms',
      path: '/terms',
      view: 'terms' as AppView,
      desc: 'Commercial terms of sale, SLA agreements, acceptable usage policies, and digital goods fulfillment.',
      icon: FileText,
      priority: '0.60'
    },
    {
      title: 'Warranty Guidelines & Replacement Policy',
      url: 'https://buypvagmail.com/warranty',
      path: '/warranty',
      view: 'warranty' as AppView,
      desc: 'Official 7-Day 1-to-1 replacement SLA, verification procedures, and warranty terms.',
      icon: ShieldCheck,
      priority: '0.65'
    }
  ];

  const technicalGuides = blogGuides.map((g) => ({
    title: g.title,
    category: g.category,
    slug: g.slug,
    readTime: g.readTime
  }));

  // Filter logic
  const normalizedSearch = searchTerm.toLowerCase().trim();

  const filteredMainPages = mainPages.filter(p => 
    p.title.toLowerCase().includes(normalizedSearch) || 
    p.desc.toLowerCase().includes(normalizedSearch) ||
    p.path.toLowerCase().includes(normalizedSearch)
  );

  const filteredServices = detailedServicesData.filter(s => 
    s.name.toLowerCase().includes(normalizedSearch) || 
    s.shortDesc.toLowerCase().includes(normalizedSearch) ||
    s.id.toLowerCase().includes(normalizedSearch) ||
    s.age.toLowerCase().includes(normalizedSearch)
  );

  const filteredLegal = legalPages.filter(l => 
    l.title.toLowerCase().includes(normalizedSearch) || 
    l.desc.toLowerCase().includes(normalizedSearch)
  );

  const filteredGuides = technicalGuides.filter(g => 
    g.title.toLowerCase().includes(normalizedSearch) || 
    g.category.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <a 
            href="/"
            onClick={(e) => {
              handleLinkClick(e, onNavigateHome);
            }}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">HTML Sitemap</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <Network className="w-3.5 h-3.5 text-blue-600" />
            <span>Complete Website Directory &amp; Structure</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            BuyPvaGmail.com <span className="text-blue-600">Sitemap</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore our complete index of verified PVA Gmail services, 2008–2025 vintage inventory, 
            agency warmup guides, legal policies, and developer documentation.
          </p>

          {/* Quick Actions & Search Bar */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search pages, services, vintage years, or guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-xs font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="/sitemap_index.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 whitespace-nowrap border border-blue-600"
              >
                <FileCode2 className="w-4 h-4 text-amber-300" />
                <span>sitemap_index.xml</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href="/product-sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 whitespace-nowrap border border-slate-800"
              >
                <FileCode2 className="w-4 h-4 text-emerald-400" />
                <span>Products XML</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* SECTION 1: CORE SERVICES DIRECTORY */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Account Types</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Gmail Services &amp; Account Solutions
              </h2>
            </div>
            <a
              href="/services"
              onClick={(e) => {
                handleLinkClick(e, () => onNavigateToPage('services-catalog'));
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
              <div 
                key={service.id}
                className="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-5 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      {service.age}
                    </span>
                    <span className="text-xs font-black text-emerald-600">
                      From ${service.unitPrice.toFixed(2)}/ea
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                    <a
                      href={`/services/${encodeURIComponent(service.id)}`}
                      onClick={(e) => {
                        handleLinkClick(e, () => onNavigateToServiceDetail(service.id));
                      }}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {service.name}
                    </a>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    /services/{service.id}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(`https://buypvagmail.com/services/${service.id}`)}
                      title="Copy URL"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      {copiedUrl === `https://buypvagmail.com/services/${service.id}` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <a
                      href={`/services/${encodeURIComponent(service.id)}`}
                      onClick={(e) => {
                        handleLinkClick(e, () => onNavigateToServiceDetail(service.id));
                      }}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: VINTAGE SPECTRUM DIRECTORY */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="pb-6 mb-6 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Vintage Creation Tiers</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Account Vintage Spectrum (2008 – 2025)
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Direct access to aged accounts sorted by creation era and historical trust metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {VINTAGE_YEAR_TIERS.map((tier) => (
              <div 
                key={tier.era}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{tier.era}</span>
                    <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">
                    Algorithmic Trust Score: <strong className="text-slate-900">{tier.trustScore}</strong>
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tier.years.map((year) => (
                    <a
                      key={year}
                      href="/services/aged-mix-country-gmail"
                      onClick={(e) => {
                        handleLinkClick(e, () => onNavigateToServiceDetail('aged-mix-country-gmail'));
                      }}
                      className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-700 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-colors inline-block text-center cursor-pointer"
                    >
                      {year}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold">Looking for a specific creation year?</h4>
                <p className="text-[11px] text-slate-400">All individual years from 2008 to 2025 can be selected directly in the checkout modal.</p>
              </div>
            </div>
            <a
              href="/pricing"
              onClick={(e) => {
                handleLinkClick(e, () => onNavigateToPage('pricing'));
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg transition-all whitespace-nowrap shadow-xs inline-block cursor-pointer"
            >
              Order by Vintage Year
            </a>
          </div>
        </div>

        {/* SECTION 3: MAIN NAVIGATION PAGES */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="pb-6 mb-6 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Site Architecture</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Primary Web Pages &amp; Portals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMainPages.map((page) => {
              const Icon = page.icon;
              return (
                <div
                  key={page.path}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-emerald-300 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <a
                          href={page.path}
                          onClick={(e) => {
                            handleLinkClick(e, () => onNavigateToPage(page.view));
                          }}
                          className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-left"
                        >
                          {page.title}
                        </a>
                        <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
                          P: {page.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {page.desc}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-mono">
                        <span>{page.path}</span>
                        <span>•</span>
                        <span>{page.changefreq}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => copyToClipboard(page.url)}
                      title="Copy URL"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      {copiedUrl === page.url ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <a
                      href={page.path}
                      onClick={(e) => {
                        handleLinkClick(e, () => onNavigateToPage(page.view));
                      }}
                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Visit Page"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: TECHNICAL GUIDES & PROTOCOLS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Agency Knowledge Base</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Protocols, SOPs &amp; Technical Guides
              </h2>
            </div>
            <a
              href="/blog"
              onClick={(e) => {
                handleLinkClick(e, () => onNavigateToPage('blog'));
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors"
            >
              <span>View All Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuides.map((guide, idx) => (
              <a
                key={idx}
                href={`/blog/${guide.slug}`}
                onClick={(e) => {
                  handleLinkClick(e, () => onNavigateToPage('blog'));
                }}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-purple-300 transition-all cursor-pointer group flex flex-col justify-between block"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md inline-block mb-2">
                    {guide.category}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-600 transition-colors leading-snug">
                    {guide.title}
                  </h3>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono">/blog/{guide.slug}</span>
                  <span className="font-bold text-purple-600 group-hover:translate-x-0.5 transition-transform">Read &rarr;</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* SECTION 5: LEGAL, PRIVACY & WARRANTY */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="pb-6 mb-6 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Compliance &amp; Trust</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Legal Framework &amp; Warranty Guidelines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {filteredLegal.map((legal) => {
              const Icon = legal.icon;
              return (
                <div
                  key={legal.path}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-rose-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        <a
                          href={legal.path}
                          onClick={(e) => {
                            handleLinkClick(e, () => onNavigateToPage(legal.view));
                          }}
                        >
                          {legal.title}
                        </a>
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {legal.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">{legal.path}</span>
                    <a
                      href={legal.path}
                      onClick={(e) => {
                        handleLinkClick(e, () => onNavigateToPage(legal.view));
                      }}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Policy</span>
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 6: CRAWLER & SEARCH ENGINE METADATA SUMMARY */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rank Math SEO &amp; Google Search Console Compliant</span>
              </div>
              <h3 className="text-lg font-black text-white mb-1">
                Machine-Readable Rank Math XML Sitemap Index
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Structured with modular sub-sitemaps for Products, Vintage Tiers (2008–2025), Pages, and Knowledge Base Guides. 
                Compliant with Sitemaps.org Protocol 0.9 for Google, Bing, and Yandex.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <a
                href="/instant-indexing"
                onClick={(e) => {
                  handleLinkClick(e, () => onNavigateToPage?.('instant-indexing'));
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Zap className="w-4 h-4 text-slate-950" />
                <span>Instant Indexing Console</span>
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all"
              >
                robots.txt
              </a>
              <a
                href="/product-sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all"
              >
                product-sitemap.xml
              </a>
              <a
                href="/post-sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all"
              >
                post-sitemap.xml
              </a>
              <a
                href="/sitemap_index.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-xs"
              >
                <FileCode2 className="w-4 h-4" />
                <span>sitemap_index.xml</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
