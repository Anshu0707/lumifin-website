import React from 'react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: "The Future of Payments in South East Asia",
    excerpt: "How QR codes are revolutionizing the way travelers spend money across the region.",
    date: "March 28, 2026",
    author: "Pierre Lahbabi",
    category: "Fintech",
  },
  {
    id: 2,
    title: "5 Hidden Gems in Bangkok You Can Pay for with Lumi",
    excerpt: "From secret street food stalls to boutique galleries, discover the best of Bangkok.",
    date: "March 20, 2026",
    author: "Tanvi Nag",
    category: "Travel",
  },
  {
    id: 3,
    title: "Why We Built Lumi: A Founder's Story",
    excerpt: "The personal experiences that led us to create a borderless payment solution.",
    date: "March 15, 2026",
    author: "Gaurav Bansal",
    category: "Company",
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-40 pb-32 px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-24"
        >
          <span className="text-primary font-bold text-xs tracking-widest uppercase">Lumi Insights</span>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            The <span className="text-primary italic">Lumi</span> Blog.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Stories about travel, fintech, and the future of borderless payments in South East Asia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="mb-4">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase">
                  {post.category}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {post.author}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-slate-500 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
                
              </div>
            </motion.article>
          ))}
        </div>

        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 p-16 rounded-[4rem] bg-slate-50 text-center space-y-8 border border-slate-100"
        >
          <h2 className="text-5xl font-black tracking-tighter text-slate-900">Stay in the loop</h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Get the latest travel tips and fintech news delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-8 py-5 rounded-2xl bg-white border border-slate-200 focus:border-primary outline-none font-medium transition-all"
            />
            <button className="hero-gradient text-white px-8 py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all">
              Subscribe
            </button>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
