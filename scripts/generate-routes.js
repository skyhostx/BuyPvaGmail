import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Please run vite build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('❌ dist/index.html not found.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf8');

// Core products definitions matching src/data/servicesData.ts
const products = [
  {
    slug: 'usa-gmail-accounts',
    name: 'USA PVA Gmail Accounts (Real Carrier SIM)',
    title: 'Buy USA PVA Gmail Accounts (Real US SIM Verified) | BuyPvaGmail',
    description: '100% US SIM-verified PVA Gmail accounts on clean residential IPs (Verizon, AT&T, T-Mobile). Includes 2FA secret key, recovery email, and 7-day replacement guarantee.',
    price: '3.00',
    minPrice: '3.00',
    maxPrice: '3.80',
    sku: 'BPG-USA-PVA-01',
    image: 'https://buypvagmail.com/images/products/usa-gmail-accounts.png',
    ratingValue: '4.95',
    reviewCount: '312'
  },
  {
    slug: 'pva-gmail-accounts',
    name: 'PVA Gmail Accounts (Global / Mixed)',
    title: 'Buy PVA Gmail Accounts (100% Phone Verified) | BuyPvaGmail',
    description: 'Global phone-verified PVA Gmail accounts created on unique residential IPs. Compatible with cold outreach, Instantly, Smartlead, and email marketing. Instant delivery.',
    price: '3.00',
    minPrice: '3.00',
    maxPrice: '3.50',
    sku: 'BPG-PVA-GLOBAL-02',
    image: 'https://buypvagmail.com/images/products/pva-gmail-accounts.png',
    ratingValue: '4.92',
    reviewCount: '284'
  },
  {
    slug: 'new-gmail-accounts',
    name: 'Fresh PVA Verified Gmail Accounts',
    title: 'Buy Fresh PVA Gmail Accounts (Brand New Verified) | BuyPvaGmail',
    description: 'Affordable, newly created phone-verified Gmail accounts on clean residential IP subnets. Perfect for standard outreach, social signups, and warmup sequences.',
    price: '1.50',
    minPrice: '1.50',
    maxPrice: '2.00',
    sku: 'BPG-FRESH-PVA-06',
    image: 'https://buypvagmail.com/images/products/new-gmail-accounts.png',
    ratingValue: '4.88',
    reviewCount: '215'
  },
  {
    slug: 'aged-mix-country-gmail',
    name: 'Aged 2008–2025 Mix Country Gmail',
    title: 'Buy Aged Gmail Accounts (2008–2025 Old Accounts) | BuyPvaGmail',
    description: 'High-trust aged Gmail accounts created between 2008 and 2025. Bypass security checkpoints, maximum inbox deliverability, with full 2FA key and recovery email included.',
    price: '2.50',
    minPrice: '2.50',
    maxPrice: '48.00',
    sku: 'BPG-AGED-MIX-03',
    image: 'https://buypvagmail.com/images/products/aged-mix-country-gmail.png',
    ratingValue: '4.97',
    reviewCount: '460'
  },
  {
    slug: 'aged-gmail-for-reviews',
    name: 'Aged Gmail for Google Maps Reviews',
    title: 'Buy Aged Gmail for Google Maps Reviews (Local Guide) | BuyPvaGmail',
    description: 'Aged Gmail accounts optimized for Google Business Profile and Maps reviews. High stick rate, realistic user activity history, and geo-targeted residential IP setup.',
    price: '3.00',
    minPrice: '3.00',
    maxPrice: '4.50',
    sku: 'BPG-AGED-REVIEWS-04',
    image: 'https://buypvagmail.com/images/products/aged-gmail-for-reviews.png',
    ratingValue: '4.94',
    reviewCount: '198'
  },
  {
    slug: 'aged-gmail-for-google-ads',
    name: 'Aged Gmail for Google Ads & Media Buying',
    title: 'Buy Aged Gmail for Google Ads & Media Buying | BuyPvaGmail',
    description: 'High-trust aged accounts prepared for Google Ads campaigns, billing setup, and media buying. Reduces immediate suspension risk with aged historical trust score.',
    price: '5.00',
    minPrice: '5.00',
    maxPrice: '8.00',
    sku: 'BPG-AGED-ADS-05',
    image: 'https://buypvagmail.com/images/products/aged-gmail-for-google-ads.png',
    ratingValue: '4.91',
    reviewCount: '142'
  },
  {
    slug: 'smtp-mailgun-accounts',
    name: 'Buy SMTP Mailgun Accounts (50k-200k/mo)',
    title: 'Buy SMTP Mailgun Accounts (50k-200k/mo Warmed Limit) | BuyPvaGmail',
    description: 'Fully warmed Mailgun SMTP accounts with authentic DNS configuration (SPF, DKIM, DMARC, MX). Available in 50k, 100k, and 200k monthly sending limits.',
    price: '24.00',
    minPrice: '24.00',
    maxPrice: '60.00',
    sku: 'BPG-SMTP-MAILGUN-01',
    image: 'https://buypvagmail.com/images/products/smtp-mailgun-accounts.png',
    ratingValue: '4.96',
    reviewCount: '178'
  },
  {
    slug: 'smtp-brevo-accounts',
    name: 'Buy SMTP Brevo Accounts (50k-200k/mo)',
    title: 'Buy SMTP Brevo Accounts (50k-200k/mo Sending Limit) | BuyPvaGmail',
    description: 'Pre-activated Brevo (formerly Sendinblue) SMTP accounts ready for API and relay sending. High reputation sender score with dedicated IP routing.',
    price: '22.00',
    minPrice: '22.00',
    maxPrice: '55.00',
    sku: 'BPG-SMTP-BREVO-02',
    image: 'https://buypvagmail.com/images/products/smtp-brevo-accounts.png',
    ratingValue: '4.93',
    reviewCount: '142'
  },
  {
    slug: 'smtp-relay-services-account',
    name: 'Buy Dedicated SMTP Relay Services Account',
    title: 'Buy Dedicated SMTP Relay Services Account | BuyPvaGmail',
    description: 'Enterprise-grade dedicated SMTP relay service with custom rDNS, clean /24 IP blocks, and unrestricted high-volume transaction deliverability.',
    price: '28.00',
    minPrice: '28.00',
    maxPrice: '70.00',
    sku: 'BPG-SMTP-RELAY-03',
    image: 'https://buypvagmail.com/images/products/smtp-relay-services-account.png',
    ratingValue: '4.97',
    reviewCount: '119'
  }
];

