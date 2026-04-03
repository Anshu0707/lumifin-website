import React from 'react';
import { Link } from 'react-router-dom';
import { faqs } from '../constants/faqs';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function FAQSection() {
  const landingFaqs = faqs.slice(0, 5);

  return (
    <section id="faq" className="py-32 bg-white reveal active">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-center mb-20 space-y-6">
          <span className="text-primary font-bold text-xs tracking-widest uppercase">Support & Information</span>
          <h2 className="text-6xl font-black tracking-tighter text-slate-900">FAQ</h2>
          <p className="text-slate-500 text-xl font-medium">Everything you need to know about Lumi.</p>
        </div>
        
        <div className="space-y-4">
          {landingFaqs.map((faq, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
        
        <div className="mt-16 text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-10 py-5 rounded-2xl font-black text-xl hover:bg-primary/20 transition-all"
          >
            More FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
