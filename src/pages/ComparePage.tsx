import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { Check, X as XIcon, Minus, ArrowRight } from 'lucide-react';

type CellVal = string | boolean | 'partial';

type Row = {
  rowKey: string;
  lumifin: CellVal;
  revolut: CellVal;
  wise: CellVal;
  bank: CellVal;
};

const featureSections: { categoryKey: string; rows: Row[] }[] = [
  {
    categoryKey: 'fees',
    rows: [
      { rowKey: 'transactionFee', lumifin: 'lumifinFee', revolut: 'revolutFee', wise: 'wiseFee', bank: 'bankFee' },
      { rowKey: 'exchangeRate', lumifin: 'lumifinRate', revolut: 'revolutRate', wise: 'wiseRate', bank: 'bankRate' },
      { rowKey: 'weekendFx', lumifin: 'lumifinWeekend', revolut: 'revolutWeekend', wise: 'wiseWeekend', bank: 'bankWeekend' },
      { rowKey: 'atmFee', lumifin: 'lumifinAtm', revolut: 'revolutAtm', wise: 'wiseAtm', bank: 'bankAtm' },
      { rowKey: 'hiddenConv', lumifin: 'lumifinHidden', revolut: 'revolutHidden', wise: 'wiseHidden', bank: 'bankHidden' },
    ],
  },
  {
    categoryKey: 'coverage',
    rows: [
      { rowKey: 'thailand', lumifin: true, revolut: false, wise: false, bank: false },
      { rowKey: 'vietnam', lumifin: true, revolut: false, wise: false, bank: false },
      { rowKey: 'indonesia', lumifin: true, revolut: false, wise: false, bank: false },
      { rowKey: 'qrPayments', lumifin: true, revolut: false, wise: false, bank: false },
      { rowKey: 'streetVendor', lumifin: true, revolut: false, wise: false, bank: false },
      { rowKey: 'cardTerminal', lumifin: false, revolut: true, wise: true, bank: true },
    ],
  },
  {
    categoryKey: 'ux',
    rows: [
      { rowKey: 'noCash', lumifin: true, revolut: 'partial', wise: 'partial', bank: false },
      { rowKey: 'noLocalAccount', lumifin: true, revolut: true, wise: true, bank: true },
      { rowKey: 'realtimeEur', lumifin: true, revolut: true, wise: true, bank: false },
      { rowKey: 'designedSea', lumifin: true, revolut: false, wise: false, bank: false },
    ],
  },
];

function CellValue({ value, t }: { value: CellVal; t: (k: string) => string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center gap-1.5 text-green-600 font-semibold text-sm">
        <Check className="w-4 h-4" aria-hidden="true" />
        {t('compare.yes')}
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center gap-1.5 text-slate-400 font-semibold text-sm">
        <XIcon className="w-4 h-4" aria-hidden="true" />
        {t('compare.no')}
      </span>
    );
  }
  if (value === 'partial') {
    return (
      <span className="inline-flex items-center justify-center gap-1.5 text-amber-500 font-semibold text-sm">
        <Minus className="w-4 h-4" aria-hidden="true" />
        {t('compare.partial')}
      </span>
    );
  }
  return <span className="text-sm font-medium text-slate-700">{t(`compare.values.${value}`)}</span>;
}

export default function ComparePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('compare.titleBefore') + ' ' + t('compare.titleHighlight') + ' — Lumifin'}
        description={t('compare.subtitle')}
        canonical="/compare"
        structuredData={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Compare', url: '/compare' }])}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6 mb-20">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('compare.eyebrow')}</span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              {t('compare.titleBefore')} <span className="text-primary italic">{t('compare.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">{t('compare.subtitle')}</p>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm text-slate-400 font-medium text-center mb-12">
            {t('compare.disclaimer')}
          </motion.p>

          {featureSections.map((section, sectionIdx) => (
            <motion.div
              key={section.categoryKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIdx * 0.1 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-6">{t(`compare.categories.${section.categoryKey}`)}</h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left py-4 px-6 text-sm font-black text-slate-900 uppercase tracking-widest w-[35%]">{t('compare.headers.feature')}</th>
                      <th className="py-4 px-4 text-sm font-black text-primary uppercase tracking-widest text-center">{t('compare.headers.lumifin')}</th>
                      <th className="py-4 px-4 text-sm font-black text-slate-500 uppercase tracking-widest text-center">{t('compare.headers.revolut')}</th>
                      <th className="py-4 px-4 text-sm font-black text-slate-500 uppercase tracking-widest text-center">{t('compare.headers.wise')}</th>
                      <th className="py-4 px-4 text-sm font-black text-slate-500 uppercase tracking-widest text-center">{t('compare.headers.bank')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row) => (
                      <tr key={row.rowKey} className="border-t border-slate-100">
                        <td className="py-4 px-6 text-sm font-bold text-slate-900">{t(`compare.rows.${row.rowKey}`)}</td>
                        <td className="py-4 px-4 text-center bg-primary/5"><CellValue value={row.lumifin} t={t} /></td>
                        <td className="py-4 px-4 text-center"><CellValue value={row.revolut} t={t} /></td>
                        <td className="py-4 px-4 text-center"><CellValue value={row.wise} t={t} /></td>
                        <td className="py-4 px-4 text-center"><CellValue value={row.bank} t={t} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-8 text-lg text-slate-700 leading-[1.8] font-medium mb-16">
            <h2 className="text-3xl font-black text-slate-900">{t('compare.bottomLineTitle')}</h2>
            <p>{t('compare.bottomLineP1')}</p>
            <p>{t('compare.bottomLineP2')}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-4">
              <h2 className="text-2xl font-black text-slate-900">{t('compare.ctaTitle')}</h2>
              <p className="text-slate-500 font-medium">{t('compare.ctaSubtitle')}</p>
              <Link to="/#waitlist" className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
                {t('compare.ctaButton')} <ArrowRight className="w-4 h-4 inline ml-2" />
              </Link>
            </div>
          </motion.div>

          <p className="mt-12 text-center text-sm text-slate-400 font-medium">{t('compare.lastUpdated')}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