// Blog articles matching src/data/blogData.ts
const blogArticles = [
  {
    slug: 'warming-up-aged-gmail-accounts-cold-outreach',
    title: 'Aged Gmail Warmup Protocol for Cold Outreach (14-Day SOP) | BuyPvaGmail',
    description: 'Step-by-step 14-day protocol to warm up aged Gmail accounts for high-volume cold outreach in Instantly and Smartlead without hitting spam filters or checkpoints.',
    category: 'Deliverability & Warmup SOP',
    datePublished: '2026-03-01'
  },
  {
    slug: 'safe-login-multiple-gmails-antidetect-browsers',
    title: 'How to Safely Manage Multiple Gmail Accounts (Anti-Detect SOP) | BuyPvaGmail',
    description: 'Complete guide to managing dozens of Gmail accounts using anti-detect browsers like AdsPower and Dolphin{anty} with dedicated residential proxies and unique browser fingerprints.',
    category: 'Security & Infrastructure',
    datePublished: '2026-02-25'
  },
  {
    slug: 'google-ads-aged-account-warmup-guide',
    title: 'Google Ads Account Setup & Warmup Guide for Media Buyers | BuyPvaGmail',
    description: 'How to warm up aged Gmail accounts for Google Ads and media buying. Avoid suspicious payment flags, build advertiser trust scores, and run campaigns smoothly.',
    category: 'PPC & Media Buying',
    datePublished: '2026-02-18'
  },
  {
    slug: 'google-maps-reviews-stick-strategy',
    title: 'Why Google Maps Reviews Drop and How to Make Them Stick | BuyPvaGmail',
    description: 'Technical analysis of Google Maps spam filter triggers and how aged Local Guide Gmail accounts with geo-targeted residential proxies prevent review drops.',
    category: 'Local SEO & Reputation',
    datePublished: '2026-02-10'
  },
  {
    slug: 'proxy-comparison-residential-vs-mobile-gmail',
    title: 'Proxy Comparison for Gmail: Residential vs Mobile vs Datacenter | BuyPvaGmail',
    description: 'In-depth comparison of proxy types for running PVA Gmail accounts. Understand ASN reputation, subnet bans, and how to choose the right proxy architecture.',
    category: 'Network & Proxies',
    datePublished: '2026-01-28'
  },
  {
    slug: 'gmail-credential-format-explained-2fa-recovery',
    title: 'Gmail Credential Formats Explained: 2FA TOTP & Recovery Access | BuyPvaGmail',
    description: 'Comprehensive guide to standard Gmail delivery formats (Email:Password:Recovery:2FA_Secret). Learn how to generate OTP codes and configure secure recovery.',
    category: 'Authentication & Security',
    datePublished: '2026-01-15'
  }
];

