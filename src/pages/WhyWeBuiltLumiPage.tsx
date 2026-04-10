import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

export default function WhyWeBuiltLumiPage() {
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
              Founder's Note
            </span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              Why We Built <span className="text-primary italic">Lumi</span> — and the two moments I can't stop thinking about
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed italic">
              This isn't a polished origin story. It's just what actually happened.
            </p>

            <div className="mt-10 pb-10 border-b border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> Lumi Founder
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> 7 min read
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Personal
              </span>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden">
              <img
                src="/assets/blog/why-we-built-lumi-cover.png"
                alt="Why We Built Lumi"
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
            <p>I left my wallet at hotel during a trip to Malaysia.</p>
            <p>
              Not a big deal, I thought. I never really use it anyway. I live on my phone — everything's on there. I'd be fine.
            </p>
            <p>Later, I took a cab from my hotel to a restaurant.</p>
            <p className="text-2xl font-black text-slate-900">I was not fine.</p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-primary font-black text-sm tracking-[0.25em] uppercase">
              📍 Kuala Lumpur, Malaysia
            </p>

            <p>
              The cab pulled up outside the restaurant. The driver turned around and waited. I reached into my pocket for my wallet and — nothing. Just my phone.
            </p>
            <p>
              No worries, I thought. I'll pay on my phone somehow. But I didn't have any local payment app set up. My credit card wasn't linked to anything he could accept. He started showing me his QR code. Again. And again. Each time a little more frustrated, a little more resigned.
            </p>
            <p>
              I just stood there. Phone in hand. Money in my account. And absolutely no way to pay the man standing right in front of me.
            </p>
            <p>
              The shame of that moment was something specific. It wasn't the embarrassment of forgetting something — that happens to everyone. It was the feeling of being completely helpless in a situation that should not exist. I had a smartphone. I had money. The technology existed. And yet, somehow, none of it could close a ten-foot gap between me and a cab driver who just wanted to get paid for his work.
            </p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              I had everything I needed — except the one thing that actually mattered in that moment.
            </blockquote>

            <p>
              We sorted it eventually. Someone nearby stepped in to help. But I sat in my room that night and couldn't let it go. I started thinking about the real cost of how we move money across borders.
            </p>
            <p>
              Credit cards? Over 5% in total fees once you add up the foreign transaction charge, the currency conversion markup, and whatever your bank quietly takes. And that's when the merchant even has a card machine — which, in huge parts of the world, they simply don't.
            </p>
            <p>
              Cash? I always end up carrying three currencies "just in case," worrying about losing it, and coming home with a pile of useless leftover notes I'll never use again.
            </p>
            <p>
              Neither option was actually working. They were just the options we'd all quietly accepted.
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-primary font-black text-sm tracking-[0.25em] uppercase">
              📍 Northern Thailand, A Few Days Later
            </p>

            <p>
              I was walking through a small town — not a tourist spot, just a real place — when I saw an older woman sitting on the roadside with the most beautiful handmade artwork laid out around her. Intricate, colourful pieces that clearly took real skill and real time.
            </p>
            <p>I stopped. I wanted to buy something.</p>
            <p>
              She looked up and smiled, and in careful, broken English she pointed to a QR code she'd printed out and laminated. She'd clearly done this before — prepared for this exact situation, hoping for this exact customer.
            </p>
            <p className="text-2xl font-black text-slate-900">I felt sick.</p>
            <p>
              I only had euros on me. Not thai baht, not a working QR payment setup, nothing she could use. I tried to explain. She kept pointing at the code, switching between Thai and fragments of English, not understanding why this wasn't working. And then, slowly, she seemed to understand.
            </p>
            <p>She picked up one of her paintings and held it out to me.</p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              A gift. For free.<br />There were tears in her eyes.
            </blockquote>

            <p>
              I couldn't take it. I shook my head, said thank you, and walked away. Not because I didn't want it — I wanted it more than anything in that market. But because she needed to sell it, not give it away to some tourist who couldn't figure out how to pay her.
            </p>
            <p>That walk away was the moment everything became clear to me.</p>
            <p>
              She had prepared everything she could. A QR code. A smile. Hope. And the global payments system still failed her.
            </p>

            <p className="text-2xl font-black text-slate-900">That's when we decided to build something.</p>

            <p>
              The technology to fix this already exists. QR payments, digital wallets, interoperable systems — none of this is new. What's missing is something that brings it together in a way that actually works for the cab driver in KL and the artist on a roadside in Thailand, not just for people who are already plugged into the right apps and banks.
            </p>
            <p>That's what Lumi is trying to be.</p>
            <p>
              Not another fintech product for people who already have everything. Something genuinely more inclusive — that works whether you're the one travelling or the one waiting for a customer, whether you have a card machine or a laminated QR code, whether you're in a major city or a small town that the formal banking system forgot about.
            </p>
            <p>
              I think about that woman a lot. I don't know her name. I never got the painting. But every decision we make building Lumi, I ask myself the same question: would this have helped her?
            </p>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              If the answer is no, we're not done yet.
            </blockquote>

            <p>
              If you've ever been stuck on the wrong side of a broken payment — as a customer or a seller — I'd genuinely love to hear about it.
            </p>

            <p className="pt-6 text-xl font-black text-slate-900">— Lumi Founder</p>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
