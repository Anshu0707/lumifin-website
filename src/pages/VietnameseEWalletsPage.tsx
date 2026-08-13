import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthorBio from '../components/AuthorBio';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

const BASE = 'blogPosts.vietnameseEWallets';

type CompareRow = { aspect: string; momo: string; zalopay: string; vnpay: string };
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

export default function VietnameseEWalletsPage() {
  const { t } = useTranslation();

  const compareHead = t(`${BASE}.compareHead`, { returnObjects: true }) as unknown as string[];
  const compareRows = (t(`${BASE}.compareRows`, { returnObjects: true }) as unknown as CompareRow[])
    .map(r => [r.aspect, r.momo, r.zalopay, r.vnpay]);
  const sources = t(`${BASE}.sources`, { returnObjects: true }) as unknown as Source[];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/blog/vietnamese-e-wallets-decoded"
        ogImage="/assets/blog/vietnamese-e-wallets-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: 'MoMo, ZaloPay, VNPay: The Vietnamese E-Wallet Landscape Decoded', url: '/blog/vietnamese-e-wallets-decoded' },
          ]),
          articleSchema({
            title: 'MoMo, ZaloPay, VNPay: The Vietnamese E-Wallet Landscape Decoded',
            description: "MoMo, ZaloPay and VNPay run most of Vietnam's QR payments — but they were built around a Vietnamese ID. Here is what each one is, and what actually works for a European visitor.",
            url: '/blog/vietnamese-e-wallets-decoded',
            image: '/assets/blog/vietnamese-e-wallets-cover.webp',
            author: 'Gaurav Bansal',
            datePublished: '2026-08-13',
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
                src="/assets/blog/vietnamese-e-wallets-cover.webp"
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

            {/* Why three names */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.whyThreeH`)}</p>
            <p>{t(`${BASE}.whyThreeP1`)}</p>
            <p>{t(`${BASE}.whyThreeP2`)}</p>

            {/* MoMo */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.momoH`)}</p>
            <p>{t(`${BASE}.momoP1`)}</p>
            <p>{t(`${BASE}.momoP2`)}</p>
            <p>{t(`${BASE}.momoP3`)}</p>

            {/* ZaloPay */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.zaloH`)}</p>
            <p>{t(`${BASE}.zaloP1`)}</p>
            <p>{t(`${BASE}.zaloP2`)}</p>
            <p>{t(`${BASE}.zaloP3`)}</p>

            {/* VNPay */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.vnpayH`)}</p>
            <p>{t(`${BASE}.vnpayP1`)}</p>
            <p>{t(`${BASE}.vnpayP2`)}</p>

            {/* VietQR */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.vietqrH`)}</p>
            <p>{t(`${BASE}.vietqrP1`)}</p>
            <p>{t(`${BASE}.vietqrP2`)}</p>
            <p>{t(`${BASE}.vietqrP3`)}</p>

            {/* Comparison table */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.compareH`)}</p>
            <ResponsiveTable head={compareHead} rows={compareRows} />
            <p className="text-base text-slate-500 font-normal italic">{t(`${BASE}.compareNote`)}</p>

            {/* The part nobody tells you */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.frictionH`)}</p>
            <p>{t(`${BASE}.frictionP1`)}</p>
            <p>{t(`${BASE}.frictionP2`)}</p>
            <p className="font-bold text-slate-900">{t(`${BASE}.frictionP3`)}</p>

            {/* What works in two weeks */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.worksH`)}</p>
            <p>{t(`${BASE}.worksP1`)}</p>
            <p>{t(`${BASE}.worksP2`)}</p>
            <p>{t(`${BASE}.worksP3`)}</p>
            <p>{t(`${BASE}.worksP4`)}</p>

            {/* Lumifin callout */}
            <div className="rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10 space-y-4">
              <p className="text-primary font-black text-xs tracking-[0.3em] uppercase">
                {t(`${BASE}.calloutEyebrow`)}
              </p>
              <p className="text-slate-700">{t(`${BASE}.calloutBody`)}</p>
              <Link
                to="/beta"
                className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-base"
              >
                {t(`${BASE}.calloutCta`)}
              </Link>
            </div>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            {/* What to do next */}
            <p className="text-2xl font-black text-slate-900">{t(`${BASE}.nextH`)}</p>
            <p>{t(`${BASE}.nextP1`)}</p>

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
          </motion.div>

          <AuthorBio authorName="Gaurav Bansal" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