// Static informative pages
const staticPages = [
  {
    path: 'gmail',
    title: 'Verified PVA & Aged Gmail Accounts Catalog | BuyPvaGmail',
    description: 'Browse our complete catalog of phone-verified (PVA) and aged Gmail accounts (2008–2025). USA carrier SIM, global mixed, Google Ads, and Maps reviews profiles.',
    heading: 'Verified PVA & Aged Gmail Accounts Catalog',
    subheading: 'Explore our full inventory of verified carrier SIM and historical aged accounts with instant auto-dispatch and 7-day replacement warranty.'
  },
  {
    path: 'services',
    title: 'Verified PVA & Aged Gmail Accounts Catalog | BuyPvaGmail',
    description: 'Browse our complete catalog of phone-verified (PVA) and aged Gmail accounts (2008–2025). USA carrier SIM, global mixed, Google Ads, and Maps reviews profiles.',
    heading: 'Verified PVA & Aged Gmail Accounts Catalog',
    subheading: 'Explore our full inventory of verified carrier SIM and historical aged accounts with instant auto-dispatch and 7-day replacement warranty.'
  },
  {
    path: 'pricing',
    title: 'Wholesale Tiered Pricing for PVA & Aged Gmail | BuyPvaGmail',
    description: 'Transparent bulk pricing on phone-verified and aged Gmail accounts. Discounts for agencies, media buyers, and cold email outreach teams. From $1.50/account.',
    heading: 'Wholesale Tiered Pricing for PVA & Aged Accounts',
    subheading: 'Volume-based pricing tiers with instant crypto, card, and wire payment options for agencies and enterprises.'
  },
  {
    path: 'blog',
    title: 'Warmup SOPs, Deliverability & Agency Guides | BuyPvaGmail',
    description: 'Technical knowledge base and standard operating procedures for warming up Gmail accounts, anti-detect browser setup, cold email deliverability, and proxy management.',
    heading: 'Knowledge Base & Technical Warmup Guides',
    subheading: 'In-depth SOPs and operational playbooks to protect your accounts and maximize inbox deliverability.'
  },
  {
    path: 'faq',
    title: 'Frequently Asked Questions (FAQ) | BuyPvaGmail',
    description: 'Answers to common questions about buying PVA and aged Gmail accounts, payment methods, delivery times, proxy requirements, and 7-day replacement warranty.',
    heading: 'Frequently Asked Questions',
    subheading: 'Everything you need to know about purchasing, account credentials, delivery speed, and 7-day warranty support.'
  },
  {
    path: 'about',
    title: 'About BuyPvaGmail - Direct Supplier of Verified Accounts | BuyPvaGmail',
    description: 'Learn about BuyPvaGmail, the industry-trusted direct supplier of verified PVA and historical aged Gmail accounts for agencies, marketers, and enterprises worldwide.',
    heading: 'About BuyPvaGmail',
    subheading: 'Direct infrastructure supplier providing genuine phone-verified and historical aged accounts with zero middleman markups.'
  },
  {
    path: 'contact',
    title: '24/7 Customer Support & Live Desk | BuyPvaGmail',
    description: 'Need help with your Gmail account order? Contact BuyPvaGmail 24/7 via Telegram @BuyPvaGmail or WhatsApp +1-253-408-0049 for instant assistance.',
    heading: '24/7 Customer Support & Live Assistance',
    subheading: 'Our dedicated support engineers are available round the clock on Telegram and WhatsApp.'
  },
  {
    path: 'warranty',
    title: '7-Day Free Replacement Warranty Policy | BuyPvaGmail',
    description: 'Read our comprehensive 7-day replacement warranty policy. Free 1-to-1 account replacement for login checkpoints or disabled flags within 7 days of purchase.',
    heading: '7-Day 1-to-1 Free Replacement Warranty',
    subheading: 'Complete peace of mind: every single account delivered is backed by our unconditional 7-day replacement guarantee.'
  },
  {
    path: 'sitemap',
    title: 'HTML Sitemap & Complete Directory | BuyPvaGmail',
    description: 'Complete HTML sitemap directory of BuyPvaGmail. Easily navigate all PVA products, aged vintage tiers, technical guides, legal policies, and tools.',
    heading: 'HTML Sitemap & Directory',
    subheading: 'Full index of all public routes, products, knowledge base articles, and XML sitemaps.'
  },
  {
    path: 'privacy',
    title: 'Privacy Policy & Zero-Log Commitment | BuyPvaGmail',
    description: 'BuyPvaGmail zero-log privacy policy. Learn how your order data and transaction details are encrypted, kept private, and never shared with third parties.',
    heading: 'Privacy Policy & Data Protection',
    subheading: 'Zero-log commitment and strict customer privacy guidelines.'
  },
  {
    path: 'terms',
    title: 'Terms of Service & Usage Guidelines | BuyPvaGmail',
    description: 'Terms of service and acceptable usage guidelines for purchasing PVA and aged Gmail accounts on BuyPvaGmail.',
    heading: 'Terms of Service',
    subheading: 'Operational terms and customer agreements governing all account purchases.'
  },
  {
    path: 'instant-indexing',
    title: 'Google & IndexNow Instant Indexing Console | BuyPvaGmail',
    description: 'Technical indexing console for BuyPvaGmail. Broadcast public URLs to Google Search Console and Bing IndexNow API for instant crawl scheduling.',
    heading: 'Instant Indexing Console',
    subheading: 'Direct API dispatch for search engine discovery and index validation.'
  },
  {
    path: 'smtp',
    title: 'Buy SMTP Accounts (Mailgun, Brevo, Dedicated Relay) | 50k-200k/mo - BuyPvaGmail',
    description: 'Buy verified high-deliverability SMTP accounts (Mailgun, Brevo & Dedicated SMTP Relays). 50k to 200k monthly sending limits, pre-warmed clean IPs, SPF/DKIM/DMARC configured.',
    heading: 'Buy SMTP Accounts (Mailgun, Brevo & Dedicated Relays)',
    subheading: 'Premium pre-warmed SMTP infrastructure with dedicated clean IPs, authenticated DNS records (SPF, DKIM, DMARC), and 50k to 200k monthly sending limits.'
  },
  {
    path: 'smtp-category',
    title: 'Buy SMTP Accounts (Mailgun, Brevo, Dedicated Relay) | 50k-200k/mo - BuyPvaGmail',
    description: 'Buy verified high-deliverability SMTP accounts (Mailgun, Brevo & Dedicated SMTP Relays). 50k to 200k monthly sending limits, pre-warmed clean IPs, SPF/DKIM/DMARC configured.',
    heading: 'Buy SMTP Accounts (Mailgun, Brevo & Dedicated Relays)',
    subheading: 'Premium pre-warmed SMTP infrastructure with dedicated clean IPs, authenticated DNS records (SPF, DKIM, DMARC), and 50k to 200k monthly sending limits.'
  },
  {
    path: 'smtp-services',
    title: 'Buy SMTP Accounts (Mailgun, Brevo, Dedicated Relay) | 50k-200k/mo - BuyPvaGmail',
    description: 'Buy verified high-deliverability SMTP accounts (Mailgun, Brevo & Dedicated SMTP Relays). 50k to 200k monthly sending limits, pre-warmed clean IPs, SPF/DKIM/DMARC configured.',
    heading: 'Buy SMTP Accounts (Mailgun, Brevo & Dedicated Relays)',
    subheading: 'Premium pre-warmed SMTP infrastructure with dedicated clean IPs, authenticated DNS records (SPF, DKIM, DMARC), and 50k to 200k monthly sending limits.'
  },
  {
    path: 'smtp-accounts',
    title: 'Buy SMTP Accounts (Mailgun, Brevo, Dedicated Relay) | 50k-200k/mo - BuyPvaGmail',
    description: 'Buy verified high-deliverability SMTP accounts (Mailgun, Brevo & Dedicated SMTP Relays). 50k to 200k monthly sending limits, pre-warmed clean IPs, SPF/DKIM/DMARC configured.',
    heading: 'Buy SMTP Accounts (Mailgun, Brevo & Dedicated Relays)',
    subheading: 'Premium pre-warmed SMTP infrastructure with dedicated clean IPs, authenticated DNS records (SPF, DKIM, DMARC), and 50k to 200k monthly sending limits.'
  },
  {
    path: 'services-catalog',
    title: 'Verified PVA & Aged Gmail Accounts Catalog | BuyPvaGmail',
    description: 'Browse our complete catalog of phone-verified (PVA) and aged Gmail accounts (2008–2025). USA carrier SIM, global mixed, Google Ads, and Maps reviews profiles.',
    heading: 'Verified PVA & Aged Gmail Accounts Catalog',
    subheading: 'Explore our full inventory of verified carrier SIM and historical aged accounts with instant auto-dispatch and 7-day replacement warranty.'
  },
  {
    path: 'about-us',
    title: 'About BuyPvaGmail - Direct Supplier of Verified Accounts | BuyPvaGmail',
    description: 'Learn about BuyPvaGmail, the industry-trusted direct supplier of verified PVA and historical aged Gmail accounts for agencies, marketers, and enterprises worldwide.',
    heading: 'About BuyPvaGmail',
    subheading: 'Direct infrastructure supplier providing genuine phone-verified and historical aged accounts with zero middleman markups.'
  },
  {
    path: 'guides',
    title: 'Warmup SOPs, Deliverability & Agency Guides | BuyPvaGmail',
    description: 'Technical knowledge base and standard operating procedures for warming up Gmail accounts, anti-detect browser setup, cold email deliverability, and proxy management.',
    heading: 'Knowledge Base & Technical Warmup Guides',
    subheading: 'In-depth SOPs and operational playbooks to protect your accounts and maximize inbox deliverability.'
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy & Zero-Log Commitment | BuyPvaGmail',
    description: 'BuyPvaGmail zero-log privacy policy. Learn how your order data and transaction details are encrypted, kept private, and never shared with third parties.',
    heading: 'Privacy Policy & Data Protection',
    subheading: 'Zero-log commitment and strict customer privacy guidelines.'
  },
  {
    path: 'terms-of-service',
    title: 'Terms of Service & Usage Guidelines | BuyPvaGmail',
    description: 'Terms of service and acceptable usage guidelines for purchasing PVA and aged Gmail accounts on BuyPvaGmail.',
    heading: 'Terms of Service',
    subheading: 'Operational terms and customer agreements governing all account purchases.'
  },
  {
    path: 'warranty-guidelines',
    title: '7-Day Free Replacement Warranty Policy | BuyPvaGmail',
    description: 'Read our comprehensive 7-day replacement warranty policy. Free 1-to-1 account replacement for login checkpoints or disabled flags within 7 days of purchase.',
    heading: '7-Day 1-to-1 Free Replacement Warranty',
    subheading: 'Complete peace of mind: every single account delivered is backed by our unconditional 7-day replacement guarantee.'
  },
  {
    path: 'html-sitemap',
    title: 'HTML Sitemap & Complete Directory | BuyPvaGmail',
    description: 'Complete HTML sitemap directory of BuyPvaGmail. Easily navigate all PVA products, aged vintage tiers, technical guides, legal policies, and tools.',
    heading: 'HTML Sitemap & Directory',
    subheading: 'Full index of all public routes, products, knowledge base articles, and XML sitemaps.'
  }
];

