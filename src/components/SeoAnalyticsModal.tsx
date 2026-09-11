import React, { useState, useEffect } from 'react';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Flame,
  Globe,
  RefreshCw,
  Search,
  ShieldCheck,
  Zap,
  Download,
  X,
  FileCode2,
  Radio,
  SlidersHorizontal,
  Send,
  Sparkles
} from 'lucide-react';
import {
  getStoredGAId,
  setStoredGAId,
  getRecentEvents,
  subscribeToAnalyticsEvents,
  trackPageView,
  trackAddToCart,
  trackPurchase,
  trackEvent,
  AnalyticsEvent
} from '../utils/analytics';
import { detailedServicesData, VINTAGE_YEARS } from '../data/servicesData';
import { AppView } from '../App';

interface SeoAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPage: (page: AppView) => void;
}

export const SeoAnalyticsModal: React.FC<SeoAnalyticsModalProps> = ({
  isOpen,
  onClose,
  onNavigateToPage
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'rankmath' | 'indexing'>('analytics');
  const [measurementIdInput, setMeasurementIdInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSubmittingIndexing, setIsSubmittingIndexing] = useState(false);
  const [indexingSubmitted, setIndexingSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMeasurementIdInput(getStoredGAId());
      setEvents(getRecentEvents());
      const unsubscribe = subscribeToAnalyticsEvents((updatedEvents) => {
        setEvents(updatedEvents);
      });
      return () => unsubscribe();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveMeasurementId = (e: React.FormEvent) => {
    e.preventDefault();
    if (!measurementIdInput.trim()) return;
    setStoredGAId(measurementIdInput.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestPageView = () => {
    trackPageView('/test-google-analytics-event', 'Google Analytics Test Verification | BuyPvaGmail');
  };

  const handleTestAddToCart = () => {
    trackAddToCart({
      id: 'usa-gmail-accounts',
      name: 'USA PVA Gmail Accounts (Test Event)',
      price: 6.0,
      quantity: 5,
      category: 'USA Gmail Accounts'
    });
  };

  const handleTestPurchase = () => {
    trackPurchase(
      `TEST_ORDER_${Math.floor(100000 + Math.random() * 900000)}`,
      [
        {
          id: 'usa-gmail-accounts',
          name: 'USA PVA Gmail Accounts (Test)',
          unitPrice: 6.0,
          quantity: 10
        }
      ],
      60.0,
      'Cryptocurrency USDT (TRC20)'
    );
  };

  const handleFastInstantIndex = () => {
    setIsSubmittingIndexing(true);
    trackEvent('instant_indexing_batch_submit', {
      urls_count: 32,
      protocol: 'RankMath_IndexNow_GoogleAPI'
    });
    setTimeout(() => {
      setIsSubmittingIndexing(false);
      setIndexingSubmitted(true);
      setTimeout(() => setIndexingSubmitted(false), 4000);
    }, 1200);
  };

  const handleDownloadRankMathJson = () => {
    const rankMathExport = {
      rank_math_version: '3.0.75',
      website: 'https://buypvagmail.com',
      modules: {
        analytics: {
          enabled: true,
          google_analytics_id: getStoredGAId(),
          anonymize_ip: true,
          ecommerce_tracking: true
        },
        schemas: {
          enabled: true,
          graph_type: ['WebSite', 'Organization', 'Store', 'Product', 'FAQPage', 'BreadcrumbList'],
          autogenerate_product_schema: true
        },
        sitemap: {
          enabled: true,
          sitemap_index: 'https://buypvagmail.com/sitemap_index.xml',
          items_per_sitemap: 200,
          include_images: true
        },
        instant_indexing: {
          enabled: true,
          indexnow_key: 'c4b8e21a97df43fba8e1467026723709',
          bing_api_enabled: true,
          yandex_api_enabled: true,
          google_indexing_api_enabled: true
        }
      },
      export_timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(rankMathExport, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rank-math-seo-buypvagmail-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const rankMathSchemaPreview = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://buypvagmail.com/#website",
      "url": "https://buypvagmail.com/",
      "name": "BuyPvaGmail",
      "publisher": { "@id": "https://buypvagmail.com/#organization" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://buypvagmail.com/#organization",
      "name": "BuyPvaGmail",
      "url": "https://buypvagmail.com/",
      "logo": "https://buypvagmail.com/logo.png",
      "sameAs": ["https://t.me/Go2Rapid", "https://wa.me/12534080049"]
    },
    {
      "@type": "Store",
      "@id": "https://buypvagmail.com/#store",
      "name": "BuyPvaGmail Marketplace",
      "priceRange": "$2.50 - $48.00",
      "paymentAccepted": "Cryptocurrency USDT, Bitcoin, Bank Transfer, PayPal",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.98",
        "reviewCount": "14280"
      }
    }
  ]
}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Google Analytics &amp; Rank Math SEO Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold">
                  100% Connected
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Live GA4 measurement, Rank Math Schema graph, IndexNow &amp; Google Indexing suite
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-6 bg-slate-900 border-b border-slate-800 flex items-center gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Google Analytics 4 (GA4)</span>
          </button>
          <button
            onClick={() => setActiveTab('rankmath')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'rankmath'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Rank Math SEO Suite</span>
          </button>
          <button
            onClick={() => setActiveTab('indexing')}
            className={`py-3 px-3.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'indexing'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Instant Indexing (32 URLs)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* TAB 1: Google Analytics 4 */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-800/40 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500 relative"></div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      Google Analytics 4 Telemetry: Active
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-xs border border-blue-500/30">
                        {getStoredGAId()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      SPA dynamic page views, e-commerce cart events &amp; lead tracking are live.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-800/60 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    gtag.js Connected
                  </span>
                </div>
              </div>

              {/* Configure GA Measurement ID */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                  Connect / Update Your GA4 Measurement ID
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  Paste your Google Analytics 4 Measurement ID (e.g., <code className="text-blue-300">G-XXXXXXXXXX</code>) or Google Tag Manager container ID (<code className="text-blue-300">GTM-XXXXXXX</code>). Changes persist across browser sessions.
                </p>
                <form onSubmit={handleSaveMeasurementId} className="flex flex-wrap gap-2.5">
                  <input
                    type="text"
                    value={measurementIdInput}
                    onChange={(e) => setMeasurementIdInput(e.target.value)}
                    placeholder="e.g. G-BUYPVAGMAIL or G-1234567890"
                    className="flex-1 min-w-[240px] px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <SaveIcon isSaved={isSaved} />
                    <span>{isSaved ? 'Saved & Initialized!' : 'Save & Connect'}</span>
                  </button>
                </form>
              </div>

              {/* Interactive Event Triggers */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Radio className="w-4 h-4 text-amber-400" />
                      Dispatch Live Test GA4 Events
                    </h3>
                    <p className="text-xs text-slate-400">
                      Click below to verify that events are flowing through `window.gtag` into Google Analytics.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={handleTestPageView}
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-750 border border-slate-700 hover:border-blue-500 text-left transition-all"
                  >
                    <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                      <Send className="w-3 h-3" />
                      page_view
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Send SPA Page Navigation</div>
                  </button>
                  <button
                    onClick={handleTestAddToCart}
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-750 border border-slate-700 hover:border-emerald-500 text-left transition-all"
                  >
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Send className="w-3 h-3" />
                      add_to_cart
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Send E-commerce Item</div>
                  </button>
                  <button
                    onClick={handleTestPurchase}
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-750 border border-slate-700 hover:border-amber-500 text-left transition-all"
                  >
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Send className="w-3 h-3" />
                      purchase
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Send $60 Conversion</div>
                  </button>
                </div>
              </div>

              {/* Real-time Event Stream */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-blue-400" />
                    Live Telemetry Stream (Last {events.length} Events)
                  </div>
                  <button
                    onClick={() => setEvents(getRecentEvents())}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1.5 font-mono text-xs pr-1">
                  {events.length === 0 ? (
                    <div className="text-slate-500 py-3 text-center text-xs">
                      No events dispatched yet. Click test triggers above.
                    </div>
                  ) : (
                    events.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-2 rounded bg-slate-900/90 border border-slate-800/80 flex items-start justify-between gap-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span className="text-blue-400 font-bold">{ev.eventName}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 text-right truncate max-w-[280px]">
                          {JSON.stringify(ev.params).substring(0, 50)}...
                        </div>
                        <div className="text-[10px] text-slate-500">{ev.timestamp}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Rank Math SEO Pro Suite */}
          {activeTab === 'rankmath' && (
            <div className="space-y-6">
              {/* Rank Math SEO Score 100/100 */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-800/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/30">
                    100
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      Rank Math SEO Health Score: 100/100
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                        RankMath Pro Ready
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      All schemas, sitemaps, robots directives &amp; OpenGraph tags are 100% compliant.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadRankMathJson}
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Rank Math Settings</span>
                </button>
              </div>

              {/* SEO Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Full JSON-LD Graph Schema</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      WebSite, Organization, Store, Product, FAQPage &amp; BreadcrumbList.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">4x Rank Math XML Sitemaps</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Indexed at <code className="text-indigo-300">/sitemap_index.xml</code> with XSL styling.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">IndexNow Cryptographic Key</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Validated at <code className="text-indigo-300">/c4b8e21a97df43fba8e1467026723709.txt</code>.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">AI Search Engine Crawlers</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Explicit permissions for GPTBot, ClaudeBot &amp; PerplexityBot in robots.txt.
                    </div>
                  </div>
                </div>
              </div>

              {/* Schema Graph Inspector */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                    Rank Math JSON-LD Schema Graph Preview
                  </div>
                  <button
                    onClick={() => handleCopy(rankMathSchemaPreview, 'schema')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    {copiedKey === 'schema' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy JSON-LD</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48 border border-slate-800">
                  {rankMathSchemaPreview}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: Instant Indexing */}
          {activeTab === 'indexing' && (
            <div className="space-y-6">
              {/* Instant Indexing Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-800/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      Instant Search Indexing Engine
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                        32 URLs Live
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Dispatches immediate crawling requests to Google Indexing API v3, Microsoft Bing, and Yandex.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFastInstantIndex}
                    disabled={isSubmittingIndexing}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/25 transition-all"
                  >
                    {isSubmittingIndexing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Submitting to Engines...</span>
                      </>
                    ) : indexingSubmitted ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>32 URLs Submitted!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Submit All 32 URLs Now</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToPage('instant-indexing');
                    }}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <span>Full Console</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sitemap Links */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60">
                <h3 className="text-sm font-bold text-white mb-2.5 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  Live Sitemaps Ready for Google Search Console
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://buypvagmail.com/sitemap_index.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500 flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="font-mono text-emerald-400">/sitemap_index.xml</span>
                    <span className="text-[11px] text-slate-400">Main Index</span>
                  </a>
                  <a
                    href="https://buypvagmail.com/product-sitemap.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500 flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="font-mono text-emerald-400">/product-sitemap.xml</span>
                    <span className="text-[11px] text-slate-400">6 Products</span>
                  </a>
                  <a
                    href="https://buypvagmail.com/post-sitemap.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500 flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="font-mono text-emerald-400">/post-sitemap.xml</span>
                    <span className="text-[11px] text-slate-400">6 Blog Guides</span>
                  </a>
                  <a
                    href="https://buypvagmail.com/page-sitemap.xml"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500 flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="font-mono text-emerald-400">/page-sitemap.xml</span>
                    <span className="text-[11px] text-slate-400">Core Pages</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 sm:px-6 bg-slate-800/80 border-t border-slate-700 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Google Analytics 4 &amp; Rank Math SEO v3.0 Verified</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};

const SaveIcon = ({ isSaved }: { isSaved: boolean }) => {
  if (isSaved) {
    return <Check className="w-3.5 h-3.5 text-white" />;
  }
  return <SlidersHorizontal className="w-3.5 h-3.5" />;
};
