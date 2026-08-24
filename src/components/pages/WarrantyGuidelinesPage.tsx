import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  RotateCcw, 
  Send, 
  MessageSquare, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  KeyRound,
  Laptop,
  Flame,
  Check
} from 'lucide-react';

interface WarrantyGuidelinesPageProps {
  onNavigateHome?: () => void;
  onNavigateToContact?: () => void;
  onNavigateToTerms?: () => void;
}

export const WarrantyGuidelinesPage: React.FC<WarrantyGuidelinesPageProps> = ({ 
  onNavigateHome, 
  onNavigateToContact,
  onNavigateToTerms 
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
            <span className="text-slate-900 font-bold">Warranty Guidelines</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
            Policy Valid 2026
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>7-Day Free Replacement Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight mb-4">
            Warranty &amp; Replacement Guidelines
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed">
            Every account purchased on BuyPvaGmail.com includes our comprehensive <strong>7-Day 1-to-1 Replacement Guarantee</strong>. Review our clear coverage criteria, claim protocols, and longevity guidelines below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-8">

          {/* Quick SLA Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">7 Full Days Coverage</h2>
                <p className="text-xs text-slate-600 leading-normal">
                  You have a full 168 hours from delivery timestamp to test and verify your accounts.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">1-to-1 Instant Swap</h2>
                <p className="text-xs text-slate-600 leading-normal">
                  Defective accounts are replaced immediately with fresh, fully verified credentials from identical batches.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 mb-1">&lt; 2 Hours Resolution</h2>
                <p className="text-xs text-slate-600 leading-normal">
                  Our live support team on Telegram &amp; WhatsApp handles warranty tickets with rapid turnaround.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Cards: Covered vs Not Covered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* What IS Covered */}
            <div className="bg-white rounded-2xl border border-emerald-200 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-base mb-4 pb-3 border-b border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>What IS Covered (100% Free Replacement)</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Invalid Credentials on First Login:</strong> Incorrect password or username typos in the delivered text file.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Disabled / Suspended State on Delivery:</strong> Account was flagged by Google algorithms prior to buyer initial login.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Immediate Phone Checkpoint:</strong> Prompting for an unverified phone number upon first access with recommended clean residential IP.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Batch Specification Mismatch:</strong> Delivered batch does not match the age, country, or 2FA parameters ordered.</span>
                </li>
              </ul>
            </div>

            {/* What is NOT Covered */}
            <div className="bg-white rounded-2xl border border-rose-200 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2.5 text-rose-700 font-bold text-base mb-4 pb-3 border-b border-rose-100">
                <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>What is NOT Covered (User-Induced Triggers)</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Datacenter / Public VPN IP Burns:</strong> Logging in through blacklisted free VPNs or shared server IP addresses that trigger Google security blocks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Mass Blast Without Warm-Up:</strong> Sending hundreds of cold emails immediately on day 1 without gradual warm-up ramps.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Aggressive Automated Scraping / Bot Abuse:</strong> Running high-velocity headless scripts without fingerprint protection.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Claims After 7 Days:</strong> Replacement requests submitted beyond the 7-day warranty period.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How to Claim Replacement Step by Step */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                !
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                How to Claim a Free Replacement (3 Simple Steps)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">1</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Locate Your Order ID</h3>
                <p className="text-xs text-slate-600">
                  Find your Order Reference ID or cryptocurrency transaction hash (TXID) from your purchase confirmation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">2</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Take a Screenshot</h3>
                <p className="text-xs text-slate-600">
                  Capture a clean screenshot of the Google login error screen or password prompt showing the affected address.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">3</div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Contact Live Support</h3>
                <p className="text-xs text-slate-600">
                  Send details to our Telegram or WhatsApp desk. Our dispatch agent will verify and issue fresh replacements.
                </p>
              </div>
            </div>
          </article>

          {/* Best Practices for Account Longevity */}
          <article className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-600">
                <Flame className="w-5 h-5" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-950">
                Longevity &amp; Safe Operational Protocols
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              To ensure your Gmail accounts remain active for months or years without checkpoints, follow these 3 professional agency protocols:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-900">
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <span>Anti-Detect Browser</span>
                </div>
                <p className="text-xs text-slate-600">
                  Use tools like AdsPower, Dolphin{'{anty}'}, or Multilogin with isolated browser fingerprints per profile.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-900">
                  <KeyRound className="w-4 h-4 text-emerald-600" />
                  <span>Clean Residential IPs</span>
                </div>
                <p className="text-xs text-slate-600">
                  Always connect through clean static residential or mobile 4G/5G proxies matching the account's target geography.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-900">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>Gradual Warm-Up Ramp</span>
                </div>
                <p className="text-xs text-slate-600">
                  Start with 5–10 emails/day during the first week and gradually scale volume over 14–21 days.
                </p>
              </div>
            </div>
          </article>

          {/* Live Support Help Card */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Need to Submit a Warranty Claim?</h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Our support agents are available 24/7. Have your order details ready for instantaneous replacement processing.
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
                <span>Claim on Telegram</span>
              </a>
              <a 
                href="https://wa.me/12534080049" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Claim on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
