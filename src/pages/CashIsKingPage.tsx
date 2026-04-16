import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

export default function CashIsKingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
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
              <ArrowLeft className="w-4 h-4" /> {t('blogPosts.cashIsKing.backToBlog')}
            </Link>

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">
              {t('blogPosts.cashIsKing.category')}
            </span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t('blogPosts.cashIsKing.title')}
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed italic">
              {t('blogPosts.cashIsKing.subtitle')}
            </p>

            <div className="mt-10 pb-10 border-b border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {t('blogPosts.cashIsKing.author')}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {t('blogPosts.cashIsKing.readTime')}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t('blogPosts.cashIsKing.dateLabel')}
              </span>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden">
              <img
                src="/assets/blog/cash-is-king-cover.png"
                alt={t('blogPosts.cashIsKing.imgAlt')}
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
              {t('blogPosts.cashIsKing.p1')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p2')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p3')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p4')}
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.cashIsKing.h1')}</p>

            <p>
              {t('blogPosts.cashIsKing.p5')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p6')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p7')}
            </p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.cashIsKing.h2')}</p>

            <p>
              {t('blogPosts.cashIsKing.p8')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p9')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p10')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p11')}
            </p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.cashIsKing.h3')}</p>

            <p>
              {t('blogPosts.cashIsKing.p12')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p13')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p14')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p15')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p16')}
            </p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.cashIsKing.h4')}</p>

            <p>
              {t('blogPosts.cashIsKing.p17')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p18')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p19')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p20')}
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.cashIsKing.h5')}</p>

            <p>
              {t('blogPosts.cashIsKing.p21')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p22')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p23')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p24')}
            </p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.cashIsKing.h6')}</p>

            <p>
              {t('blogPosts.cashIsKing.p25')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p26')}
            </p>
            <p>
              {t('blogPosts.cashIsKing.p27')}
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              {t('blogPosts.cashIsKing.blockquote')}
            </blockquote>

            <p>
              {t('blogPosts.cashIsKing.p28')}
            </p>
            <p className="text-2xl font-black text-slate-900">
              {t('blogPosts.cashIsKing.closing')}
            </p>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