function generateHtml(options) {
  let html = baseTemplate;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${options.title}</title>`);

  // Replace meta name="title"
  html = html.replace(/<meta\s+name=["']title["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="title" content="${options.title}" />`);

  // Replace meta name="description"
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="description" content="${options.description}" />`);

  // Replace canonical URL
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i, `<link rel="canonical" href="${options.canonical}" />`);

  // Replace og:title
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:title" content="${options.title}" />`);

  // Replace og:description
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:description" content="${options.description}" />`);

  // Replace og:url
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta property="og:url" content="${options.canonical}" />`);

  // Replace twitter:title
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="twitter:title" content="${options.title}" />`);

  // Replace twitter:description
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i, `<meta name="twitter:description" content="${options.description}" />`);

  // If there is extra JSON-LD schema (e.g. Product or Article), inject it before </head>
  if (options.extraSchema) {
    const schemaTag = `\n    <!-- Page Specific Structured Data -->\n    <script type="application/ld+json">\n${JSON.stringify(options.extraSchema, null, 2)}\n    </script>\n  </head>`;
    html = html.replace('</head>', schemaTag);
  }

  // Pre-render semantic body content into #root so non-JS bots crawl route-specific content
  if (options.bodyContent) {
    // Replace the default initial-page-loader inside #root
    html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<noscript>/i, `<div id="root">${options.bodyContent}</div>\n    <noscript>`);
  }

  return html;
}

