import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationAR from "./locales/ar/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language") || "en", // Default language
    fallbackLng: "en", // Fallback language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
