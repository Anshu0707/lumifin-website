import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

export default function Footer() {
  const { t } = useTranslation();
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
            <li><Link to="/team" className="hover:text-primary transition-colors">{t('footer.aboutUs')}</Link></li>
            <li><Link to="/careers" className="hover:text-primary transition-colors">{t('footer.careers')}</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">{t('footer.blog')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black mb-8">{t('footer.support')}</h3>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><Link to="/faq" className="hover:text-primary transition-colors">{t('footer.faq')}</Link></li>
            <li><Link to="/tools/currency-converter" className="hover:text-primary transition-colors">{t('footer.currencyConverter')}</Link></li>
            <li><Link to="/security" className="hover:text-primary transition-colors">{t('footer.security')}</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.privacyPolicy')}</Link></li>
            <li><Link to="/account-deletion" className="hover:text-primary transition-colors">{t('footer.deleteAccount')}</Link></li>
            <li><Link to="/mentions-legales" className="hover:text-primary transition-colors">{t('footer.mentionsLegales')}</Link></li>
            <li><Link to="/cgu" className="hover:text-primary transition-colors">{t('footer.cgu')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-black mb-8">{t('footer.contact')}</h3>
          <ul className="space-y-6 text-slate-400 font-medium text-sm">
            <li>
              <p className="text-white font-bold uppercase text-[10px] tracking-widest mb-1">{t('footer.email')}</p>
              <a href="mailto:info@lumifin.io" className="hover:text-primary transition-colors">info@lumifin.io</a>
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