console.log('🚀 Generating pre-rendered static HTML routes for SEO & Instant Indexing...');

let generatedCount = 0;

// 1. Generate Static Pages
for (const page of staticPages) {
  const pageDir = path.join(distDir, page.path);
  fs.mkdirSync(pageDir, { recursive: true });

  const canonical = `https://buypvagmail.com/${page.path}`;
  const bodyContent = `
    <div id="initial-page-loader" style="min-height:100vh;background:#020617;color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;padding:24px;">
      <header style="max-width:1200px;margin:0 auto 32px auto;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1e293b;padding-bottom:16px;">
        <a href="https://buypvagmail.com/" style="color:#ffffff;text-decoration:none;font-size:22px;font-weight:900;">BuyPva<span style="color:#ef4444;">Gmail</span></a>
        <nav style="display:flex;gap:16px;font-size:14px;font-weight:600;">
          <a href="https://buypvagmail.com/" style="color:#94a3b8;text-decoration:none;">Home</a>
          <a href="https://buypvagmail.com/gmail" style="color:#94a3b8;text-decoration:none;">Gmail Catalog</a>
          <a href="https://buypvagmail.com/pricing" style="color:#94a3b8;text-decoration:none;">Wholesale Pricing</a>
          <a href="https://buypvagmail.com/blog" style="color:#94a3b8;text-decoration:none;">Warmup Guides</a>
          <a href="https://buypvagmail.com/faq" style="color:#94a3b8;text-decoration:none;">FAQ</a>
          <a href="https://buypvagmail.com/contact" style="color:#94a3b8;text-decoration:none;">Contact</a>
          <a href="https://buypvagmail.com/sitemap" style="color:#94a3b8;text-decoration:none;">Sitemap</a>
        </nav>
      </header>
      <main style="max-width:1200px;margin:0 auto;">
        <h1 style="font-size:32px;font-weight:900;color:#ffffff;margin-bottom:12px;">${page.heading}</h1>
        <p style="font-size:16px;color:#94a3b8;line-height:1.6;margin-bottom:32px;">${page.subheading}</p>
        <div style="padding:24px;background:#0f172a;border:1px solid #1e293b;border-radius:16px;">
          <p style="color:#cbd5e1;line-height:1.6;">${page.description}</p>
          <div style="margin-top:20px;">
            <a href="https://buypvagmail.com/gmail" style="display:inline-block;padding:10px 20px;background:#3b82f6;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Browse Verified Accounts</a>
          </div>
        </div>
      </main>
    </div>`;

  const extraSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: page.title,
    description: page.description,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://buypvagmail.com/#website',
      name: 'BuyPvaGmail Marketplace',
      url: 'https://buypvagmail.com/'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://buypvagmail.com/' },
        { '@type': 'ListItem', position: 2, name: page.heading, item: canonical }
      ]
    }
  };

  const html = generateHtml({
    title: page.title,
    description: page.description,
    canonical,
    extraSchema,
    bodyContent
  });

  fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf8');
  generatedCount++;
}

