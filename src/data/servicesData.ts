import { ServiceProduct } from '../types';

export interface ServicePackage {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unitPrice: number;
  discountPercent: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

export interface DetailedServiceInfo extends ServiceProduct {
  heroTagline: string;
  longDescription: string;
  description: string;
  shortDescription: string;
  focusKeyword: string;
  tags: string[];
  useCases: string[];
  loginInstructions: string[];
  bestTools: string[];
  sampleFormat: string;
  packages: ServicePackage[];
}

export const VINTAGE_YEARS = [
  2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025
] as const;

export type VintageYear = typeof VINTAGE_YEARS[number];

export const VINTAGE_YEAR_TIERS = [
  { era: 'Ultra-Vintage (2008 - 2012)', years: [2008, 2009, 2010, 2011, 2012], badge: '14-18 Yrs Aged', trustScore: '99.9%' },
  { era: 'Golden Age (2013 - 2017)', years: [2013, 2014, 2015, 2016, 2017], badge: '9-13 Yrs Aged', trustScore: '99.5%' },
  { era: 'Prime Authority (2018 - 2022)', years: [2018, 2019, 2020, 2021, 2022], badge: '4-8 Yrs Aged', trustScore: '98.8%' },
  { era: 'Modern Seasoned (2023 - 2024)', years: [2023, 2024], badge: '2-3 Yrs Aged', trustScore: '97.5%' },
  { era: 'Fresh Verified (2025)', years: [2025], badge: 'Fresh PVA', trustScore: '95.0%' }
];

export const detailedServicesData: DetailedServiceInfo[] = [
  {
    id: 'usa-gmail-accounts',
    name: 'USA Gmail Accounts',
    shortDesc: 'Created on genuine USA residential IPs with real US mobile numbers. Available across all vintage years from 2008 to 2025.',
    shortDescription: 'Created on genuine USA residential IPs with real US mobile numbers. Available across all vintage years from 2008 to 2025 with 2FA secret keys, recovery email & maximum inbox deliverability.',
    description: 'Our USA Gmail accounts represent the pinnacle of email marketing reliability, spanning all creation years from 2008 to 2025. Each account is registered exclusively using clean, dedicated USA residential ISP connections (Comcast, AT&T, Spectrum) and verified with non-VoIP physical SIM cards from major US carriers. They come pre-configured with recovery emails, 2FA backup codes, and full security protocols, ensuring maximum inbox deliverability for cold email campaigns, Smartlead/Instantly warming pools, and US-targeted business operations.',
    focusKeyword: 'Buy USA Gmail Accounts',
    tags: ['Buy USA Gmail Accounts', 'USA PVA Gmail', 'Physical US SIM Verified', 'US Residential ISP', 'Cold Email Outreach', 'Smartlead Ready', 'Instantly.ai Deliverability', '2FA Backup Codes', 'Aged 2008-2025', '7-Day Replacement Warranty'],
    heroTagline: '100% Genuine USA Residential IP Created with Physical US Carrier SIMs (2008 - 2025 Vintage)',
    longDescription: 'Our USA Gmail accounts represent the pinnacle of email marketing reliability, spanning all creation years from 2008 to 2025. Each account is registered exclusively using clean, dedicated USA residential ISP connections (Comcast, AT&T, Spectrum) and verified with non-VoIP physical SIM cards from major US carriers. They come pre-configured with recovery emails, 2FA backup codes, and full security protocols, ensuring maximum inbox deliverability for cold email campaigns and US-targeted business operations.',
    basePrice: 6,
    baseQuantity: 2,
    unitPrice: 3.0,
    popular: true,
    age: '2008 - 2025 Aged (All Years Available)',
    category: 'usa',
    country: 'United States',
    countryCode: 'US',
    inStock: 3420,
    rating: 4.95,
    reviewsCount: 1240,
    features: [
      'Available across all creation years: 2008 to 2025',
      '100% Real US Carrier SIM Verified (AT&T / Verizon / T-Mobile)',
      'Static USA Residential ISP IP Created (Comcast / Spectrum)',
      'Configured Recovery Email Included with Full Access',
      '2FA / App Password Access Enabled for Instant SMTP/IMAP',
      'Pre-warmed with Natural US Search & Browsing Footprint',
      '7-Day 100% Instant Replacement Guarantee'
    ],
    specs: {
      phoneType: 'Physical US Carrier SIM (Non-VoIP)',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'USA Residential (Tier 1 ISP)',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'Cold Email Outreach via Instantly, Smartlead, Lemlist & Woodpecker',
      'US SaaS Trial Signups & Business Tool Registrations',
      'Google My Business Management & US Client Portals',
      'High-Deliverability B2B Sales Prospecting',
      'Multi-Account Browser Profiles (Dolphin, AdsPower, Multilogin)'
    ],
    loginInstructions: [
      'Use clean US Residential or 4G Mobile Proxies for initial login.',
      'Import provided browser cookies (JSON) or login via Anti-Detect Browser.',
      'Enter the provided recovery email if Google asks for security verification.',
      'Allow 24-48 hours gentle warmup before sending high-volume cold emails.'
    ],
    bestTools: ['Instantly.ai', 'Smartlead.ai', 'AdsPower', 'Dolphin{anty}', 'Multilogin', 'Lemlist'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : +1 (555) 234-5678 : 2FA_SECRET : UserAgent',
    packages: [
      {
        id: 'usa-starter',
        name: 'Starter Test Pack',
        quantity: 2,
        price: 6.00,
        unitPrice: 3.00,
        discountPercent: 0,
        badge: 'Trial Pack',
        features: ['2 USA Aged Accounts', 'Physical US SIM Verified', 'Recovery Mail Included', 'Instant Delivery']
      },
      {
        id: 'usa-cold-outreach',
        name: 'Cold Outreach Pack',
        quantity: 10,
        price: 28.50,
        unitPrice: 2.85,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 USA Aged Accounts', 'Clean US ISP Registration', 'SMTP/IMAP Ready', '7-Day Warranty']
      },
      {
        id: 'usa-agency-scale',
        name: 'Agency Scale Pack',
        quantity: 25,
        price: 67.50,
        unitPrice: 2.70,
        discountPercent: 10,
        badge: '🔥 Best Seller',
        isPopular: true,
        features: ['25 USA Aged Accounts', '2FA Secret Keys Included', 'Smartlead/Instantly Ready', 'Priority Support']
      },
      {
        id: 'usa-outreach-pro',
        name: 'Enterprise Outreach',
        quantity: 50,
        price: 127.50,
        unitPrice: 2.55,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 USA Aged Accounts', 'Dedicated US ISP Allocation', 'Cookie JSON Files Included', '7-Day Replacement']
      },
      {
        id: 'usa-bulk-century',
        name: 'High-Volume Agency',
        quantity: 100,
        price: 240.00,
        unitPrice: 2.40,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['100 USA Aged Accounts', 'Maximum Spam-Filter Resistance', 'CSV / Excel Export', 'VIP Telegram Support']
      },
      {
        id: 'usa-reseller-crate',
        name: 'Master Reseller Crate',
        quantity: 500,
        price: 1050.00,
        unitPrice: 2.10,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 USA Aged Accounts', 'Lowest Wholesale Unit Rate ($2.10)', 'Automated API Webhook Delivery', 'Dedicated Account Manager']
      }
    ]
  },
  {
    id: 'pva-gmail-accounts',
    name: 'PVA Gmail Accounts',
    shortDesc: 'Phone-Verified Accounts with active SMS validation. Available across all years 2008 to 2025 with resilient login security.',
    shortDescription: '100% Phone-Verified (PVA) Gmail accounts with active physical SIM validation across all years 2008–2025. Bypass CAPTCHA loops with pre-configured recovery email & 2FA keys.',
    description: 'PVA (Phone Verified Account) Gmails are the golden standard for marketers, developers, and businesses requiring hardened accounts that pass Google automated verification challenges. Every PVA account is verified with a real physical SIM card, preventing sudden verification lockouts. Available in all creation years from 2008 vintage up to 2025 fresh batches with full recovery credentials and 7-day warranty.',
    focusKeyword: 'Buy PVA Gmail Accounts',
    tags: ['Buy PVA Gmail Accounts', 'Phone Verified Gmail', 'Real Carrier SIM', 'Non-VoIP Verification', 'Bypass Phone Checkpoints', 'SMTP/IMAP Access', 'Multi-Account Automation', '2FA TOTP Keys', 'Bulk PVA Accounts', '7-Day Warranty'],
    heroTagline: '100% Real SIM SMS Verified Gmail Accounts for Bulletproof Security (2008 - 2025)',
    longDescription: 'PVA (Phone Verified Account) Gmails are the golden standard for marketers, developers, and businesses requiring hardened accounts that pass Google automated verification challenges. Every PVA account is verified with a real physical SIM card, preventing sudden verification lockouts. Available in all creation years from 2008 vintage up to 2025 fresh batches.',
    basePrice: 6,
    baseQuantity: 2,
    unitPrice: 3.0,
    popular: false,
    bestValue: true,
    age: '2008 - 2025 Aged PVA',
    category: 'pva',
    country: 'USA / UK / CA',
    countryCode: 'GLOBAL',
    inStock: 2890,
    rating: 4.92,
    reviewsCount: 980,
    features: [
      'All creation years available: 2008 through 2025',
      '100% SMS Phone Verified with Real Physical SIMs (Zero VoIP)',
      'Clean IP registration with zero blacklisted telemetry',
      'Configured with Secondary Recovery Email & Security Answers',
      'Full account ownership: Password and 2FA fully changeable',
      'Ready for IMAP / POP3 / SMTP bulk email warmup tools',
      '7-Day Instant Replacement Policy'
    ],
    specs: {
      phoneType: 'Physical Carrier SIM Card (Non-Virtual)',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'Tier 1 Clean Residential',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'Social Media Account Creation (Twitter/X, Facebook, Instagram, TikTok)',
      'App Store, Play Store & Developer Console Logins',
      'Newsletter Signups & Automated Lead Generation',
      'Scraping Bots, Puppeteer, Selenium & Python Scripts',
      'E-commerce Store Registrations (Shopify, eBay, Amazon)'
    ],
    loginInstructions: [
      'Login with matching country proxy or residential VPN.',
      'If prompted, enter the included recovery email address to bypass checkpoints.',
      'Change password after initial delivery for long-term operations.'
    ],
    bestTools: ['GSA Search Engine', 'ScrapeBox', 'Octo Browser', 'Incogniton', 'JarveePro', 'Kameleo'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : Phone_Number : Recovery_Status',
    packages: [
      {
        id: 'pva-starter',
        name: 'Duo Verification Pack',
        quantity: 2,
        price: 6.00,
        unitPrice: 3.00,
        discountPercent: 0,
        badge: 'Starter',
        features: ['2 PVA SIM Verified Accounts (2008-2025)', 'Recovery Email Included', 'Password Changeable', 'Instant Delivery']
      },
      {
        id: 'pva-bundle',
        name: 'PVA Starter Bundle',
        quantity: 10,
        price: 28.50,
        unitPrice: 2.85,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 PVA SIM Verified Accounts', '100% Unique Phone Numbers', 'SMTP/POP3 Access', '7-Day Warranty']
      },
      {
        id: 'pva-pro',
        name: 'Marketing PVA Pro',
        quantity: 25,
        price: 67.50,
        unitPrice: 2.70,
        discountPercent: 10,
        badge: '🛡️ Best Value',
        isPopular: true,
        features: ['25 PVA SIM Verified Accounts', 'Clean Residential IPs', 'Zero VoIP Checkpoints', 'Priority Support']
      },
      {
        id: 'pva-fleet',
        name: 'Bulk PVA Fleet',
        quantity: 50,
        price: 127.50,
        unitPrice: 2.55,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 PVA SIM Verified Accounts', 'Multi-Platform Compatible', 'Full Recovery Credentials', '7-Day Replacement']
      },
      {
        id: 'pva-century',
        name: 'Automation PVA Squad',
        quantity: 100,
        price: 240.00,
        unitPrice: 2.40,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['100 PVA SIM Verified Accounts', 'Tier 1 Clean IP Allocation', 'Exportable Format (TXT/CSV)', '24/7 Priority Support']
      },
      {
        id: 'pva-warehouse',
        name: 'Wholesale PVA Warehouse',
        quantity: 500,
        price: 1050.00,
        unitPrice: 2.10,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 PVA SIM Verified Accounts', 'Bulk Discounted Wholesale Rate', 'API Integration Access', 'Dedicated Account Manager']
      }
    ]
  },
  {
    id: 'new-gmail-accounts',
    name: 'New Gmail Accounts',
    shortDesc: 'Freshly generated clean PVA Gmails registered within 2025. Budget-friendly for high-volume tasks & automation.',
    shortDescription: 'Freshly generated 2025 PVA phone-verified Gmail accounts on clean residential IP subnets. Low-cost wholesale solution for mass social signups and automated testing.',
    description: 'When your project requires sheer volume without the premium cost of vintage aging, our 2025 New Gmail Accounts provide the optimal solution. Created with clean residential IPs and real carrier numbers, each account includes complete email, password, and recovery details for immediate high-volume deployments, software QA testing, and promotional signups.',
    focusKeyword: 'Buy Fresh PVA Gmail Accounts',
    tags: ['Buy Fresh PVA Gmail Accounts', 'New Gmail Accounts 2025', 'Budget PVA Accounts', 'Mass Account Creation', 'Software QA Testing', 'Social Media Signups', 'Clean Residential IPs', 'Wholesale Gmail Bulk', 'Automated Script Ready', '48-Hour Replacement'],
    heroTagline: 'Fresh 2025 100% Phone Verified PVA Accounts at Wholesale Pricing',
    longDescription: 'When your project requires sheer volume without the premium cost of vintage aging, our 2025 New Gmail Accounts provide the optimal solution. Created with clean residential IPs and real carrier numbers, each account includes complete email, password, and recovery details for immediate high-volume deployments.',
    basePrice: 3,
    baseQuantity: 2,
    unitPrice: 1.5,
    popular: false,
    age: '2025 Fresh (1-3 Months Old)',
    category: 'new',
    country: 'Worldwide / Mixed',
    countryCode: 'GLOBAL',
    inStock: 6800,
    rating: 4.82,
    reviewsCount: 620,
    features: [
      'Fresh 2025 PVA creation with zero spam history',
      'Low cost bulk solution ($1.50 per account)',
      '100% Phone Verified with unique SIM numbers',
      'Complete email : password : recovery credentials format',
      'Great for account creation, social signups & testers',
      '48-Hour Instant Replacement Guarantee'
    ],
    specs: {
      phoneType: 'SMS Carrier PVA',
      recoveryMail: true,
      twoFA: false,
      ipOrigin: 'Clean Residential Proxies',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '48-Hour Replacement Policy'
    },
    useCases: [
      'High-Volume Social Media Account Registrations',
      'Software Testing, QA Benchmarks & Script Development',
      'Coupon, Rebate & Promo Signups',
      'Bulk Newsletter & Community Registrations',
      'Temporary Account Needs & Mass Verification'
    ],
    loginInstructions: [
      'Login with matching country proxy or clean VPN.',
      'Use the recovery email provided if a secondary checkpoint appears.',
      'Avoid sending mass spam emails on day 1 to preserve account health.'
    ],
    bestTools: ['Python', 'Puppeteer', 'Selenium', 'Postman', 'Ant-Detect Browsers'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com',
    packages: [
      {
        id: 'new-duo',
        name: 'Budget Duo Pack',
        quantity: 2,
        price: 3.00,
        unitPrice: 1.50,
        discountPercent: 0,
        badge: 'Trial',
        features: ['2 Fresh 2025 PVA Accounts', 'SIM Verified', 'Recovery Mail Included', 'Instant Delivery']
      },
      {
        id: 'new-starter',
        name: 'Starter Fresh 10',
        quantity: 10,
        price: 14.25,
        unitPrice: 1.42,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 Fresh 2025 PVA Accounts', 'Clean IP Registration', 'Full Credentials', '48-Hour Warranty']
      },
      {
        id: 'new-signup',
        name: 'Social Signup Squad 25',
        quantity: 25,
        price: 33.75,
        unitPrice: 1.35,
        discountPercent: 10,
        badge: '⚡ Popular',
        isPopular: true,
        features: ['25 Fresh 2025 PVA Accounts', 'Zero Prior Usage', 'TXT/CSV Export', 'Priority Support']
      },
      {
        id: 'new-bulk',
        name: 'Bulk Fresh 50',
        quantity: 50,
        price: 63.75,
        unitPrice: 1.27,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 Fresh 2025 PVA Accounts', 'Ideal for App Testing', 'Fast Import Format', '48-Hour Replacement']
      },
      {
        id: 'new-century',
        name: 'Automation Century 100',
        quantity: 100,
        price: 120.00,
        unitPrice: 1.20,
        discountPercent: 20,
        badge: '⚡ Lowest Unit Price',
        features: ['100 Fresh 2025 PVA Accounts', 'Just $1.20 per Account', 'Batch File Download', 'Priority Support']
      },
      {
        id: 'new-mass',
        name: 'Mass Creation 500',
        quantity: 500,
        price: 525.00,
        unitPrice: 1.05,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 Fresh 2025 PVA Accounts', 'Bottom Dollar Wholesale ($1.05/ea)', 'Automated API Webhook', 'Dedicated Support Manager']
      }
    ]
  },
  {
    id: 'aged-mix-country-gmail',
    name: 'Aged Mix Country Gmail Accounts',
    shortDesc: 'High-authority vintage accounts spanning 2008 to 2025 from UK, Canada, Australia & Europe with mature browsing history.',
    shortDescription: 'Seasoned vintage Gmail accounts aged 1 to 18 years (2008–2025) from UK, Canada, Australia & Europe. High algorithmic domain authority and mature cookie footprint.',
    description: 'Age is the #1 metric Google algorithms utilize to calculate trust score. Our Aged Mix Country Gmail accounts were created between 2008 and 2025 across Tier-1 regions (United Kingdom, Canada, Australia, Germany, France). Having seasoned cookies, historical telemetry, and zero suspension flags, these accounts easily bypass captcha barriers and strict anti-bot systems.',
    focusKeyword: 'Buy Aged Gmail Accounts',
    tags: ['Buy Aged Gmail Accounts', 'Vintage Gmail 2008-2025', 'Old Gmail Accounts', 'Tier-1 Country Gmail', 'Mature Cookie Footprint', 'Web Scraping Accounts', 'Reddit & Forum Accounts', 'Anti-Detect Browser Ready', 'High Authority Gmail', '7-Day Warranty'],
    heroTagline: 'High-Trust Vintage Gmails Aged 1 to 18 Years (2008–2025) with Organic Activity Footprint',
    longDescription: 'Age is the #1 metric Google algorithms utilize to calculate trust score. Our Aged Mix Country Gmail accounts were created between 2008 and 2025 across Tier-1 regions (United Kingdom, Canada, Australia, Germany, France). Having seasoned cookies, historical telemetry, and zero suspension flags, these accounts easily bypass captcha barriers and strict anti-bot systems.',
    basePrice: 5,
    baseQuantity: 2,
    unitPrice: 2.5,
    popular: false,
    age: '2008 - 2025 (Vintage 1 to 18 Years)',
    category: 'aged',
    country: 'Mixed Tier-1 (UK, CA, AU, EU)',
    countryCode: 'MIX',
    inStock: 4150,
    rating: 4.88,
    reviewsCount: 860,
    features: [
      'Aged from 2008 to 2025 (1 to 18+ Years Old) with organic telemetry',
      'Established trust history with natural Google profile data',
      'Superior resistance to sudden phone verification lockouts',
      'Includes complete recovery credentials & cookies',
      'Tested with Dolphin{anty}, AdsPower, Multilogin, GoLogin',
      '7-Day 100% Instant Replacement Policy'
    ],
    specs: {
      phoneType: 'Carrier Verified at Registration',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'Mixed Clean Residential (UK/CA/AU/EU)',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'High-Volume Web Scraping & Automated Data Extraction',
      'High-Trust Forum Postings (Reddit, Quora, Medium, Trustpilot)',
      'Warming Up Cold Email Deliverability Pools',
      'Registering on High-Security Developer Platforms (GitHub, OpenAI)',
      'Creating Multi-Geo Social Media Assets'
    ],
    loginInstructions: [
      'Use Residential Proxies corresponding to the country profile.',
      'Import cookies or login via an Anti-Detect browser profile.',
      'Do not change security settings immediately—allow 24h rest before heavy actions.'
    ],
    bestTools: ['AdsPower', 'Dolphin{anty}', 'GoLogin', 'Multilogin', 'Kameleo', 'Python-Playwright'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : CountryCode : RegYear : Cookies_Base64',
    packages: [
      {
        id: 'aged-duo',
        name: 'Vintage Duo Pack',
        quantity: 2,
        price: 5.00,
        unitPrice: 2.50,
        discountPercent: 0,
        badge: 'Starter',
        features: ['2 Aged Accounts (2008-2025 Vintage)', 'Organic History', 'Recovery Mail Included', 'Instant Delivery']
      },
      {
        id: 'aged-explorer',
        name: 'Aged Explorer Bundle',
        quantity: 10,
        price: 23.75,
        unitPrice: 2.38,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 Aged Accounts (2008-2025)', 'Mixed Tier-1 Geolocation', 'High Trust Score', '7-Day Warranty']
      },
      {
        id: 'aged-authority',
        name: 'Global Authority Pack',
        quantity: 25,
        price: 56.25,
        unitPrice: 2.25,
        discountPercent: 10,
        badge: '🌍 Best Value',
        isPopular: true,
        features: ['25 Aged Accounts', '2008-2025 Organic Age', 'Cookie Sessions Included', 'Priority Support']
      },
      {
        id: 'aged-scraper',
        name: 'Aged Scraper Fleet',
        quantity: 50,
        price: 106.25,
        unitPrice: 2.12,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 Aged Accounts (2008-2025)', 'Anti-Detect Optimized', 'Immune to Captcha Loops', '7-Day Replacement']
      },
      {
        id: 'aged-century',
        name: 'High-Trust Vintage 100',
        quantity: 100,
        price: 200.00,
        unitPrice: 2.00,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['100 Aged Accounts (2008-2025)', 'Deep Historical Cookies', 'CSV / JSON Export', 'VIP Telegram Support']
      },
      {
        id: 'aged-vault',
        name: 'Reseller Vintage Vault',
        quantity: 500,
        price: 875.00,
        unitPrice: 1.75,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 Aged Accounts (2008-2025)', 'Lowest Vintage Rate ($1.75/ea)', 'Bulk API Webhook Access', 'Dedicated Account Manager']
      }
    ]
  },
  {
    id: 'aged-gmail-for-reviews',
    name: 'Aged Gmail Accounts For Reviews',
    shortDesc: 'Specially aged accounts from 2008 to 2025 with Google Maps & Local Guides history. Reviews stick permanently with 95%+ live rate.',
    shortDescription: 'Specially aged accounts from 2008–2025 with active Google Maps & Local Guide trust history. 95%+ permanent review stick rate for Google Business Profile rankings.',
    description: 'Google utilizes advanced AI algorithms to filter out fake or suspicious business reviews. Our Aged Review Gmail Accounts span vintage years from 2008 through 2025, seasoned with real location check-ins, Google Maps navigation history, and Local Guides trust badges. When you post reviews using these accounts, they stick permanently without dropping or shadow-banning, building organic 5-star reputation.',
    focusKeyword: 'Aged Gmail for Google Maps Reviews',
    tags: ['Aged Gmail for Google Maps Reviews', 'Local Guide Gmail Accounts', 'Sticky 5-Star Reviews', 'Google Business Profile GBP', 'Non-Drop Review Accounts', 'Geo-Targeted Residential', 'Local SEO Reputation', 'Review Posting SOP', 'Trustpilot & Sitejabber Ready', '3-Day Retention Guarantee'],
    heroTagline: 'High Local Guide Trust Score Accounts Formulated for Google Maps & Reviews (2008 - 2025)',
    longDescription: 'Google utilizes advanced AI algorithms to filter out fake or suspicious business reviews. Our Aged Review Gmail Accounts span vintage years from 2008 through 2025, seasoned with real location check-ins, Google Maps navigation history, and Local Guides trust badges. When you post reviews using these accounts, they stick permanently and build organic reputation for your clients.',
    basePrice: 6,
    baseQuantity: 2,
    unitPrice: 3.0,
    popular: true,
    age: '2008 - 2025 Aged (High Stick Rate)',
    category: 'reviews',
    country: 'USA / UK / CA / AU',
    countryCode: 'US',
    inStock: 1950,
    rating: 4.98,
    reviewsCount: 1430,
    features: [
      'Spanning creation years from 2008 to 2025',
      'High Local Guide & Google Maps Trust Score',
      '96%+ Google Maps Review Stick Rate (Zero Shadow-Bans)',
      'Aged Google Profile with organic photo & location history',
      'Pre-warmed with real search cookies & browser cache',
      'Includes Step-by-Step Review Posting SOP Guide',
      '3-Day Review Retention Live Guarantee or Instant Swap'
    ],
    specs: {
      phoneType: 'Physical Tier-1 SIM Verified',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'Geo-Targeted Residential Proxies',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '3-Day Review Retention Guarantee'
    },
    useCases: [
      'Google Maps & Google Business Profile (GBP) 5-Star Reviews',
      'Trustpilot, Sitejabber, ProductHunt & Clutch Reviews',
      'App Store & Google Play Store App Ratings',
      'Local SEO Reputation Management for Digital Agencies',
      'Brand Sentiment & E-commerce Product Feedback'
    ],
    loginInstructions: [
      'Use residential proxy geolocated to the target business city/state.',
      'Import the browser session and search the business organically.',
      'Spend 1-2 minutes scrolling photos/menu before posting review.',
      'Attach a real photo to achieve maximum review prominence.'
    ],
    bestTools: ['AdsPower', 'Dolphin{anty}', 'Octo Browser', 'Bright Data Residential', 'IPRoyal Proxies'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : LocalGuideLevel : CityGeo : Cookies_JSON',
    packages: [
      {
        id: 'reviews-duo',
        name: 'Local Guide Duo',
        quantity: 2,
        price: 6.00,
        unitPrice: 3.00,
        discountPercent: 0,
        badge: 'Trial',
        features: ['2 Review Ready Accounts (2008-2025)', 'Local Guide Trust History', 'Posting SOP Guide Included', 'Instant Delivery']
      },
      {
        id: 'reviews-boost',
        name: 'Google Maps Boost Pack',
        quantity: 10,
        price: 28.50,
        unitPrice: 2.85,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['10 Review Ready Accounts (2008-2025)', 'High Stick Rate Formula', 'Recovery Mail Configured', '3-Day Retention Warranty']
      },
      {
        id: 'reviews-pro',
        name: 'Reputation Pro Pack',
        quantity: 25,
        price: 67.50,
        unitPrice: 2.70,
        discountPercent: 10,
        badge: '⭐ 95%+ Stick Rate',
        isPopular: true,
        features: ['25 Review Ready Accounts', 'Pre-warmed Location History', 'Browser Cookie Profiles', 'Priority Telegram Support']
      },
      {
        id: 'reviews-agency',
        name: 'Agency Review Fleet',
        quantity: 50,
        price: 127.50,
        unitPrice: 2.55,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['50 Review Ready Accounts', 'Zero Shadow-Ban Guarantee', 'Full Security Handover', 'Dedicated Replacement Line']
      },
      {
        id: 'reviews-century',
        name: 'Enterprise Reputation 100',
        quantity: 100,
        price: 240.00,
        unitPrice: 2.40,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['100 Review Ready Accounts', 'Maximum Local Trust Rating', 'Batch CSV/JSON Delivery', 'VIP Telegram Support']
      },
      {
        id: 'reviews-vault',
        name: 'Mass Reviews Authority 500',
        quantity: 500,
        price: 1050.00,
        unitPrice: 2.10,
        discountPercent: 30,
        badge: 'Save 30% Wholesale',
        features: ['500 Review Ready Accounts', 'Wholesale Pricing ($2.10/ea)', 'Continuous Stock Reservation', 'Dedicated Account Manager']
      }
    ]
  },
  {
    id: 'aged-gmail-for-google-ads',
    name: 'Aged Gmail Accounts For Google Ads',
    shortDesc: 'Prime vintage accounts from 2008 to 2025 conditioned for Google Ads thresholds, billing setup & zero suspicious payment suspension.',
    shortDescription: 'Heavy-aged vintage accounts (2008–2025) pre-conditioned for Google Ads thresholds, billing setup, and YouTube ad campaigns with zero suspicious payment flags.',
    description: 'Launching Google Ads on fresh accounts frequently triggers immediate "Suspicious Payment Activity" or "Circumventing Systems" account suspensions. Our Aged Google Ads Gmails span creation years from 2008 to 2025, offering years of natural payment telemetry, YouTube viewing history, and Google Play activity. They warmup smoothly and support high initial billing thresholds for media buyers and PPC agencies.',
    focusKeyword: 'Aged Gmail for Google Ads',
    tags: ['Aged Gmail for Google Ads', 'Google Ads Threshold Accounts', 'Media Buying Gmail', 'Google Pay Telemetry', 'Anti-Suspension Shield', 'Performance Max Ready', 'PPC Campaign Accounts', 'YouTube Ads Ready', 'High Budget Accounts', '7-Day Warranty'],
    heroTagline: 'Heavy-Aged Accounts Pre-Warmed for Google Ads Campaigns & Billing Thresholds (2008 - 2025)',
    longDescription: 'Launching Google Ads on fresh accounts frequently triggers immediate "Suspicious Payment Activity" or "Circumventing Systems" account suspensions. Our Aged Google Ads Gmails span creation years from 2008 to 2025, offering years of natural payment telemetry, YouTube viewing history, and Google Play activity. They warmup smoothly and support high initial billing thresholds.',
    basePrice: 5,
    baseQuantity: 1,
    unitPrice: 5.0,
    popular: true,
    bestValue: true,
    age: '2008 - 2025 (Heavy Aged)',
    category: 'google-ads',
    country: 'USA / UK / Global',
    countryCode: 'US',
    inStock: 1120,
    rating: 4.92,
    reviewsCount: 790,
    features: [
      'Available in vintage years from 2008 to 2025',
      'Seasoned Google Pay & Ads payment telemetry',
      'Bypasses "Suspicious Payment Activity" early fraud filters',
      'Clean historical search, YouTube & Google Maps cookies',
      'Session cookies (JSON format) and User-Agent profile included',
      'Ad spend threshold friendly for high-budget campaigns',
      'Dedicated Google Ads Warmup Checklist Included'
    ],
    specs: {
      phoneType: 'USA Carrier Phone Verified',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'USA Pure Residential IP',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'Google Search, Display & Performance Max Ad Campaigns',
      'Google Merchant Center & Shopping Feed Setup',
      'YouTube Ads & Video Promotion Accounts',
      'Affiliate Marketing & High-ROI Lead Gen Funnels',
      'Agency Client Sub-Account Management'
    ],
    loginInstructions: [
      'Always use static clean USA/UK Residential or Mobile Proxies.',
      'Import provided JSON cookies into AdsPower, Dolphin{anty}, or Multilogin.',
      'Spend 1-2 days browsing and watching YouTube videos before linking credit card.',
      'Start with a low daily budget ($10-$20) for the first 48 hours.'
    ],
    bestTools: ['AdsPower', 'Dolphin{anty}', 'Multilogin', 'Octo Browser', 'Google Ads Editor'],
    sampleFormat: 'username@gmail.com : Password123 : recovery@mail.com : 2FA_SECRET : RegDate : Cookies_JSON',
    packages: [
      {
        id: 'ads-single',
        name: 'Single Ad Trial',
        quantity: 1,
        price: 5.00,
        unitPrice: 5.00,
        discountPercent: 0,
        badge: 'Trial',
        features: ['1 Heavy-Aged Account (2008-2025 Vintage)', 'Google Pay Telemetry', 'Cookie Profile Included', 'Instant Delivery']
      },
      {
        id: 'ads-trio',
        name: 'Media Buyer Starter Trio',
        quantity: 3,
        price: 14.25,
        unitPrice: 4.75,
        discountPercent: 5,
        badge: 'Save 5%',
        features: ['3 Heavy-Aged Accounts (2008-2025)', 'Suspicious Payment Shield', 'Google Ads Warmup SOP', '7-Day Warranty']
      },
      {
        id: 'ads-pro',
        name: 'Media Buyer Pro Squad',
        quantity: 10,
        price: 45.00,
        unitPrice: 4.50,
        discountPercent: 10,
        badge: '🎯 Ads Ready',
        isPopular: true,
        features: ['10 Heavy-Aged Accounts', 'High Threshold Support', '2FA Secret Keys Included', 'Priority Support']
      },
      {
        id: 'ads-scaler',
        name: 'Campaign Scaler Fleet',
        quantity: 25,
        price: 106.25,
        unitPrice: 4.25,
        discountPercent: 15,
        badge: 'Save 15%',
        features: ['25 Heavy-Aged Accounts', 'Full Profile Backups', 'Session Cookies (JSON)', '7-Day Replacement']
      },
      {
        id: 'ads-agency',
        name: 'PPC Agency Master Pack',
        quantity: 50,
        price: 200.00,
        unitPrice: 4.00,
        discountPercent: 20,
        badge: 'Save 20%',
        features: ['50 Heavy-Aged Accounts', 'Zero Suspension Warmup SOP', 'CSV/JSON Export', 'VIP Telegram Support']
      },
      {
        id: 'ads-century',
        name: 'Enterprise Ad Farms 100',
        quantity: 100,
        price: 375.00,
        unitPrice: 3.75,
        discountPercent: 25,
        badge: 'Save 25% Wholesale',
        features: ['100 Heavy-Aged Accounts', 'Lowest Rate ($3.75/ea)', 'Bulk Replacement Guarantee', 'Dedicated Ad Strategist Support']
      }
    ]
  },
  {
    id: 'smtp-mailgun-accounts',
    name: 'Buy SMTP Mailgun Accounts',
    shortDesc: 'Fully warmed Mailgun SMTP accounts with authentic DNS configuration (SPF, DKIM, DMARC, MX). Available in 50k, 100k, and 200k monthly sending limits.',
    shortDescription: 'Buy verified Mailgun SMTP accounts configured for high-volume cold outreach and transactional emailing. Includes custom domain verification, dedicated sending credentials, and 99.8% inbox placement.',
    description: 'Our Mailgun SMTP accounts provide maximum email deliverability for cold outreach, marketing agencies, SaaS platforms, and transactional notifications. Each account comes pre-configured with dedicated DNS authentication (SPF, DKIM, DMARC), clean IP pool allocation, and full API/SMTP credentials compatible with Smartlead, Instantly, Lemlist, Woodpecker, and custom mail servers.',
    focusKeyword: 'Buy SMTP Mailgun Accounts',
    tags: ['Buy SMTP Mailgun Accounts', 'Mailgun SMTP Server', 'Cold Email SMTP', 'Bulk Email Sender', 'Dedicated Sending IP', 'SPF DKIM DMARC Verified', 'Instantly Smartlead SMTP', 'Transactional Email Relay'],
    heroTagline: 'High-Deliverability Mailgun SMTP Accounts with Custom SPF, DKIM & DMARC (50k - 200k/mo)',
    longDescription: 'Our Mailgun SMTP accounts provide maximum email deliverability for cold outreach, marketing agencies, SaaS platforms, and transactional notifications. Each account comes pre-configured with dedicated DNS authentication (SPF, DKIM, DMARC), clean IP pool allocation, and full API/SMTP credentials compatible with Smartlead, Instantly, Lemlist, Woodpecker, and custom mail servers.',
    basePrice: 150,
    baseQuantity: 50,
    unitPrice: 150.0,
    popular: true,
    age: 'Pre-Warmed High Reputation IP',
    category: 'smtp',
    country: 'United States & Global',
    countryCode: 'US',
    inStock: 48,
    rating: 4.96,
    reviewsCount: 412,
    features: [
      '50k, 100k, and 200k monthly email sending plans',
      'Custom Domain DNS setup (SPF, DKIM, DMARC, Return-Path)',
      'Zero warmup delay - ready for high-volume cold outreach',
      'High inbox placement rate (>99.2% inbox deliverability)',
      'Full SMTP credentials (Port 587/465) & HTTP API keys',
      'Compatible with Smartlead, Instantly, Lemlist & Woodpecker',
      '7-Day 100% replacement and technical warranty'
    ],
    specs: {
      phoneType: 'Enterprise Mailgun SMTP',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'Dedicated Warm IP Pool',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'High-Volume B2B Cold Email Sequences (Instantly, Smartlead)',
      'SaaS & E-Commerce Transactional Notifications',
      'Email Marketing Newsletters & Automated Drip Campaigns',
      'Agency Lead Generation Outreach with High Inbox Placement'
    ],
    loginInstructions: [
      'Enter provided SMTP host (smtp.mailgun.org), port 587 or 465, username, and password.',
      'Copy the provided API private key into your outreach software.',
      'Ensure your sending domain has the provided SPF, DKIM, and DMARC TXT records.',
      'Begin sending campaigns immediately with pre-warmed reputation.'
    ],
    bestTools: ['Smartlead.ai', 'Instantly.ai', 'Lemlist', 'Woodpecker', 'Mailwizz', 'ActiveCampaign'],
    sampleFormat: 'smtp.mailgun.org : 587 : postmaster@domain.com : Password123 : API-KEY-xxxxxxxx : Verified-Domain',
    packages: [
      {
        id: 'mailgun-50k',
        name: '50k Email Per Month',
        quantity: 50,
        price: 150.00,
        unitPrice: 150.00,
        discountPercent: 0,
        badge: 'Starter Plan',
        features: ['50k Email Per Month Only $150', 'Full Mailgun SMTP & API Access', 'SPF, DKIM & DMARC Configured', 'Zero Warmup Delay - Ready to Send', 'Instant Delivery & 7-Day Warranty']
      },
      {
        id: 'mailgun-100k',
        name: '100k Email Per Month',
        quantity: 100,
        price: 190.00,
        unitPrice: 190.00,
        discountPercent: 36,
        badge: '🔥 Most Popular',
        isPopular: true,
        features: ['100k Email Per Month Only $190', 'Dedicated Clean Sending Reputation', 'Smartlead / Instantly Optimized', 'High-Speed Pipeline & Bounce Handling', 'Priority 24/7 Telegram Support']
      },
      {
        id: 'mailgun-200k',
        name: '200k Email Per Month',
        quantity: 200,
        price: 320.00,
        unitPrice: 320.00,
        discountPercent: 47,
        badge: '⚡ Best Value Scale',
        features: ['200k Email Per Month Only $320', 'High-Volume Enterprise Sending', 'Pre-Warmed Reputation Domain Pool', 'Dedicated VIP Account Manager', '7-Day Full Replacement Guarantee']
      }
    ]
  },
  {
    id: 'smtp-brevo-accounts',
    name: 'Buy SMTP Brevo Accounts',
    shortDesc: 'Authentic Brevo (formerly Sendinblue) SMTP sending accounts with verified sending domains. Available in 50k, 100k, and 200k monthly sending limits.',
    shortDescription: 'Buy verified Brevo SMTP accounts for cold email campaigns, newsletters, and transactional messages. Includes authenticated SMTP relay ports, dedicated API access, and spam-free reputation.',
    description: 'Brevo SMTP accounts offer exceptional deliverability to major email providers including Gmail, Google Workspace, Outlook, and Yahoo. Each account includes verified domain records, dedicated IP warmup, automated bounce handling, and complete SMTP/API connection parameters for immediate deployment in your cold email sequence software.',
    focusKeyword: 'Buy SMTP Brevo Accounts',
    tags: ['Buy SMTP Brevo Accounts', 'Brevo SMTP Server', 'Sendinblue SMTP Accounts', 'Cold Email Relay', 'Transactional SMTP', 'DKIM SPF Authenticated', 'Smartlead Brevo SMTP'],
    heroTagline: 'Enterprise Brevo SMTP Accounts with Clean IP Reputation & Authenticated Domains',
    longDescription: 'Brevo SMTP accounts offer exceptional deliverability to major email providers including Gmail, Google Workspace, Outlook, and Yahoo. Each account includes verified domain records, dedicated IP warmup, automated bounce handling, and complete SMTP/API connection parameters for immediate deployment in your cold email sequence software.',
    basePrice: 150,
    baseQuantity: 50,
    unitPrice: 150.0,
    popular: false,
    bestValue: true,
    age: 'Clean High-Deliverability Pool',
    category: 'smtp',
    country: 'European Union & USA',
    countryCode: 'EU',
    inStock: 36,
    rating: 4.94,
    reviewsCount: 328,
    features: [
      '50k, 100k, and 200k monthly email sending capacity',
      'Brevo authenticated SMTP relay (Ports 587, 465, 2525)',
      'Configured SPF, DKIM, and DMARC domain records',
      'Clean sending reputation with low spam score',
      'Compatible with Instantly, Smartlead, Mailwizz, and CRMs',
      'Full administrative login and API key access',
      '7-Day replacement guarantee and technical assistance'
    ],
    specs: {
      phoneType: 'Dedicated Brevo SMTP',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'Tier 1 Clean European/US IP',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'Multi-Inbox Cold Outreach Sequences & Warmup Integration',
      'Automated Transactional Emails & Password Reset Notifications',
      'Marketing Newsletters & Affiliate Outbound Campaigns',
      'CRM Email Routing via SMTP Relay'
    ],
    loginInstructions: [
      'Connect via smtp-relay.brevo.com on port 587 with TLS encryption.',
      'Use the generated Brevo master SMTP login key provided in your manifest.',
      'Import verified domain records to enable full inbox deliverability.',
      'Integrate with your preferred outreach platform or autoresponder.'
    ],
    bestTools: ['Smartlead.ai', 'Instantly.ai', 'Mailwizz', 'Lemlist', 'HubSpot', 'WordPress SMTP'],
    sampleFormat: 'smtp-relay.brevo.com : 587 : account@brevo.com : MasterKey123 : API-v3-xxxxxxxx : VerifiedDomain',
    packages: [
      {
        id: 'brevo-50k',
        name: '50k Email Per Month',
        quantity: 50,
        price: 150.00,
        unitPrice: 150.00,
        discountPercent: 0,
        badge: 'Starter Plan',
        features: ['50k Email Per Month Only $150', 'Full Brevo SMTP & API Access', 'SPF, DKIM & DMARC Setup', 'Clean Sending Reputation', 'Instant Delivery & 7-Day Warranty']
      },
      {
        id: 'brevo-100k',
        name: '100k Email Per Month',
        quantity: 100,
        price: 190.00,
        unitPrice: 190.00,
        discountPercent: 36,
        badge: '🔥 Best Seller',
        isPopular: true,
        features: ['100k Email Per Month Only $190', 'Multi-Domain Sending Support', 'Smartlead / Instantly Optimized', 'High-Speed SMTP Relay Pipeline', 'Priority Support Desk']
      },
      {
        id: 'brevo-200k',
        name: '200k Email Per Month',
        quantity: 200,
        price: 320.00,
        unitPrice: 320.00,
        discountPercent: 47,
        badge: '⚡ High Volume',
        features: ['200k Email Per Month Only $320', 'High-Volume Enterprise Sending', 'Full API & Webhook Telemetry', 'VIP Account Manager', '7-Day Free Replacement']
      }
    ]
  },
  {
    id: 'smtp-relay-services-account',
    name: 'Buy SMTP Relay Services Account',
    shortDesc: 'Universal enterprise-grade SMTP relay server with dedicated clean IP, unlimited domain connections, and guaranteed high inbox placement.',
    shortDescription: 'Buy dedicated SMTP relay service accounts engineered for maximum cold email deliverability. Supports 50k, 100k, and 200k monthly emails with dedicated relay queues and zero rate limiting.',
    description: 'Our SMTP Relay Service provides an enterprise-class dedicated mail transfer agent (MTA) architecture designed specifically for cold outbound outreach, bulk email marketing, and mission-critical transactional emails. Featuring dedicated clean IPs, reverse DNS (rDNS/PTR), SPF, DKIM, and DMARC alignment, our relay accounts bypass strict spam filters on Gmail, Outlook, and corporate Exchange servers.',
    focusKeyword: 'Buy SMTP Relay Services Account',
    tags: ['Buy SMTP Relay Services Account', 'SMTP Relay Server', 'Dedicated SMTP Relay', 'Cold Outreach Relay', 'High Inbox Placement SMTP', 'Bulk Email Relay', 'Unlimited Domains SMTP'],
    heroTagline: 'High-Performance Dedicated SMTP Relay Infrastructure (50k - 200k/mo)',
    longDescription: 'Our SMTP Relay Service provides an enterprise-class dedicated mail transfer agent (MTA) architecture designed specifically for cold outbound outreach, bulk email marketing, and mission-critical transactional emails. Featuring dedicated clean IPs, reverse DNS (rDNS/PTR), SPF, DKIM, and DMARC alignment, our relay accounts bypass strict spam filters on Gmail, Outlook, and corporate Exchange servers.',
    basePrice: 190,
    baseQuantity: 50,
    unitPrice: 190.0,
    popular: true,
    age: 'Clean Dedicated MTA Node',
    category: 'smtp',
    country: 'United States & Tier 1',
    countryCode: 'US',
    inStock: 25,
    rating: 4.98,
    reviewsCount: 284,
    features: [
      '50k, 100k, and 200k monthly email throughput',
      'Dedicated static clean sending IP with rDNS / PTR records',
      'Unlimited sender domain authentication (DKIM, SPF, DMARC)',
      'Ultra-low latency relay on ports 25, 465, 587 & 2525',
      'Zero rate limiting or spam throttling for cold outreach',
      'Compatible with any CRM, autoresponder, or cold outreach app',
      '24/7 dedicated server health monitoring and 7-day warranty'
    ],
    specs: {
      phoneType: 'Dedicated SMTP Relay Engine',
      recoveryMail: true,
      twoFA: true,
      ipOrigin: 'Clean Tier 1 Dedicated IP',
      deliveryTime: 'Instant (Under 60 seconds)',
      warranty: '7-Day Replacement Policy'
    },
    useCases: [
      'Unlimited Domain Cold Outreach Campaigns',
      'Bulk Marketing Broadcasts with Zero Throttling',
      'Custom Mail Server & Postfix/Exim Relay Backend',
      'Enterprise Transactional Email Routing'
    ],
    loginInstructions: [
      'Configure your outreach tool or mail client with the dedicated relay host and port 587 (TLS) or 465 (SSL).',
      'Authenticate using your dedicated username and secure API token.',
      'Add the provided SPF and DKIM public keys to your DNS management console.',
      'Test delivery and scale throughput seamlessly.'
    ],
    bestTools: ['Instantly.ai', 'Smartlead.ai', 'Mailwizz', 'Mumara', 'Woodpecker', 'Custom MTAs'],
    sampleFormat: 'relay.buypvagmail.com : 587 : relay_user_xxxx : SecurePass123 : Dedicated-IP: 198.51.100.24 : PTR-Configured',
    packages: [
      {
        id: 'relay-50k',
        name: '50k Email Per Month',
        quantity: 50,
        price: 190.00,
        unitPrice: 190.00,
        discountPercent: 0,
        badge: 'Starter Relay',
        features: ['50k Email Per Month Only $190', 'Dedicated Static Sending IP', 'Universal SMTP Relay Integration', 'Instant Dispatch & 7-Day Warranty']
      },
      {
        id: 'relay-100k',
        name: '100k Email Per Month',
        quantity: 100,
        price: 240.00,
        unitPrice: 240.00,
        discountPercent: 25,
        badge: '🔥 Best Seller',
        isPopular: true,
        features: ['100k Email Per Month Only $240', 'Unlimited Sending Domains', 'Zero Outbound Throttling', 'Ultra-Fast Relay Ports 587/465', 'Priority 24/7 Support']
      },
      {
        id: 'relay-200k',
        name: '200k Email Per Month',
        quantity: 200,
        price: 350.00,
        unitPrice: 350.00,
        discountPercent: 38,
        badge: '⚡ Enterprise Scale',
        features: ['200k Email Per Month Only $350', 'Dedicated High-Throughput MTA', 'Real-Time Telemetry & Bounce Logs', 'VIP Account Manager', '7-Day Free Replacement']
      }
    ]
  }
];

export const servicesData: ServiceProduct[] = detailedServicesData;

export const getServiceById = (id: string): DetailedServiceInfo | undefined => {
  const directMatch = detailedServicesData.find((s) => s.id === id);
  if (directMatch) return directMatch;

  // Handle vintage year URLs (e.g., aged-2015-gmail-accounts)
  const vintageMatch = id.match(/^aged-(\d{4})-gmail-accounts$/);
  if (vintageMatch) {
    const year = parseInt(vintageMatch[1], 10);
    if (VINTAGE_YEARS.includes(year as VintageYear)) {
      const ageYears = 2025 - year + 1;
      const basePrice = year <= 2012 ? 8.0 : year <= 2017 ? 6.0 : year <= 2022 ? 4.5 : 3.0;
      const unitPrice = basePrice;
      return {
        id: `aged-${year}-gmail-accounts`,
        name: `${year} Aged Vintage Gmail Accounts`,
        shortDesc: `Seasoned ${year} vintage Gmail accounts with ${ageYears}+ years of organic algorithmic history and superior spam-filter bypass.`,
        shortDescription: `Seasoned ${year} vintage Gmail accounts with ${ageYears}+ years of organic algorithmic history, clean residential ISP origins, and superior spam-filter bypass.`,
        description: `Our ${year} Aged Vintage Gmail accounts were created in ${year} and maintained with natural activity patterns across residential IP ranges. Spanning ${ageYears}+ years of historical telemetry, these accounts possess exceptional domain authority and algorithmic trust, making them ideal for high-stakes cold outreach, ad account management, and bypassing aggressive verification challenges.`,
        focusKeyword: `Buy ${year} Aged Gmail Accounts`,
        tags: [`Buy ${year} Aged Gmail Accounts`, `${year} Vintage Gmail`, `${ageYears}+ Years Aged`, 'Organic History', 'Clean Residential ISP', '2FA Secret Keys', 'Cold Email Outreach', 'High Deliverability', '7-Day Warranty'],
        heroTagline: `Genuine ${year} Vintage Accounts (${ageYears}+ Years Aged) with Established Google Trust History`,
        longDescription: `Our ${year} Aged Vintage Gmail accounts were created in ${year} and maintained with natural activity patterns across residential IP ranges. Spanning ${ageYears}+ years of historical telemetry, these accounts possess exceptional domain authority and algorithmic trust, making them ideal for high-stakes cold outreach, ad account management, and bypassing aggressive verification challenges.`,
        basePrice: basePrice * 2,
        baseQuantity: 2,
        unitPrice: unitPrice,
        popular: year <= 2015,
        age: `${year} Vintage (${ageYears} Years Aged)`,
        category: 'aged',
        country: 'USA / UK / Mixed Tier-1',
        countryCode: 'US',
        inStock: Math.floor(800 + (year - 2008) * 120),
        rating: 4.96,
        reviewsCount: Math.floor(450 + (2025 - year) * 35),
        features: [
          `Original creation year: ${year} (${ageYears}+ years seasoned history)`,
          'Clean residential IP registration with zero spam footprint',
          'Configured recovery email & 2FA TOTP secret key included',
          'Immune to sudden CAPTCHA loops & phone verification flags',
          'Instant credentials delivery (Email:Password:Recovery:2FA)',
          '7-Day 100% Instant 1-to-1 Replacement Guarantee'
        ],
        specs: {
          phoneType: 'Carrier Verified at Registration',
          recoveryMail: true,
          twoFA: true,
          ipOrigin: 'Clean Residential ISP (USA / UK / CA)',
          deliveryTime: 'Instant (Under 60 seconds)',
          warranty: '7-Day Replacement Policy'
        },
        useCases: [
          'High-Deliverability Cold Email via Instantly, Smartlead & Lemlist',
          'Google Ads & Threshold Account Warmup',
          'Google Maps Local Guide Reviews with Permanent Stick Rate',
          'High-Security Developer Registrations (OpenAI, GitHub, AWS)',
          'Multi-Account Browser Profiles (AdsPower, Dolphin{anty})'
        ],
        loginInstructions: [
          'Log in with clean residential or mobile proxies matching the account region.',
          'Import session cookies (JSON) or authenticate via an antidetect browser.',
          'Use the provided recovery email if Google prompts for security validation.',
          'Allow 24-48 hours gentle rest before launching high-volume sending.'
        ],
        bestTools: ['AdsPower', 'Dolphin{anty}', 'Smartlead.ai', 'Instantly.ai', 'Multilogin'],
        sampleFormat: `user${year}@gmail.com : Password123 : recovery@mail.com : 2FA_SECRET : ${year}`,
        packages: [
          {
            id: `aged-${year}-starter`,
            name: `${year} Duo Starter`,
            quantity: 2,
            price: basePrice * 2,
            unitPrice: basePrice,
            discountPercent: 0,
            badge: 'Trial Pack',
            features: [`2 Accounts from ${year}`, `${ageYears}+ Yrs Aged`, 'Recovery Mail Included', 'Instant Delivery']
          },
          {
            id: `aged-${year}-growth`,
            name: `${year} Growth Pack`,
            quantity: 10,
            price: basePrice * 10 * 0.95,
            unitPrice: basePrice * 0.95,
            discountPercent: 5,
            badge: 'Save 5%',
            features: [`10 Accounts from ${year}`, 'Clean ISP Origins', 'SMTP/IMAP Ready', '7-Day Warranty']
          },
          {
            id: `aged-${year}-agency`,
            name: `${year} Agency Batch`,
            quantity: 25,
            price: basePrice * 25 * 0.90,
            unitPrice: basePrice * 0.90,
            discountPercent: 10,
            badge: '🔥 Best Value',
            isPopular: true,
            features: [`25 Accounts from ${year}`, '2FA Secret Keys Included', 'Batch CSV Export', 'Priority Support']
          },
          {
            id: `aged-${year}-scale`,
            name: `${year} Scale Century`,
            quantity: 100,
            price: basePrice * 100 * 0.80,
            unitPrice: basePrice * 0.80,
            discountPercent: 20,
            badge: 'Save 20%',
            features: [`100 Accounts from ${year}`, 'Maximum Trust Rating', 'VIP Telegram Support', '7-Day Replacement']
          }
        ]
      };
    }
  }

  return undefined;
};

export const quantityTiers = [

  { label: 'Starter Pack', count: 2, discount: 0, badge: 'Standard' },
  { label: 'Growth Pack', count: 10, discount: 0.05, badge: '5% OFF' },
  { label: 'Agency Batch', count: 25, discount: 0.10, badge: '10% OFF' },
  { label: 'Outreach Pro', count: 50, discount: 0.15, badge: '15% OFF' },
  { label: 'Bulk Enterprise', count: 100, discount: 0.20, badge: '20% OFF' },
  { label: 'Master Reseller', count: 500, discount: 0.30, badge: '30% OFF' }
];
