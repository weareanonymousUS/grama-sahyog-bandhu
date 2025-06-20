import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'te';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    te: string;
  };
}

const translations: Translations = {
  appName: {
    en: 'Gram Sphoorthi',
    hi: 'ग्राम स्फूर्ति',
    te: 'గ్రామ స్ఫూర్తి'
  },
  loginTitle: {
    en: 'Welcome to Gram Sphoorthi',
    hi: 'ग्राम स्फूर्ति में आपका स्वागत है',
    te: 'గ్రామ స్ఫూర్తికి స్వాగతం'
  },
  loginSubtitle: {
    en: 'Direct Government Support for Rural Communities',
    hi: 'ग्रामीण समुदायों के लिए प्रत्यक्ष सरकारी सहायता',
    te: 'గ్రామీణ సమాజాలకు ప్రత్యక్ష ప్రభుత్వ మద్దతు'
  },
  mobileNumber: {
    en: 'Mobile Number',
    hi: 'मोबाइल नंबर',
    te: 'మొబైల్ నంబర్'
  },
  email: {
    en: 'Email',
    hi: 'ईमेल',
    te: 'ఇమెయిల్'
  },
  password: {
    en: 'Password',
    hi: 'पासवर्ड',
    te: 'పాస్‌వర్డ్'
  },
  fullName: {
    en: 'Full Name',
    hi: 'पूरा नाम',
    te: 'పూర్తి పేరు'
  },
  sendOTP: {
    en: 'Send OTP',
    hi: 'OTP भेजें',
    te: 'OTP పంపండి'
  },
  signIn: {
    en: 'Sign In',
    hi: 'साइन इन करें',
    te: 'సైన్ ఇన్'
  },
  signUp: {
    en: 'Sign Up',
    hi: 'साइन अप करें',
    te: 'సైన్ అప్'
  },
  verifyOTP: {
    en: 'Verify OTP',
    hi: 'OTP सत्यापित करें',
    te: 'OTP వెరిఫై చేయండి'
  },
  enterOTP: {
    en: 'Enter the 6-digit OTP sent to your mobile',
    hi: 'अपने मोबाइल पर भेजा गया 6-अंकीय OTP दर्ज करें',
    te: 'మీ మొబైల్‌కు పంపిన 6-అంకెల OTP ని నమోదు చేయండి'
  },
  or: {
    en: 'OR',
    hi: 'या',
    te: 'లేదా'
  },
  continueWithEmail: {
    en: 'Continue with Email',
    hi: 'ईमेल के साथ जारी रखें',
    te: 'ఇమెయిల్‌తో కొనసాగించండి'
  },
  continueWithPhone: {
    en: 'Continue with Phone',
    hi: 'फोन के साथ जारी रखें',
    te: 'ఫోన్‌తో కొనసాగించండి'
  },
  newUser: {
    en: "Don't have an account?",
    hi: 'खाता नहीं है?',
    te: 'ఖాతా లేదా?'
  },
  existingUser: {
    en: 'Already have an account?',
    hi: 'पहले से खाता है?',
    te: 'ఇప్పటికే ఖాతా ఉందా?'
  },
  helpTitle: {
    en: 'How can I help you today?',
    hi: 'आज मैं आपकी कैसे मदद कर सकता हूँ?',
    te: 'ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?'
  },
  helpMessage: {
    en: 'I can help you with government schemes, application processes, and more!',
    hi: 'मैं सरकारी योजनाओं, आवेदन प्रक्रियाओं और अन्य विषयों में आपकी मदद कर सकता हूँ!',
    te: 'నేను ప్రభుత్వ పథకాలు, దరఖాస్తు ప్రక్రియలు మరియు మరిన్నింటిలో మీకు సహాయం చేయగలను!'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
