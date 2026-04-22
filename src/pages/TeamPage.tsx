import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const team = [
  {
    name: "Pierre Lahbabi",
    roleKey: "ceo",
    img: "/assets/team/PIERRE.png",
    objectPosition: "center 20%",
    linkedin: "https://www.linkedin.com/in/pierre-lahbabi/"
  },
  {
    name: "Gaurav Bansal",
    roleKey: "coo",
    img: "/assets/team/GAURAV.png",
    objectPosition: "center 15%",
    linkedin: "https://www.linkedin.com/in/gaurav-b-52728b11/"
  },
  {
    name: "Kinshuk Kukreti",
    roleKey: "cto",
    img: "/assets/team/KINSHUK.png",
    objectPosition: "center 15%",
    linkedin: "https://www.linkedin.com/in/kinshuk-k-1269a999/"
  },
  {
    name: "Narendra Kumar",
    roleKey: "technicalLead",
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23d1d5db'/%3E%3Ccircle cx='200' cy='150' r='60' fill='%239ca3af'/%3E%3Cellipse cx='200' cy='320' rx='100' ry='80' fill='%239ca3af'/%3E%3C/svg%3E",
    objectPosition: "center 20%",
    linkedin: "https://www.linkedin.com/in/kinshuk-k-1269a999/"
  },
  {
    name: "Subhrat Tripathi",
    roleKey: "productManager",
    img: "/assets/team/SHUBRAT.png",
    objectPosition: "center 25%",
    linkedin: "https://www.linkedin.com/in/subhrattripathi071/"
  },
  {
    name: "Tanvi Nag",
    roleKey: "productAnalyst",
    img: "/assets/team/Tanvi-2.png",
    objectPosition: "center 10%",
    scale: "",
    linkedin: "https://www.linkedin.com/in/tanvinag28/"
  },
  {
    name: "Muskan Chawla",
    roleKey: "softwareEngineer",
    img: "/assets/team/MUSKAN.png",
    objectPosition: "center 30%",
    linkedin: "https://www.linkedin.com/in/muskan115/"
  },
  {
    name: "Anshuman Naithani",
    roleKey: "softwareEngineer",
    img: "/assets/team/ANSHUMAN.png",
    objectPosition: "center 30%",
    linkedin: "https://www.linkedin.com/in/anshuman-naithani/"
  }
] as const;

export default function TeamPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About Us — Meet the Team Behind Lumifin"
        description="Meet the team building Lumifin: bankers, engineers, and travellers dedicated to making cross-border payments simple for Europeans in Southeast Asia."
        canonical="/team"
        structuredData={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About Us', url: '/team' }])}
      />
      <Header />

      <main className="pt-40 pb-32 px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-24"
        >
          <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('team.eyebrow')}</span>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            {t('team.titleBefore')} <span className="text-primary italic">{t('team.titleHighlight')}</span>{t('team.titleAfter')}
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            {t('team.subtitle')}
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
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${('scale' in member && member.scale) || ''}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-1">{member.name}</h3>
              <p className="text-primary font-bold text-sm tracking-widest uppercase mb-4">{t(`team.roles.${member.roleKey}`)}</p>
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
          <h2 className="text-5xl font-black tracking-tighter">{t('team.careersTitle')}</h2>
          <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            {t('team.careersBody')}
          </p>
          <div className="flex flex-col items-center gap-4">
            <a href="mailto:careers@lumifin.io" className="inline-block hero-gradient text-white px-12 py-6 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
              {t('team.apply')}
            </a>
            <Link to="/careers" className="inline-block text-slate-400 hover:text-white font-bold text-sm tracking-widest uppercase transition-colors">
              {t('team.seeOpenPositions')} &rarr;
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
