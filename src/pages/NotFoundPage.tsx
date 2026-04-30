import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Home, BookOpen, HelpCircle } from 'lucide-react';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('notFound.title')}
        description={t('notFound.description')}
        noindex={true}
      />
      <Header />

      <main className="pt-40 pb-32 px-8 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="text-8xl font-black text-primary">404</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
            {t('notFound.heading')}
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
            {t('notFound.subheading')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              <Home className="w-4 h-4" /> {t('notFound.home')}
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
            >
              <BookOpen className="w-4 h-4" /> {t('notFound.blog')}
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
            >
              <HelpCircle className="w-4 h-4" /> {t('notFound.faq')}
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
