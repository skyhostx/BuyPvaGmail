/**
 * Centralized Contact & Support Link Helpers for Telegram & WhatsApp
 * Ensures the standardized greeting and inquiry text is pre-filled when users initiate chat:
 * "Hello BuyPvaGmail, I need assistance with an inquiry"
 */

export const DEFAULT_INQUIRY_TEXT = 'Hello BuyPvaGmail, I need assistance with an inquiry';

export const TELEGRAM_USERNAME = 'BuyPvaGmail';
export const WHATSAPP_PHONE = '12534080049';

/**
 * Returns a Telegram chat URL pre-filled with the inquiry text.
 */
export const getTelegramSupportUrl = (customText: string = DEFAULT_INQUIRY_TEXT): string => {
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(customText)}`;
};

/**
 * Returns a WhatsApp direct chat URL pre-filled with the inquiry text.
 */
export const getWhatsAppSupportUrl = (customText: string = DEFAULT_INQUIRY_TEXT): string => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(customText)}`;
};

export const TELEGRAM_SUPPORT_URL = getTelegramSupportUrl();
export const WHATSAPP_SUPPORT_URL = getWhatsAppSupportUrl();
