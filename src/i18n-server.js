import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json';
import jaTranslation from './locales/ja.json';

const i18nServer = createInstance();
i18nServer
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            ja: { translation: jaTranslation },
        },
        lng: 'ja',
        fallbackLng: 'ja',
        interpolation: { escapeValue: false },
        initImmediate: false,
    });

export default i18nServer;
