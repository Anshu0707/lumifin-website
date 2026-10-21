import React from "react";
import { motion } from "motion/react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import StoreButtons from "./StoreButtons";
import WhatsAppIcon from "./WhatsAppIcon";
import { WHATSAPP_URL } from "../constants/contact";
import { localizedPath } from "../utils/localizedPath";

/**
 * Download section. Keeps id="waitlist" so the many existing /#waitlist
 * links across the site, in published blog posts and in sent emails keep
 * landing here.
 */
export default function Waitlist() {
  const { t } = useTranslation();
  const location = useLocation();

  const points = t("waitlist.points", { returnObjects: true }) as unknown as string[];

  return (
    <section
      id="waitlist"
      className="py-32 px-8 bg-gradient-to-b from-white to-slate-50 reveal"
    >
      <div className="max-w-3xl mx-auto text-center">
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

          <StoreButtons className="pt-2" />

          <div className="flex items-center justify-center gap-2 text-slate-500">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-black text-sm">
              €
            </span>
            <span className="text-sm font-medium">{t("hero.sepaBadge")}</span>
          </div>

          <Link
            to={localizedPath("/eligibility", location.pathname)}
            className="inline-block text-sm font-bold text-primary hover:underline underline-offset-4"
          >
            {t("hero.checkEligibility")}
          </Link>

          {/* How to claim the reward: three steps, the last one actionable. */}
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            {Array.isArray(points) &&
              points.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-4"
                >
                  <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[11px] font-black">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">
                    {p}
                  </span>
                </li>
              ))}
          </ol>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:-translate-y-0.5 hover:shadow-2xl transition-all"
          >
            <WhatsAppIcon className="w-6 h-6 shrink-0" />
            {t("waitlist.whatsappCta")}
          </a>

          <p className="text-xs text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            {t("hero.creditTerms")}
          </p>

          <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto">
            <Trans
              i18nKey="waitlist.reachOut"
              components={{
                1: (
                  <a
                    href="mailto:info@lumifin.io"
                    className="text-primary font-bold hover:underline"
                  />
                ),
              }}
            />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
