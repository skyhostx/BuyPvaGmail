import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Trash2, 
  Server, 
  FileText, 
  ChevronRight, 
  ArrowLeft,
  CheckCircle2,
  Mail,
  Send,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigateHome?: () => void;
  onNavigateToContact?: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ 
  onNavigateHome, 
  onNavigateToContact 
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
            <span className="text-slate-900 font-bold">Privacy Policy</span>
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
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Strict Privacy & Zero-Log Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            At BuyPvaGmail.com, privacy is fundamental to our service. We enforce strict zero-KYC compliance, end-to-end SSL encryption, and automated dispatch log purging to protect your identity.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-8">
          
          {/* Quick Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0">
                <EyeOff className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">Zero-KYC Required</h2>
                <p className="text-xs text-slate-600 leading-normal">
                  No personal ID verification, telephone verification, or residential records are required to purchase.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">256-Bit SSL Encrypted</h2>
                <p className="text-xs text-slate-600 leading-normal">
                  All checkout sessions and delivery credentials are transmitted through encrypted SSL tunnel protocols.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">7-Day Log Purge</h2>
                <p className="text-xs text-slate-600 leading-normal">
                  Order delivery records and temporary session hashes are automatically wiped from servers after the warranty window.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                1
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                Information We Collect & Process
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              We practice minimal data retention principles. To deliver orders securely and provide 7-day replacement support, we only process:
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Destination Email / Delivery Handle:</strong> Provided voluntarily at checkout solely to transmit your account credentials file.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Blockchain Transaction Hash (TXID):</strong> For verifying cryptocurrency payments (USDT, BTC, ETH, LTC, SOL, BNB, TRX). No wallet ownership or private keys are ever collected.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Support Messages:</strong> Communications sent via Telegram or WhatsApp to process order adjustments or warranty claims.</span>
              </li>
            </ul>
          </article>

          {/* Section 2 */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                2
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                How We Safeguard Account Credentials
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              When accounts are provisioned and delivered to you in format (<code className="bg-slate-100 px-1.5 py-0.5 rounded-sm text-xs font-mono text-slate-800">Email:Password:Recovery:2FA_Key</code>):
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Each account batch is delivered exclusively to one single buyer. We never re-sell, recycle, or maintain shadow access to previously dispatched batches.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>We strongly recommend all buyers update their passwords, security recovery emails, and 2FA keys upon initial login verification for complete sovereign ownership.</span>
              </li>
            </ul>
          </article>

          {/* Section 3 */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                3
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                Cookies & Local Device Storage
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              BuyPvaGmail.com uses lightweight browser <code className="bg-slate-100 px-1.5 py-0.5 rounded-sm text-xs font-mono text-slate-800">localStorage</code> strictly for functional purposes:
            </p>
            <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
              <li>Persisting your active shopping cart items during navigation.</li>
              <li>Storing temporary order tracking lookup tokens on your local device.</li>
              <li>We do <strong>not</strong> load third-party ad-network trackers, invasive fingerprinting scripts, or cross-site tracking pixels.</li>
            </ul>
          </article>

          {/* Section 4 */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                4
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                Automated 7-Day Log Deletion Policy
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Once an order has completed its 7-Day Free Replacement Guarantee window, all temporary dispatch files, raw transaction matching records, and related email logs are queued for permanent deletion from active database nodes.
            </p>
          </article>

          {/* Contact Support Card */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Have Privacy Inquiries or Questions?</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Our support desk is available 24/7 on Telegram and WhatsApp to answer any privacy or data handling questions.
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
