import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';

export default function CashIsKingPage() {
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
              Travel &middot; Money &middot; Southeast Asia
            </span>

            <h1 className="mt-10 text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
              Cash Is King? The Real Problems with Carrying Cash in Thailand, Vietnam, and Indonesia
            </h1>

            <p className="mt-6 text-xl text-slate-500 font-medium leading-relaxed italic">
              Everyone told me to bring cash. Here's what they didn't tell me.
            </p>

            <div className="mt-10 pb-10 border-b border-slate-200 flex flex-wrap items-center gap-x-8 gap-y-3 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> Lumi Blog
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> 8 min read
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Southeast Asia Travel
              </span>
            </div>

            <div className="mt-10 rounded-3xl overflow-hidden">
              <img
                src="/assets/blog/cash-is-king-cover.png"
                alt="Cash vs QR payments in Southeast Asia"
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
              You land in Bangkok. It's 11pm, you're jet-lagged, the airport is loud, and somewhere between baggage claim and the exit, you start panicking about cash.
            </p>
            <p>
              How much do I need? Should I exchange here or wait? Is the ATM going to swallow my card? Is this enough for the week?
            </p>
            <p>
              Almost every first-time traveller to Southeast Asia goes through this exact loop. And almost every seasoned travel forum, blog post, and well-meaning friend has the same advice: bring cash. Lots of it. Cash is king out there.
            </p>
            <p>
              Here's the thing — that advice made sense fifteen years ago. I'm not sure it does anymore. And after spending real time in Thailand, Vietnam, and Indonesia, I started noticing just how much friction, risk, and money that old habit was quietly costing me.
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-2xl font-black text-slate-900">The moment you realise cash has a cost</p>

            <p>
              My first night in Ho Chi Minh City, I changed $200 at the airport. The rate was bad — I knew it was bad — but I was tired and I just wanted to move. Later I found out I'd lost the equivalent of about $18 in that one transaction. Not a disaster. But not nothing either.
            </p>
            <p>
              Over the next few days, I hit an ATM twice because I underestimated how much I'd spend. Each withdrawal came with a flat fee from the local bank, plus whatever my home bank charged on top, plus a currency conversion margin buried somewhere in the small print. By the time I did the maths at the end of the trip, I'd paid somewhere north of &euro;10, just in fees to access my own money.
            </p>
            <p>
              Nobody really talks about this part. The "cash is king" advice doesn't come with a footnote that says: also, getting that cash will cost you more than you think, every single time.
            </p>

            <p className="text-2xl font-black text-slate-900">The exchange rate maze</p>

            <p>
              If you've ever stood in front of three different currency exchange booths at a Thai airport and tried to figure out which one is actually giving you the best deal — you know the feeling. The numbers are big (you're dealing in thousands of baht), which makes it hard to eyeball whether you're getting a good rate or a terrible one.
            </p>
            <p>
              Airport exchanges are almost always the worst option. Everyone knows this in theory, but when you've just landed and you need baht or dong or rupiah right now, the booths right there are extremely convenient. So you take the hit.
            </p>
            <p>
              The local exchanges in tourist areas are better, but "better" is relative. And even the ones that advertise no commission often make it back through a slightly worse rate. ATMs give you something close to the real interbank rate, but then add their own fees on top. There is no clean option. Every path has a cost, and most of them are intentionally difficult to compare.
            </p>
            <p>
              You spend so much energy trying to lose as little money as possible that you forget you're supposed to be on holiday.
            </p>

            <p className="text-2xl font-black text-slate-900">The stuff nobody warns you about</p>

            <p>
              Losing cash is forever. That sounds obvious, but it hits differently when it happens. A friend of mine had her purse lifted on Khao San Road — just the cash, gone. No dispute to file, no chargeback, no fraud protection. Just gone. She spent the next two days figuring out how to get more money while also trying not to let it ruin her trip. And even when you're not out in the crowd, the risk doesn't really go away.
            </p>
            <p>
              Keeping cash in your hotel room isn't as safe as it sounds. Unless you're staying in a high-end property, there's always a lingering doubt — what if something goes missing from your luggage? It's not theoretical. I've had friends this has happened to.
            </p>
            <p>
              Pickpocketing is real in high-tourist areas across all three countries. Night markets, busy street food spots, tuk-tuks, crowded temples — these are the places you most want to be. And it gets worse at night.
            </p>
            <p>
              Imagine being on a walking street — crowded, loud, packed with people — and suddenly needing cash. Pulling out your wallet in that moment doesn't just feel inconvenient, it feels risky. These are exactly the environments where pickpocketing is most common, and they're also exactly where carrying a thick wad of cash becomes a liability. The anxiety of it is low-grade but constant. Where's my wallet? Did I just feel something? How much cash do I have left?
            </p>
            <p>
              There's also the ATM problem that no one really prepares you for: the machines aren't always working. Or they're simply out of cash. Or they have withdrawal limits so low that you need to do two or three separate transactions just to get enough for a few days. In smaller towns in Vietnam or the outer islands of Indonesia, finding a working ATM at all can eat up a real chunk of your afternoon.
            </p>

            <p className="text-2xl font-black text-slate-900">The daily grind of cash</p>

            <p>
              Then there's just the daily friction of it.
            </p>
            <p>
              Counting out unfamiliar notes while a line of people waits behind you. Handing over what you think is the right amount and having no idea if the change you get back is correct. Trying to break a large bill at a small street stall and watching the vendor's face fall because they don't have change and now neither of you knows what to do.
            </p>
            <p>
              In Vietnam especially, the numbers are enormous — you're dealing in millions of dong for everyday transactions. It sounds exciting until you're at a caf&eacute; trying to remember whether 85,000 is less than one dollar or more, while someone waits for you to pay.
            </p>
            <p>
              And every few days, you have to do the whole thing again. Find an ATM. Hope it works. Pay the fees. Count the notes. Start over.
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <p className="text-2xl font-black text-slate-900">What's actually happening on the ground</p>

            <p>
              Here's the part that surprised me most: the locals aren't doing any of this.
            </p>
            <p>
              In Bangkok's weekend markets, vendors have QR codes taped to their stalls. At street food spots in Hanoi, the lady running the pho cart holds up her phone and the person in front of me scans and pays without breaking stride. In Bali, the family-run warung down the road from my guesthouse had a QRIS code on the counter and most of their regulars just used it without thinking.
            </p>
            <p>
              Thailand's PromptPay, Vietnam's VietQR, Indonesia's QRIS — these systems exist, they work, and they're used millions of times a day. The infrastructure for a cashless transaction is already there. The locals figured this out. The tourist advice just hasn't caught up yet.
            </p>
            <p>
              The "cash is king" belief persists partly because it used to be true, and partly because old travel advice is very sticky. But the ground reality in these three countries has shifted significantly in the last few years, and it's still shifting. Walking around with a wallet full of local currency is starting to feel less like a safety net and more like a habit that doesn't quite fit anymore.
            </p>

            <p className="text-2xl font-black text-slate-900">Is there a better way?</p>

            <p>
              The honest answer is: it depends on where you're going and what you're doing. Deep rural areas still run on cash. Some older vendors won't have a QR code. You'll probably still need some local currency in your pocket, especially for smaller towns and more remote spots.
            </p>
            <p>
              But the idea that you need to arrive with a fat envelope of cash, budget for exchange fees, hunt for ATMs, and carry the constant low-level stress of losing it all? That's becoming less true with every trip. Mobile payments — particularly QR-based ones — are safer because there's nothing physical to lose or steal. They're more transparent because you can see exactly what you paid and in what currency. And they're fast in a way that fumbling with unfamiliar notes simply isn't.
            </p>
            <p>
              The question isn't really "cash or no cash." It's whether you want to keep absorbing all the hidden costs — the fees, the bad rates, the risk, the hassle — out of habit, or start travelling a little smarter.
            </p>

            <div className="text-center text-3xl text-slate-300 tracking-widest py-6">· · ·</div>

            <blockquote className="my-10 pl-8 border-l-4 border-primary italic text-2xl md:text-3xl font-black text-slate-900 leading-snug">
              Cash isn't king anymore. It's just familiar. And familiar isn't always the same thing as safe.
            </blockquote>

            <p>
              That's exactly why we're building Lumi — to remove the friction from how money moves across borders.
            </p>
            <p className="text-2xl font-black text-slate-900">
              Because paying for something, anywhere in the world, shouldn't be this hard.
            </p>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
