import React from 'react';
import { motion } from 'motion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const team = [
  {
    name: "Pierre Lahbhabi",
    role: "CEO",
    img: "/PIERRE.png",
    objectPosition: "center 20%",
    linkedin: "https://www.linkedin.com/in/pierre-lahbabi/"
  },
  {
    name: "Gaurav Bansal",
    role: "COO",
    img: "/GAURAV.png",
    objectPosition: "center 15%",
    linkedin: "https://www.linkedin.com/in/gaurav-b-52728b11/"
  },
  {
    name: "Kinshuk Kukreti",
    role: "CTO",
    img: "/KINSHUK.png",
    objectPosition: "center 15%",
    linkedin: "https://www.linkedin.com/in/kinshuk-k-1269a999/"
  },
  {
    name: "Narendra Kumar",
    role: "Technical Lead",
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23d1d5db'/%3E%3Ccircle cx='200' cy='150' r='60' fill='%239ca3af'/%3E%3Cellipse cx='200' cy='320' rx='100' ry='80' fill='%239ca3af'/%3E%3C/svg%3E",
    objectPosition: "center 20%",
    linkedin: "https://www.linkedin.com/in/kinshuk-k-1269a999/"
  },
  {
    name: "Subhrat Tripathi",
    role: "Product Manager",
    img: "/SHUBRAT.png",
    objectPosition: "center 25%",
    linkedin: "https://www.linkedin.com/in/subhrattripathi071/"
  },
  {
    name: "Tanvi Nag",
    role: "Product Analyst",
    img: "/Tanvi-2.png",
    objectPosition: "center 10%",
    scale: "",
    linkedin: "https://www.linkedin.com/in/tanvinag28/"
  },
  {
    name: "Muskan Chawla",
    role: "Software Engineer",
    img: "/MUSKAN.png",
    objectPosition: "center 30%",
    linkedin: "https://www.linkedin.com/in/muskan115/"
  },
  {
    name: "Anshuman Naithani",
    role: "Software Engineer",
    img: "/ANSHUMAN.png",
    objectPosition: "center 30%",
    linkedin: "https://www.linkedin.com/in/anshuman-naithani/"
  }
];

export default function TeamPage() {
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
          <span className="text-primary font-bold text-xs tracking-widest uppercase">The Minds Behind Lumi</span>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            Meet the <span className="text-primary italic">Visionaries</span>.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            A diverse team of bankers, engineers, and travelers dedicated to breaking down financial borders.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square rounded-[3rem] overflow-hidden mb-8 shadow-xl group-hover:shadow-2xl transition-all">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  style={{ objectPosition: member.objectPosition }}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${member.scale || ''}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">{member.name}</h3>
              <p className="text-primary font-bold text-sm tracking-widest uppercase mb-4">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.section 
          id="careers"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 p-16 rounded-[4rem] bg-slate-900 text-white text-center space-y-8 scroll-mt-24"
        >
          <h2 className="text-5xl font-black tracking-tighter">Want to join the mission?</h2>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for travel and financial innovation.
          </p>
          <a href="mailto:careers@lumifin.io" className="inline-block hero-gradient text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
            Apply
          </a>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
