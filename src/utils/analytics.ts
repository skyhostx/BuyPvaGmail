// Google Analytics 4 (GA4) & Rank Math SEO Telemetry Engine for BuyPvaGmail

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  params: Record<string, any>;
  timestamp: string;
}

const DEFAULT_GA_ID = 'G-BUYPVAGMAIL';
const STORAGE_KEY = 'buypva_ga_measurement_id';
const EVENTS_STORAGE_KEY = 'buypva_ga_recent_events';

// In-memory event log for live UI inspector
let recentEvents: AnalyticsEvent[] = [];
const eventListeners: Array<(events: AnalyticsEvent[]) => void> = [];

export const getStoredGAId = (): string => {
  if (typeof window === 'undefined') return DEFAULT_GA_ID;
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_GA_ID;
};

export const setStoredGAId = (id: string): void => {
  if (typeof window === 'undefined') return;
  const cleanId = id.trim().toUpperCase();
  localStorage.setItem(STORAGE_KEY, cleanId);
  initGoogleAnalytics(cleanId);
};

export const getRecentEvents = (): AnalyticsEvent[] => {
  return [...recentEvents];
};

export const subscribeToAnalyticsEvents = (callback: (events: AnalyticsEvent[]) => void): (() => void) => {
  eventListeners.push(callback);
  callback([...recentEvents]);
  return () => {
    const idx = eventListeners.indexOf(callback);
    if (idx !== -1) eventListeners.splice(idx, 1);
  };
};

const notifyListeners = () => {
  eventListeners.forEach((listener) => {
    try {
      listener([...recentEvents]);
    } catch {
      // ignore listener errors
    }
  });
};

const logInternalEvent = (eventName: string, params: Record<string, any> = {}) => {
  const newEvent: AnalyticsEvent = {
    id: `ga_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    eventName,
    params,
    timestamp: new Date().toLocaleTimeString()
  };

  recentEvents = [newEvent, ...recentEvents.slice(0, 49)];
  notifyListeners();
};

/**
 * Initialize Google Analytics GA4 gtag script tag dynamically
 */
export const initGoogleAnalytics = (measurementId?: string): void => {
  if (typeof window === 'undefined') return;

  const gaId = measurementId || getStoredGAId();

  // Ensure window.dataLayer exists
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  // Load external gtag.js script if not present
  const existingScript = document.getElementById('google-analytics-gtag');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'google-analytics-gtag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);
  }

  // Configure GA
  window.gtag('js', new Date());
  window.gtag('config', gaId, {
    send_page_view: false, // We manually send page_view on SPA transitions
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  logInternalEvent('gtag_initialized', { measurement_id: gaId, mode: 'SPA_HYDRATED' });
};

/**
 * Track SPA Page View in GA4
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined') return;
  const gaId = getStoredGAId();

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: path,
      page_title: title || document.title,
      send_to: gaId
    });
  }

  logInternalEvent('page_view', {
    path,
    title: title || (typeof document !== 'undefined' ? document.title : ''),
    url: typeof window !== 'undefined' ? window.location.href : path
  });
};

/**
 * Generic Custom Event Dispatcher
 */
export const trackEvent = (eventName: string, params: Record<string, any> = {}): void => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  logInternalEvent(eventName, params);
};

/**
 * E-commerce: Track Add to Cart
 */
export const trackAddToCart = (item: {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category?: string;
}): void => {
  trackEvent('add_to_cart', {
    currency: 'USD',
    value: item.price * item.quantity,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_category: item.category || 'PVA Gmail Accounts'
      }
    ]
  });
};

/**
 * E-commerce: Track Remove from Cart
 */
export const trackRemoveFromCart = (id: string, name: string): void => {
  trackEvent('remove_from_cart', {
    items: [
      {
        item_id: id,
        item_name: name
      }
    ]
  });
};

/**
 * E-commerce: Track Begin Checkout
 */
export const trackBeginCheckout = (items: Array<any>, totalValue: number): void => {
  trackEvent('begin_checkout', {
    currency: 'USD',
    value: totalValue,
    items_count: items.length
  });
};

/**
 * E-commerce: Track Purchase / Completed Order
 */
export const trackPurchase = (
  orderId: string,
  items: Array<any>,
  total: number,
  paymentMethod: string
): void => {
  trackEvent('purchase', {
    transaction_id: orderId,
    value: total,
    currency: 'USD',
    payment_type: paymentMethod,
    items: items.map((i) => ({
      item_id: i.id || i.product?.id,
      item_name: i.name || i.product?.name,
      price: i.unitPrice || i.product?.unitPrice || 0,
      quantity: i.quantity || 1
    }))
  });
};

/**
 * Track Customer Support Link Clicks (Telegram / WhatsApp / Email)
 */
export const trackSupportClick = (
  platform: 'telegram' | 'whatsapp' | 'email',
  location: string
): void => {
  trackEvent('contact_support_click', {
    support_platform: platform,
    click_location: location,
    timestamp: new Date().toISOString()
  });
};

/**
 * Track Instant Indexing API trigger
 */
export const trackIndexSubmission = (
  engine: 'IndexNow' | 'Google Indexing API',
  count: number,
  status: string
): void => {
  trackEvent('seo_index_submission', {
    indexing_engine: engine,
    urls_submitted_count: count,
    submission_status: status
  });
};
