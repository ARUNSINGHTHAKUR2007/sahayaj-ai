import { useMemo, useState } from "react";
import "./App.css";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "mr", name: "मराठी" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
];

const UI_TEXT = {
  en: {
    badge: "🤖 AI + Eligibility Matching",
    title: "Sahayaj AI",
    subtitle:
      "Find government schemes that match your profile, business needs and eligibility.",
    aiTitle: "AI Scheme Search",
    aiPlaceholder: "Ask anything about government schemes...",
    search: "Search",
    profile: "Entrepreneur Profile",
    profileSub: "Tell us about your business requirements.",
    age: "Age",
    gender: "Gender",
    category: "Social Category",
    income: "Annual Income",
    business: "Business Type",
    amount: "Required Amount",
    state: "State",
    district: "District",
    match: "Find Matching Schemes",
    results: "Recommended Schemes",
    resultSub:
      "AI + eligibility engine ranked the schemes for your profile.",
    total: "Total Schemes",
    strong: "Strong Recommendations",
    verification: "Verification Required",
    bestScore: "Best Combined Score",
    best: "🏆 Best Match",
    why: "Why this scheme matches",
    matched: "Matched Criteria",
    check: "Things to check",
    about: "About",
    documents: "Required Documents",
    official: "Official Website",
    viewDetails: "View Details",
    close: "Close",
    loading: "Finding the best schemes...",
    noResults: "No matching schemes found.",
    noResultsSub:
      "Fill your profile above and click the matching button.",
    rag: "RAG Powered",
    eligibility: "Eligibility",
    aiRelevance: "AI Relevance",
    combined: "Combined",
    scoreExplanation: "Score Explanation",
    aiResponse: "AI Response",
    noMatched: "No specific matched criteria returned.",
    noChecks: "No additional checks returned.",
    noAIResults: "No relevant schemes found.",
  },

  hi: {
    badge: "🤖 AI + पात्रता मिलान",
    title: "AI योजना मिलान",
    subtitle:
      "अपनी प्रोफ़ाइल, व्यवसाय और पात्रता के अनुसार सरकारी योजनाएँ खोजें।",
    aiTitle: "AI योजना खोज",
    aiPlaceholder:
      "सरकारी योजनाओं के बारे में कुछ भी पूछें...",
    search: "खोजें",
    profile: "उद्यमी प्रोफ़ाइल",
    profileSub:
      "अपने व्यवसाय और आवश्यकताओं के बारे में बताएं।",
    age: "आयु",
    gender: "लिंग",
    category: "सामाजिक श्रेणी",
    income: "वार्षिक आय",
    business: "व्यवसाय का प्रकार",
    amount: "आवश्यक राशि",
    state: "राज्य",
    district: "जिला",
    match: "मिलान वाली योजनाएँ खोजें",
    results: "अनुशंसित योजनाएँ",
    resultSub:
      "AI और पात्रता इंजन ने आपकी प्रोफ़ाइल के अनुसार योजनाओं को रैंक किया है।",
    total: "कुल योजनाएँ",
    strong: "मजबूत अनुशंसाएँ",
    verification: "सत्यापन आवश्यक",
    bestScore: "सर्वश्रेष्ठ संयुक्त स्कोर",
    best: "🏆 सर्वश्रेष्ठ मिलान",
    why: "यह योजना क्यों मिली",
    matched: "मिलने वाली पात्रताएँ",
    check: "जिन बातों की जाँच करें",
    about: "जानकारी",
    documents: "आवश्यक दस्तावेज़",
    official: "आधिकारिक वेबसाइट",
    viewDetails: "विवरण देखें",
    close: "बंद करें",
    loading:
      "सबसे अच्छी योजनाएँ खोजी जा रही हैं...",
    noResults:
      "कोई मिलान वाली योजना नहीं मिली।",
    noResultsSub:
      "ऊपर अपनी प्रोफ़ाइल भरें और मिलान बटन दबाएँ।",
    rag: "RAG Powered",
    eligibility: "पात्रता",
    aiRelevance: "AI प्रासंगिकता",
    combined: "संयुक्त",
    scoreExplanation: "स्कोर विवरण",
    aiResponse: "AI उत्तर",
    noMatched:
      "कोई विशेष मिलान पात्रता नहीं मिली।",
    noChecks:
      "कोई अतिरिक्त जाँच आवश्यक नहीं बताई गई।",
    noAIResults:
      "कोई संबंधित योजना नहीं मिली।",
  },

  bn: {
    badge: "🤖 AI + যোগ্যতা মিল",
    title: "AI স্কিম ম্যাচার",
    subtitle:
      "আপনার প্রোফাইল ও ব্যবসার জন্য উপযুক্ত সরকারি স্কিম খুঁজুন।",
    aiTitle: "AI স্কিম অনুসন্ধান",
    aiPlaceholder:
      "সরকারি স্কিম সম্পর্কে কিছু জিজ্ঞাসা করুন...",
    search: "অনুসন্ধান",
    profile: "উদ্যোক্তা প্রোফাইল",
    profileSub:
      "আপনার ব্যবসার প্রয়োজনীয়তা জানান।",
    age: "বয়স",
    gender: "লিঙ্গ",
    category: "সামাজিক শ্রেণি",
    income: "বার্ষিক আয়",
    business: "ব্যবসার ধরন",
    amount: "প্রয়োজনীয় অর্থ",
    state: "রাজ্য",
    district: "জেলা",
    match: "মিলযুক্ত স্কিম খুঁজুন",
    results: "প্রস্তাবিত স্কিম",
    resultSub:
      "AI ও যোগ্যতা ইঞ্জিন আপনার প্রোফাইল অনুযায়ী স্কিম সাজিয়েছে।",
    total: "মোট স্কিম",
    strong: "শক্তিশালী সুপারিশ",
    verification: "যাচাই প্রয়োজন",
    bestScore: "সেরা সম্মিলিত স্কোর",
    best: "🏆 সেরা মিল",
    why: "কেন এই স্কিমটি মিলেছে",
    matched: "মিলযুক্ত মানদণ্ড",
    check: "যা যাচাই করতে হবে",
    about: "সম্পর্কে",
    documents: "প্রয়োজনীয় নথি",
    official: "অফিশিয়াল ওয়েবসাইট",
    viewDetails: "বিস্তারিত দেখুন",
    close: "বন্ধ করুন",
    loading: "সেরা স্কিম খোঁজা হচ্ছে...",
    noResults:
      "কোনও মিলযুক্ত স্কিম পাওয়া যায়নি।",
    noResultsSub:
      "উপরের প্রোফাইল পূরণ করে মিলান বাটনে ক্লিক করুন।",
    rag: "RAG Powered",
    eligibility: "যোগ্যতা",
    aiRelevance: "AI প্রাসঙ্গিকতা",
    combined: "সম্মিলিত",
    scoreExplanation: "স্কোর ব্যাখ্যা",
    aiResponse: "AI উত্তর",
    noMatched:
      "কোনও নির্দিষ্ট মিলযুক্ত মানদণ্ড পাওয়া যায়নি।",
    noChecks:
      "কোনও অতিরিক্ত যাচাই পাওয়া যায়নি।",
    noAIResults:
      "কোনও প্রাসঙ্গিক স্কিম পাওয়া যায়নি।",
  },

  ta: {
    badge: "🤖 AI + தகுதி பொருத்தம்",
    title: "AI திட்ட பொருத்தி",
    subtitle:
      "உங்கள் சுயவிவரம் மற்றும் வணிகத்திற்கு ஏற்ற அரசு திட்டங்களைக் கண்டறியுங்கள்.",
    aiTitle: "AI திட்ட தேடல்",
    aiPlaceholder:
      "அரசு திட்டங்களைப் பற்றி கேளுங்கள்...",
    search: "தேடல்",
    profile: "தொழில்முனைவோர் சுயவிவரம்",
    profileSub:
      "உங்கள் வணிகத் தேவைகளை தெரிவிக்கவும்.",
    age: "வயது",
    gender: "பாலினம்",
    category: "சமூக வகை",
    income: "ஆண்டு வருமானம்",
    business: "வணிக வகை",
    amount: "தேவையான தொகை",
    state: "மாநிலம்",
    district: "மாவட்டம்",
    match:
      "பொருத்தமான திட்டங்களை கண்டறியவும்",
    results: "பரிந்துரைக்கப்பட்ட திட்டங்கள்",
    resultSub:
      "AI மற்றும் தகுதி இயந்திரம் உங்கள் சுயவிவரத்திற்கு ஏற்ப திட்டங்களை வரிசைப்படுத்தியது.",
    total: "மொத்த திட்டங்கள்",
    strong: "வலுவான பரிந்துரைகள்",
    verification: "சரிபார்ப்பு தேவை",
    bestScore:
      "சிறந்த ஒருங்கிணைந்த மதிப்பெண்",
    best: "🏆 சிறந்த பொருத்தம்",
    why: "இந்த திட்டம் ஏன் பொருந்துகிறது",
    matched: "பொருந்திய அளவுகோல்கள்",
    check: "சரிபார்க்க வேண்டியவை",
    about: "பற்றி",
    documents: "தேவையான ஆவணங்கள்",
    official:
      "அதிகாரப்பூர்வ இணையதளம்",
    viewDetails: "விவரங்களை பார்க்கவும்",
    close: "மூடு",
    loading:
      "சிறந்த திட்டங்கள் தேடப்படுகின்றன...",
    noResults:
      "பொருத்தமான திட்டங்கள் எதுவும் கிடைக்கவில்லை.",
    noResultsSub:
      "மேலே உள்ள சுயவிவரத்தை நிரப்பி பொருத்தம் பொத்தானை அழுத்தவும்.",
    rag: "RAG Powered",
    eligibility: "தகுதி",
    aiRelevance: "AI தொடர்பு",
    combined: "ஒருங்கிணைந்த",
    scoreExplanation:
      "மதிப்பெண் விளக்கம்",
    aiResponse: "AI பதில்",
    noMatched:
      "குறிப்பிட்ட பொருத்தமான அளவுகோல்கள் இல்லை.",
    noChecks: "கூடுதல் சரிபார்ப்பு இல்லை.",
    noAIResults:
      "தொடர்புடைய திட்டங்கள் எதுவும் கிடைக்கவில்லை.",
  },

  te: {
    badge: "🤖 AI + అర్హత సరిపోలిక",
    title: "AI పథకం మ్యాచర్",
    subtitle:
      "మీ ప్రొఫైల్ మరియు వ్యాపారానికి సరిపోయే ప్రభుత్వ పథకాలను కనుగొనండి.",
    aiTitle: "AI పథకం శోధన",
    aiPlaceholder:
      "ప్రభుత్వ పథకాల గురించి అడగండి...",
    search: "శోధించండి",
    profile: "వ్యాపారవేత్త ప్రొఫైల్",
    profileSub:
      "మీ వ్యాపార అవసరాలను తెలియజేయండి.",
    age: "వయస్సు",
    gender: "లింగం",
    category: "సామాజిక వర్గం",
    income: "వార్షిక ఆదాయం",
    business: "వ్యాపార రకం",
    amount: "అవసరమైన మొత్తం",
    state: "రాష్ట్రం",
    district: "జిల్లా",
    match:
      "సరిపోయే పథకాలను కనుగొనండి",
    results: "సిఫార్సు చేసిన పథకాలు",
    resultSub:
      "AI మరియు అర్హత ఇంజిన్ మీ ప్రొఫైల్ ఆధారంగా పథకాలను ర్యాంక్ చేసింది.",
    total: "మొత్తం పథకాలు",
    strong: "బలమైన సిఫార్సులు",
    verification: "ధృవీకరణ అవసరం",
    bestScore: "ఉత్తమ కంబైన్డ్ స్కోర్",
    best: "🏆 ఉత్తమ సరిపోలిక",
    why: "ఈ పథకం ఎందుకు సరిపోయింది",
    matched: "సరిపోయిన ప్రమాణాలు",
    check: "తనిఖీ చేయాల్సినవి",
    about: "గురించి",
    documents: "అవసరమైన పత్రాలు",
    official: "అధికారిక వెబ్‌సైట్",
    viewDetails: "వివరాలు చూడండి",
    close: "మూసివేయండి",
    loading:
      "ఉత్తమ పథకాలు వెతుకుతున్నాం...",
    noResults:
      "సరిపోయే పథకాలు కనుగొనబడలేదు.",
    noResultsSub:
      "పై ప్రొఫైల్‌ను పూర్తి చేసి మ్యాచింగ్ బటన్‌ను నొక్కండి.",
    rag: "RAG Powered",
    eligibility: "అర్హత",
    aiRelevance: "AI సంబంధితత",
    combined: "కంబైన్డ్",
    scoreExplanation:
      "స్కోర్ వివరణ",
    aiResponse: "AI సమాధానం",
    noMatched:
      "నిర్దిష్ట సరిపోలిన ప్రమాణాలు లేవు.",
    noChecks:
      "అదనపు తనిఖీలు లేవు.",
    noAIResults:
      "సంబంధిత పథకాలు ఏవీ కనుగొనబడలేదు.",
  },

  mr: {
    badge: "🤖 AI + पात्रता जुळणी",
    title: "AI योजना मॅचर",
    subtitle:
      "तुमच्या प्रोफाइल आणि व्यवसायासाठी योग्य सरकारी योजना शोधा.",
    aiTitle: "AI योजना शोध",
    aiPlaceholder:
      "सरकारी योजनांबद्दल विचारा...",
    search: "शोधा",
    profile: "उद्योजक प्रोफाइल",
    profileSub:
      "तुमच्या व्यवसायाच्या गरजा सांगा.",
    age: "वय",
    gender: "लिंग",
    category: "सामाजिक प्रवर्ग",
    income: "वार्षिक उत्पन्न",
    business: "व्यवसायाचा प्रकार",
    amount: "आवश्यक रक्कम",
    state: "राज्य",
    district: "जिल्हा",
    match:
      "जुळणाऱ्या योजना शोधा",
    results:
      "शिफारस केलेल्या योजना",
    resultSub:
      "AI आणि पात्रता इंजिनने तुमच्या प्रोफाइलनुसार योजना क्रमवारीत लावल्या.",
    total: "एकूण योजना",
    strong: "मजबूत शिफारसी",
    verification: "पडताळणी आवश्यक",
    bestScore:
      "सर्वोत्तम संयुक्त स्कोअर",
    best: "🏆 सर्वोत्तम जुळणी",
    why: "ही योजना का जुळली",
    matched: "जुळलेले निकष",
    check: "तपासण्याच्या गोष्टी",
    about: "माहिती",
    documents:
      "आवश्यक कागदपत्रे",
    official: "अधिकृत वेबसाइट",
    viewDetails: "तपशील पहा",
    close: "बंद करा",
    loading:
      "सर्वोत्तम योजना शोधत आहे...",
    noResults:
      "जुळणारी योजना सापडली नाही.",
    noResultsSub:
      "वरील प्रोफाइल भरा आणि जुळणी बटण दाबा.",
    rag: "RAG Powered",
    eligibility: "पात्रता",
    aiRelevance: "AI संबंधितता",
    combined: "संयुक्त",
    scoreExplanation:
      "स्कोअर स्पष्टीकरण",
    aiResponse: "AI उत्तर",
    noMatched:
      "विशिष्ट जुळलेले निकष उपलब्ध नाहीत.",
    noChecks:
      "अतिरिक्त तपासणी नाही.",
    noAIResults:
      "संबंधित योजना सापडल्या नाहीत.",
  },

  gu: {
    badge: "🤖 AI + પાત્રતા મેળ",
    title: "AI યોજના મેચર",
    subtitle:
      "તમારી પ્રોફાઇલ અને વ્યવસાય માટે યોગ્ય સરકારી યોજનાઓ શોધો.",
    aiTitle: "AI યોજના શોધ",
    aiPlaceholder:
      "સરકારી યોજનાઓ વિશે પૂછો...",
    search: "શોધો",
    profile:
      "ઉદ્યોગસાહસિક પ્રોફાઇલ",
    profileSub:
      "તમારી વ્યવસાયિક જરૂરિયાતો જણાવો.",
    age: "ઉંમર",
    gender: "લિંગ",
    category: "સામાજિક વર્ગ",
    income: "વાર્ષિક આવક",
    business: "વ્યવસાય પ્રકાર",
    amount: "જરૂરી રકમ",
    state: "રાજ્ય",
    district: "જિલ્લો",
    match:
      "મેળ ખાતી યોજનાઓ શોધો",
    results:
      "ભલામણ કરેલી યોજનાઓ",
    resultSub:
      "AI અને પાત્રતા એન્જિને તમારી પ્રોફાઇલ અનુસાર યોજનાઓ રેન્ક કરી છે.",
    total: "કુલ યોજનાઓ",
    strong: "મજબૂત ભલામણો",
    verification: "ચકાસણી જરૂરી",
    bestScore:
      "શ્રેષ્ઠ સંયુક્ત સ્કોર",
    best: "🏆 શ્રેષ્ઠ મેળ",
    why:
      "આ યોજના કેમ મેળ ખાય છે",
    matched:
      "મેળ ખાતા માપદંડ",
    check:
      "તપાસવાની બાબતો",
    about: "વિશે",
    documents:
      "જરૂરી દસ્તાવેજો",
    official:
      "સત્તાવાર વેબસાઇટ",
    viewDetails:
      "વિગતો જુઓ",
    close: "બંધ કરો",
    loading:
      "શ્રેષ્ઠ યોજનાઓ શોધી રહ્યા છીએ...",
    noResults:
      "કોઈ મેળ ખાતી યોજના મળી નથી.",
    noResultsSub:
      "ઉપરની પ્રોફાઇલ ભરીને મેચિંગ બટન દબાવો.",
    rag: "RAG Powered",
    eligibility: "પાત્રતા",
    aiRelevance:
      "AI સંબંધિતતા",
    combined: "સંયુક્ત",
    scoreExplanation:
      "સ્કોર સમજૂતી",
    aiResponse:
      "AI જવાબ",
    noMatched:
      "કોઈ ચોક્કસ મેળ ખાતા માપદંડ નથી.",
    noChecks:
      "કોઈ વધારાની તપાસ નથી.",
    noAIResults:
      "કોઈ સંબંધિત યોજના મળી નથી.",
  },

  kn: {
    badge: "🤖 AI + ಅರ್ಹತೆ ಹೊಂದಾಣಿಕೆ",
    title: "AI ಯೋಜನೆ ಮ್ಯಾಚರ್",
    subtitle:
      "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮತ್ತು ವ್ಯವಹಾರಕ್ಕೆ ಹೊಂದುವ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ.",
    aiTitle:
      "AI ಯೋಜನೆ ಹುಡುಕಾಟ",
    aiPlaceholder:
      "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
    search: "ಹುಡುಕಿ",
    profile:
      "ಉದ್ಯಮಿ ಪ್ರೊಫೈಲ್",
    profileSub:
      "ನಿಮ್ಮ ವ್ಯವಹಾರದ ಅಗತ್ಯಗಳನ್ನು ತಿಳಿಸಿ.",
    age: "ವಯಸ್ಸು",
    gender: "ಲಿಂಗ",
    category:
      "ಸಾಮಾಜಿಕ ವರ್ಗ",
    income:
      "ವಾರ್ಷಿಕ ಆದಾಯ",
    business:
      "ವ್ಯವಹಾರದ ಪ್ರಕಾರ",
    amount:
      "ಅಗತ್ಯವಿರುವ ಮೊತ್ತ",
    state: "ರಾಜ್ಯ",
    district: "ಜಿಲ್ಲೆ",
    match:
      "ಹೊಂದುವ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",
    results:
      "ಶಿಫಾರಸು ಮಾಡಿದ ಯೋಜನೆಗಳು",
    resultSub:
      "AI ಮತ್ತು ಅರ್ಹತಾ ಎಂಜಿನ್ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಆಧರಿಸಿ ಯೋಜನೆಗಳನ್ನು ರ್ಯಾಂಕ್ ಮಾಡಿದೆ.",
    total:
      "ಒಟ್ಟು ಯೋಜನೆಗಳು",
    strong:
      "ಬಲವಾದ ಶಿಫಾರಸುಗಳು",
    verification:
      "ಪರಿಶೀಲನೆ ಅಗತ್ಯ",
    bestScore:
      "ಅತ್ಯುತ್ತಮ ಸಂಯುಕ್ತ ಸ್ಕೋರ್",
    best:
      "🏆 ಅತ್ಯುತ್ತಮ ಹೊಂದಾಣಿಕೆ",
    why:
      "ಈ ಯೋಜನೆ ಏಕೆ ಹೊಂದಿದೆ",
    matched:
      "ಹೊಂದಿದ ಮಾನದಂಡಗಳು",
    check:
      "ಪರಿಶೀಲಿಸಬೇಕಾದವು",
    about: "ಕುರಿತು",
    documents:
      "ಅಗತ್ಯ ದಾಖಲೆಗಳು",
    official:
      "ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್",
    viewDetails:
      "ವಿವರಗಳನ್ನು ನೋಡಿ",
    close: "ಮುಚ್ಚಿ",
    loading:
      "ಅತ್ಯುತ್ತಮ ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    noResults:
      "ಹೊಂದುವ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    noResultsSub:
      "ಮೇಲಿನ ಪ್ರೊಫೈಲ್ ತುಂಬಿ ಹೊಂದಾಣಿಕೆ ಬಟನ್ ಒತ್ತಿರಿ.",
    rag: "RAG Powered",
    eligibility:
      "ಅರ್ಹತೆ",
    aiRelevance:
      "AI ಪ್ರಸ್ತುತತೆ",
    combined:
      "ಸಂಯುಕ್ತ",
    scoreExplanation:
      "ಸ್ಕೋರ್ ವಿವರಣೆ",
    aiResponse:
      "AI ಉತ್ತರ",
    noMatched:
      "ನಿರ್ದಿಷ್ಟ ಹೊಂದಿದ ಮಾನದಂಡಗಳಿಲ್ಲ.",
    noChecks:
      "ಹೆಚ್ಚುವರಿ ಪರಿಶೀಲನೆಗಳಿಲ್ಲ.",
    noAIResults:
      "ಸಂಬಂಧಿತ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
  },

  ml: {
    badge: "🤖 AI + യോഗ്യത പൊരുത്തം",
    title: "AI സ്കീം മാച്ചർ",
    subtitle:
      "നിങ്ങളുടെ പ്രൊഫൈലിനും ബിസിനസിനും അനുയോജ്യമായ സർക്കാർ പദ്ധതികൾ കണ്ടെത്തുക.",
    aiTitle:
      "AI സ്കീം തിരയൽ",
    aiPlaceholder:
      "സർക്കാർ പദ്ധതികളെക്കുറിച്ച് ചോദിക്കുക...",
    search: "തിരയുക",
    profile:
      "സംരംഭക പ്രൊഫൈൽ",
    profileSub:
      "നിങ്ങളുടെ ബിസിനസ് ആവശ്യങ്ങൾ നൽകുക.",
    age: "പ്രായം",
    gender: "ലിംഗം",
    category:
      "സാമൂഹിക വിഭാഗം",
    income:
      "വാർഷിക വരുമാനം",
    business:
      "ബിസിനസ് തരം",
    amount:
      "ആവശ്യമായ തുക",
    state:
      "സംസ്ഥാനം",
    district:
      "ജില്ല",
    match:
      "പൊരുത്തപ്പെടുന്ന പദ്ധതികൾ കണ്ടെത്തുക",
    results:
      "ശുപാർശ ചെയ്ത പദ്ധതികൾ",
    resultSub:
      "AIയും യോഗ്യതാ എഞ്ചിനും നിങ്ങളുടെ പ്രൊഫൈൽ അനുസരിച്ച് പദ്ധതികളെ റാങ്ക് ചെയ്തു.",
    total:
      "ആകെ പദ്ധതികൾ",
    strong:
      "ശക്തമായ ശുപാർശകൾ",
    verification:
      "പരിശോധന ആവശ്യമാണ്",
    bestScore:
      "മികച്ച സംയുക്ത സ്കോർ",
    best:
      "🏆 മികച്ച പൊരുത്തം",
    why:
      "ഈ പദ്ധതി എന്തുകൊണ്ട് പൊരുത്തപ്പെടുന്നു",
    matched:
      "പൊരുത്തപ്പെട്ട മാനദണ്ഡങ്ങൾ",
    check:
      "പരിശോധിക്കേണ്ട കാര്യങ്ങൾ",
    about:
      "വിവരം",
    documents:
      "ആവശ്യമായ രേഖകൾ",
    official:
      "ഔദ്യോഗിക വെബ്സൈറ്റ്",
    viewDetails:
      "വിശദാംശങ്ങൾ കാണുക",
    close:
      "അടയ്ക്കുക",
    loading:
      "മികച്ച പദ്ധതികൾ കണ്ടെത്തുന്നു...",
    noResults:
      "പൊരുത്തപ്പെടുന്ന പദ്ധതികളൊന്നും കണ്ടെത്തിയില്ല.",
    noResultsSub:
      "മുകളിലെ പ്രൊഫൈൽ പൂരിപ്പിച്ച് പൊരുത്ത ബട്ടൺ അമർത്തുക.",
    rag:
      "RAG Powered",
    eligibility:
      "യോഗ്യത",
    aiRelevance:
      "AI പ്രസക്തി",
    combined:
      "സംയുക്തം",
    scoreExplanation:
      "സ്കോർ വിശദീകരണം",
    aiResponse:
      "AI മറുപടി",
    noMatched:
      "പ്രത്യേക പൊരുത്ത മാനദണ്ഡങ്ങളൊന്നുമില്ല.",
    noChecks:
      "അധിക പരിശോധനകളില്ല.",
    noAIResults:
      "ബന്ധപ്പെട്ട പദ്ധതികളൊന്നും കണ്ടെത്തിയില്ല.",
  },

  pa: {
    badge:
      "🤖 AI + ਯੋਗਤਾ ਮਿਲਾਨ",
    title:
      "AI ਸਕੀਮ ਮੈਚਰ",
    subtitle:
      "ਆਪਣੀ ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਕਾਰੋਬਾਰ ਲਈ ਢੁਕਵੀਆਂ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਲੱਭੋ।",
    aiTitle:
      "AI ਸਕੀਮ ਖੋਜ",
    aiPlaceholder:
      "ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਬਾਰੇ ਪੁੱਛੋ...",
    search:
      "ਖੋਜੋ",
    profile:
      "ਉਦਯਮੀ ਪ੍ਰੋਫਾਈਲ",
    profileSub:
      "ਆਪਣੀਆਂ ਕਾਰੋਬਾਰੀ ਲੋੜਾਂ ਦੱਸੋ।",
    age:
      "ਉਮਰ",
    gender:
      "ਲਿੰਗ",
    category:
      "ਸਮਾਜਿਕ ਸ਼੍ਰੇਣੀ",
    income:
      "ਸਾਲਾਨਾ ਆਮਦਨ",
    business:
      "ਕਾਰੋਬਾਰ ਦੀ ਕਿਸਮ",
    amount:
      "ਲੋੜੀਂਦੀ ਰਕਮ",
    state:
      "ਰਾਜ",
    district:
      "ਜ਼ਿਲ੍ਹਾ",
    match:
      "ਮਿਲਦੀਆਂ ਸਕੀਮਾਂ ਲੱਭੋ",
    results:
      "ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀਆਂ ਸਕੀਮਾਂ",
    resultSub:
      "AI ਅਤੇ ਯੋਗਤਾ ਇੰਜਣ ਨੇ ਤੁਹਾਡੀ ਪ੍ਰੋਫਾਈਲ ਅਨੁਸਾਰ ਸਕੀਮਾਂ ਨੂੰ ਰੈਂਕ ਕੀਤਾ ਹੈ।",
    total:
      "ਕੁੱਲ ਸਕੀਮਾਂ",
    strong:
      "ਮਜ਼ਬੂਤ ਸਿਫ਼ਾਰਸ਼ਾਂ",
    verification:
      "ਤਸਦੀਕ ਲੋੜੀਂਦੀ",
    bestScore:
      "ਸਭ ਤੋਂ ਵਧੀਆ ਸੰਯੁਕਤ ਸਕੋਰ",
    best:
      "🏆 ਸਭ ਤੋਂ ਵਧੀਆ ਮਿਲਾਨ",
    why:
      "ਇਹ ਸਕੀਮ ਕਿਉਂ ਮਿਲਦੀ ਹੈ",
    matched:
      "ਮਿਲਦੇ ਮਾਪਦੰਡ",
    check:
      "ਜਾਂਚਣ ਵਾਲੀਆਂ ਗੱਲਾਂ",
    about:
      "ਜਾਣਕਾਰੀ",
    documents:
      "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼",
    official:
      "ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ",
    viewDetails:
      "ਵੇਰਵੇ ਵੇਖੋ",
    close:
      "ਬੰਦ ਕਰੋ",
    loading:
      "ਸਭ ਤੋਂ ਵਧੀਆ ਸਕੀਮਾਂ ਲੱਭੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ...",
    noResults:
      "ਕੋਈ ਮਿਲਦੀ ਸਕੀਮ ਨਹੀਂ ਮਿਲੀ।",
    noResultsSub:
      "ਉੱਪਰਲੀ ਪ੍ਰੋਫਾਈਲ ਭਰੋ ਅਤੇ ਮਿਲਾਨ ਬਟਨ ਦਬਾਓ।",
    rag:
      "RAG Powered",
    eligibility:
      "ਯੋਗਤਾ",
    aiRelevance:
      "AI ਪ੍ਰਸੰਗਿਕਤਾ",
    combined:
      "ਸੰਯੁਕਤ",
    scoreExplanation:
      "ਸਕੋਰ ਵਿਆਖਿਆ",
    aiResponse:
      "AI ਜਵਾਬ",
    noMatched:
      "ਕੋਈ ਖਾਸ ਮਿਲਦਾ ਮਾਪਦੰਡ ਨਹੀਂ ਮਿਲਿਆ।",
    noChecks:
      "ਕੋਈ ਵਾਧੂ ਜਾਂਚ ਨਹੀਂ।",
    noAIResults:
      "ਕੋਈ ਸੰਬੰਧਿਤ ਸਕੀਮ ਨਹੀਂ ਮਿਲੀ।",
  },
};

