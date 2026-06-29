import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthorBio from '../components/AuthorBio';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

const BASE = 'blogPosts.digitalNomadVisas';

type CompRow = { dest: string; route: string; bestFor: string; watchOut: string };
type DailyRow = { factor: string; thailand: string; vietnam: string; bali: string };
type Source = { n: string; label: string };

function ResponsiveTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <>
      {/* Desktop / tablet: real table */}
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
                  <td key={j} className={`py-3 px-3 ${j === 0 ? 'font-bold text-slate-900 whitespace-nowrap' : 'text-slate-600'}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-4">
        {rows.map((r, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 p-5 text-base leading-relaxed">
            <p className="font-black text-slate-900 text-lg">{r[0]}</p>
            {r.slice(1).map((c, j) => (
              <p key={j} className="mt-1"><span className="font-bold text-slate-900">{head[j + 1]}: </span>{c}</p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 pl-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <span className="text-primary font-black text-xl">·</span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function DigitalNomadVisasPage() {
  const { t } = useTranslation();

  const compHead = t(`${BASE}.compHead`, { returnObjects: true }) as unknown as string[];
  const compRows = (t(`${BASE}.compRows`, { returnObjects: true }) as unknown as CompRow[]).map(r => [r.dest, r.route, r.bestFor, r.watchOut]);
  const dailyHead = t(`${BASE}.dailyHead`, { returnObjects: true }) as unknown as string[];
  const dailyRows = (t(`${BASE}.dailyRows`, { returnObjects: true }) as unknown as DailyRow[]).map(r => [r.factor, r.thailand, r.vietnam, r.bali]);
  const shortAnswerList = t(`${BASE}.shortAnswerList`, { returnObjects: true }) as unknown as string[];
  const thailandFit = t(`${BASE}.thailandFit`, { returnObjects: true }) as unknown as string[];
  const vietnamFit = t(`${BASE}.vietnamFit`, { returnObjects: true }) as unknown as string[];
  const baliFit = t(`${BASE}.baliFit`, { returnObjects: true }) as unknown as string[];
  const nextList = t(`${BASE}.nextList`, { returnObjects: true }) as unknown as string[];
  const sources = t(`${BASE}.sources`, { returnObjects: true }) as unknown as Source[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/digital-nomad-visas-thailand-vietnam-bali-2026"
        ogImage="/assets/blog/digital-nomad-visas-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'Digital Nomad Visas in Thailand, Vietnam, and Bali (2026)', url: '/blog/digital-nomad-visas-thailand-vietnam-bali-2026' },
          ]),
          articleSchema({
            title: 'Digital Nomad Visas in Thailand, Vietnam, and Bali: The 2026 Comparison',
            description: 'Thailand, Vietnam, and Bali all attract remote workers, but their visa routes are very different. The practical 2026 comparison for Europeans choosing a Southeast Asia base.',
            url: '/blog/digital-nomad-visas-thailand-vietnam-bali-2026',
            image: '/assets/blog/digital-nomad-visas-cover.webp',
            author: 'Pierre Lahbabi',
            datePublished: '2026-06-29',
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
                src="/assets/blog/digital-nomad-visas-cover.webp"
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
            {/* Intro */}
            <p>{t(`${BASE}.introP1`)}</p>
            <p>{t(`${BASE}.introP2`)}</p>
            <p>{t(`${BASE}.introP3`)}</p>
            <p>{t(`${BASE}.introP4`)}</p>

            {/* The short answer */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.shortAnswerH`)}</p>
            <Bullets items={shortAnswerList} />
            <p>{t(`${BASE}.shortAnswerP`)}</p>

            {/* Quick comparison */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.comparisonH`)}</p>
            <ResponsiveTable head={compHead} rows={compRows} />
            <p>{t(`${BASE}.comparisonP`)}</p>

            {/* Thailand */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.thailandH`)}</p>
            <p>{t(`${BASE}.thailandP1`)}</p>
            <p>{t(`${BASE}.thailandP2`)}</p>
            <p>{t(`${BASE}.thailandP3`)}</p>
            <p>{t(`${BASE}.thailandP4`)}</p>
            <p className="text-xl font-black text-slate-900">{t(`${BASE}.thailandFitH`)}</p>
            <Bullets items={thailandFit} />
            <p>{t(`${BASE}.thailandClose`)}</p>

            {/* Vietnam */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.vietnamH`)}</p>
            <p>{t(`${BASE}.vietnamP1`)}</p>
            <p>{t(`${BASE}.vietnamP2`)}</p>
            <p>{t(`${BASE}.vietnamP3`)}</p>
            <p>{t(`${BASE}.vietnamP4`)}</p>
            <p className="text-xl font-black text-slate-900">{t(`${BASE}.vietnamFitH`)}</p>
            <Bullets items={vietnamFit} />
            <p>{t(`${BASE}.vietnamClose`)}</p>

            {/* Bali */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.baliH`)}</p>
            <p>{t(`${BASE}.baliP1`)}</p>
            <p>{t(`${BASE}.baliP2`)}</p>
            <p>{t(`${BASE}.baliP3`)}</p>
            <p>{t(`${BASE}.baliP4`)}</p>
            <p className="text-xl font-black text-slate-900">{t(`${BASE}.baliFitH`)}</p>
            <Bullets items={baliFit} />
            <p>{t(`${BASE}.baliClose`)}</p>

            {/* Work rhythm */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.rhythmH`)}</p>
            <p>{t(`${BASE}.rhythmP1`)}</p>
            <p>{t(`${BASE}.rhythmP2`)}</p>
            <p className="text-xl font-black text-slate-900">{t(`${BASE}.rhythmStabilityH`)}</p>
            <p>{t(`${BASE}.rhythmStabilityP`)}</p>
            <p className="text-xl font-black text-slate-900">{t(`${BASE}.rhythmFlexH`)}</p>
            <p>{t(`${BASE}.rhythmFlexP`)}</p>
            <p className="text-xl font-black text-slate-900">{t(`${BASE}.rhythmLifestyleH`)}</p>
            <p>{t(`${BASE}.rhythmLifestyleP`)}</p>

            {/* Daily-life comparison */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.dailyH`)}</p>
            <ResponsiveTable head={dailyHead} rows={dailyRows} />

            {/* Hidden friction */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.hiddenH`)}</p>
            <p>{t(`${BASE}.hiddenP1`)}</p>
            <p>{t(`${BASE}.hiddenP2`)}</p>
            <p>{t(`${BASE}.hiddenP3`)}</p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* What to do next */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.nextH`)}</p>
            <div className="space-y-4 pl-2">
              {nextList.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-primary font-black text-xl">{i + 1}.</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            {/* Final recommendation */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.finalH`)}</p>
            <p>{t(`${BASE}.finalP1`)}</p>
            <p>{t(`${BASE}.finalP2`)}</p>
            <p>{t(`${BASE}.finalP3`)}</p>
            <p>{t(`${BASE}.finalP4`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.finalP5`)}</p>

            {/* Sources */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.sourcesH`)}</p>
            <div className="space-y-2 text-base text-slate-500 font-normal">
              {sources.map((s, i) => (
                <p key={i} className="leading-relaxed">
                  <span className="font-bold text-slate-700">{s.n}</span> {s.label}
                </p>
              ))}
            </div>
          </motion.div>

          <AuthorBio authorName="Pierre Lahbabi" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
