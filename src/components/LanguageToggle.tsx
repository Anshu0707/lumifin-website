import React from "react";
import { useTranslation } from "react-i18next";

/**
 * EN | FR language toggle.
 * - Matches the existing header nav typography (uppercase, widest tracking, bold, small).
 * - Uses only existing color tokens: `text-primary` for active, `text-slate-500` for inactive.
 * - Keyboard accessible (native <button>) and labelled for screen readers.
 * - No layout weight: purely inline flex, zero margin surprises.
 */
export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  const change = (lng: "en" | "fr") => {
    if (lng !== current) {
      void i18n.changeLanguage(lng);
    }
  };

  const baseBtn =
    "cursor-pointer transition-colors focus:outline-none focus-visible:text-primary";
  const active = "text-primary";
  const inactive = "text-slate-500 hover:text-primary";

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      role="group"
      aria-label={t("common.language")}
    >
      <button
        type="button"
        onClick={() => change("en")}
        aria-label={t("common.switchToEnglish")}
        aria-pressed={current === "en"}
        className={`${baseBtn} ${current === "en" ? active : inactive}`}
      >
        EN
      </button>
      <span className="text-slate-300" aria-hidden="true">
        |
      </span>
      <button
        type="button"
        onClick={() => change("fr")}
        aria-label={t("common.switchToFrench")}
        aria-pressed={current === "fr"}
        className={`${baseBtn} ${current === "fr" ? active : inactive}`}
      >
        FR
      </button>
    </div>
  );
}
