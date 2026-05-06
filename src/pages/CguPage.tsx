import React from 'react';
import { motion } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';

export default function CguPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('cgu.seo.title')}
        description={t('cgu.seo.description')}
        canonical="/cgu"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'CGU', url: '/cgu' },
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
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              {t('cgu.effectiveDate')}
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
            <p>{t('cgu.intro')}</p>

            {[1, 2, 3, 4, 5].map((n) => (
              <section key={n} className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t(`cgu.section${n}.title`)}</h2>
                <p>{t(`cgu.section${n}.body`)}</p>
              </section>
            ))}

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('cgu.section6.title')}</h2>
              <p>
                <Trans
                  i18nKey="cgu.section6.body"
                  components={{
                    1: <Link to="/privacy" className="text-primary hover:underline" />,
                  }}
                />
              </p>
            </section>

            {[7, 8, 9, 10].map((n) => (
              <section key={n} className="space-y-4">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t(`cgu.section${n}.title`)}</h2>
                <p>{t(`cgu.section${n}.body`)}</p>
              </section>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
