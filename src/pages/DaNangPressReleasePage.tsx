import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { Calendar, Clock, Building2, ArrowLeft } from 'lucide-react';

const BASE = 'blogPosts.daNangPressRelease';

type Contact = { name: string; detail: string };

function Quote({ text, by }: { text: string; by: string }) {
  return (
    <blockquote className="my-6 pl-8 border-l-4 border-primary italic text-xl md:text-2xl font-bold text-slate-900 leading-snug">
      {text}
      <cite className="block mt-4 text-sm font-medium text-slate-500 not-italic">— {by}</cite>
    </blockquote>
  );
}

export default function DaNangPressReleasePage() {
  const { t } = useTranslation();
  const contacts = t(`${BASE}.contacts`, { returnObjects: true }) as unknown as Contact[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/why-we-chose-da-nang"
        ogImage="/assets/blog/da-nang-press-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'Why We Chose Da Nang', url: '/blog/why-we-chose-da-nang' },
          ]),
          articleSchema({
            title: 'Why We Chose Da Nang',
            description: 'Lumifin, a French fintech building a euro wallet for European travellers in Southeast Asia, has chosen Da Nang as its launch community.',
            url: '/blog/why-we-chose-da-nang',
            image: '/assets/blog/da-nang-press-cover.webp',
            author: 'Lumifin',
            datePublished: '2026-07-10',
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
                <Building2 className="w-4 h-4" /> {t(`${BASE}.source`)}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t(`${BASE}.dateLabel`)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {t(`${BASE}.readTime`)}
              </span>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden">
              <img
                src="/assets/blog/da-nang-press-cover.webp"
                alt={t(`${BASE}.imgAlt`)}
                loading="lazy"
                width={1200}
                height={1600}
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
            {/* Dateline + lead */}
            <p>
              <strong className="text-slate-900">{t(`${BASE}.dateline`)}</strong> {t(`${BASE}.leadP`)}
            </p>
            <p>{t(`${BASE}.leadP2`)}</p>

            {/* The problem */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.problemH`)}</p>
            <p>{t(`${BASE}.problemP1`)}</p>
            <p>{t(`${BASE}.problemP2`)}</p>

            {/* Why Da Nang */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.whyH`)}</p>
            <p>{t(`${BASE}.whyP1`)}</p>
            <p>{t(`${BASE}.whyP2`)}</p>
            <p>{t(`${BASE}.whyP3`)}</p>
            <Quote text={t(`${BASE}.quote1`)} by={t(`${BASE}.quote1By`)} />

            {/* Founding Ambassadors */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.ambassadorsH`)}</p>
            <p>{t(`${BASE}.ambassadorsP1`)}</p>
            <p>{t(`${BASE}.ambassadorsP2`)}</p>
            <Quote text={t(`${BASE}.quote2`)} by={t(`${BASE}.quote2By`)} />

            {/* What's next */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.nextH`)}</p>
            <p>{t(`${BASE}.nextP1`)}</p>
            <Quote text={t(`${BASE}.quote3`)} by={t(`${BASE}.quote3By`)} />

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* About */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.aboutH`)}</p>
            <p className="text-base text-slate-500 font-normal leading-relaxed">{t(`${BASE}.aboutP`)}</p>

            {/* Media contact */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.contactH`)}</p>
            <div className="space-y-1 text-base text-slate-500 font-normal">
              {contacts.map((c, i) => (
                <p key={i} className="leading-relaxed">
                  <span className="font-bold text-slate-700">{c.name}</span> · {c.detail}
                </p>
              ))}
              <p className="mt-2 italic">{t(`${BASE}.contactNote`)}</p>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
