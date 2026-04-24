import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { ArrowLeft, Home, BookOpen, HelpCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Head back to Lumifin's homepage or explore our travel payment guides."
        noindex={true}
      />
      <Header />

      <main className="pt-40 pb-32 px-8 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="text-8xl font-black text-primary">404</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
            This page got lost in transit
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mx-auto">
            Just like cash at a Bangkok exchange booth, this page seems to have disappeared. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 hero-gradient text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              <Home className="w-4 h-4" /> Home
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
            >
              <BookOpen className="w-4 h-4" /> Blog
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
            >
              <HelpCircle className="w-4 h-4" /> FAQ
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
