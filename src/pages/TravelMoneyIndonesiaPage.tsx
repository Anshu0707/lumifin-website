import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, faqSchema } from '../components/SEO';
import { localizedPath } from '../utils/localizedPath';
import { ArrowRight, CreditCard, QrCode, ShieldCheck } from 'lucide-react';

const COUNTRY = 'indonesia';
const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;
const COMPARISON_KEYS = ['card', 'atm', 'cash', 'lumi'] as const;
const STAT_KEYS = ['currency', 'exchange', 'qrMerchants', 'atmFee'] as const;
const STEP_ICONS = [CreditCard, QrCode, ShieldCheck];
const STEP_KEYS = ['topUp', 'scan', 'pay'] as const;

export default function TravelMoneyIndonesiaPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const ns = `travelMoney.${COUNTRY}`;

  const faqs = FAQ_KEYS.map((k) => ({
    question: t(`${ns}.faqs.${k}.q`),
    answer: t(`${ns}.faqs.${k}.a`),
  }));

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${ns}.title`) + ' — Lumifin'}
        description={t(`${ns}.subtitle`)}
        canonical="/travel-money/indonesia"
        ogImage="/assets/preview/og-indonesia.jpg"
        structuredData={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Travel Money', url: '/travel-money' }, { name: 'Indonesia', url: '/travel-money/indonesia' }]),
          faqSchema(faqs),
        ]}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <article className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to={localizedPath('/travel-money', location.pathname)} className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-widest mb-16 pb-8 border-b border-slate-200 transition-colors">
              &larr; {t('travelMoney.common.backToDestinations')}
            </Link>

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">{t('travelMoney.common.guideEyebrow')}</span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t(`${ns}.title`).replace(t(`${ns}.titleHighlight`), '___')
                .split('___')
                .reduce<React.ReactNode[]>((acc, part, i, arr) => {
                  acc.push(part);
                  if (i < arr.length - 1) acc.push(<span key={i} className="text-primary italic">{t(`${ns}.titleHighlight`)}</span>);
                  return acc;
                }, [])}
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">{t(`${ns}.subtitle`)}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-16 space-y-16">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STAT_KEYS.map((key) => (
                <div key={key} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-2xl font-black text-primary">{t(`${ns}.stats.${key}`)}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{t(`${ns}.stats.labels.${key}`)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 text-lg text-slate-700 leading-[1.8] font-medium">
              <h2 className="text-3xl font-black text-slate-900">{t(`${ns}.problemTitle`)}</h2>
              <p>{t(`${ns}.problemP1`)}</p>
              <p>{t(`${ns}.problemP2`)}</p>
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">{t(`${ns}.compareTitle`)}</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-4 pr-4 text-sm font-black text-slate-900 uppercase tracking-widest">{t('travelMoney.thailand.tableHeaders.method')}</th>
                      <th className="text-left py-4 pr-4 text-sm font-black text-slate-900 uppercase tracking-widest">{t('travelMoney.thailand.tableHeaders.fee')}</th>
                      <th className="text-left py-4 pr-4 text-sm font-black text-slate-900 uppercase tracking-widest">{t('travelMoney.thailand.tableHeaders.rate')}</th>
                      <th className="text-left py-4 pr-4 text-sm font-black text-slate-900 uppercase tracking-widest">{t('travelMoney.thailand.tableHeaders.speed')}</th>
                    </tr>
                  </thead>
                  <tbody className="text-base">
                    {COMPARISON_KEYS.map((key) => {
                      const isLumi = key === 'lumi';
                      return (
                        <tr key={key} className={`border-b border-slate-100 ${isLumi ? 'bg-primary/5' : ''}`}>
                          <td className={`py-4 pr-4 font-bold ${isLumi ? 'text-primary' : 'text-slate-900'}`}>{t(`${ns}.comparisons.${key}.method`)}</td>
                          <td className="py-4 pr-4 text-slate-600">{t(`${ns}.comparisons.${key}.fee`)}</td>
                          <td className="py-4 pr-4 text-slate-600">{t(`${ns}.comparisons.${key}.rate`)}</td>
                          <td className="py-4 pr-4 text-slate-600">{t(`${ns}.comparisons.${key}.speed`)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6 text-lg text-slate-700 leading-[1.8] font-medium">
              <h2 className="text-3xl font-black text-slate-900">{t(`${ns}.howTitle`)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STEP_KEYS.map((key, i) => {
                  const Icon = STEP_ICONS[i];
                  return (
                    <div key={key} className="p-6 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-primary font-black text-2xl">{i + 1}</span>
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-black text-slate-900">{t(`travelMoney.pillar.steps.${key}Title`)}</h3>
                      <p className="text-slate-500 font-medium text-base">{t(`${ns}.steps.${key}`)}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">{t(`${ns}.faqTitle`)}</h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-slate-100 pb-6">
                    <h3 className="text-lg font-black text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-4">
              <h2 className="text-2xl font-black text-slate-900">{t(`${ns}.ctaTitle`)}</h2>
              <p className="text-slate-500 font-medium">{t(`${ns}.ctaSubtitle`)}</p>
              <Link to={localizedPath('/#waitlist', location.pathname)} className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
                {t('travelMoney.common.joinWaitlist')} <ArrowRight className="w-4 h-4 inline ml-2" />
              </Link>
            </div>

            <p className="text-center text-sm text-slate-400 font-medium">{t('travelMoney.common.lastUpdated')}</p>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
