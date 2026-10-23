import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, faqSchema } from '../components/SEO';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { WHATSAPP_URL } from '../constants/contact';
import { localizedPath } from '../utils/localizedPath';
import { getHelpCategories } from '../constants/helpCentre';
import {
  Search,
  ArrowLeft,
  ChevronDown,
  Rocket,
  QrCode,
  Percent,
  Wallet,
  ShieldCheck,
  Lock,
  Mail,
  type LucideIcon,
} from 'lucide-react';

const BASE = 'helpCentre';

/** Icons referenced by name from the category list. */
const ICONS: Record<string, LucideIcon> = {
  Rocket,
  QrCode,
  Percent,
  Wallet,
  ShieldCheck,
  Lock,
};

/** Fold accents so "securite" matches "sécurité". */
const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export default function HelpCentrePage() {
  const { t } = useTranslation();
  const location = useLocation();

  const categories = useMemo(() => getHelpCategories(t), [t]);
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const q = norm(query);

  // Searching collapses the category grid and shows matches across everything,
  // which is what people do first in a help centre.
  const results = useMemo(() => {
    if (!q) return null;
    const hits: { categoryTitle: string; id: string; question: string; answer: string }[] = [];
    for (const c of categories) {
      for (const a of c.articles) {
        if (norm(a.question).includes(q) || norm(a.answer).includes(q)) {
          hits.push({ categoryTitle: c.title, ...a });
        }
      }
    }
    return hits;
  }, [q, categories]);

  const totalArticles = categories.reduce((n, c) => n + c.articles.length, 0);

  // Every article, for the FAQ structured data — unchanged from the FAQ page.
  const faqItems = categories.flatMap((c) =>
    c.articles.map((a) => ({ question: a.question, answer: a.answer }))
  );

  const Article = ({
    a,
    context,
  }: {
    a: { id: string; question: string; answer: string };
    context?: string;
  }) => {
    const open = openId === a.id;
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpenId(open ? null : a.id)}
          aria-expanded={open}
          className="w-full flex items-start justify-between gap-6 py-5 text-left group"
        >
          <span>
            {context && (
              <span className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">
                {context}
              </span>
            )}
            <span className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
              {a.question}
            </span>
          </span>
          <ChevronDown
            className={`mt-1 w-5 h-5 shrink-0 text-slate-400 transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
        {open && (
          <p className="pb-6 pr-10 text-slate-500 font-medium leading-relaxed">{a.answer}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/help"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Help Centre', url: '/help' },
          ]),
          faqSchema(faqItems),
        ]}
      />
      <Header />

      {/* Search hero */}
      <section className="pt-40 pb-16 px-6 md:px-8 bg-slate-50 border-b border-slate-100">
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
              {t(`${BASE}.subtitle`, { count: totalArticles })}
            </p>

            <div className="relative max-w-xl mx-auto pt-4">
              <Search
                className="absolute left-6 top-1/2 mt-2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <label htmlFor="help-search" className="sr-only">
                {t(`${BASE}.searchLabel`)}
              </label>
              <input
                id="help-search"
                type="search"
                autoComplete="off"
                placeholder={t(`${BASE}.searchPlaceholder`)}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpenId(null);
                }}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          {results ? (
            /* ---------------- Search results ---------------- */
            <section>
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">
                {t(`${BASE}.resultsCount`, { count: results.length })}
              </h2>
              {results.length === 0 ? (
                <p className="text-lg text-slate-500 font-medium">
                  {t(`${BASE}.noResults`, { query })}
                </p>
              ) : (
                <div className="rounded-3xl border border-slate-200 px-8">
                  {results.map((r) => (
                    <div key={r.id} className="border-b border-slate-100 last:border-0">
                      <Article a={r} context={r.categoryTitle} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : (
            <>
              {/* ---------------- Category grid ---------------- */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((c) => {
                  const Icon = ICONS[c.icon] ?? Rocket;
                  return (
                    <a
                      key={c.key}
                      href={`#${c.key}`}
                      className="group rounded-3xl border border-slate-200 p-7 hover:border-primary/40 hover:shadow-lg transition-all"
                    >
                      <span className="inline-flex w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </span>
                      <h2 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">
                        {c.title}
                      </h2>
                      <p className="mt-2 text-sm text-slate-500 font-medium leading-relaxed">
                        {c.desc}
                      </p>
                      <p className="mt-4 text-xs font-black uppercase tracking-widest text-slate-400">
                        {t(`${BASE}.articleCount`, { count: c.articles.length })}
                      </p>
                    </a>
                  );
                })}
              </div>

              {/* ---------------- Articles by category ---------------- */}
              <div className="mt-24 space-y-16">
                {categories.map((c) => {
                  const Icon = ICONS[c.icon] ?? Rocket;
                  return (
                    <section key={c.key} id={c.key} className="scroll-mt-32">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="inline-flex w-11 h-11 rounded-2xl bg-primary/10 items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                        </span>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900">
                          {c.title}
                        </h2>
                      </div>
                      <div className="rounded-3xl border border-slate-200 px-8">
                        {c.articles.map((a) => (
                          <div key={a.id} className="border-b border-slate-100 last:border-0">
                            <Article a={a} />
                          </div>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </>
          )}

          {/* ---------------- Still stuck ---------------- */}
          <section className="mt-24 rounded-3xl bg-slate-50 border border-slate-100 p-10 text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                {t(`${BASE}.contact.title`)}
              </h2>
              <p className="text-slate-500 font-medium max-w-xl mx-auto">
                {t(`${BASE}.contact.body`)}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-7 py-4 rounded-2xl font-black shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                {t(`${BASE}.contact.whatsapp`)}
              </a>
              <a
                href="mailto:info@lumifin.io"
                className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 border border-slate-200 px-7 py-4 rounded-2xl font-black hover:border-slate-300 transition-all"
              >
                <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />
                {t(`${BASE}.contact.email`)}
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
