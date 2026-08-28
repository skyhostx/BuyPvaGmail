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

import { ServiceProduct, CartItem, OrderDetails } from './types';
import { servicesData, detailedServicesData } from './data/servicesData';
import { Check, ShoppingBag } from 'lucide-react';

export type AppView = 
  | 'home' 
  | 'services-catalog' 
  | 'service-detail' 
  | 'pricing' 
  | 'about' 
  | 'blog' 
  | 'faq' 
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'warranty'
  | 'sitemap';

function getInitialRoute(): { view: AppView; serviceId: string } {
  try {
    const rawPath = typeof window !== 'undefined' ? (window.location.pathname.replace(/\/+$/, '') || '/') : '/';
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    const viewParam = searchParams.get('view');
    const serviceParam = searchParams.get('service');
    const rawHash = typeof window !== 'undefined' ? (window.location.hash || '').replace(/^#\/?/, '').trim() : '';

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
      rawHash.startsWith('sitemap')
    )
      ? '/' + rawHash
      : rawPath;

    let targetServiceId: string | null = null;
    if (effectivePath.startsWith('/services/') || effectivePath.startsWith('/service/')) {
      const parts = effectivePath.split('/');
      if (parts[2]) {
        targetServiceId = decodeURIComponent(parts[2]);
      }
    } else if (serviceParam) {
      targetServiceId = serviceParam;
    }

    if (targetServiceId || viewParam === 'service-detail') {
      const matched = detailedServicesData.find((s) => s.id === targetServiceId) || detailedServicesData[0];
      return { view: 'service-detail', serviceId: matched.id };
    }

    if (effectivePath === '/services' || effectivePath === '/services-catalog' || viewParam === 'services' || rawHash === 'services') {
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
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeSection, setActiveSection] = useState(initialRoute.view === 'home' ? 'home' : (initialRoute.view === 'service-detail' || initialRoute.view === 'services-catalog' ? 'services' : initialRoute.view));
  const [currentView, setCurrentView] = useState<AppView>(initialRoute.view);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialRoute.serviceId);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalProduct, setOrderModalProduct] = useState<ServiceProduct>(servicesData[0]);
  const [orderModalQuantity, setOrderModalQuantity] = useState<number>(2);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckerModalOpen, setIsCheckerModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Smooth page loading transition on reload / mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 850);
    return () => clearTimeout(timer);
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
        const effectivePath = rawHash && (rawHash.startsWith('service') || rawHash.startsWith('pricing') || rawHash.startsWith('about') || rawHash.startsWith('blog') || rawHash.startsWith('faq') || rawHash.startsWith('contact'))
          ? '/' + rawHash
          : rawPath;

        // Match service detail: /services/:id or /service/:id or ?service=:id or ?view=service-detail&service=:id
        let targetServiceId: string | null = null;
        if (effectivePath.startsWith('/services/') || effectivePath.startsWith('/service/')) {
          const parts = effectivePath.split('/');
          if (parts[2]) {
            targetServiceId = decodeURIComponent(parts[2]);
          }
        } else if (serviceParam) {
          targetServiceId = serviceParam;
        }

        if (targetServiceId || viewParam === 'service-detail') {
          const matchedService = detailedServicesData.find((s) => s.id === targetServiceId) || detailedServicesData[0];
          setSelectedServiceId(matchedService.id);
          setCurrentView('service-detail');
          setActiveSection('services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        // Services Catalog
        if (
          effectivePath === '/services' ||
          effectivePath === '/services-catalog' ||
          viewParam === 'services' ||
          viewParam === 'services-catalog' ||
          rawHash === 'services'
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

        // Blog / Guides
        if (
          effectivePath === '/blog' ||
          effectivePath === '/guides' ||
          viewParam === 'blog' ||
          rawHash === 'blog' ||
          rawHash === 'guides'
        ) {
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

        // Default or Home (/)
        setCurrentView('home');
        setActiveSection('home');
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

  const navigateToPage = (view: AppView, serviceId?: string, skipHistoryPush?: boolean) => {
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
      targetUrl = '/blog';
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

  const handleAddToCart = (product: ServiceProduct, quantity: number) => {
    let discount = 0;
    if (quantity >= 500) discount = 0.30;
    else if (quantity >= 100) discount = 0.20;
    else if (quantity >= 50) discount = 0.15;
    else if (quantity >= 25) discount = 0.10;
    else if (quantity >= 10) discount = 0.05;

    const totalPrice = product.unitPrice * (1 - discount) * quantity;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        let newDiscount = 0;
        if (newQty >= 500) newDiscount = 0.30;
        else if (newQty >= 100) newDiscount = 0.20;
        else if (newQty >= 50) newDiscount = 0.15;
        else if (newQty >= 25) newDiscount = 0.10;
        else if (newQty >= 10) newDiscount = 0.05;

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: product.unitPrice * (1 - newDiscount) * newQty
        };
        return updated;
      } else {
        return [...prev, { product, quantity, totalPrice }];
      }
    });

    showToast(`Added ${quantity}x ${product.name} to your cart!`);
  };

  const handleQuickBuy = (product: ServiceProduct, quantity: number) => {
    setOrderModalProduct(product);
    setOrderModalQuantity(quantity);
    setIsOrderModalOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, qty: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.product.id === productId) {
          let discount = 0;
          if (qty >= 500) discount = 0.30;
          else if (qty >= 100) discount = 0.20;
          else if (qty >= 50) discount = 0.15;
          else if (qty >= 25) discount = 0.10;
          else if (qty >= 10) discount = 0.05;

          return {
            ...item,
            quantity: qty,
            totalPrice: item.product.unitPrice * (1 - discount) * qty
          };
        }
        return item;
      });
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenOrderModal = (productId?: string) => {
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
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(true);
        }}
      />

      {/* Order & Checkout Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialProduct={orderModalProduct}
        initialQuantity={orderModalQuantity}
        cartItems={cart.length > 0 ? cart : []}
        onOrderSuccess={(order) => {
          setCart([]);
          try {
            localStorage.setItem('buypvagmail_last_order', JSON.stringify(order));
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
