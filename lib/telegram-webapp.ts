/**
 * Telegram Web App utilities for Next.js
 */

export interface TelegramWebAppUser {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export interface TelegramWebAppInitData {
  user?: TelegramWebAppUser;
  auth_date: number;
  hash: string;
}

/**
 * Initialize Telegram Web App
 */
export const initTelegramWebApp = () => {
  if (typeof window === 'undefined') return null;

  const script = document.createElement('script');
  script.src = 'https://telegram.org/js/telegram-web-app.js';
  script.async = true;
  document.body.appendChild(script);

  return new Promise((resolve) => {
    script.onload = () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        resolve(window.Telegram.WebApp);
      } else {
        resolve(null);
      }
    };
  });
};

/**
 * Get current user from Telegram
 */
export const getTelegramUser = (): TelegramWebAppUser | null => {
  if (typeof window === 'undefined') return null;
  return window.Telegram?.WebApp?.initDataUnsafe?.user ?? null;
};

/**
 * Get init data for verification
 */
export const getTelegramInitData = (): string => {
  if (typeof window === 'undefined') return '';
  return window.Telegram?.WebApp?.initData ?? '';
};

/**
 * Send data to bot
 */
export const sendDataToBot = (data: any) => {
  if (typeof window === 'undefined') return;
  window.parent.postMessage({ type: 'web_app_data', data }, '*');
};

/**
 * Close web app
 */
export const closeWebApp = () => {
  if (typeof window === 'undefined') return;
  window.Telegram?.WebApp?.close?.();
};

/**
 * Check if running in Telegram
 */
export const isInTelegram = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!window.Telegram?.WebApp;
};
