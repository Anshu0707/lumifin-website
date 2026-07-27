/**
 * i18n configuration for Lumifin.
 *
 * - Uses react-i18next with the browser language detector.
 * - Persists the user's choice in localStorage (key: "lumifin_lang").
 * - Keeps the document's <html lang="..."> attribute in sync so
 *   screen readers / search engines / CSS :lang() selectors work.
 * - Falls back to English for any missing key (safety net during
 *   incremental translation).
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const SUPPORTED_LANGUAGES = ["en", "fr"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANG_STORAGE_KEY = "lumifin_lang";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
    nonExplicitSupportedLngs: true, // "fr-FR" -> "fr"
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      // "path" first: /en/... always forces English, regardless of any saved
      // preference, so crawlers and direct links get the language the URL
      // promises. Everything else (root URLs like /faq) keeps the original
      // localStorage -> navigator -> htmlTag behaviour, unchanged.
      order: ["path", "localStorage", "navigator", "htmlTag"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
      lookupLocalStorage: LANG_STORAGE_KEY,
    },
    returnNull: false,
  });

// Keep <html lang> in sync with the active language.
const syncHtmlLang = (lng: string) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng.split("-")[0];
  }
};
syncHtmlLang(i18n.language || "en");
i18n.on("languageChanged", syncHtmlLang);

export default i18n;
