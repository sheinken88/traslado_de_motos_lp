"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface Translations {
  [key: string]: any;
}

const translations: { [key in Language]: Translations } = {
  es: {},
  en: {},
  pt: {}
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('es');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load translations
    const loadTranslations = async () => {
      try {
        const [esData, enData, ptData] = await Promise.all([
          fetch('/locales/es/translation.json').then(res => res.json()),
          fetch('/locales/en/translation.json').then(res => res.json()),
          fetch('/locales/pt/translation.json').then(res => res.json())
        ]);

        translations.es = esData;
        translations.en = enData;
        translations.pt = ptData;
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading translations:', error);
        setIsLoaded(true);
      }
    };

    loadTranslations();

    // Get saved language from localStorage (only on client side)
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && ['es', 'en', 'pt'].includes(savedLang)) {
        setCurrentLanguage(savedLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string | string[] => {
    if (!isLoaded) return key;
    
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return (typeof value === 'string' || Array.isArray(value)) ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};