// 2. Generate Product Service Pages with Compliant Product & Merchant Listings Schema
for (const product of products) {
  const gmailProductDir = path.join(distDir, 'gmail', product.slug);
  fs.mkdirSync(gmailProductDir, { recursive: true });

  const legacyProductDir = path.join(distDir, 'services', product.slug);
  fs.mkdirSync(legacyProductDir, { recursive: true });

  const smtpProductDir = path.join(distDir, 'smtp', product.slug);
  fs.mkdirSync(smtpProductDir, { recursive: true });

  const canonical = `https://buypvagmail.com/gmail/${product.slug}`;

  const bodyContent = `
    <div id="initial-page-loader" style="min-height:100vh;background:#020617;color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;padding:24px;">
      <header style="max-width:1200px;margin:0 auto 32px auto;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1e293b;padding-bottom:16px;">
        <a href="https://buypvagmail.com/" style="color:#ffffff;text-decoration:none;font-size:22px;font-weight:900;">BuyPva<span style="color:#ef4444;">Gmail</span></a>
        <nav style="display:flex;gap:16px;font-size:14px;font-weight:600;">
          <a href="https://buypvagmail.com/" style="color:#94a3b8;text-decoration:none;">Home</a>
          <a href="https://buypvagmail.com/gmail" style="color:#94a3b8;text-decoration:none;">Gmail</a>
          <a href="https://buypvagmail.com/pricing" style="color:#94a3b8;text-decoration:none;">Pricing</a>
          <a href="https://buypvagmail.com/faq" style="color:#94a3b8;text-decoration:none;">FAQ</a>
          <a href="https://buypvagmail.com/warranty" style="color:#94a3b8;text-decoration:none;">7-Day Warranty</a>
        </nav>
      </header>
      <main style="max-width:1200px;margin:0 auto;">
        <nav style="font-size:12px;color:#94a3b8;margin-bottom:16px;">
          <a href="https://buypvagmail.com/" style="color:#60a5fa;text-decoration:none;">Home</a> / 
          <a href="https://buypvagmail.com/gmail" style="color:#60a5fa;text-decoration:none;">Gmail</a> / 
          <span>${product.name}</span>
        </nav>
        <h1 style="font-size:32px;font-weight:900;color:#ffffff;margin-bottom:12px;">${product.name}</h1>
        <p style="font-size:16px;color:#94a3b8;line-height:1.6;margin-bottom:24px;">${product.description}</p>
        <div style="background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between;">
          <div>
            <div style="font-size:13px;color:#94a3b8;margin-bottom:4px;">Starting Price</div>
            <div style="font-size:28px;font-weight:900;color:#10b981;">$${product.price} <span style="font-size:14px;color:#94a3b8;font-weight:normal;">USD / account</span></div>
            <div style="font-size:12px;color:#60a5fa;margin-top:4px;">✓ Real Carrier SIM Verified • 2FA TOTP Included • 7-Day Free Replacement</div>
          </div>
          <a href="https://buypvagmail.com/gmail/${product.slug}" style="display:inline-block;padding:12px 28px;background:#ef4444;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:900;font-size:15px;">Configure Order &amp; Buy Now</a>
        </div>
      </main>
    </div>`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonical}#product`,
    name: product.name,
    description: product.description,
    image: [product.image],
    sku: product.sku,
    mpn: product.sku,
    url: canonical,
    brand: {
      '@type': 'Brand',
      name: 'BuyPvaGmail'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.ratingValue,
      reviewCount: product.reviewCount,
      bestRating: '5',
      worstRating: '1'
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      url: canonical,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'BuyPvaGmail Marketplace',
        url: 'https://buypvagmail.com'
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: 'USD'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY'
          }
        }
      }
    }
  };

  const html = generateHtml({
    title: product.title,
    description: product.description,
    canonical,
    extraSchema: productSchema,
    bodyContent
  });

  fs.writeFileSync(path.join(gmailProductDir, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(legacyProductDir, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(smtpProductDir, 'index.html'), html, 'utf8');
  generatedCount += 3;
}

// 3. Generate Technical Blog Guides
for (const article of blogArticles) {
  const articleDir = path.join(distDir, 'blog', article.slug);
  fs.mkdirSync(articleDir, { recursive: true });

  const guidesDir = path.join(distDir, 'guides', article.slug);
  fs.mkdirSync(guidesDir, { recursive: true });

  const canonical = `https://buypvagmail.com/blog/${article.slug}`;

  const bodyContent = `
    <div id="initial-page-loader" style="min-height:100vh;background:#020617;color:#f8fafc;font-family:system-ui,-apple-system,sans-serif;padding:24px;">
      <header style="max-width:1200px;margin:0 auto 32px auto;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1e293b;padding-bottom:16px;">
        <a href="https://buypvagmail.com/" style="color:#ffffff;text-decoration:none;font-size:22px;font-weight:900;">BuyPva<span style="color:#ef4444;">Gmail</span></a>
        <nav style="display:flex;gap:16px;font-size:14px;font-weight:600;">
          <a href="https://buypvagmail.com/" style="color:#94a3b8;text-decoration:none;">Home</a>
          <a href="https://buypvagmail.com/gmail" style="color:#94a3b8;text-decoration:none;">Gmail</a>
          <a href="https://buypvagmail.com/blog" style="color:#94a3b8;text-decoration:none;">Warmup Guides</a>
          <a href="https://buypvagmail.com/faq" style="color:#94a3b8;text-decoration:none;">FAQ</a>
        </nav>
      </header>
      <main style="max-width:850px;margin:0 auto;">
        <nav style="font-size:12px;color:#94a3b8;margin-bottom:16px;">
          <a href="https://buypvagmail.com/" style="color:#60a5fa;text-decoration:none;">Home</a> / 
          <a href="https://buypvagmail.com/blog" style="color:#60a5fa;text-decoration:none;">Knowledge Base</a> / 
          <span>${article.category}</span>
        </nav>
        <span style="display:inline-block;padding:4px 10px;background:rgba(59,130,246,0.15);border-radius:6px;color:#60a5fa;font-size:12px;font-weight:bold;margin-bottom:12px;">${article.category}</span>
        <h1 style="font-size:32px;font-weight:900;color:#ffffff;line-height:1.3;margin-bottom:16px;">${article.title.split('|')[0].trim()}</h1>
        <p style="font-size:16px;color:#94a3b8;line-height:1.7;margin-bottom:24px;">${article.description}</p>
        <div style="margin-top:32px;padding:24px;background:#0f172a;border:1px solid #1e293b;border-radius:16px;">
          <h2 style="font-size:18px;font-weight:bold;color:#ffffff;margin-bottom:8px;">Need High-Deliverability Accounts?</h2>
          <p style="font-size:14px;color:#94a3b8;margin-bottom:16px;">Browse our verified carrier SIM PVA and 2008–2025 aged accounts with 2FA TOTP secret keys.</p>
          <a href="https://buypvagmail.com/gmail" style="display:inline-block;padding:10px 20px;background:#3b82f6;color:#ffffff;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Explore Verified Accounts</a>
        </div>
      </main>
    </div>`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: article.title.split('|')[0].trim(),
    description: article.description,
    url: canonical,
    datePublished: article.datePublished,
    dateModified: '2026-03-05',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical
    },
    author: {
      '@type': 'Organization',
      name: 'BuyPvaGmail Technical Engineering Team',
      url: 'https://buypvagmail.com/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'BuyPvaGmail Marketplace',
      url: 'https://buypvagmail.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://buypvagmail.com/logo.png'
      }
    }
  };

  const html = generateHtml({
    title: article.title,
    description: article.description,
    canonical,
    extraSchema: articleSchema,
    bodyContent
  });

  fs.writeFileSync(path.join(articleDir, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(guidesDir, 'index.html'), html, 'utf8');
  generatedCount += 2;
}

