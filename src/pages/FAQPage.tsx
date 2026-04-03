import React from 'react';
import { faqs } from '../constants/faqs';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-40 pb-32 px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase hover:gap-4 transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          
          <div className="space-y-6">
            <span className="text-primary font-bold text-xs tracking-widest uppercase">Support & Information</span>
            <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              Everything you need to know about Lumi, our digital wallet, and how we're redefining travel in South East Asia.
            </p>
          </div>
          
          <div className="space-y-6 pt-12">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-slate-50 rounded-[2rem] overflow-hidden transition-all duration-300 hover:bg-slate-100"
              >
                <summary className="flex justify-between items-center p-8 cursor-pointer list-none">
                  <h4 className="text-xl font-bold text-slate-900">{faq.question}</h4>
                  <ChevronDown className="w-6 h-6 text-slate-400 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
