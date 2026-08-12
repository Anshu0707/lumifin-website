import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation, Trans } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Check, Mail } from 'lucide-react';

const BASE = 'unsubscribe';

/** Netlify Forms expects a urlencoded body with the form-name field. */
function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

export default function UnsubscribePage() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Newsletter links carry the recipient's address (?email=...), so the field
  // arrives pre-filled and unsubscribing is a single click.
  useEffect(() => {
    const fromLink = new URLSearchParams(window.location.search).get('email');
    if (fromLink) setEmail(fromLink);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'unsubscribe', email, reason }),
    })
      .then(() => setSubmitted(true))
      .catch(() => setError(true));
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title={t(`${BASE}.seo.title`)}
        description={t(`${BASE}.seo.description`)}
        canonical="/unsubscribe"
        noindex
      />
      <Header />

      <main className="pt-40 pb-32 px-6 md:px-8">
        <div className="max-w-xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">
                {t(`${BASE}.doneTitle`)}
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                {t(`${BASE}.doneBody`)}
              </p>
              <p className="text-base text-slate-500 font-normal leading-relaxed">
                <Trans
                  i18nKey={`${BASE}.doneContact`}
                  components={{
                    1: <a href="mailto:info@lumifin.io" className="text-primary font-bold hover:underline" />,
                  }}
                />
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center space-y-5">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto">
                  <Mail className="w-9 h-9 text-slate-400" />
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-tight">
                  {t(`${BASE}.title`)}
                </h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                  {t(`${BASE}.subtitle`)}
                </p>
              </div>

              <form
                name="unsubscribe"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <input type="hidden" name="form-name" value="unsubscribe" />
                <p className="hidden">
                  <label>
                    {t(`${BASE}.botFieldLabel`)} <input name="bot-field" />
                  </label>
                </p>

                <label htmlFor="unsub-email" className="sr-only">
                  {t(`${BASE}.emailLabel`)}
                </label>
                <input
                  id="unsub-email"
                  type="email"
                  name="email"
                  placeholder={t(`${BASE}.emailPlaceholder`)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-8 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg"
                />

                <label htmlFor="unsub-reason" className="sr-only">
                  {t(`${BASE}.reasonLabel`)}
                </label>
                <textarea
                  id="unsub-reason"
                  name="reason"
                  rows={3}
                  placeholder={t(`${BASE}.reasonPlaceholder`)}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-8 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg resize-none"
                />

                <button
                  type="submit"
                  className="hero-gradient text-white px-8 py-5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-lg"
                >
                  {t(`${BASE}.submit`)}
                </button>

                {error && (
                  <p className="text-center text-base text-red-600 font-medium">
                    <Trans
                      i18nKey={`${BASE}.error`}
                      components={{
                        1: <a href="mailto:info@lumifin.io" className="underline font-bold" />,
                      }}
                    />
                  </p>
                )}

                <p className="text-center text-base text-slate-400 font-normal leading-relaxed">
                  {t(`${BASE}.note`)}
                </p>
              </form>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
