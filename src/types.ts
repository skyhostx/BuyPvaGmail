export interface ProductVariant {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  unitPrice: number;
  inStock: number;
  isPopular?: boolean;
  badge?: string;
  specs?: {
    carrier?: string;
    ipOrigin?: string;
    age?: string;
    trustScore?: string;
    deliverability?: string;
    sendingLimit?: string;
    recoveryMail?: boolean;
    twoFA?: boolean;
  };
}

export interface ServicePackage {
  id: string;
  name: string;
  quantity: number;
  price: number;
  unitPrice: number;
  discountPercent?: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

export interface ServiceProduct {
  id: string;
  name: string;
  shortDesc: string;
  shortDescription?: string;
  description?: string;
  focusKeyword?: string;
  tags?: string[];
  basePrice: number; // price for base quantity
  baseQuantity: number; // e.g. 2 pcs or 1 pcs
  unitPrice: number;
  popular?: boolean;
  bestValue?: boolean;
  age: string;
  category: 'usa' | 'pva' | 'aged' | 'reviews' | 'google-ads' | 'new' | 'smtp' | 'review';
  country: string;
  countryCode: string;
  inStock: number;
  rating: number;
  reviewsCount: number;
  features: string[];
  variants?: ProductVariant[];
  packages?: ServicePackage[];
  specs: {
    phoneType: string;
    recoveryMail: boolean;
    twoFA: boolean;
    ipOrigin: string;
    deliveryTime: string;
    warranty: string;
  };
}

export interface CartItem {
  product: ServiceProduct;
  quantity: number;
  selectedCountry?: string;
  selectedAge?: string;
  totalPrice: number;
  packageName?: string;
  packageId?: string;
  selectedVariant?: string;
  variantId?: string;
}

export interface BlogGuide {
  id: string;
  title: string;
  slug: string;
  category: 'Cold Outreach' | 'Antidetect & Proxies' | 'Google Ads' | 'Google Reviews' | 'Account Security' | 'SMTP Sending' | 'PVA Verification' | 'Bulk Accounts' | 'Aged Accounts';
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  tags: string[];
  image: string;
  productId?: string;
  productName?: string;
  productUrl?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General & Stock' | 'Delivery & Formats' | 'Replacements & Warranty' | 'Usage & Safety' | 'Billing & Crypto';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  stars: number;
  accountsBought: string;
  useCase: string;
  review: string;
  verified: boolean;
  date: string;
}

export interface ComparisonRow {
  feature: string;
  buyPvaGmail: string;
  cheapVoip: string;
  highlight?: boolean;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  email: string;
  telegramOrSkype?: string;
  paymentMethod: 'crypto' | 'skrill' | 'bank';
  cryptoCurrency?: string;
  skrillEmail?: string;
  bankAccountTitle?: string;
  bankTransferType?: string;
  txHash?: string;
  totalAmount: number;
  date: string;
  status: 'completed' | 'processing' | 'delivered';
}
