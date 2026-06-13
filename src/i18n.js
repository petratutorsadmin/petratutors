import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import jaTranslation from './locales/ja.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            ja: { translation: jaTranslation }
        },
        fallbackLng: 'ja',
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
            // Only allow ja or en — anything else (e.g. "zh", "fr") falls back to ja
            convertDetectedLanguage: (lng) => (lng.startsWith('en') ? 'en' : 'ja'),
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
