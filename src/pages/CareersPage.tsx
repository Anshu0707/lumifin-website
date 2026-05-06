import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { MapPin, Briefcase, X, Wifi } from 'lucide-react';

const JOB_KEYS = ['internship', 'gtm'] as const;

type SectionDef = { headingKey: string; contentKey?: string; listKey?: string };

const JOB_SECTIONS: Record<string, SectionDef[]> = {
  internship: [
    { headingKey: 'aboutLumifin', contentKey: 'aboutLumifinContent' },
    { headingKey: 'theRole', contentKey: 'theRoleContent' },
    { headingKey: 'whatYoullDo', listKey: 'whatYoullDoItems' },
    { headingKey: 'whatWereLookingFor', listKey: 'whatWereLookingForItems' },
    { headingKey: 'whyJoinUs', contentKey: 'whyJoinUsContent' },
  ],
  gtm: [
    { headingKey: 'aboutProduct', contentKey: 'aboutProductContent' },
    { headingKey: 'targetSegments', listKey: 'targetSegmentsItems' },
    { headingKey: 'userExperience', contentKey: 'userExperienceContent' },
    { headingKey: 'yourRole', listKey: 'yourRoleItems' },
    { headingKey: 'whatWereLookingFor', listKey: 'whatWereLookingForItems' },
    { headingKey: 'collaboration', contentKey: 'collaborationContent' },
  ],
};

export default function CareersPage() {
  const { t } = useTranslation();
  const [openJob, setOpenJob] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('careers.seo.title')}
        description={t('careers.seo.description')}
        canonical="/careers"
        structuredData={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }])}
      />
      <Header />

      <main className="pt-40 pb-32 px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-8"
        >
          <span className="text-primary font-bold text-xs tracking-widest uppercase">{t('careers.eyebrow')}</span>
          <h1 className="text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            {t('careers.title')} <span className="text-primary italic">{t('careers.titleHighlight')}</span>.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            {t('careers.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-20"
        >
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase">
            <Wifi className="w-4 h-4" /> {t('careers.badgeRemote')}
          </div>
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-xs font-black tracking-widest uppercase">
            <MapPin className="w-4 h-4" /> {t('careers.badgeFrance')}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {JOB_KEYS.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => setOpenJob(key)}
              className="group cursor-pointer p-8 rounded-3xl border border-slate-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex flex-wrap gap-3 mb-5">
                <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-black tracking-wider uppercase">
                  <Briefcase className="w-3.5 h-3.5" /> {t(`careers.jobs.${key}.type`)}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight mb-3">
                {t(`careers.jobs.${key}.title`)}
              </h3>

              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                {t(`careers.jobs.${key}.tagline`)}
              </p>

              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4" /> {t(`careers.jobs.${key}.location`)}
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
          <p>{t('careers.allRemote')}</p>
          <p className="mt-1">{t('careers.reachOut')}</p>
          <a
            href="mailto:careers@lumifin.io"
            className="inline-block mt-4 text-primary hover:text-primary/80 font-bold text-sm tracking-widest uppercase transition-colors"
          >
            careers@lumifin.io &rarr;
          </a>
        </motion.div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {openJob && (
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
                      {t(`careers.jobs.${openJob}.type`)}
                    </span>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1">
                      <Wifi className="w-3 h-3" /> {t('careers.badgeRemote')}
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {t('careers.badgeFrance')}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                    {t(`careers.jobs.${openJob}.title`)}
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
                {JOB_SECTIONS[openJob]?.map((section, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-black text-slate-900 mb-3">
                      {t(`careers.jobs.${openJob}.sections.${section.headingKey}`)}
                    </h3>
                    {section.contentKey && (
                      <p className="text-slate-600 font-medium leading-relaxed">
                        {t(`careers.jobs.${openJob}.sections.${section.contentKey}`)}
                      </p>
                    )}
                    {section.listKey && (
                      <ul className="space-y-2 mt-2">
                        {(t(`careers.jobs.${openJob}.sections.${section.listKey}`, { returnObjects: true }) as string[]).map((item, j) => (
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
                    {t('careers.applyNow')}
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
