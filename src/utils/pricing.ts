import { ServiceProduct, CartItem } from '../types';
import { detailedServicesData, servicesData } from '../data/servicesData';

export interface CalculatedPriceInfo {
  totalPrice: number;
  unitPrice: number;
  discountPercent: number;
  packageName?: string;
  packageId?: string;
  isSmtp: boolean;
  quantityLabel: string;
}

/**
 * Calculates standard, uniform, and verified pricing for any product and quantity.
 */
export function calculateProductPricing(
  product: ServiceProduct,
  quantity: number,
  packageId?: string
): CalculatedPriceInfo {
  const safeQty = Math.max(1, Number(quantity) || 1);
  const isSmtp = product.category === 'smtp' || product.id.startsWith('smtp-');

  if (isSmtp) {
    let totalPrice = 150.0;
    let packageName = '50k Email Per Month';
    let pkgId = 'smtp-50k';
    let discountPercent = 0;

    if (product.id === 'smtp-relay-services-account') {
      if (safeQty >= 200 || packageId === 'relay-200k') {
        totalPrice = 350.0;
        packageName = '200k Email Per Month';
        pkgId = 'relay-200k';
        discountPercent = 38;
      } else if (safeQty >= 100 || packageId === 'relay-100k') {
        totalPrice = 240.0;
        packageName = '100k Email Per Month';
        pkgId = 'relay-100k';
        discountPercent = 25;
      } else {
        totalPrice = 190.0;
        packageName = '50k Email Per Month';
        pkgId = 'relay-50k';
        discountPercent = 0;
      }
    } else {
      // Mailgun or Brevo
      const prefix = product.id.includes('mailgun') ? 'mailgun' : 'brevo';
      if (safeQty >= 200 || packageId?.includes('200k')) {
        totalPrice = 320.0;
        packageName = '200k Email Per Month';
        pkgId = `${prefix}-200k`;
        discountPercent = 47;
      } else if (safeQty >= 100 || packageId?.includes('100k')) {
        totalPrice = 190.0;
        packageName = '100k Email Per Month';
        pkgId = `${prefix}-100k`;
        discountPercent = 36;
      } else {
        totalPrice = 150.0;
        packageName = '50k Email Per Month';
        pkgId = `${prefix}-50k`;
        discountPercent = 0;
      }
    }

    return {
      totalPrice,
      unitPrice: +(totalPrice / safeQty).toFixed(2),
      discountPercent,
      packageName,
      packageId: pkgId,
      isSmtp: true,
      quantityLabel: packageName
    };
  }

  // Check if there is an exact package defined in detailedServicesData
  const detailed = detailedServicesData.find((s) => s.id === product.id);
  const exactPkg = detailed?.packages?.find((p) => p.quantity === safeQty);
  if (exactPkg) {
    return {
      totalPrice: exactPkg.price,
      unitPrice: exactPkg.unitPrice,
      discountPercent: exactPkg.discountPercent || 0,
      packageName: exactPkg.name,
      packageId: exactPkg.id,
      isSmtp: false,
      quantityLabel: `${safeQty} Accounts`
    };
  }

  // Volume discount tiers for standard Gmail products
  let discount = 0;
  if (safeQty >= 500) discount = 0.30;
  else if (safeQty >= 100) discount = 0.20;
  else if (safeQty >= 50) discount = 0.15;
  else if (safeQty >= 25) discount = 0.10;
  else if (safeQty >= 10) discount = 0.05;

  let baseUnitRate = product.unitPrice || 3.0;
  // Specific base rates
  if (product.id === 'aged-mix-country-gmail') baseUnitRate = 2.50;
  else if (product.id === 'aged-gmail-for-google-ads') baseUnitRate = 5.00;
  else if (product.id === 'new-gmail-accounts') baseUnitRate = 1.50;

  const discountedUnitRate = +(baseUnitRate * (1 - discount)).toFixed(2);
  const finalTotal = +(discountedUnitRate * safeQty).toFixed(2);

  return {
    totalPrice: finalTotal,
    unitPrice: discountedUnitRate,
    discountPercent: Math.round(discount * 100),
    isSmtp: false,
    quantityLabel: `${safeQty} Accounts`
  };
}

/**
 * Sanitizes and repairs cart data loaded from localStorage to prevent NaNs or broken state.
 */
export function sanitizeCart(rawItems: any[]): CartItem[] {
  if (!Array.isArray(rawItems)) return [];

  const validItems: CartItem[] = [];

  for (const raw of rawItems) {
    if (!raw || typeof raw !== 'object' || !raw.product) continue;

    const rawProduct = raw.product;
    const productId = rawProduct.id;
    if (!productId) continue;

    // Find verified product definition
    const matchedProduct = 
      detailedServicesData.find((s) => s.id === productId) ||
      servicesData.find((s) => s.id === productId) ||
      rawProduct;

    const qty = Math.max(1, Number(raw.quantity) || matchedProduct.baseQuantity || 1);
    const pricing = calculateProductPricing(matchedProduct, qty, raw.packageId);

    validItems.push({
      product: matchedProduct,
      quantity: qty,
      totalPrice: pricing.totalPrice,
      packageName: raw.packageName || pricing.packageName,
      packageId: raw.packageId || pricing.packageId,
      selectedCountry: raw.selectedCountry || matchedProduct.country,
      selectedAge: raw.selectedAge || matchedProduct.age
    });
  }

  return validItems;
}
