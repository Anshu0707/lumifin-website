import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const isFr = current === "fr";

  const toggle = () => {
    void i18n.changeLanguage(isFr ? "en" : "fr");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`group relative flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all hover:border-primary hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${className}`}
      aria-label={isFr ? t("common.switchToEnglish") : t("common.switchToFrench")}
    >
      {/* Globe / translate icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
      </svg>
      <span className="text-primary">{isFr ? "FR" : "EN"}</span>
    </button>
  );
}
