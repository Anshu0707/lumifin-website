import React from 'react';
import { motion } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';

export default function DeleteAccountPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('deleteAccount.seo.title')}
        description={t('deleteAccount.seo.description')}
        canonical="/account-deletion"
        structuredData={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Delete Account', url: '/account-deletion' }])}
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
            <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('deleteAccount.eyebrow')}</span>
            <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              {t('deleteAccount.title')}
            </h1>
            <p className="text-slate-500 font-medium leading-relaxed text-xl">
              <Trans
                i18nKey="deleteAccount.intro"
                components={{
                  1: <strong className="text-slate-700" />,
                  2: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-base" />,
                }}
              />
            </p>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 font-medium leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('deleteAccount.howto.title')}</h2>
              <p>{t('deleteAccount.howto.intro')}</p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <Trans
                    i18nKey="deleteAccount.howto.item1"
                    components={{ 1: <strong className="text-slate-700" /> }}
                  />
                </li>
                <li>
                  <Trans
                    i18nKey="deleteAccount.howto.item2"
                    components={{
                      1: <strong className="text-slate-700" />,
                      2: <a href="mailto:support@lumifin.io?subject=Account%20deletion%20request" className="text-primary hover:underline" />,
                      3: <em />,
                    }}
                  />
                </li>
              </ol>
              <p>
                <Trans
                  i18nKey="deleteAccount.howto.outro"
                  components={{ 1: <strong className="text-slate-700" /> }}
                />
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('deleteAccount.deleted.title')}</h2>
              <p>
                <Trans
                  i18nKey="deleteAccount.deleted.body"
                  components={{ 1: <strong className="text-slate-700" /> }}
                />
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('deleteAccount.retained.title')}</h2>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <p>
                  <Trans
                    i18nKey="deleteAccount.retained.body"
                    components={{ 1: <strong className="text-slate-700" /> }}
                  />
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('deleteAccount.contact.title')}</h2>
              <p>
                <Trans
                  i18nKey="deleteAccount.contact.body"
                  components={{
                    1: <a href="mailto:support@lumifin.io" className="text-primary hover:underline" />,
                    2: <a href="/privacy" className="text-primary hover:underline" />,
                  }}
                />
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
