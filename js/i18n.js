/* ==========================================================================
   CareerConnect — Internationalization (i18n) & Multi-Language Dictionary
   Supports: English (en), Hindi (hi), Marathi (mr), Tamil (ta), Telugu (te)
   ========================================================================== */

(function () {
  "use strict";

  const dictionaries = {
    en: {
      nav_home: "Home",
      nav_jobs: "Find Jobs",
      nav_internships: "Internships",
      nav_dashboard: "Dashboard",
      nav_login: "Log in",
      nav_signup: "Sign up",
      nav_logout: "Log out",

      hero_eyebrow: "Your Career Journey Starts Here",
      hero_title_1: "Discover Opportunities.",
      hero_title_2: "Build Your Future.",
      hero_subtitle: "Find top engineering jobs, high-stipend internships, and remote roles from leading tech companies in India.",
      hero_search_query: "Job title, skill, or company",
      hero_search_location: "City (e.g. Bengaluru, Remote)",
      hero_search_btn: "Search Opportunities →",

      filter_title_jobs: "Filter Jobs",
      filter_title_internships: "Filter Internships",
      filter_keyword: "Keyword",
      filter_location: "Location",
      filter_salary: "Minimum Salary",
      filter_experience: "Experience Required",
      filter_mode: "Work Mode",
      filter_category: "Job Category",
      filter_domain: "Domain",
      filter_duration: "Maximum Duration",
      filter_stipend: "Minimum Monthly Stipend",
      filter_paid_only: "Paid Internships Only",
      filter_reset: "Reset Filters",

      sort_label: "Sort:",
      sort_recent: "Most Recent",
      sort_salary_high: "Salary: High to Low",
      sort_stipend_high: "Stipend: High to Low",
      sort_closing_soon: "Closing Soon",
      sort_title_az: "Title: A–Z",

      infinite_scroll: "Infinite Scroll",
      load_more_jobs: "Load More Jobs",
      load_more_internships: "Load More Internships",
      create_alert: "Create Job Alert",

      view_details: "View details →",
      apply_now: "Apply Now →",
      applied: "Applied ✓",
      save_opportunity: "Save Opportunity",
      saved: "Saved",
      demo_listing: "Demo listing"
    },

    hi: {
      nav_home: "होम",
      nav_jobs: "नौकरियां खोजें",
      nav_internships: "इंटरर्नशिप",
      nav_dashboard: "डैशबोर्ड",
      nav_login: "लॉग इन",
      nav_signup: "साइन अप",
      nav_logout: "लॉग आउट",

      hero_eyebrow: "आपकी करियर यात्रा यहाँ शुरू होती है",
      hero_title_1: "अवसर खोजें।",
      hero_title_2: "अपना भविष्य बनाएं।",
      hero_subtitle: "भारत की प्रमुख टेक कंपनियों में टॉप इंजीनियरिंग नौकरियां, उच्च वजीफा वाली इंटर्नशिप और रिमोट भूमिकाएं खोजें।",
      hero_search_query: "नौकरी का शीर्षक, कौशल या कंपनी",
      hero_search_location: "शहर (उदा. बेंगलुरु, रिमोट)",
      hero_search_btn: "अवसर खोजें →",

      filter_title_jobs: "नौकरियां फ़िल्टर करें",
      filter_title_internships: "इंटर्नशिप फ़िल्टर करें",
      filter_keyword: "कीवर्ड",
      filter_location: "स्थान",
      filter_salary: "न्यूनतम वेतन",
      filter_experience: "आवश्यक अनुभव",
      filter_mode: "कार्य मोड",
      filter_category: "नौकरी की श्रेणी",
      filter_domain: "डोमेन",
      filter_duration: "अधिकतम अवधि",
      filter_stipend: "न्यूनतम मासिक वजीफा",
      filter_paid_only: "केवल सशुल्क इंटर्नशिप",
      filter_reset: "फ़िल्टर रीसेट करें",

      sort_label: "क्रमबद्ध करें:",
      sort_recent: "नवीनतम",
      sort_salary_high: "वेतन: उच्च से निम्न",
      sort_stipend_high: "वजीफा: उच्च से निम्न",
      sort_closing_soon: "शीघ्र बंद हो रहा है",
      sort_title_az: "शीर्षक: A-Z",

      infinite_scroll: "असीमित स्क्रॉल",
      load_more_jobs: "और नौकरियां लोड करें",
      load_more_internships: "और इंटर्नशिप लोड करें",
      create_alert: "जॉब अलर्ट बनाएं",

      view_details: "विवरण देखें →",
      apply_now: "अभी आवेदन करें →",
      applied: "आवेदन किया ✓",
      save_opportunity: "अवसर सहेजें",
      saved: "सहेजा गया",
      demo_listing: "डेमो लिस्टिंग"
    },

    mr: {
      nav_home: "मुख्यपृष्ठ",
      nav_jobs: "नोकऱ्या शोधा",
      nav_internships: "इंटरर्नशिप",
      nav_dashboard: "डॅशबोर्ड",
      nav_login: "लॉग इन",
      nav_signup: "साइन अप",
      nav_logout: "लॉग आउट",

      hero_eyebrow: "तुमचा करिअर प्रवास येथे सुरू होतो",
      hero_title_1: "संधी शोधा.",
      hero_title_2: "तुमचे भविष्य घडवा.",
      hero_subtitle: "भारतातील आघाडीच्या टेक कंपन्यांमध्ये उत्तम अभियांत्रिकी नोकऱ्या आणि इंटर्नशिप शोधा.",
      hero_search_query: "नोकरीचे नाव, कौशल्य किंवा कंपनी",
      hero_search_location: "शहर (उदा. बेंगळुरू, रिमोट)",
      hero_search_btn: "संधी शोधा →",

      filter_title_jobs: "नोकऱ्या फिल्टर करा",
      filter_title_internships: "इंटरर्नशिप फिल्टर करा",
      filter_keyword: "कीवर्ड",
      filter_location: "स्थान",
      filter_salary: "किमान वेतन",
      filter_experience: "अनुभव",
      filter_mode: "काम करण्याची पद्धत",
      filter_category: "वर्ग",
      filter_domain: "डोमेन",
      filter_duration: "कालावधी",
      filter_stipend: "किमान स्टायपेंड",
      filter_paid_only: "फक्त पेड इंटर्नशिप",
      filter_reset: "रीसेट करा",

      sort_label: "क्रमवारी:",
      sort_recent: "नवीनतम",
      sort_salary_high: "वेतन: जास्त ते कमी",
      sort_stipend_high: "स्टायपेंड: जास्त ते कमी",
      sort_closing_soon: "लवकरच बंद होत आहे",
      sort_title_az: "नाव: A–Z",

      infinite_scroll: "अनंत स्क्रोल",
      load_more_jobs: "आणखी नोकऱ्या दाखवा",
      load_more_internships: "आणखी इंटर्नशिप दाखवा",
      create_alert: "जॉब अलर्ट तयार करा",

      view_details: "तपशील पहा →",
      apply_now: "आत्ताच अर्ज करा →",
      applied: "अर्ज केला ✓",
      save_opportunity: "सेव्ह करा",
      saved: "सेव्ह केले",
      demo_listing: "डेमो लिस्टिंग"
    },

    ta: {
      nav_home: "முகப்பு",
      nav_jobs: "வேலைகள்",
      nav_internships: "இன்டர்ன்ஷிப்",
      nav_dashboard: "டாஷ்போர்டு",
      nav_login: "உள்நுழைக",
      nav_signup: "பதிவு செய்க",
      nav_logout: "வெளியேறு",

      hero_eyebrow: "உங்கள் தொழில் பயணம் இங்கே தொடங்குகிறது",
      hero_title_1: "வாய்ப்புகளைக் கண்டறியவும்.",
      hero_title_2: "உங்கள் எதிர்காலத்தை உருவாக்குங்கள்.",
      hero_subtitle: "இந்தியாவின் முன்னனி தொழில்நுட்ப நிறுவனங்களில் வேலை வாய்ப்புகளைக் கண்டறியவும்.",
      hero_search_query: "வேலை தலைப்பு, திறன் அல்லது நிறுவனம்",
      hero_search_location: "நகரம் (எ.கா. பெங்களூரு, ரிமோட்)",
      hero_search_btn: "தேடுக →",

      filter_title_jobs: "வேலைகளை வடிகட்டுக",
      filter_title_internships: "இன்டர்ன்ஷிப் வடிகட்டுக",
      filter_keyword: "முக்கிய சொல்",
      filter_location: "இடம்",
      filter_salary: "குறைந்தபட்ச சம்பளம்",
      filter_experience: "அனுபவம்",
      filter_mode: "வேலை முறை",
      filter_category: "வகை",
      filter_domain: "டொமைன்",
      filter_duration: "காலஅளவு",
      filter_stipend: "மாத உதவித்தொகை",
      filter_paid_only: "சம்பளம் பெறும் இன்டர்ன்ஷிப் மட்டும்",
      filter_reset: "மீட்டமைக்க",

      sort_label: "வரிசைப்படுத்து:",
      sort_recent: "சமீபத்திய",
      sort_salary_high: "சம்பளம்: அதிகம் முதல் குறைவு",
      sort_stipend_high: "உதவித்தொகை: அதிகம் முதல் குறைவு",
      sort_closing_soon: "விரைவில் முடிகிறது",
      sort_title_az: "தலைப்பு: A-Z",

      infinite_scroll: "தொடர் சுருள்",
      load_more_jobs: "மேலும் வேலைகள்",
      load_more_internships: "மேலும் இன்டர்ன்ஷிப்",
      create_alert: "வேலை எச்சரிக்கை உருவாக்கவும்",

      view_details: "விவரங்களை பார் →",
      apply_now: "இப்பொழுதே விண்ணப்பிக்கவும் →",
      applied: "விண்ணப்பிக்கப்பட்டது ✓",
      save_opportunity: "சேமி",
      saved: "சேமிக்கப்பட்டது",
      demo_listing: "டெமோ பட்டியல்"
    },

    te: {
      nav_home: "హోమ్",
      nav_jobs: "ఉద్యోగాలు",
      nav_internships: "ఇంటర్న్‌షిప్‌లు",
      nav_dashboard: "డాష్‌బోర్డ్",
      nav_login: "లాగిన్",
      nav_signup: "సイン అప్",
      nav_logout: "లాగ్ అవుట్",

      hero_eyebrow: "మీ కెరీర్ ప్రయాణం ఇక్కడ ప్రారంభమవుతుంది",
      hero_title_1: "అవకాశాలను కనుగొనండి.",
      hero_title_2: "మీ భవిష్యత్తును నిర్మించుకోండి.",
      hero_subtitle: "భారతదేశంలోని అగ్రశ్రేణి టెక్ కంపెనీలలో ఉద్యోగాలు మరియు ఇంటర్న్‌షిప్‌లను కనుగొనండి.",
      hero_search_query: "ఉద్యోగ శీర్షిక, నైపుణ్యం లేదా కంపెనీ",
      hero_search_location: "నగరం (ఉదా. బెంగళూరు, రిమోట్)",
      hero_search_btn: "శోధించండి →",

      filter_title_jobs: "ఫిల్టర్ ఉద్యోగాలు",
      filter_title_internships: "ఫిల్టర్ ఇంటర్న్‌షిప్‌లు",
      filter_keyword: "కీవర్డ్",
      filter_location: "ప్రాంతం",
      filter_salary: "కనీస జీతం",
      filter_experience: "అనుభవం",
      filter_mode: "పని మోడ్",
      filter_category: "వర్గం",
      filter_domain: "డొమైన్",
      filter_duration: "వ్యవధి",
      filter_stipend: "స్టైఫండ్",
      filter_paid_only: "పెయిడ్ ఇంటర్న్‌షిప్‌లు మాత్రమే",
      filter_reset: "రీసెట్ చేయండి",

      sort_label: "క్రమబద్ధీకరించు:",
      sort_recent: "ఇటీవలివి",
      sort_salary_high: "జీతం: ఎక్కువ నుండి తక్కువ",
      sort_stipend_high: "స్టైఫండ్: ఎక్కువ నుండి తక్కువ",
      sort_closing_soon: "త్వరలో ముగుస్తుంది",
      sort_title_az: "శీర్షిక: A-Z",

      infinite_scroll: "అపరిమిత స్క్రోల్",
      load_more_jobs: "మరిన్ని ఉద్యోగాలు",
      load_more_internships: "మరిన్ని ఇంటర్న్‌షిప్‌లు",
      create_alert: "జాబ్ అలర్ట్ సృష్టించండి",

      view_details: "వివరాలను చూడండి →",
      apply_now: "ఇప్పుడే దరఖాస్తు చేయండి →",
      applied: "దరఖాస్తు చేయబడింది ✓",
      save_opportunity: "సేవ్ చేయండి",
      saved: "సేవ్ చేయబడింది",
      demo_listing: "డెమో లిస్టింగ్"
    }
  };

  const LANG_KEY = "careerconnect:lang";

  function getLang() {
    try {
      return localStorage.getItem(LANG_KEY) || "en";
    } catch (e) {
      return "en";
    }
  }

  function setLang(lang) {
    if (!dictionaries[lang]) lang = "en";
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
    document.documentElement.lang = lang;
  }

  function t(key) {
    const lang = getLang();
    const dict = dictionaries[lang] || dictionaries.en;
    return dict[key] || dictionaries.en[key] || key;
  }

  window.CareerI18n = {
    dictionaries,
    getLang,
    setLang,
    t
  };
})();
