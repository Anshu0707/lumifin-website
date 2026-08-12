import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthorBio from '../components/AuthorBio';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

const BASE = 'blogPosts.gettingAroundVietnam';

type OptionRow = { option: string; bestFor: string; watchFor: string; payment: string; cost: string };
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

function NumberedList({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 pl-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <span className="text-primary font-black text-xl">{i + 1}.</span>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function GettingAroundVietnamPage() {
  const { t } = useTranslation();

  const optionsHead = t(`${BASE}.optionsHead`, { returnObjects: true }) as unknown as string[];
  const optionsRows = (t(`${BASE}.optionsRows`, { returnObjects: true }) as unknown as OptionRow[])
    .map(r => [r.option, r.bestFor, r.watchFor, r.payment, r.cost]);
  const rentalChecks = t(`${BASE}.rentalChecks`, { returnObjects: true }) as unknown as string[];
  const setupList = t(`${BASE}.setupList`, { returnObjects: true }) as unknown as string[];
  const appsList = t(`${BASE}.appsList`, { returnObjects: true }) as unknown as string[];
  const checklist = t(`${BASE}.checklist`, { returnObjects: true }) as unknown as string[];
  const sources = t(`${BASE}.sources`, { returnObjects: true }) as unknown as Source[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/scooter-grab-metro-getting-around-vietnam"
        ogImage="/assets/blog/getting-around-vietnam-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'Scooter, Grab or Metro? Getting Around Hanoi, Ho Chi Minh City and Da Nang', url: '/blog/scooter-grab-metro-getting-around-vietnam' },
          ]),
          articleSchema({
            title: 'Scooter, Grab or Metro? Getting Around Hanoi, Ho Chi Minh City and Da Nang',
            description: 'Compare scooters, Grab, taxis, buses and metro travel in Hanoi, Ho Chi Minh City and Da Nang, with practical safety, licence and payment advice.',
            url: '/blog/scooter-grab-metro-getting-around-vietnam',
            image: '/assets/blog/getting-around-vietnam-cover.webp',
            author: 'Pierre Lahbabi',
            datePublished: '2026-08-12',
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
                src="/assets/blog/getting-around-vietnam-cover.webp"
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
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.kerbH`)}</p>
            <p>{t(`${BASE}.kerbP1`)}</p>
            <p>{t(`${BASE}.kerbP2`)}</p>

            {/* Short answer callout */}
            <div className="rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10 space-y-4">
              <p className="text-primary font-black text-xs tracking-[0.3em] uppercase">
                {t(`${BASE}.shortAnswerH`)}
              </p>
              <p className="text-slate-700">{t(`${BASE}.shortAnswerP`)}</p>
            </div>

            {/* Options table */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.optionsH`)}</p>
            <ResponsiveTable head={optionsHead} rows={optionsRows} />
            <p className="text-base text-slate-500 font-normal italic">{t(`${BASE}.optionsNote`)}</p>

            {/* Hanoi */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.hanoiH`)}</p>
            <p>{t(`${BASE}.hanoiP1`)}</p>
            <p>{t(`${BASE}.hanoiP2`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.hanoiVerdict`)}</p>

            {/* Ho Chi Minh City */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.hcmcH`)}</p>
            <p>{t(`${BASE}.hcmcP1`)}</p>
            <p>{t(`${BASE}.hcmcP2`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.hcmcVerdict`)}</p>

            {/* Da Nang */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.daNangH`)}</p>
            <p>{t(`${BASE}.daNangP1`)}</p>
            <p>{t(`${BASE}.daNangP2`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.daNangVerdict`)}</p>

            {/* Before renting */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.rentalH`)}</p>
            <p>{t(`${BASE}.rentalP1`)}</p>
            <Bullets items={rentalChecks} />
            <p className="text-base text-slate-500 font-normal italic">{t(`${BASE}.rentalDisclaimer`)}</p>

            {/* Where travellers get tripped up */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.trippedH`)}</p>
            <p className="text-xl font-black text-slate-900">{t(`${BASE}.trippedCardH`)}</p>
            <p>{t(`${BASE}.trippedCardP`)}</p>
            <p className="text-xl font-black text-slate-900">{t(`${BASE}.trippedCashH`)}</p>
            <p>{t(`${BASE}.trippedCashP`)}</p>
            <p className="text-xl font-black text-slate-900">{t(`${BASE}.trippedCheapH`)}</p>
            <p>{t(`${BASE}.trippedCheapP`)}</p>

            {/* Smartest setup */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.setupH`)}</p>
            <Bullets items={setupList} />

            {/* Apps */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.appsH`)}</p>
            <Bullets items={appsList} />

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* First 24 hours */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.checklistH`)}</p>
            <NumberedList items={checklist} />

            {/* Bottom line */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.bottomH`)}</p>
            <p>{t(`${BASE}.bottomP1`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.bottomP2`)}</p>

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
