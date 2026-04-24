import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { Check, X as XIcon, Minus, ArrowRight } from 'lucide-react';

const features = [
  {
    category: 'Fees & Rates',
    items: [
      { feature: 'Transaction fee', lumifin: '2%', revolut: '0–2.5%*', wise: '0.4–1.5%', bank: '1.5–3%' },
      { feature: 'Exchange rate', lumifin: 'Near interbank', revolut: 'Interbank (weekdays)', wise: 'Mid-market', bank: 'Bank markup (2–5%)' },
      { feature: 'Weekend FX markup', lumifin: 'No', revolut: '1–2% surcharge', wise: 'No', bank: 'Included in spread' },
      { feature: 'ATM withdrawal fee', lumifin: 'N/A (QR only)', revolut: 'Free up to limit*', wise: '€1.50 + 1.75%', bank: '€3–7 + local fee' },
      { feature: 'Hidden currency conversion', lumifin: 'Never', revolut: 'Possible on weekends', wise: 'Never', bank: 'Common' },
    ],
  },
  {
    category: 'Southeast Asia Coverage',
    items: [
      { feature: 'Thailand (PromptPay)', lumifin: true, revolut: false, wise: false, bank: false },
      { feature: 'Vietnam (VietQR)', lumifin: true, revolut: false, wise: false, bank: false },
      { feature: 'Indonesia (QRIS)', lumifin: true, revolut: false, wise: false, bank: false },
      { feature: 'Local QR code payments', lumifin: true, revolut: false, wise: false, bank: false },
      { feature: 'Street vendor / market payments', lumifin: true, revolut: false, wise: false, bank: false },
      { feature: 'Card terminal required', lumifin: false, revolut: true, wise: true, bank: true },
    ],
  },
  {
    category: 'User Experience',
    items: [
      { feature: 'Works without cash', lumifin: true, revolut: 'partial', wise: 'partial', bank: false },
      { feature: 'No local bank account needed', lumifin: true, revolut: true, wise: true, bank: true },
      { feature: 'Real-time EUR equivalent shown', lumifin: true, revolut: true, wise: true, bank: false },
      { feature: 'Designed for SEA travel', lumifin: true, revolut: false, wise: false, bank: false },
    ],
  },
];

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-5 h-5 text-green-500 mx-auto" />;
  if (value === false) return <XIcon className="w-5 h-5 text-slate-300 mx-auto" />;
  if (value === 'partial') return <Minus className="w-5 h-5 text-amber-400 mx-auto" />;
  return <span className="text-sm font-medium text-slate-700">{value}</span>;
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Lumifin vs Revolut vs Wise — Best Travel Payment for Southeast Asia"
        description="Side-by-side comparison of Lumifin, Revolut, Wise, and traditional banks for paying in Thailand, Vietnam, and Indonesia. Fees, QR support, and real-world coverage."
        canonical="/compare"
        structuredData={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Compare', url: '/compare' }])}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6 mb-20">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">Comparison</span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              Lumifin vs <span className="text-primary italic">the rest</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              Revolut and Wise are great products — but they weren't built for paying at a Thai street food stall or a Balinese warung. Here's how the options actually compare for Southeast Asia travel.
            </p>
          </motion.div>

          {/* Disclaimer */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm text-slate-400 font-medium text-center mb-12">
            * Revolut fees vary by plan (Standard, Plus, Premium, Metal). Free FX has monthly limits on Standard plans. Rates as of March 2026.
          </motion.p>

          {/* Comparison Tables */}
          {features.map((section, sectionIdx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIdx * 0.1 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-black text-slate-900 mb-6">{section.category}</h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left py-4 px-6 text-sm font-black text-slate-900 uppercase tracking-widest w-[35%]">Feature</th>
                      <th className="py-4 px-4 text-sm font-black text-primary uppercase tracking-widest text-center">Lumifin</th>
                      <th className="py-4 px-4 text-sm font-black text-slate-500 uppercase tracking-widest text-center">Revolut</th>
                      <th className="py-4 px-4 text-sm font-black text-slate-500 uppercase tracking-widest text-center">Wise</th>
                      <th className="py-4 px-4 text-sm font-black text-slate-500 uppercase tracking-widest text-center">Trad. Bank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((row, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="py-4 px-6 text-sm font-bold text-slate-900">{row.feature}</td>
                        <td className="py-4 px-4 text-center bg-primary/5"><CellValue value={row.lumifin} /></td>
                        <td className="py-4 px-4 text-center"><CellValue value={row.revolut} /></td>
                        <td className="py-4 px-4 text-center"><CellValue value={row.wise} /></td>
                        <td className="py-4 px-4 text-center"><CellValue value={row.bank} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}

          {/* Bottom line */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-8 text-lg text-slate-700 leading-[1.8] font-medium mb-16">
            <h2 className="text-3xl font-black text-slate-900">The bottom line</h2>
            <p>
              Revolut and Wise are excellent for countries with widespread card acceptance — Europe, the US, Australia. But in Thailand, Vietnam, and Indonesia, the majority of daily commerce happens at places that don't have card terminals. Street food vendors, tuk-tuk drivers, local markets, small cafes — these are the places you actually want to spend money, and none of them accept your Revolut card.
            </p>
            <p>
              Lumifin is purpose-built for this gap. Instead of trying to force a card into a cashless, QR-first economy, we connect you directly to the local payment rails — PromptPay, VietQR, QRIS — that millions of locals use every day. That means you can pay anywhere they can, at rates comparable to the best fintechs, without carrying cash or hoping for a card terminal.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Ready to try the smarter way to pay in Southeast Asia?</h2>
              <p className="text-slate-500 font-medium">Join the Lumifin waitlist and be among the first to travel without payment friction.</p>
              <Link to="/#waitlist" className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
                Join the Waitlist <ArrowRight className="w-4 h-4 inline ml-2" />
              </Link>
            </div>
          </motion.div>

          <p className="mt-12 text-center text-sm text-slate-400 font-medium">Last updated: March 2026. Information based on publicly available pricing. Verify current rates on each provider's website.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