const getText = (language, key) =>
  UI_TEXT[language]?.[key] ||
  UI_TEXT.en[key];

const getSchemeName = (scheme) => {
  const names = {
    mudra: "Pradhan Mantri MUDRA Yojana",
    standup_india: "Stand-Up India",
    pm_ajay: "PM-AJAY",
    pmegp:
      "Prime Minister's Employment Generation Programme",
    pm_vishwakarma: "PM Vishwakarma",
  };

  return (
    scheme?.name ||
    scheme?.scheme_name ||
    scheme?.title ||
    names[scheme?.id] ||
    "Government Scheme"
  );
};

const getScoreExplanation = (
  scheme,
  language
) => {
  const eligibility = Number(
    scheme.match_score ?? 0
  );

  const ai = Number(
    scheme.ai_relevance ?? 0
  );

  const combined = Number(
    scheme.combined_score ?? 0
  );

  if (language === "hi") {
    if (combined >= 85) {
      return `मजबूत समग्र मिलान। पात्रता (${eligibility}%) और AI प्रासंगिकता (${ai.toFixed(
        1
      )}%) को ध्यान में रखकर ${combined.toFixed(
        1
      )} का संयुक्त स्कोर मिला।`;
    }

    if (combined >= 70) {
      return `अच्छा समग्र मिलान। पात्रता (${eligibility}%) और AI प्रासंगिकता (${ai.toFixed(
        1
      )}%) के आधार पर संयुक्त स्कोर ${combined.toFixed(
        1
      )} है।`;
    }

    return `वर्तमान पात्रता (${eligibility}%) और AI प्रासंगिकता (${ai.toFixed(
      1
    )}%) के आधार पर संयुक्त स्कोर ${combined.toFixed(
      1
    )} है।`;
  }

  return `Eligibility (${eligibility}%) and AI relevance (${ai.toFixed(
    1
  )}%) were considered to calculate the combined score of ${combined.toFixed(
    1
  )}.`;
};

