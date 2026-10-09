import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, faqSchema } from '../components/SEO';
import { localizedPath } from '../utils/localizedPath';
import { Signal, Smartphone, Globe2, Zap, ChevronDown, ArrowLeft, Check } from 'lucide-react';

const BASE = 'esim';

type Step = { title: string; desc: string };
type Benefit = { title: string; desc: string };
type Plan = { country: string; status: 'live' | 'next' | 'soon'; price: string };
type Faq = { q: string; a: string };

const STEP_ICONS = [Smartphone, Signal, Globe2, Zap];

export default function EsimPage() {
  const { t } = useTranslation();
  const location = useLocation();

  const highlights = t(`${BASE}.highlights`, { returnObjects: true }) as unknown as string[];
  const steps = t(`${BASE}.steps`, { returnObjects: true }) as unknown as Step[];
  const benefits = t(`${BASE}.benefits`, { returnObjects: true }) as unknown as Benefit[];
  const plans = t(`${BASE}.plans`, { returnObjects: true }) as unknown as Plan[];
  const faqs = t(`${BASE}.faqs`, { returnObjects: true }) as unknown as Faq[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/esim"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'eSIM', url: '/esim' },
          ]),
          faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />
      <Header />

      <main className="pt-40 pb-32">
        {/* Hero */}
        <section className="px-6 md:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                to={localizedPath('/', location.pathname)}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-widest mb-16 pb-8 border-b border-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {t(`${BASE}.backHome`)}
              </Link>

              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                {t(`${BASE}.availableBadge`)}
              </span>

              <h1 className="mt-8 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
                {t(`${BASE}.title`)}
              </h1>

              <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">
                {t(`${BASE}.subtitle`)}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to={localizedPath('/#waitlist', location.pathname)}
                  className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
                >
                  {t(`${BASE}.ctaPrimary`)}
                </Link>
                <a
                  href="#how"
                  className="inline-block border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-black hover:border-primary hover:text-primary transition-all"
                >
                  {t(`${BASE}.ctaSecondary`)}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Highlight strip */}
        <section className="px-6 md:px-8 mt-16">
          <ul className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {highlights.map((h, i) => (
              <li
                key={i}
                className="rounded-2xl bg-slate-50 border border-slate-100 px-6 py-5 text-center font-bold text-slate-700"
              >
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section id="how" className="px-6 md:px-8 mt-24 scroll-mt-28">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 text-center">
              {t(`${BASE}.howH`)}
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-medium text-center max-w-2xl mx-auto">
              {t(`${BASE}.howIntro`)}
            </p>
            <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((s, i) => {
                const Icon = STEP_ICONS[i % STEP_ICONS.length];
                return (
                  <li key={i} className="rounded-3xl border border-slate-200 p-8">
                    <div className="flex items-center gap-4">
                      <span className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                        {t(`${BASE}.stepLabel`, { n: i + 1 })}
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-black text-slate-900">{s.title}</h3>
                    <p className="mt-2 text-base md:text-lg text-slate-600 leading-relaxed">{s.desc}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Why an eSIM */}
        <section className="px-6 md:px-8 mt-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 text-center">
              {t(`${BASE}.whyH`)}
            </h2>
            <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {benefits.map((b, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-black text-slate-900 text-lg">{b.title}</p>
                    <p className="mt-1 text-slate-600 leading-relaxed">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Where it works */}
        <section className="px-6 md:px-8 mt-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              {t(`${BASE}.plansH`)}
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-medium">{t(`${BASE}.plansIntro`)}</p>
            <ul className="mt-10 space-y-3">
              {plans.map((p, i) => (
                <li
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-6 py-5"
                >
                  <span className="font-black text-slate-900 text-lg">{p.country}</span>
                  <span className="flex items-center gap-4">
                    <span className="text-slate-600 font-medium tabular-nums">{p.price}</span>
                    <span
                      className={`shrink-0 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                        p.status === 'live'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {t(`${BASE}.status.${p.status}`)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-base text-slate-500 font-normal leading-relaxed">
              {t(`${BASE}.plansNote`)}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-8 mt-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight text-slate-900">
              {t(`${BASE}.faqH`)}
            </h2>
            <div className="mt-10 space-y-4">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="group bg-slate-50 rounded-3xl overflow-hidden transition-all hover:bg-slate-100"
                >
                  <summary className="flex justify-between items-center gap-6 p-7 cursor-pointer list-none">
                    <h3 className="text-lg font-bold text-slate-900">{f.q}</h3>
                    <ChevronDown className="w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <div className="px-7 pb-7 text-slate-600 font-medium leading-relaxed">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-6 md:px-8 mt-24">
          <div className="max-w-3xl mx-auto rounded-3xl bg-slate-50 border border-slate-100 p-10 text-center space-y-5">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              {t(`${BASE}.ctaH`)}
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
              {t(`${BASE}.ctaBody`)}
            </p>
            <Link
              to={localizedPath('/#waitlist', location.pathname)}
              className="inline-block hero-gradient text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-lg"
            >
              {t(`${BASE}.ctaPrimary`)}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
