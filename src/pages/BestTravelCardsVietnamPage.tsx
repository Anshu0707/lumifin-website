import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthorBio from '../components/AuthorBio';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

const BASE = 'blogPosts.bestTravelCardsVietnam';

type TableRow = { option: string; bestFor: string; watchOut: string; qr: string; verdict: string };
type CardSection = { name: string; p1: string; p2: string; verdictBold: string; verdictRest: string };
type ListItem = { bold: string; rest: string };
type Source = { n: string; label: string; url: string };

export default function BestTravelCardsVietnamPage() {
  const { t } = useTranslation();

  const tableHead = t(`${BASE}.tableHead`, { returnObjects: true }) as unknown as string[];
  const tableRows = t(`${BASE}.tableRows`, { returnObjects: true }) as unknown as TableRow[];
  const bringList = t(`${BASE}.bringList`, { returnObjects: true }) as unknown as string[];
  const cards = t(`${BASE}.cards`, { returnObjects: true }) as unknown as CardSection[];
  const first24List = t(`${BASE}.first24List`, { returnObjects: true }) as unknown as ListItem[];
  const sources = t(`${BASE}.sources`, { returnObjects: true }) as unknown as Source[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/best-travel-cards-europeans-vietnam-2026"
        ogImage="/assets/blog/best-travel-cards-vietnam-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'Best Travel Cards for Europeans in Vietnam (2026)', url: '/blog/best-travel-cards-europeans-vietnam-2026' },
          ]),
          articleSchema({
            title: 'Best Travel Cards for Europeans in Vietnam (2026 Comparison)',
            description: 'Compare Wise, Revolut, N26, Monzo, cash and Lumifin for paying in Vietnam as a European traveller in 2026.',
            url: '/blog/best-travel-cards-europeans-vietnam-2026',
            image: '/assets/blog/best-travel-cards-vietnam-cover.webp',
            author: 'Thiofanty',
            datePublished: '2026-06-15',
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
                src="/assets/blog/best-travel-cards-vietnam-cover.webp"
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
            {/* The short answer */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.shortAnswerH`)}</p>
            <p>{t(`${BASE}.shortAnswerP1`)}</p>
            <p>{t(`${BASE}.shortAnswerP2`)}</p>

            {/* Quick comparison */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.comparisonH`)}</p>

            {/* Desktop / tablet: real table */}
            <div className="hidden md:block overflow-x-auto -mx-2">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    {tableHead.map((h, i) => (
                      <th key={i} className="py-3 px-3 font-black text-slate-900 align-top">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((r, i) => (
                    <tr key={i} className="border-b border-slate-100 align-top">
                      <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">{r.option}</td>
                      <td className="py-3 px-3 text-slate-600">{r.bestFor}</td>
                      <td className="py-3 px-3 text-slate-600">{r.watchOut}</td>
                      <td className="py-3 px-3 text-slate-600">{r.qr}</td>
                      <td className="py-3 px-3 font-bold text-primary">{r.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: stacked cards */}
            <div className="md:hidden space-y-4">
              {tableRows.map((r, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-5 text-base leading-relaxed">
                  <p className="font-black text-slate-900 text-lg">{r.option}</p>
                  <p className="mt-2"><span className="font-bold text-slate-900">{tableHead[1]}: </span>{r.bestFor}</p>
                  <p className="mt-1"><span className="font-bold text-slate-900">{tableHead[2]}: </span>{r.watchOut}</p>
                  <p className="mt-1"><span className="font-bold text-slate-900">{tableHead[3]} </span>{r.qr}</p>
                  <p className="mt-1"><span className="font-bold text-slate-900">{tableHead[4]}: </span><span className="text-primary font-bold">{r.verdict}</span></p>
                </div>
              ))}
            </div>

            {/* How people actually pay */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.howPayH`)}</p>
            <p>{t(`${BASE}.howPayP1`)}</p>
            <p>{t(`${BASE}.howPayP2`)}</p>
            <p>{t(`${BASE}.howPayP3`)}</p>

            {/* What to bring */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.bringH`)}</p>
            <p>{t(`${BASE}.bringIntro`)}</p>
            <div className="space-y-4 pl-2">
              {bringList.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-primary font-black text-xl">·</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            {/* Per-card sections */}
            {cards.map((c, i) => (
              <React.Fragment key={i}>
                <p className="text-2xl font-black text-slate-900">{c.name}</p>
                <p>{c.p1}</p>
                <p>{c.p2}</p>
                <p><strong className="text-slate-900">{c.verdictBold}</strong>{c.verdictRest}</p>
              </React.Fragment>
            ))}

            {/* Traditional bank cards */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.tradH`)}</p>
            <p>{t(`${BASE}.tradP1`)}</p>
            <p>{t(`${BASE}.tradP2`)}</p>

            {/* Cash and ATMs */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.cashH`)}</p>
            <p>{t(`${BASE}.cashP1`)}</p>
            <p>{t(`${BASE}.cashP2`)}</p>

            {/* The missing piece */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.missingH`)}</p>
            <p>{t(`${BASE}.missingP1`)}</p>
            <p>{t(`${BASE}.missingP2`)}</p>

            {/* Where Lumifin fits */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.lumifinH`)}</p>
            <p>{t(`${BASE}.lumifinP1`)}</p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* First 24 hours */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.first24H`)}</p>
            <div className="space-y-4 pl-2">
              {first24List.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-primary font-black text-xl">·</span>
                  <p><strong className="text-slate-900">{item.bold}</strong>{item.rest}</p>
                </div>
              ))}
            </div>

            {/* Final verdict */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.verdictH`)}</p>
            <p>{t(`${BASE}.verdictP1`)}</p>
            <p>{t(`${BASE}.verdictP2`)}</p>
            <p>{t(`${BASE}.verdictP3`)}</p>

            {/* Sources */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.sourcesH`)}</p>
            <div className="space-y-2 text-base text-slate-500 font-normal">
              {sources.map((s, i) => (
                <p key={i} className="leading-relaxed">
                  <span className="font-bold text-slate-700">{s.n}</span> {s.label}:{' '}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    {s.url}
                  </a>
                </p>
              ))}
            </div>
          </motion.div>

          <AuthorBio authorName="Thiofanty" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
