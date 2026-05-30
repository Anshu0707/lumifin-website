import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const COUNTRIES = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
  'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania',
  'Luxembourg', 'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal',
  'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden',
] as const;

type FormState = {
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  nationality: string;
  sepa: string;
  vietnamStatus: string;
  phoneOs: string;
  appStoreEmail: string;
  discovered: string;
  discoveredGroup: string;
  usedQr: string;
  commit: string;
  consentRequired: boolean;
  consentMarketing: boolean;
};

const INITIAL: FormState = {
  fullName: '', email: '', whatsapp: '', country: '', nationality: '',
  sepa: '', vietnamStatus: '',
  phoneOs: '', appStoreEmail: '',
  discovered: '', discoveredGroup: '',
  usedQr: '', commit: '',
  consentRequired: false, consentMarketing: false,
};

const inputClass = 'w-full px-5 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-base';

export default function BetaApplicationPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [utm, setUtm] = useState({ source: '', medium: '', campaign: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
    });
  }, []);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const body = new URLSearchParams({
        'form-name': 'beta-application',
        fullName: form.fullName,
        email: form.email,
        whatsapp: form.whatsapp,
        country: form.country,
        nationality: form.nationality,
        sepa: form.sepa,
        vietnamStatus: form.vietnamStatus,
        phoneOs: form.phoneOs,
        appStoreEmail: form.appStoreEmail,
        discovered: form.discovered,
        discoveredGroup: form.discoveredGroup,
        usedQr: form.usedQr,
        commit: form.commit,
        consentRequired: form.consentRequired ? 'yes' : 'no',
        consentMarketing: form.consentMarketing ? 'yes' : 'no',
        utm_source: utm.source,
        utm_medium: utm.medium,
        utm_campaign: utm.campaign,
      });
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-black tracking-tight text-slate-900 mt-12 mb-2 pb-2 border-b border-slate-200">
      {children}
    </h2>
  );

  const Label = ({ children, required = false }: { children: React.ReactNode; required?: boolean }) => (
    <label className="block text-sm font-bold text-slate-700 mb-2">
      {children} {required && <span className="text-primary">*</span>}
    </label>
  );

  const RadioGroup = ({
    name, value, options, onChange,
  }: { name: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) => (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${value === opt.value ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-primary focus:ring-primary"
          />
          <span className="font-medium text-slate-700">{opt.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t('beta.seo.title')}
        description={t('beta.seo.description')}
        canonical="/beta"
        noindex
      />
      <Header />

      <main className="pt-32 pb-32 px-6 md:px-8">
        <article className="max-w-2xl mx-auto">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8 pt-16"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-slate-900">{t('beta.success.title')}</h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">{t('beta.success.body')}</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 mb-12"
              >
                <span className="block text-primary font-black text-xs tracking-[0.3em] uppercase">{t('beta.eyebrow')}</span>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
                  {t('beta.title')}
                </h1>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  {t('beta.intro.what')}
                </p>
                <p className="text-lg text-slate-600 font-medium leading-relaxed">
                  {t('beta.intro.testing')}
                </p>
                <p className="text-base text-slate-500 font-medium leading-relaxed italic">
                  {t('beta.intro.commitment')}
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                name="beta-application"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input type="hidden" name="form-name" value="beta-application" />
                <input type="hidden" name="utm_source" value={utm.source} />
                <input type="hidden" name="utm_medium" value={utm.medium} />
                <input type="hidden" name="utm_campaign" value={utm.campaign} />
                <p className="hidden">
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>

                <p className="text-xs text-slate-500 font-medium"><span className="text-primary">*</span> {t('beta.requiredHint')}</p>

                {/* CONTACT */}
                <SectionHeading>{t('beta.sections.contact')}</SectionHeading>

                <div>
                  <Label>{t('beta.fields.fullName')}</Label>
                  <input type="text" name="fullName" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={inputClass} placeholder={t('beta.fields.fullNamePlaceholder')} />
                </div>

                <div>
                  <Label required>{t('beta.fields.email')}</Label>
                  <input type="email" name="email" value={form.email} onChange={(e) => update('email', e.target.value)} required className={inputClass} placeholder={t('beta.fields.emailPlaceholder')} />
                </div>

                <div>
                  <Label>{t('beta.fields.whatsapp')}</Label>
                  <input type="tel" name="whatsapp" value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} className={inputClass} placeholder={t('beta.fields.whatsappPlaceholder')} />
                  <p className="text-xs text-slate-500 mt-1">{t('beta.fields.whatsappHint')}</p>
                </div>

                <div>
                  <Label>{t('beta.fields.country')}</Label>
                  <select name="country" value={form.country} onChange={(e) => update('country', e.target.value)} className={inputClass}>
                    <option value="">{t('beta.fields.countryPlaceholder')}</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>{t('beta.fields.nationality')}</Label>
                  <input type="text" name="nationality" value={form.nationality} onChange={(e) => update('nationality', e.target.value)} className={inputClass} placeholder={t('beta.fields.nationalityPlaceholder')} />
                </div>

                {/* ELIGIBILITY */}
                <SectionHeading>{t('beta.sections.eligibility')}</SectionHeading>

                <div>
                  <Label required>{t('beta.fields.sepa.label')}</Label>
                  <p className="text-xs text-slate-500 mb-3">{t('beta.fields.sepa.hint')}</p>
                  <RadioGroup
                    name="sepa"
                    value={form.sepa}
                    onChange={(v) => update('sepa', v)}
                    options={[
                      { value: 'yes', label: t('beta.fields.sepa.yes') },
                      { value: 'no', label: t('beta.fields.sepa.no') },
                    ]}
                  />
                </div>

                <div>
                  <Label required>{t('beta.fields.vietnamStatus.label')}</Label>
                  <RadioGroup
                    name="vietnamStatus"
                    value={form.vietnamStatus}
                    onChange={(v) => update('vietnamStatus', v)}
                    options={[
                      { value: 'live', label: t('beta.fields.vietnamStatus.live') },
                      { value: 'now', label: t('beta.fields.vietnamStatus.now') },
                      { value: 'soon', label: t('beta.fields.vietnamStatus.soon') },
                      { value: 'later', label: t('beta.fields.vietnamStatus.later') },
                    ]}
                  />
                </div>

                {/* DEVICE */}
                <SectionHeading>{t('beta.sections.device')}</SectionHeading>

                <div>
                  <Label>{t('beta.fields.phoneOs.label')}</Label>
                  <RadioGroup
                    name="phoneOs"
                    value={form.phoneOs}
                    onChange={(v) => update('phoneOs', v)}
                    options={[
                      { value: 'ios', label: 'iOS' },
                      { value: 'android', label: 'Android' },
                    ]}
                  />
                </div>

                <div>
                  <Label>{t('beta.fields.appStoreEmail.label')}</Label>
                  <p className="text-xs text-slate-500 mb-2">{t('beta.fields.appStoreEmail.hint')}</p>
                  <input type="email" name="appStoreEmail" value={form.appStoreEmail} onChange={(e) => update('appStoreEmail', e.target.value)} className={inputClass} placeholder={t('beta.fields.appStoreEmail.placeholder')} />
                </div>

                {/* ABOUT YOU */}
                <SectionHeading>{t('beta.sections.about')}</SectionHeading>

                <div>
                  <Label>{t('beta.fields.discovered.label')}</Label>
                  <select name="discovered" value={form.discovered} onChange={(e) => update('discovered', e.target.value)} className={inputClass}>
                    <option value="">{t('beta.fields.discovered.placeholder')}</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="whatsappGroup">{t('beta.fields.discovered.whatsappGroup')}</option>
                    <option value="reddit">Reddit</option>
                    <option value="friend">{t('beta.fields.discovered.friend')}</option>
                    <option value="expatGroup">{t('beta.fields.discovered.expatGroup')}</option>
                    <option value="googleSearch">{t('beta.fields.discovered.googleSearch')}</option>
                    <option value="other">{t('beta.fields.discovered.other')}</option>
                  </select>
                </div>

                <div>
                  <Label>{t('beta.fields.discoveredGroup.label')}</Label>
                  <input type="text" name="discoveredGroup" value={form.discoveredGroup} onChange={(e) => update('discoveredGroup', e.target.value)} className={inputClass} placeholder={t('beta.fields.discoveredGroup.placeholder')} />
                </div>

                <div>
                  <Label>{t('beta.fields.usedQr.label')}</Label>
                  <RadioGroup
                    name="usedQr"
                    value={form.usedQr}
                    onChange={(v) => update('usedQr', v)}
                    options={[
                      { value: 'yes', label: t('beta.fields.usedQr.yes') },
                      { value: 'no', label: t('beta.fields.usedQr.no') },
                    ]}
                  />
                </div>

                <div>
                  <Label>{t('beta.fields.commit.label')}</Label>
                  <RadioGroup
                    name="commit"
                    value={form.commit}
                    onChange={(v) => update('commit', v)}
                    options={[
                      { value: 'yes', label: t('beta.fields.commit.yes') },
                      { value: 'maybe', label: t('beta.fields.commit.maybe') },
                    ]}
                  />
                </div>

                {/* CONSENT */}
                <SectionHeading>{t('beta.sections.consent')}</SectionHeading>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-all">
                  <input
                    type="checkbox"
                    name="consentRequired"
                    checked={form.consentRequired}
                    onChange={(e) => update('consentRequired', e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">
                    {t('beta.fields.consentRequired')} <a href="/privacy" target="_blank" rel="noopener" className="text-primary underline">{t('beta.privacyLinkLabel')}</a>. <span className="text-primary">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:border-slate-300 transition-all">
                  <input
                    type="checkbox"
                    name="consentMarketing"
                    checked={form.consentMarketing}
                    onChange={(e) => update('consentMarketing', e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">
                    {t('beta.fields.consentMarketing')}
                  </span>
                </label>

                {/* SUBMIT */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || !form.consentRequired}
                    className="w-full hero-gradient text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status === 'submitting' ? t('beta.submitting') : t('beta.submit')}
                  </button>
                  {status === 'error' && (
                    <p className="mt-4 text-red-500 font-medium text-sm text-center">{t('beta.error')}</p>
                  )}
                </div>
              </motion.form>
            </>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
