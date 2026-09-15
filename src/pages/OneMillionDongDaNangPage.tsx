import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthorBio from '../components/AuthorBio';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { localizedPath } from '../utils/localizedPath';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

const BASE = 'blogPosts.oneMillionDongDaNang';

type LedgerRow = { item: string; dong: string; euro: string };
type LevelRow = { level: string; cost: string; what: string };
type Area = { name: string; body: string };
type Blower = { name: string; body: string };

/** The day's receipt: item, dong, euro. Last row is the total, emphasised. */
function Ledger({ head, rows, totalLabel, totalDong, totalEuro }: {
  head: string[]; rows: string[][]; totalLabel: string; totalDong: string; totalEuro: string;
}) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto -mx-2">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200">
              {head.map((h, i) => (
                <th key={i} className={`py-3 px-3 font-black text-slate-900 align-top ${i > 0 ? 'text-right whitespace-nowrap' : ''}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-slate-100 align-top">
                {r.map((c, j) => (
                  <td key={j} className={`py-3 px-3 ${j === 0 ? 'text-slate-700' : 'text-slate-600 text-right whitespace-nowrap tabular-nums'}`}>{c}</td>
                ))}
              </tr>
            ))}
            <tr className="border-t-2 border-slate-300">
              <td className="py-4 px-3 font-black text-slate-900">{totalLabel}</td>
              <td className="py-4 px-3 font-black text-slate-900 text-right whitespace-nowrap tabular-nums">{totalDong}</td>
              <td className="py-4 px-3 font-black text-slate-900 text-right whitespace-nowrap tabular-nums">{totalEuro}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Mobile: item on its own line, prices beneath */}
      <div className="md:hidden space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 text-base">
            <span className="text-slate-700 leading-snug">{r[0]}</span>
            <span className="shrink-0 text-right">
              <span className="block font-bold text-slate-900 tabular-nums">{r[1]}</span>
              <span className="block text-sm text-slate-500 tabular-nums">{r[2]}</span>
            </span>
          </div>
        ))}
        <div className="flex items-baseline justify-between gap-4 border-t-2 border-slate-300 pt-4 text-lg">
          <span className="font-black text-slate-900">{totalLabel}</span>
          <span className="shrink-0 text-right">
            <span className="block font-black text-slate-900 tabular-nums">{totalDong}</span>
            <span className="block text-base font-bold text-slate-600 tabular-nums">{totalEuro}</span>
          </span>
        </div>
      </div>
    </>
  );
}

function LevelsTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto -mx-2">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200">
              {head.map((h, i) => (
                <th key={i} className="py-3 px-3 font-black text-slate-900 align-top">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-slate-100 align-top">
                {r.map((c, j) => (
                  <td key={j} className={`py-3 px-3 ${j === 0 ? 'font-bold text-slate-900 whitespace-nowrap' : j === 1 ? 'text-slate-900 font-bold whitespace-nowrap tabular-nums' : 'text-slate-600'}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-4">
        {rows.map((r, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 p-5 text-base leading-relaxed">
            <p className="font-black text-slate-900 text-lg">{r[0]}</p>
            <p className="font-bold text-primary tabular-nums">{r[1]}</p>
            <p className="mt-1 text-slate-600">{r[2]}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default function OneMillionDongDaNangPage() {
  const { t } = useTranslation();
  const location = useLocation();

  const ledgerHead = t(`${BASE}.ledgerHead`, { returnObjects: true }) as unknown as string[];
  const ledgerRows = (t(`${BASE}.ledgerRows`, { returnObjects: true }) as unknown as LedgerRow[])
    .map(r => [r.item, r.dong, r.euro]);
  const areas = t(`${BASE}.areas`, { returnObjects: true }) as unknown as Area[];
  const levelsHead = t(`${BASE}.levelsHead`, { returnObjects: true }) as unknown as string[];
  const levelsRows = (t(`${BASE}.levelsRows`, { returnObjects: true }) as unknown as LevelRow[])
    .map(r => [r.level, r.cost, r.what]);
  const blowers = t(`${BASE}.blowers`, { returnObjects: true }) as unknown as Blower[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/one-million-dong-da-nang"
        ogImage="/assets/blog/one-million-dong-da-nang-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'What 1,000,000₫ Actually Buys You in Da Nang', url: '/blog/one-million-dong-da-nang' },
          ]),
          articleSchema({
            title: 'What 1,000,000₫ Actually Buys You in Da Nang',
            description: 'A full day in Da Nang for 1,000,000₫ (about €33), itemised — room, three meals, scooter, beach and beer, with 2026 prices in đồng and euros.',
            url: '/blog/one-million-dong-da-nang',
            image: '/assets/blog/one-million-dong-da-nang-cover.webp',
            author: 'Tanvi Nag',
            datePublished: '2026-09-15',
          }),
        ]}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <article className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-widest mb-16 pb-8 border-b border-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {t(`${BASE}.backToBlog`)}
            </Link>

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">
              {t(`${BASE}.category`)}
            </span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t(`${BASE}.title`)}
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed italic">
              {t(`${BASE}.subtitle`)}
            </p>

            <div className="mt-10 pb-10 border-b border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {t(`${BASE}.author`)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {t(`${BASE}.readTime`)}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t(`${BASE}.dateLabel`)}
              </span>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden">
              <img
                src="/assets/blog/one-million-dong-da-nang-cover.webp"
                alt={t(`${BASE}.imgAlt`)}
                loading="lazy"
                width={1600}
                height={900}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12 space-y-6 text-lg md:text-xl text-slate-700 leading-[1.8] font-medium"
          >
            {/* Opening */}
            <p>{t(`${BASE}.introP1`)}</p>
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.introP2`)}</p>
            <p>{t(`${BASE}.introP3`)}</p>
            <p>{t(`${BASE}.introP4`)}</p>

            {/* The ledger */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.ledgerH`)}</p>
            <Ledger
              head={ledgerHead}
              rows={ledgerRows}
              totalLabel={t(`${BASE}.ledgerTotalLabel`)}
              totalDong={t(`${BASE}.ledgerTotalDong`)}
              totalEuro={t(`${BASE}.ledgerTotalEuro`)}
            />
            <p className="font-bold text-slate-900">{t(`${BASE}.ledgerLeftover`)}</p>
            <p className="text-base text-slate-500 font-normal italic">{t(`${BASE}.ledgerRateNote`)}</p>

            {/* The room */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.roomH`)}</p>
            <p>{t(`${BASE}.roomP1`)}</p>
            <p>{t(`${BASE}.roomP2`)}</p>
            <p>{t(`${BASE}.roomP3`)}</p>
            <div className="space-y-4">
              {areas.map((a, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-6">
                  <p className="font-black text-slate-900 text-xl">{a.name}</p>
                  <p className="mt-2 text-base md:text-lg text-slate-600 leading-relaxed">{a.body}</p>
                </div>
              ))}
            </div>
            <p>{t(`${BASE}.roomP4`)}</p>

            {/* Food */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.foodH`)}</p>
            <p>{t(`${BASE}.foodP1`)}</p>
            <p>{t(`${BASE}.foodP2`)}</p>
            <p>{t(`${BASE}.foodP3`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.foodP4`)}</p>
            <p>{t(`${BASE}.foodP5`)}</p>
            <p>{t(`${BASE}.foodP6`)}</p>

            {/* Coffee */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.coffeeH`)}</p>
            <p>{t(`${BASE}.coffeeP1`)}</p>
            <p>{t(`${BASE}.coffeeP2`)}</p>
            <p>{t(`${BASE}.coffeeP3`)}</p>
            <p>{t(`${BASE}.coffeeP4`)}</p>

            {/* Transport */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.transportH`)}</p>
            <p>{t(`${BASE}.transportP1`)}</p>
            <p>{t(`${BASE}.transportP2`)}</p>
            <p>{t(`${BASE}.transportP3`)}</p>

            {/* Free */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.freeH`)}</p>
            <p>{t(`${BASE}.freeP1`)}</p>
            <p>{t(`${BASE}.freeP2`)}</p>
            <p>{t(`${BASE}.freeP3`)}</p>
            <p>{t(`${BASE}.freeP4`)}</p>
            <p>{t(`${BASE}.freeP5`)}</p>

            {/* When to go */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.whenH`)}</p>
            <p>{t(`${BASE}.whenP1`)}</p>
            <p>{t(`${BASE}.whenP2`)}</p>

            {/* What blows it */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.blowersH`)}</p>
            <p>{t(`${BASE}.blowersP1`)}</p>
            <div className="space-y-4 pl-2">
              {blowers.map((bl, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-primary font-black text-xl">{i + 1}.</span>
                  <p><span className="font-black text-slate-900">{bl.name}</span> {bl.body}</p>
                </div>
              ))}
            </div>
            <p>{t(`${BASE}.blowersP2`)}</p>
            <p>{t(`${BASE}.blowersP3`)}</p>

            {/* Four levels */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.levelsH`)}</p>
            <p>{t(`${BASE}.levelsP1`)}</p>
            <LevelsTable head={levelsHead} rows={levelsRows} />
            <p>{t(`${BASE}.levelsP2`)}</p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* Verdict */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.verdictH`)}</p>
            <p>{t(`${BASE}.verdictP1`)}</p>
            <p>{t(`${BASE}.verdictP2`)}</p>
            <p>{t(`${BASE}.verdictP3`)}</p>
            <p>{t(`${BASE}.verdictP4`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.verdictP5`)}</p>

            {/* Waitlist callout */}
            <div className="rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10 space-y-4">
              <p className="text-primary font-black text-xs tracking-[0.3em] uppercase">
                {t(`${BASE}.calloutEyebrow`)}
              </p>
              <p className="text-slate-700">{t(`${BASE}.calloutBody`)}</p>
              <Link
                to={localizedPath('/#waitlist', location.pathname)}
                className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-base"
              >
                {t(`${BASE}.calloutCta`)}
              </Link>
            </div>
          </motion.div>

          <AuthorBio authorName="Tanvi Nag" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
