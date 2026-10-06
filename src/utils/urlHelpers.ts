export const GMAIL_SLUGS = {
  USA: 'buy-usa-gmail-accounts',
  PVA: 'buy-pva-gmail-accounts',
  NEW: 'buy-new-gmail-accounts',
  AGED_MIX: 'buy-aged-mix-country-gmail',
  AGED_REVIEWS: 'buy-aged-gmail-for-reviews',
  AGED_ADS: 'buy-aged-gmail-for-google-ads',
} as const;

export const SMTP_SLUGS = {
  MAILGUN: 'buy-smtp-mailgun-accounts',
  BREVO: 'buy-smtp-brevo-accounts',
  RELAY: 'buy-smtp-relay-services-account',
} as const;

export const SMTP_IDS = {
  MAILGUN: 'smtp-mailgun-accounts',
  BREVO: 'smtp-brevo-accounts',
  RELAY: 'smtp-relay-services-account',
} as const;

export const REVIEW_SLUGS = {
  GOOGLE: 'buy-google-reviews',
  TRUATPILOT: 'buy-truatpilot-reviews',
} as const;

const SLUG_TO_ID_MAP: Record<string, string> = {
  'buy-usa-gmail-accounts': 'usa-gmail-accounts',
  'usa-gmail-accounts': 'usa-gmail-accounts',
  'buy-pva-gmail-accounts': 'pva-gmail-accounts',
  'pva-gmail-accounts': 'pva-gmail-accounts',
  'buy-new-gmail-accounts': 'new-gmail-accounts',
  'new-gmail-accounts': 'new-gmail-accounts',
  'buy-aged-mix-country-gmail': 'aged-mix-country-gmail',
  'aged-mix-country-gmail': 'aged-mix-country-gmail',
  'buy-aged-gmail-for-reviews': 'aged-gmail-for-reviews',
  'aged-gmail-for-reviews': 'aged-gmail-for-reviews',
  'buy-aged-gmail-for-google-ads': 'aged-gmail-for-google-ads',
  'aged-gmail-for-google-ads': 'aged-gmail-for-google-ads',
  'buy-smtp-mailgun-accounts': 'smtp-mailgun-accounts',
  'smtp-mailgun-accounts': 'smtp-mailgun-accounts',
  'buy-smtp-brevo-accounts': 'smtp-brevo-accounts',
  'smtp-brevo-accounts': 'smtp-brevo-accounts',
  'buy-smtp-relay-services-account': 'smtp-relay-services-account',
  'smtp-relay-services-account': 'smtp-relay-services-account',
  'buy-google-reviews': 'buy-google-reviews',
  'buy-truatpilot-reviews': 'buy-truatpilot-reviews',
  'buy-trustpilot-reviews': 'buy-truatpilot-reviews',
};

const ID_TO_SLUG_MAP: Record<string, string> = {
  'usa-gmail-accounts': 'buy-usa-gmail-accounts',
  'pva-gmail-accounts': 'buy-pva-gmail-accounts',
  'new-gmail-accounts': 'buy-new-gmail-accounts',
  'aged-mix-country-gmail': 'buy-aged-mix-country-gmail',
  'aged-gmail-for-reviews': 'buy-aged-gmail-for-reviews',
  'aged-gmail-for-google-ads': 'buy-aged-gmail-for-google-ads',
  'smtp-mailgun-accounts': 'buy-smtp-mailgun-accounts',
  'smtp-brevo-accounts': 'buy-smtp-brevo-accounts',
  'smtp-relay-services-account': 'buy-smtp-relay-services-account',
  'buy-google-reviews': 'buy-google-reviews',
  'buy-truatpilot-reviews': 'buy-truatpilot-reviews',
};

export function isReviewProduct(idOrProduct: string | { id: string; category?: string }): boolean {
  if (!idOrProduct) return false;
  const id = typeof idOrProduct === 'string' ? idOrProduct : idOrProduct.id;
  const category = typeof idOrProduct === 'object' ? idOrProduct.category : undefined;
  return (
    category === 'review' ||
    id === 'buy-google-reviews' ||
    id === 'buy-truatpilot-reviews' ||
    id === 'buy-trustpilot-reviews'
  );
}

export function isSmtpProduct(idOrProduct: string | { id: string; category?: string }): boolean {
  if (!idOrProduct) return false;
  const id = typeof idOrProduct === 'string' ? idOrProduct : idOrProduct.id;
  const category = typeof idOrProduct === 'object' ? idOrProduct.category : undefined;
  return (
    category === 'smtp' ||
    id.startsWith('smtp-') ||
    id.startsWith('buy-smtp-') ||
    id === SMTP_SLUGS.MAILGUN ||
    id === SMTP_SLUGS.BREVO ||
    id === SMTP_SLUGS.RELAY ||
    id === SMTP_IDS.MAILGUN ||
    id === SMTP_IDS.BREVO ||
    id === SMTP_IDS.RELAY
  );
}

export function getServiceIdFromSlugOrId(slugOrId: string): string {
  if (!slugOrId) return 'usa-gmail-accounts';
  const clean = slugOrId.replace(/\/+$/, '').trim();
  if (/^(buy-)?aged-\d{4}-gmail(-accounts)?$/.test(clean)) {
    return 'aged-mix-country-gmail';
  }
  return SLUG_TO_ID_MAP[clean] || clean;
}

export function getServiceSlug(idOrProduct: string | { id: string; category?: string }): string {
  const id = typeof idOrProduct === 'string' ? idOrProduct : idOrProduct.id;
  const clean = id.replace(/\/+$/, '').trim();
  return ID_TO_SLUG_MAP[clean] || clean;
}

export function getProductPath(idOrProduct: string | { id: string; category?: string }): string {
  const id = typeof idOrProduct === 'string' ? idOrProduct : idOrProduct.id;
  const slug = getServiceSlug(id);
  if (isReviewProduct(idOrProduct)) {
    return `/review/${slug}/`;
  }
  if (isSmtpProduct(idOrProduct)) {
    return `/smtp/${slug}/`;
  }
  return `/gmail/${slug}/`;
}

export function getProductFullUrl(idOrProduct: string | { id: string; category?: string }): string {
  return `https://buypvagmail.com${getProductPath(idOrProduct)}`;
}
