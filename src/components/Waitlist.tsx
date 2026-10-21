import React from "react";
import { motion } from "motion/react";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import StoreButtons from "./StoreButtons";
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

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            {Array.isArray(points) &&
              points.map((p, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-4"
                >
                  <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">
                    {p}
                  </span>
                </li>
              ))}
          </ul>

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
