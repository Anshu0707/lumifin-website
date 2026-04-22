import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

export default function QrisDecodedPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="QRIS Decoded — Indonesia's QR Payment System for European Travelers"
        description="56 million merchants, 6 billion transactions — QRIS is how Indonesia pays. Here's why European tourists are locked out, and what's changing."
        canonical="/blog/qris-decoded"
        ogImage="/assets/blog/qris-decoded-cover.png"
        ogType="article"
        structuredData={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }, { name: 'QRIS Decoded', url: '/blog/qris-decoded' }]),
          articleSchema({ title: 'QRIS Decoded: Indonesia\'s Standardized QR Payment System', description: 'What QRIS means for European travelers in Indonesia.', url: '/blog/qris-decoded', image: '/assets/blog/qris-decoded-cover.png', author: 'Pierre Lahbabi', datePublished: '2026-03-10' }),
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
              <ArrowLeft className="w-4 h-4" /> {t('blogPosts.qrisDecoded.backToBlog')}
            </Link>

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">
              {t('blogPosts.qrisDecoded.category')}
            </span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t('blogPosts.qrisDecoded.title')}
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed italic">
              {t('blogPosts.qrisDecoded.subtitle')}
            </p>

            <div className="mt-10 pb-10 border-b border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {t('blogPosts.qrisDecoded.author')}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {t('blogPosts.qrisDecoded.readTime')}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t('blogPosts.qrisDecoded.dateLabel')}
              </span>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden">
              <img
                src="/assets/blog/qris-decoded-cover.png"
                alt={t('blogPosts.qrisDecoded.imgAlt')}
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
            <p>
              {t('blogPosts.qrisDecoded.p1')}
            </p>
            <p>
              {t('blogPosts.qrisDecoded.p2')}
            </p>
            <p className="text-2xl font-black text-slate-900">
              {t('blogPosts.qrisDecoded.h1')}
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.qrisDecoded.h2')}</p>

            <p>
              {t('blogPosts.qrisDecoded.p3')}
            </p>
            <p>
              {t('blogPosts.qrisDecoded.p4')}
            </p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.qrisDecoded.h3')}</p>

            <p>{t('blogPosts.qrisDecoded.tableIntro')}</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse my-4">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 pr-6 text-sm font-black text-slate-900 uppercase tracking-widest">{t('blogPosts.qrisDecoded.tableColFigure')}</th>
                    <th className="text-left py-4 text-sm font-black text-slate-900 uppercase tracking-widest">{t('blogPosts.qrisDecoded.tableColDescription')}</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">{t('blogPosts.qrisDecoded.tableRow1Value')}</td>
                    <td className="py-4 text-slate-600">{t('blogPosts.qrisDecoded.tableRow1Desc')}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">{t('blogPosts.qrisDecoded.tableRow2Value')}</td>
                    <td className="py-4 text-slate-600">{t('blogPosts.qrisDecoded.tableRow2Desc')}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">{t('blogPosts.qrisDecoded.tableRow3Value')}</td>
                    <td className="py-4 text-slate-600">{t('blogPosts.qrisDecoded.tableRow3Desc')}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">{t('blogPosts.qrisDecoded.tableRow4Value')}</td>
                    <td className="py-4 text-slate-600">{t('blogPosts.qrisDecoded.tableRow4Desc')}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">{t('blogPosts.qrisDecoded.tableRow5Value')}</td>
                    <td className="py-4 text-slate-600">{t('blogPosts.qrisDecoded.tableRow5Desc')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              {t('blogPosts.qrisDecoded.p5')}
            </p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.qrisDecoded.h4')}</p>

            <p>
              {t('blogPosts.qrisDecoded.p6')}
            </p>
            <p>
              {t('blogPosts.qrisDecoded.p7')}
            </p>

            <div className="space-y-4 pl-2">
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">1.</span>
                <p>
                  <strong className="text-slate-900">{t('blogPosts.qrisDecoded.option1Bold')}</strong>{t('blogPosts.qrisDecoded.option1Rest')}
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">2.</span>
                <p>
                  <strong className="text-slate-900">{t('blogPosts.qrisDecoded.option2Bold')}</strong>{t('blogPosts.qrisDecoded.option2Rest')}
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">3.</span>
                <p>
                  <strong className="text-slate-900">{t('blogPosts.qrisDecoded.option3Bold')}</strong>{t('blogPosts.qrisDecoded.option3Rest')}
                </p>
              </div>
            </div>

            <p>
              {t('blogPosts.qrisDecoded.p8')}
            </p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.qrisDecoded.h5')}</p>

            <p>
              {t('blogPosts.qrisDecoded.p9')}
            </p>
            <p>
              {t('blogPosts.qrisDecoded.p10')}
            </p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              {t('blogPosts.qrisDecoded.blockquote1')}
            </blockquote>

            <p>
              {t('blogPosts.qrisDecoded.p11')}
            </p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.qrisDecoded.h6')}</p>

            <p>
              {t('blogPosts.qrisDecoded.p12')}
            </p>
            <p>
              {t('blogPosts.qrisDecoded.p13')}
            </p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              {t('blogPosts.qrisDecoded.blockquote2')}
            </blockquote>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <div className="mt-8 p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-4">
              <p className="text-xl font-black text-slate-900">
                {t('blogPosts.qrisDecoded.ctaTitle')}
              </p>
              <p className="text-lg text-slate-500 font-medium">
                {t('blogPosts.qrisDecoded.ctaBody')} <span className="text-primary font-black">lumifin.io</span>
              </p>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
