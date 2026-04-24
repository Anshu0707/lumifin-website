import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { ArrowRight, Banknote, QrCode, ShieldCheck, TrendingDown } from 'lucide-react';

const corridors = [
  {
    country: 'Thailand',
    currency: 'THB (Baht)',
    qrSystem: 'PromptPay',
    atmFee: '€5.50+',
    highlight: '70M+ QR users',
    href: '/travel-money/thailand',
  },
  {
    country: 'Vietnam',
    currency: 'VND (Dong)',
    qrSystem: 'VietQR',
    atmFee: '€0.80–€2 + bank fee',
    highlight: 'Fastest QR growth in SEA',
    href: '/travel-money/vietnam',
  },
  {
    country: 'Indonesia',
    currency: 'IDR (Rupiah)',
    qrSystem: 'QRIS',
    atmFee: '€1.70–€2.80',
    highlight: '56M+ merchants',
    href: '/travel-money/indonesia',
  },
];

export default function TravelMoneyPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Travel Money Southeast Asia — Pay Like a Local with Lumifin"
        description="Stop losing money on ATM fees, bad exchange rates, and cash risks in Thailand, Vietnam, and Indonesia. Lumifin lets Europeans pay with local QR codes at near-interbank rates."
        canonical="/travel-money"
        structuredData={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Travel Money', url: '/travel-money' }])}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center space-y-6 mb-20">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">Travel Money Guides</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Pay like a <span className="text-primary italic">local</span> in Southeast Asia.
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              European travellers lose €50–150 per trip on ATM fees, bad exchange rates, and cash risks. Lumifin connects you to local QR payment systems — so you pay in local currency at near-interbank rates, instantly.
            </p>
          </motion.div>

          {/* The Problem */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Banknote, title: 'Cash is expensive', desc: 'Airport exchanges charge 8–10% spreads. ATMs add flat fees + your bank\'s markup. You lose money every time you access your own money.' },
                { icon: TrendingDown, title: 'Cards cost more than you think', desc: '1.5–3% foreign transaction fees, plus currency conversion markups hidden in the fine print. And most local merchants don\'t accept them anyway.' },
                { icon: ShieldCheck, title: 'Cash carries real risk', desc: 'No fraud protection, no chargeback, no dispute. If it\'s stolen or lost, it\'s gone. Carrying large amounts in tourist areas is a liability.' },
              ].map((item) => (
                <div key={item.title} className="p-8 rounded-3xl border border-slate-200 space-y-4">
                  <item.icon className="w-8 h-8 text-primary" />
                  <h2 className="text-xl font-black text-slate-900">{item.title}</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How Lumifin Works */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20 text-center">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 mb-4">How Lumifin works</h2>
            <p className="text-slate-500 font-medium text-lg mb-12 max-w-2xl mx-auto">Three steps. No cash. No card machines. No hidden fees.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'Top up', desc: 'Add euros from your European bank account to your Lumifin wallet. Takes seconds.' },
                { step: '2', title: 'Scan', desc: 'Scan any local QR code — PromptPay in Thailand, VietQR in Vietnam, QRIS in Indonesia.' },
                { step: '3', title: 'Pay', desc: 'Payment settles instantly in local currency at near-interbank rates. You see the euro amount in real-time.' },
              ].map((item) => (
                <div key={item.step} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-3">
                  <span className="text-4xl font-black text-primary">{item.step}</span>
                  <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Country Corridors */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-20">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 text-center mb-12">Choose your destination</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {corridors.map((corridor) => (
                <Link key={corridor.country} to={corridor.href} className="group p-8 rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 block">
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors mb-4">{corridor.country}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">Currency</span>
                      <span className="text-slate-700 font-bold">{corridor.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">QR System</span>
                      <span className="text-slate-700 font-bold">{corridor.qrSystem}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">ATM Fee</span>
                      <span className="text-slate-700 font-bold">{corridor.atmFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-wider">QR Adoption</span>
                      <span className="text-primary font-bold">{corridor.highlight}</span>
                    </div>
                  </div>
                  <div className="mt-6 text-primary font-black text-sm uppercase tracking-widest flex items-center gap-2">
                    Read guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Compare CTA */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-4">
              <h2 className="text-2xl font-black text-slate-900">How does Lumifin compare?</h2>
              <p className="text-slate-500 font-medium">See how we stack up against Revolut, Wise, and traditional banks for Southeast Asia travel.</p>
              <Link to="/compare" className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
                View Comparison <ArrowRight className="w-4 h-4 inline ml-2" />
              </Link>
            </div>
          </motion.div>

          <p className="mt-12 text-center text-sm text-slate-400 font-medium">Last updated: March 2026</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
