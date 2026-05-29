import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthorBio from '../components/AuthorBio';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

export default function VietqrDecodedPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('blogPosts.vietqrDecoded.seo.title')}
        description={t('blogPosts.vietqrDecoded.seo.description')}
        canonical="/blog/vietqr-decoded"
        ogImage="/assets/blog/vietqr-decoded-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }, { name: 'VietQR Decoded', url: '/blog/vietqr-decoded' }]),
          articleSchema({ title: 'Vietnam Skipped the Card Era. Your Mastercard Didn’t Get the Memo.', description: 'VietQR explained — and why foreigners can’t use the apps that run daily life in Vietnam.', url: '/blog/vietqr-decoded', image: '/assets/blog/vietqr-decoded-cover.webp', author: 'Gaurav Bansal', datePublished: '2026-05-27' }),
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
              <ArrowLeft className="w-4 h-4" /> {t('blogPosts.vietqrDecoded.backToBlog')}
            </Link>

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">
              {t('blogPosts.vietqrDecoded.category')}
            </span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t('blogPosts.vietqrDecoded.title')}
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed italic">
              {t('blogPosts.vietqrDecoded.subtitle')}
            </p>

            <div className="mt-10 pb-10 border-b border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {t('blogPosts.vietqrDecoded.author')}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {t('blogPosts.vietqrDecoded.readTime')}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t('blogPosts.vietqrDecoded.dateLabel')}
              </span>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden">
              <img
                src="/assets/blog/vietqr-decoded-cover.webp"
                alt={t('blogPosts.vietqrDecoded.imgAlt')}
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
            <p className="text-2xl font-black text-slate-900">{t('blogPosts.vietqrDecoded.h1')}</p>
            <p>{t('blogPosts.vietqrDecoded.p1')}</p>
            <p>{t('blogPosts.vietqrDecoded.p2')}</p>
            <p>{t('blogPosts.vietqrDecoded.p3')}</p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.vietqrDecoded.h2')}</p>
            <p>{t('blogPosts.vietqrDecoded.p4')}</p>
            <p>{t('blogPosts.vietqrDecoded.p5')}</p>
            <p>{t('blogPosts.vietqrDecoded.p6')}</p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.vietqrDecoded.h3')}</p>
            <p>{t('blogPosts.vietqrDecoded.p7')}</p>
            <p>
              <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.sys1Name')}</strong>{t('blogPosts.vietqrDecoded.sys1Rest')}
            </p>
            <p>
              <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.sys2Name')}</strong>{t('blogPosts.vietqrDecoded.sys2Rest')}
            </p>
            <p>
              <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.sys3Name')}</strong>{t('blogPosts.vietqrDecoded.sys3Rest')}
            </p>
            <p>
              <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.sys4Name')}</strong>{t('blogPosts.vietqrDecoded.sys4Rest')}
            </p>
            <p>{t('blogPosts.vietqrDecoded.p8')}</p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.vietqrDecoded.h4')}</p>
            <p>{t('blogPosts.vietqrDecoded.p9')}</p>
            <p>{t('blogPosts.vietqrDecoded.p10')}</p>
            <p>{t('blogPosts.vietqrDecoded.p11')}</p>
            <p>{t('blogPosts.vietqrDecoded.p12')}</p>
            <p>{t('blogPosts.vietqrDecoded.p13')}</p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.vietqrDecoded.h5')}</p>
            <p>{t('blogPosts.vietqrDecoded.p14')}</p>
            <p>{t('blogPosts.vietqrDecoded.p15')}</p>

            <div className="space-y-4 pl-2">
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">1.</span>
                <p>
                  <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.req1Bold')}</strong>{t('blogPosts.vietqrDecoded.req1Rest')}
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">2.</span>
                <p>
                  <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.req2Bold')}</strong>{t('blogPosts.vietqrDecoded.req2Rest')}
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">3.</span>
                <p>
                  <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.req3Bold')}</strong>{t('blogPosts.vietqrDecoded.req3Rest')}
                </p>
              </div>
            </div>

            <p>{t('blogPosts.vietqrDecoded.p16')}</p>
            <p>{t('blogPosts.vietqrDecoded.p17')}</p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.vietqrDecoded.h6')}</p>
            <p>{t('blogPosts.vietqrDecoded.p18')}</p>
            <p>
              <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.workWiseBold')}</strong>{t('blogPosts.vietqrDecoded.workWiseRest')}
            </p>
            <p>
              <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.workMomoBold')}</strong>{t('blogPosts.vietqrDecoded.workMomoRest')}
            </p>
            <p>
              <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.workEcomBold')}</strong>{t('blogPosts.vietqrDecoded.workEcomRest')}
            </p>
            <p>
              <strong className="text-slate-900">{t('blogPosts.vietqrDecoded.workHotelBold')}</strong>{t('blogPosts.vietqrDecoded.workHotelRest')}
            </p>
            <p>{t('blogPosts.vietqrDecoded.p19')}</p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.vietqrDecoded.h7')}</p>
            <p>{t('blogPosts.vietqrDecoded.p20')}</p>
            <p>{t('blogPosts.vietqrDecoded.p21')}</p>
            <p>{t('blogPosts.vietqrDecoded.p22')}</p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.vietqrDecoded.h8')}</p>

            <blockquote className="my-6 pl-8 border-l-4 border-primary italic text-xl md:text-2xl font-bold text-slate-900 leading-snug">
              {t('blogPosts.vietqrDecoded.lumiTip')}
            </blockquote>

            <p>{t('blogPosts.vietqrDecoded.p23')}</p>

            <div className="space-y-4 pl-2">
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">·</span>
                <p>{t('blogPosts.vietqrDecoded.tip1')}</p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">·</span>
                <p>{t('blogPosts.vietqrDecoded.tip2')}</p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">·</span>
                <p>{t('blogPosts.vietqrDecoded.tip3')}</p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">·</span>
                <p>{t('blogPosts.vietqrDecoded.tip4')}</p>
              </div>
            </div>
          </motion.div>

          <AuthorBio authorName="Gaurav Bansal" />
        </article>
      </main>

      <Footer />
    </div>
  );
}
