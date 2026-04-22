import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, articleSchema } from '../components/SEO';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

export default function WhyWeBuiltLumiPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Why We Built Lumi — A Founder's Story"
        description="The two moments that changed everything: a cab ride in Kuala Lumpur and an artist in Northern Thailand. The real story behind Lumifin."
        canonical="/blog/why-we-built-lumi"
        ogImage="/assets/blog/why-we-built-lumi-cover.webp"
        ogType="article"
        structuredData={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }, { name: 'Why We Built Lumi', url: '/blog/why-we-built-lumi' }]),
          articleSchema({ title: 'Why We Built Lumi — A Founder\'s Story', description: 'The personal experiences that led to building a borderless payment solution.', url: '/blog/why-we-built-lumi', image: '/assets/blog/why-we-built-lumi-cover.webp', author: 'Gaurav Bansal', datePublished: '2026-03-15' }),
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
              <ArrowLeft className="w-4 h-4" /> {t('blogPosts.whyWeBuiltLumi.backToBlog')}
            </Link>

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">
              {t('blogPosts.whyWeBuiltLumi.category')}
            </span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t('blogPosts.whyWeBuiltLumi.titleBefore')}<span className="text-primary italic">{t('blogPosts.whyWeBuiltLumi.titleHighlight')}</span>{t('blogPosts.whyWeBuiltLumi.titleAfter')}
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed italic">
              {t('blogPosts.whyWeBuiltLumi.subtitle')}
            </p>

            <div className="mt-10 pb-10 border-b border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {t('blogPosts.whyWeBuiltLumi.author')}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {t('blogPosts.whyWeBuiltLumi.readTime')}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t('blogPosts.whyWeBuiltLumi.dateLabel')}
              </span>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden">
              <img
                src="/assets/blog/why-we-built-lumi-cover.webp"
                alt={t('blogPosts.whyWeBuiltLumi.imgAlt')}
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
            <p>{t('blogPosts.whyWeBuiltLumi.p1')}</p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p2')}
            </p>
            <p>{t('blogPosts.whyWeBuiltLumi.p3')}</p>
            <p className="text-2xl font-black text-slate-900">{t('blogPosts.whyWeBuiltLumi.h1')}</p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-primary font-black text-sm tracking-[0.25em] uppercase">
              {t('blogPosts.whyWeBuiltLumi.location1')}
            </p>

            <p>
              {t('blogPosts.whyWeBuiltLumi.p4')}
            </p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p5')}
            </p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p6')}
            </p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p7')}
            </p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              {t('blogPosts.whyWeBuiltLumi.blockquote1')}
            </blockquote>

            <p>
              {t('blogPosts.whyWeBuiltLumi.p8')}
            </p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p9')}
            </p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p10')}
            </p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p11')}
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-primary font-black text-sm tracking-[0.25em] uppercase">
              {t('blogPosts.whyWeBuiltLumi.location2')}
            </p>

            <p>
              {t('blogPosts.whyWeBuiltLumi.p12')}
            </p>
            <p>{t('blogPosts.whyWeBuiltLumi.p13')}</p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p14')}
            </p>
            <p className="text-2xl font-black text-slate-900">{t('blogPosts.whyWeBuiltLumi.h2')}</p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p15')}
            </p>
            <p>{t('blogPosts.whyWeBuiltLumi.p16')}</p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              {t('blogPosts.whyWeBuiltLumi.blockquote2Line1')}<br />{t('blogPosts.whyWeBuiltLumi.blockquote2Line2')}
            </blockquote>

            <p>
              {t('blogPosts.whyWeBuiltLumi.p17')}
            </p>
            <p>{t('blogPosts.whyWeBuiltLumi.p18')}</p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p19')}
            </p>

            <p className="text-2xl font-black text-slate-900">{t('blogPosts.whyWeBuiltLumi.h3')}</p>

            <p>
              {t('blogPosts.whyWeBuiltLumi.p20')}
            </p>
            <p>{t('blogPosts.whyWeBuiltLumi.p21')}</p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p22')}
            </p>
            <p>
              {t('blogPosts.whyWeBuiltLumi.p23')}
            </p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              {t('blogPosts.whyWeBuiltLumi.blockquote3')}
            </blockquote>

            <p>
              {t('blogPosts.whyWeBuiltLumi.p24')}
            </p>

            <p className="pt-6 text-xl font-black text-slate-900">{t('blogPosts.whyWeBuiltLumi.closing')}</p>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
