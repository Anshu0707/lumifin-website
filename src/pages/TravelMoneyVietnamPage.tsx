import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, faqSchema } from '../components/SEO';
import { ArrowRight, CreditCard, QrCode, ShieldCheck } from 'lucide-react';

const faqs = [
  { question: 'Can I use my European bank card in Vietnam?', answer: 'Only at upscale hotels, international restaurants, and some shopping centres. The vast majority of Vietnamese commerce — from pho stalls to motorbike taxis — is cash or QR only. Expect 1.5–3% foreign transaction fees where cards are accepted.' },
  { question: 'What is VietQR?', answer: "VietQR is Vietnam's national QR code payment standard, connecting over 40 banks and e-wallets. It enables instant transfers by scanning a single QR code. Adoption has exploded since 2023, with millions of merchants now accepting it — including street vendors and small shops." },
  { question: 'How much do ATM withdrawals cost in Vietnam?', answer: 'Vietnamese ATMs charge 22,000–55,000 VND (~€0.80–€2) per withdrawal, with limits of 2,000,000–5,000,000 VND per transaction. Your European bank adds 1.5–3% on top. You may need 2–3 withdrawals per day for basic expenses.' },
  { question: 'Why are Vietnamese dong amounts so confusing?', answer: 'Because 1 EUR ≈ 27,000 VND. Daily transactions are in the millions of dong — a meal might cost 85,000 VND, a hotel 1,500,000 VND. It takes practice to avoid costly mistakes. Lumifin shows you the euro equivalent in real-time.' },
  { question: 'How does Lumifin work in Vietnam?', answer: 'Download the app, verify your identity, and top up from your European bank. Scan any VietQR code to pay instantly in dong — at near-interbank rates. No cash counting, no ATM hunting, no denomination confusion.' },
];

const comparisons = [
  { method: 'European debit card', fee: '1.5–3%', rate: 'Bank markup', speed: 'Instant (rare acceptance)', risk: 'Very limited acceptance' },
  { method: 'ATM withdrawal', fee: '€0.80–€2 + bank fee', rate: 'Interbank + markup', speed: '10–20 min (find ATM)', risk: 'Low limits, card issues' },
  { method: 'Cash exchange', fee: '3–8% spread', rate: 'Varies by location', speed: '15–30 min', risk: 'Counterfeit notes, confusion' },
  { method: 'Lumifin', fee: 'From 0.5%', rate: 'Near interbank', speed: 'Instant (scan QR)', risk: 'None — digital' },
];

export default function TravelMoneyVietnamPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Travel Money Vietnam — Pay in Dong Without the Hassle"
        description="Skip ATM fees, confusing denominations, and bad exchange rates in Vietnam. Pay with VietQR codes using Lumifin — the easiest way for Europeans to pay in Vietnamese dong."
        canonical="/travel-money/vietnam"
        structuredData={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Travel Money', url: '/travel-money/vietnam' }, { name: 'Vietnam', url: '/travel-money/vietnam' }]),
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
              Paying in <span className="text-primary italic">Vietnam</span> as a European Traveller
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">
              Navigate the millions of dong, avoid ATM traps, and pay like a local across Vietnam — from Hanoi's Old Quarter to Ho Chi Minh City's street food scene.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-16 space-y-16">

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Currency', value: 'VND (Dong)' },
                { label: '1 EUR', value: '~27,000 VND' },
                { label: 'Card acceptance', value: 'Very low' },
                { label: 'QR adoption', value: 'Fast-growing' },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-2xl font-black text-primary">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* The problem */}
            <div className="space-y-6 text-lg text-slate-700 leading-[1.8] font-medium">
              <h2 className="text-3xl font-black text-slate-900">Why paying in Vietnam is hard for Europeans</h2>
              <p>
                Vietnam is one of the most cash-dependent countries in Southeast Asia for tourists. Card terminals are rare outside international hotels. The currency — Vietnamese dong — comes in denominations that make mental arithmetic a challenge: a 500,000 VND note looks similar to a 20,000 VND note, and the difference is about €18.
              </p>
              <p>
                ATMs have low withdrawal limits (often just 2,000,000 VND / ~€74), meaning you'll need multiple transactions per week — each with fees. Meanwhile, the Vietnamese person behind you in line scans a QR code and pays in 2 seconds.
              </p>
            </div>

            {/* Comparison table */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">How payment methods compare in Vietnam</h2>
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
              <h2 className="text-3xl font-black text-slate-900">How Lumifin works in Vietnam</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: CreditCard, step: '1', title: 'Top up', desc: 'Add euros from your European bank account to your Lumifin wallet.' },
                  { icon: QrCode, step: '2', title: 'Scan', desc: 'Scan any VietQR code at Vietnamese merchants — cafes, shops, markets, everywhere.' },
                  { icon: ShieldCheck, step: '3', title: 'Pay', desc: 'Payment settles instantly in Vietnamese dong. You see the euro amount in real-time.' },
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
              <h2 className="text-2xl font-black text-slate-900">Ready to pay like a local in Vietnam?</h2>
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
