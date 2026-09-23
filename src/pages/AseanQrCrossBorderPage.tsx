import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthorBio from '../components/AuthorBio';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { localizedPath } from '../utils/localizedPath';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

const BASE = 'blogPosts.aseanQrCrossBorder';

type PartnerRow = { partner: string; live: string };
type Linkage = { name: string; body: string };
type NextItem = { name: string; body: string };
type Source = { n: string; label: string; url: string };

function PartnerTable({ head, rows }: { head: string[]; rows: string[][] }) {
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
                  <td key={j} className={`py-3 px-3 ${j === 0 ? 'font-bold text-slate-900 whitespace-nowrap' : 'text-slate-600 whitespace-nowrap'}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3 text-base">
            <span className="font-bold text-slate-900">{r[0]}</span>
            <span className="text-slate-600 shrink-0">{r[1]}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function AseanQrCrossBorderPage() {
  const { t } = useTranslation();
  const location = useLocation();

  const partnerHead = t(`${BASE}.partnerHead`, { returnObjects: true }) as unknown as string[];
  const partnerRows = (t(`${BASE}.partnerRows`, { returnObjects: true }) as unknown as PartnerRow[])
    .map(r => [r.partner, r.live]);
  const linkages = t(`${BASE}.linkages`, { returnObjects: true }) as unknown as Linkage[];
  const nextItems = t(`${BASE}.nextItems`, { returnObjects: true }) as unknown as NextItem[];
  const sources = t(`${BASE}.sources`, { returnObjects: true }) as unknown as Source[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/asean-qr-cross-border-payment"
        ogImage="/assets/blog/asean-qr-cross-border-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'ASEAN QR Cross-Border Payments: What the Linkages Mean for Travellers', url: '/blog/asean-qr-cross-border-payment' },
          ]),
          articleSchema({
            title: 'ASEAN QR Cross-Border Payments: What the Linkages Mean for Travellers',
            description: "ASEAN QR cross-border payment links now cover nine countries. What they do, what they don't, and where a European traveller actually stands in 2026.",
            url: '/blog/asean-qr-cross-border-payment',
            image: '/assets/blog/asean-qr-cross-border-cover.webp',
            author: 'Tanvi Nag',
            datePublished: '2026-09-23',
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
                src="/assets/blog/asean-qr-cross-border-cover.webp"
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

            {/* One sticker, four countries */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.stickerH`)}</p>
            <p>{t(`${BASE}.stickerP1`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.stickerP2`)}</p>
            <p>{t(`${BASE}.stickerP3`)}</p>
            <p>{t(`${BASE}.stickerP4`)}</p>
            <p>{t(`${BASE}.stickerP5`)}</p>

            {/* What it refers to */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.whatH`)}</p>
            <p>{t(`${BASE}.whatP1`)}</p>
            <p>{t(`${BASE}.whatP2`)}</p>
            <p>{t(`${BASE}.whatP3`)}</p>
            <p>{t(`${BASE}.whatP4`)}</p>
            <p>{t(`${BASE}.whatP5`)}</p>

            {/* Two things, one name */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.twoThingsH`)}</p>
            <p>{t(`${BASE}.twoThingsP1`)}</p>
            <p>{t(`${BASE}.twoThingsP2`)}</p>
            <div className="space-y-4">
              {linkages.map((l, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 p-6">
                  <p className="font-black text-slate-900 text-xl">{l.name}</p>
                  <p className="mt-2 text-base md:text-lg text-slate-600 leading-relaxed">{l.body}</p>
                </div>
              ))}
            </div>
            <p>{t(`${BASE}.twoThingsP3`)}</p>

            {/* Who is connected */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.connectedH`)}</p>
            <p>{t(`${BASE}.connectedP1`)}</p>
            <p>{t(`${BASE}.connectedP2`)}</p>
            <PartnerTable head={partnerHead} rows={partnerRows} />
            <p>{t(`${BASE}.connectedP3`)}</p>
            <p>{t(`${BASE}.connectedP4`)}</p>

            {/* Why central banks built it */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.whyH`)}</p>
            <p>{t(`${BASE}.whyP1`)}</p>
            <p>{t(`${BASE}.whyP2`)}</p>
            <p>{t(`${BASE}.whyP3`)}</p>
            <p>{t(`${BASE}.whyP4`)}</p>
            <p>{t(`${BASE}.whyP5`)}</p>

            {/* The wall */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.wallH`)}</p>
            <p>{t(`${BASE}.wallP1`)}</p>
            <p>{t(`${BASE}.wallP2`)}</p>
            <p>{t(`${BASE}.wallP3`)}</p>
            <p>{t(`${BASE}.wallP4`)}</p>

            {/* What changes for you */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.changesH`)}</p>
            <p>{t(`${BASE}.changesP1`)}</p>
            <p>{t(`${BASE}.changesP2`)}</p>
            <p>{t(`${BASE}.changesP3`)}</p>
            <p>{t(`${BASE}.changesP4`)}</p>

            {/* Nexus */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.nexusH`)}</p>
            <p>{t(`${BASE}.nexusP1`)}</p>
            <p>{t(`${BASE}.nexusP2`)}</p>
            <p>{t(`${BASE}.nexusP3`)}</p>
            <p>{t(`${BASE}.nexusP4`)}</p>
            <p>{t(`${BASE}.nexusP5`)}</p>

            {/* CTA */}
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

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* What to do next */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.nextH`)}</p>
            <p>{t(`${BASE}.nextP1`)}</p>
            <div className="space-y-4 pl-2">
              {nextItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-primary font-black text-xl">{i + 1}.</span>
                  <p><span className="font-black text-slate-900">{item.name}</span> {item.body}</p>
                </div>
              ))}
            </div>

            {/* Related reading — internal links */}
            <p>
              <Trans
                i18nKey={`${BASE}.related`}
                components={{
                  1: <Link to={localizedPath('/blog/vietqr-decoded', location.pathname)} className="text-primary font-bold hover:underline" />,
                  2: <Link to={localizedPath('/blog/qris-decoded', location.pathname)} className="text-primary font-bold hover:underline" />,
                }}
              />
            </p>

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
              <p className="leading-relaxed pt-2">{t(`${BASE}.sourcesNote`)}</p>
            </div>

            <p className="text-base text-slate-500 font-normal italic">{t(`${BASE}.reviewNote`)}</p>
          </motion.div>

          <AuthorBio authorName="Tanvi Nag" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
