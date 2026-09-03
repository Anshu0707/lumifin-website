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

const BASE = 'blogPosts.cardDeclinedVietnam';

type DiagnosisRow = { seen: string; cause: string; action: string };
type Source = { n: string; label: string; url: string };

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
                  <td key={j} className={`py-3 px-3 ${j === 0 ? 'font-bold text-slate-900' : 'text-slate-600'}`}>{c}</td>
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

export default function CardDeclinedVietnamPage() {
  const { t } = useTranslation();
  const location = useLocation();

  const diagnosisHead = t(`${BASE}.diagnosisHead`, { returnObjects: true }) as unknown as string[];
  const diagnosisRows = (t(`${BASE}.diagnosisRows`, { returnObjects: true }) as unknown as DiagnosisRow[])
    .map(r => [r.seen, r.cause, r.action]);
  const nextList = t(`${BASE}.nextList`, { returnObjects: true }) as unknown as string[];
  const sources = t(`${BASE}.sources`, { returnObjects: true }) as unknown as Source[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/why-cards-get-declined-vietnam"
        ogImage="/assets/blog/card-declined-vietnam-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'Why Your Visa or Mastercard Gets Declined at Vietnamese Street Vendors', url: '/blog/why-cards-get-declined-vietnam' },
          ]),
          articleSchema({
            title: 'Why Your Visa or Mastercard Gets Declined at Vietnamese Street Vendors',
            description: 'Five different failures hide behind one word on the screen. Here is what each one actually means, and which ones you can fix before your flight.',
            url: '/blog/why-cards-get-declined-vietnam',
            image: '/assets/blog/card-declined-vietnam-cover.webp',
            author: 'Gaurav Bansal',
            datePublished: '2026-08-31',
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
                src="/assets/blog/card-declined-vietnam-cover.webp"
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
            <p className="text-base text-slate-500 font-normal italic">{t(`${BASE}.ratesNote`)}</p>

            {/* Opening scene */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.stallH`)}</p>
            <p>{t(`${BASE}.stallP1`)}</p>
            <p>{t(`${BASE}.stallP2`)}</p>
            <p>{t(`${BASE}.stallP3`)}</p>
            <p>{t(`${BASE}.stallP4`)}</p>

            {/* Failure one */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.oneH`)}</p>
            <p>{t(`${BASE}.oneP1`)}</p>
            <p>{t(`${BASE}.oneP2`)}</p>
            <p>{t(`${BASE}.oneP3`)}</p>
            <p>{t(`${BASE}.oneP4`)}</p>
            <p>{t(`${BASE}.oneP5`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.oneP6`)}</p>

            {/* Failure two */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.twoH`)}</p>
            <p>{t(`${BASE}.twoP1`)}</p>
            <p>{t(`${BASE}.twoP2`)}</p>
            <p>{t(`${BASE}.twoP3`)}</p>
            <p>{t(`${BASE}.twoP4`)}</p>
            <p>{t(`${BASE}.twoP5`)}</p>

            {/* Failure three */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.threeH`)}</p>
            <p>{t(`${BASE}.threeP1`)}</p>
            <p>{t(`${BASE}.threeP2`)}</p>
            <p>{t(`${BASE}.threeP3`)}</p>

            {/* Failure four */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.fourH`)}</p>
            <p>{t(`${BASE}.fourP1`)}</p>
            <p>{t(`${BASE}.fourP2`)}</p>
            <p>{t(`${BASE}.fourP3`)}</p>

            {/* Failure five */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.fiveH`)}</p>
            <p>{t(`${BASE}.fiveP1`)}</p>
            <p>{t(`${BASE}.fiveP2`)}</p>
            <p>{t(`${BASE}.fiveP3`)}</p>
            <p>{t(`${BASE}.fiveP4`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.fiveP5`)}</p>

            {/* Diagnosis table */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.diagnosisH`)}</p>
            <ResponsiveTable head={diagnosisHead} rows={diagnosisRows} />

            {/* The gap */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.gapH`)}</p>
            <p>{t(`${BASE}.gapP1`)}</p>
            <p>{t(`${BASE}.gapP2`)}</p>
            <p>{t(`${BASE}.gapP3`)}</p>
            <p>{t(`${BASE}.gapP4`)}</p>

            {/* CTA */}
            <div className="rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10 space-y-4">
              <p className="text-slate-700 font-bold">{t(`${BASE}.ctaBody`)}</p>
              <Link
                to={localizedPath('/#waitlist', location.pathname)}
                className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-base"
              >
                {t(`${BASE}.ctaButton`)}
              </Link>
            </div>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* What to do next */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.nextH`)}</p>
            <p>{t(`${BASE}.nextP1`)}</p>
            <div className="space-y-4 pl-2">
              {nextList.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-primary font-black text-xl">{i + 1}.</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
            <p className="font-bold text-slate-900">{t(`${BASE}.nextClose`)}</p>

            {/* Sources */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.sourcesH`)}</p>
            <div className="space-y-2 text-base text-slate-500 font-normal">
              {sources.map((s, i) => (
                <p key={i} className="leading-relaxed">
                  <span className="font-bold text-slate-700">{s.n}</span>{' '}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary underline decoration-slate-300 underline-offset-2 transition-colors"
                  >
                    {s.label}
                  </a>
                </p>
              ))}
            </div>
          </motion.div>

          <AuthorBio authorName="Gaurav Bansal" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
