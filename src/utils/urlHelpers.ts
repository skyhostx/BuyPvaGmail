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
  if (clean === 'buy-smtp-mailgun-accounts' || clean === 'smtp-mailgun-accounts') {
    return SMTP_IDS.MAILGUN;
  }
  if (clean === 'buy-smtp-brevo-accounts' || clean === 'smtp-brevo-accounts') {
    return SMTP_IDS.BREVO;
  }
  if (clean === 'buy-smtp-relay-services-account' || clean === 'smtp-relay-services-account') {
    return SMTP_IDS.RELAY;
  }
  return clean;
}

export function getServiceSlug(idOrProduct: string | { id: string; category?: string }): string {
  const id = typeof idOrProduct === 'string' ? idOrProduct : idOrProduct.id;
  if (id === 'smtp-mailgun-accounts' || id === 'buy-smtp-mailgun-accounts') {
    return SMTP_SLUGS.MAILGUN;
  }
  if (id === 'smtp-brevo-accounts' || id === 'buy-smtp-brevo-accounts') {
    return SMTP_SLUGS.BREVO;
  }
  if (id === 'smtp-relay-services-account' || id === 'buy-smtp-relay-services-account') {
    return SMTP_SLUGS.RELAY;
  }
  return id;
}

export function getProductPath(idOrProduct: string | { id: string; category?: string }): string {
  const id = typeof idOrProduct === 'string' ? idOrProduct : idOrProduct.id;
  if (isSmtpProduct(idOrProduct)) {
    const slug = getServiceSlug(id);
    return `/smtp/${slug}/`;
  }
  return `/gmail/${encodeURIComponent(id)}`;
}

export function getProductFullUrl(idOrProduct: string | { id: string; category?: string }): string {
  return `https://buypvagmail.com${getProductPath(idOrProduct)}`;
}
