import React, { useState } from 'react';
import { 
  BookOpen, 
  Tag, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  AlertTriangle, 
  Info, 
  Clock, 
  FileText,
  Search,
  Copy,
  Check
} from 'lucide-react';
import { servicesSeoDatabase, ServiceSeoData } from '../data/serviceSeoContent';

interface ServiceSeoSectionProps {
  serviceId: string;
}

export const ServiceSeoSection: React.FC<ServiceSeoSectionProps> = ({ serviceId }) => {
  const seoData: ServiceSeoData = servicesSeoDatabase[serviceId] || servicesSeoDatabase['usa-gmail-accounts'];
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const handleCopyTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1800);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-10 overflow-hidden">
      {/* 1. SEO Header & Badges */}
      <div className="border-b border-slate-100 pb-8">
        <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            100% Unique & Verified Technical Guide
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FileText className="w-3.5 h-3.5 text-emerald-600" />
            {seoData.wordCount} Comprehensive Analysis
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            {seoData.readTime}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {seoData.title}
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-4xl">
          {seoData.metaDescription}
        </p>

        {/* High Search Value Tags Cloud (Top) */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              High Search Value Keywords & Related Search Tags
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {seoData.highSearchValueTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => handleCopyTag(tag)}
                className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer"
                title="Click to copy search tag"
              >
                <Search className="w-3 h-3 text-slate-400 group-hover:text-blue-600 transition-colors" />
                <span className="font-mono text-[11px] sm:text-xs">{tag}</span>
                {copiedTag === tag ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Quick Authority Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {seoData.quickStats.map((stat, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {stat.label}
            </span>
            <span className="text-xl font-black text-slate-900 mt-1 block">
              {stat.value}
            </span>
            <span className="text-[11px] text-slate-600 font-medium block mt-0.5">
              {stat.desc}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Deep In-Depth SEO Content Sections */}
      <div className="space-y-10">
        {seoData.sections.map((section, sIdx) => (
          <article key={sIdx} className="space-y-4 pt-2">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  {sIdx + 1}
                </span>
                <span>{section.heading}</span>
              </h3>
              {section.subheading && (
                <h4 className="text-xs sm:text-sm font-bold text-blue-600 mt-1 ml-8.5">
                  {section.subheading}
                </h4>
              )}
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed pl-0 sm:pl-8.5">
              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            {/* Callout Box if present */}
            {section.calloutBox && (
              <div className="ml-0 sm:ml-8.5 mt-4 p-4 rounded-2xl border bg-slate-50 border-slate-200 flex items-start gap-3.5">
                <div className="mt-0.5 shrink-0">
                  {section.calloutBox.type === 'tip' && (
                    <Lightbulb className="w-5 h-5 text-amber-600" />
                  )}
                  {section.calloutBox.type === 'warning' && (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  {section.calloutBox.type === 'highlight' && (
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  )}
                  {section.calloutBox.type === 'info' && (
                    <Info className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
                <div>
                  <h5 className="text-xs font-black text-slate-900">
                    {section.calloutBox.title}
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                    {section.calloutBox.text}
                  </p>
                </div>
              </div>
            )}

            {/* Bullet Points if present */}
            {section.bulletPoints && section.bulletPoints.length > 0 && (
              <div className="ml-0 sm:ml-8.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                {section.bulletPoints.map((bullet, bIdx) => (
                  <div key={bIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 font-semibold leading-snug">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      {/* 4. Technical FAQ Accordion */}
      <div className="border-t border-slate-200 pt-8 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Frequently Asked Questions & Expert Guidance
          </h3>
        </div>

        <div className="space-y-3">
          {seoData.faqItems.map((faq, fIdx) => {
            const isOpen = openFaqIndex === fIdx;
            return (
              <div 
                key={fIdx} 
                className={`rounded-2xl border transition-all ${
                  isOpen ? 'bg-blue-50/40 border-blue-200' : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(fIdx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-blue-100/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Bottom Keyword Matrix & Semantic SEO Tags */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-200">
              Target SEO Keywords & Search Queries
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold">
            Click any keyword to copy to clipboard
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {seoData.highSearchValueTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleCopyTag(tag)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800 hover:bg-blue-600/30 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{tag}</span>
              {copiedTag === tag && (
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              )}
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
          <span>BuyPvaGmail Authority Engine &copy; 2026 &bull; Verified SIM & Residential Email Delivery</span>
          <span className="text-emerald-400 font-bold">100% Unique Hand-Engineered Content</span>
        </div>
      </div>
    </div>
  );
};
