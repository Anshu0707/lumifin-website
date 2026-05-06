import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const STORAGE_KEY = 'lumifin_cookie_consent';

/**
 * CNIL-compliant cookie consent banner.
 *
 * Works with Google Analytics 4 Consent Mode v2 (configured in index.html):
 *   - Default state in index.html: all storage 'denied'.
 *   - Accept → gtag('consent', 'update', { analytics_storage: 'granted' }).
 *   - Reject → leave at default 'denied'.
 *   - Choice persisted in localStorage and re-applied on every page load.
 *
 * CNIL compliance details:
 *   - Accept and Reject buttons are equally prominent (same size, same row).
 *   - Nothing is pre-ticked.
 *   - Tracking does not start until the user explicitly accepts.
 */
export default function CookieConsent() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const consent = localStorage.getItem(STORAGE_KEY);
    if (consent === 'accepted') {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
    } else if (!consent) {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
    });
    setShow(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('cookieConsent.banner')}
      className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:max-w-md z-50 bg-white border-2 border-primary/20 rounded-2xl shadow-2xl p-6 space-y-4"
    >
      <p className="text-slate-600 font-medium text-sm leading-relaxed">
        {t('cookieConsent.body')}{' '}
        <Link to="/privacy" className="text-primary underline hover:no-underline">
          {t('cookieConsent.learnMore')}
        </Link>
      </p>
      <div className="flex gap-3">
        <button
          onClick={reject}
          className="flex-1 py-2.5 px-4 rounded-xl font-bold text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          {t('cookieConsent.reject')}
        </button>
        <button
          onClick={accept}
          className="flex-1 py-2.5 px-4 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          {t('cookieConsent.accept')}
        </button>
      </div>
    </div>
  );
}
