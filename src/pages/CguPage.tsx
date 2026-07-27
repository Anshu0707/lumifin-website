import React from 'react';
import { motion } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { localizedPath } from '../utils/localizedPath';

export default function CguPage() {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('cgu.seo.title')}
        description={t('cgu.seo.description')}
        canonical="/cgu"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Terms and Conditions', url: '/cgu' },
        ])}
      />
      <Header />

      <main className="pt-40 pb-32 px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('cgu.eyebrow')}</span>
            <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              {t('cgu.title')}
            </h1>
            <div className="text-slate-500 font-medium leading-relaxed space-y-1">
              <p className="text-xl">{t('cgu.effectiveDate')}</p>
              <p>{t('cgu.address')}</p>
              <p>
                <a
                  href="https://lumifin.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('cgu.website')}
                </a>
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section1.title')}</h2>
              <p>{t('cgu.section1.body1')}</p>
              <p>{t('cgu.section1.body2')}</p>
              <p>
                <Trans
                  i18nKey="cgu.section1.body3"
                  components={{ 1: <Link to={localizedPath('/privacy', location.pathname)} className="text-primary hover:underline" /> }}
                />
              </p>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight pt-2">{t('cgu.section1.sub1.title')}</h3>
              <p>{t('cgu.section1.sub1.body1')}</p>
              <p>
                <Trans
                  i18nKey="cgu.section1.sub1.body2"
                  components={{
                    1: (
                      <a
                        href="https://www.transfi.com/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      />
                    ),
                  }}
                />
              </p>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight pt-2">{t('cgu.section1.sub2.title')}</h3>
              <p>{t('cgu.section1.sub2.body')}</p>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight pt-2">{t('cgu.section1.sub3.title')}</h3>
              <p>{t('cgu.section1.sub3.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section2.title')}</h2>
              <p>{t('cgu.section2.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section3.title')}</h2>
              <p>{t('cgu.section3.body1')}</p>
              <p>{t('cgu.section3.body2')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section4.title')}</h2>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <React.Fragment key={n}>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight pt-2">{t(`cgu.section4.sub${n}.title`)}</h3>
                  <p>{t(`cgu.section4.sub${n}.body`)}</p>
                </React.Fragment>
              ))}
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section5.title')}</h2>
              <p>{t('cgu.section5.body1')}</p>
              <p>{t('cgu.section5.body2')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section6.title')}</h2>
              <p>{t('cgu.section6.body1')}</p>
              <p>{t('cgu.section6.body2')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section7.title')}</h2>
              <p>{t('cgu.section7.body1')}</p>
              <p>{t('cgu.section7.body2')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section8.title')}</h2>
              <p>{t('cgu.section8.body1')}</p>
              <p>{t('cgu.section8.body2')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section9.title')}</h2>
              <p>{t('cgu.section9.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section10.title')}</h2>
              <p>{t('cgu.section10.body1')}</p>
              <p>{t('cgu.section10.body2')}</p>
              <p>{t('cgu.section10.body3')}</p>
              <p>{t('cgu.section10.body4')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section11.title')}</h2>
              <p>{t('cgu.section11.body1')}</p>
              <p>{t('cgu.section11.body2')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section12.title')}</h2>
              <p>{t('cgu.section12.body1')}</p>
              <p>{t('cgu.section12.body2')}</p>
              <p>
                <Trans
                  i18nKey="cgu.section12.body3"
                  components={{
                    1: (
                      <a
                        href="https://ec.europa.eu/consumers/odr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      />
                    ),
                  }}
                />
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section13.title')}</h2>
              <p>{t('cgu.section13.body1')}</p>
              <p>{t('cgu.section13.body2')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.contact.title')}</h2>
              <p>{t('cgu.contact.address')}</p>
              <p>
                <Trans
                  i18nKey="cgu.contact.line"
                  components={{
                    1: (
                      <a
                        href="https://lumifin.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      />
                    ),
                  }}
                />
              </p>
            </section>

            <p className="text-center text-slate-400 pt-8">{t('cgu.end')}</p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
