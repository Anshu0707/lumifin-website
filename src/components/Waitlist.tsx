import React, { useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "waitlist",
          email,
        }).toString(),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
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

          {status === "success" ? (
            <p className="text-primary font-bold text-xl mt-12">
              {t("waitlist.success")}
            </p>
          ) : (
            <form
              name="waitlist"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mt-12"
            >
              <input type="hidden" name="form-name" value="waitlist" />
              <p className="hidden">
                <label>
                  {t("waitlist.botFieldLabel")} <input name="bot-field" />
                </label>
              </p>
              <input
                type="email"
                name="email"
                placeholder={t("waitlist.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-8 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-lg"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="hero-gradient text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all disabled:opacity-70"
              >
                {status === "submitting" ? t("waitlist.submitting") : t("waitlist.submit")}
              </button>
              {status === "error" && (
                <p className="text-red-500 font-medium text-sm mt-2 sm:mt-0 sm:self-center">
                  {t("waitlist.error")}
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
