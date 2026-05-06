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
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              {t('privacy.effectiveDate')}
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
            <p>
              <Trans
                i18nKey="privacy.intro"
                components={{
                  1: (
                    <a
                      href="https://www.lumifin.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    />
                  ),
                }}
              />
            </p>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section1.title')}</h2>
              <p>{t('privacy.section1.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section2.title')}</h2>
              <p>{t('privacy.section2.intro')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.section2.item1')}</li>
                <li>{t('privacy.section2.item2')}</li>
                <li>{t('privacy.section2.item3')}</li>
                <li>{t('privacy.section2.item4')}</li>
                <li>{t('privacy.section2.item5')}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section3.title')}</h2>
              <p>{t('privacy.section3.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section4.title')}</h2>
              <p>{t('privacy.section4.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section5.title')}</h2>
              <p>{t('privacy.section5.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section6.title')}</h2>
              <p>{t('privacy.section6.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section7.title')}</h2>
              <p>{t('privacy.section7.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section8.title')}</h2>
              <p>{t('privacy.section8.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('privacy.section9.title')}</h2>
              <p>{t('privacy.section9.body')}</p>
              <p>{t('privacy.section9.email')}</p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
