import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Download, 
  ArrowRight,
  ArrowLeft,
  Copy,
  QrCode,
  Upload,
  AlertTriangle,
  RefreshCw,
  Flame,
  Globe,
  Smartphone,
  Star,
  TrendingUp,
  Zap,
  Lock,
  Trash2,
  Wallet,
  CreditCard,
  Mail,
  Coins,
  Send,
  Landmark,
  Building2,
  FileText,
  ShoppingCart,
  Minus,
  Plus,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ServiceProduct, CartItem, OrderDetails } from '../types';
import { detailedServicesData, VINTAGE_YEARS, VINTAGE_YEAR_TIERS } from '../data/servicesData';
import { GmailLogo } from './GmailLogo';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: ServiceProduct;
  initialQuantity?: number;
  cartItems?: CartItem[];
  isCartCheckout?: boolean;
  cartDiscountPercent?: number;
  cartCouponCode?: string;
  onUpdateCartQuantity?: (productId: string, qty: number) => void;
  onRemoveCartItem?: (productId: string) => void;
  onOrderSuccess?: (order: OrderDetails) => void;
}

// 6 Categories matching UI Screenshot 1
interface ServiceCategoryConfig {
  id: string;
  name: string;
  subtitle: string;
  fromPrice: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const SERVICE_CATEGORIES: ServiceCategoryConfig[] = [
  {
    id: 'usa-gmail-accounts',
    name: 'USA Gmail Accounts',
    subtitle: '🔥 Best Seller • USA IP',
    fromPrice: 'From $6',
    icon: Flame,
    iconColor: 'text-red-500'
  },
  {
    id: 'pva-gmail-accounts',
    name: 'PVA Gmail Accounts',
    subtitle: '🛡️ 100% Phone Verified',
    fromPrice: 'From $6',
    icon: Smartphone,
    iconColor: 'text-blue-500'
  },
  {
    id: 'aged-mix-country-gmail',
    name: 'Aged Mix Country Gmail Accounts',
    subtitle: '🌍 Global Diversity • Best Value',
    fromPrice: 'From $5',
    icon: Globe,
    iconColor: 'text-emerald-500'
  },
  {
    id: 'aged-gmail-for-reviews',
    name: 'Aged Gmail Accounts For Reviews',
    subtitle: '⭐ 95%+ Stick Rate',
    fromPrice: 'From $6',
    icon: Star,
    iconColor: 'text-amber-500'
  },
  {
    id: 'aged-gmail-for-google-ads',
    name: 'Aged Gmail Accounts For Google Ads',
    subtitle: '🎯 Ads Ready • Top Tier',
    fromPrice: 'From $5',
    icon: TrendingUp,
    iconColor: 'text-purple-500'
  },
  {
    id: 'new-gmail-accounts',
    name: 'New Gmail Accounts',
    subtitle: '⚡ Lowest Price • High Volume',
    fromPrice: 'From $3',
    icon: Zap,
    iconColor: 'text-amber-500'
  }
];

// Quantity Tiers
interface QuantityTier {
  count: number;
  label: string;
  saveText: string;
  isPopular?: boolean;
}

const DEFAULT_QUANTITY_TIERS: QuantityTier[] = [
  { count: 2, label: 'Starter Pack', saveText: '' },
  { count: 5, label: '', saveText: 'Save 10%' },
  { count: 20, label: '', saveText: 'Save $5', isPopular: true },
  { count: 50, label: '', saveText: 'Save $20' },
  { count: 100, label: 'Best Agency Rate', saveText: '' }
];

// Bank Transfer Payment Configurations (USD ACH, USD SWIFT, EUR SEPA, GBP UK)
export type BankCurrencyId = 'USD_ACH' | 'USD_SWIFT' | 'EUR_SEPA' | 'GBP_UK';

export interface BankAccountDetails {
  id: BankCurrencyId;
  name: string;
  currency: string;
  currencySymbol: string;
  tabLabel: string;
  badge: string;
  badgeColor: string;
  accountTitle: string;
  accountType: string;
  accountNumber?: string;
  routingACH?: string;
  routingWire?: string;
  iban?: string;
  swiftBic?: string;
  sortCode?: string;
  bankName: string;
  bankAddress: string;
  partnerBank?: {
    name: string;
    address: string;
    swiftBic: string;
  };
  notes?: string;
}

export const BANK_TRANSFER_ACCOUNTS: Record<BankCurrencyId, BankAccountDetails> = {
  USD_ACH: {
    id: 'USD_ACH',
    name: 'ACH & Wire Transfer (USA Domestic)',
    currency: 'USD',
    currencySymbol: '$',
    tabLabel: 'USA ACH / Wire (USD)',
    badge: 'U.S. Domestic Bank Transfer',
    badgeColor: 'bg-blue-600 text-white',
    accountTitle: 'Md Sayrul Islam',
    accountType: 'Checking',
    accountNumber: '30000002977421',
    routingACH: '028000024',
    routingWire: '021000021',
    bankName: 'JP Morgan Chase NA',
    bankAddress: '270 Park Avenue, New York, NY 10017, US',
    notes: 'Partner bank: JP Morgan Chase NA. Use ACH Routing (028000024) for direct ACH or Wire Routing (021000021) for federal wire.'
  },
  USD_SWIFT: {
    id: 'USD_SWIFT',
    name: 'SWIFT International Transfer (USD)',
    currency: 'USD',
    currencySymbol: '$',
    tabLabel: 'USD SWIFT (Global)',
    badge: 'International SWIFT Transfer',
    badgeColor: 'bg-indigo-700 text-white',
    accountTitle: 'Md Sayrul Islam',
    accountType: 'Checking (Current)',
    iban: 'GB77 CLRB 0428 1200 0776 25',
    swiftBic: 'CLRBGB22XXX',
    sortCode: '042812',
    bankName: 'Clear Bank',
    bankAddress: 'Borough Yards, 13 Dirty Lane, London, SE1 9PA, UK',
    partnerBank: {
      name: 'JPMorgan Chase Bank, N.A.',
      address: 'New York, USA',
      swiftBic: 'CHASUS33'
    },
    notes: 'Only used for international SWIFT transfers. Partner Bank: JPMorgan Chase Bank, N.A. (CHASUS33, New York, USA).'
  },
  EUR_SEPA: {
    id: 'EUR_SEPA',
    name: 'SEPA & Euro Wire (EUR)',
    currency: 'EUR',
    currencySymbol: '€',
    tabLabel: 'EUR (SEPA / Europe)',
    badge: 'SEPA Euro Transfer',
    badgeColor: 'bg-emerald-700 text-white',
    accountTitle: 'Md Sayrul Islam',
    accountType: 'Checking (Current)',
    iban: 'GB36CLRB04281271577257',
    swiftBic: 'CLRBGB22XXX',
    accountNumber: '71577257',
    sortCode: '042812',
    bankName: 'Clear Bank',
    bankAddress: '133 Houndsditch, LONDON, EC3A 7BX',
    notes: 'Direct SEPA payment across Europe with zero intermediary fee.'
  },
  GBP_UK: {
    id: 'GBP_UK',
    name: 'UK Faster Payments / BACS (GBP)',
    currency: 'GBP',
    currencySymbol: '£',
    tabLabel: 'GBP (UK Bank / FPS)',
    badge: 'UK Faster Payments & BACS',
    badgeColor: 'bg-purple-700 text-white',
    accountTitle: 'Md Sayrul Islam',
    accountType: 'Checking (Current)',
    iban: 'GB73CLRB04097200937068',
    swiftBic: 'CLRBGB22XXX',
    accountNumber: '00937068',
    sortCode: '040972',
    bankName: 'Clear Bank',
    bankAddress: '133 Houndsditch, LONDON, EC3A 7BX',
    notes: 'Instant UK Faster Payments (FPS) or BACS transfer.'
  }
};

// Skrill Payment Configuration
const SKRILL_CONFIG = {
  id: 'SKRILL',
  name: 'Skrill',
  email: 'onlinespay247@gmail.com',
  badge: 'Instant E-Wallet / Card',
  badgeColor: 'bg-rose-900 text-white font-bold',
  description: 'Skrill-to-Skrill transfer or credit/debit card payment to onlinespay247@gmail.com'
};

// 7 Crypto Payment Options with Verified Wallets
type CryptoId = 
  | 'BSC' 
  | 'TRX' 
  | 'ETH' 
  | 'SOL' 
  | 'BTC' 
  | 'LTC' 
  | 'DOGE';

interface CryptoMethod {
  id: CryptoId;
  label: string;
  sublabel: string;
  networkTitle: string;
  networkBadge: string;
  networkBadgeColor: string;
  address: string;
  symbol: string;
}

const CRYPTO_METHODS: Record<CryptoId, CryptoMethod> = {
  BSC: {
    id: 'BSC',
    label: 'BSC',
    sublabel: 'BEP20 / BNB / USDT',
    networkTitle: 'Binance Smart Chain (BEP20 / BNB / USDT)',
    networkBadge: 'BSC / BEP20 Network',
    networkBadgeColor: 'bg-yellow-500 text-slate-950 font-bold',
    address: '0xb0a2b177e1770a03a5aa1d2629c52276fd93bdc6',
    symbol: 'BSC (BEP20)'
  },
  TRX: {
    id: 'TRX',
    label: 'TRX',
    sublabel: 'TRON / TRC20 / USDT',
    networkTitle: 'TRON / USDT (TRC20 / TRX)',
    networkBadge: 'TRC20 / TRON Network (Instant & Low Fee)',
    networkBadgeColor: 'bg-emerald-600 text-white font-bold',
    address: 'TSezBSdMrdARFQQebAYiwzkPku1qHijQEh',
    symbol: 'TRX / USDT (TRC20)'
  },
  ETH: {
    id: 'ETH',
    label: 'ETH',
    sublabel: 'Ethereum / ERC20',
    networkTitle: 'Ethereum / USDT (ERC20 / ETH)',
    networkBadge: 'ERC20 / Ethereum Mainnet',
    networkBadgeColor: 'bg-indigo-600 text-white font-bold',
    address: '0xb0a2b177e1770a03a5aa1d2629c52276fd93bdc6',
    symbol: 'ETH / ERC20'
  },
  SOL: {
    id: 'SOL',
    label: 'SOL',
    sublabel: 'Solana Network',
    networkTitle: 'Solana (SOL)',
    networkBadge: 'Solana Mainnet (Fast & Low Fee)',
    networkBadgeColor: 'bg-purple-600 text-white font-bold',
    address: 'EDWaA1Kp6K9USLwuBAzmCvBxQkDiQ4Bk3LLgFxA2YdVr',
    symbol: 'SOL (Solana)'
  },
  BTC: {
    id: 'BTC',
    label: 'BTC',
    sublabel: 'Bitcoin Mainnet',
    networkTitle: 'Bitcoin (BTC)',
    networkBadge: 'Bitcoin Mainnet',
    networkBadgeColor: 'bg-amber-600 text-white font-bold',
    address: '18QpVzNvW5YVtywK4Zih1VKLB2gEhRojT9',
    symbol: 'BTC (Bitcoin)'
  },
  LTC: {
    id: 'LTC',
    label: 'LTC',
    sublabel: 'Litecoin Network',
    networkTitle: 'Litecoin (LTC)',
    networkBadge: 'Litecoin Mainnet (Ultra Low Fee)',
    networkBadgeColor: 'bg-blue-600 text-white font-bold',
    address: 'LR676Tw3B3FatHCbnjT14D1TmGfpmwM2WG',
    symbol: 'LTC (Litecoin)'
  },
  DOGE: {
    id: 'DOGE',
    label: 'DOGE',
    sublabel: 'Dogecoin Network',
    networkTitle: 'Dogecoin (DOGE)',
    networkBadge: 'Dogecoin Mainnet',
    networkBadgeColor: 'bg-amber-500 text-slate-950 font-bold',
    address: 'DAVEHhBy6NVajnwF9g8eVHsQj1rmfVBx3n',
    symbol: 'DOGE (Dogecoin)'
  }
};

const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'France',
  'Germany',
  'Netherlands',
  'Spain',
  'Italy',
  'Brazil',
  'India',
  'Singapore',
  'United Arab Emirates',
  'Japan',
  'Worldwide / Other'
];

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  initialProduct,
  initialQuantity = 20,
  cartItems = [],
  isCartCheckout = false,
  cartDiscountPercent = 0,
  cartCouponCode = '',
  onUpdateCartQuantity,
  onRemoveCartItem,
  onOrderSuccess
}) => {
  // Checkout mode: 'cart' vs 'single'
  const [checkoutMode, setCheckoutMode] = useState<'cart' | 'single'>('single');

  useEffect(() => {
    if (isOpen) {
      if (isCartCheckout && cartItems && cartItems.length > 0) {
        setCheckoutMode('cart');
      } else {
        setCheckoutMode('single');
      }
    }
  }, [isOpen, isCartCheckout, cartItems.length]);

  // Step navigation (1: Package, 2: Contact, 3: Payment, 4: Verify)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1 State: Service & Quantity
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialProduct?.id || 'usa-gmail-accounts'
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    initialQuantity || 20
  );

  // Step 2 State: Contact Details
  const [fullName, setFullName] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [country, setCountry] = useState('United States');
  const [selectedVintage, setSelectedVintage] = useState('Any Vintage (2008 - 2025)');
  const [orderNotes, setOrderNotes] = useState('');
  const [contactError, setContactError] = useState('');

  // Step 3 State: Payment
  const [paymentMode, setPaymentMode] = useState<'crypto' | 'skrill' | 'bank'>('crypto');
  const [selectedBankId, setSelectedBankId] = useState<BankCurrencyId>('USD_ACH');
  const [selectedCryptoId, setSelectedCryptoId] = useState<CryptoId>('BSC');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedSkrillEmail, setCopiedSkrillEmail] = useState(false);
  const [copiedBankKey, setCopiedBankKey] = useState<string | null>(null);
  const [copiedAllBank, setCopiedAllBank] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Step 4 State: Verification & Upload
  const [txHash, setTxHash] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  // Completed Order State
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active Bank and Crypto definitions
  const activeBank = BANK_TRANSFER_ACCOUNTS[selectedBankId] || BANK_TRANSFER_ACCOUNTS.USD_ACH;
  const activeCrypto = CRYPTO_METHODS[selectedCryptoId] || CRYPTO_METHODS.BSC;

  // Reset order session state whenever the modal is opened
  const handleResetOrder = () => {
    setCompletedOrder(null);
    setCurrentStep(1);
    setTxHash('');
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setContactError('');
    setVerifyError('');
    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    handleResetOrder();
    onClose();
  };

  // Sync initial product and reset session on open
  useEffect(() => {
    if (isOpen) {
      setCompletedOrder(null);
      setCurrentStep(1);
      setTxHash('');
      setScreenshotFile(null);
      setScreenshotPreview(null);
      setContactError('');
      setVerifyError('');
      setIsSubmitting(false);

      if (initialProduct?.id) {
        setSelectedServiceId(initialProduct.id);
      }
      if (initialQuantity) {
        setSelectedQuantity(initialQuantity);
      }
    }
  }, [isOpen, initialProduct?.id, initialQuantity]);

  // Generate real original QR code for the active crypto deposit address
  useEffect(() => {
    const currentMethod = CRYPTO_METHODS[selectedCryptoId] || CRYPTO_METHODS.BSC;
    if (currentMethod?.address) {
      QRCode.toDataURL(currentMethod.address, {
        width: 360,
        margin: 1,
        color: {
          dark: '#020617',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      })
        .then((url) => {
          setQrCodeDataUrl(url);
        })
        .catch((err) => {
          console.error('Error generating QR code:', err);
        });
    }
  }, [selectedCryptoId]);

  if (!isOpen) return null;

  // Active product details
  const activeProduct = detailedServicesData.find((s) => s.id === selectedServiceId) || detailedServicesData[0];

  // Calculate pricing based on selected service and quantity tier
  const calculatePrice = (serviceId: string, count: number) => {
    const product = detailedServicesData.find((s) => s.id === serviceId) || detailedServicesData[0];
    
    // Check if the service has an exact package configured
    const exactPkg = product.packages?.find((p) => p.quantity === count);
    if (exactPkg) {
      return {
        totalPrice: exactPkg.price,
        unitPrice: exactPkg.unitPrice
      };
    }

    // Default calculations for 2, 5, 20, 50, 100
    if (serviceId === 'usa-gmail-accounts' || serviceId === 'pva-gmail-accounts' || serviceId === 'aged-gmail-for-reviews') {
      if (count === 2) return { totalPrice: 6, unitPrice: 3.0 };
      if (count === 5) return { totalPrice: 15, unitPrice: 3.0 };
      if (count === 20) return { totalPrice: 55, unitPrice: 2.75 };
      if (count === 50) return { totalPrice: 130, unitPrice: 2.60 };
      if (count === 100) return { totalPrice: 220, unitPrice: 2.20 };
    } else if (serviceId === 'aged-mix-country-gmail') {
      if (count === 2) return { totalPrice: 5, unitPrice: 2.5 };
      if (count === 5) return { totalPrice: 12, unitPrice: 2.4 };
      if (count === 20) return { totalPrice: 45, unitPrice: 2.25 };
      if (count === 50) return { totalPrice: 105, unitPrice: 2.10 };
      if (count === 100) return { totalPrice: 190, unitPrice: 1.90 };
    } else if (serviceId === 'aged-gmail-for-google-ads') {
      if (count === 2) return { totalPrice: 10, unitPrice: 5.0 };
      if (count === 5) return { totalPrice: 24, unitPrice: 4.8 };
      if (count === 20) return { totalPrice: 90, unitPrice: 4.5 };
      if (count === 50) return { totalPrice: 210, unitPrice: 4.2 };
      if (count === 100) return { totalPrice: 390, unitPrice: 3.9 };
    } else if (serviceId === 'new-gmail-accounts') {
      if (count === 2) return { totalPrice: 3, unitPrice: 1.5 };
      if (count === 5) return { totalPrice: 7, unitPrice: 1.4 };
      if (count === 20) return { totalPrice: 26, unitPrice: 1.3 };
      if (count === 50) return { totalPrice: 60, unitPrice: 1.2 };
      if (count === 100) return { totalPrice: 110, unitPrice: 1.1 };
    }

    // Generic fallback
    const unitRate = product.unitPrice || 3.0;
    const base = unitRate * count;
    let discount = 0;
    if (count >= 100) discount = 0.25;
    else if (count >= 50) discount = 0.15;
    else if (count >= 20) discount = 0.10;
    else if (count >= 5) discount = 0.05;

    const finalTotal = base * (1 - discount);
    return {
      totalPrice: Math.round(finalTotal),
      unitPrice: +(finalTotal / count).toFixed(2)
    };
  };

  const currentPricing = calculatePrice(selectedServiceId, selectedQuantity);

  // Cart pricing calculations
  const cartSubtotal = cartItems.reduce((sum, item) => {
    const itemPrice = typeof item.totalPrice === 'number' && !isNaN(item.totalPrice)
      ? item.totalPrice
      : (Number(item.product?.unitPrice) || 3.0) * (Number(item.quantity) || 2);
    return sum + itemPrice;
  }, 0);
  const cartDiscountAmount = cartSubtotal * (cartDiscountPercent || 0);
  const cartTotal = Math.max(0, +(cartSubtotal - cartDiscountAmount).toFixed(2));
  const totalCartAccounts = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  const isCartMode = Boolean(checkoutMode === 'cart' && cartItems && cartItems.length > 0);
  const effectiveTotal = isCartMode ? cartTotal : currentPricing.totalPrice;
  const effectiveAccounts = isCartMode ? totalCartAccounts : selectedQuantity;

  // Copy address handler
  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(activeCrypto.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  // Copy Skrill email handler
  const handleCopySkrillEmail = () => {
    navigator.clipboard?.writeText(SKRILL_CONFIG.email);
    setCopiedSkrillEmail(true);
    setTimeout(() => setCopiedSkrillEmail(false), 2000);
  };

  // Copy individual Bank field handler
  const handleCopyBankField = (key: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedBankKey(key);
    setTimeout(() => setCopiedBankKey(null), 2000);
  };

  // Copy all Bank details for active bank
  const handleCopyAllBankDetails = () => {
    const lines: string[] = [
      `=== BUYPVAGMAIL.COM BANK TRANSFER DETAILS (${activeBank.name}) ===`,
      `Account Title / Beneficiary: ${activeBank.accountTitle}`,
      `Account Type: ${activeBank.accountType}`,
      `Currency: ${activeBank.currency}`,
      `Amount to Pay: $${effectiveTotal} USD`
    ];

    if (activeBank.accountNumber) lines.push(`Account Number: ${activeBank.accountNumber}`);
    if (activeBank.routingACH) lines.push(`Routing Number (ACH): ${activeBank.routingACH}`);
    if (activeBank.routingWire) lines.push(`Routing Number (Wire): ${activeBank.routingWire}`);
    if (activeBank.iban) lines.push(`IBAN: ${activeBank.iban}`);
    if (activeBank.swiftBic) lines.push(`SWIFT / BIC: ${activeBank.swiftBic}`);
    if (activeBank.sortCode) lines.push(`Sort Code: ${activeBank.sortCode}`);
    lines.push(`Bank Name: ${activeBank.bankName}`);
    lines.push(`Bank Address: ${activeBank.bankAddress}`);

    if (activeBank.partnerBank) {
      lines.push(`Partner Bank: ${activeBank.partnerBank.name}`);
      lines.push(`Partner Bank Address: ${activeBank.partnerBank.address}`);
      lines.push(`Partner Bank SWIFT/BIC: ${activeBank.partnerBank.swiftBic}`);
    }

    if (activeBank.notes) {
      lines.push(`Notes: ${activeBank.notes}`);
    }

    lines.push(`Payment Reference / Memo: Use your Order Reference or Email (${deliveryEmail || 'your email'})`);

    navigator.clipboard?.writeText(lines.join('\n'));
    setCopiedAllBank(true);
    setTimeout(() => setCopiedAllBank(false), 2500);
  };

  // Step 2 Validation & Continue
  const handleContinueToPayment = () => {
    if (!fullName.trim()) {
      setContactError('Please enter your full name.');
      return;
    }
    if (!deliveryEmail.trim() || !deliveryEmail.includes('@')) {
      setContactError('Please enter a valid delivery email address.');
      return;
    }
    setContactError('');
    setCurrentStep(3);
  };

  // Screenshot Upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setScreenshotFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Order
  const handleSubmitOrder = () => {
    if (!txHash.trim()) {
      setVerifyError(
        paymentMode === 'bank'
          ? 'Please enter your Bank Wire / ACH / SWIFT transaction reference number or UTR ID.'
          : paymentMode === 'skrill'
          ? 'Please enter your Skrill Transaction ID / Reference Number.'
          : 'Please enter your crypto transaction hash or TxID.'
      );
      return;
    }
    setVerifyError('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const orderId = 'BPG-' + Math.floor(100000 + Math.random() * 900000);
      
      let paymentLabel = activeCrypto.symbol;
      if (paymentMode === 'bank') {
        paymentLabel = `${activeBank.tabLabel} Bank Wire`;
      } else if (paymentMode === 'skrill') {
        paymentLabel = 'Skrill E-Wallet (USD)';
      }

      const orderItems = isCartMode
        ? cartItems
        : [
            {
              product: activeProduct,
              quantity: selectedQuantity,
              totalPrice: currentPricing.totalPrice
            }
          ];

      const order: OrderDetails = {
        orderId,
        items: orderItems,
        email: deliveryEmail,
        telegramOrSkype: telegramUsername || whatsappNumber || fullName,
        paymentMethod: paymentMode,
        bankAccountTitle: paymentMode === 'bank' ? activeBank.accountTitle : undefined,
        bankTransferType: paymentMode === 'bank' ? `${activeBank.name} (${activeBank.currency})` : undefined,
        skrillEmail: paymentMode === 'skrill' ? SKRILL_CONFIG.email : undefined,
        cryptoCurrency: paymentLabel,
        txHash: txHash,
        totalAmount: effectiveTotal,
        date: new Date().toLocaleDateString(),
        status: 'delivered'
      };

      setCompletedOrder(order);
      if (onOrderSuccess) onOrderSuccess(order);

      try {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 140,
            spread: 80,
            origin: { y: 0.6 }
          });
        }
      } catch (e) {
        // safe fallback
      }
    }, 1500);
  };

  // Download Credentials
  const handleDownloadCredentials = () => {
    let paymentDesc = completedOrder?.cryptoCurrency;
    if (completedOrder?.paymentMethod === 'bank') {
      paymentDesc = `Bank Transfer - ${completedOrder.bankTransferType || 'Direct Wire'} (Ref: ${completedOrder.txHash})`;
    } else if (completedOrder?.paymentMethod === 'skrill') {
      paymentDesc = `Skrill E-Wallet (Sent to ${SKRILL_CONFIG.email})`;
    }

    const packageSummary = isCartMode
      ? cartItems.map((item) => `${item.quantity}x ${item.product.name} ($${(item.totalPrice || 0).toFixed(2)} USD)`).join('\nService Package    : ')
      : `${selectedQuantity}x ${activeProduct.name}`;

    const lines = [
      '=================================================================================',
      ' BUYPVAGMAIL.COM - OFFICIAL CREDENTIALS DISPATCH MANIFEST',
      '=================================================================================',
      `Order Reference ID : ${completedOrder?.orderId}`,
      `Service Package    : ${packageSummary}`,
      `Delivery Email     : ${completedOrder?.email}`,
      `Payment Method     : ${paymentDesc}`,
      `Transaction Ref/ID : ${completedOrder?.txHash}`,
      `Total Paid         : $${completedOrder?.totalAmount} USD`,
      `Timestamp          : ${new Date().toISOString()}`,
      `Warranty Period    : 7 Days (100% Free Instant Replacement)`,
      '---------------------------------------------------------------------------------',
      'FORMAT: Email : Password : Recovery_Email : 2FA_Secret : UserAgent_Profile : Cookies_JSON',
      '=================================================================================',
      'us.outreach.prime2021@gmail.com:SecurePass#982:backup.rec01@outlook.com:JBSWY3DPEHPK3PXP:Mozilla/5.0 (Windows NT 10.0; Win64; x64):{"SID":"CC-ok9281","HSID":"HS-9821"}',
      'us.agency.scale2022@gmail.com:K98!vxM920@:backup.rec02@outlook.com:HXDMVJ5W4GZ7QPYE:Mozilla/5.0 (Windows NT 10.0; Win64; x64):{"SID":"CC-ok9282","HSID":"HS-9822"}',
      'us.enterprise.boost2023@gmail.com:V82!plx992#:backup.rec03@outlook.com:NXEMVJ5W4GZ7QPYE:Mozilla/5.0 (Windows NT 10.0; Win64; x64):{"SID":"CC-ok9283","HSID":"HS-9823"}',
      '---------------------------------------------------------------------------------',
      'Note: For multi-account operation, use AdsPower or Dolphin{anty} with US Residential Proxies.',
      'Support Telegram: @Go2Rapid | WhatsApp: +1 (253) 408-0049 | 24/7 Priority Live Dispatch'
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${completedOrder?.orderId || 'BuyPvaGmail-Accounts'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-5 sm:px-7 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 p-1.5 flex items-center justify-center shadow-md">
              <GmailLogo className="w-full h-full" withBadge badgeText="PVA" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                  BuyPva<span className="text-red-500">Gmail</span> Order Portal
                </h3>
                <span className="bg-emerald-950/90 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700/80 flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  SSL Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Automated verification &amp; instant recovery file delivery
              </p>
            </div>
          </div>

          <button
            onClick={handleCloseModal}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Order Portal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Step Progress Indicator */}
        {!completedOrder && (
          <div className="bg-slate-50/80 border-b border-slate-200/80 px-4 sm:px-7 py-3 shrink-0">
            <div className="flex items-center justify-between max-w-xl mx-auto text-xs sm:text-sm font-bold">
              
              {/* Step 1 */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentStep > 1 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-red-500/30">
                    1
                  </span>
                )}
                <span className={currentStep === 1 ? 'text-red-600 font-extrabold' : currentStep > 1 ? 'text-emerald-700' : 'text-slate-500'}>
                  {isCartMode ? '1. Cart' : '1. Package'}
                </span>
              </div>

              <div className="w-6 sm:w-10 h-0.5 bg-slate-200" />

              {/* Step 2 */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentStep > 2 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : currentStep === 2 ? (
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-red-500/30">
                    2
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">
                    2
                  </span>
                )}
                <span className={currentStep === 2 ? 'text-red-600 font-extrabold' : currentStep > 2 ? 'text-emerald-700' : 'text-slate-500'}>
                  2. Contact
                </span>
              </div>

              <div className="w-6 sm:w-10 h-0.5 bg-slate-200" />

              {/* Step 3 */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentStep > 3 ? (
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                ) : currentStep === 3 ? (
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-red-500/30">
                    3
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">
                    3
                  </span>
                )}
                <span className={currentStep === 3 ? 'text-red-600 font-extrabold' : currentStep > 3 ? 'text-emerald-700' : 'text-slate-500'}>
                  3. Payment
                </span>
              </div>

              <div className="w-6 sm:w-10 h-0.5 bg-slate-200" />

              {/* Step 4 */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {currentStep === 4 ? (
                  <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black shadow-sm shadow-red-500/30">
                    4
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs">
                    4
                  </span>
                )}
                <span className={currentStep === 4 ? 'text-red-600 font-extrabold' : 'text-slate-500'}>
                  4. Verify
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          
          {/* ========================================================================= */}
          {/* STEP 1: PACKAGE & QUANTITY SELECTION / CART ITEMS REVIEW */}
          {/* ========================================================================= */}
          {!completedOrder && currentStep === 1 && isCartMode && (
            <div className="space-y-5">
              
              {/* Cart Mode Header Banner */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 flex-wrap gap-2">
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-blue-600" />
                    Review Your Cart Accounts ({cartItems.length} {cartItems.length === 1 ? 'Service' : 'Services'})
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {totalCartAccounts} total verified accounts configured for immediate automated delivery
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutMode('single')}
                  className="text-xs font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  Switch to Single Package
                </button>
              </div>

              {/* Cart Items List */}
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  const itemPrice = typeof item.totalPrice === 'number' && !isNaN(item.totalPrice)
                    ? item.totalPrice
                    : (Number(item.product?.unitPrice) || 3.0) * (Number(item.quantity) || 2);
                  const unitRate = item.quantity > 0 ? (itemPrice / item.quantity) : (item.product?.unitPrice || 3.0);

                  return (
                    <div
                      key={item.product.id}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-black text-slate-900 truncate">
                            {item.product.name}
                          </span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                            {item.product.age || 'PVA Verified'}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          ${unitRate.toFixed(2)} / account
                        </span>
                      </div>

                      {/* Quantity & Controls */}
                      <div className="flex items-center gap-3 shrink-0">
                        {onUpdateCartQuantity && onRemoveCartItem && (
                          <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  onRemoveCartItem(item.product.id);
                                } else {
                                  onUpdateCartQuantity(item.product.id, item.quantity - 1);
                                }
                              }}
                              className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                              title={item.quantity <= 1 ? "Remove item" : "Decrease quantity"}
                            >
                              {item.quantity <= 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-500" /> : <Minus className="w-3.5 h-3.5" />}
                            </button>
                            <span className="font-mono text-xs font-black text-slate-900 min-w-[28px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        <div className="text-right min-w-[70px]">
                          <span className="text-sm font-black text-slate-900 block">
                            ${itemPrice.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">USD</span>
                        </div>

                        {onRemoveCartItem && (
                          <button
                            type="button"
                            onClick={() => onRemoveCartItem(item.product.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove from order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon / Discount Info */}
              {cartDiscountPercent > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-800 font-bold">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>Coupon Discount Applied: {cartCouponCode || 'PROMO'} ({(cartDiscountPercent * 100).toFixed(0)}% OFF)</span>
                  </div>
                  <span className="text-emerald-700 font-black">-${cartDiscountAmount.toFixed(2)} USD</span>
                </div>
              )}

              {/* Selected Package Summary Box */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Cart Order Summary:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-black text-slate-900">
                      ${cartSubtotal.toFixed(2)} USD
                    </span>
                    {cartDiscountPercent > 0 && (
                      <span className="text-xs text-emerald-600 font-bold">
                        (Coupon Saved ${cartDiscountAmount.toFixed(2)})
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {totalCartAccounts} Total Accounts across {cartItems.length} Products
                  </span>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                    Total Due:
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-red-600">
                    ${effectiveTotal} USD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 py-2 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  + Add More Accounts
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Continue to Contact Details</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          )}

          {/* SINGLE PACKAGE SELECTION STEP 1 */}
          {!completedOrder && currentStep === 1 && !isCartMode && (
            <div className="space-y-6">
              
              {/* Optional switch to cart banner */}
              {cartItems.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-blue-900 font-semibold">
                    <ShoppingCart className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>You have {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart (${cartTotal} USD).</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCheckoutMode('cart')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    Checkout Full Cart →
                  </button>
                </div>
              )}

              {/* Category Selection Section */}
              <div>
                <span className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase block mb-2.5">
                  SELECT VERIFIED SERVICE CATEGORY
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const isSelected = selectedServiceId === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedServiceId(cat.id)}
                        className={`p-3.5 rounded-2xl text-left transition-all duration-150 cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/20'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900">
                              {cat.name}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              {cat.subtitle}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-black text-red-600 shrink-0 ml-2">
                          {cat.fromPrice}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Tiers Section */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-extrabold tracking-wider text-slate-500 uppercase">
                    SELECT QUANTITY TIER ({activeProduct.name.toUpperCase()})
                  </span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current text-emerald-500" />
                    10% Crypto Discount Included
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                  {DEFAULT_QUANTITY_TIERS.map((tier) => {
                    const isSelected = selectedQuantity === tier.count;
                    const tierPricing = calculatePrice(selectedServiceId, tier.count);

                    return (
                      <div key={tier.count} className="relative">
                        {tier.isPopular && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                            <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                              POPULAR
                            </span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedQuantity(tier.count)}
                          className={`w-full p-3 sm:p-3.5 rounded-2xl text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center min-h-[100px] border ${
                            isSelected
                              ? 'bg-gradient-to-b from-red-500 to-red-600 text-white border-red-600 shadow-lg shadow-red-500/30'
                              : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`text-base sm:text-lg font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                            {tier.count}x
                          </span>
                          <span className={`text-xs sm:text-sm font-extrabold my-0.5 ${isSelected ? 'text-white' : 'text-red-600'}`}>
                            ${tierPricing.totalPrice}
                          </span>
                          <span className={`text-[10px] font-semibold ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>
                            {tier.count === 100 
                              ? `Best Agency Rate ($${tierPricing.unitPrice}/ea)` 
                              : tier.saveText || tier.label || `$${tierPricing.unitPrice}/ea`}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Package Summary Box */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-semibold block">Selected Package:</span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {activeProduct.name} ({selectedQuantity} Accounts)
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">
                    Estimated Unit Cost: ${currentPricing.unitPrice}/account
                  </span>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">
                    Total Due:
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-red-600">
                    ${effectiveTotal} USD
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Continue to Contact Details</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: CONTACT DETAILS */}
          {/* ========================================================================= */}
          {!completedOrder && currentStep === 2 && (
            <div className="space-y-5">
              
              {/* Notice Banner */}
              <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3.5 flex items-center gap-3 text-blue-900 text-xs">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <p className="font-medium">
                  Your contact details are strictly used for instant recovery spreadsheet delivery and order notifications.
                </p>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    EMAIL ADDRESS * (FOR DELIVERY)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. yourname@gmail.com"
                    value={deliveryEmail}
                    onChange={(e) => setDeliveryEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Telegram Username */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    TELEGRAM USERNAME (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @vance_scale (Optional)"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    WHATSAPP NUMBER (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="+1 555 123 4567"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

                {/* Country / Jurisdiction */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    COUNTRY / JURISDICTION
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Preferred Account Vintage Year */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    ACCOUNT VINTAGE (2008 - 2025)
                  </label>
                  <select
                    value={selectedVintage}
                    onChange={(e) => setSelectedVintage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium cursor-pointer"
                  >
                    <option value="Any Vintage (2008 - 2025)">Any Vintage (2008 - 2025 Mixed)</option>
                    {VINTAGE_YEAR_TIERS.map((tier) => (
                      <option key={tier.era} value={tier.era}>
                        {tier.era} — {tier.badge} (Trust: {tier.trustScore})
                      </option>
                    ))}
                    <optgroup label="Specific Creation Year">
                      {VINTAGE_YEARS.map((yr) => (
                        <option key={yr} value={`Specific Year: ${yr}`}>
                          {yr} Creation Year ({2026 - yr} Years Aged)
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Order Notes */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    ORDER NOTES / CUSTOM REQUESTS (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Specific state IP, niche warmup preference, or tool compatibility"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-hidden font-medium"
                  />
                </div>

              </div>

              {contactError && (
                <div className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{contactError}</span>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleContinueToPayment}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: PAYMENT METHOD & DEPOSIT ADDRESS / SKRILL */}
          {/* ========================================================================= */}
          {!completedOrder && currentStep === 3 && (
            <div className="space-y-5">
              
              {/* Payment Channel Selector Tabs (Crypto vs Skrill vs Bank) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1st: Crypto Tab */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('crypto')}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-150 cursor-pointer flex items-center justify-between border ${
                    paymentMode === 'crypto'
                      ? 'bg-red-50/80 border-red-500 shadow-md ring-2 ring-red-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-slate-900">Crypto Gateways</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium block truncate">
                        USDT, BTC, SOL, ETH
                      </span>
                    </div>
                  </div>
                  {paymentMode === 'crypto' && (
                    <div className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>

                {/* 2nd: Skrill Tab */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('skrill')}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-150 cursor-pointer flex items-center justify-between border ${
                    paymentMode === 'skrill'
                      ? 'bg-rose-50/80 border-rose-600 shadow-md ring-2 ring-rose-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#811241] text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                      S
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-slate-900">Skrill E-Wallet</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium block truncate">
                        onlinespay247@gmail.com
                      </span>
                    </div>
                  </div>
                  {paymentMode === 'skrill' && (
                    <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>

                {/* 3rd: Bank Transfer Tab */}
                <button
                  type="button"
                  onClick={() => setPaymentMode('bank')}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-150 cursor-pointer flex items-center justify-between border ${
                    paymentMode === 'bank'
                      ? 'bg-blue-50/80 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-black text-slate-900">Bank Transfer</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          USD / EUR / GBP
                        </span>
                      </div>
                    </div>
                  </div>
                  {paymentMode === 'bank' && (
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              </div>

              {/* ===================================================================== */}
              {/* BANK TRANSFER PAYMENT VIEW (4 ACCOUNTS: ACH, SWIFT, SEPA, UK FPS) */}
              {/* ===================================================================== */}
              {paymentMode === 'bank' && (
                <div className="space-y-4">
                  {/* 4 Currency / Transfer Route Sub-Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(Object.keys(BANK_TRANSFER_ACCOUNTS) as BankCurrencyId[]).map((bKey) => {
                      const acc = BANK_TRANSFER_ACCOUNTS[bKey];
                      const isSelected = selectedBankId === bKey;

                      return (
                        <button
                          key={bKey}
                          type="button"
                          onClick={() => setSelectedBankId(bKey)}
                          className={`p-3 rounded-2xl text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center border ${
                            isSelected
                              ? 'bg-blue-50/90 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`text-xs font-black ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                            {acc.tabLabel}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium mt-0.5 truncate max-w-full">
                            {acc.currency} • {acc.accountType}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bank Details Container */}
                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
                    
                    {/* Header row with Title, Badge, and Total */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-black text-slate-900 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-blue-700" />
                          {activeBank.name}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${activeBank.badgeColor}`}>
                          {activeBank.badge}
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs text-slate-500 font-bold block">Total to Transfer:</span>
                        <span className="text-xl sm:text-2xl font-black text-blue-700">
                          ${effectiveTotal} USD
                        </span>
                      </div>
                    </div>

                    {/* Bank Info Fields Grid with 1-Click Copy on each item */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      {/* Account Title (Beneficiary Name) */}
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                          ACCOUNT TITLE / BENEFICIARY:
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-black text-sm text-slate-900 select-all">
                            {activeBank.accountTitle}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyBankField('accountTitle', activeBank.accountTitle)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                          >
                            {copiedBankKey === 'accountTitle' ? (
                              <>
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Account Type & Currency */}
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                          ACCOUNT TYPE &amp; CURRENCY:
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono font-black text-sm text-slate-900">
                            {activeBank.accountType} ({activeBank.currency})
                          </span>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                            {activeBank.currency} Account
                          </span>
                        </div>
                      </div>

                      {/* USD ACH Specific Fields */}
                      {selectedBankId === 'USD_ACH' && (
                        <>
                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              ACCOUNT NUMBER:
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-sm text-slate-900 select-all">
                                {activeBank.accountNumber}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('accountNumber', activeBank.accountNumber || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'accountNumber' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              ROUTING NUMBER (ACH - U.S. DOMESTIC):
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-sm text-slate-900 select-all">
                                {activeBank.routingACH}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('routingACH', activeBank.routingACH || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'routingACH' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium block">
                              Only used for U.S. domestic ACH transfers
                            </span>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              ROUTING NUMBER (WIRE - U.S. DOMESTIC):
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-sm text-slate-900 select-all">
                                {activeBank.routingWire}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('routingWire', activeBank.routingWire || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'routingWire' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium block">
                              Only used for U.S. domestic wire transfers
                            </span>
                          </div>
                        </>
                      )}

                      {/* USD SWIFT Specific Fields */}
                      {selectedBankId === 'USD_SWIFT' && (
                        <>
                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              IBAN:
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-xs sm:text-sm text-slate-900 select-all">
                                {activeBank.iban}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('iban', activeBank.iban || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'iban' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              SWIFT / BIC:
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-sm text-slate-900 select-all">
                                {activeBank.swiftBic}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('swiftBic', activeBank.swiftBic || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'swiftBic' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium block">
                              Only used for international SWIFT transfers
                            </span>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              SORT CODE:
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-sm text-slate-900 select-all">
                                {activeBank.sortCode}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('sortCode', activeBank.sortCode || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'sortCode' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {/* EUR SEPA Specific Fields */}
                      {selectedBankId === 'EUR_SEPA' && (
                        <>
                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1 sm:col-span-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              IBAN (EURO SEPA):
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-xs sm:text-sm text-slate-900 select-all">
                                {activeBank.iban}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('iban', activeBank.iban || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'iban' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              BIC / SWIFT CODE:
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-sm text-slate-900 select-all">
                                {activeBank.swiftBic}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('swiftBic', activeBank.swiftBic || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'swiftBic' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              ACCOUNT NUMBER &amp; SORT CODE:
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-sm text-slate-900">
                                Acc: {activeBank.accountNumber} | Sort: {activeBank.sortCode}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('accountNumber', activeBank.accountNumber || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'accountNumber' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {/* GBP UK Specific Fields */}
                      {selectedBankId === 'GBP_UK' && (
                        <>
                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1 sm:col-span-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              IBAN (UK &amp; GLOBAL):
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-xs sm:text-sm text-slate-900 select-all">
                                {activeBank.iban}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('iban', activeBank.iban || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'iban' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              ACCOUNT NUMBER (UK):
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-sm text-slate-900 select-all">
                                {activeBank.accountNumber}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('accountNumber', activeBank.accountNumber || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'accountNumber' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                              SORT CODE (UK):
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono font-black text-sm text-slate-900 select-all">
                                {activeBank.sortCode}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyBankField('sortCode', activeBank.sortCode || '')}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                {copiedBankKey === 'sortCode' ? (
                                  <>
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Bank Name & Address */}
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                          BANK NAME:
                        </span>
                        <span className="font-bold text-xs text-slate-900 block">
                          {activeBank.bankName}
                        </span>
                        <span className="text-[11px] text-slate-600 block">
                          {activeBank.bankAddress}
                        </span>
                      </div>

                      {/* Partner Bank Details if applicable */}
                      {activeBank.partnerBank ? (
                        <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-200 space-y-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 block">
                            PARTNER BANK (INTERMEDIARY / CORRESPONDENT):
                          </span>
                          <span className="font-black text-xs text-slate-900 block">
                            {activeBank.partnerBank.name}
                          </span>
                          <span className="text-[11px] text-slate-600 block">
                            {activeBank.partnerBank.address} • SWIFT: <strong className="font-mono font-bold text-slate-900">{activeBank.partnerBank.swiftBic}</strong>
                          </span>
                        </div>
                      ) : (
                        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                            PAYMENT REFERENCE INSTRUCTION:
                          </span>
                          <span className="text-xs text-slate-700 block">
                            Please use your name (<strong>{fullName || 'Your Name'}</strong>) or delivery email in the wire memo for instant reconciliation.
                          </span>
                        </div>
                      )}

                    </div>

                    {/* Copy All Details Button & Advice Banner */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCopyAllBankDetails}
                        className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                      >
                        {copiedAllBank ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3] text-emerald-400" />
                            <span>All Bank Details Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-blue-400" />
                            <span>Copy All Bank Information (1-Click)</span>
                          </>
                        )}
                      </button>

                      <div className="text-[11px] text-slate-500 font-medium text-center sm:text-right">
                        💡 Transfers processed with 100% security guarantee.
                      </div>
                    </div>

                    {/* Navigation Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <span>I Have Sent Bank Wire → Submit Reference</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* ===================================================================== */}
              {/* SKRILL PAYMENT VIEW */}
              {/* ===================================================================== */}
              {paymentMode === 'skrill' && (
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
                  {/* Header row with Network and Amount */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-black text-slate-900">
                        Skrill Direct E-Wallet Transfer
                      </span>
                      <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-[#811241] text-white">
                        Official Skrill Verified
                      </span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-slate-500 font-bold block">Amount to Send:</span>
                      <span className="text-xl sm:text-2xl font-black text-[#811241]">
                        ${effectiveTotal} USD
                      </span>
                    </div>
                  </div>

                  {/* Skrill Recipient Email Box with 1-Click Copy */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      OFFICIAL BUYPVAGMAIL.COM SKRILL RECIPIENT EMAIL:
                    </label>
                    <div className="flex items-center gap-2 bg-rose-50/50 p-2 rounded-2xl border border-rose-200">
                      <input
                        type="text"
                        readOnly
                        value={SKRILL_CONFIG.email}
                        className="flex-1 bg-transparent px-3 py-1 font-mono text-sm sm:text-base text-slate-900 font-black focus:outline-hidden select-all"
                      />
                      <button
                        type="button"
                        onClick={handleCopySkrillEmail}
                        className="bg-[#811241] hover:bg-[#680e34] text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
                      >
                        {copiedSkrillEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Copied Email!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Skrill Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="space-y-3 pt-1">
                    <h5 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-[#811241]" />
                      How to Complete Your Skrill Payment (Step-by-Step):
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#811241] text-white text-[11px] font-bold flex items-center justify-center shrink-0">1</span>
                          <span className="text-xs font-black text-slate-900">Open Skrill</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Log into your Skrill App or visit <a href="https://www.skrill.com" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Skrill.com</a>.
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#811241] text-white text-[11px] font-bold flex items-center justify-center shrink-0">2</span>
                          <span className="text-xs font-black text-slate-900">Send Money</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Choose <strong>Transfer → Skrill to Skrill</strong> and send <strong className="text-slate-900">${effectiveTotal} USD</strong> to <strong className="font-mono text-slate-900">onlinespay247@gmail.com</strong>.
                        </p>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#811241] text-white text-[11px] font-bold flex items-center justify-center shrink-0">3</span>
                          <span className="text-xs font-black text-slate-900">Copy Ref ID</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Copy your <strong>Skrill Transaction ID / Reference Number</strong> from the confirmation screen.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-emerald-50/80 border border-emerald-200/80 p-3 rounded-2xl">
                      <span className="text-emerald-600 font-bold shrink-0 text-sm">✓</span>
                      <p className="leading-relaxed">
                        <strong className="text-slate-900 font-black">FAST SKRILL DISPATCH:</strong> We automatically check incoming transfers to <strong>onlinespay247@gmail.com</strong>. Your delivery email <span className="font-mono font-bold text-slate-900">{deliveryEmail || 'provided in step 2'}</span> will receive your complete account credentials immediately upon submission.
                      </p>
                    </div>
                  </div>

                  {/* Navigation Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="bg-[#811241] hover:bg-[#680e34] text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-rose-900/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>I Have Sent Skrill Payment → Enter Ref ID</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ===================================================================== */}
              {/* CRYPTO PAYMENT VIEW */}
              {/* ===================================================================== */}
              {paymentMode === 'crypto' && (
                <div className="space-y-5">
                  {/* 7 Verified Crypto Options Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {(Object.keys(CRYPTO_METHODS) as CryptoId[]).map((cKey) => {
                      const method = CRYPTO_METHODS[cKey];
                      const isSelected = selectedCryptoId === cKey;

                      return (
                        <button
                          key={cKey}
                          type="button"
                          onClick={() => setSelectedCryptoId(cKey)}
                          className={`p-2.5 sm:p-3 rounded-2xl text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center border ${
                            isSelected
                              ? 'bg-red-50/60 border-red-500 shadow-md ring-2 ring-red-500/20'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`text-sm font-black ${isSelected ? 'text-red-700' : 'text-slate-900'}`}>
                            {method.label}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium mt-0.5 truncate max-w-full">
                            {method.sublabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Payment Details Container */}
                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
                    
                    {/* Header row with Network and Amount */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-black text-slate-900">
                          {activeCrypto.networkTitle}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${activeCrypto.networkBadgeColor}`}>
                          {activeCrypto.networkBadge}
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xs text-slate-500 font-bold block">Amount to Send:</span>
                        <span className="text-xl sm:text-2xl font-black text-red-600">
                          ${effectiveTotal} USD equivalent
                        </span>
                      </div>
                    </div>

                    {/* Deposit Address Box with 1-Click Copy */}
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                        OFFICIAL BUYPVAGMAIL.COM {activeCrypto.label} DEPOSIT ADDRESS:
                      </label>
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                        <input
                          type="text"
                          readOnly
                          value={activeCrypto.address}
                          className="flex-1 bg-transparent px-3 py-1 font-mono text-xs sm:text-sm text-slate-900 font-bold focus:outline-hidden select-all"
                        />
                        <button
                          type="button"
                          onClick={handleCopyAddress}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        >
                          {copiedAddress ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Original QR Code and Live Scanner Info Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center pt-2">
                      
                      {/* Left Original QR Code Container */}
                      <div className="sm:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <div className="w-40 h-40 bg-white rounded-2xl p-2.5 flex items-center justify-center border border-slate-200 shadow-sm relative group">
                          {qrCodeDataUrl ? (
                            <img 
                              src={qrCodeDataUrl} 
                              alt={`${activeCrypto.label} Original QR Code`}
                              className="w-36 h-36 object-contain rounded-lg"
                            />
                          ) : (
                            <div className="w-36 h-36 flex items-center justify-center text-slate-400">
                              <RefreshCw className="w-6 h-6 animate-spin" />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between w-full px-2 mt-2.5">
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">
                            ORIGINAL QR CODE
                          </span>
                          {qrCodeDataUrl && (
                            <a
                              href={qrCodeDataUrl}
                              download={`buypvagmail-${activeCrypto.id}-qr.png`}
                              className="text-[10px] text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 hover:underline"
                            >
                              <Download className="w-3 h-3" />
                              <span>Save QR</span>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Right Scanner Instructions */}
                      <div className="sm:col-span-7 space-y-3">
                        <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-emerald-50/80 border border-emerald-200/80 p-3 rounded-2xl">
                          <span className="text-emerald-600 font-bold shrink-0 text-sm">✓</span>
                          <p className="leading-relaxed">
                            <strong className="text-slate-900 font-black">ORIGINAL WALLET QR READY:</strong> Point your crypto wallet camera (Binance, Trust Wallet, MetaMask, Phantom, Exodus, OKX, Coinbase) at this QR code to automatically scan and deposit {activeCrypto.label}.
                          </p>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs text-slate-700 bg-amber-50/80 border border-amber-200/80 p-3 rounded-2xl">
                          <span className="text-amber-600 font-bold shrink-0 text-sm">⚠️</span>
                          <p className="leading-relaxed">
                            Verify address: <strong className="font-mono text-slate-900">{activeCrypto.address.slice(0, 6)}...{activeCrypto.address.slice(-6)}</strong> on <strong className="text-slate-900 font-bold">{activeCrypto.networkBadge}</strong>.
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Navigation Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <span>I Have Sent Payment → Upload Hash</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: VERIFY TRANSACTION HASH / BANK REF / SKRILL & SCREENSHOT */}
          {/* ========================================================================= */}
          {!completedOrder && currentStep === 4 && (
            <div className="space-y-5">
              
              {/* Alert Notification */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-xs">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-black text-amber-950">
                    {paymentMode === 'bank'
                      ? 'Almost done! Submit your Bank Wire / ACH / SWIFT Reference Number or UTR Code for automated verification.'
                      : paymentMode === 'skrill'
                      ? 'Almost done! Submit your Skrill Transaction ID / Reference Number for automated verification.'
                      : 'Almost done! Submit your Transaction ID / Hash for automated verification.'}
                  </p>
                  <p className="text-amber-800">
                    {paymentMode === 'bank'
                      ? 'Our finance system cross-references wire transfers to Md Sayrul Islam against incoming settlements. Once logged, your credentials manifest will be delivered to your email.'
                      : paymentMode === 'skrill'
                      ? 'Our payment gateway verifies incoming Skrill transfers to onlinespay247@gmail.com instantly. Once confirmed, your spreadsheet will be emailed automatically.'
                      : 'Our blockchain gateway checks incoming hashes every 60 seconds. Once confirmed, your spreadsheet will be emailed automatically.'}
                  </p>
                </div>
              </div>

              {/* Transaction Hash / Bank Reference / Skrill ID Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {paymentMode === 'bank'
                    ? 'BANK WIRE / ACH / SWIFT / SEPA REFERENCE NUMBER / UTR * (REQUIRED)'
                    : paymentMode === 'skrill'
                    ? 'SKRILL TRANSACTION ID / REFERENCE NUMBER * (REQUIRED)'
                    : 'CRYPTO TRANSACTION HASH / TXID * (REQUIRED)'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    paymentMode === 'bank'
                      ? 'e.g. UTR-938210984, Fedwire / ACH Confirmation, or Bank Reference...'
                      : paymentMode === 'skrill'
                      ? 'e.g. 3928192847 or Skrill Reference Number...'
                      : 'e.g. 0xb0a2b177e1770a03a5aa1d2629c52276fd93bdc6 or TSezBSdMrdARFQQebAYiwzkPku1qHijQEh...'
                  }
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-bold"
                />
              </div>

              {/* Upload Payment Screenshot Area */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {paymentMode === 'bank'
                    ? 'UPLOAD BANK PAYMENT RECEIPT / WIRE CONFIRMATION SLIP (OPTIONAL FOR FASTER DISPATCH)'
                    : paymentMode === 'skrill'
                    ? 'UPLOAD SKRILL PAYMENT SCREENSHOT / RECEIPT (OPTIONAL FOR FASTER VERIFICATION)'
                    : 'UPLOAD PAYMENT SCREENSHOT (OPTIONAL FOR FASTER VERIFICATION)'}
                </label>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/gif, image/webp, application/pdf"
                  className="hidden"
                />

                {!screenshotPreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropFile}
                    className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50/60 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-xs">
                      <Upload className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <span className="text-sm font-black text-blue-700 block">
                        Click to upload bank transfer receipt image / slip
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        PNG, JPG, PDF up to 10MB
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="border border-slate-200 bg-slate-50 rounded-2xl p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={screenshotPreview}
                        alt="Payment Proof"
                        className="w-14 h-14 object-cover rounded-xl border border-slate-200 shadow-xs"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                          {screenshotFile?.name || 'Payment_Proof.png'}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Proof attached
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setScreenshotFile(null);
                        setScreenshotPreview(null);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Remove attachment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary Confirmation Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Order Summary:</span>
                  <span className="font-bold text-slate-900">
                    {isCartMode
                      ? `${effectiveAccounts} Accounts across ${cartItems.length} Products`
                      : `${selectedQuantity}x ${activeProduct.name}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Payment Channel:</span>
                  <span className="font-bold text-slate-900">
                    {paymentMode === 'bank'
                      ? `Bank Transfer: ${activeBank.name} (${activeBank.currency})`
                      : paymentMode === 'skrill'
                      ? 'Skrill E-Wallet (onlinespay247@gmail.com)'
                      : activeCrypto.networkTitle}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200 items-baseline">
                  <span className="font-extrabold text-sm text-slate-900 uppercase">Total Amount:</span>
                  <span className="text-xl font-black text-blue-700">${effectiveTotal} USD</span>
                </div>
              </div>

              {verifyError && (
                <div className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{verifyError}</span>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className={`${
                    paymentMode === 'bank'
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
                      : paymentMode === 'skrill'
                      ? 'bg-[#811241] hover:bg-[#680e34] shadow-rose-900/25'
                      : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
                  } text-white font-extrabold py-3.5 px-8 rounded-xl text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-75`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Verifying Payment Reference...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>
                        {paymentMode === 'bank'
                          ? 'Submit Bank Transfer & Get Accounts'
                          : paymentMode === 'skrill'
                          ? 'Submit Skrill Payment & Get Accounts'
                          : 'Submit Order & Get Accounts'}
                      </span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* FINAL SCREEN: ORDER COMPLETED & INSTANT DISPATCH */}
          {/* ========================================================================= */}
          {completedOrder && (
            <div className="space-y-6 py-2">
              <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/30">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-emerald-950">
                  Order Successfully Submitted &amp; Verified!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1.5 max-w-md mx-auto">
                  Your payment via <strong>{completedOrder.paymentMethod === 'bank' ? `Bank Transfer (${completedOrder.bankTransferType || 'Md Sayrul Islam'})` : completedOrder.paymentMethod === 'skrill' ? `Skrill (${SKRILL_CONFIG.email})` : completedOrder.cryptoCurrency}</strong> has been logged. We have generated your account bundle and dispatched the recovery details to <strong>{completedOrder.email}</strong>.
                </p>
              </div>

              {/* Order Metadata Details */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Order Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{completedOrder.orderId}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Package:</span>
                  <span className="font-bold text-slate-900">
                    {completedOrder.items.length > 1
                      ? `${completedOrder.items.reduce((s, i) => s + (Number(i.quantity) || 0), 0)} Accounts (${completedOrder.items.length} Services)`
                      : `${completedOrder.items[0]?.quantity || selectedQuantity}x ${completedOrder.items[0]?.product?.name || activeProduct.name}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Amount Paid:</span>
                  <span className="font-bold text-slate-900">${completedOrder.totalAmount} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Payment Method:</span>
                  <span className="font-bold text-blue-700">
                    {completedOrder.paymentMethod === 'bank'
                      ? `Bank Transfer (${completedOrder.bankTransferType || 'Direct Wire'})`
                      : completedOrder.paymentMethod === 'skrill'
                      ? `Skrill E-Wallet (${SKRILL_CONFIG.email})`
                      : completedOrder.cryptoCurrency}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 truncate">
                  <span>{completedOrder.paymentMethod === 'bank' ? 'Bank Ref / UTR:' : completedOrder.paymentMethod === 'skrill' ? 'Skrill Ref ID:' : 'TxHash:'}</span>
                  <span className="font-mono text-slate-700 truncate max-w-[240px]">{completedOrder.txHash}</span>
                </div>
                <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                  <span>Warranty Status:</span>
                  <span className="font-bold text-emerald-600">7-Day Free Replacement Active</span>
                </div>
              </div>

              {/* Download Buttons & Repeat Order Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleDownloadCredentials}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-5 rounded-xl text-sm shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Accounts (.TXT &amp; .CSV)</span>
                </button>

                <button
                  onClick={handleResetOrder}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                  <span>Order More Accounts</span>
                </button>

                <button
                  onClick={handleCloseModal}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-5 rounded-xl text-sm cursor-pointer transition-colors"
                >
                  Close &amp; Return
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
