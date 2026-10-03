import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Shield, 
  Smartphone, 
  Globe, 
  TrendingUp, 
  ShoppingCart,
  Lock,
  Layers,
  HelpCircle,
  Award,
  Copy,
  Check,
  ChevronRight,
  ArrowLeft,
  Headphones,
  FileText,
  Terminal,
  ExternalLink,
  Tag,
  Search,
  Plus,
  Minus,
  Mail
} from 'lucide-react';
import { detailedServicesData, DetailedServiceInfo, ServicePackage, getServiceById } from '../../data/servicesData';
import { ServiceProduct, ProductVariant } from '../../types';
import { ServiceSeoSection } from '../ServiceSeoSection';
import { ProductRelatedContent } from '../ProductRelatedContent';
import { handleLinkClick } from '../../utils/navigation';
import { getProductPath, getProductFullUrl } from '../../utils/urlHelpers';

interface ServiceDetailPageProps {
  serviceId: string;
  onBackToCatalog: () => void;
  onSelectOtherService: (id: string) => void;
  onQuickBuy: (product: ServiceProduct, quantity: number) => void;
  onAddToCart: (product: ServiceProduct, quantity: number, packageId?: string, packageName?: string) => void;
  onNavigateHome?: () => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceId,
  onBackToCatalog,
  onSelectOtherService,
  onQuickBuy,
  onAddToCart,
  onNavigateHome
}) => {
  const service = getServiceById(serviceId) || detailedServicesData[0];
  const variants = service.variants && service.variants.length > 0 ? service.variants : [];
  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0]?.id || '');
  const [customQty, setCustomQty] = useState<number>(2);

  // Sync selected variant when service changes
  useEffect(() => {
    if (variants.length > 0) {
      setSelectedVariantId(variants[0].id);
    }
    setCustomQty(2);
  }, [service.id]);

  const activeVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];
  const effectiveBaseUnitRate = activeVariant ? activeVariant.unitPrice : service.unitPrice;
  const isSmtp = service.category === 'smtp';

  const [copiedFormat, setCopiedFormat] = useState(false);
  const [copiedPageLink, setCopiedPageLink] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1800);
  };

  // Calculate dynamic bulk discount for custom calculator and card
  const calculateDiscount = (qty: number) => {
    if (isSmtp) {
      if (qty >= 10) return 0.20;
      if (qty >= 5) return 0.10;
      if (qty >= 2) return 0.05;
      return 0;
    }
    if (qty >= 500) return 0.30;
    if (qty >= 100) return 0.20;
    if (qty >= 50) return 0.15;
    if (qty >= 25) return 0.10;
    if (qty >= 10) return 0.05;
    return 0;
  };

  const currentDiscount = calculateDiscount(customQty);
  const discountedUnitPrice = +(effectiveBaseUnitRate * (1 - currentDiscount)).toFixed(2);
  const calculatedTotalPrice = +(discountedUnitPrice * customQty).toFixed(2);

  const handleCopyFormat = () => {
    navigator.clipboard.writeText(service.sampleFormat);
    setCopiedFormat(true);
    setTimeout(() => setCopiedFormat(false), 2000);
  };

  const handleCopyPageLink = () => {
    const fullUrl = getProductFullUrl(service);
    navigator.clipboard.writeText(fullUrl);
    setCopiedPageLink(true);
    setTimeout(() => setCopiedPageLink(false), 2500);
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'usa-gmail-accounts': return Shield;
      case 'pva-gmail-accounts': return Smartphone;
      case 'aged-mix-country-gmail': return Globe;
      case 'aged-gmail-for-reviews': return Star;
      case 'aged-gmail-for-google-ads': return TrendingUp;
      case 'new-gmail-accounts': return Zap;
      default: return ShieldCheck;
    }
  };

  const IconComp = getServiceIcon(service.id);
  const otherServices = detailedServicesData.filter((s) => s.id !== service.id);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
            <a 
              href="/"
              onClick={(e) => {
                handleLinkClick(e, () => {
                  if (onNavigateHome) onNavigateHome();
                  else window.scrollTo({ top: 0, behavior: 'smooth' });
                });
              }}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a 
              href="/gmail"
              onClick={(e) => {
                handleLinkClick(e, onBackToCatalog);
              }}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Gmail
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{service.name}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyPageLink}
              className="text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy link to this product page"
            >
              {copiedPageLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share / Copy Link</span>
                </>
              )}
            </button>

            <a
              href="/gmail"
              onClick={(e) => {
                handleLinkClick(e, onBackToCatalog);
              }}
              className="text-xs font-bold text-slate-600 hover:text-blue-600 inline-flex items-center gap-1.5 cursor-pointer px-2 py-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to All Gmail Accounts</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-black border border-red-200 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>{service.age}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{service.inStock.toLocaleString()} In Stock</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>7-Day Replacement Warranty</span>
                </span>
                {service.focusKeyword && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-200">
                    <span>Keyword: {service.focusKeyword}</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {service.name}
              </h1>

              <p className="text-base sm:text-lg text-blue-600 font-bold mt-2">
                {service.heroTagline}
              </p>

              {/* Product Short Description */}
              {service.shortDescription && (
                <div className="mt-3 p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-sm font-medium text-slate-700 leading-relaxed">
                  <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider mb-1">Product Summary:</span>
                  {service.shortDescription}
                </div>
              )}

              {/* Product Full Description */}
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl">
                {service.description || service.longDescription}
              </p>

              {/* High Search Value Product Tags */}
              {service.tags && service.tags.length > 0 && (
                <div className="mt-5 p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-blue-600" />
                      <span>High Search Value Keywords &amp; Tags ({service.tags.length})</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Click tag to copy</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {service.tags.map((tag, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCopyTag(tag)}
                        className="inline-flex items-center gap-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-medium px-2.5 py-1 rounded-lg transition-all border border-slate-200 hover:border-blue-300 shadow-2xs cursor-pointer group"
                        title="Click to copy search tag"
                      >
                        <Search className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                        <span>#{tag}</span>
                        {copiedTag === tag ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Star Rating Bar */}
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-black text-slate-900">{service.rating} / 5.0</span>
                <span className="text-xs text-slate-500">Based on {service.reviewsCount} verified customer orders</span>
              </div>

              {/* Product Key Specifications & Trust Highlights Bar */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100/90">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Included With Every Account in This Order</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                    100% Guaranteed
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-xl border border-blue-100/60 shadow-2xs">
                    <Smartphone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span className="truncate">Real SIM (Non-VoIP)</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-xl border border-blue-100/60 shadow-2xs">
                    <Globe className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="truncate">Clean Residential IP</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-xl border border-blue-100/60 shadow-2xs">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">2FA Secret Key</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-xl border border-blue-100/60 shadow-2xs">
                    <Mail className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span className="truncate">Recovery Email Config</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-xl border border-blue-100/60 shadow-2xs">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">App Password Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/80 px-2.5 py-1.5 rounded-xl border border-blue-100/60 shadow-2xs">
                    <Shield className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                    <span className="truncate">7-Day Free Warranty</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Product Variants & Order Card */}
            <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xl lg:sticky lg:top-20">
              {/* Header / Selected Rate Display */}
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                    <IconComp className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">
                      {activeVariant ? 'Selected Variant Rate' : 'Starting Rate'}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        ${discountedUnitPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        / {isSmtp ? 'mo' : 'account'}
                      </span>
                      {currentDiscount > 0 && (
                        <span className="line-through text-xs text-slate-400">
                          ${effectiveBaseUnitRate.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{(activeVariant ? activeVariant.inStock : service.inStock).toLocaleString()} In Stock</span>
                  </span>
                </div>
              </div>

              {/* Product Variants Selector */}
              {variants.length > 0 && (
                <div className="py-4 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>Choose Variant ({variants.length} options)</span>
                    </span>
                    <span className="text-[11px] text-blue-600 font-bold truncate max-w-[140px] text-right">
                      {activeVariant?.shortLabel || 'Select Option'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {variants.map((v) => {
                      const isSelected = v.id === selectedVariantId;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariantId(v.id)}
                          className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer relative ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/20'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5">
                              <div className={`w-4 h-4 rounded-full mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                                isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                              </div>
                              <div>
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className={`text-xs font-bold ${isSelected ? 'text-blue-950 font-black' : 'text-slate-800'}`}>
                                    {v.name}
                                  </span>
                                  {v.badge && (
                                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                                      v.isPopular
                                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                                    }`}>
                                      {v.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                                  {v.description}
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className={`text-xs font-black block ${isSelected ? 'text-blue-700' : 'text-slate-900'}`}>
                                ${v.unitPrice.toFixed(2)}
                              </span>
                              <span className="text-[10px] text-slate-400 block">/ {isSmtp ? 'mo' : 'ea'}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selection */}
              <div className="py-4 border-b border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                    Order Quantity ({isSmtp ? 'Accounts' : 'Pcs'}):
                  </span>
                  {currentDiscount > 0 && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      🎉 Save {Math.round(currentDiscount * 100)}% Applied
                    </span>
                  )}
                </div>

                {/* Quick Presets */}
                <div className="grid grid-cols-4 gap-1.5 mb-3">
                  {(isSmtp ? [1, 2, 5, 10] : [2, 10, 25, 50]).map((qty) => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setCustomQty(qty)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        customQty === qty
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {qty} {isSmtp ? 'Acct' : 'Pcs'}
                    </button>
                  ))}
                </div>

                {/* Custom Quantity Stepper */}
                <div className="flex items-center justify-between bg-slate-50 rounded-2xl border border-slate-200 p-1.5">
                  <span className="text-xs text-slate-500 font-medium pl-2.5">
                    Custom Amount:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomQty((q) => Math.max(1, q - 1))}
                      disabled={customQty <= 1}
                      className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={customQty}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setCustomQty(Math.max(1, val));
                      }}
                      className="w-14 text-center font-black text-sm bg-white border border-slate-200 rounded-xl py-1 text-slate-900 shadow-2xs focus:outline-hidden focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setCustomQty((q) => q + 1)}
                      className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-colors cursor-pointer shadow-2xs"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Specs for Selected Variant */}
              <div className="py-3.5 space-y-2 text-xs font-medium text-slate-700 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Carrier / Verification:</span>
                  <span className="font-bold text-slate-900 text-right">
                    {activeVariant?.specs?.carrier || service.specs.phoneType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">IP Origin / Network:</span>
                  <span className="font-bold text-slate-900 text-right">
                    {activeVariant?.specs?.ipOrigin || service.specs.ipOrigin}
                  </span>
                </div>
                {activeVariant?.specs?.trustScore && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Trust &amp; Deliverability:</span>
                    <span className="font-bold text-emerald-600">
                      {activeVariant.specs.trustScore} • {activeVariant.specs.deliverability || 'Top Tier'}
                    </span>
                  </div>
                )}
                {activeVariant?.specs?.sendingLimit && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Sending Throughput:</span>
                    <span className="font-bold text-blue-600">
                      {activeVariant.specs.sendingLimit}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Security Credentials:</span>
                  <span className="font-bold text-emerald-600">Recovery Email &amp; 2FA Included</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Auto Delivery:</span>
                  <span className="font-bold text-blue-600">&lt; 60 Seconds Instant</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Guarantee:</span>
                  <span className="font-bold text-emerald-600">7-Day Free Replacement</span>
                </div>
              </div>

              {/* Total Summary & Action Buttons */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Due</span>
                    <span className="text-xs text-slate-500">{customQty}x {activeVariant?.shortLabel || 'Account'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900 block leading-tight">
                      ${calculatedTotalPrice.toFixed(2)}
                    </span>
                    {currentDiscount > 0 && (
                      <span className="text-[11px] font-bold text-emerald-600">
                        Includes {Math.round(currentDiscount * 100)}% Discount
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => {
                      const variantProduct: ServiceProduct = {
                        ...service,
                        unitPrice: effectiveBaseUnitRate,
                        basePrice: +(effectiveBaseUnitRate * service.baseQuantity).toFixed(2)
                      };
                      onQuickBuy(variantProduct, customQty);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-current text-amber-300" />
                    <span>Instant Order Now (${calculatedTotalPrice.toFixed(2)})</span>
                  </button>

                  <button
                    onClick={() => {
                      const variantProduct: ServiceProduct = {
                        ...service,
                        unitPrice: effectiveBaseUnitRate,
                        basePrice: +(effectiveBaseUnitRate * service.baseQuantity).toFixed(2)
                      };
                      const variantName = activeVariant 
                        ? `${service.name} (${activeVariant.shortLabel || activeVariant.name})`
                        : undefined;
                      onAddToCart(variantProduct, customQty, activeVariant?.id, variantName);
                    }}
                    className="w-full py-3 bg-white hover:bg-slate-50 text-slate-800 hover:text-blue-600 rounded-2xl text-sm font-bold border border-slate-200 hover:border-blue-300 shadow-2xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 pt-1 text-[11px] font-medium text-slate-400">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>256-Bit SSL</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>7-Day Warranty</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Auto-Dispatch</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">

        {/* 1. Pre-Configured Packages Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Select Your Quantity Tier
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Packages for {service.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Choose a pre-packaged tier below or use the custom calculator to select any volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between relative ${
                  pkg.isPopular 
                    ? 'border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20' 
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-lg'
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-base font-black text-slate-900">{pkg.name}</span>
                    {pkg.badge && (
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                        pkg.isPopular 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-black text-slate-900">${pkg.price.toFixed(2)}</span>
                    <span className="text-xs text-slate-400 font-semibold line-through">
                      ${(service.unitPrice * pkg.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 font-medium mb-5">
                    <span className="font-bold text-slate-900">{pkg.quantity} Accounts</span> (${pkg.unitPrice.toFixed(2)} / each)
                  </div>

                  {/* Feature list */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 mb-6">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onQuickBuy(service, pkg.quantity)}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                      pkg.isPopular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25'
                        : 'bg-slate-900 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                    <span>{service.category === 'smtp' ? `Order ${pkg.name} Now` : `Order ${pkg.quantity} Accounts Now`}</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(service, pkg.quantity, pkg.id, pkg.name)}
                    className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-600" />
                    <span>Add {pkg.name} to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Interactive Custom Quantity Calculator */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Custom Volume Calculator
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-2">
                Need a Specific Quantity?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal">
                Choose any custom quantity between 2 and 5,000 accounts. Bulk discounts apply automatically.
              </p>

              {/* Slider & Quick Buttons */}
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Quantity: {customQty} Accounts</span>
                    <span className="text-amber-400 font-extrabold">
                      {currentDiscount > 0 ? `${(currentDiscount * 100).toFixed(0)}% Bulk Discount Applied` : 'Standard Rate'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="500"
                    step="1"
                    value={customQty}
                    onChange={(e) => setCustomQty(parseInt(e.target.value) || 2)}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {[2, 5, 10, 25, 50, 100, 250, 500].map((num) => (
                    <button
                      key={num}
                      onClick={() => setCustomQty(num)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        customQty === num 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {num} accounts
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price calculation block */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-300 font-semibold block">Total Estimated Cost</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-white">${calculatedTotalPrice.toFixed(2)}</span>
                  <span className="text-xs text-slate-400">USD</span>
                </div>
                <div className="text-xs text-emerald-400 font-bold mt-1">
                  ${discountedUnitPrice.toFixed(2)} per account
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-white/10 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant automated crypto dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>7-Day 100% replacement warranty</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  onClick={() => onQuickBuy(service, customQty)}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/30 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                  <span>Order {customQty} Accounts Now</span>
                </button>

                <button
                  onClick={() => onAddToCart(service, customQty)}
                  className="w-full py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-slate-200" />
                  <span>Add {customQty} to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Deep Technical Specs & Sample Format */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Full Specifications & Architecture</span>
            </h3>

            <div className="divide-y divide-slate-100 text-xs font-medium">
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500">Phone Verification Method:</span>
                <span className="font-bold text-slate-900">{service.specs.phoneType}</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500">IP Origin / Geo:</span>
                <span className="font-bold text-slate-900">{service.specs.ipOrigin}</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500">Account Vintage / Age:</span>
                <span className="font-bold text-slate-900">{service.age}</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500">Recovery Email Setup:</span>
                <span className="font-bold text-emerald-600">Configured & Working</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500">2FA / App Password Access:</span>
                <span className="font-bold text-slate-900">{service.specs.twoFA ? 'Enabled (App Passwords Ready)' : 'Standard Login'}</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500">Replacement Guarantee:</span>
                <span className="font-bold text-red-600">{service.specs.warranty}</span>
              </div>
            </div>

            {/* Delivery Format Box */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">Delivery File Format (.txt / .csv):</span>
              <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl text-xs font-mono flex items-center justify-between gap-3 overflow-x-auto">
                <span className="text-emerald-400 whitespace-nowrap">{service.sampleFormat}</span>
                <button
                  onClick={handleCopyFormat}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-sans font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedFormat ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFormat ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* How to Login & Warmup SOP */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-600" />
              <span>Login & Warmup Instructions</span>
            </h3>

            <div className="space-y-4">
              {service.loginInstructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 mt-0.5 border border-blue-200">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">Compatible Outreach & Anti-Detect Tools:</span>
              <div className="flex flex-wrap gap-1.5">
                {service.bestTools.map((tool, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Best Use-Cases */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-4">
            Recommended Use-Cases for {service.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.useCases.map((useCase, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800 leading-snug">{useCase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Product Related More Content: Variants Comparison, Credentials Decoder, Anti-Ban Pillars, Warmup Protocol, Compatibility & Reviews */}
        <ProductRelatedContent
          service={service}
          selectedVariantId={selectedVariantId}
          onSelectVariant={(variantId) => setSelectedVariantId(variantId)}
          onQuickBuyVariant={(variant, qty) => {
            const variantProduct: ServiceProduct = {
              ...service,
              unitPrice: variant.unitPrice,
              basePrice: +(variant.unitPrice * service.baseQuantity).toFixed(2)
            };
            onQuickBuy(variantProduct, qty);
          }}
          onAddToCartVariant={(variant, qty) => {
            const variantProduct: ServiceProduct = {
              ...service,
              unitPrice: variant.unitPrice,
              basePrice: +(variant.unitPrice * service.baseQuantity).toFixed(2)
            };
            const variantName = `${service.name} (${variant.shortLabel || variant.name})`;
            onAddToCart(variantProduct, qty, variant.id, variantName);
          }}
        />

        {/* 6. 1,200+ Word 100% Unique SEO & Technical Authority Guide */}
        <ServiceSeoSection serviceId={service.id} />

        {/* 6. Related Services Navigation */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-black text-slate-900">Explore Other Account Types</h3>
              <p className="text-xs text-slate-500">Discover all 6 verified PVA categories available at BuyPvaGmail</p>
            </div>
            <a
              href="/gmail"
              onClick={(e) => {
                handleLinkClick(e, onBackToCatalog);
              }}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All 6</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {otherServices.map((other) => {
              const OtherIcon = getServiceIcon(other.id);
              return (
                <a
                  key={other.id}
                  href={getProductPath(other)}
                  onClick={(e) => {
                    handleLinkClick(e, () => onSelectOtherService(other.id));
                  }}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group block"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 text-slate-700 flex items-center justify-center mb-2 transition-colors">
                    <OtherIcon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {other.name}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-semibold block mt-0.5">
                    From ${other.unitPrice.toFixed(2)}/ea
                  </span>
                </a>
              );
            })}
          </div>
        </div>

      </section>
    </div>
  );
};
