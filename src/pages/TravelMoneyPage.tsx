import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { ArrowRight, Banknote, QrCode, ShieldCheck, TrendingDown } from 'lucide-react';

const corridorKeys = [
  { key: 'thailand', currency: 'THB (Baht)', qrSystem: 'PromptPay', atmFee: '€5.50+', href: '/travel-money/thailand' },
  { key: 'vietnam', currency: 'VND (Dong)', qrSystem: 'VietQR', atmFee: '€0.80–€2 + bank fee', href: '/travel-money/vietnam' },
  { key: 'indonesia', currency: 'IDR (Rupiah)', qrSystem: 'QRIS', atmFee: '€1.70–€2.80', href: '/travel-money/indonesia' },
] as const;

export default function TravelMoneyPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('travelMoney.pillar.titleBefore') + ' ' + t('travelMoney.pillar.titleHighlight') + ' ' + t('travelMoney.pillar.titleAfter') + ' — Lumifin'}
        description={t('travelMoney.pillar.subtitle')}
        canonical="/travel-money"
        structuredData={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Travel Money', url: '/travel-money' }])}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6 mb-20">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('travelMoney.pillar.eyebrow')}</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              {t('travelMoney.pillar.titleBefore')} <span className="text-primary italic">{t('travelMoney.pillar.titleHighlight')}</span> {t('travelMoney.pillar.titleAfter')}
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              {t('travelMoney.pillar.subtitle')}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Banknote, titleKey: 'cashTitle', descKey: 'cashDesc' },
                { icon: TrendingDown, titleKey: 'cardsTitle', descKey: 'cardsDesc' },
                { icon: ShieldCheck, titleKey: 'riskTitle', descKey: 'riskDesc' },
              ].map((item) => (
                <div key={item.titleKey} className="p-8 rounded-3xl border border-slate-200 space-y-4">
                  <item.icon className="w-8 h-8 text-primary" />
                  <h2 className="text-xl font-black text-slate-900">{t(`travelMoney.pillar.problem.${item.titleKey}`)}</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">{t(`travelMoney.pillar.problem.${item.descKey}`)}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 mb-4">{t('travelMoney.pillar.howTitle')}</h2>
            <p className="text-slate-500 font-medium text-lg mb-12 max-w-2xl mx-auto">{t('travelMoney.pillar.howSubtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', titleKey: 'topUpTitle', descKey: 'topUpDesc' },
                { step: '2', titleKey: 'scanTitle', descKey: 'scanDesc' },
                { step: '3', titleKey: 'payTitle', descKey: 'payDesc' },
              ].map((item) => (
                <div key={item.step} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
                  <span className="text-4xl font-black text-primary">{item.step}</span>
                  <h3 className="text-xl font-black text-slate-900">{t(`travelMoney.pillar.steps.${item.titleKey}`)}</h3>
                  <p className="text-slate-500 font-medium">{t(`travelMoney.pillar.steps.${item.descKey}`)}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 text-center mb-12">{t('travelMoney.pillar.chooseDestination')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {corridorKeys.map((corridor) => (
                <Link key={corridor.key} to={corridor.href} className="group p-8 rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 block">
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors mb-4">{t(`travelMoney.${corridor.key}.titleHighlight`)}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">{t('travelMoney.pillar.labels.currency')}</span>
                      <span className="text-slate-700 font-bold">{corridor.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">{t('travelMoney.pillar.labels.qrSystem')}</span>
                      <span className="text-slate-700 font-bold">{corridor.qrSystem}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">{t('travelMoney.pillar.labels.atmFee')}</span>
                      <span className="text-slate-700 font-bold">{corridor.atmFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">{t('travelMoney.pillar.labels.qrAdoption')}</span>
                      <span className="text-primary font-bold">{t(`travelMoney.pillar.corridors.${corridor.key}Highlight`)}</span>
                    </div>
                  </div>
                  <div className="mt-6 text-primary font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    {t('travelMoney.common.readGuide')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-4">
              <h2 className="text-2xl font-black text-slate-900">{t('travelMoney.pillar.compareTitle')}</h2>
              <p className="text-slate-500 font-medium">{t('travelMoney.pillar.compareSubtitle')}</p>
              <Link to="/compare" className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
                {t('travelMoney.pillar.compareCta')} <ArrowRight className="w-4 h-4 inline ml-2" />
              </Link>
            </div>
          </motion.div>

          <p className="mt-12 text-center text-sm text-slate-400 font-medium">{t('travelMoney.common.lastUpdated')}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
