import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { WHATSAPP_URL } from '../constants/contact';

/** "Still stuck?" block, shown at the foot of every help centre page. */
export default function HelpContact() {
  const { t } = useTranslation();
  return (
    <section className="mt-20 rounded-3xl bg-slate-50 border border-slate-100 p-10 text-center space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          {t('helpCentre.contact.title')}
        </h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">
          {t('helpCentre.contact.body')}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-7 py-4 rounded-2xl font-black shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <WhatsAppIcon className="w-5 h-5 shrink-0" />
          {t('helpCentre.contact.whatsapp')}
        </a>
        <a
          href="mailto:info@lumifin.io"
          className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 border border-slate-200 px-7 py-4 rounded-2xl font-black hover:border-slate-300 transition-all"
        >
          <Mail className="w-5 h-5 shrink-0" aria-hidden="true" />
          {t('helpCentre.contact.email')}
        </a>
      </div>
    </section>
  );
}
