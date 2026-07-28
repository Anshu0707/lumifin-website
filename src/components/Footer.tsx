import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';

// wa.me click-to-chat link for the Lumi business WhatsApp number (+33 1 62 29 01 61).
const WHATSAPP_URL = 'https://wa.me/33162290161';

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  const isEnglish = location.pathname === '/en' || location.pathname.startsWith('/en/');
  // Prefix internal links with /en while browsing the English site; leave
  // third-party/mailto links and routes with no English version untouched.
  const withLang = (path: string) => (isEnglish ? `/en${path === '/' ? '' : path}` : path);
  return (
    <footer className="bg-slate-900 text-white py-20 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16">
        <div className="space-y-6">
          <div className="flex items-center">
            <Logo className="w-40 h-auto" />
          </div>
          <p className="text-slate-400 font-medium leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-black mb-8">{t('footer.company')}</h3>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><Link to={withLang('/team')} className="hover:text-primary transition-colors">{t('footer.aboutUs')}</Link></li>
            <li><Link to={withLang('/careers')} className="hover:text-primary transition-colors">{t('footer.careers')}</Link></li>
            <li><Link to={withLang('/blog')} className="hover:text-primary transition-colors">{t('footer.blog')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black mb-8">{t('footer.support')}</h3>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><Link to={withLang('/faq')} className="hover:text-primary transition-colors">{t('footer.faq')}</Link></li>
            <li><Link to="/tools/currency-converter" className="hover:text-primary transition-colors">{t('footer.currencyConverter')}</Link></li>
            <li><Link to={withLang('/security')} className="hover:text-primary transition-colors">{t('footer.security')}</Link></li>
            <li><Link to={withLang('/privacy')} className="hover:text-primary transition-colors">{t('footer.privacyPolicy')}</Link></li>
            <li><Link to={withLang('/account-deletion')} className="hover:text-primary transition-colors">{t('footer.deleteAccount')}</Link></li>
            <li><Link to={withLang('/mentions-legales')} className="hover:text-primary transition-colors">{t('footer.mentionsLegales')}</Link></li>
            <li><Link to={withLang('/cgu')} className="hover:text-primary transition-colors">{t('footer.cgu')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black mb-8">{t('footer.contact')}</h3>
          <ul className="space-y-6 text-slate-400 font-medium text-sm">
            <li>
              <p className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">{t('footer.email')}</p>
              <a href="mailto:info@lumifin.io" className="hover:text-primary transition-colors">info@lumifin.io</a>
            </li>
            <li>
              <p className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">{t('footer.whatsapp')}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                {t('footer.whatsappNumber')}
              </a>
            </li>
            <li className="space-y-1">
              <p className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">{t('footer.franceOffice')}</p>
              <p className="leading-relaxed">
                {t('footer.franceAddressLine1')}<br />
                {t('footer.franceAddressLine2')}<br />
                {t('footer.franceAddressLine3')}
              </p>
            </li>
            <li className="space-y-1">
              <p className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">{t('footer.indiaOffice')}</p>
              <p className="leading-relaxed">
                {t('footer.indiaAddressLine1')}<br />
                {t('footer.indiaAddressLine2')}
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black mb-8">{t('footer.connect')}</h3>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('footer.whatsapp')}</a></li>
            <li><a href="https://www.instagram.com/lumifin.io/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('footer.instagram')}</a></li>
            <li><a href="https://www.linkedin.com/company/lumifin1/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('footer.linkedin')}</a></li>
            <li><a href="https://www.facebook.com/profile.php?id=61590998865526" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('footer.facebook')}</a></li>
            <li><a href="https://x.com/getlumifin" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('footer.x')}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm font-medium">
        <p>{t('footer.copyright')}</p>
        <p>{t('footer.brandNote')}</p>
      </div>
    </footer>
  );
}
