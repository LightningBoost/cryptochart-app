import AsyncStorage from '@react-native-async-storage/async-storage';
import {getLocales} from 'react-native-localize';

export interface LanguageDetector {
  type:
    | 'languageDetector'
    | 'backend'
    | 'logger'
    | 'postProcessor'
    | 'i18nFormat'
    | '3rdParty';
  async: boolean;
  detect: (callback: (language: string) => string) => Promise<string>;
  init: () => void;
  cacheUserLanguage: (language: string) => Promise<void>;
}

const languageDetector: LanguageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: (language: string) => string): Promise<string> => {
    const storedLanguage = await AsyncStorage.getItem('language');
    if (storedLanguage) {
      return callback(storedLanguage);
    }
    const phoneLanguage = getLocales();
    return callback(phoneLanguage[0].languageCode);
  },

  init: (): void => {}, // eslint-disable-line @typescript-eslint/no-empty-function
  cacheUserLanguage: async (language: string): Promise<void> => {
    await AsyncStorage.setItem('language', language);
  },
};

export default languageDetector;