// 4. Handle Vintage Year URLs: Option B (Redirect/canonical to Aged Mix Country Gmail)
// Ensures any direct crawler hit to /gmail/aged-2008-gmail-accounts or legacy /services/... returns HTTP 200 with canonical to aged-mix-country-gmail!
const vintageCanonical = 'https://buypvagmail.com/gmail/aged-mix-country-gmail';
for (let yr = 2008; yr <= 2025; yr++) {
  const vintageGmailDir = path.join(distDir, 'gmail', `aged-${yr}-gmail-accounts`);
  fs.mkdirSync(vintageGmailDir, { recursive: true });

  const vintageServicesDir = path.join(distDir, 'services', `aged-${yr}-gmail-accounts`);
  fs.mkdirSync(vintageServicesDir, { recursive: true });

  const vintageHtml = baseTemplate
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${yr} Aged Gmail Accounts | BuyPvaGmail</title>`)
    .replace(/<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i, `<link rel="canonical" href="${vintageCanonical}" />`)
    .replace('<head>', `<head>\n    <meta http-equiv="refresh" content="0;url=${vintageCanonical}" />`);

  fs.writeFileSync(path.join(vintageGmailDir, 'index.html'), vintageHtml, 'utf8');
  fs.writeFileSync(path.join(vintageServicesDir, 'index.html'), vintageHtml, 'utf8');
  generatedCount += 2;
}

console.log(`✅ Successfully generated ${generatedCount} pre-rendered static HTML routes!`);
