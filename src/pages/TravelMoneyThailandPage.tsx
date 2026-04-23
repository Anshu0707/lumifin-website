import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, faqSchema } from '../components/SEO';
import { ArrowRight, CreditCard, Banknote, QrCode, ShieldCheck, TrendingDown, Clock } from 'lucide-react';

const faqs = [
  { question: 'Can I use my European bank card in Thailand?', answer: 'Yes, but expect 1.5–3% foreign transaction fees plus unfavorable exchange rates. Card acceptance is limited outside hotels and tourist areas. Most local vendors, street food stalls, and transport use QR payments or cash.' },
  { question: 'What is PromptPay?', answer: "PromptPay is Thailand's national QR payment system, used by over 70 million people. It enables instant transfers between bank accounts and is accepted at millions of merchants — from 7-Eleven to street vendors. Lumifin lets European travelers access PromptPay directly." },
  { question: 'How much do ATM withdrawals cost in Thailand?', answer: 'Thai ATMs charge a flat fee of 220 THB (~€5.50) per withdrawal, plus your European bank typically adds 1.5–3% on top. With withdrawal limits of 20,000–30,000 THB, costs add up quickly over a multi-week trip.' },
  { question: 'Is it better to exchange euros to baht in France or Thailand?', answer: 'Neither is ideal. Airport exchanges in both countries offer poor rates. Bangkok exchanges like SuperRich are better but inconvenient. Lumifin gives you near-interbank rates directly through your phone — no physical exchange needed.' },
  { question: 'How does Lumifin work in Thailand?', answer: 'Download the app, verify your identity, and top up your wallet from your European bank account. Then scan any PromptPay QR code at Thai merchants to pay instantly in baht — at rates significantly better than cards or cash exchanges.' },
];

const comparisons = [
  { method: 'European debit card', fee: '1.5–3%', rate: 'Bank markup', speed: 'Instant (where accepted)', risk: 'Limited acceptance' },
  { method: 'ATM withdrawal', fee: '€5.50+ per withdrawal', rate: 'Interbank + markup', speed: '5–10 min (find ATM)', risk: 'Card skimming, limits' },
  { method: 'Cash exchange', fee: '3–8% spread', rate: 'Varies wildly', speed: '15–30 min', risk: 'Counterfeit, theft' },
  { method: 'Lumifin', fee: 'From 0.5%', rate: 'Near interbank', speed: 'Instant (scan QR)', risk: 'None — digital' },
];

export default function TravelMoneyThailandPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Travel Money Thailand — Pay in Baht Without the Fees"
        description="Avoid ATM fees, bad exchange rates, and cash risks in Thailand. Pay with PromptPay QR codes using Lumifin — the smart way for Europeans to pay in Thai baht."
        canonical="/travel-money/thailand"
        structuredData={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Travel Money', url: '/travel-money/thailand' }, { name: 'Thailand', url: '/travel-money/thailand' }]),
          faqSchema(faqs),
        ]}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <article className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-widest mb-16 pb-8 border-b border-slate-200 transition-colors">
              &larr; Home
            </Link>

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">Travel Money Guide</span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              Paying in <span className="text-primary italic">Thailand</span> as a European Traveller
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">
              Everything you need to know about converting EUR to THB, avoiding hidden fees, and paying like a local with QR codes across Thailand.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-16 space-y-16">

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Currency', value: 'THB (Baht)' },
                { label: 'ATM fee', value: '220 THB (~€5.50)' },
                { label: 'Card acceptance', value: 'Low outside cities' },
                { label: 'QR adoption', value: '70M+ users' },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-2xl font-black text-primary">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* The problem */}
            <div className="space-y-6 text-lg text-slate-700 leading-[1.8] font-medium">
              <h2 className="text-3xl font-black text-slate-900">The problem with paying in Thailand as a European</h2>
              <p>
                Thailand's economy runs on two things: cash and PromptPay. European bank cards are accepted at hotels, malls, and some restaurants — but the vast majority of daily commerce happens outside those places. Street food, tuk-tuks, local markets, temples, laundry services — almost none of these accept foreign cards.
              </p>
              <p>
                That leaves you with ATMs (220 THB fee per withdrawal, plus your bank's markup) or currency exchange booths (3–8% worse than the real rate). Over a two-week trip, a typical European traveller loses €50–150 just in payment friction.
              </p>
            </div>

            {/* Comparison table */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">How payment methods compare in Thailand</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-4 pr-4 text-sm font-black text-slate-900 uppercase tracking-widest">Method</th>
                      <th className="text-left py-4 pr-4 text-sm font-black text-slate-900 uppercase tracking-widest">Fee</th>
                      <th className="text-left py-4 pr-4 text-sm font-black text-slate-900 uppercase tracking-widest">Rate</th>
                      <th className="text-left py-4 pr-4 text-sm font-black text-slate-900 uppercase tracking-widest">Speed</th>
                    </tr>
                  </thead>
                  <tbody className="text-base">
                    {comparisons.map((row, i) => (
                      <tr key={i} className={`border-b border-slate-100 ${row.method === 'Lumifin' ? 'bg-primary/5' : ''}`}>
                        <td className={`py-4 pr-4 font-bold ${row.method === 'Lumifin' ? 'text-primary' : 'text-slate-900'}`}>{row.method}</td>
                        <td className="py-4 pr-4 text-slate-600">{row.fee}</td>
                        <td className="py-4 pr-4 text-slate-600">{row.rate}</td>
                        <td className="py-4 pr-4 text-slate-600">{row.speed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* How Lumifin works */}
            <div className="space-y-6 text-lg text-slate-700 leading-[1.8] font-medium">
              <h2 className="text-3xl font-black text-slate-900">How Lumifin works in Thailand</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: CreditCard, step: '1', title: 'Top up', desc: 'Add euros from your European bank account to your Lumifin wallet.' },
                  { icon: QrCode, step: '2', title: 'Scan', desc: 'Scan any PromptPay QR code at Thai merchants — from street food to supermarkets.' },
                  { icon: ShieldCheck, step: '3', title: 'Pay', desc: 'Payment goes through instantly in Thai baht at near-interbank rates. Done.' },
                ].map((item) => (
                  <div key={item.step} className="p-6 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-primary font-black text-2xl">{item.step}</span>
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 font-medium text-base">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">Frequently asked questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-slate-100 pb-6">
                    <h3 className="text-lg font-black text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Ready to pay like a local in Thailand?</h2>
              <p className="text-slate-500 font-medium">Join the Lumifin waitlist and be the first to travel fee-free.</p>
              <Link to="/#waitlist" className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
                Join the Waitlist <ArrowRight className="w-4 h-4 inline ml-2" />
              </Link>
            </div>

            <p className="text-center text-sm text-slate-400 font-medium">Last updated: March 2026</p>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
