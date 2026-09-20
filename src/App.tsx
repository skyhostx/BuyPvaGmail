import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ComparisonSection } from './components/ComparisonSection';
import { TieredPricing } from './components/TieredPricing';
import { ReviewsSection } from './components/ReviewsSection';
import { GuidesSection } from './components/GuidesSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { CartDrawer } from './components/CartDrawer';
import { AccountCheckerModal } from './components/AccountCheckerModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { LiveSupportWidget } from './components/LiveSupportWidget';
import { FloatingSocialButtons } from './components/FloatingSocialButtons';
import { PageLoader } from './components/PageLoader';

// Standalone dedicated pages
import { ServicesCatalogPage } from './components/pages/ServicesCatalogPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { PricingPage } from './components/pages/PricingPage';
import { AboutUsPage } from './components/pages/AboutUsPage';
import { BlogPage } from './components/pages/BlogPage';
import { FaqPage } from './components/pages/FaqPage';
import { ContactPage } from './components/pages/ContactPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/pages/TermsOfServicePage';
import { WarrantyGuidelinesPage } from './components/pages/WarrantyGuidelinesPage';
import { SitemapPage } from './components/pages/SitemapPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { InstantIndexingPage } from './components/pages/InstantIndexingPage';
import { SmtpCategoryPage } from './components/pages/SmtpCategoryPage';
import { SeoAnalyticsModal } from './components/SeoAnalyticsModal';
import { initGoogleAnalytics, trackPageView, trackAddToCart, trackRemoveFromCart, trackPurchase } from './utils/analytics';

import { ServiceProduct, CartItem, OrderDetails } from './types';
import { servicesData, detailedServicesData, getServiceById } from './data/servicesData';
import { blogGuides } from './data/blogData';
import { calculateProductPricing, sanitizeCart } from './utils/pricing';
import { Check, ShoppingBag } from 'lucide-react';

export type AppView = 
  | 'home' 
  | 'services-catalog' 
  | 'service-detail' 
  | 'smtp'
  | 'pricing' 
  | 'about' 
  | 'blog' 
  | 'faq' 
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'warranty'
  | 'sitemap'
  | 'instant-indexing'
  | 'not-found';

