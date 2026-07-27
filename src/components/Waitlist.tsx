import React, { useState } from "react";
import { motion } from "motion/react";
import { Trans, useTranslation } from "react-i18next";
import { Apple, Play, Clock } from "lucide-react";
import { SEPA_COUNTRIES } from "../constants/sepaCountries";

// App download links (shown after a successful signup).
const IOS_TESTFLIGHT_URL = "https://testflight.apple.com/join/vbVZTdTn";
const ANDROID_PLAY_URL = "https://play.google.com/store/apps/details?id=com.lumifin.app";

export default function Waitlist() {
  const [name, setName] = useState("");
  const [dialCode, setDialCode] = useState("+33");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { t } = useTranslation();

  // On localhost there is no Netlify form handler, so the POST can't succeed.
  // Let local previews still reach the download screen; the live site stays strict.
  const isLocalhost =
    typeof window !== "undefined" &&
    /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "waitlist",
          name,
          phone: `${dialCode} ${phone}`.trim(),
          email,
        }).toString(),
      });

      if (response.ok || isLocalhost) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus(isLocalhost ? "success" : "error");
    }
  };

  return (
    <section
      id="waitlist"
      className="py-32 bg-indigo-50/50 reveal active overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
      <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <span className="text-primary font-bold text-xs tracking-widest uppercase">
            {t("waitlist.eyebrow")}
          </span>
          <h2 className="text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
            {t("waitlist.titleBefore")}{" "}
            <span className="text-primary italic tracking-normal mr-2">
              {t("waitlist.amount")}
            </span>
            <span className="tracking-normal">{t("waitlist.titleAfter")}</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            {t("waitlist.subtitle")}
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" aria-hidden="true" />
            {t("waitlist.urgencyNote")}
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-black text-sm">€</span>
            <span className="text-sm font-medium">{t("hero.sepaBadge")}</span>
          </div>

          {status === "success" ? (
            <div className="mt-12 space-y-8">
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-slate-900">{t("waitlist.downloadTitle")}</h3>
                <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
                  {t("waitlist.downloadSubtitle")}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <a
                  href={IOS_TESTFLIGHT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all"
                >
                  <Apple className="w-6 h-6" aria-hidden="true" />
                  {t("waitlist.downloadIos")}
                </a>
                <a
                  href={ANDROID_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-3 hero-gradient text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all"
                >
                  <Play className="w-6 h-6" aria-hidden="true" />
                  {t("waitlist.downloadAndroid")}
                </a>
              </div>
              <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto bg-white/60 border border-slate-200 rounded-2xl px-6 py-4">
                {t("waitlist.redemptionNote")}
              </p>
              <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto">
                <Trans
                  i18nKey="waitlist.reachOut"
                  components={{
                    1: <a href="mailto:info@lumifin.io" className="text-primary font-bold hover:underline" />,
                  }}
                />
              </p>
            </div>
          ) : (
            <form
              name="waitlist"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-xl mx-auto mt-12"
            >
              <input type="hidden" name="form-name" value="waitlist" />
              <p className="hidden">
                <label>
                  {t("waitlist.botFieldLabel")} <input name="bot-field" />
                </label>
              </p>
              <input
                type="text"
                name="name"
                placeholder={t("waitlist.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-8 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg"
              />
              <div className="flex gap-3">
                <select
                  aria-label={t("waitlist.countryCodeLabel")}
                  value={dialCode}
                  onChange={(e) => setDialCode(e.target.value)}
                  className="w-32 shrink-0 px-4 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg"
                >
                  {SEPA_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.dial}>
                      {c.code} {c.dial}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("waitlist.phonePlaceholder")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-1 min-w-0 px-8 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder={t("waitlist.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-8 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="hero-gradient text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all disabled:opacity-70"
              >
                {status === "submitting" ? t("waitlist.submitting") : t("waitlist.submit")}
              </button>
              {status === "error" && (
                <p className="text-red-500 font-medium text-sm">
                  {t("waitlist.error")}
                </p>
              )}
            </form>
          )}
          {status !== "success" && (
            <p className="text-xs text-slate-400 font-medium max-w-2xl mx-auto pt-2">
              {t("hero.creditTerms")}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
