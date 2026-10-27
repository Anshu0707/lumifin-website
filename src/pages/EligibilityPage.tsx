import React, { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { localizedPath } from '../utils/localizedPath';
import { SEPA_COUNTRIES } from '../constants/sepaCountries';
import { WORLD_COUNTRIES } from '../constants/worldCountries';
import { Check, Search, ArrowLeft, ChevronDown, Clock, Mail } from 'lucide-react';

const BASE = 'eligibility';

/** The 30 EEA codes Lumi can be funded from, as a set for O(1) lookups. */
const SEPA_CODES = new Set(SEPA_COUNTRIES.map((c) => c.code));

/** Netlify Forms expects a urlencoded body with the form-name field. */
function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

/** Fold accents so "Irlande" matches a search for "irlande" or "Irl". */
const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export default function EligibilityPage() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Every country is listed, so typing one always returns that country by
  // name instead of a bare "no match". Whether Lumi can be funded from it is
  // a separate flag read from the same constant the signup form uses, so the
  // two can never drift apart.
  //
  // Every non-eligible country gets the identical response. Listing all but
  // the restricted ones would make "no match" identify the restricted list
  // exactly — a sharper leak than naming them would have been.
  const lang = i18n.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';

  // One formatter for the whole list; 242 instances would not be free.
  const regionNames = useMemo(() => {
    try {
      return new Intl.DisplayNames([lang], { type: 'region' });
    } catch {
      return null; // engine without Intl.DisplayNames — fall back to English
    }
  }, [lang]);

  const countries = useMemo(
    () =>
      WORLD_COUNTRIES.map((c) => {
        // Prefer the curated translations already held for the EEA countries.
        const curated = t(`${BASE}.countryNames.${c.code}`, { defaultValue: '' });
        let localised = '';
        try {
          localised = regionNames?.of(c.code) ?? '';
        } catch {
          localised = '';
        }
        return {
          code: c.code,
          name: curated || localised || c.name,
          eligible: SEPA_CODES.has(c.code),
        };
      }).sort((a, b) => a.name.localeCompare(b.name, lang, { sensitivity: 'base' })),
    [t, regionNames, lang]
  );

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{
    code: string;
    name: string;
    eligible: boolean;
  } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // "Tell me when it opens" form, shown only on the not-yet-eligible branch.
  const [email, setEmail] = useState('');
  const [notifyState, setNotifyState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const matches = useMemo(() => {
    const q = norm(query);
    if (!q) return countries;
    // Rank exact, then prefix, then substring matches. Plain alphabetical
    // order would put "Caribbean Netherlands" above "Netherlands" for someone
    // typing their own country's name.
    return countries
      .filter((c) => norm(c.name).includes(q))
      .map((c) => {
        const n = norm(c.name);
        return { c, rank: n === q ? 0 : n.startsWith(q) ? 1 : 2 };
      })
      .sort(
        (a, b) =>
          a.rank - b.rank ||
          a.c.name.localeCompare(b.c.name, lang, { sensitivity: 'base' })
      )
      .map((m) => m.c);
  }, [countries, query, lang]);

  // Close the dropdown when clicking away.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const choose = (c: { code: string; name: string; eligible: boolean }) => {
    setSelected(c);
    setQuery(c.name);
    setOpen(false);
    // A new country means a fresh form, not the previous country's success.
    setNotifyState('idle');
  };

  const handleNotify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selected) return;
    setNotifyState('sending');
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'country-interest',
        email,
        country: selected.name,
        countryCode: selected.code,
      }),
    })
      .then(() => setNotifyState('done'))
      .catch(() => setNotifyState('error'));
  };

  const requirements = t(`${BASE}.requirements`, { returnObjects: true }) as unknown as string[];

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
        <div className="max-w-2xl mx-auto">
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

            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t(`${BASE}.title`)}
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">
              {t(`${BASE}.subtitle`)}
            </p>
          </motion.div>

          {/* Country checker */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-14"
          >
            <label
              htmlFor="country-search"
              className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4"
            >
              {t(`${BASE}.checkerLabel`)}
            </label>

            <div ref={boxRef} className="relative">
              <div className="relative">
                <Search
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="country-search"
                  type="text"
                  role="combobox"
                  aria-expanded={open}
                  aria-controls="country-listbox"
                  aria-autocomplete="list"
                  autoComplete="off"
                  placeholder={t(`${BASE}.checkerPlaceholder`)}
                  value={query}
                  onFocus={() => setOpen(true)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelected(null);
                    setOpen(true);
                  }}
                  className="w-full pl-14 pr-12 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg"
                />
                <ChevronDown
                  className={`absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-transform pointer-events-none ${
                    open ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </div>

              {open && (
                <ul
                  id="country-listbox"
                  role="listbox"
                  className="absolute z-20 mt-2 w-full max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl py-2"
                >
                  {matches.length === 0 ? (
                    <li className="px-6 py-4 text-slate-500 font-medium">
                      {t(`${BASE}.checkerNoMatch`)}
                    </li>
                  ) : (
                    matches.map((c) => (
                      <li key={c.code} role="option" aria-selected={selected?.code === c.code}>
                        <button
                          type="button"
                          onClick={() => choose(c)}
                          className="w-full text-left px-6 py-3 font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                        >
                          {c.name}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>

            {/* Result — supported, or named and not supported yet */}
            {selected && selected.eligible && (
              <div
                role="status"
                className="mt-6 flex items-start gap-4 rounded-2xl bg-primary/5 border border-primary/20 px-6 py-5"
              >
                <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-primary/15 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                </span>
                <p className="text-slate-700 font-medium leading-relaxed">
                  <span className="font-black text-slate-900">
                    {t(`${BASE}.resultYes`, { country: selected.name })}
                  </span>{' '}
                  {t(`${BASE}.resultYesBody`)}
                </p>
              </div>
            )}

            {selected && !selected.eligible && (
              <div
                role="status"
                className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 px-6 py-5"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-600" aria-hidden="true" />
                  </span>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    <span className="font-black text-slate-900">
                      {t(`${BASE}.resultNo`, { country: selected.name })}
                    </span>{' '}
                    {t(`${BASE}.resultNoBody`)}
                  </p>
                </div>

                {/* Interest capture. Deliberately optional — the answer above
                    stands on its own if nobody fills this in. */}
                {notifyState === 'done' ? (
                  <p className="mt-5 flex items-start gap-3 text-slate-700 font-medium leading-relaxed">
                    <Check className="mt-1 w-5 h-5 shrink-0 text-amber-600" aria-hidden="true" />
                    {t(`${BASE}.notifyDone`)}
                  </p>
                ) : (
                  <form onSubmit={handleNotify} className="mt-5" noValidate>
                    <label
                      htmlFor="notify-email"
                      className="block text-sm font-bold text-slate-600 mb-3 leading-relaxed"
                    >
                      {t(`${BASE}.notifyLabel`)}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="notify-email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder={t(`${BASE}.notifyPlaceholder`)}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300/40 focus:border-amber-400 transition-all font-medium"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={notifyState === 'sending'}
                        className="shrink-0 bg-slate-900 text-white px-6 py-3.5 rounded-xl font-black hover:-translate-y-0.5 hover:shadow-lg transition-all disabled:opacity-60 disabled:translate-y-0"
                      >
                        {t(`${BASE}.` + (notifyState === 'sending' ? 'notifySending' : 'notifyCta'))}
                      </button>
                    </div>
                    {notifyState === 'error' && (
                      <p role="alert" className="mt-3 text-sm font-bold text-red-600">
                        {t(`${BASE}.notifyError`)}
                      </p>
                    )}
                    <p className="mt-3 text-sm text-slate-500 font-normal leading-relaxed">
                      <Trans
                        i18nKey={`${BASE}.notifyPrivacy`}
                        components={{
                          1: (
                            <Link
                              to={localizedPath('/privacy', location.pathname)}
                              className="text-slate-600 font-bold hover:underline"
                            />
                          ),
                        }}
                      />
                    </p>
                  </form>
                )}
              </div>
            )}

            <p className="mt-5 text-base text-slate-500 font-normal leading-relaxed">
              {t(`${BASE}.checkerNote`)}
            </p>
            <p className="mt-3 text-base text-slate-500 font-normal leading-relaxed">
              {t(`${BASE}.checkerScope`)}
            </p>
          </motion.section>

          {/* Requirements */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {t(`${BASE}.requirementsH`)}
            </h2>
            <ul className="mt-6 space-y-4">
              {requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                  </span>
                  <span className="text-lg text-slate-700 font-medium leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-16 rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10 text-center space-y-5"
          >
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {t(`${BASE}.ctaH`)}
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
              {t(`${BASE}.ctaBody`)}
            </p>
            <Link
              to={localizedPath('/#waitlist', location.pathname)}
              className="inline-block hero-gradient text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-lg"
            >
              {t(`${BASE}.ctaButton`)}
            </Link>
          </motion.section>

          <p className="mt-10 text-base text-slate-400 font-normal leading-relaxed text-center">
            <Trans
              i18nKey={`${BASE}.legalNote`}
              components={{
                1: (
                  <Link
                    to={localizedPath('/terms', location.pathname)}
                    className="text-primary font-bold hover:underline"
                  />
                ),
                2: (
                  <Link
                    to={localizedPath('/help', location.pathname)}
                    className="text-primary font-bold hover:underline"
                  />
                ),
              }}
            />
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
