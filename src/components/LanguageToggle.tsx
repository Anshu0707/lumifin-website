import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/** Map the current pathname to its French (root) and English (/en) equivalents. */
function toAlternateLanguagePath(pathname: string): { fr: string; en: string; isEnglish: boolean } {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const frPath = pathname === "/en" ? "/" : pathname.slice("/en".length);
    return { fr: frPath, en: pathname, isEnglish: true };
  }
  const enPath = pathname === "/" ? "/en" : `/en${pathname}`;
  return { fr: pathname, en: enPath, isEnglish: false };
}

export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { fr, en, isEnglish } = toAlternateLanguagePath(location.pathname);
  const targetPath = isEnglish ? fr : en;

  return (
    <Link
      to={targetPath + location.search + location.hash}
      onClick={() => void i18n.changeLanguage(isEnglish ? "fr" : "en")}
      className={`group relative flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all hover:border-primary hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${className}`}
      aria-label={isEnglish ? t("common.switchToFrench") : t("common.switchToEnglish")}
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
      <span className="text-primary">{isEnglish ? "FR" : "EN"}</span>
    </Link>
  );
}
