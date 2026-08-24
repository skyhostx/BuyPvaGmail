import React from 'react';
import { 
  FileText, 
  ShieldAlert, 
  Scale, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  AlertCircle,
  HelpCircle,
  Send,
  MessageSquare,
  Sparkles,
  Zap,
  Globe2
} from 'lucide-react';

interface TermsOfServicePageProps {
  onNavigateHome?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToWarranty?: () => void;
}

export const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ 
  onNavigateHome, 
  onNavigateToContact,
  onNavigateToWarranty 
}) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-800">
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-2">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateHome) onNavigateHome();
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">Terms of Service</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            Last Updated: August 2026
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Service Agreement & Buyer Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            By purchasing phone-verified Gmail accounts from BuyPvaGmail.com, you agree to the following terms, operational standards, and warranty policies.
          </p>
        </div>
      </section>

      {/* Main Terms Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-8">

          {/* Key Principles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">Instant Automated Dispatch</h2>
                <p className="text-xs text-slate-600 leading-normal">
                  Orders are automatically processed and delivered in real-time upon crypto payment verification.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">Single-Owner Dispatch</h2>
                <p className="text-xs text-slate-600 leading-normal">
                  All accounts sold are delivered exclusively to you. No batch is ever reused, recycled, or double-sold.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">7-Day Free Warranty</h2>
                <p className="text-xs text-slate-600 leading-normal">
                  Full 1-to-1 replacement for any non-working or login-disabled accounts reported within 7 days.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Agreement & Lawful Use */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                1
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                Acceptance of Agreement & Lawful Use
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              By accessing BuyPvaGmail.com and purchasing accounts, you certify that you are at least 18 years of age and will utilize the accounts strictly for legitimate business, marketing, software development, QA testing, outreach, or digital agency growth.
            </p>
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-800 leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Prohibited Uses:</strong> Using accounts for phishing, malicious scam campaigns, credit card fraud, identity theft, harassment, or distributing illegal contraband is strictly forbidden. Accounts used for prohibited purposes will immediately void all warranty and replacement rights.
              </div>
            </div>
          </article>

          {/* Section 2: Account Specifications & Delivery Formats */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                2
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                Product Deliverables & Credentials Format
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Accounts are delivered digitally in standard plain-text format:
            </p>
            <div className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
              <code>email@gmail.com:password:recovery_email:2FA_secret_key</code>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Each package contains the exact age range, phone verification state, and recovery details specified at the time of purchase.
            </p>
          </article>

          {/* Section 3: Payments & Blockchain Settlement */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                3
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                Payments & Cryptocurrency Settlement
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              All prices are displayed in USD ($) and payable in supported cryptocurrencies: <strong>USDT (TRC20, BEP20, Polygon, Arbitrum), Bitcoin (BTC), Litecoin (LTC), Solana (SOL), Ethereum (ETH), Binance Coin (BNB), TRON (TRX)</strong>.
            </p>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Orders dispatch instantly after 1 on-chain network confirmation.</li>
              <li>Ensure you transfer over the correct blockchain network to avoid network loss.</li>
              <li>Network gas fees are paid by the sender's wallet.</li>
            </ul>
          </article>

          {/* Section 4: 7-Day Warranty & Replacement Terms */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                4
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                7-Day Free Replacement Guarantee
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              We stand behind our accounts with a full 7-day replacement window:
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Eligible for Replacement:</strong> Wrong credentials on first login, pre-existing phone checkpoint on initial access, or disabled accounts before login.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Ineligible Cases:</strong> Accounts locked due to heavy datacenter spamming, sending 500+ un-warmed emails within 5 minutes, or using blacklisted public VPN IPs.</span>
              </li>
            </ul>
            {onNavigateToWarranty && (
              <div className="pt-2">
                <button
                  onClick={onNavigateToWarranty}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer underline"
                >
                  View full Warranty &amp; Replacement Guidelines
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </article>

          {/* Section 5: Platform Disclaimer */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                5
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                Third-Party Trademark Disclaimer
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Gmail and Google are registered trademarks of Google LLC. BuyPvaGmail.com is an independent digital account provisioning service and is not affiliated, endorsed, or partnered with Google LLC or its parent company Alphabet Inc.
            </p>
          </article>

          {/* Support CTA */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Questions About Our Terms?</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Our support team is available 24/7 to provide clarity on order agreements and replacement protocols.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
              <a 
                href="https://t.me/BuyPvaGmail" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram Support</span>
              </a>
              <a 
                href="https://wa.me/12534080049" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
