import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO, { breadcrumbSchema } from '../components/SEO';
import { ShieldCheck, Lock, Fingerprint, Eye, Server, ArrowLeft } from 'lucide-react';

const securityFeatures = [
  { icon: Lock, titleKey: 'encryption', descKey: 'encryptionDesc' },
  { icon: Fingerprint, titleKey: 'authentication', descKey: 'authenticationDesc' },
  { icon: Eye, titleKey: 'privacy', descKey: 'privacyDesc' },
  { icon: Server, titleKey: 'infrastructure', descKey: 'infrastructureDesc' },
  { icon: ShieldCheck, titleKey: 'compliance', descKey: 'complianceDesc' },
];

export default function SecurityPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('security.seo.title')}
        description={t('security.seo.description')}
        canonical="/security"
        structuredData={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Security', url: '/security' }])}
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <article className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6 mb-20"
          >
            <span className="text-primary font-bold text-xs tracking-widest uppercase">
              {t('security.eyebrow')}
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              {t('security.titleBefore')} <span className="text-primary italic">{t('security.titleHighlight')}</span>.
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              {t('security.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-3xl border border-slate-200 space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    {t(`security.features.${feature.titleKey}`)}
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {t(`security.features.${feature.descKey}`)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-12 text-lg text-slate-700 leading-[1.8] font-medium"
          >
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">{t('security.dataProtectionTitle')}</h2>
              <p>{t('security.dataProtectionBody')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">{t('security.regulatoryTitle')}</h2>
              <p>{t('security.regulatoryBody')}</p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">{t('security.reportTitle')}</h2>
              <p>
                {t('security.reportBody')}{' '}
                <a href="mailto:security@lumifin.io" className="text-primary font-bold hover:underline">
                  security@lumifin.io
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center text-sm text-slate-400 font-medium"
          >
            <p>{t('security.lastUpdated')}</p>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
