import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';

import i18next from 'i18next';

import languageDetector, {LanguageDetector} from './languageDetector';

const resources = {
  en: {
    translation: import('./resources/en.json'),
  },
  pt: {
    translation: import('./resources/pt.json'),
  },
  es: {
    translation: import('./resources/es.json'),
  },
};

i18next
  .use<LanguageDetector>(languageDetector)
  .use(initReactI18next)
  .init({
    lng: getLocales()[0].languageCode,
    fallbackLng: 'en',
    debug: false,
    interpolation: {escapeValue: false},
    keySeparator: false,
    nsSeparator: false,
    load: 'currentOnly',
    resources,
    defaultNS: 'main',
    ns: 'main',
  });

export default i18next;