const getEligibilityItems = (scheme) => ({
  reasons: Array.isArray(scheme?.reasons)
    ? scheme.reasons
    : [],

  missing: Array.isArray(scheme?.missing)
    ? scheme.missing
    : [],

  verification: Array.isArray(
    scheme?.verification_required
  )
    ? scheme.verification_required
    : [],
});

function App() {
  const [language, setLanguage] =
    useState("en");

  const [form, setForm] = useState({
    age: "",
    gender: "Female",
    category: "SC",
    annual_income: "",
    business_type: "Manufacturing",
    required_amount: "",
    state: "Rajasthan",
    district: "Jaipur",
  });

  const [matches, setMatches] =
    useState([]);

  const [selectedScheme, setSelectedScheme] =
    useState(null);

  const [aiQuery, setAiQuery] =
    useState("");

  const [aiResult, setAiResult] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [aiLoading, setAiLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const bestMatchScore = useMemo(() => {
    if (!matches.length) {
      return 0;
    }

    return Math.max(
      ...matches.map((scheme) =>
        Number(
          scheme.combined_score ?? 0
        )
      )
    );
  }, [matches]);

  const strongCount =
    matches.filter(
      (scheme) =>
        scheme.status ===
        "Strong Recommendation"
    ).length;

  const verificationCount =
    matches.filter(
      (scheme) =>
        scheme.status ===
        "Verification Required"
    ).length;

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleMatch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMatches([]);
    setSelectedScheme(null);

    try {
      const payload = {
        ...form,
        age: Number(form.age),
        annual_income:
          Number(form.annual_income),
        required_amount:
          Number(form.required_amount),
        language,
      };

      const response = await fetch(
        "http://127.0.0.1:8000/smart-match",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail
            ? JSON.stringify(
                data.detail
              )
            : "Unable to find schemes."
        );
      }

      setMatches(
        Array.isArray(data.matches)
          ? data.matches
          : []
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to backend."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FIXED AI SEARCH
     Backend returns:
     {
       query: "...",
       language: "...",
       results: [...]
     }
  ===================================================== */

  const handleAISearch = async (e) => {
    e.preventDefault();

    if (!aiQuery.trim()) {
      return;
    }

    setAiLoading(true);
    setAiResult("");
    setError("");

    try {
      const response =
        await fetch(
          "http://127.0.0.1:8000/ai-search",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              query: aiQuery,
              language,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.detail
            ? JSON.stringify(
                data.detail
              )
            : "AI search failed."
        );
      }

      const results = Array.isArray(
        data.results
      )
        ? data.results
        : [];

      if (results.length === 0) {
        setAiResult(
          getText(
            language,
            "noAIResults"
          )
        );
      } else {
        const text = results
          .map((item, index) => {
            const score = Number(
              item.semantic_score ?? 0
            );

            const description =
              item.description ||
              "";

            return `${index + 1}. ${getSchemeName(
              item
            )}

${description}

AI Relevance: ${score.toFixed(
              1
            )}%`;
          })
          .join("\n\n");

        setAiResult(text);
      }
    } catch (err) {
      setAiResult(
        err.message ||
          "AI search failed."
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="app">

      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, Arial, Helvetica, sans-serif;
          background: #f1f5f9;
          color: #0f172a;
        }

        button,
        input,
        select {
          font: inherit;
        }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, #dbeafe 0, transparent 30%),
            linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%);
          color: #0f172a;
        }

        .top-header {
          width: 100%;
          max-width: 1180px;
          margin: auto;
          padding: 22px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: #2563eb;
          display: grid;
          place-items: center;
          font-size: 25px;
          box-shadow: 0 8px 20px rgba(37, 99, 235, .25);
        }

        .brand strong {
          display: block;
          font-size: 20px;
          color: #0f172a;
        }

        .brand span {
          display: block;
          margin-top: 3px;
          font-size: 13px;
          color: #64748b;
        }

        .language-field {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .language-field label {
          font-weight: 600;
          color: #334155;
        }

        .language-field select {
          min-width: 130px;
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          background: white;
          color: #0f172a;
          cursor: pointer;
        }

        main {
          width: 100%;
          max-width: 1180px;
          margin: auto;
          padding: 10px 24px 70px;
        }

        .hero-section {
          text-align: center;
          padding: 45px 20px 35px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          padding: 9px 17px;
          border-radius: 999px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1d4ed8;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .hero-section h1 {
          margin: 0;
          font-size: clamp(38px, 6vw, 64px);
          line-height: 1.05;
          color: #0f172a;
          letter-spacing: -2px;
        }

        .hero-section p {
          max-width: 760px;
          margin: 18px auto 0;
          color: #475569;
          font-size: 18px;
          line-height: 1.6;
        }

        .ai-search-card,
        .profile-card {
          background: rgba(255,255,255,.92);
          border: 1px solid #e2e8f0;
          border-radius: 22px;
          padding: 28px;
          margin-bottom: 24px;
          box-shadow: 0 12px 35px rgba(15,23,42,.07);
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .section-icon {
          width: 46px;
          height: 46px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          background: #eff6ff;
          font-size: 22px;
        }

        .section-heading h2 {
          margin: 0;
          color: #0f172a;
          font-size: 25px;
        }

        .section-heading span {
          color: #64748b;
          font-size: 14px;
        }

        .rag-label {
          display: inline-block;
          margin-top: 5px;
          padding: 3px 9px;
          border-radius: 999px;
          background: #ecfdf5;
          color: #047857 !important;
          font-size: 12px !important;
          font-weight: 700;
        }

        .ai-search-form {
          display: flex;
          gap: 12px;
        }

        .ai-search-form input {
          flex: 1;
          min-height: 48px;
          border: 1px solid #cbd5e1;
          border-radius: 12px;
          padding: 0 15px;
          color: #0f172a;
          background: white;
          outline: none;
        }

        .ai-search-form input:focus,
        .form-group input:focus,
        .form-group select:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,.12);
        }

        button {
          border: 0;
          cursor: pointer;
        }

        .ai-search-form button,
        .primary-button {
          background: #2563eb;
          color: white;
          font-weight: 700;
          border-radius: 12px;
          padding: 12px 20px;
          transition: .2s;
        }

        .ai-search-form button:hover,
        .primary-button:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }

        button:disabled {
          opacity: .6;
          cursor: not-allowed;
          transform: none !important;
        }

        .ai-result {
          margin-top: 18px;
          padding: 18px;
          border-radius: 14px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
        }

        .ai-result strong {
          color: #1d4ed8;
        }

        .ai-result p {
          margin: 9px 0 0;
          line-height: 1.6;
          color: #334155;
          white-space: pre-wrap;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 14px;
          font-weight: 700;
          color: #334155;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          height: 48px;
          border: 1px solid #cbd5e1;
          border-radius: 11px;
          padding: 0 13px;
          background: white;
          color: #0f172a;
          outline: none;
        }

        .primary-button {
          margin-top: 24px;
          width: 100%;
          min-height: 50px;
          font-size: 15px;
        }

        .error-box {
          padding: 15px 18px;
          border-radius: 13px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
          margin-bottom: 24px;
          overflow-wrap: anywhere;
        }

        .results-section {
          margin-top: 35px;
        }

        .results-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .results-heading h2 {
          margin: 0;
          font-size: 34px;
          color: #0f172a;
        }

        .results-heading p {
          margin: 6px 0 0;
          color: #64748b;
        }

        .result-count {
          padding: 10px 16px;
          border-radius: 999px;
          background: white;
          border: 1px solid #dbeafe;
          color: #2563eb;
          font-weight: 700;
          white-space: nowrap;
        }

        .result-summary {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 22px;
        }

        .summary-item {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 6px 20px rgba(15,23,42,.04);
        }

        .summary-item span {
          display: block;
          color: #64748b;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 7px;
        }

        .summary-item strong {
          font-size: 25px;
          color: #0f172a;
        }

        .summary-item.best-score {
          background: #eff6ff;
          border-color: #bfdbfe;
        }

        .summary-item.best-score strong {
          color: #2563eb;
        }

        .scheme-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .scheme-card {
          position: relative;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 28px rgba(15,23,42,.06);
          overflow: hidden;
        }

        .best-match-card {
          border: 2px solid #2563eb;
          box-shadow: 0 12px 35px rgba(37,99,235,.14);
        }

        .best-match-badge {
          display: inline-flex;
          align-items: center;
          padding: 6px 11px;
          border-radius: 999px;
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 13px;
        }

        .scheme-card h3 {
          margin: 0;
          color: #0f172a;
          font-size: 21px;
          line-height: 1.35;
          overflow-wrap: anywhere;
        }

        .status-badge {
          display: inline-flex;
          margin-top: 9px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          border: 1px solid transparent;
        }

        .status-badge.strong-recommendation {
          background: #dcfce7;
          color: #166534;
          border-color: #86efac;
        }

        .status-badge.review-required {
          background: #fef3c7;
          color: #92400e;
          border-color: #fcd34d;
        }

        .status-badge.verification-required {
          background: #fff7ed;
          color: #c2410c;
          border-color: #fb923c;
        }

        .status-badge.not-matched {
          background: #fee2e2;
          color: #991b1b;
          border-color: #fca5a5;
        }

        .scheme-description {
          color: #475569;
          line-height: 1.6;
          margin: 18px 0 0;
          overflow-wrap: anywhere;
        }

        .score-breakdown {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 20px;
        }

        .score-item {
          padding: 14px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .score-item span {
          display: block;
          color: #64748b;
          font-size: 12px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .score-item strong {
          font-size: 19px;
          color: #2563eb;
        }

        .score-item.combined {
          background: #eff6ff;
          border-color: #bfdbfe;
        }

        .score-item.combined strong {
          font-size: 22px;
        }

        .score-explanation {
          margin-top: 15px;
          padding: 15px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .score-explanation strong {
          color: #334155;
          font-size: 13px;
        }

        .score-explanation p {
          margin: 7px 0 0;
          color: #64748b;
          line-height: 1.5;
          font-size: 13px;
        }

        .transparency-box {
          margin-top: 18px;
          padding: 17px;
          border-radius: 15px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .transparency-title {
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 13px;
        }

        .transparency-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .criteria-box {
          padding: 14px;
          border-radius: 12px;
          background: white;
          border: 1px solid #e2e8f0;
        }

        .criteria-box.matched {
          border-left: 4px solid #22c55e;
        }

        .criteria-box.verify {
          border-left: 4px solid #f59e0b;
        }

        .criteria-heading {
          font-weight: 800;
          font-size: 13px;
          color: #334155;
          margin-bottom: 8px;
        }

        .criteria-box ul {
          margin: 0;
          padding-left: 18px;
        }

        .criteria-box li {
          color: #64748b;
          font-size: 13px;
          line-height: 1.5;
          margin-bottom: 5px;
          overflow-wrap: anywhere;
        }

        .empty-criteria {
          color: #94a3b8;
          font-size: 12px;
        }

        .card-actions {
          margin-top: 18px;
        }

        .secondary-button {
          width: 100%;
          padding: 11px 16px;
          border-radius: 11px;
          background: white;
          border: 1px solid #cbd5e1;
          color: #1d4ed8;
          font-weight: 700;
        }

        .secondary-button:hover {
          background: #eff6ff;
          border-color: #93c5fd;
        }

        .empty-state {
          text-align: center;
          background: white;
          border: 1px dashed #cbd5e1;
          border-radius: 18px;
          padding: 45px 20px;
          color: #64748b;
        }

        .empty-state > div {
          font-size: 35px;
        }

        .empty-state h3 {
          color: #0f172a;
          margin: 10px 0 5px;
        }

        .empty-state p {
          margin: 0;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,.6);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
          overflow-y: auto;
        }

        .modal {
          position: relative;
          width: min(760px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          background: white;
          border-radius: 22px;
          padding: 30px;
          box-shadow: 0 25px 70px rgba(0,0,0,.25);
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #334155;
          font-size: 23px;
        }

        .modal h2 {
          margin: 0;
          padding-right: 45px;
          color: #0f172a;
          font-size: 28px;
          overflow-wrap: anywhere;
        }

        .modal-section {
          margin-top: 22px;
        }

        .modal-section h3 {
          margin: 0 0 9px;
          color: #0f172a;
        }

        .modal-section p,
        .modal-section li {
          color: #475569;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .official-link {
          color: #2563eb;
          word-break: break-all;
        }

        .modal-button {
          margin-top: 25px;
        }

        .modal-best-match {
          margin-bottom: 15px;
        }

        @media (max-width: 800px) {
          .scheme-grid {
            grid-template-columns: 1fr;
          }

          .result-summary {
            grid-template-columns: repeat(2, 1fr);
          }

          .top-header {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 600px) {
          main {
            padding-left: 14px;
            padding-right: 14px;
          }

          .hero-section {
            padding-top: 25px;
          }

          .hero-section h1 {
            font-size: 39px;
            letter-spacing: -1px;
          }

          .hero-section p {
            font-size: 15px;
          }

          .ai-search-card,
          .profile-card,
          .scheme-card,
          .modal {
            padding: 19px;
            border-radius: 16px;
          }

          .ai-search-form {
            flex-direction: column;
          }

          .form-grid,
          .transparency-grid,
          .score-breakdown {
            grid-template-columns: 1fr;
          }

          .result-summary {
            grid-template-columns: 1fr 1fr;
          }

          .results-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .results-heading h2 {
            font-size: 27px;
          }
        }

        @media (max-width: 420px) {
          .result-summary {
            grid-template-columns: 1fr;
          }

          .language-field {
            width: 100%;
          }

          .language-field select {
            flex: 1;
          }
        }
      `}</style>

      <header className="top-header">
        <div className="brand">
          <div className="brand-icon">
            🤖
          </div>

          <div>
            <strong>
              Sahayaj AI
            </strong>

            <span>
              Smart Government Scheme Discovery
            </span>
          </div>
        </div>

        <div className="language-field">
          <label>
            🌐 Language
          </label>

          <select
            value={language}
            onChange={(e) => {
              setLanguage(
                e.target.value
              );

              setMatches([]);
              setSelectedScheme(null);
              setAiResult("");
              setError("");
            }}
          >
            {LANGUAGES.map(
              (lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                >
                  {lang.name}
                </option>
              )
            )}
          </select>
        </div>
      </header>

      <main>

        <section className="hero-section">
          <div className="hero-badge">
            {getText(
              language,
              "badge"
            )}
          </div>

          <h1>
            {getText(
              language,
              "title"
            )}
          </h1>

          <p>
            {getText(
              language,
              "subtitle"
            )}
          </p>
        </section>

        {/* ================= AI SEARCH ================= */}

        <section className="ai-search-card">

          <div className="section-heading">
            <div className="section-icon">
              ✨
            </div>

            <div>
              <h2>
                {getText(
                  language,
                  "aiTitle"
                )}
              </h2>

              <span className="rag-label">
                {getText(
                  language,
                  "rag"
                )}
              </span>
            </div>
          </div>

          <form
            className="ai-search-form"
            onSubmit={
              handleAISearch
            }
          >
            <input
              value={aiQuery}
              onChange={(e) =>
                setAiQuery(
                  e.target.value
                )
              }
              placeholder={getText(
                language,
                "aiPlaceholder"
              )}
            />

            <button
              type="submit"
              disabled={aiLoading}
            >
              {aiLoading
                ? "..."
                : getText(
                    language,
                    "search"
                  )}
            </button>
          </form>

          {aiResult && (
            <div className="ai-result">
              <strong>
                🤖{" "}
                {getText(
                  language,
                  "aiResponse"
                )}
              </strong>

              <p>
                {aiResult}
              </p>
            </div>
          )}
        </section>

        {/* ================= PROFILE ================= */}

        <section className="profile-card">

          <div className="section-heading">
            <div className="section-icon">
              👤
            </div>

            <div>
              <h2>
                {getText(
                  language,
                  "profile"
                )}
              </h2>

              <span>
                {getText(
                  language,
                  "profileSub"
                )}
              </span>
            </div>
          </div>

          <form
            onSubmit={
              handleMatch
            }
          >

            <div className="form-grid">

              <div className="form-group">
                <label>
                  {getText(
                    language,
                    "age"
                  )}
                </label>

                <input
                  type="number"
                  name="age"
                  min="18"
                  max="100"
                  required
                  value={form.age}
                  onChange={
                    handleChange
                  }
                  placeholder="25"
                />
              </div>

              <div className="form-group">
                <label>
                  {getText(
                    language,
                    "gender"
                  )}
                </label>

                <select
                  name="gender"
                  value={
                    form.gender
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  {getText(
                    language,
                    "category"
                  )}
                </label>

                <select
                  name="category"
                  value={
                    form.category
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="SC">
                    SC
                  </option>

                  <option value="ST">
                    ST
                  </option>

                  <option value="OBC">
                    OBC
                  </option>

                  <option value="General">
                    General
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  {getText(
                    language,
                    "income"
                  )}
                </label>

                <input
                  type="number"
                  name="annual_income"
                  min="0"
                  required
                  value={
                    form.annual_income
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="300000"
                />
              </div>

              <div className="form-group">
                <label>
                  {getText(
                    language,
                    "business"
                  )}
                </label>

                <select
                  name="business_type"
                  value={
                    form.business_type
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="Manufacturing">
                    Manufacturing
                  </option>

                  <option value="Services">
                    Services
                  </option>

                  <option value="Trading">
                    Trading
                  </option>

                  <option value="Artisan">
                    Artisan
                  </option>

                  <option value="Agriculture">
                    Agriculture
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label>
                  {getText(
                    language,
                    "amount"
                  )}
                </label>

                <input
                  type="number"
                  name="required_amount"
                  min="0"
                  required
                  value={
                    form.required_amount
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="1000000"
                />
              </div>

              <div className="form-group">
                <label>
                  {getText(
                    language,
                    "state"
                  )}
                </label>

                <input
                  type="text"
                  name="state"
                  required
                  value={
                    form.state
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Rajasthan"
                />
              </div>

              <div className="form-group">
                <label>
                  {getText(
                    language,
                    "district"
                  )}
                </label>

                <input
                  type="text"
                  name="district"
                  required
                  value={
                    form.district
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Jaipur"
                />
              </div>

            </div>

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? getText(
                    language,
                    "loading"
                  )
                : `🔍 ${getText(
                    language,
                    "match"
                  )}`}
            </button>

          </form>
        </section>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="error-box">
            ⚠️ {error}
          </div>
        )}

        {/* ================= RESULTS ================= */}

        {matches.length > 0 && (
          <section className="results-section">

            <div className="results-heading">

              <div>
                <h2>
                  {getText(
                    language,
                    "results"
                  )}
                </h2>

                <p>
                  {getText(
                    language,
                    "resultSub"
                  )}
                </p>
              </div>

              <div className="result-count">
                {matches.length} schemes
              </div>

            </div>

            <div className="result-summary">

              <div className="summary-item">
                <span>
                  {getText(
                    language,
                    "total"
                  )}
                </span>

                <strong>
                  {matches.length}
                </strong>
              </div>

              <div className="summary-item">
                <span>
                  {getText(
                    language,
                    "strong"
                  )}
                </span>

                <strong>
                  {strongCount}
                </strong>
              </div>

              <div className="summary-item">
                <span>
                  {getText(
                    language,
                    "verification"
                  )}
                </span>

                <strong>
                  {verificationCount}
                </strong>
              </div>

              <div className="summary-item best-score">
                <span>
                  {getText(
                    language,
                    "bestScore"
                  )}
                </span>

                <strong>
                  {bestMatchScore.toFixed(
                    1
                  )}
                </strong>
              </div>

            </div>

            <div className="scheme-grid">

              {matches.map(
                (scheme, index) => {

                  const score =
                    Number(
                      scheme.combined_score ??
                        0
                    );

                  const isBestMatch =
                    score ===
                    bestMatchScore;

                  const {
                    reasons,
                    missing,
                    verification,
                  } =
                    getEligibilityItems(
                      scheme
                    );

                  return (
                    <article
                      className={`scheme-card ${
                        isBestMatch
                          ? "best-match-card"
                          : ""
                      }`}
                      key={
                        scheme.id ||
                        index
                      }
                    >

                      {isBestMatch && (
                        <div className="best-match-badge">
                          {getText(
                            language,
                            "best"
                          )}
                        </div>
                      )}

                      <h3>
                        {getSchemeName(
                          scheme
                        )}
                      </h3>

                      <div
                        className={`status-badge ${(
                          scheme.status ||
                          "Review Required"
                        )
                          .toLowerCase()
                          .replaceAll(
                            " ",
                            "-"
                          )}`}
                      >
                        {scheme.status ||
                          "Review Required"}
                      </div>

                      {scheme.description && (
                        <p className="scheme-description">
                          {
                            scheme.description
                          }
                        </p>
                      )}

                      <div className="score-breakdown">

                        <div className="score-item">
                          <span>
                            {getText(
                              language,
                              "eligibility"
                            )}
                          </span>

                          <strong>
                            {Number(
                              scheme.match_score ??
                                0
                            )}
                            %
                          </strong>
                        </div>

                        <div className="score-item">
                          <span>
                            {getText(
                              language,
                              "aiRelevance"
                            )}
                          </span>

                          <strong>
                            {Number(
                              scheme.ai_relevance ??
                                0
                            ).toFixed(
                              1
                            )}
                            %
                          </strong>
                        </div>

                        <div className="score-item combined">
                          <span>
                            {getText(
                              language,
                              "combined"
                            )}
                          </span>

                          <strong>
                            {score.toFixed(
                              1
                            )}
                          </strong>
                        </div>

                      </div>

                      <div className="score-explanation">

                        <strong>
                          💡{" "}
                          {getText(
                            language,
                            "scoreExplanation"
                          )}
                        </strong>

                        <p>
                          {getScoreExplanation(
                            scheme,
                            language
                          )}
                        </p>

                      </div>

                      <div className="transparency-box">

                        <div className="transparency-title">
                          🔎{" "}
                          {getText(
                            language,
                            "why"
                          )}
                        </div>

                        <div className="transparency-grid">

                          <div className="criteria-box matched">

                            <div className="criteria-heading">
                              ✓{" "}
                              {getText(
                                language,
                                "matched"
                              )}
                            </div>

                            {reasons.length >
                            0 ? (
                              <ul>
                                {reasons.map(
                                  (
                                    reason,
                                    i
                                  ) => (
                                    <li
                                      key={
                                        i
                                      }
                                    >
                                      {
                                        reason
                                      }
                                    </li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <div className="empty-criteria">
                                {getText(
                                  language,
                                  "noMatched"
                                )}
                              </div>
                            )}

                          </div>

                          <div className="criteria-box verify">

                            <div className="criteria-heading">
                              ⚠{" "}
                              {getText(
                                language,
                                "check"
                              )}
                            </div>

                            {missing.length >
                              0 ||
                            verification.length >
                              0 ? (
                              <ul>

                                {missing.map(
                                  (
                                    item,
                                    i
                                  ) => (
                                    <li
                                      key={`m-${i}`}
                                    >
                                      {
                                        item
                                      }
                                    </li>
                                  )
                                )}

                                {verification.map(
                                  (
                                    item,
                                    i
                                  ) => (
                                    <li
                                      key={`v-${i}`}
                                    >
                                      {
                                        item
                                      }
                                    </li>
                                  )
                                )}

                              </ul>
                            ) : (
                              <div className="empty-criteria">
                                {getText(
                                  language,
                                  "noChecks"
                                )}
                              </div>
                            )}

                          </div>

                        </div>
                      </div>

                      <div className="card-actions">

                        <button
                          className="secondary-button"
                          onClick={() =>
                            setSelectedScheme(
                              scheme
                            )
                          }
                        >
                          {getText(
                            language,
                            "viewDetails"
                          )}{" "}
                          →
                        </button>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          </section>
        )}

        {!loading &&
          matches.length === 0 &&
          !error && (
            <div className="empty-state">

              <div>
                🔍
              </div>

              <h3>
                {getText(
                  language,
                  "noResults"
                )}
              </h3>

              <p>
                {getText(
                  language,
                  "noResultsSub"
                )}
              </p>

            </div>
          )}

      </main>

      {/* ================= MODAL ================= */}

      {selectedScheme && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedScheme(
              null
            )
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedScheme(
                  null
                )
              }
            >
              ×
            </button>

            {Number(
              selectedScheme.combined_score ??
                0
            ) ===
              bestMatchScore && (
              <div className="best-match-badge modal-best-match">
                {getText(
                  language,
                  "best"
                )}
              </div>
            )}

            <h2>
              {getSchemeName(
                selectedScheme
              )}
            </h2>

            <div
              className={`status-badge ${(
                selectedScheme.status ||
                "Review Required"
              )
                .toLowerCase()
                .replaceAll(
                  " ",
                  "-"
                )}`}
            >
              {selectedScheme.status ||
                "Review Required"}
            </div>

            <div className="score-breakdown">

              <div className="score-item">
                <span>
                  {getText(
                    language,
                    "eligibility"
                  )}
                </span>

                <strong>
                  {Number(
                    selectedScheme.match_score ??
                      0
                  )}
                  %
                </strong>
              </div>

              <div className="score-item">
                <span>
                  {getText(
                    language,
                    "aiRelevance"
                  )}
                </span>

                <strong>
                  {Number(
                    selectedScheme.ai_relevance ??
                      0
                  ).toFixed(
                    1
                  )}
                  %
                </strong>
              </div>

              <div className="score-item combined">
                <span>
                  {getText(
                    language,
                    "combined"
                  )}
                </span>

                <strong>
                  {Number(
                    selectedScheme.combined_score ??
                      0
                  ).toFixed(
                    1
                  )}
                </strong>
              </div>

            </div>

            <div className="transparency-box">

              <div className="transparency-title">
                🔎{" "}
                {getText(
                  language,
                  "why"
                )}
              </div>

              {(() => {

                const {
                  reasons,
                  missing,
                  verification,
                } =
                  getEligibilityItems(
                    selectedScheme
                  );

                return (
                  <div className="transparency-grid">

                    <div className="criteria-box matched">

                      <div className="criteria-heading">
                        ✓{" "}
                        {getText(
                          language,
                          "matched"
                        )}
                      </div>

                      {reasons.length >
                      0 ? (
                        <ul>
                          {reasons.map(
                            (
                              item,
                              i
                            ) => (
                              <li
                                key={
                                  i
                                }
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <div className="empty-criteria">
                          {getText(
                            language,
                            "noMatched"
                          )}
                        </div>
                      )}

                    </div>

                    <div className="criteria-box verify">

                      <div className="criteria-heading">
                        ⚠{" "}
                        {getText(
                          language,
                          "check"
                        )}
                      </div>

                      {missing.length >
                        0 ||
                      verification.length >
                        0 ? (
                        <ul>

                          {missing.map(
                            (
                              item,
                              i
                            ) => (
                              <li
                                key={`m-${i}`}
                              >
                                {
                                  item
                                }
                              </li>
                            )
                          )}

                          {verification.map(
                            (
                              item,
                              i
                            ) => (
                              <li
                                key={`v-${i}`}
                              >
                                {
                                  item
                                }
                              </li>
                            )
                          )}

                        </ul>
                      ) : (
                        <div className="empty-criteria">
                          {getText(
                            language,
                            "noChecks"
                          )}
                        </div>
                      )}

                    </div>

                  </div>
                );

              })()}

            </div>

            {selectedScheme.description && (
              <div className="modal-section">

                <h3>
                  📖{" "}
                  {getText(
                    language,
                    "about"
                  )}
                </h3>

                <p>
                  {
                    selectedScheme.description
                  }
                </p>

              </div>
            )}

            {Array.isArray(
              selectedScheme.documents
            ) &&
              selectedScheme.documents
                .length > 0 && (
                <div className="modal-section">

                  <h3>
                    📄{" "}
                    {getText(
                      language,
                      "documents"
                    )}
                  </h3>

                  <ul>

                    {selectedScheme.documents.map(
                      (
                        doc,
                        i
                      ) => (
                        <li
                          key={i}
                        >
                          {doc}
                        </li>
                      )
                    )}

                  </ul>

                </div>
              )}

            {(selectedScheme.official_website ||
              selectedScheme.official_link) && (
              <div className="modal-section">

                <h3>
                  🌐{" "}
                  {getText(
                    language,
                    "official"
                  )}
                </h3>

                <a
                  href={
                    selectedScheme.official_website ||
                    selectedScheme.official_link
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="official-link"
                >
                  {
                    selectedScheme.official_website ||
                    selectedScheme.official_link
                  }
                </a>

              </div>
            )}

            <button
              className="primary-button modal-button"
              onClick={() =>
                setSelectedScheme(
                  null
                )
              }
            >
              {getText(
                language,
                "close"
              )}
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;