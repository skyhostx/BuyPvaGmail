import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Check, 
  Copy, 
  Layers, 
  Terminal, 
  Smartphone, 
  Globe, 
  Star, 
  HelpCircle, 
  Clock, 
  Mail, 
  Lock, 
  Cpu, 
  Download, 
  ArrowRight, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Server,
  Key,
  Shield,
  ThumbsUp,
  TrendingUp,
  Award
} from 'lucide-react';
import { DetailedServiceInfo } from '../data/servicesData';
import { ProductVariant, ServiceProduct } from '../types';

interface ProductRelatedContentProps {
  service: DetailedServiceInfo;
  selectedVariantId: string;
  onSelectVariant: (variantId: string) => void;
  onQuickBuyVariant: (variant: ProductVariant, quantity: number) => void;
  onAddToCartVariant: (variant: ProductVariant, quantity: number) => void;
}

export const ProductRelatedContent: React.FC<ProductRelatedContentProps> = ({
  service,
  selectedVariantId,
  onSelectVariant,
  onQuickBuyVariant,
  onAddToCartVariant
}) => {
  const [activeImportTab, setActiveImportTab] = useState<'instantly' | 'smartlead' | 'adspower' | '2fa'>('instantly');
  const [copiedFormat, setCopiedFormat] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [downloadedSample, setDownloadedSample] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const isSmtp = service.category === 'smtp';
  const variants = service.variants && service.variants.length > 0 ? service.variants : [];

  // Deliverability ROI Calculator State
  const [targetLeadsPerMonth, setTargetLeadsPerMonth] = useState<number>(10000);
  const sendsPerInboxPerDay = 35;
  const workingDaysPerMonth = 22;
  const sendsPerInboxPerMonth = sendsPerInboxPerDay * workingDaysPerMonth; // 770 emails
  const inboxesNeeded = Math.max(2, Math.ceil(targetLeadsPerMonth / sendsPerInboxPerMonth));
  const estimatedBuyPvaCost = +(inboxesNeeded * (variants[0]?.unitPrice || service.unitPrice)).toFixed(2);
  const googleWorkspaceDirectMonthly = inboxesNeeded * 6; // $6/month per user
  const ninetyDaySavings = Math.max(0, (googleWorkspaceDirectMonthly * 3) - estimatedBuyPvaCost);
  const estimatedOpenRate = '71.5%';
  const estimatedReplies = Math.round(targetLeadsPerMonth * 0.048); // ~4.8% reply rate
  const estimatedBookedCalls = Math.round(estimatedReplies * 0.22); // ~22% conversion to booked demo

  const handleDownloadSampleFile = (type: 'txt' | 'csv') => {
    let content = '';
    let filename = '';
    if (type === 'txt') {
      content = `# BuyPvaGmail - Verified Sample Delivery File (${service.name})
# Format: email : password : recovery_email : 2fa_secret_key : carrier_geo : app_password
alex.turner.sales88@gmail.com : P@ssw0rd994! : recov.alex88@outlook.com : JBSWY3DPEHPK3PXP : US_Residential_Comcast : abcd efgh ijkl mnop
sarah.connor.b2b@gmail.com : Secure#Vance2025 : recov.sarahb2b@mail.com : HXDMVJECJJW9WGXY : US_Residential_Spectrum : qrst uvwx yzab cdef
david.kim.leads@gmail.com : Alpha#992178! : recov.davidkim@proton.me : KBCWYZD2EH9K3PX2 : US_Residential_ATT : ijkl mnop qrst uvwx
`;
      filename = `buypvagmail_sample_${service.id}.txt`;
    } else {
      content = `Email,Password,First Name,Last Name,Recovery Email,2FA Secret Key,App Password,IMAP Host,IMAP Port,SMTP Host,SMTP Port
alex.turner.sales88@gmail.com,P@ssw0rd994!,Alex,Turner,recov.alex88@outlook.com,JBSWY3DPEHPK3PXP,abcd efgh ijkl mnop,imap.gmail.com,993,smtp.gmail.com,465
sarah.connor.b2b@gmail.com,Secure#Vance2025,Sarah,Connor,recov.sarahb2b@mail.com,HXDMVJECJJW9WGXY,qrst uvwx yzab cdef,imap.gmail.com,993,smtp.gmail.com,465
david.kim.leads@gmail.com,Alpha#992178!,David,Kim,recov.davidkim@proton.me,KBCWYZD2EH9K3PX2,ijkl mnop qrst uvwx,imap.gmail.com,993,smtp.gmail.com,465
`;
      filename = `buypvagmail_sample_${service.id}.csv`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedSample(type);
    setTimeout(() => setDownloadedSample(null), 2500);
  };

  const handleCopyFormat = () => {
    navigator.clipboard.writeText(service.sampleFormat);
    setCopiedFormat(true);
    setTimeout(() => setCopiedFormat(false), 2000);
  };

  const getImportSnippet = () => {
    switch (activeImportTab) {
      case 'instantly':
        return `// Instantly.ai Bulk Account Upload Format (.CSV)
Email,Password,First Name,Last Name,Recovery Email,Custom IMAP Host,IMAP Port,IMAP Username,IMAP Password,Custom SMTP Host,SMTP Port,SMTP Username,SMTP Password
user1@gmail.com,Pass#9921,John,Doe,recov1@outlook.com,imap.gmail.com,993,user1@gmail.com,abcd efgh ijkl mnop,smtp.gmail.com,465,user1@gmail.com,abcd efgh ijkl mnop
user2@gmail.com,Pass#9922,Sarah,Connor,recov2@outlook.com,imap.gmail.com,993,user2@gmail.com,qrst uvwx yzab cdef,smtp.gmail.com,465,user2@gmail.com,qrst uvwx yzab cdef`;
      case 'smartlead':
        return `// Smartlead.ai CSV Bulk Upload Format
Email,Password,First Name,Last Name,IMAP Host,IMAP Port,IMAP SSL,SMTP Host,SMTP Port,SMTP SSL,App Password
user1@gmail.com,Pass#9921,John,Doe,imap.gmail.com,993,true,smtp.gmail.com,465,true,abcd efgh ijkl mnop
user2@gmail.com,Pass#9922,Sarah,Connor,imap.gmail.com,993,true,smtp.gmail.com,465,true,qrst uvwx yzab cdef`;
      case 'adspower':
        return `// AdsPower / Dolphin{anty} Browser Profile Import
profile_name: ${service.name} - Profile 01
browser_kernel: Chrome 130+ (Matching UserAgent)
proxy_type: HTTP / SOCKS5
proxy_host: your-residential-proxy.ip:port:username:password
cookies_import: [{"domain":".google.com","name":"SID","value":"..."},{"domain":".google.com","name":"HSID","value":"..."}]
canvas_fingerprint: Noise
webrtc: Alter (Match Public Proxy IP)`;
      case '2fa':
        return `// RFC 6238 TOTP 2FA Secret Key Authentication
Algorithm: SHA-1 (Standard RFC 6238)
Period: 30 Seconds
Digits: 6-Digits
Example Secret: JBSWY3DPEHPK3PXP
Usage: Paste this secret key directly into Google Authenticator, 1Password, Bitwarden, or 2FA CLI to generate 6-digit codes on demand without requiring SMS.`;
      default:
        return '';
    }
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(getImportSnippet());
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  // Product specific FAQs
  const productFaqs = [
    {
      q: `Will these ${service.name} ask for SMS phone verification when I first log in?`,
      a: `No! Every account is 100% verified using real physical carrier SIM cards (Non-VoIP) and configured with a recovery email. When logging in with a clean residential proxy or matching country IP, you will experience a seamless login. If Google asks for a checkpoint, simply select "Confirm your recovery email" and enter the recovery address included with your order.`
    },
    {
      q: `What proxies or browser environments are recommended for ${service.name}?`,
      a: `We recommend static residential ISP proxies (e.g., BrightData, IPRoyal, Oxylabs, Smartproxy) and top antidetect browsers such as AdsPower, Dolphin{anty}, Multilogin, or GoLogin. Always match the proxy location to the account country (${service.country}).`
    },
    {
      q: `Can I use these accounts with cold email tools like Instantly.ai and Smartlead.ai?`,
      a: `Yes! These accounts are specifically engineered for cold outreach. Every account comes with 2FA / App Password access enabled, allowing you to connect them directly to Instantly, Smartlead, Lemlist, or Woodpecker via IMAP/SMTP in less than 60 seconds.`
    },
    {
      q: `How does the 7-Day Replacement Guarantee work?`,
      a: `We provide a 100% replacement warranty for 7 days. If any account has invalid credentials, is disabled upon delivery, or asks for unexpected phone verification upon initial clean IP login, contact our 24/7 Telegram or Live Support for an instant free replacement.`
    },
    {
      q: `Do I get full administrative ownership of the accounts?`,
      a: `Yes, 100%! You receive complete ownership. Once delivered, credentials are deleted from our distribution servers. You can change passwords, update recovery emails, generate new app passwords, or modify security settings whenever you wish.`
    },
    {
      q: `What is the delivery file format and how quickly will I receive my accounts?`,
      a: `Delivery is fully automated and takes less than 60 seconds after crypto or gateway confirmation. Your accounts are instantly shown on screen and emailed to you in clean, standardized .TXT and .CSV formats containing username, password, recovery email, 2FA secret key, and user agent.`
    }
  ];

  // Specific customer reviews for this service
  const productReviews = [
    {
      name: 'Alexander Reed',
      role: 'Founder & CEO',
      company: 'OmniGrowth Outreach Agency',
      rating: 5,
      date: '2 days ago',
      verified: true,
      text: `Purchased a 50-pack of ${service.name}. Imported them straight into Smartlead with 2FA app passwords. Zero logins blocked, inbox placement sits at 99.4% after 3 weeks of warmup. Hands down the highest quality supplier online.`,
      highlight: '99.4% Inbox Placement'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Media Buying',
      company: 'Apex Digital Labs',
      rating: 5,
      date: '5 days ago',
      verified: true,
      text: `The residential IP creation and non-VoIP carrier verification makes all the difference. Other vendors sell recycled numbers that lock up after 48 hours. BuyPvaGmail accounts stay solid permanently.`,
      highlight: 'Real Carrier SIMs'
    },
    {
      name: 'Marcus Thorne',
      role: 'Senior Growth Engineer',
      company: 'LeadVanguard Solutions',
      rating: 5,
      date: '1 week ago',
      verified: true,
      text: `Clean CSV file delivery, instant Telegram support when I had a question on 2FA secret keys, and replacement rate is literally zero across our last 300 accounts. You guys are our permanent agency vendor.`,
      highlight: 'Zero Replacement Rate'
    }
  ];

  return (
    <div className="space-y-14 pt-4">

      {/* 1. Product Variants Side-by-Side Comparison Matrix */}
      {variants.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                  Side-by-Side Analysis
                </span>
                <span className="text-xs text-slate-400 font-semibold">• {variants.length} Available Tiers</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Compare {service.name} Variants
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Review technical differences, carrier verification, deliverability rates, and select the optimal tier for your volume.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl shrink-0">
              Selected: <span className="font-bold text-blue-600">{variants.find(v => v.id === selectedVariantId)?.name || 'Default Tier'}</span>
            </div>
          </div>

          {/* Variants Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px] bg-slate-50/70">
                  <th className="py-3.5 px-4 rounded-l-xl">Variant Tier</th>
                  <th className="py-3.5 px-4">Carrier / Verification</th>
                  <th className="py-3.5 px-4">IP Subnet &amp; Geo</th>
                  <th className="py-3.5 px-4">Trust &amp; Inbox Rate</th>
                  <th className="py-3.5 px-4">Best Intended Use</th>
                  <th className="py-3.5 px-4">Rate</th>
                  <th className="py-3.5 px-4 text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {variants.map((v) => {
                  const isSelected = v.id === selectedVariantId;
                  return (
                    <tr 
                      key={v.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-blue-50/50 font-semibold' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectVariant(v.id)}
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                              isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </button>
                          <div>
                            <span className="font-bold text-slate-900 block text-sm">
                              {v.name}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {v.badge && (
                                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                                  {v.badge}
                                </span>
                              )}
                              <span className="text-[11px] text-slate-400">
                                {v.inStock.toLocaleString()} in stock
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <span className="font-semibold text-slate-900 block">{v.specs?.carrier || service.specs.phoneType}</span>
                        <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Non-VoIP SIM
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-700">
                        <span className="font-semibold text-slate-900 block">{v.specs?.ipOrigin || service.specs.ipOrigin}</span>
                        <span className="text-[11px] text-slate-400">{v.specs?.age || service.age}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold text-[11px]">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          {v.specs?.trustScore || '98.5%'} ({v.specs?.deliverability || 'Top Tier'})
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600 max-w-[200px]">
                        <p className="line-clamp-2 text-[11px] leading-relaxed">
                          {v.description}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-base font-black text-slate-900 block">
                          ${v.unitPrice.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          / {isSmtp ? 'account' : 'pc'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectVariant(v.id);
                              window.scrollTo({ top: 180, behavior: 'smooth' });
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </button>
                          <button
                            type="button"
                            onClick={() => onQuickBuyVariant(v, service.baseQuantity)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                            title="Instant Order with this variant"
                          >
                            <Zap className="w-3 h-3 fill-current text-amber-300" />
                            <span>Order</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Interactive Credentials Decoder & Antidetect Tool Import Snippets */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                Credentials &amp; Delivery Format
              </span>
              <span className="text-xs text-slate-400 font-semibold">• 1-Click Import Ready</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Delivered File Structure &amp; Import Guides
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Every order arrives in standardized text and CSV files with all 6 security components decoded.
            </p>
          </div>

          <button
            onClick={handleCopyFormat}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            {copiedFormat ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedFormat ? 'Format Copied!' : 'Copy Sample Format'}</span>
          </button>
        </div>

        {/* Visual Credentials Decoder */}
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-slate-600 block mb-3">
            Delivered Credential Elements (Field-by-Field Breakdown):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Field 1</span>
              <span className="text-xs font-black text-blue-600 block">Email Address</span>
              <span className="text-[10px] text-slate-500 truncate block mt-0.5">name@gmail.com</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Field 2</span>
              <span className="text-xs font-black text-indigo-600 block">Secure Password</span>
              <span className="text-[10px] text-slate-500 truncate block mt-0.5">Randomized Alpha+Sym</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Field 3</span>
              <span className="text-xs font-black text-emerald-600 block">Recovery Email</span>
              <span className="text-[10px] text-slate-500 truncate block mt-0.5">Pre-configured Inbox</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Field 4</span>
              <span className="text-xs font-black text-amber-600 block">2FA Secret Key</span>
              <span className="text-[10px] text-slate-500 truncate block mt-0.5">RFC 6238 TOTP Key</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Field 5</span>
              <span className="text-xs font-black text-purple-600 block">IP Geo &amp; Carrier</span>
              <span className="text-[10px] text-slate-500 truncate block mt-0.5">ISP / Country Origin</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Field 6</span>
              <span className="text-xs font-black text-rose-600 block">App Password / JSON</span>
              <span className="text-[10px] text-slate-500 truncate block mt-0.5">16-char IMAP / SMTP</span>
            </div>
          </div>
        </div>

        {/* Tabbed Tool Import Configuration */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              One-Click Integration Format Snippets:
            </span>
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveImportTab('instantly')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeImportTab === 'instantly' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Instantly.ai
              </button>
              <button
                type="button"
                onClick={() => setActiveImportTab('smartlead')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeImportTab === 'smartlead' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Smartlead.ai
              </button>
              <button
                type="button"
                onClick={() => setActiveImportTab('adspower')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeImportTab === 'adspower' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                AdsPower / Antidetect
              </button>
              <button
                type="button"
                onClick={() => setActiveImportTab('2fa')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeImportTab === '2fa' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2FA TOTP Guide
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl bg-slate-900 text-slate-200 p-4 font-mono text-xs overflow-x-auto shadow-inner">
            <button
              onClick={handleCopySnippet}
              className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-sans font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
            >
              {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSnippet ? 'Copied' : 'Copy Code'}</span>
            </button>
            <pre className="text-emerald-400 leading-relaxed whitespace-pre pr-20">
              {getImportSnippet()}
            </pre>
          </div>

          {/* Downloadable Sample Files Preview Bar */}
          <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  Download Sample Test Files Before Ordering
                </span>
                <span className="text-[11px] text-slate-500">
                  Verify compatibility directly with your cold outreach tool or antidetect browser.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleDownloadSampleFile('txt')}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                {downloadedSample === 'txt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5 text-slate-500" />}
                <span>{downloadedSample === 'txt' ? 'Downloaded .TXT' : 'Download Sample .TXT'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownloadSampleFile('csv')}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                {downloadedSample === 'csv' ? <Check className="w-3.5 h-3.5 text-white" /> : <Download className="w-3.5 h-3.5 text-blue-200" />}
                <span>{downloadedSample === 'csv' ? 'Downloaded .CSV' : 'Download Sample .CSV'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 Deliverability ROI & Volume Scaling Calculator */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-900/50">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
              Agency Cost &amp; Deliverability ROI Calculator
            </span>
            <span className="text-xs text-slate-400 font-semibold">• B2B Cold Outreach Projections</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            How Many Inboxes Do You Need for Your Target Volume?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate your infrastructure requirements based on industry best practices of 30–35 emails/day per inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span>Target Monthly Cold Prospects:</span>
                <span className="text-lg font-black text-amber-400">
                  {targetLeadsPerMonth.toLocaleString()} Prospects / Mo
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={targetLeadsPerMonth}
                onChange={(e) => setTargetLeadsPerMonth(parseInt(e.target.value) || 2000)}
                className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
                <span>2,000 / mo</span>
                <span>15,000 / mo</span>
                <span>30,000 / mo</span>
                <span>50,000 / mo</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[5000, 10000, 20000, 35000, 50000].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTargetLeadsPerMonth(val)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    targetLeadsPerMonth === val
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  {val.toLocaleString()} Leads
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Inboxes Required</span>
                <span className="text-2xl font-black text-white">{inboxesNeeded} Accounts</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">@ 35 sends / day</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Est. Positive Replies</span>
                <span className="text-2xl font-black text-emerald-400">{estimatedReplies} Replies</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">~4.8% reply benchmark</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Booked Demos</span>
                <span className="text-2xl font-black text-amber-400">~{estimatedBookedCalls} Meetings</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">High intent prospects</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                90-Day Cost Comparison
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-400">
                  Save ${ninetyDaySavings.toFixed(0)}
                </span>
                <span className="text-xs text-slate-300">vs Google Workspace</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                Google Workspace charges <span className="font-bold text-white">${(googleWorkspaceDirectMonthly * 3).toFixed(0)}</span> for {inboxesNeeded} seats over 90 days. BuyPvaGmail accounts cost just <span className="font-bold text-amber-300">${estimatedBuyPvaCost.toFixed(2)}</span> total.
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">BuyPvaGmail Investment:</span>
                <span className="font-bold text-white">${estimatedBuyPvaCost.toFixed(2)} one-time</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Inbox Placement Benchmark:</span>
                <span className="font-bold text-emerald-400">{estimatedOpenRate} Primary Inbox</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Monthly Recurring Cost:</span>
                <span className="font-bold text-emerald-400">$0.00 / month</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const activeTier = variants.find(v => v.id === selectedVariantId) || variants[0];
                if (activeTier) {
                  onQuickBuyVariant(activeTier, inboxesNeeded);
                }
              }}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
              <span>Order Infrastructure for {targetLeadsPerMonth.toLocaleString()} Leads (${estimatedBuyPvaCost.toFixed(2)})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2.7 Automated Pre-Delivery Quality Inspection Report */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                Automated Quality Control
              </span>
              <span className="text-xs text-slate-400 font-semibold">• 7-Point Pre-Dispatch Audit</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Pre-Delivery Account Health Benchmark
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Every batch undergoes rigorous automated test passes before being approved for instant client dispatch.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-2xl text-emerald-700 text-xs font-bold shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Quality Pass Rate</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-900">Google Security Pass</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">PASSED</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              0 security flags, 0 suspicious logins, and clean 2FA TOTP secret key authorization active.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-900">Physical Carrier SIM</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">VERIFIED</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Verified with Tier 1 non-VoIP physical mobile lines. 100% immune to virtual number recycling.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-900">Clean Residential IP</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">CLEAN</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Registered on Comcast, Spectrum, AT&amp;T subnets. 0 Spamhaus, Sorbs, or DNSBL listings.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-slate-900">IMAP / App Passwords</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">ENABLED</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Pre-configured 16-character Google App Passwords ready for instant Instantly &amp; Smartlead sync.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Account Quality & Anti-Ban Architecture (6 Pillars) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Quality Assurance Standard
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            The 6 Pillars of {service.name} Security
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Why professional agencies, growth hackers, and media buyers choose BuyPvaGmail over cheap marketplace accounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              1. 100% Real Physical Mobile SIMs
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We strictly verify accounts using non-VoIP physical carrier SIM cards (AT&amp;T, Verizon, T-Mobile, Vodafone). Never virtual or recycled VoIP lines, eliminating re-verification locks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              2. Clean Residential ISP Footprint
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Created on dedicated residential ISP subnets (Comcast, Spectrum, AT&amp;T) with clean IP telemetry and zero blacklist listings on Spamhaus, Sorbs, or Google Postmaster.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              3. Organic Browsing History &amp; Cookies
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every account includes natural YouTube viewing history, Google searches, and newsletter confirmations, giving Google AI algorithms positive behavioral signals.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              4. RFC 6238 TOTP 2FA Authentication
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Two-Factor Authentication is pre-configured with a universal secret key. Generate 6-digit codes on demand in Google Authenticator or Bitwarden without ever needing SMS access.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
              <Key className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              5. 100% Private Single-Tenant Handover
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Single-owner delivery guarantee. Account credentials are permanently expunged from our internal dispatch caches post-delivery and are never recycled or resold to third parties.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              6. 7-Day Free Replacement Guarantee
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete peace of mind. In the rare event an account fails to log in, shows invalid credentials, or triggers a checkpoint upon first clean login, we replace it instantly for free.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Proven Account Warmup SOP Roadmap (4-Phase Blueprint) */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/20">
            Outreach Best Practice Standard
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-2 text-white">
            4-Phase Warmup Protocol for {service.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Follow this battle-tested agency SOP to achieve 99%+ deliverability and keep accounts alive indefinitely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300">Phase 1</span>
                <span className="text-[11px] font-bold text-slate-400">Days 1–3</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Arrival &amp; Session Cooldown</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Login with matching residential proxy</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Inspect Google settings &amp; watch 1 YouTube video</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero outbound cold emails during cooldown</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-amber-300 font-bold">
              Target: 0 Emails / Day
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-blue-300">Phase 2</span>
                <span className="text-[11px] font-bold text-slate-400">Days 4–7</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Gentle Warmup Pool</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Connect to Instantly or Smartlead via IMAP</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Set warmup volume: 3 to 7 emails/day</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Enable 80% automated reply rate</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-blue-300 font-bold">
              Target: 3–7 Warmup / Day
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300">Phase 3</span>
                <span className="text-[11px] font-bold text-slate-400">Days 8–14</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Progressive Ramp-Up</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Increase warmup slowly by 2–3 per day</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Begin 5 live outbound prospect tests</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Monitor Google Postmaster &amp; spam folder</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-emerald-300 font-bold">
              Target: 15–20 Emails / Day
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-purple-300">Phase 4</span>
                <span className="text-[11px] font-bold text-slate-400">Day 15+</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-2">Full Scale Outreach</h4>
              <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Scale to 35–50 outbound emails / day</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Maintain 10–15 warmup emails in background</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Enjoy 99.4%+ verified inbox placement</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-purple-300 font-bold">
              Target: 35–50 Emails / Day
            </div>
          </div>
        </div>
      </div>

      {/* 5. Tool & Software Compatibility Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                100% Verified Compatible
              </span>
              <span className="text-xs text-slate-400 font-semibold">• Multi-Platform Certified</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Tested Compatibility Across Modern Toolstacks
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All accounts have been benchmarked with industry-standard antidetect browsers and outreach suites.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Instantly.ai', category: 'Cold Outreach', status: '100% Tested' },
            { name: 'Smartlead.ai', category: 'Cold Outreach', status: '100% Tested' },
            { name: 'Lemlist', category: 'Sales Automation', status: '100% Tested' },
            { name: 'Woodpecker', category: 'B2B Emailing', status: '100% Tested' },
            { name: 'AdsPower', category: 'Anti-Detect', status: '100% Tested' },
            { name: 'Dolphin{anty}', category: 'Anti-Detect', status: '100% Tested' },
            { name: 'Multilogin', category: 'Browser Profiler', status: '100% Tested' },
            { name: 'GoLogin', category: 'Browser Profiler', status: '100% Tested' },
            { name: 'Google Ads', category: 'PPC Advertising', status: '100% Tested' },
            { name: 'Local Guides', category: 'Google Maps', status: '100% Tested' },
            { name: 'Puppeteer / QA', category: 'Script Automation', status: '100% Tested' },
            { name: 'Octoparse', category: 'Data Scraping', status: '100% Tested' }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {item.category}
                </span>
                <span className="text-xs font-black text-slate-900 block mt-0.5">
                  {item.name}
                </span>
              </div>
              <div className="mt-2.5 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 w-fit">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5.2 The 5-Step Rapid Onboarding Flow */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
            Speed to Value
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            From Order to Outreach in 5 Minutes
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Our automated dispatch pipeline delivers your credentials within 60 seconds with zero manual wait times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center mb-3">
                1
              </div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Select Tier or Quantity</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Choose any pre-configured package or dial in your custom volume.
              </p>
            </div>
            <span className="text-[10px] text-blue-600 font-bold block mt-3">Step 1 • 15 Seconds</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center mb-3">
                2
              </div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Instant Payment</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Pay with any crypto (USDT, BTC, ETH, SOL) with 1-confirmation auto-receipt.
              </p>
            </div>
            <span className="text-[10px] text-indigo-600 font-bold block mt-3">Step 2 • 30 Seconds</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center mb-3">
                3
              </div>
              <h4 className="text-xs font-black text-slate-900 mb-1">Auto-Dispatch</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Credentials render instantly on screen and arrive in your email as TXT/CSV.
              </p>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold block mt-3">Step 3 • &lt; 60 Seconds</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center mb-3">
                4
              </div>
              <h4 className="text-xs font-black text-slate-900 mb-1">1-Click Tool Import</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Upload CSV directly into Smartlead, Instantly, or your antidetect browser.
              </p>
            </div>
            <span className="text-[10px] text-purple-600 font-bold block mt-3">Step 4 • 2 Minutes</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white font-black text-xs flex items-center justify-center mb-3">
                5
              </div>
              <h4 className="text-xs font-black text-slate-900 mb-1">7-Day Warranty Live</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Warranty automatically begins. 24/7 Telegram &amp; Live Chat replacement guarantee.
              </p>
            </div>
            <span className="text-[10px] text-amber-600 font-bold block mt-3">Step 5 • 7 Days Active</span>
          </div>
        </div>
      </div>

      {/* 5.5 Side-by-Side Industry Comparison */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
            Market Comparison
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            How BuyPvaGmail Compares to Market Alternatives
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Understanding the real cost and risk differences between verified PVA suppliers, cheap marketplaces, and direct Google Workspace billing.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px] bg-slate-50/70">
                <th className="py-3.5 px-4 rounded-l-xl">Feature / Standard</th>
                <th className="py-3.5 px-4 text-blue-600 bg-blue-50/80 font-black">BuyPvaGmail</th>
                <th className="py-3.5 px-4 text-slate-500">Marketplace Sellers (Fiverr/Forums)</th>
                <th className="py-3.5 px-4 text-slate-500 rounded-r-xl">Google Workspace Direct</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Phone Verification Method</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/30 font-bold">100% Real Physical SIM (Non-VoIP)</td>
                <td className="py-3.5 px-4 text-rose-600">Cheap Recycled VoIP Numbers (Twilio/TextNow)</td>
                <td className="py-3.5 px-4 text-slate-600">Requires User's Own Phone Number</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">IP Subnet Registration</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/30 font-bold">Clean Tier-1 Residential ISP Subnets</td>
                <td className="py-3.5 px-4 text-rose-600">Dirty Datacenter Proxies (Flagged Subnets)</td>
                <td className="py-3.5 px-4 text-slate-600">Corporate Domain MX Records</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">2FA Secret Key + App Passwords</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/30 font-bold">Included &amp; Ready for SMTP/IMAP</td>
                <td className="py-3.5 px-4 text-rose-600">Rarely Included (Locks out on 2nd login)</td>
                <td className="py-3.5 px-4 text-slate-600">Requires Manual Admin Console Setup</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Average Inbox Placement</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/30 font-bold">99.2% – 99.8% (Warmup Ready)</td>
                <td className="py-3.5 px-4 text-rose-600">45% – 60% (High Spam Rates)</td>
                <td className="py-3.5 px-4 text-slate-600">95% – 98% (Requires 3+ weeks warmup)</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Replacement Policy</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/30 font-bold">7-Day Free Instant Replacement</td>
                <td className="py-3.5 px-4 text-rose-600">24-Hour or No Warranty</td>
                <td className="py-3.5 px-4 text-slate-600">Non-Refundable Subscription</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Cost Structure</td>
                <td className="py-3.5 px-4 text-emerald-700 bg-blue-50/30 font-bold">From $1.50 – $3.00 One-Time</td>
                <td className="py-3.5 px-4 text-slate-700">$0.80 – $2.00 (High burn &amp; replace rate)</td>
                <td className="py-3.5 px-4 text-slate-700">$6.00 to $18.00 / User / Month recurring</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5.8 Anti-Detect Browser Profile Config Presets */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
            Browser Profile Blueprint
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Recommended Antidetect Browser Configuration
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standard profile parameter matrix to avoid Google fingerprint checkpoints when managing multi-account fleets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Canvas &amp; WebGL</span>
            <span className="text-[11px] text-emerald-600 font-bold block mb-1">Mode: Noise</span>
            <p className="text-[11px] text-slate-500">
              Apply subtle statistical noise to canvas hashes so every profile looks like a unique physical GPU.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">WebRTC &amp; IP Geolocation</span>
            <span className="text-[11px] text-emerald-600 font-bold block mb-1">Mode: Alter / Match Proxy</span>
            <p className="text-[11px] text-slate-500">
              Never disable WebRTC. Instead, set WebRTC to replace public IP with your residential proxy IP.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Timezone &amp; Language</span>
            <span className="text-[11px] text-emerald-600 font-bold block mb-1">Mode: Auto-Fill via Proxy</span>
            <p className="text-[11px] text-slate-500">
              Match browser locale (`en-US` for USA) and timezone offset to the external IP exit location.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">AudioContext &amp; Hardware</span>
            <span className="text-[11px] text-emerald-600 font-bold block mb-1">Mode: Noise / Real Cores</span>
            <p className="text-[11px] text-slate-500">
              Set CPU concurrency to 4, 8, or 16 cores and memory to 8GB or 16GB for typical consumer laptops.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Product-Specific Verified Buyer Reviews */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                Verified Buyer Feedback
              </span>
              <span className="text-xs text-slate-400 font-semibold">• {service.reviewsCount} Total Reviews</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Customer Feedback for {service.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              See what agencies and media buyers say after testing our {service.name}.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-amber-50/70 border border-amber-200/70 p-3 rounded-2xl shrink-0">
            <div className="text-amber-500 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div>
              <span className="text-sm font-black text-slate-900 block leading-tight">{service.rating} / 5.0</span>
              <span className="text-[10px] text-slate-500 font-bold">100% Verified Orders</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {productReviews.map((rev, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{rev.date}</span>
                </div>

                <span className="inline-block text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md mb-2">
                  {rev.highlight}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">{rev.name}</span>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.company}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Product-Specific Frequently Asked Questions Accordion */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
            Frequently Asked Questions
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Everything You Need to Know About {service.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Common questions regarding proxies, login procedures, deliverability, and replacements.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {productFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="mt-2.5 pl-6 text-xs text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. 24/7 Priority Support & Guarantee Notice */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
            <ShieldCheck className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              Zero Risk Guarantee
            </span>
            <h4 className="text-xl font-black text-white mt-0.5">
              Need Assistance or Custom Enterprise Volumes?
            </h4>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
              Our 24/7 dedicated support engineers are available on Telegram &amp; WhatsApp. We offer immediate replacements, custom geo allocations, and wholesale batch quotes.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href="https://t.me/buypvagmail"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-blue-700 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Chat on Telegram</span>
          </a>
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>
        </div>
      </div>

    </div>
  );
};
