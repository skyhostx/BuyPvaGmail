import { ServiceProduct, CartItem } from '../types';
import { detailedServicesData, servicesData } from '../data/servicesData';

export interface CalculatedPriceInfo {
  totalPrice: number;
  unitPrice: number;
  discountPercent: number;
  packageName?: string;
  packageId?: string;
  variantName?: string;
  variantId?: string;
  isSmtp: boolean;
  quantityLabel: string;
}

/**
 * Calculates standard, uniform, and verified pricing for any product, variant, and quantity.
 */
export function calculateProductPricing(
  product: ServiceProduct,
  quantity: number,
  packageId?: string,
  variantUnitPrice?: number,
  variantName?: string
): CalculatedPriceInfo {
  const safeQty = Math.max(1, Number(quantity) || 1);
  const isSmtp = product.category === 'smtp' || product.id.startsWith('smtp-');

  if (isSmtp) {
    let totalPrice = 150.0;
    let packageName = '50k Email Per Month';
    let pkgId = 'smtp-50k';
    let discountPercent = 0;

    if (product.id.includes('relay')) {
      if (packageId === 'relay-200k' || packageId?.includes('200k') || (!packageId && safeQty >= 200)) {
        totalPrice = 350.0;
        packageName = '200k Email Per Month (Enterprise Relay)';
        pkgId = 'relay-200k';
        discountPercent = 38;
      } else if (packageId === 'relay-100k' || packageId?.includes('100k') || (!packageId && safeQty >= 100)) {
        totalPrice = 240.0;
        packageName = '100k Email Per Month (Pro Relay)';
        pkgId = 'relay-100k';
        discountPercent = 25;
      } else {
        totalPrice = 190.0;
        packageName = '50k Email Per Month (Starter Relay)';
        pkgId = 'relay-50k';
        discountPercent = 0;
      }
    } else {
      // Mailgun or Brevo
      const prefix = product.id.includes('mailgun') ? 'mailgun' : 'brevo';
      if (packageId?.includes('200k') || (!packageId && safeQty >= 200)) {
        totalPrice = 320.0;
        packageName = '200k Email Per Month (Enterprise)';
        pkgId = `${prefix}-200k`;
        discountPercent = 47;
      } else if (packageId?.includes('100k') || (!packageId && safeQty >= 100)) {
        totalPrice = 190.0;
        packageName = '100k Email Per Month (High Reputation)';
        pkgId = `${prefix}-100k`;
        discountPercent = 36;
      } else {
        totalPrice = 150.0;
        packageName = '50k Email Per Month (Dedicated Relay)';
        pkgId = `${prefix}-50k`;
        discountPercent = 0;
      }
    }

    if (variantUnitPrice && variantUnitPrice > 0) {
      totalPrice = +(variantUnitPrice * safeQty).toFixed(2);
    }

    return {
      totalPrice,
      unitPrice: +(totalPrice / safeQty).toFixed(2),
      discountPercent,
      packageName: variantName || packageName,
      packageId: pkgId,
      variantName,
      variantId: packageId || pkgId,
      isSmtp: true,
      quantityLabel: variantName || packageName
    };
  }

  // Review Category Products pricing handling
  if (product.category === 'review' || product.id === 'buy-google-reviews' || product.id === 'buy-truatpilot-reviews') {
    if (product.id === 'buy-google-reviews') {
      const isFivePack = packageId === 'google-review-5-standard' || (!packageId && safeQty === 5) || packageId?.includes('5') || variantName?.includes('05') || variantName?.includes('5');
      if (isFivePack) {
        return {
          totalPrice: 35.0,
          unitPrice: 7.0,
          discountPercent: 22,
          packageName: '05 Google Review',
          packageId: 'google-review-5-standard',
          variantName: variantName || '05 Google Review',
          variantId: 'google-review-5-standard',
          isSmtp: false,
          quantityLabel: '05 Google Reviews'
        };
      }
      // Default to 03 Local Guide Google Review ($27)
      return {
        totalPrice: 27.0,
        unitPrice: 9.0,
        discountPercent: 0,
        packageName: '03 Local Guide Google Review',
        packageId: 'google-review-3-local-guide',
        variantName: variantName || '03 Local Guide Google Review',
        variantId: 'google-review-3-local-guide',
        isSmtp: false,
        quantityLabel: '03 Local Guide Google Reviews'
      };
    }

    if (product.id === 'buy-truatpilot-reviews') {
      const isFivePack = packageId === 'truatpilot-review-5-standard' || (!packageId && safeQty === 5) || packageId?.includes('5') || variantName?.includes('05') || variantName?.includes('5');
      if (isFivePack) {
        return {
          totalPrice: 45.0,
          unitPrice: 9.0,
          discountPercent: 31,
          packageName: '05 Truatpilot Review',
          packageId: 'truatpilot-review-5-standard',
          variantName: variantName || '05 Truatpilot Review',
          variantId: 'truatpilot-review-5-standard',
          isSmtp: false,
          quantityLabel: '05 Truatpilot Reviews'
        };
      }
      // Default to 03 Verified Truatpilot Review ($39)
      return {
        totalPrice: 39.0,
        unitPrice: 13.0,
        discountPercent: 0,
        packageName: '03 Verified Truatpilot Review',
        packageId: 'truatpilot-review-3-verified',
        variantName: variantName || '03 Verified Truatpilot Review',
        variantId: 'truatpilot-review-3-verified',
        isSmtp: false,
        quantityLabel: '03 Verified Truatpilot Reviews'
      };
    }
  }

  // Check if there is an exact package defined in detailedServicesData (only if no custom variant unit price was passed)
  if (!variantUnitPrice) {
    const detailed = detailedServicesData.find((s) => s.id === product.id) || product;
    const exactPkg = packageId 
      ? detailed?.packages?.find((p) => p.id === packageId)
      : detailed?.packages?.find((p) => p.quantity === safeQty);

    if (exactPkg) {
      return {
        totalPrice: exactPkg.price,
        unitPrice: exactPkg.unitPrice,
        discountPercent: exactPkg.discountPercent || 0,
        packageName: exactPkg.name,
        packageId: exactPkg.id,
        variantName,
        variantId: exactPkg.id,
        isSmtp: false,
        quantityLabel: `${exactPkg.quantity} Accounts`
      };
    }
  }

  // Volume discount tiers for standard Gmail products
  let discount = 0;
  if (safeQty >= 500) discount = 0.30;
  else if (safeQty >= 100) discount = 0.20;
  else if (safeQty >= 50) discount = 0.15;
  else if (safeQty >= 25) discount = 0.10;
  else if (safeQty >= 10) discount = 0.05;

  let baseUnitRate = variantUnitPrice && variantUnitPrice > 0
    ? variantUnitPrice
    : (product.unitPrice || 3.0);

  // Fallback defaults only if unitPrice is completely missing or 0
  if (!baseUnitRate || baseUnitRate <= 0) {
    if (product.id === 'aged-mix-country-gmail') baseUnitRate = 2.50;
    else if (product.id === 'aged-gmail-for-google-ads') baseUnitRate = 5.00;
    else if (product.id === 'new-gmail-accounts') baseUnitRate = 1.50;
    else baseUnitRate = 3.00;
  }

  const discountedUnitRate = +(baseUnitRate * (1 - discount)).toFixed(2);
  const finalTotal = +(discountedUnitRate * safeQty).toFixed(2);

  return {
    totalPrice: finalTotal,
    unitPrice: discountedUnitRate,
    discountPercent: Math.round(discount * 100),
    packageName: variantName,
    packageId,
    variantName,
    variantId: packageId,
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
