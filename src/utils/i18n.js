import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import translate_en from '../locales/en/translation.json';
import translate_ru from '../locales/ru/translation.json';
import translate_zh from '../locales/zh/translation.json';


i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        detection: {
            order: ['queryString', 'cookie'],
            cache: ['cookie']
        },
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translation: translate_en
            },
            ru: {
                translation: translate_ru
            },
            zh: {
                translation: translate_zh
            },
        }

        
    })

export default i18n;