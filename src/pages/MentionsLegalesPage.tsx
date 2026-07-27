import React from 'react';
import { motion } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { localizedPath } from '../utils/localizedPath';

export default function MentionsLegalesPage() {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('mentionsLegales.seo.title')}
        description={t('mentionsLegales.seo.description')}
        canonical="/mentions-legales"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Mentions légales', url: '/mentions-legales' },
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
            <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('mentionsLegales.eyebrow')}</span>
            <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              {t('mentionsLegales.title')}
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed">
              {t('mentionsLegales.effectiveDate')}
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
            <p>{t('mentionsLegales.intro')}</p>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('mentionsLegales.editor.title')}</h2>
              <p>{t('mentionsLegales.editor.intro')}</p>
              <ul className="list-none pl-0 space-y-2">
                <li>{t('mentionsLegales.editor.name')}</li>
                <li>{t('mentionsLegales.editor.form')}</li>
                <li>{t('mentionsLegales.editor.capital')}</li>
                <li>{t('mentionsLegales.editor.address')}</li>
                <li>{t('mentionsLegales.editor.siren')}</li>
                <li>{t('mentionsLegales.editor.rcs')}</li>
                <li>{t('mentionsLegales.editor.vat')}</li>
                <li>{t('mentionsLegales.editor.director')}</li>
                <li>{t('mentionsLegales.editor.email')}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('mentionsLegales.hosting.title')}</h2>
              <p>{t('mentionsLegales.hosting.intro')}</p>
              <ul className="list-none pl-0 space-y-2">
                <li>{t('mentionsLegales.hosting.name')}</li>
                <li>{t('mentionsLegales.hosting.address')}</li>
                <li>{t('mentionsLegales.hosting.website')}</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('mentionsLegales.ip.title')}</h2>
              <p>{t('mentionsLegales.ip.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('mentionsLegales.data.title')}</h2>
              <p>
                <Trans
                  i18nKey="mentionsLegales.data.body"
                  components={{
                    1: <Link to={localizedPath('/privacy', location.pathname)} className="text-primary hover:underline" />,
                  }}
                />
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('mentionsLegales.cookies.title')}</h2>
              <p>{t('mentionsLegales.cookies.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('mentionsLegales.links.title')}</h2>
              <p>{t('mentionsLegales.links.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('mentionsLegales.liability.title')}</h2>
              <p>{t('mentionsLegales.liability.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('mentionsLegales.law.title')}</h2>
              <p>{t('mentionsLegales.law.body')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('mentionsLegales.contact.title')}</h2>
              <p>{t('mentionsLegales.contact.body')}</p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
