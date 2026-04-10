import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User } from 'lucide-react';

const POSTS = [
  { id: 1, key: 'future', author: 'Pierre Lahbabi', categoryKey: 'fintech', href: '/blog/cash-is-king', image: '/assets/blog/cash-is-king-cover.png' },
  { id: 2, key: 'bangkok', author: 'Tanvi Nag', categoryKey: 'travel', href: '/blog/why-we-built-lumi', image: '/assets/blog/why-we-built-lumi-cover.png' },
  { id: 3, key: 'founder', author: 'Gaurav Bansal', categoryKey: 'company', href: '/blog/qris-decoded', image: '/assets/blog/qris-decoded-cover.png' },
] as const;

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-40 pb-32 px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-24"
        >
          <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('blog.eyebrow')}</span>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            {t('blog.titleBefore')} <span className="text-primary italic">{t('blog.titleHighlight')}</span> {t('blog.titleAfter')}
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer relative"
            >
              {post.href && (
                <Link to={post.href} className="absolute inset-0 z-10" aria-label={t(`blog.posts.${post.key}.title`)} />
              )}
              {post.image && (
                <div className="mb-6 rounded-2xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={t(`blog.posts.${post.key}.title`)}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="mb-4">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase">
                  {t(`blog.categories.${post.categoryKey}`)}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {t(`blog.posts.${post.key}.date`)}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {post.author}
                  </span>
                </div>

                <h3 className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                  {t(`blog.posts.${post.key}.title`)}
                </h3>

                <p className="text-slate-500 font-medium leading-relaxed">
                  {t(`blog.posts.${post.key}.excerpt`)}
                </p>

              </div>
            </motion.article>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 p-16 rounded-[4rem] bg-slate-50 text-center space-y-8 border border-slate-100"
        >
          <h2 className="text-5xl font-black tracking-tighter text-slate-900">{t('blog.newsletterTitle')}</h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            {t('blog.newsletterBody')}
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder={t('blog.emailPlaceholder')}
              className="flex-1 px-8 py-5 rounded-2xl bg-white border border-slate-200 focus:border-primary outline-none font-medium transition-all"
            />
            <button className="hero-gradient text-white px-8 py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
              {t('blog.subscribe')}
            </button>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
