import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema, faqSchema } from '../components/SEO';
import { ArrowRight, CreditCard, QrCode, ShieldCheck } from 'lucide-react';

const faqs = [
  { question: 'Can I use my European bank card in Indonesia?', answer: 'Only at hotels, upscale restaurants, and malls in major cities. The vast majority of Indonesian commerce — warungs, ojeks, local shops, markets — runs on QRIS (QR payments) or cash. Expect 1.5–3% foreign transaction fees where cards are accepted.' },
  { question: 'What is QRIS?', answer: 'QRIS (Quick Response Code Indonesian Standard) is Indonesia\'s national unified QR payment system, launched by Bank Indonesia in 2019. It connects all major e-wallets (GoPay, OVO, Dana, ShopeePay) and banks under one standard. Over 56 million merchants accept it — from Jakarta malls to roadside warungs in Yogyakarta.' },
  { question: 'How much do ATM withdrawals cost in Indonesia?', answer: 'Indonesian ATMs charge 30,000–50,000 IDR (~€1.70–€2.80) per withdrawal. Limits are typically 1,250,000–2,500,000 IDR per transaction (~€70–€140). Your European bank adds 1.5–3% on top. Multiple withdrawals per week add up fast.' },
  { question: 'Why can\'t Europeans use QRIS directly?', answer: 'QRIS requires either a local Indonesian bank account (needs a KITAS residence permit) or a local e-wallet like GoPay/OVO (needs an Indonesian phone number and ID). European tourists can\'t access either. Lumifin bridges this gap.' },
  { question: 'How does Lumifin work in Indonesia?', answer: 'Download the app, verify your identity, and top up from your European bank. Scan any QRIS code to pay instantly in rupiah — at near-interbank rates. Works at any of the 56+ million QRIS merchants across the archipelago.' },
];

const comparisons = [
  { method: 'European debit card', fee: '1.5–3%', rate: 'Bank markup', speed: 'Instant (limited acceptance)' },
  { method: 'ATM withdrawal', fee: '€1.70–€2.80 + bank fee', rate: 'Interbank + markup', speed: '10–20 min (find ATM)' },
  { method: 'Money changer', fee: '3–10% spread', rate: 'Highly variable', speed: '15–30 min' },
  { method: 'Lumifin', fee: 'From 0.5%', rate: 'Near interbank', speed: 'Instant (scan QR)' },
];

export default function TravelMoneyIndonesiaPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Travel Money Indonesia — Pay in Rupiah with QRIS and Lumifin"
        description="Skip ATM fees and money changer scams in Indonesia. Pay with QRIS QR codes using Lumifin — access 56 million merchants as a European traveller."
        canonical="/travel-money/indonesia"
        structuredData={[
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Travel Money', url: '/travel-money' }, { name: 'Indonesia', url: '/travel-money/indonesia' }]),
          faqSchema(faqs),
        ]}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <article className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/travel-money" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-widest mb-16 pb-8 border-b border-slate-200 transition-colors">
              &larr; All Destinations
            </Link>

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">Travel Money Guide</span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              Paying in <span className="text-primary italic">Indonesia</span> as a European Traveller
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed">
              56 million merchants accept QRIS. Zero of them accept your European bank card. Here's how to bridge the gap — from Bali to Java to Komodo.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-16 space-y-16">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Currency', value: 'IDR (Rupiah)' },
                { label: '1 EUR', value: '~17,000 IDR' },
                { label: 'QRIS merchants', value: '56M+' },
                { label: 'ATM fee', value: '€1.70–€2.80' },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-2xl font-black text-primary">{stat.value}</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 text-lg text-slate-700 leading-[1.8] font-medium">
              <h2 className="text-3xl font-black text-slate-900">Why paying in Indonesia is broken for Europeans</h2>
              <p>
                Indonesia has leapfrogged cash with QRIS — a unified QR payment system that works at everything from Jakarta's modern malls to the smallest kaki lima food cart in Yogyakarta. But this system was built for domestic users. To scan a QRIS code, you need either an Indonesian bank account or a local e-wallet like GoPay — both require local ID.
              </p>
              <p>
                As a European tourist, you're stuck with ATMs (with withdrawal limits as low as 1,250,000 IDR / ~€70), money changers (where scams are common in tourist areas like Kuta), or your bank card at the handful of places that accept it. Meanwhile, every Indonesian around you is tapping their phone and walking away.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">How payment methods compare in Indonesia</h2>
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

            <div className="space-y-6 text-lg text-slate-700 leading-[1.8] font-medium">
              <h2 className="text-3xl font-black text-slate-900">How Lumifin works in Indonesia</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: CreditCard, step: '1', title: 'Top up', desc: 'Add euros from your European bank account to your Lumifin wallet.' },
                  { icon: QrCode, step: '2', title: 'Scan', desc: 'Scan any QRIS code — warungs, cafes, shops, grab drivers, everywhere across the archipelago.' },
                  { icon: ShieldCheck, step: '3', title: 'Pay', desc: 'Payment settles instantly in Indonesian rupiah. You see the euro equivalent in real-time.' },
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

            <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-4">
              <h2 className="text-2xl font-black text-slate-900">Ready to pay like a local in Indonesia?</h2>
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
