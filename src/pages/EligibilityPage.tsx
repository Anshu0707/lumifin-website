import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { localizedPath } from '../utils/localizedPath';
import { SEPA_COUNTRIES } from '../constants/sepaCountries';
import { Check, X, ArrowLeft, Building2 } from 'lucide-react';

const BASE = 'eligibility';

type Destination = { name: string; scheme?: string; status: 'live' | 'next' | 'soon' };

export default function EligibilityPage() {
  const { t } = useTranslation();
  const location = useLocation();

  // The country set comes from SEPA_COUNTRIES so this page can never drift from
  // the signup form's country selector. Display names are localised by ISO code,
  // falling back to the constant's English name if a translation is missing.
  const countries = SEPA_COUNTRIES
    .map((c) => ({
      code: c.code,
      name: t(`${BASE}.countryNames.${c.code}`, { defaultValue: c.name }),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  const requirements = t(`${BASE}.requirements`, { returnObjects: true }) as unknown as string[];
  const notEligible = t(`${BASE}.notEligible`, { returnObjects: true }) as unknown as string[];
  const destinations = t(`${BASE}.destinations`, { returnObjects: true }) as unknown as Destination[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/eligibility"
        structuredData={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Eligibility', url: '/eligibility' },
        ])}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
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

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">
              {t(`${BASE}.eyebrow`)}
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t(`${BASE}.title`)}
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">
              {t(`${BASE}.subtitle`)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-14 space-y-12"
          >
            {/* The bank account requirement — the single most important condition */}
            <section className="rounded-3xl bg-slate-50 border border-slate-200 p-8 md:p-10">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    {t(`${BASE}.bankH`)}
                  </h2>
                  <p className="text-lg text-slate-700 font-medium leading-relaxed">
                    {t(`${BASE}.bankBody`)}
                  </p>
                  <p className="text-base text-slate-500 font-normal leading-relaxed">
                    {t(`${BASE}.bankNote`)}
                  </p>
                </div>
              </div>
            </section>

            {/* Full requirement list */}
            <section className="space-y-5">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                {t(`${BASE}.requirementsH`)}
              </h2>
              <ul className="space-y-4">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                    </span>
                    <span className="text-lg text-slate-700 font-medium leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Country list */}
            <section className="space-y-5">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                {t(`${BASE}.countriesH`, { count: countries.length })}
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                {t(`${BASE}.countriesIntro`)}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                {countries.map((c) => (
                  <li key={c.code} className="flex items-center gap-3 text-slate-700 font-medium">
                    <Check className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                    {c.name}
                  </li>
                ))}
              </ul>
            </section>

            {/* Explicitly not eligible */}
            <section className="space-y-5">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                {t(`${BASE}.notEligibleH`)}
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                {t(`${BASE}.notEligibleIntro`)}
              </p>
              <ul className="space-y-4">
                {notEligible.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-slate-100 flex items-center justify-center">
                      <X className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    </span>
                    <span className="text-lg text-slate-700 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Where you can pay */}
            <section className="space-y-5">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                {t(`${BASE}.whereH`)}
              </h2>
              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                {t(`${BASE}.whereBody`)}
              </p>
              <ul className="space-y-3">
                {destinations.map((d, i) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-6 py-4"
                  >
                    <span className="font-bold text-slate-900">
                      {d.name}
                      {d.scheme && <span className="ml-2 font-medium text-slate-500">{d.scheme}</span>}
                    </span>
                    <span
                      className={`shrink-0 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                        d.status === 'live'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {t(`${BASE}.status.${d.status}`)}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-base text-slate-500 font-normal leading-relaxed">
                {t(`${BASE}.whereNote`)}
              </p>
            </section>

            {/* CTA */}
            <section className="rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10 space-y-5 text-center">
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                {t(`${BASE}.ctaH`)}
              </h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
                {t(`${BASE}.ctaBody`)}
              </p>
              <Link
                to={localizedPath('/#waitlist', location.pathname)}
                className="inline-block hero-gradient text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-lg"
              >
                {t(`${BASE}.ctaButton`)}
              </Link>
            </section>

            {/* Legal pointer */}
            <p className="text-base text-slate-400 font-normal leading-relaxed text-center">
              <Trans
                i18nKey={`${BASE}.legalNote`}
                components={{
                  1: <Link to={localizedPath('/terms', location.pathname)} className="text-primary font-bold hover:underline" />,
                  2: <Link to={localizedPath('/faq', location.pathname)} className="text-primary font-bold hover:underline" />,
                }}
              />
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
