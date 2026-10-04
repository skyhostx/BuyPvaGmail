import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  ShoppingCart, 
  Check, 
  HelpCircle, 
  Lock, 
  Clock, 
  Globe, 
  Sparkles, 
  TrendingUp, 
  Award, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { detailedServicesData } from '../../data/servicesData';
import { ServiceProduct } from '../../types';
import { handleLinkClick } from '../../utils/navigation';
import { getProductPath } from '../../utils/urlHelpers';

interface ReviewCategoryPageProps {
  onSelectServicePage: (serviceId: string) => void;
  onQuickBuy: (product: ServiceProduct, quantity: number) => void;
  onAddToCart: (product: ServiceProduct, quantity: number, packageId?: string, packageName?: string) => void;
  onNavigateHome?: () => void;
  onNavigateToPricing?: () => void;
  onNavigateToContact?: () => void;
}

export const ReviewCategoryPage: React.FC<ReviewCategoryPageProps> = ({
  onSelectServicePage,
  onQuickBuy,
  onAddToCart,
  onNavigateHome,
  onNavigateToPricing,
  onNavigateToContact
}) => {
  const reviewProducts = detailedServicesData.filter(
    (p) => p.category === 'review' || p.id === 'buy-google-reviews' || p.id === 'buy-truatpilot-reviews'
  );

  const [selectedPackages, setSelectedPackages] = useState<Record<string, { qty: number; pkgId: string; pkgName: string; price: number }>>({
    'buy-google-reviews': {
      qty: 3,
      pkgId: 'google-review-3-local-guide',
      pkgName: '03 Local Guide Google Review',
      price: 27
    },
    'buy-truatpilot-reviews': {
      qty: 3,
      pkgId: 'truatpilot-review-3-verified',
      pkgName: '03 Verified Truatpilot Review',
      price: 39
    }
  });

  const handleSelectPackage = (productId: string, qty: number, pkgId: string, pkgName: string, price: number) => {
    setSelectedPackages((prev) => ({
      ...prev,
      [productId]: { qty, pkgId, pkgName, price }
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Breadcrumb Header */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <a 
              href="/" 
              onClick={(e) => {
                if (onNavigateHome) handleLinkClick(e, onNavigateHome);
              }}
              className="hover:text-amber-400 transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-amber-400 font-bold">Review Services</span>
          </nav>

          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Sticky &amp; Non-Drop Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative pt-12 pb-16 overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Online Reputation &amp; Review Management</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Buy <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">Google &amp; Truatpilot Reviews</span> for Fast Reputation Growth
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Permanent, 100% sticky 5-star reviews from verified Google Local Guides and aged Truatpilot accounts. Drip-fed naturally from real residential IPs with a 30-day replacement warranty.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-300">
            <span className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              05 Google Review $35
            </span>
            <span className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              03 Local Guide Google Review $27
            </span>
            <span className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              05 Truatpilot Review $45
            </span>
            <span className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
              <Award className="w-4 h-4 text-emerald-400" />
              03 Verified Truatpilot Review $39
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Available Review Packages &amp; Pricing
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Select your desired review service, choose between standard or verified/local guide tiers, and order instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {reviewProducts.map((product) => {
            const currentSelected = selectedPackages[product.id] || {
              qty: product.id === 'buy-google-reviews' ? 3 : 3,
              pkgId: product.id === 'buy-google-reviews' ? 'google-review-3-local-guide' : 'truatpilot-review-3-verified',
              pkgName: product.id === 'buy-google-reviews' ? '03 Local Guide Google Review' : '03 Verified Truatpilot Review',
              price: product.id === 'buy-google-reviews' ? 27 : 39
            };

            const isGoogle = product.id === 'buy-google-reviews';

            return (
              <div 
                key={product.id}
                className="bg-slate-950/80 rounded-3xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl relative group"
              >
                <div className="p-6 sm:p-8">
                  {/* Card Header Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {isGoogle ? <Star className="w-3.5 h-3.5 fill-current" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      <span>{isGoogle ? 'Google Business Profile' : 'Truatpilot TrustScore'}</span>
                    </span>

                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      In Stock ({product.inStock} slots)
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {product.shortDesc}
                  </p>

                  {/* Package Selector */}
                  <div className="mt-6">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                      Select Package Option:
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {isGoogle ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleSelectPackage(
                              product.id,
                              3,
                              'google-review-3-local-guide',
                              '03 Local Guide Google Review',
                              27
                            )}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                              currentSelected.qty === 3
                                ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/15'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black">03 Local Guide</span>
                              <span className="text-xs font-bold text-amber-400">$27</span>
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1">
                              High-Trust Local Guides ($9/ea)
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSelectPackage(
                              product.id,
                              5,
                              'google-review-5-standard',
                              '05 Google Review',
                              35
                            )}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                              currentSelected.qty === 5
                                ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg shadow-amber-500/15'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black">05 Google Review</span>
                              <span className="text-xs font-bold text-amber-400">$35</span>
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1">
                              Organic Active Profiles ($7/ea)
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleSelectPackage(
                              product.id,
                              3,
                              'truatpilot-review-3-verified',
                              '03 Verified Truatpilot Review',
                              39
                            )}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                              currentSelected.qty === 3
                                ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/15'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black">03 Verified Review</span>
                              <span className="text-xs font-bold text-emerald-400">$39</span>
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1">
                              Verified Order Tag ($13/ea)
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSelectPackage(
                              product.id,
                              5,
                              'truatpilot-review-5-standard',
                              '05 Truatpilot Review',
                              45
                            )}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                              currentSelected.qty === 5
                                ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/15'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black">05 Truatpilot Review</span>
                              <span className="text-xs font-bold text-emerald-400">$45</span>
                            </div>
                            <span className="text-[11px] text-slate-400 block mt-1">
                              Organic Consumer Review ($9/ea)
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Pricing Total Summary Box */}
                  <div className="mt-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block">
                        Selected Package:
                      </span>
                      <span className="text-sm font-black text-white">
                        {currentSelected.pkgName}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-amber-400">
                        ${currentSelected.price}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        One-Time • Non-Drop
                      </span>
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-2.5">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-6 bg-slate-900/60 border-t border-slate-800 flex flex-col gap-2.5">
                  <button
                    onClick={() => onQuickBuy(product, currentSelected.qty)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Zap className="w-4 h-4 fill-current text-slate-950" />
                    <span>Instant Order (${currentSelected.price})</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(
                      product, 
                      currentSelected.qty, 
                      currentSelected.pkgId, 
                      currentSelected.pkgName
                    )}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-400" />
                    <span>Add {currentSelected.pkgName} to Cart</span>
                  </button>

                  <a
                    href={getProductPath(product)}
                    onClick={(e) => {
                      handleLinkClick(e, () => onSelectServicePage(product.id));
                    }}
                    className="text-center text-xs font-semibold text-slate-400 hover:text-amber-400 py-1 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Specifications &amp; SOP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Choose Our Reviews Section */}
        <div className="mt-16 bg-slate-950/60 rounded-3xl p-8 border border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Why Our Reviews Stay Sticky &amp; Never Drop
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Google and Truatpilot maintain strict anti-spam filters. Here is how we ensure 100% safety and permanency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Geo-Targeted Residential IPs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Reviews are posted from clean, genuine ISP connections matched to your exact business country, state, and city.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">Natural Drip-Feed Schedule</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We spread review publishing organically over 3 to 7 days to simulate organic customer traffic and bypass algorithm triggers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1.5">30-Day Free Replacement</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                If any review is filtered or dropped during the initial 30 days, our automated warranty system re-dispatches a replacement for free.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
