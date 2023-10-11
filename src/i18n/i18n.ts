import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-locize-backend";
import LastUsed from "locize-lastused";

const isProduction = import.meta.env.PROD;

const locizeOptions = {
  projectId: import.meta.env.VITE_LOCIZE_PROJECTID as string,
  apiKey: import.meta.env.VITE_LOCIZE_APIKEY as string,
  referenceLng: import.meta.env.VITE_LOCIZE_REFLNG as string,
  version: import.meta.env.VITE_LOCIZE_VERSION as string,
};

if (!isProduction) {
  i18n.use(LastUsed);
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    backend: locizeOptions,
    locizeLastUsed: locizeOptions,
    saveMissing: !isProduction,
  });

export default i18n;
