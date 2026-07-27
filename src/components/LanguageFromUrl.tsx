import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Keeps i18n language in sync with the /en/ URL prefix during client-side
 * navigation. The i18next "path" detector (src/i18n/config.ts) only runs
 * once on init, so it correctly picks English on a fresh /en/... page load —
 * but React Router navigation between routes doesn't reload the page, so a
 * link from a French page straight into /en/faq (or vice versa) needs this
 * effect to actively switch languages.
 *
 * Deliberately one-directional: entering a /en/* path always forces English
 * (the URL is a promise to the visitor and to crawlers). Leaving /en/* does
 * NOT force French — root paths keep respecting whatever language the user
 * already has active (their saved preference), exactly as before this file
 * existed. Only LanguageToggle's own link intentionally crosses that back.
 */
export default function LanguageFromUrl() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const isEnglishPath = pathname === "/en" || pathname.startsWith("/en/");
    const current = (i18n.resolvedLanguage || i18n.language || "").split("-")[0];
    if (isEnglishPath && current !== "en") {
      void i18n.changeLanguage("en");
    }
  }, [pathname, i18n]);

  return null;
}
