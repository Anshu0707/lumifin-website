import React from 'react';
import { motion } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';

export default function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('privacy.seo.title')}
        description={t('privacy.seo.description')}
        canonical="/privacy"
        structuredData={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Privacy Policy', url: '/privacy' }])}
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
            <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('privacy.eyebrow')}</span>
            <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              {t('privacy.title')}
            </h1>
            <div className="text-slate-500 font-medium leading-relaxed space-y-1">
              <p className="text-xl">{t('privacy.effectiveDate')}</p>
              <p>{t('privacy.address')}</p>
              <p>
                <a
                  href="https://lumifin.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {t('privacy.website')}
                </a>
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section1.title')}</h2>
              <p>{t('privacy.section1.body1')}</p>
              <p>
                <Trans
                  i18nKey="privacy.section1.body2"
                  components={{
                    1: (
                      <a
                        href="https://www.transfi.com/privacy-policy"
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
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section2.title')}</h2>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight pt-2">{t('privacy.section2.sub1.title')}</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.section2.sub1.item1')}</li>
                <li>{t('privacy.section2.sub1.item2')}</li>
                <li>{t('privacy.section2.sub1.item3')}</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight pt-2">{t('privacy.section2.sub2.title')}</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.section2.sub2.item1')}</li>
                <li>{t('privacy.section2.sub2.item2')}</li>
                <li>{t('privacy.section2.sub2.item3')}</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900 tracking-tight pt-2">{t('privacy.section2.sub3.title')}</h3>
              <p>{t('privacy.section2.sub3.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section3.title')}</h2>
              <p>{t('privacy.section3.intro')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.section3.item1')}</li>
                <li>{t('privacy.section3.item2')}</li>
                <li>{t('privacy.section3.item3')}</li>
                <li>{t('privacy.section3.item4')}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section4.title')}</h2>
              <p>{t('privacy.section4.intro')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.section4.item1')}</li>
                <li>{t('privacy.section4.item2')}</li>
                <li>{t('privacy.section4.item3')}</li>
              </ul>
              <p>{t('privacy.section4.outro')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section5.title')}</h2>
              <p>{t('privacy.section5.body')}</p>
              <p>{t('privacy.section5.outro')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section6.title')}</h2>
              <p>{t('privacy.section6.intro')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.section6.item1')}</li>
                <li>{t('privacy.section6.item2')}</li>
                <li>{t('privacy.section6.item3')}</li>
                <li>{t('privacy.section6.item4')}</li>
                <li>{t('privacy.section6.item5')}</li>
                <li>{t('privacy.section6.item6')}</li>
              </ul>
              <p>{t('privacy.section6.outro')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section7.title')}</h2>
              <p>{t('privacy.section7.intro')}</p>
              <p>{t('privacy.section7.rights')}</p>
              <p>{t('privacy.section7.exercise')}</p>
              <p>{t('privacy.section7.transfi')}</p>
              <p>
                <Trans
                  i18nKey="privacy.section7.cnil"
                  components={{
                    1: (
                      <a
                        href="https://www.cnil.fr"
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
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section8.title')}</h2>
              <p>{t('privacy.section8.body')}</p>
              <p>{t('privacy.section8.outro')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section9.title')}</h2>
              <p>{t('privacy.section9.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section10.title')}</h2>
              <p>{t('privacy.section10.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section11.title')}</h2>
              <p>{t('privacy.section11.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section12.title')}</h2>
              <p>{t('privacy.section12.body')}</p>
              <p>{t('privacy.section12.address')}</p>
              <p>
                <Trans
                  i18nKey="privacy.section12.contact"
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

            <p className="text-center text-slate-400 pt-8">{t('privacy.end')}</p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
