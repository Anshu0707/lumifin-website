import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Briefcase, Clock, X, Wifi } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: "Internship — Founder's Associate",
    tagline: "Join the founding team and help shape the future of cross-border payments from day one.",
    type: "Internship",
    location: "Remote — France",
    description: [
      {
        heading: "About Lumifin",
        content: "Lumifin is an early-stage fintech aiming to reinvent cross-border payments between Europe and Asia. Founded by an \u00C9cole Polytechnique graduate with extensive experience in finance, technology, and international operations, the company is building a service that makes international transfers as simple and transparent as a local payment. Our approach combines blockchain payment rails, regulated stablecoins, and a strong focus on user experience and regulatory compliance."
      },
      {
        heading: "The Role",
        content: "We operate at the intersection of financial infrastructure, international operations, and digital product design. Joining Lumifin means entering a fast-moving environment where decisions are made quickly, problems are tackled head-on, and every team member has real impact. As a Founder's Associate, you'll work directly with the founder across strategy, operations, product, and growth."
      },
      {
        heading: "What You'll Do",
        list: [
          "Conduct market research and competitive analysis to identify opportunities in cross-border payments",
          "Support the development and execution of go-to-market strategies across Europe and Southeast Asia",
          "Help build partnerships with local merchants, payment providers, and distribution channels",
          "Contribute to product development by gathering user feedback and translating it into actionable insights",
          "Assist with investor relations, pitch decks, and fundraising preparation",
          "Take ownership of key operational projects — from regulatory research to onboarding workflows",
        ],
      },
      {
        heading: "What We're Looking For",
        list: [
          "Currently enrolled in or recently graduated from a top-tier university (business, engineering, or related field)",
          "Strong analytical and problem-solving skills with a bias for action",
          "Genuine interest in fintech, payments, or emerging markets",
          "Comfortable working in a fast-paced, ambiguous environment with minimal structure",
          "Excellent communication skills in English (French is a plus)",
          "Self-starter mentality — you don't wait to be told what to do",
        ],
      },
      {
        heading: "Why Join Us",
        content: "This isn't a typical internship where you shadow someone or handle admin tasks. You'll be embedded in the founding team, working on problems that directly shape the company's trajectory. You'll gain first-hand experience in building a fintech from scratch — from product and strategy to fundraising and operations. If you're looking for real responsibility and the chance to make a tangible impact early in your career, this is it."
      },
    ],
  },
  {
    id: 2,
    title: "Go-to-Market (GTM) Expert",
    tagline: "Lead our launch strategy and drive user acquisition across Europe and Southeast Asia.",
    type: "Flexible (advisory, operational, potential co-founder)",
    location: "Remote — France",
    description: [
      {
        heading: "About the Product",
        content: "Our solution is a payment service designed for European travelers in Southeast Asia. It allows them to make payments at lower costs using the local QR-code payment systems that are widely adopted across the region. With Lumifin, travelers can pay like locals, using only their mobile phone — no cash, no cards — at any merchant, and at a significantly lower cost than existing alternatives."
      },
      {
        heading: "Target Segments",
        list: [
          "Students",
          "Expatriates",
          "Digital nomads",
          "Retirees",
          "People visiting family or friends in the region",
          "Travelers with ongoing personal or professional connections",
        ],
      },
      {
        heading: "User Experience",
        content: "They download the app, create an account, verify their identity, and top up a wallet via their bank. They can then make payments instantly by scanning local QR codes in Thailand, Vietnam, Indonesia, with more countries to follow."
      },
      {
        heading: "Your Role",
        list: [
          "Challenging and refining our Go-to-Market strategy",
          "Executing the plan to drive user acquisition",
          "Orchestrating multiple acquisition channels: online marketing, offline activation, and partnerships",
          "Showcasing the benefits of the service across relevant touchpoints that reach frequent travelers",
          "Supporting promotional initiatives with local merchants both in Europe (pre-departure) and in Southeast Asia (on-the-ground)",
        ],
      },
      {
        heading: "What We're Looking For",
        list: [
          "Hands-on experience launching consumer products in a start-up environment",
          "A solid track record of building and scaling a substantial user base",
          "The ability to bring best practices, insights into what works (and what doesn't)",
          "Strong execution discipline across all stages of the GTM process",
        ],
      },
      {
        heading: "Collaboration",
        content: "Collaboration terms are flexible (advisory, operational role, potential co-founder, etc.) and can be adapted to the person's preferences and availability. We are particularly interested in profiles who can bring structure, execution excellence, and practical experience to help us scale efficiently and successfully."
      },
    ],
  },
];

export default function CareersPage() {
  const [openJob, setOpenJob] = useState<number | null>(null);
  const selectedJob = jobs.find((j) => j.id === openJob);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-40 pb-32 px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-8"
        >
          <span className="text-primary font-bold text-xs tracking-widest uppercase">Careers</span>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            Work With <span className="text-primary italic">Us</span>.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Join an early-stage fintech reinventing how money moves between Europe and Asia.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-20"
        >
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase">
            <Wifi className="w-4 h-4" /> Remote
          </div>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase">
            <MapPin className="w-4 h-4" /> France
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setOpenJob(job.id)}
              className="group cursor-pointer p-8 rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-black tracking-wider uppercase">
                  <Briefcase className="w-3.5 h-3.5" /> {job.type}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight mb-3">
                {job.title}
              </h3>

              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                {job.tagline}
              </p>

              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4" /> {job.location}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center text-slate-400 text-sm font-medium"
        >
          <p>All positions are remote and open to candidates based in France.</p>
          <p className="mt-1">Don't see a role that fits? Reach out anyway — we'd love to hear from you.</p>
        </motion.div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenJob(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
              style={{ scrollbarGutter: 'stable', scrollBehavior: 'smooth' }}
            >
              <div className="sticky top-0 bg-white/90 backdrop-blur-xl rounded-t-3xl px-8 pt-8 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 z-10">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase">
                      {selectedJob.type}
                    </span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1">
                      <Wifi className="w-3 h-3" /> Remote
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> France
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    {selectedJob.title}
                  </h2>
                </div>
                <button
                  onClick={() => setOpenJob(null)}
                  className="p-2 rounded-xl hover:bg-slate-100 transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="px-8 py-8 space-y-8">
                {selectedJob.description.map((section, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-black text-slate-900 mb-3">{section.heading}</h3>
                    {section.content && (
                      <p className="text-slate-600 font-medium leading-relaxed">{section.content}</p>
                    )}
                    {section.list && (
                      <ul className="space-y-2 mt-2">
                        {section.list.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-slate-600 font-medium leading-relaxed">
                            <span className="text-primary font-black mt-0.5">-</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className="pt-6 border-t border-slate-100">
                  <a
                    href="mailto:careers@lumifin.io"
                    className="inline-block hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