function getInitialRoute(): { view: AppView; serviceId: string; invalidPath?: string; articleSlug?: string } {
  try {
    const rawPath = typeof window !== 'undefined' ? (window.location.pathname.replace(/\/+$/, '') || '/') : '/';
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const viewParam = searchParams.get('view');
    const serviceParam = searchParams.get('service');
    const rawHash = typeof window !== 'undefined' ? (window.location.hash || '').replace(/^#\/?/, '').trim() : '';

    const effectivePath = rawHash && (
      rawHash.startsWith('service') || 
      rawHash.startsWith('smtp') || 
      rawHash.startsWith('pricing') || 
      rawHash.startsWith('about') || 
      rawHash.startsWith('blog') || 
      rawHash.startsWith('faq') || 
      rawHash.startsWith('contact') ||
      rawHash.startsWith('privacy') ||
      rawHash.startsWith('terms') ||
      rawHash.startsWith('warranty') ||
      rawHash.startsWith('sitemap') ||
      rawHash === '404' ||
      rawHash === 'not-found'
    )
      ? '/' + rawHash
      : rawPath;

    if (effectivePath === '/404' || viewParam === '404' || viewParam === 'not-found') {
      return { view: 'not-found', serviceId: 'usa-gmail-accounts', invalidPath: effectivePath };
    }

    let targetServiceId: string | null = null;
    if (effectivePath.startsWith('/services/') || effectivePath.startsWith('/service/')) {
      const parts = effectivePath.split('/');
      if (parts[2]) {
        targetServiceId = decodeURIComponent(parts[2]);
        const matched = detailedServicesData.find((s) => s.id === targetServiceId);
        if (matched) {
          return { view: 'service-detail', serviceId: matched.id };
        } else {
          return { view: 'not-found', serviceId: 'usa-gmail-accounts', invalidPath: effectivePath };
        }
      }
    } else if (serviceParam) {
      targetServiceId = serviceParam;
      const matched = detailedServicesData.find((s) => s.id === targetServiceId);
      if (matched) {
        return { view: 'service-detail', serviceId: matched.id };
      }
    }

    // Direct blog guide article check: /blog/:slug or /guides/:slug
    if (effectivePath.startsWith('/blog/') || effectivePath.startsWith('/guides/')) {
      const parts = effectivePath.split('/');
      if (parts[2]) {
        const slug = decodeURIComponent(parts[2]);
        const matchedGuide = blogGuides.find((g) => g.slug === slug);
        if (matchedGuide) {
          return { view: 'blog', serviceId: 'usa-gmail-accounts', articleSlug: matchedGuide.slug };
        } else {
          return { view: 'not-found', serviceId: 'usa-gmail-accounts', invalidPath: effectivePath };
        }
      }
    }

    if (viewParam === 'service-detail') {
      const matched = targetServiceId ? detailedServicesData.find((s) => s.id === targetServiceId) : detailedServicesData[0];
      return { view: 'service-detail', serviceId: (matched || detailedServicesData[0]).id };
    }

    if (effectivePath === '/' || effectivePath === '' || viewParam === 'home' || rawHash === 'home') {
      return { view: 'home', serviceId: 'usa-gmail-accounts' };
    }
    if (
      effectivePath === '/smtp' ||
      effectivePath === '/smtp-category' ||
      effectivePath === '/smtp-services' ||
      effectivePath === '/smtp-accounts' ||
      effectivePath === '/category/smtp' ||
      viewParam === 'smtp' ||
      rawHash === 'smtp' ||
      rawHash === 'smtp-services'
    ) {
      return { view: 'smtp', serviceId: 'smtp-mailgun-accounts' };
    }
    if (
      effectivePath === '/services' || 
      effectivePath === '/services-catalog' || 
      effectivePath === '/products' || 
      effectivePath === '/shop' || 
      effectivePath === '/category' || 
      viewParam === 'services' || 
      rawHash === 'services' ||
      rawHash === 'products' ||
      rawHash === 'shop'
    ) {
      return { view: 'services-catalog', serviceId: 'usa-gmail-accounts' };
    }
    if (effectivePath === '/pricing' || viewParam === 'pricing' || rawHash === 'pricing') {
      return { view: 'pricing', serviceId: 'usa-gmail-accounts' };
    }
    if (effectivePath === '/about' || effectivePath === '/about-us' || viewParam === 'about' || rawHash === 'about' || rawHash === 'about-us') {
      return { view: 'about', serviceId: 'usa-gmail-accounts' };
    }
    if (effectivePath === '/blog' || effectivePath === '/guides' || viewParam === 'blog' || rawHash === 'blog' || rawHash === 'guides') {
      return { view: 'blog', serviceId: 'usa-gmail-accounts' };
    }
    if (effectivePath === '/faq' || viewParam === 'faq' || rawHash === 'faq') {
      return { view: 'faq', serviceId: 'usa-gmail-accounts' };
    }
    if (effectivePath === '/contact' || viewParam === 'contact' || rawHash === 'contact') {
      return { view: 'contact', serviceId: 'usa-gmail-accounts' };
    }
    if (effectivePath === '/privacy' || effectivePath === '/privacy-policy' || viewParam === 'privacy' || rawHash === 'privacy' || rawHash === 'privacy-policy') {
      return { view: 'privacy', serviceId: 'usa-gmail-accounts' };
    }
    if (effectivePath === '/terms' || effectivePath === '/terms-of-service' || viewParam === 'terms' || rawHash === 'terms' || rawHash === 'terms-of-service') {
      return { view: 'terms', serviceId: 'usa-gmail-accounts' };
    }
    if (
      effectivePath === '/warranty' || 
      effectivePath === '/warranty-guidelines' || 
      effectivePath === '/replacement-policy' || 
      viewParam === 'warranty' || 
      rawHash === 'warranty' || 
      rawHash === 'warranty-guidelines' ||
      rawHash === 'replacement-policy'
    ) {
      return { view: 'warranty', serviceId: 'usa-gmail-accounts' };
    }
    if (
      effectivePath === '/sitemap' || 
      effectivePath === '/html-sitemap' || 
      viewParam === 'sitemap' || 
      rawHash === 'sitemap' || 
      rawHash === 'html-sitemap'
    ) {
      return { view: 'sitemap', serviceId: 'usa-gmail-accounts' };
    }
    if (
      effectivePath === '/instant-indexing' || 
      effectivePath === '/instant-index' || 
      effectivePath === '/rank-math' || 
      effectivePath === '/rankmath' || 
      viewParam === 'instant-indexing' || 
      rawHash === 'instant-indexing' || 
      rawHash === 'instant-index'
    ) {
      return { view: 'instant-indexing', serviceId: 'usa-gmail-accounts' };
    }

    // Any unrecognized path returns 404
    return { view: 'not-found', serviceId: 'usa-gmail-accounts', invalidPath: effectivePath };
  } catch {
    // fallback
  }
  return { view: 'home', serviceId: 'usa-gmail-accounts' };
}

export default function App() {
  const initialRoute = getInitialRoute();
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('buypvagmail_cart');
      return saved ? sanitizeCart(JSON.parse(saved)) : [];
    } catch {
      return [];
    }
  });

  const [activeSection, setActiveSection] = useState(initialRoute.view === 'home' ? 'home' : (initialRoute.view === 'service-detail' || initialRoute.view === 'services-catalog' ? 'services' : initialRoute.view));
  const [currentView, setCurrentView] = useState<AppView>(initialRoute.view);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialRoute.serviceId);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(initialRoute.articleSlug || null);
  const [invalidPath, setInvalidPath] = useState<string | undefined>(initialRoute.invalidPath);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalProduct, setOrderModalProduct] = useState<ServiceProduct>(servicesData[0]);
  const [orderModalQuantity, setOrderModalQuantity] = useState<number>(2);
  const [isCartCheckout, setIsCartCheckout] = useState(false);
  const [cartDiscountPercent, setCartDiscountPercent] = useState(0);
  const [cartCouponCode, setCartCouponCode] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckerModalOpen, setIsCheckerModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isSeoAnalyticsOpen, setIsSeoAnalyticsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Smooth page loading transition on reload / mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // SEO & Dynamic Metadata Engine (Title, Meta Description, Canonical, OG Tags & Robots)
  useEffect(() => {
    try {
      let pageTitle = 'Buy PVA Gmail Accounts (2008–2025 Aged & USA Verified) | BuyPvaGmail';
      let pageDesc = 'Buy 100% Phone Verified (PVA) USA Aged Gmail Accounts (2008–2025). Clean residential IPs, recovery email & 2FA secret key included. Instant auto-delivery & 7-day warranty.';
      let pageUrl = 'https://buypvagmail.com/';
      let isRobotsIndex = true;

      if (currentView === 'service-detail') {
        const product = getServiceById(selectedServiceId) || detailedServicesData[0];
        pageTitle = `${product.name} — Buy Verified Accounts | BuyPvaGmail`;
        pageDesc = `${product.shortDesc} Unit price from $${product.unitPrice.toFixed(2)}. 100% real SIM verified, 2FA secret key, recovery email & 7-day free replacement guarantee.`;
        pageUrl = `https://buypvagmail.com/services/${product.id}`;
      } else if (currentView === 'services-catalog') {
        pageTitle = 'PVA & Aged Gmail Accounts Catalog (USA, Global, 2008–2025) | BuyPvaGmail';
        pageDesc = 'Explore our verified inventory of USA PVA, 2008–2025 Aged Mix, Google Maps Review, and Google Ads media buying Gmail accounts with instant delivery.';
        pageUrl = 'https://buypvagmail.com/services';
      } else if (currentView === 'pricing') {
        pageTitle = 'PVA Gmail Wholesale Pricing & Tiered Volume Discounts | BuyPvaGmail';
        pageDesc = 'Wholesale pricing tiers for marketing agencies and lead generators. Up to 30% volume discount on bulk orders of verified USA & aged Gmail accounts.';
        pageUrl = 'https://buypvagmail.com/pricing';
      } else if (currentView === 'blog') {
        if (selectedArticleSlug) {
          const matchedGuide = blogGuides.find((g) => g.slug === selectedArticleSlug);
          if (matchedGuide) {
            pageTitle = `${matchedGuide.title} | BuyPvaGmail`;
            pageDesc = matchedGuide.excerpt;
            pageUrl = `https://buypvagmail.com/blog/${matchedGuide.slug}`;
          } else {
            pageTitle = 'Gmail Warmup Guides & Agency SOP Protocols | BuyPvaGmail';
            pageDesc = 'Expert guides on anti-detect browser setup, residential proxy configuration, 2FA TOTP login, and warming protocols for maximum inbox delivery.';
            pageUrl = 'https://buypvagmail.com/blog';
          }
        } else {
          pageTitle = 'Gmail Warmup Guides & Agency SOP Protocols | BuyPvaGmail';
          pageDesc = 'Expert guides on anti-detect browser setup, residential proxy configuration, 2FA TOTP login, and warming protocols for maximum inbox delivery.';
          pageUrl = 'https://buypvagmail.com/blog';
        }
      } else if (currentView === 'faq') {
        pageTitle = 'Frequently Asked Questions (FAQ) — Buying PVA Accounts | BuyPvaGmail';
        pageDesc = 'Clear answers on PVA verification methods, replacement guarantees, delivery formats, cryptocurrency checkout, and multi-login security.';
        pageUrl = 'https://buypvagmail.com/faq';
      } else if (currentView === 'about') {
        pageTitle = 'About Us — Authoritative Supplier of Verified PVA Gmail | BuyPvaGmail';
        pageDesc = 'Learn how BuyPvaGmail delivers carrier SIM-verified and aged Gmail accounts to over 6,940+ digital marketing agencies and media buyers worldwide.';
        pageUrl = 'https://buypvagmail.com/about';
      } else if (currentView === 'contact') {
        pageTitle = 'Contact 24/7 Support Desk — Telegram, WhatsApp & Email | BuyPvaGmail';
        pageDesc = 'Connect with our live technical support desk on Telegram (@Go2Rapid) and WhatsApp (+1-253-408-0049) for instant account support and bulk quotes.';
        pageUrl = 'https://buypvagmail.com/contact';
      } else if (currentView === 'privacy') {
        pageTitle = 'Privacy Policy — Confidentiality & Order Data Protection | BuyPvaGmail';
        pageDesc = 'Read our customer data protection protocols, zero-log policy, and encrypted checkout security standards.';
        pageUrl = 'https://buypvagmail.com/privacy';
      } else if (currentView === 'terms') {
        pageTitle = 'Terms of Service — PVA Delivery & Usage Policy | BuyPvaGmail';
        pageDesc = 'Official service agreement, delivery specifications, acceptable usage guidelines, and warranty terms.';
        pageUrl = 'https://buypvagmail.com/terms';
      } else if (currentView === 'warranty') {
        pageTitle = '7-Day Free Replacement Guarantee & Warranty Policy | BuyPvaGmail';
        pageDesc = 'Comprehensive 7-day 1-to-1 account replacement policy covering login checkpoints, password invalidations, and disabled states.';
        pageUrl = 'https://buypvagmail.com/warranty';
      } else if (currentView === 'sitemap') {
        pageTitle = 'HTML Sitemap Index — All Pages, Services & Guides | BuyPvaGmail';
        pageDesc = 'Complete directory of all BuyPvaGmail verified product tiers, 2008–2025 vintage accounts, technical guides, and legal resources.';
        pageUrl = 'https://buypvagmail.com/sitemap';
      } else if (currentView === 'instant-indexing') {
        pageTitle = 'Rank Math SEO Instant Indexing Console & API Fast Dispatcher | BuyPvaGmail';
        pageDesc = 'Directly dispatch fast indexing notifications to Google Indexing API v3, Microsoft Bing, and Yandex via IndexNow Protocol with verified cryptographic keys.';
        pageUrl = 'https://buypvagmail.com/instant-indexing';
      } else if (currentView === 'not-found') {
        pageTitle = '404 - Page Not Found | BuyPvaGmail';
        pageDesc = 'The requested page could not be located. Search our inventory of verified USA PVA and 2008–2025 aged Gmail accounts.';
        pageUrl = 'https://buypvagmail.com/404';
        isRobotsIndex = false;
      }

      // Update Document Title
      document.title = pageTitle;

      // Update Meta Tags
      const setMeta = (nameAttr: string, nameValue: string, contentValue: string) => {
        let meta = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(nameAttr, nameValue);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', contentValue);
      };

      setMeta('name', 'description', pageDesc);
      setMeta('name', 'title', pageTitle);
      setMeta('property', 'og:title', pageTitle);
      setMeta('property', 'og:description', pageDesc);
      setMeta('property', 'og:url', pageUrl);
      setMeta('name', 'twitter:title', pageTitle);
      setMeta('name', 'twitter:description', pageDesc);
      setMeta('name', 'twitter:url', pageUrl);

      const robotsDirective = isRobotsIndex
        ? 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        : 'noindex, follow';
      setMeta('name', 'robots', robotsDirective);
      setMeta('name', 'googlebot', robotsDirective);
      setMeta('name', 'bingbot', robotsDirective);

      // Update Canonical Link
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', pageUrl);

      // Inject / Update Dynamic BreadcrumbList Structured Data (Schema.org)
      let breadcrumbScript = document.getElementById('dynamic-breadcrumb-schema');
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = 'dynamic-breadcrumb-schema';
        breadcrumbScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbScript);
      }

      const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://buypvagmail.com/"
        }
      ];

      if (currentView === 'service-detail') {
        const product = getServiceById(selectedServiceId) || detailedServicesData[0];
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://buypvagmail.com/services"
        });
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 3,
          "name": product.name,
          "item": `https://buypvagmail.com/services/${product.id}`
        });
      } else if (currentView === 'services-catalog') {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Services Catalog",
          "item": "https://buypvagmail.com/services"
        });
      } else if (currentView === 'blog') {
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": "Guides & Blog",
          "item": "https://buypvagmail.com/blog"
        });
        if (selectedArticleSlug) {
          const guide = blogGuides.find((g) => g.slug === selectedArticleSlug);
          if (guide) {
            breadcrumbItems.push({
              "@type": "ListItem",
              "position": 3,
              "name": guide.title,
              "item": `https://buypvagmail.com/blog/${guide.slug}`
            });
          }
        }
      } else if (currentView !== 'home') {
        const cleanName = currentView.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": 2,
          "name": cleanName,
          "item": pageUrl
        });
      }

      breadcrumbScript.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      });

      // Inject / Update Dynamic Product Structured Data (Schema.org / Merchant Listings)
      // Only present on individual purchasable product pages (/services/:id)
      let productScript = document.getElementById('dynamic-product-schema');
      if (currentView === 'service-detail') {
        if (!productScript) {
          productScript = document.createElement('script');
          productScript.id = 'dynamic-product-schema';
          productScript.setAttribute('type', 'application/ld+json');
          document.head.appendChild(productScript);
        }
        const product = getServiceById(selectedServiceId) || detailedServicesData[0];
        const productUrl = `https://buypvagmail.com/services/${product.id}`;
        const productImage = `https://buypvagmail.com/images/products/${product.id}.png`;

        const skuMap: Record<string, string> = {
          'usa-gmail-accounts': 'PVA-USA-2025',
          'pva-gmail-accounts': 'PVA-GLOBAL-2025',
          'aged-mix-country-gmail': 'AGED-2008-2025',
          'aged-gmail-for-reviews': 'AGED-GMB-REVIEW',
          'aged-gmail-for-google-ads': 'AGED-GADS-PRO',
          'new-gmail-accounts': 'FRESH-PVA-2025'
        };
        const sku = skuMap[product.id] || `PVA-${product.id.toUpperCase()}`;

        const productSchema = {
          "@context": "https://schema.org",
          "@type": "Product",
          "@id": `${productUrl}#product`,
          "name": product.name,
          "description": product.shortDescription || product.description,
          "image": [productImage],
          "sku": sku,
          "brand": {
            "@type": "Brand",
            "name": "BuyPvaGmail"
          },
          "offers": {
            "@type": "Offer",
            "url": productUrl,
            "priceCurrency": "USD",
            "price": product.unitPrice.toFixed(2),
            "priceValidUntil": "2027-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "BuyPvaGmail",
              "url": "https://buypvagmail.com/"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating.toFixed(2),
            "reviewCount": product.reviewsCount,
            "bestRating": "5",
            "worstRating": "1"
          }
        };
        productScript.textContent = JSON.stringify(productSchema);
      } else if (productScript) {
        productScript.remove();
      }

      // Trigger Google Analytics 4 SPA page view telemetry
      trackPageView(pageUrl.replace('https://buypvagmail.com', '') || '/', pageTitle);
    } catch {
      // ignore
    }
  }, [currentView, selectedServiceId, selectedArticleSlug]);

  // Initialize GA on application mount
  useEffect(() => {
    try {
      initGoogleAnalytics();
    } catch {
      // ignore
    }
  }, []);

  // Clean URL and View Synchronization with standard pathnames (/contact, /blog, /services, /services/:id, etc.)
  useEffect(() => {
    const handleUrlRouting = () => {
      try {
        const rawPath = window.location.pathname.replace(/\/+$/, '') || '/';
        const searchParams = new URLSearchParams(window.location.search);
        const viewParam = searchParams.get('view');
        const serviceParam = searchParams.get('service');
        const rawHash = (window.location.hash || '').replace(/^#\/?/, '').trim();

        // Effective path can come from pathname or hash
        const effectivePath = rawHash && (
          rawHash.startsWith('service') || 
          rawHash.startsWith('pricing') || 
          rawHash.startsWith('about') || 
          rawHash.startsWith('blog') || 
          rawHash.startsWith('faq') || 
          rawHash.startsWith('contact') ||
          rawHash.startsWith('privacy') ||
          rawHash.startsWith('terms') ||
          rawHash.startsWith('warranty') ||
          rawHash.startsWith('sitemap') ||
          rawHash === '404' ||
          rawHash === 'not-found'
        )
          ? '/' + rawHash
          : rawPath;

        if (effectivePath === '/404' || viewParam === '404' || viewParam === 'not-found') {
          setCurrentView('not-found');
          setActiveSection('not-found');
          setInvalidPath(effectivePath);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Match service detail: /services/:id or /service/:id or ?service=:id or ?view=service-detail&service=:id
        let targetServiceId: string | null = null;
        if (effectivePath.startsWith('/services/') || effectivePath.startsWith('/service/')) {
          const parts = effectivePath.split('/');
          if (parts[2]) {
            targetServiceId = decodeURIComponent(parts[2]);
            const matchedService = getServiceById(targetServiceId);
            if (matchedService) {
              setSelectedServiceId(matchedService.id);
              setCurrentView('service-detail');
              setActiveSection('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            } else {
              setCurrentView('not-found');
              setActiveSection('not-found');
              setInvalidPath(effectivePath);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }
          }
        } else if (serviceParam) {
          targetServiceId = serviceParam;
          const matchedService = getServiceById(targetServiceId);
          if (matchedService) {
            setSelectedServiceId(matchedService.id);
            setCurrentView('service-detail');
            setActiveSection('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
        }

        if (viewParam === 'service-detail') {
          const matchedService = targetServiceId ? getServiceById(targetServiceId) : detailedServicesData[0];
          setSelectedServiceId((matchedService || detailedServicesData[0]).id);
          setCurrentView('service-detail');
          setActiveSection('services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }


        // SMTP Category Page
        if (
          effectivePath === '/smtp' ||
          effectivePath === '/smtp-category' ||
          effectivePath === '/smtp-services' ||
          effectivePath === '/smtp-accounts' ||
          effectivePath === '/category/smtp' ||
          viewParam === 'smtp' ||
          rawHash === 'smtp' ||
          rawHash === 'smtp-services'
        ) {
          setCurrentView('smtp');
          setActiveSection('smtp');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Services Catalog (including /products, /shop, /category)
        if (
          effectivePath === '/services' ||
          effectivePath === '/services-catalog' ||
          effectivePath === '/products' ||
          effectivePath === '/shop' ||
          effectivePath === '/category' ||
          viewParam === 'services' ||
          viewParam === 'services-catalog' ||
          rawHash === 'services' ||
          rawHash === 'products' ||
          rawHash === 'shop'
        ) {
          setCurrentView('services-catalog');
          setActiveSection('services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Pricing
        if (effectivePath === '/pricing' || viewParam === 'pricing' || rawHash === 'pricing') {
          setCurrentView('pricing');
          setActiveSection('pricing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // About
        if (
          effectivePath === '/about' ||
          effectivePath === '/about-us' ||
          viewParam === 'about' ||
          rawHash === 'about' ||
          rawHash === 'about-us'
        ) {
          setCurrentView('about');
          setActiveSection('about');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Direct blog guide article check: /blog/:slug or /guides/:slug
        if (effectivePath.startsWith('/blog/') || effectivePath.startsWith('/guides/')) {
          const parts = effectivePath.split('/');
          if (parts[2]) {
            const slug = decodeURIComponent(parts[2]);
            const matchedGuide = blogGuides.find((g) => g.slug === slug);
            if (matchedGuide) {
              setSelectedArticleSlug(matchedGuide.slug);
              setCurrentView('blog');
              setActiveSection('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            } else {
              setCurrentView('not-found');
              setActiveSection('not-found');
              setInvalidPath(effectivePath);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }
          }
        }

        // Blog / Guides Overview
        if (
          effectivePath === '/blog' ||
          effectivePath === '/guides' ||
          viewParam === 'blog' ||
          rawHash === 'blog' ||
          rawHash === 'guides'
        ) {
          setSelectedArticleSlug(null);
          setCurrentView('blog');
          setActiveSection('blog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // FAQ
        if (effectivePath === '/faq' || viewParam === 'faq' || rawHash === 'faq') {
          setCurrentView('faq');
          setActiveSection('faq');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Contact
        if (effectivePath === '/contact' || viewParam === 'contact' || rawHash === 'contact') {
          setCurrentView('contact');
          setActiveSection('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Privacy Policy
        if (
          effectivePath === '/privacy' || 
          effectivePath === '/privacy-policy' || 
          viewParam === 'privacy' || 
          rawHash === 'privacy' || 
          rawHash === 'privacy-policy'
        ) {
          setCurrentView('privacy');
          setActiveSection('privacy');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Terms of Service
        if (
          effectivePath === '/terms' || 
          effectivePath === '/terms-of-service' || 
          viewParam === 'terms' || 
          rawHash === 'terms' || 
          rawHash === 'terms-of-service'
        ) {
          setCurrentView('terms');
          setActiveSection('terms');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Warranty Guidelines
        if (
          effectivePath === '/warranty' || 
          effectivePath === '/warranty-guidelines' || 
          effectivePath === '/replacement-policy' || 
          viewParam === 'warranty' || 
          rawHash === 'warranty' || 
          rawHash === 'warranty-guidelines' ||
          rawHash === 'replacement-policy'
        ) {
          setCurrentView('warranty');
          setActiveSection('warranty');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Sitemap
        if (
          effectivePath === '/sitemap' || 
          effectivePath === '/html-sitemap' || 
          viewParam === 'sitemap' || 
          rawHash === 'sitemap' || 
          rawHash === 'html-sitemap'
        ) {
          setCurrentView('sitemap');
          setActiveSection('sitemap');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Instant Indexing (Rank Math & IndexNow)
        if (
          effectivePath === '/instant-indexing' || 
          effectivePath === '/instant-index' || 
          effectivePath === '/rank-math' || 
          effectivePath === '/rankmath' || 
          viewParam === 'instant-indexing' || 
          rawHash === 'instant-indexing' || 
          rawHash === 'instant-index'
        ) {
          setCurrentView('instant-indexing');
          setActiveSection('sitemap');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Home (/)
        if (effectivePath === '/' || effectivePath === '' || viewParam === 'home' || rawHash === 'home') {
          setCurrentView('home');
          setActiveSection('home');
          return;
        }

        // Any other unrecognized route -> 404
        setCurrentView('not-found');
        setActiveSection('not-found');
        setInvalidPath(effectivePath);
      } catch (err) {
        console.error('URL Routing error:', err);
        setCurrentView('home');
      }
    };

    handleUrlRouting();
    window.addEventListener('popstate', handleUrlRouting);
    window.addEventListener('hashchange', handleUrlRouting);
    return () => {
      window.removeEventListener('popstate', handleUrlRouting);
      window.removeEventListener('hashchange', handleUrlRouting);
    };
  }, []);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('buypvagmail_cart', JSON.stringify(cart));
    } catch (e) {
      // Ignore storage errors
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const navigateToPage = (view: AppView, serviceId?: string, skipHistoryPush?: boolean, articleSlug?: string) => {
    let targetUrl = '/';

    if (view === 'service-detail') {
      const validId = serviceId || selectedServiceId || detailedServicesData[0].id;
      const targetService = detailedServicesData.find((s) => s.id === validId) || detailedServicesData[0];
      setSelectedServiceId(targetService.id);
      setCurrentView('service-detail');
      setActiveSection('services');
      targetUrl = `/services/${encodeURIComponent(targetService.id)}`;
    } else if (view === 'services-catalog') {
      setCurrentView('services-catalog');
      setActiveSection('services');
      targetUrl = '/services';
    } else if (view === 'smtp') {
      setCurrentView('smtp');
      setActiveSection('smtp');
      targetUrl = '/smtp';
    } else if (view === 'pricing') {
      setCurrentView('pricing');
      setActiveSection('pricing');
      targetUrl = '/pricing';
    } else if (view === 'about') {
      setCurrentView('about');
      setActiveSection('about');
      targetUrl = '/about';
    } else if (view === 'blog') {
      setCurrentView('blog');
      setActiveSection('blog');
      if (articleSlug) {
        setSelectedArticleSlug(articleSlug);
        targetUrl = `/blog/${articleSlug}`;
      } else {
        setSelectedArticleSlug(null);
        targetUrl = '/blog';
      }
    } else if (view === 'faq') {
      setCurrentView('faq');
      setActiveSection('faq');
      targetUrl = '/faq';
    } else if (view === 'contact') {
      setCurrentView('contact');
      setActiveSection('contact');
      targetUrl = '/contact';
    } else if (view === 'privacy') {
      setCurrentView('privacy');
      setActiveSection('privacy');
      targetUrl = '/privacy';
    } else if (view === 'terms') {
      setCurrentView('terms');
      setActiveSection('terms');
      targetUrl = '/terms';
    } else if (view === 'warranty') {
      setCurrentView('warranty');
      setActiveSection('warranty');
      targetUrl = '/warranty';
    } else if (view === 'sitemap') {
      setCurrentView('sitemap');
      setActiveSection('sitemap');
      targetUrl = '/sitemap';
    } else if (view === 'instant-indexing') {
      setCurrentView('instant-indexing');
      setActiveSection('sitemap');
      targetUrl = '/instant-indexing';
    } else if (view === 'not-found') {
      setCurrentView('not-found');
      setActiveSection('not-found');
      targetUrl = '/404';
    } else {
      setCurrentView('home');
      setActiveSection('home');
      targetUrl = '/';
    }

    if (!skipHistoryPush) {
      try {
        window.history.pushState({ view, serviceId }, '', targetUrl);
      } catch {
        // Fallback for restricted iframe environments
        try {
          window.location.hash = targetUrl.replace(/^\//, '');
        } catch {
          // ignore
        }
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: ServiceProduct, quantity: number, packageId?: string, packageName?: string) => {
    const pricing = calculateProductPricing(product, quantity, packageId);
    const resolvedPackageName = packageName || pricing.packageName;
    const resolvedPackageId = packageId || pricing.packageId;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => {
        if (pricing.isSmtp) {
          return item.product.id === product.id && item.packageId === resolvedPackageId;
        }
        return item.product.id === product.id;
      });

      if (existingIndex > -1) {
        const updated = [...prev];
        if (pricing.isSmtp) {
          // Keep existing package and show drawer
          return updated;
        }
        const newQty = updated[existingIndex].quantity + quantity;
        const newPricing = calculateProductPricing(product, newQty);

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: newPricing.totalPrice
        };
        return updated;
      } else {
        return [
          ...prev, 
          { 
            product, 
            quantity, 
            totalPrice: pricing.totalPrice,
            packageName: resolvedPackageName,
            packageId: resolvedPackageId
          }
        ];
      }
    });

    const label = resolvedPackageName ? `${product.name} (${resolvedPackageName})` : `${quantity}x ${product.name}`;
    showToast(`Added ${label} to cart!`);
    setIsCartOpen(true);

    // GA4 Enhanced E-commerce track add to cart
    trackAddToCart({
      id: product.id,
      name: product.name,
      price: pricing.unitPrice,
      quantity,
      category: product.category === 'smtp' ? 'SMTP Sending Accounts' : 'PVA Gmail Accounts'
    });
  };

  const handleQuickBuy = (product: ServiceProduct, quantity: number) => {
    setIsCartCheckout(false);
    setOrderModalProduct(product);
    setOrderModalQuantity(quantity);
    setIsOrderModalOpen(true);

    // GA4 Enhanced E-commerce track intent
    trackAddToCart({
      id: product.id,
      name: product.name,
      price: product.unitPrice,
      quantity,
      category: product.category === 'smtp' ? 'SMTP Sending Accounts' : 'PVA Gmail Accounts'
    });
  };

  const handleUpdateCartQuantity = (productId: string, qty: number, packageId?: string) => {
    if (qty <= 0) {
      handleRemoveCartItem(productId, packageId);
      return;
    }
    setCart((prev) => {
      return prev.map((item) => {
        const isMatch = packageId 
          ? (item.product.id === productId && item.packageId === packageId)
          : (item.product.id === productId);

        if (isMatch) {
          const newPricing = calculateProductPricing(item.product, qty, item.packageId);
          return {
            ...item,
            quantity: qty,
            totalPrice: newPricing.totalPrice
          };
        }
        return item;
      });
    });
  };

  const handleRemoveCartItem = (productId: string, packageId?: string) => {
    const itemToRemove = cart.find((i) => 
      packageId ? (i.product.id === productId && i.packageId === packageId) : (i.product.id === productId)
    );
    setCart((prev) => prev.filter((item) => 
      packageId ? !(item.product.id === productId && item.packageId === packageId) : (item.product.id !== productId)
    ));
    if (itemToRemove) {
      showToast(`Removed ${itemToRemove.product.name} from cart`);
      trackRemoveFromCart(itemToRemove.product.id, itemToRemove.product.name);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Shopping cart cleared');
  };

  const handleOpenOrderModal = (productId?: string) => {
    setIsCartCheckout(false);
    if (productId) {
      const found = servicesData.find((p) => p.id === productId);
      if (found) {
        setOrderModalProduct(found);
        setOrderModalQuantity(found.baseQuantity);
      }
    }
    setIsOrderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Full Page Reload & Mount Brand Logo Loader */}
      <PageLoader 
        isLoading={isPageLoading} 
        onFinish={() => setIsPageLoading(false)} 
      />

      {/* Sticky Top Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrderModal={() => handleOpenOrderModal()}
        onOpenCheckerModal={() => setIsCheckerModalOpen(true)}
        onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
        onOpenSeoAnalytics={() => setIsSeoAnalyticsOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onNavigateToPage={(page, serviceId) => {
          navigateToPage(page as AppView, serviceId);
        }}
      />

      {/* Dynamic Page Router */}
      <main>
        {currentView === 'services-catalog' && (
          <ServicesCatalogPage
            onSelectServicePage={(id) => navigateToPage('service-detail', id)}
            onQuickBuy={handleQuickBuy}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToSmtp={() => navigateToPage('smtp')}
          />
        )}

        {currentView === 'smtp' && (
          <SmtpCategoryPage
            onSelectServicePage={(id) => navigateToPage('service-detail', id)}
            onQuickBuy={handleQuickBuy}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToPricing={() => navigateToPage('pricing')}
            onNavigateToContact={() => navigateToPage('contact')}
          />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailPage
            key={selectedServiceId}
            serviceId={selectedServiceId}
            onBackToCatalog={() => navigateToPage('services-catalog')}
            onSelectOtherService={(id) => navigateToPage('service-detail', id)}
            onQuickBuy={handleQuickBuy}
            onAddToCart={handleAddToCart}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'pricing' && (
          <PricingPage
            onQuickBuy={handleQuickBuy}
            onAddToCart={handleAddToCart}
            onSelectServicePage={(id) => navigateToPage('service-detail', id)}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'about' && (
          <AboutUsPage
            onNavigateToServices={() => navigateToPage('services-catalog')}
            onNavigateToContact={() => navigateToPage('contact')}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage 
            initialArticleSlug={selectedArticleSlug}
            onSelectArticleSlug={(slug) => setSelectedArticleSlug(slug)}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'faq' && (
          <FaqPage
            onNavigateToContact={() => navigateToPage('contact')}
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage 
            onNavigateHome={() => navigateToPage('home')}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicyPage 
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToContact={() => navigateToPage('contact')}
          />
        )}

        {currentView === 'terms' && (
          <TermsOfServicePage 
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToContact={() => navigateToPage('contact')}
            onNavigateToWarranty={() => navigateToPage('warranty')}
          />
        )}

        {currentView === 'warranty' && (
          <WarrantyGuidelinesPage 
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToContact={() => navigateToPage('contact')}
            onNavigateToTerms={() => navigateToPage('terms')}
          />
        )}

        {currentView === 'sitemap' && (
          <SitemapPage 
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToPage={(page) => navigateToPage(page)}
            onNavigateToServiceDetail={(serviceId) => navigateToPage('service-detail', serviceId)}
          />
        )}

        {currentView === 'instant-indexing' && (
          <InstantIndexingPage 
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToPage={(page) => navigateToPage(page)}
            onNavigateToServiceDetail={(serviceId) => navigateToPage('service-detail', serviceId)}
          />
        )}

        {currentView === 'not-found' && (
          <NotFoundPage 
            onNavigateHome={() => navigateToPage('home')}
            onNavigateToPage={(page) => navigateToPage(page)}
            onNavigateToServiceDetail={(serviceId) => navigateToPage('service-detail', serviceId)}
            invalidPath={invalidPath}
          />
        )}

        {currentView === 'home' && (
          <>
            {/* Hero Banner */}
            <Hero
              onOrderClick={() => handleOpenOrderModal()}
              onExplorePricing={() => navigateToPage('pricing')}
              onOpenChecker={() => setIsCheckerModalOpen(true)}
            />

            {/* 6 Services Grid with Tier Calculators */}
            <ServicesSection
              onAddToCart={handleAddToCart}
              onQuickBuy={handleQuickBuy}
              onExploreServicePage={(serviceId) => navigateToPage('service-detail', serviceId)}
            />

            {/* Why 6,940+ Agencies Choose BuyPvaGmail */}
            <WhyChooseUs />

            {/* BuyPvaGmail.com vs Cheap VoIP Suppliers */}
            <ComparisonSection
              onOrderClick={() => handleOpenOrderModal()}
            />

            {/* Transparent Tiered Agency Rates */}
            <TieredPricing
              onOrderBatch={(product, qty) => {
                setOrderModalProduct(product);
                setOrderModalQuantity(qty);
                setIsOrderModalOpen(true);
              }}
            />

            {/* Trusted by Leaders in Digital Growth (Testimonials & Proof) */}
            <ReviewsSection />

            {/* Blog & 50+ Guides */}
            <GuidesSection />

            {/* FAQ */}
            <FaqSection />

            {/* Contact Section */}
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenOrderModal={handleOpenOrderModal}
        onOpenCheckerModal={() => setIsCheckerModalOpen(true)}
        onOpenTrackingModal={() => setIsTrackingModalOpen(true)}
        onOpenSeoAnalytics={() => setIsSeoAnalyticsOpen(true)}
        onNavigateToPage={(page, serviceId) => {
          navigateToPage(page as AppView, serviceId);
        }}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={(discountPercent, couponCode) => {
          setIsCartOpen(false);
          setIsCartCheckout(true);
          setCartDiscountPercent(discountPercent || 0);
          setCartCouponCode(couponCode || '');
          setIsOrderModalOpen(true);
        }}
      />

      {/* Order & Checkout Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setIsCartCheckout(false);
        }}
        initialProduct={orderModalProduct}
        initialQuantity={orderModalQuantity}
        cartItems={cart.length > 0 ? cart : []}
        isCartCheckout={isCartCheckout}
        cartDiscountPercent={cartDiscountPercent}
        cartCouponCode={cartCouponCode}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        onOrderSuccess={(order) => {
          setCart([]);
          setIsCartCheckout(false);
          try {
            localStorage.setItem('buypvagmail_last_order', JSON.stringify(order));
            // GA4 Enhanced E-commerce track conversion
            trackPurchase(
              order.orderId || 'ORD-NEW', 
              order.items || [{ id: order.productId, name: order.productName, price: order.unitPrice, quantity: order.quantity }], 
              order.totalAmount || 0, 
              order.paymentMethod || 'Cryptocurrency'
            );
          } catch (e) {
            // ignore
          }
        }}
      />

      {/* Order Tracking & Delivery Progress Modal */}
      <OrderTrackingModal
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        onOpenChecker={() => {
          setIsTrackingModalOpen(false);
          setIsCheckerModalOpen(true);
        }}
      />

      {/* Account Syntax & 2FA Validator Modal */}
      <AccountCheckerModal
        isOpen={isCheckerModalOpen}
        onClose={() => setIsCheckerModalOpen(false)}
      />

      {/* Google Analytics 4 & Rank Math SEO Telemetry Hub Modal */}
      <SeoAnalyticsModal
        isOpen={isSeoAnalyticsOpen}
        onClose={() => setIsSeoAnalyticsOpen(false)}
        onNavigateToPage={(page) => navigateToPage(page)}
      />

      {/* 24/7 Live Support Bubble (Left) */}
      <LiveSupportWidget />

      {/* Floating Telegram & WhatsApp Buttons (Right) */}
      <FloatingSocialButtons />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
