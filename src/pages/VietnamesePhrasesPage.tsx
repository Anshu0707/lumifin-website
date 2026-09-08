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

const BASE = 'blogPosts.vietnamesePhrases';

type Pronoun = { term: string; gloss: string };
type Phrase = { n: string; term: string; gloss: string; note: string };

/** A numbered phrase card: Vietnamese term, its gloss, and the why. */
function PhraseCard({ n, term, gloss, note }: Phrase) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 md:p-7">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {n && <span className="text-primary font-black text-xl shrink-0">{n}</span>}
        <span lang="vi" className="text-2xl font-black text-slate-900">{term}</span>
        <span className="text-slate-400 font-bold">—</span>
        <span className="text-lg font-bold text-slate-600">{gloss}</span>
      </div>
      {note && <p className="mt-3 text-base md:text-lg text-slate-600 leading-relaxed">{note}</p>}
    </div>
  );
}

export default function VietnamesePhrasesPage() {
  const { t } = useTranslation();
  const location = useLocation();

  const pronouns = t(`${BASE}.pronouns`, { returnObjects: true }) as unknown as Pronoun[];
  const firstHour = t(`${BASE}.firstHourList`, { returnObjects: true }) as unknown as Phrase[];
  const money = t(`${BASE}.moneyList`, { returnObjects: true }) as unknown as Phrase[];
  const food = t(`${BASE}.foodList`, { returnObjects: true }) as unknown as Phrase[];
  const around = t(`${BASE}.aroundList`, { returnObjects: true }) as unknown as Phrase[];
  const beforeList = t(`${BASE}.beforeList`, { returnObjects: true }) as unknown as string[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/vietnamese-phrases-before-you-land"
        ogImage="/assets/blog/vietnamese-phrases-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: '20 Vietnamese Phrases Worth Learning Before You Land', url: '/blog/vietnamese-phrases-before-you-land' },
          ]),
          articleSchema({
            title: '20 Vietnamese Phrases Worth Learning Before You Land',
            description: 'Twenty Vietnamese phrases for European travellers — pronouns, money, ordering and getting around, with real 2026 prices in đồng and euros.',
            url: '/blog/vietnamese-phrases-before-you-land',
            image: '/assets/blog/vietnamese-phrases-cover.webp',
            author: 'Tanvi Nag',
            datePublished: '2026-09-08',
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
                src="/assets/blog/vietnamese-phrases-cover.webp"
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
            <p>{t(`${BASE}.introP2`)}</p>
            <p>{t(`${BASE}.introP3`)}</p>

            {/* Pronouns */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.pronounH`)}</p>
            <p>{t(`${BASE}.pronounP1`)}</p>
            <p>{t(`${BASE}.pronounP2`)}</p>
            <div className="space-y-3">
              {pronouns.map((p, i) => (
                <div key={i} className="flex flex-wrap items-baseline gap-x-3 rounded-2xl bg-slate-50 border border-slate-100 px-6 py-4">
                  <span lang="vi" className="text-xl font-black text-slate-900">{p.term}</span>
                  <span className="text-slate-400 font-bold">—</span>
                  <span className="text-base text-slate-600 font-medium">{p.gloss}</span>
                </div>
              ))}
            </div>
            <p>{t(`${BASE}.pronounP3`)}</p>

            {/* First hour */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.firstHourH`)}</p>
            <div className="space-y-4">
              {firstHour.map((p, i) => <div key={i}><PhraseCard n={p.n} term={p.term} gloss={p.gloss} note={p.note} /></div>)}
            </div>

            {/* Money */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.moneyH`)}</p>
            <p>{t(`${BASE}.moneyP1`)}</p>
            <div className="space-y-4">
              {money.map((p, i) => <div key={i}><PhraseCard n={p.n} term={p.term} gloss={p.gloss} note={p.note} /></div>)}
            </div>
            <p>{t(`${BASE}.moneyNote`)}</p>

            {/* Number habits */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.numbersH`)}</p>
            <p><span className="font-black text-slate-900">{t(`${BASE}.numbersLead1`)}</span> {t(`${BASE}.numbersP1`)}</p>
            <p><span className="font-black text-slate-900">{t(`${BASE}.numbersLead2`)}</span> {t(`${BASE}.numbersP2`)}</p>
            <p>{t(`${BASE}.numbersP3`)}</p>

            {/* Food */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.foodH`)}</p>
            <div className="space-y-4">
              {food.map((p, i) => <div key={i}><PhraseCard n={p.n} term={p.term} gloss={p.gloss} note={p.note} /></div>)}
            </div>

            {/* Getting around */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.aroundH`)}</p>
            <div className="space-y-4">
              {around.map((p, i) => <div key={i}><PhraseCard n={p.n} term={p.term} gloss={p.gloss} note={p.note} /></div>)}
            </div>

            {/* Tones */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.tonesH`)}</p>
            <p>{t(`${BASE}.tonesP1`)}</p>
            <p>{t(`${BASE}.tonesP2`)}</p>
            <p>{t(`${BASE}.tonesP3`)}</p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* Before you fly */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.beforeH`)}</p>
            <p>{t(`${BASE}.beforeP1`)}</p>
            <div className="space-y-4 pl-2">
              {beforeList.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-primary font-black text-xl">{i + 1}.</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p className="font-bold text-slate-900">{t(`${BASE}.beforeClose`)}</p>

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
