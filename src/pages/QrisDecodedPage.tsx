import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

export default function QrisDecodedPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <article className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm uppercase tracking-widest mb-16 pb-8 border-b border-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <span className="mt-4 block text-primary font-black text-xs tracking-[0.3em] uppercase">
              QR Payments 101
            </span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              QRIS Decoded: Indonesia's Standardized QR Payment System and What It Means for European Travelers
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed italic">
              With over 56 million merchants and 6 billion transactions, QRIS is how Indonesia pays. And as a European visitor, you're currently locked out of it.
            </p>

            <div className="mt-10 pb-10 border-b border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> Lumifin
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> 7 min read
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> March 2026
              </span>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden">
              <img
                src="/assets/blog/qris-decoded-cover.png"
                alt="QRIS QR Payment System in Indonesia"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-12 space-y-6 text-lg md:text-xl text-slate-700 leading-[1.8] font-medium"
          >
            <p>
              Picture this: you're at a warung in Ubud, Bali. You've just had the best nasi goreng of your life and the bill comes to 45,000 IDR — roughly &euro;2.50. You reach for your European bank card, and the vendor points to a small printed QR code on the counter. No card terminal. No cash preferred. Just a QR code. And you have absolutely no way to scan it.
            </p>
            <p>
              Welcome to QRIS — pronounced "quris" — Indonesia's national QR payment standard that has quietly become the backbone of everyday commerce across the archipelago. With over 56 million registered merchants and 6 billion transactions in just the first half of 2025, QRIS isn't a niche experiment. It's how Indonesia pays.
            </p>
            <p className="text-2xl font-black text-slate-900">
              And as a European visitor, you're currently locked out of it.
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-2xl font-black text-slate-900">What exactly is QRIS?</p>

            <p>
              QRIS stands for Quick Response Code Indonesian Standard. Launched by Bank Indonesia in 2019, it was designed to solve a very real problem: Indonesia's digital payment market was fragmented across dozens of competing e-wallets — GoPay, OVO, Dana, ShopeePay, LinkAja — each with its own QR code. A merchant would need to display five or six different QR codes, and customers could only pay with the one matching their app.
            </p>
            <p>
              QRIS unified all of this into a single standard. One QR code, any compatible wallet or bank app. The merchant displays one code; the customer scans it with whichever payment app they prefer. Simple, instant, and with zero transaction fees for micro-merchants.
            </p>

            <p className="text-2xl font-black text-slate-900">The scale is staggering</p>

            <p>To understand why QRIS matters, consider the numbers:</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse my-4">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 pr-6 text-sm font-black text-slate-900 uppercase tracking-widest">Figure</th>
                    <th className="text-left py-4 text-sm font-black text-slate-900 uppercase tracking-widest">Description</th>
                  </tr>
                </thead>
                <tbody className="text-base">
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">56.3 million</td>
                    <td className="py-4 text-slate-600">Registered merchants (Q1 2025)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">38.1 million</td>
                    <td className="py-4 text-slate-600">Of which are MSMEs (micro, small &amp; medium enterprises)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">6.05 billion</td>
                    <td className="py-4 text-slate-600">Transactions in H1 2025</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">&sim;IDR 579 trillion</td>
                    <td className="py-4 text-slate-600">Transaction value in H1 2025 (~&euro;33 billion)</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-4 pr-6 font-black text-primary whitespace-nowrap">47.8 million</td>
                    <td className="py-4 text-slate-600">QRIS Tap (NFC) users since March 2025 launch</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              In practical terms, QRIS is accepted everywhere from Jakarta's modern malls to the smallest street-side kaki lima food cart in Yogyakarta. In March 2025, Bank Indonesia also launched QRIS Tap — an NFC-based contactless version — which already reached 47.8 million users within months of launch.
            </p>

            <p className="text-2xl font-black text-slate-900">Why European tourists are locked out</p>

            <p>
              Here's the catch. QRIS was built for Indonesia's domestic banking and e-wallet infrastructure. To use it, you need either a local Indonesian bank account (which requires a KITAS residence permit) or a local e-wallet like GoPay or OVO (which requires an Indonesian phone number and, for full functionality, local ID verification).
            </p>
            <p>
              As a European tourist or even a long-stay digital nomad on a visitor visa, you can't access any of these. So you're left with three unappealing options:
            </p>

            <div className="space-y-4 pl-2">
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">1.</span>
                <p>
                  <strong className="text-slate-900">Pay with your European debit or credit card</strong> — where it's accepted, which is mostly limited to hotels, upscale restaurants, and tourist-oriented businesses. Expect 1.5–3% foreign transaction fees plus unfavorable exchange rates.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">2.</span>
                <p>
                  <strong className="text-slate-900">Withdraw cash from ATMs</strong> — Indonesian ATMs typically charge 30,000–50,000 IDR per withdrawal (&euro;1.70–&euro;2.80), with limits of 1,250,000–2,500,000 IDR per transaction. Your European bank adds its own fees on top. Carrying large amounts of cash also comes with security risks.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-primary font-black text-xl">3.</span>
                <p>
                  <strong className="text-slate-900">Use money changers</strong> — which means dealing with variable rates, potential scams (especially in tourist areas like Kuta), and the inconvenience of always having the right denomination.
                </p>
              </div>
            </div>

            <p>
              Meanwhile, the Indonesian person next to you scans a QR code, pays instantly, and walks away. The transaction cost them nothing extra. The merchant got the money in seconds.
            </p>

            <p className="text-2xl font-black text-slate-900">Cross-border QRIS: progress, but not for Europe (yet)</p>

            <p>
              Bank Indonesia has been actively expanding QRIS internationally — but primarily within Asia. Through the ASEAN cross-border payment linkage initiative, QRIS now connects with Thailand's PromptPay, Malaysia's DuitNow, Singapore's PayNow, and several other regional systems. In August 2025, QRIS launched in Japan, and South Korea is joining in April 2026.
            </p>
            <p>
              This means a Thai tourist in Bali can scan a QRIS code and pay with their Thai banking app. A Singaporean can do the same. But a French, German, or Dutch traveler? No pathway exists — yet.
            </p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              This is precisely the gap that solutions like Lumifin are designed to bridge.
            </blockquote>

            <p>
              Giving European travelers access to local QR payment infrastructure without needing a local bank account or e-wallet.
            </p>

            <p className="text-2xl font-black text-slate-900">What this means for your next trip to Indonesia</p>

            <p>
              If you're planning to visit Indonesia — whether for a two-week holiday in Bali, a month of remote work in Canggu, or a business trip to Jakarta — understanding QRIS is essential. It's not a payment "option" in Indonesia; it's increasingly the default. Many smaller merchants, transport services, and even market vendors now prefer or exclusively accept QRIS over cash.
            </p>
            <p>
              The good news: the infrastructure is mature, secure, and regulated by Bank Indonesia. The technology works flawlessly. The only missing piece is access for international visitors from outside Asia.
            </p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              And that's exactly what we're working on at Lumifin. Stay tuned.
            </blockquote>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <div className="mt-8 p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-100 text-center space-y-4">
              <p className="text-xl font-black text-slate-900">
                Want to be the first to pay with QR codes in Indonesia as a European?
              </p>
              <p className="text-lg text-slate-500 font-medium">
                Join the Lumifin early access list at <span className="text-primary font-black">lumifin.io</span>
              </p>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
