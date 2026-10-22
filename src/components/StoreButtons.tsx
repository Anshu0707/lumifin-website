import React from 'react';
import { useTranslation } from 'react-i18next';

export const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.lumifin.app';

export const APP_STORE_URL = 'https://apps.apple.com/app/id6771697087';

/** Apple logo. lucide-react's "Apple" is a piece of fruit, not the brand mark. */
function AppleGlyph({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.54c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.29-1.61 2.79-.41 6.92 1.16 9.18.77 1.11 1.68 2.35 2.88 2.3 1.16-.05 1.6-.75 3-.75s1.79.75 3.01.72c1.24-.02 2.03-1.12 2.79-2.24.88-1.28 1.24-2.52 1.26-2.59-.03-.01-2.42-.93-2.44-3.69zM14.8 5.8c.64-.77 1.07-1.85.95-2.92-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.03.08 2.07-.52 2.71-1.29z" />
    </svg>
  );
}

/** Google Play triangle. */
function PlayGlyph({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#34A853" d="M3.6 20.9c.2.2.5.3.8.3.3 0 .5-.1.8-.2l9.3-5.3-2.6-2.6-8.3 7.8z" />
      <path fill="#EA4335" d="M3.6 3.1l8.3 7.8 2.6-2.6L5.2 3c-.3-.1-.5-.2-.8-.2-.3 0-.6.1-.8.3z" />
      <path fill="#FBBC04" d="M20.3 10.6l-2.9-1.7-2.9 2.9 2.9 2.9 2.9-1.7c.6-.3.9-.8.9-1.2 0-.4-.3-.9-.9-1.2z" />
      <path fill="#4285F4" d="M3.2 3.6c-.1.2-.2.4-.2.7v15.4c0 .3.1.5.2.7l8.6-8.4-8.6-8.4z" />
    </svg>
  );
}

/**
 * The two app store buttons. Both listings are live.
 */
export default function StoreButtons({
  className = '',
  align = 'center',
}: {
  className?: string;
  align?: 'center' | 'start';
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 ${
        align === 'center' ? 'justify-center' : 'justify-start'
      } ${className}`}
    >
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-7 py-4 rounded-2xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all"
      >
        <PlayGlyph className="w-7 h-7 shrink-0" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-white/60">
            {t('store.getItOn')}
          </span>
          <span className="block text-lg font-black">{t('store.googlePlay')}</span>
        </span>
      </a>

      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-7 py-4 rounded-2xl shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all"
      >
        <AppleGlyph className="w-7 h-7 shrink-0" />
        <span className="text-left leading-tight">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-white/60">
            {t('store.downloadOn')}
          </span>
          <span className="block text-lg font-black">{t('store.appStore')}</span>
        </span>
      </a>
    </div>
  );
}
