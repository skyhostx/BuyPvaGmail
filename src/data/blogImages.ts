// Robust Vite asset imports for all blog featured images
// Using direct imports ensures Vite processes and bundles these images in both dev and production.

import blogUsaGmail from '../assets/images/blog_usa_gmail_1790689984839.jpg';
import blogPvaSim from '../assets/images/blog_pva_sim_1790690287751.jpg';
import blogFreshBulk from '../assets/images/blog_fresh_bulk_1790690300098.jpg';
import blogAgedGmail from '../assets/images/blog_aged_gmail_1790689993769.jpg';
import blogGoogleReviews from '../assets/images/blog_google_reviews_1790690010688.jpg';
import blogGoogleAds from '../assets/images/blog_google_ads_1790690320607.jpg';
import blogSmtpServers from '../assets/images/blog_smtp_servers_1790690021554.jpg';
import blogBrevoSmtp from '../assets/images/blog_brevo_smtp_1790690333460.jpg';
import blogDedicatedRelay from '../assets/images/blog_dedicated_relay_1790690350402.jpg';

export const BLOG_IMAGES = {
  usaGmail: blogUsaGmail,
  pvaSim: blogPvaSim,
  freshBulk: blogFreshBulk,
  agedGmail: blogAgedGmail,
  googleReviews: blogGoogleReviews,
  googleAds: blogGoogleAds,
  smtpServers: blogSmtpServers,
  brevoSmtp: blogBrevoSmtp,
  dedicatedRelay: blogDedicatedRelay,
} as const;

export const PUBLIC_BLOG_IMAGES = {
  usaGmail: '/images/blog/blog_usa_gmail.jpg',
  pvaSim: '/images/blog/blog_pva_sim.jpg',
  freshBulk: '/images/blog/blog_fresh_bulk.jpg',
  agedGmail: '/images/blog/blog_aged_gmail.jpg',
  googleReviews: '/images/blog/blog_google_reviews.jpg',
  googleAds: '/images/blog/blog_google_ads.jpg',
  smtpServers: '/images/blog/blog_smtp_servers.jpg',
  brevoSmtp: '/images/blog/blog_brevo_smtp.jpg',
  dedicatedRelay: '/images/blog/blog_dedicated_relay.jpg',
} as const;

export const getBlogImageFallback = (guideId: string): string => {
  if (guideId.includes('usa-gmail') || guideId === 'guide-1') return PUBLIC_BLOG_IMAGES.usaGmail;
  if (guideId.includes('pva') || guideId === 'guide-5') return PUBLIC_BLOG_IMAGES.pvaSim;
  if (guideId.includes('new-gmail') || guideId === 'guide-6') return PUBLIC_BLOG_IMAGES.freshBulk;
  if (guideId.includes('aged-mix') || guideId === 'guide-2') return PUBLIC_BLOG_IMAGES.agedGmail;
  if (guideId.includes('reviews') || guideId === 'guide-4') return PUBLIC_BLOG_IMAGES.googleReviews;
  if (guideId.includes('google-ads') || guideId === 'guide-3') return PUBLIC_BLOG_IMAGES.googleAds;
  if (guideId.includes('mailgun')) return PUBLIC_BLOG_IMAGES.smtpServers;
  if (guideId.includes('brevo')) return PUBLIC_BLOG_IMAGES.brevoSmtp;
  if (guideId.includes('relay')) return PUBLIC_BLOG_IMAGES.dedicatedRelay;
  return PUBLIC_BLOG_IMAGES.usaGmail;
};

