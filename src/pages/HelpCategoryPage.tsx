import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, faqSchema } from '../components/SEO';
import HelpSearch from '../components/HelpSearch';
import HelpContact from '../components/HelpContact';
import { HELP_ICONS, FALLBACK_ICON } from '../components/helpIcons';
import NotFoundPage from './NotFoundPage';
import { localizedPath } from '../utils/localizedPath';
import { findCategory, resolveCategory } from '../constants/helpCentre';
import { ArrowLeft, ChevronDown } from 'lucide-react';

const BASE = 'helpCentre';

/** One help centre category, with its questions. */
export default function HelpCategoryPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const { slug } = useParams();

  const category = findCategory(slug);
  const resolved = useMemo(
    () => (category ? resolveCategory(t, category) : null),
    [category, t]
  );

  const [openId, setOpenId] = useState<string | null>(null);

  // Search results link to /help/<slug>#<id>, so open that one on arrival.
  useEffect(() => {
    const id = location.hash.replace('#', '');
    if (!id) return;
    setOpenId(id);
    const el = document.getElementById(id);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120);
  }, [location.hash]);

  // An unknown slug is a real 404, not an empty category page.
  if (!category || !resolved) return <NotFoundPage />;

  const Icon = HELP_ICONS[resolved.icon] ?? FALLBACK_ICON;
  const helpRoot = localizedPath('/help', location.pathname);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={`${resolved.title} — ${t(`${BASE}.seo.title`)}`}
        description={resolved.desc}
        canonical={`/help/${resolved.slug}`}
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Help Centre', url: '/help' },
            { name: resolved.title, url: `/help/${resolved.slug}` },
          ]),
          faqSchema(resolved.articles.map((a) => ({ question: a.question, answer: a.answer }))),
        ]}
      />
      <Header />

      <section className="pt-40 pb-12 px-6 md:px-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <Link
            to={helpRoot}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-widest mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> {t(`${BASE}.backToHelp`)}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-5"
          >
            <span className="inline-flex w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center">
              <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
            </span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {resolved.title}
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">{resolved.desc}</p>
            <div className="pt-4">
              <HelpSearch />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="py-16 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-slate-200 px-6 md:px-8">
            {resolved.articles.map((a) => {
              const open = openId === a.id;
              return (
                <div key={a.id} id={a.id} className="border-b border-slate-100 last:border-0 scroll-mt-32">
                  <h2>
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : a.id)}
                      aria-expanded={open}
                      className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                    >
                      <span className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {a.question}
                      </span>
                      <ChevronDown
                        className={`mt-1 w-5 h-5 shrink-0 text-slate-400 transition-transform ${
                          open ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </h2>
                  {open && (
                    <p className="pb-6 pr-10 text-slate-500 font-medium leading-relaxed whitespace-pre-line">
                      {a.answer}
                    </p>
                  )}
                </div>
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
