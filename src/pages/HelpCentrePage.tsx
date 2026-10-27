import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import HelpSearch from '../components/HelpSearch';
import HelpContact from '../components/HelpContact';
import { HELP_ICONS, FALLBACK_ICON } from '../components/helpIcons';
import { localizedPath } from '../utils/localizedPath';
import { getHelpCategories } from '../constants/helpCentre';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const BASE = 'helpCentre';

/**
 * Help centre index: search, then the categories. The answers themselves live
 * on the category pages, so this page stays short enough to take in at a
 * glance instead of being a wall of questions.
 */
export default function HelpCentrePage() {
  const { t } = useTranslation();
  const location = useLocation();

  const categories = useMemo(() => getHelpCategories(t), [t]);
  const total = categories.reduce((n, c) => n + c.articles.length, 0);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/help"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Help Centre', url: '/help' },
        ])}
      />
      <Header />

      <section className="pt-40 pb-14 px-6 md:px-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <Link
            to={localizedPath('/', location.pathname)}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-widest mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t(`${BASE}.backHome`)}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t(`${BASE}.title`)}
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              {t(`${BASE}.subtitle`, { count: total })}
            </p>
            <div className="pt-2">
              <HelpSearch />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c) => {
              const Icon = HELP_ICONS[c.icon] ?? FALLBACK_ICON;
              return (
                <Link
                  key={c.slug}
                  to={`${localizedPath('/help', location.pathname)}/${c.slug}`}
                  className="group rounded-3xl border border-slate-200 p-7 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col"
                >
                  <span className="inline-flex w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </span>
                  <h2 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">
                    {c.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed flex-1">
                    {c.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors">
                    {t(`${BASE}.articleCount`, { count: c.articles.length })}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>

          <HelpContact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
