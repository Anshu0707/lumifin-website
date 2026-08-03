import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthorBio from '../components/AuthorBio';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

const BASE = 'blogPosts.crossBorderQrAccess';

type UsageRow = { measure: string; result: string };
type OptionRow = { option: string; works: string; friction: string };
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

export default function CrossBorderQrAccessPage() {
  const { t } = useTranslation();

  const usageHead = t(`${BASE}.usageHead`, { returnObjects: true }) as unknown as string[];
  const usageRows = (t(`${BASE}.usageRows`, { returnObjects: true }) as unknown as UsageRow[]).map(r => [r.measure, r.result]);
  const optionsHead = t(`${BASE}.optionsHead`, { returnObjects: true }) as unknown as string[];
  const optionsRows = (t(`${BASE}.optionsRows`, { returnObjects: true }) as unknown as OptionRow[]).map(r => [r.option, r.works, r.friction]);
  const howList = t(`${BASE}.howList`, { returnObjects: true }) as unknown as string[];
  const stablecoinNeeds = t(`${BASE}.stablecoinNeeds`, { returnObjects: true }) as unknown as string[];
  const guardrailList = t(`${BASE}.guardrailList`, { returnObjects: true }) as unknown as string[];
  const nextPhaseList = t(`${BASE}.nextPhaseList`, { returnObjects: true }) as unknown as string[];
  const beforeTripList = t(`${BASE}.beforeTripList`, { returnObjects: true }) as unknown as string[];
  const sources = t(`${BASE}.sources`, { returnObjects: true }) as unknown as Source[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/cross-border-qr-payments-access"
        ogImage="/assets/blog/cross-border-qr-access-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'Cross-Border QR Payments Are Growing. The Next Challenge Is Who Can Access Them', url: '/blog/cross-border-qr-payments-access' },
          ]),
          articleSchema({
            title: 'Cross-Border QR Payments Are Growing. The Next Challenge Is Who Can Access Them',
            description: "Southeast Asia's QR networks are becoming more connected. But for European travellers, the ability to pay still often depends on having the right local or regional bank account.",
            url: '/blog/cross-border-qr-payments-access',
            image: '/assets/blog/cross-border-qr-access-cover.webp',
            author: 'Gaurav Bansal',
            datePublished: '2026-08-03',
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

            <figure className="mt-10">
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="/assets/blog/cross-border-qr-access-cover.webp"
                  alt={t(`${BASE}.imgAlt`)}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover"
                />
              </div>
              <figcaption className="mt-4 text-sm text-slate-400 font-medium leading-relaxed">
                {t(`${BASE}.imgCaption`)}
              </figcaption>
            </figure>
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
            <p>{t(`${BASE}.introP5`)}</p>

            {/* Real behaviour */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.behaviourH`)}</p>
            <p>{t(`${BASE}.behaviourP1`)}</p>
            <p>{t(`${BASE}.behaviourP2`)}</p>
            <ResponsiveTable head={usageHead} rows={usageRows} />
            <p>{t(`${BASE}.behaviourP3`)}</p>
            <p>{t(`${BASE}.behaviourP4`)}</p>
            <p>{t(`${BASE}.behaviourP5`)}</p>

            {/* How links work */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.howH`)}</p>
            <p>{t(`${BASE}.howP1`)}</p>
            <p>{t(`${BASE}.howP2`)}</p>
            <NumberedList items={howList} />
            <p>{t(`${BASE}.howP3`)}</p>
            <p>{t(`${BASE}.howP4`)}</p>
            <p>{t(`${BASE}.howP5`)}</p>

            {/* The gap */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.gapH`)}</p>
            <p>{t(`${BASE}.gapP1`)}</p>
            <p>{t(`${BASE}.gapP2`)}</p>
            <p>{t(`${BASE}.gapP3`)}</p>
            <p>{t(`${BASE}.gapP4`)}</p>
            <ResponsiveTable head={optionsHead} rows={optionsRows} />
            <p>{t(`${BASE}.gapP5`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.gapP6`)}</p>

            {/* Local networks */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.localH`)}</p>
            <p>{t(`${BASE}.localP1`)}</p>
            <p>{t(`${BASE}.localP2`)}</p>
            <p>{t(`${BASE}.localP3`)}</p>
            <p className="text-xl font-black text-slate-900 italic">{t(`${BASE}.localQuestion`)}</p>
            <p>{t(`${BASE}.localP4`)}</p>

            {/* Stablecoins */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.stablecoinH`)}</p>
            <p>{t(`${BASE}.stablecoinP1`)}</p>
            <p>{t(`${BASE}.stablecoinP2`)}</p>
            <p>{t(`${BASE}.stablecoinP3`)}</p>
            <p>{t(`${BASE}.stablecoinP4`)}</p>
            <p>{t(`${BASE}.stablecoinP5`)}</p>
            <p>{t(`${BASE}.stablecoinP6`)}</p>
            <Bullets items={stablecoinNeeds} />
            <p className="font-bold text-slate-900">{t(`${BASE}.stablecoinP7`)}</p>

            {/* Guardrails */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.guardrailH`)}</p>
            <p>{t(`${BASE}.guardrailP1`)}</p>
            <p>{t(`${BASE}.guardrailP2`)}</p>
            <p>{t(`${BASE}.guardrailP3`)}</p>
            <p>{t(`${BASE}.guardrailP4`)}</p>
            <Bullets items={guardrailList} />
            <p>{t(`${BASE}.guardrailP5`)}</p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* Next phase */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.nextPhaseH`)}</p>
            <p>{t(`${BASE}.nextPhaseP1`)}</p>
            <p>{t(`${BASE}.nextPhaseP2`)}</p>
            <Bullets items={nextPhaseList} />
            <p>{t(`${BASE}.nextPhaseP3`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.nextPhaseP4`)}</p>

            {/* Before your trip */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.beforeTripH`)}</p>
            <p>{t(`${BASE}.beforeTripP1`)}</p>
            <NumberedList items={beforeTripList} />
            <p>{t(`${BASE}.beforeTripP2`)}</p>

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

          <AuthorBio authorName="Gaurav Bansal" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
