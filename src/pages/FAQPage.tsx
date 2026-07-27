import React from 'react';
import { useTranslation } from 'react-i18next';
import { getFaqs } from '../constants/faqs';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, faqSchema } from '../components/SEO';
import { localizedPath } from '../utils/localizedPath';

export default function FAQPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const faqs = getFaqs(t);
  const faqItems = faqs.map((f: { question: string; answer: string }) => ({ question: f.question, answer: f.answer }));
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('faqPage.seo.title')}
        description={t('faqPage.seo.description')}
        canonical="/faq"
        structuredData={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'FAQ', url: '/faq' }]),
          faqSchema(faqItems),
        ]}
      />
      <Header />

      <main className="pt-40 pb-32 px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <Link to={localizedPath('/', location.pathname)} className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase hover:gap-4 transition-all">
            <ArrowLeft className="w-4 h-4" /> {t('faqPage.backHome')}
          </Link>

          <div className="space-y-6">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('faqPage.eyebrow')}</span>
            <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              {t('faqPage.title')}
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              {t('faqPage.subtitle')}
            </p>
          </div>

          <div className="space-y-6 pt-12">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-slate-50 rounded-[2rem] overflow-hidden transition-all duration-300 hover:bg-slate-100"
              >
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <h2 className="text-xl font-bold text-slate-900">{faq.question}</h2>
                  <ChevronDown className="w-6 h-6 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </motion.div>
        <p className="mt-12 text-center text-sm text-slate-400 font-medium">Last updated: March 2026</p>
      </main>

      <Footer />
    </div>
  );
}
