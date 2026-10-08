/**
 * JobConnect Vanilla i18n Translation Engine
 * Full localization in English, Hindi, and Gujarati.
 */

import { getLanguage, setLanguage } from './state.js';

export const TRANSLATIONS = {
  en: {
    nav: {
      findJobs: 'Find Jobs',
      companies: 'Companies',
      salaries: 'Salaries',
      aiTools: 'AI Career Tools',
      login: 'Sign In',
      signup: 'Get Started',
      dashboard: 'Dashboard',
      postJob: 'Post a Job',
      logout: 'Log Out',
    },
    hero: {
      badge: '✨ #1 Next-Gen AI Career Ecosystem in India',
      title1: 'Connect with Opportunities That',
      titleHighlight: 'Redefine Your Career',
      subtitle: 'Discover 40,000+ top engineering, design, and product roles at visionary startups and Fortune 500 tech companies.',
      searchPlaceholder: 'Job title, keyword, or tech stack (e.g. React, Python)',
      locationPlaceholder: 'City or "Remote"',
      searchBtn: 'Search Jobs',
      popularSearches: 'Popular:',
    },
    stats: {
      activeJobs: 'Active Verified Jobs',
      companiesHiring: 'Companies Hiring',
      jobSeekers: 'Active Candidates',
      successRate: 'Hiring Match Rate',
    },
    roles: {
      seekerTitle: 'I am a Job Seeker',
      seekerDesc: 'Search top tech jobs, get AI resume feedback, 1-click apply, and track applications in real-time.',
      employerTitle: 'I am an Employer / Recruiter',
      employerDesc: 'Post vacancies, source pre-vetted candidates with skill filters, and schedule live video interviews.',
    },
    auth: {
      welcomeBack: 'Welcome Back',
      loginSubtitle: 'Sign in to access your JobConnect dashboard',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signInBtn: 'Sign In to Account',
      orContinueWith: 'Or continue with',
      noAccount: "Don't have an account?",
      createAccount: 'Sign up for free',
      demoFillHeader: 'Quick Test Demo Logins:',
      fillSeeker: 'Job Seeker Demo',
      fillEmployer: 'Employer Demo',
      fillAdmin: 'Admin Demo',
    },
    common: {
      loading: 'Loading...',
      save: 'Save Changes',
      cancel: 'Cancel',
      delete: 'Delete',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      apply: 'Apply Now',
      applied: 'Applied',
      viewDetails: 'View Details',
      remote: 'Remote',
      hybrid: 'Hybrid',
      onSite: 'On-site',
    },
  },
  hi: {
    nav: {
      findJobs: 'नौकरियां खोजें',
      companies: 'कंपनियां',
      salaries: 'वेतन विवरण',
      aiTools: 'AI करियर टूल्स',
      login: 'लॉग इन करें',
      signup: 'शुरुआत करें',
      dashboard: 'डैशबोर्ड',
      postJob: 'नौकरी पोस्ट करें',
      logout: 'लॉग आउट',
    },
    hero: {
      badge: '✨ भारत का #1 नेक्स्ट-जेन AI करियर प्लेटफॉर्म',
      title1: 'ऐसे अवसरों से जुड़ें जो आपके करियर को',
      titleHighlight: 'नई ऊंचाइयों पर ले जाएं',
      subtitle: 'शीर्ष इंजीनियरिंग, डिज़ाइन और उत्पाद भूमिकाओं की खोज करें और भारत की अग्रणी कंपनियों में काम करें।',
      searchPlaceholder: 'नौकरी का शीर्षक, कीवर्ड या कौशल (उदा. React, Python)',
      locationPlaceholder: 'शहर या "रिमोट"',
      searchBtn: 'नौकरियां खोजें',
      popularSearches: 'लोकप्रिय खोज:',
    },
    stats: {
      activeJobs: 'सक्रिय नौकरियां',
      companiesHiring: 'हायरिंग कंपनियां',
      jobSeekers: 'सक्रिय उम्मीदवार',
      successRate: 'सफल मैच दर',
    },
    roles: {
      seekerTitle: 'मैं नौकरी तलाशने वाला हूँ',
      seekerDesc: 'शीर्ष नौकरियां खोजें, AI रिज्यूम समीक्षा प्राप्त करें और तुरंत आवेदन करें।',
      employerTitle: 'मैं एक नियोक्ता / रिक्रूटर हूँ',
      employerDesc: 'नौकरियां पोस्ट करें, कुशल उम्मीदवारों को खोजें और साक्षात्कार शेड्यूल करें।',
    },
    auth: {
      welcomeBack: 'पुनः स्वागत है',
      loginSubtitle: 'अपने JobConnect खाते में साइन इन करें',
      emailLabel: 'ईमेल पता',
      passwordLabel: 'पासवर्ड',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      signInBtn: 'साइन इन करें',
      orContinueWith: 'या इसके साथ जारी रखें',
      noAccount: 'क्या आपके पास खाता नहीं है?',
      createAccount: 'निःशुल्क खाता बनाएं',
      demoFillHeader: 'त्वरित डेमो लॉगिन:',
      fillSeeker: 'उम्मीदवार डेमो',
      fillEmployer: 'नियोक्ता डेमो',
      fillAdmin: 'व्यवस्थापक डेमो',
    },
    common: {
      loading: 'लोड हो रहा है...',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      delete: 'हटाएं',
      search: 'खोजें',
      filter: 'फ़िल्टर',
      all: 'सभी',
      apply: 'आवेदन करें',
      applied: 'आवेदित',
      viewDetails: 'विवरण देखें',
      remote: 'रिमोट',
      hybrid: 'हाइब्रिड',
      onSite: 'ऑन-साइट',
    },
  },
  gu: {
    nav: {
      findJobs: 'નોકરીઓ શોધો',
      companies: 'કંપનીઓ',
      salaries: 'પગારની માહિતી',
      aiTools: 'AI કરિયર ટૂલ્સ',
      login: 'લૉગ ઇન',
      signup: 'શરૂ કરો',
      dashboard: 'ડેશબોર્ડ',
      postJob: 'નોકરી મૂકો',
      logout: 'લૉગ આઉટ',
    },
    hero: {
      badge: '✨ ભારતમાં #1 આધુનિક AI કરિયર પ્લેટફોર્મ',
      title1: 'તમારી કારકિર્દીને નવી દિશા આપતી',
      titleHighlight: 'શ્રેષ્ઠ તકો શોધો',
      subtitle: 'ટેક, ડિઝાઇન અને પ્રોડક્ટ ક્ષેત્રે ટોચની કંપનીઓ સાથે જોડાવો અને તમારા સપના સાકાર કરો.',
      searchPlaceholder: 'જોબ ટાઇટલ, સ્કીલ અથવા કીવર્ડ (દા.ત. React, Python)',
      locationPlaceholder: 'શહેર અથવા "રિમોટ"',
      searchBtn: 'નોકરીઓ શોધો',
      popularSearches: 'લોકપ્રિય:',
    },
    stats: {
      activeJobs: 'સક્રિય નોકરીઓ',
      companiesHiring: 'ભરતી કરતી કંપનીઓ',
      jobSeekers: 'ઉમેદવારો',
      successRate: 'સફળતા દર',
    },
    roles: {
      seekerTitle: 'હું જોબ સીકર (નોકરી ઇચ્છુક) છું',
      seekerDesc: 'શ્રેષ્ઠ જોબ્સ શોધો, AI રેઝ્યૂમે એનાલિસિસ મેળવો અને 1-ક્લિકમાં અરજી કરો.',
      employerTitle: 'હું એમ્પ્લોયર / રિક્રૂટર છું',
      employerDesc: 'નોકરીઓ પોસ્ટ કરો, હોંશિયાર ઉમેદવારો શોધો અને ઇન્ટરવ્યુ ગોઠવો.',
    },
    auth: {
      welcomeBack: 'સ્વાગત છે',
      loginSubtitle: 'તમારા JobConnect એકાઉન્ટમાં પ્રવેશ કરો',
      emailLabel: 'ઇમેઇલ એડ્રેસ',
      passwordLabel: 'પાસવર્ડ',
      rememberMe: 'મને યાદ રાખો',
      forgotPassword: 'પાસવર્ડ ભૂલી ગયા?',
      signInBtn: 'સાઇન ઇન કરો',
      orContinueWith: 'અથવા આના દ્વારા પ્રવેશ કરો',
      noAccount: 'એકાઉન્ટ નથી?',
      createAccount: 'નવું એકાઉન્ટ બનાવો',
      demoFillHeader: 'ડેમો લૉગિન:',
      fillSeeker: 'જોબ સીકર ડેમો',
      fillEmployer: 'એમ્પ્લોયર ડેમો',
      fillAdmin: 'એડમિન ડેમો',
    },
    common: {
      loading: 'લોડ થઈ રહ્યું છે...',
      save: 'સાચવો',
      cancel: 'રદ કરો',
      delete: 'ડિલીટ',
      search: 'શોધો',
      filter: 'ફિલ્ટર',
      all: 'બધું',
      apply: 'અરજી કરો',
      applied: 'અરજી કરેલ છે',
      viewDetails: 'વિગત જુઓ',
      remote: 'રિમોટ',
      hybrid: 'હાઇબ્રિડ',
      onSite: 'ઑન-સાઇટ',
    },
  },
};

export function t(path) {
  const lang = getLanguage();
  const keys = path.split('.');
  let current = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  
  for (const k of keys) {
    if (current && current[k] !== undefined) {
      current = current[k];
    } else {
      // Fallback to English
      let fallback = TRANSLATIONS['en'];
      for (const fk of keys) {
        if (fallback && fallback[fk] !== undefined) {
          fallback = fallback[fk];
        } else {
          return path;
        }
      }
      return fallback;
    }
  }
  return current;
}

export function changeLanguage(langCode) {
  setLanguage(langCode);
}
