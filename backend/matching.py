def calculate_match(user, scheme):

    score = 0
    reasons = []
    missing = []
    verification_required = []

    # =========================================================
    # LANGUAGE
    # =========================================================

    language = user.get("language", "en")

    if language not in [
        "en",
        "hi",
        "bn",
        "ta",
        "te",
        "mr",
        "gu",
        "kn",
        "ml",
        "pa",
    ]:
        language = "en"

    # =========================================================
    # TRANSLATIONS
    # =========================================================

    translations = {

        "en": {
            "category_match": "Your social category matches this scheme.",
            "category_all": "This scheme is open to your social category.",
            "gender_all": "The scheme is open to all genders.",
            "gender_match": "Your gender matches this scheme.",
            "business_match": "Your business type matches this scheme.",
            "business_all": "This scheme supports your type of business.",
            "age_match": "Your age matches the scheme criteria.",
            "state_match": "The scheme is available for your state.",
            "amount_match": "Required amount is within the scheme limit.",
            "pmegp_amount_match": "Required project amount is within the applicable PMEGP project-cost limit.",
            "financial_verify": "Financial support limit requires scheme-specific verification.",
            "project_verify": "Applicable project-cost limit requires verification.",
            "source_verify": "Scheme eligibility details require official-source verification.",
            "category_missing": "Social category requirement does not match.",
            "gender_missing": "Gender requirement does not match.",
            "business_missing": "Business type does not match.",
            "age_missing": "Age requirement does not match.",
            "state_missing": "The scheme is not listed for your state.",
            "amount_above": "Required amount is above the scheme limit of ₹{amount:,.0f}.",
            "project_above": "Required project amount exceeds the applicable limit of ₹{amount:,.0f}.",
        },

        "hi": {
            "category_match": "आपकी सामाजिक श्रेणी इस योजना से मेल खाती है।",
            "category_all": "यह योजना आपकी सामाजिक श्रेणी के लिए उपलब्ध है।",
            "gender_all": "यह योजना सभी लिंगों के लिए उपलब्ध है।",
            "gender_match": "आपका लिंग इस योजना के मानदंड से मेल खाता है।",
            "business_match": "आपके व्यवसाय का प्रकार इस योजना से मेल खाता है।",
            "business_all": "यह योजना आपके व्यवसाय के प्रकार का समर्थन करती है।",
            "age_match": "आपकी आयु योजना के मानदंड से मेल खाती है।",
            "state_match": "यह योजना आपके राज्य में उपलब्ध है।",
            "amount_match": "आपकी आवश्यक राशि योजना की सीमा के अंदर है।",
            "pmegp_amount_match": "आपकी आवश्यक परियोजना राशि लागू PMEGP परियोजना लागत सीमा के अंदर है।",
            "financial_verify": "वित्तीय सहायता की सीमा के लिए योजना-विशिष्ट सत्यापन आवश्यक है।",
            "project_verify": "लागू परियोजना लागत सीमा के लिए सत्यापन आवश्यक है।",
            "source_verify": "योजना की पात्रता संबंधी जानकारी के लिए आधिकारिक स्रोत से सत्यापन आवश्यक है।",
            "category_missing": "सामाजिक श्रेणी की आवश्यकता मेल नहीं खाती।",
            "gender_missing": "लिंग संबंधी आवश्यकता मेल नहीं खाती।",
            "business_missing": "व्यवसाय का प्रकार मेल नहीं खाता।",
            "age_missing": "आयु संबंधी आवश्यकता मेल नहीं खाती।",
            "state_missing": "यह योजना आपके राज्य के लिए सूचीबद्ध नहीं है।",
            "amount_above": "आवश्यक राशि योजना की ₹{amount:,.0f} सीमा से अधिक है।",
            "project_above": "आवश्यक परियोजना राशि ₹{amount:,.0f} की लागू सीमा से अधिक है।",
        },

        "bn": {
            "category_match": "আপনার সামাজিক শ্রেণি এই স্কিমের সঙ্গে মেলে।",
            "category_all": "এই স্কিমটি আপনার সামাজিক শ্রেণির জন্য উপলব্ধ।",
            "gender_all": "এই স্কিমটি সকল লিঙ্গের জন্য উপলব্ধ।",
            "gender_match": "আপনার লিঙ্গ এই স্কিমের মানদণ্ডের সঙ্গে মেলে।",
            "business_match": "আপনার ব্যবসার ধরন এই স্কিমের সঙ্গে মেলে।",
            "business_all": "এই স্কিমটি আপনার ব্যবসার ধরনকে সমর্থন করে।",
            "age_match": "আপনার বয়স এই স্কিমের মানদণ্ডের সঙ্গে মেলে।",
            "state_match": "এই স্কিমটি আপনার রাজ্যে উপলব্ধ।",
            "amount_match": "আপনার প্রয়োজনীয় অর্থ স্কিমের সীমার মধ্যে রয়েছে।",
            "pmegp_amount_match": "আপনার প্রয়োজনীয় প্রকল্পের অর্থ প্রযোজ্য PMEGP প্রকল্প ব্যয়ের সীমার মধ্যে রয়েছে।",
            "financial_verify": "আর্থিক সহায়তার সীমার জন্য স্কিম-নির্দিষ্ট যাচাই প্রয়োজন।",
            "project_verify": "প্রযোজ্য প্রকল্প ব্যয়ের সীমার জন্য যাচাই প্রয়োজন।",
            "source_verify": "স্কিমের যোগ্যতার তথ্যের জন্য সরকারি উৎস থেকে যাচাই প্রয়োজন।",
            "category_missing": "সামাজিক শ্রেণির প্রয়োজনীয়তা মেলে না।",
            "gender_missing": "লিঙ্গের প্রয়োজনীয়তা মেলে না।",
            "business_missing": "ব্যবসার ধরন মেলে না।",
            "age_missing": "বয়সের প্রয়োজনীয়তা মেলে না।",
            "state_missing": "এই স্কিমটি আপনার রাজ্যের জন্য তালিকাভুক্ত নয়।",
            "amount_above": "প্রয়োজনীয় অর্থ স্কিমের ₹{amount:,.0f} সীমার বেশি।",
            "project_above": "প্রয়োজনীয় প্রকল্পের অর্থ ₹{amount:,.0f} প্রযোজ্য সীমার বেশি।",
        },

        "ta": {
            "category_match": "உங்கள் சமூக வகை இந்த திட்டத்துடன் பொருந்துகிறது.",
            "category_all": "இந்த திட்டம் உங்கள் சமூக வகைக்கு கிடைக்கிறது.",
            "gender_all": "இந்த திட்டம் அனைத்து பாலினத்தவர்களுக்கும் கிடைக்கிறது.",
            "gender_match": "உங்கள் பாலினம் இந்த திட்டத்தின் அளவுகோலுடன் பொருந்துகிறது.",
            "business_match": "உங்கள் வணிக வகை இந்த திட்டத்துடன் பொருந்துகிறது.",
            "business_all": "இந்த திட்டம் உங்கள் வணிக வகையை ஆதரிக்கிறது.",
            "age_match": "உங்கள் வயது திட்டத்தின் தகுதி அளவுகோலுடன் பொருந்துகிறது.",
            "state_match": "இந்த திட்டம் உங்கள் மாநிலத்தில் கிடைக்கிறது.",
            "amount_match": "உங்களுக்கு தேவையான தொகை திட்ட வரம்பிற்குள் உள்ளது.",
            "pmegp_amount_match": "உங்களுக்கு தேவையான திட்டத் தொகை பொருந்தும் PMEGP திட்ட செலவு வரம்பிற்குள் உள்ளது.",
            "financial_verify": "நிதி உதவி வரம்பிற்கு திட்டம் சார்ந்த சரிபார்ப்பு தேவை.",
            "project_verify": "பொருந்தும் திட்ட செலவு வரம்பிற்கு சரிபார்ப்பு தேவை.",
            "source_verify": "திட்ட தகுதி விவரங்களுக்கு அதிகாரப்பூர்வ ஆதார சரிபார்ப்பு தேவை.",
            "category_missing": "சமூக வகை தகுதி பொருந்தவில்லை.",
            "gender_missing": "பாலின தகுதி பொருந்தவில்லை.",
            "business_missing": "வணிக வகை பொருந்தவில்லை.",
            "age_missing": "வயது தகுதி பொருந்தவில்லை.",
            "state_missing": "இந்த திட்டம் உங்கள் மாநிலத்திற்கு பட்டியலிடப்படவில்லை.",
            "amount_above": "தேவையான தொகை திட்டத்தின் ₹{amount:,.0f} வரம்பை மீறுகிறது.",
            "project_above": "தேவையான திட்டத் தொகை ₹{amount:,.0f} பொருந்தும் வரம்பை மீறுகிறது.",
        },

        "te": {
            "category_match": "మీ సామాజిక వర్గం ఈ పథకానికి సరిపోతుంది.",
            "category_all": "ఈ పథకం మీ సామాజిక వర్గానికి అందుబాటులో ఉంది.",
            "gender_all": "ఈ పథకం అన్ని లింగాలకు అందుబాటులో ఉంది.",
            "gender_match": "మీ లింగం ఈ పథకం ప్రమాణాలకు సరిపోతుంది.",
            "business_match": "మీ వ్యాపార రకం ఈ పథకానికి సరిపోతుంది.",
            "business_all": "ఈ పథకం మీ వ్యాపార రకానికి మద్దతు ఇస్తుంది.",
            "age_match": "మీ వయస్సు పథకం ప్రమాణాలకు సరిపోతుంది.",
            "state_match": "ఈ పథకం మీ రాష్ట్రంలో అందుబాటులో ఉంది.",
            "amount_match": "మీకు అవసరమైన మొత్తం పథకం పరిమితిలో ఉంది.",
            "pmegp_amount_match": "మీకు అవసరమైన ప్రాజెక్ట్ మొత్తం వర్తించే PMEGP ప్రాజెక్ట్ ఖర్చు పరిమితిలో ఉంది.",
            "financial_verify": "ఆర్థిక సహాయ పరిమితికి పథకం-నిర్దిష్ట ధృవీకరణ అవసరం.",
            "project_verify": "వర్తించే ప్రాజెక్ట్ ఖర్చు పరిమితికి ధృవీకరణ అవసరం.",
            "source_verify": "పథకం అర్హత వివరాలకు అధికారిక మూలం ద్వారా ధృవీకరణ అవసరం.",
            "category_missing": "సామాజిక వర్గం అవసరం సరిపోలలేదు.",
            "gender_missing": "లింగ అవసరం సరిపోలలేదు.",
            "business_missing": "వ్యాపార రకం సరిపోలలేదు.",
            "age_missing": "వయస్సు అవసరం సరిపోలలేదు.",
            "state_missing": "ఈ పథకం మీ రాష్ట్రానికి జాబితా చేయబడలేదు.",
            "amount_above": "అవసరమైన మొత్తం పథకం ₹{amount:,.0f} పరిమితిని మించింది.",
            "project_above": "అవసరమైన ప్రాజెక్ట్ మొత్తం ₹{amount:,.0f} వర్తించే పరిమితిని మించింది.",
        },

        "mr": {
            "category_match": "तुमचा सामाजिक प्रवर्ग या योजनेशी जुळतो.",
            "category_all": "ही योजना तुमच्या सामाजिक प्रवर्गासाठी उपलब्ध आहे.",
            "gender_all": "ही योजना सर्व लिंगांसाठी उपलब्ध आहे.",
            "gender_match": "तुमचे लिंग या योजनेच्या निकषांशी जुळते.",
            "business_match": "तुमच्या व्यवसायाचा प्रकार या योजनेशी जुळतो.",
            "business_all": "ही योजना तुमच्या व्यवसायाच्या प्रकाराला समर्थन देते.",
            "age_match": "तुमचे वय योजनेच्या निकषांशी जुळते.",
            "state_match": "ही योजना तुमच्या राज्यात उपलब्ध आहे.",
            "amount_match": "तुम्हाला आवश्यक असलेली रक्कम योजनेच्या मर्यादेत आहे.",
            "pmegp_amount_match": "तुम्हाला आवश्यक असलेली प्रकल्प रक्कम लागू PMEGP प्रकल्प खर्च मर्यादेत आहे.",
            "financial_verify": "आर्थिक सहाय्याच्या मर्यादेसाठी योजना-विशिष्ट पडताळणी आवश्यक आहे.",
            "project_verify": "लागू प्रकल्प खर्च मर्यादेसाठी पडताळणी आवश्यक आहे.",
            "source_verify": "योजनेच्या पात्रतेच्या माहितीसाठी अधिकृत स्रोताद्वारे पडताळणी आवश्यक आहे.",
            "category_missing": "सामाजिक प्रवर्गाची आवश्यकता जुळत नाही.",
            "gender_missing": "लिंगाची आवश्यकता जुळत नाही.",
            "business_missing": "व्यवसायाचा प्रकार जुळत नाही.",
            "age_missing": "वयाची आवश्यकता जुळत नाही.",
            "state_missing": "ही योजना तुमच्या राज्यासाठी सूचीबद्ध नाही.",
            "amount_above": "आवश्यक रक्कम योजनेच्या ₹{amount:,.0f} मर्यादेपेक्षा जास्त आहे.",
            "project_above": "आवश्यक प्रकल्प रक्कम ₹{amount:,.0f} च्या लागू मर्यादेपेक्षा जास्त आहे.",
        },

        "gu": {
            "category_match": "તમારો સામાજિક વર્ગ આ યોજના સાથે મેળ ખાય છે.",
            "category_all": "આ યોજના તમારા સામાજિક વર્ગ માટે ઉપલબ્ધ છે.",
            "gender_all": "આ યોજના તમામ લિંગ માટે ઉપલબ્ધ છે.",
            "gender_match": "તમારું લિંગ આ યોજનાના માપદંડ સાથે મેળ ખાય છે.",
            "business_match": "તમારા વ્યવસાયનો પ્રકાર આ યોજના સાથે મેળ ખાય છે.",
            "business_all": "આ યોજના તમારા વ્યવસાયના પ્રકારને સહાય આપે છે.",
            "age_match": "તમારી ઉંમર યોજનાના માપદંડ સાથે મેળ ખાય છે.",
            "state_match": "આ યોજના તમારા રાજ્યમાં ઉપલબ્ધ છે.",
            "amount_match": "તમને જરૂરી રકમ યોજનાની મર્યાદામાં છે.",
            "pmegp_amount_match": "તમને જરૂરી પ્રોજેક્ટ રકમ લાગુ PMEGP પ્રોજેક્ટ ખર્ચ મર્યાદામાં છે.",
            "financial_verify": "નાણાકીય સહાયની મર્યાદા માટે યોજના-વિશિષ્ટ ચકાસણી જરૂરી છે.",
            "project_verify": "લાગુ પ્રોજેક્ટ ખર્ચ મર્યાદા માટે ચકાસણી જરૂરી છે.",
            "source_verify": "યોજનાની પાત્રતા વિગતો માટે સત્તાવાર સ્ત્રોત દ્વારા ચકાસણી જરૂરી છે.",
            "category_missing": "સામાજિક વર્ગની જરૂરિયાત મેળ ખાતી નથી.",
            "gender_missing": "લિંગની જરૂરિયાત મેળ ખાતી નથી.",
            "business_missing": "વ્યવસાયનો પ્રકાર મેળ ખાતો નથી.",
            "age_missing": "ઉંમરની જરૂરિયાત મેળ ખાતી નથી.",
            "state_missing": "આ યોજના તમારા રાજ્ય માટે સૂચિબદ્ધ નથી.",
            "amount_above": "જરૂરી રકમ યોજનાની ₹{amount:,.0f} મર્યાદા કરતાં વધુ છે.",
            "project_above": "જરૂરી પ્રોજેક્ટ રકમ ₹{amount:,.0f} ની લાગુ મર્યાદા કરતાં વધુ છે.",
        },

        "kn": {
            "category_match": "ನಿಮ್ಮ ಸಾಮಾಜಿಕ ವರ್ಗವು ಈ ಯೋಜನೆಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.",
            "category_all": "ಈ ಯೋಜನೆಯು ನಿಮ್ಮ ಸಾಮಾಜಿಕ ವರ್ಗಕ್ಕೆ ಲಭ್ಯವಿದೆ.",
            "gender_all": "ಈ ಯೋಜನೆಯು ಎಲ್ಲಾ ಲಿಂಗಗಳಿಗೂ ಲಭ್ಯವಿದೆ.",
            "gender_match": "ನಿಮ್ಮ ಲಿಂಗವು ಈ ಯೋಜನೆಯ ಮಾನದಂಡಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.",
            "business_match": "ನಿಮ್ಮ ವ್ಯವಹಾರದ ಪ್ರಕಾರವು ಈ ಯೋಜನೆಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.",
            "business_all": "ಈ ಯೋಜನೆಯು ನಿಮ್ಮ ವ್ಯವಹಾರದ ಪ್ರಕಾರವನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ.",
            "age_match": "ನಿಮ್ಮ ವಯಸ್ಸು ಯೋಜನೆಯ ಮಾನದಂಡಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.",
            "state_match": "ಈ ಯೋಜನೆಯು ನಿಮ್ಮ ರಾಜ್ಯದಲ್ಲಿ ಲಭ್ಯವಿದೆ.",
            "amount_match": "ನಿಮಗೆ ಅಗತ್ಯವಿರುವ ಮೊತ್ತವು ಯೋಜನೆಯ ಮಿತಿಯೊಳಗೆ ಇದೆ.",
            "pmegp_amount_match": "ನಿಮಗೆ ಅಗತ್ಯವಿರುವ ಯೋಜನಾ ಮೊತ್ತವು ಅನ್ವಯವಾಗುವ PMEGP ಯೋಜನಾ ವೆಚ್ಚದ ಮಿತಿಯೊಳಗೆ ಇದೆ.",
            "financial_verify": "ಹಣಕಾಸಿನ ಸಹಾಯದ ಮಿತಿಗೆ ಯೋಜನೆ-ನಿರ್ದಿಷ್ಟ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.",
            "project_verify": "ಅನ್ವಯವಾಗುವ ಯೋಜನಾ ವೆಚ್ಚದ ಮಿತಿಗೆ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.",
            "source_verify": "ಯೋಜನೆಯ ಅರ್ಹತಾ ವಿವರಗಳಿಗೆ ಅಧಿಕೃತ ಮೂಲದ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.",
            "category_missing": "ಸಾಮಾಜಿಕ ವರ್ಗದ ಅವಶ್ಯಕತೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.",
            "gender_missing": "ಲಿಂಗದ ಅವಶ್ಯಕತೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.",
            "business_missing": "ವ್ಯವಹಾರದ ಪ್ರಕಾರ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.",
            "age_missing": "ವಯಸ್ಸಿನ ಅವಶ್ಯಕತೆ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.",
            "state_missing": "ಈ ಯೋಜನೆಯು ನಿಮ್ಮ ರಾಜ್ಯಕ್ಕೆ ಪಟ್ಟಿ ಮಾಡಲಾಗಿಲ್ಲ.",
            "amount_above": "ಅಗತ್ಯವಿರುವ ಮೊತ್ತವು ಯೋಜನೆಯ ₹{amount:,.0f} ಮಿತಿಯನ್ನು ಮೀರಿದೆ.",
            "project_above": "ಅಗತ್ಯವಿರುವ ಯೋಜನಾ ಮೊತ್ತವು ₹{amount:,.0f} ಅನ್ವಯವಾಗುವ ಮಿತಿಯನ್ನು ಮೀರಿದೆ.",
        },

        "ml": {
            "category_match": "നിങ്ങളുടെ സാമൂഹിക വിഭാഗം ഈ പദ്ധതിയുമായി പൊരുത്തപ്പെടുന്നു.",
            "category_all": "ഈ പദ്ധതി നിങ്ങളുടെ സാമൂഹിക വിഭാഗത്തിന് ലഭ്യമാണ്.",
            "gender_all": "ഈ പദ്ധതി എല്ലാ ലിംഗങ്ങൾക്കും ലഭ്യമാണ്.",
            "gender_match": "നിങ്ങളുടെ ലിംഗം ഈ പദ്ധതിയുടെ മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്നു.",
            "business_match": "നിങ്ങളുടെ ബിസിനസ് തരം ഈ പദ്ധതിയുമായി പൊരുത്തപ്പെടുന്നു.",
            "business_all": "ഈ പദ്ധതി നിങ്ങളുടെ ബിസിനസ് തരത്തെ പിന്തുണയ്ക്കുന്നു.",
            "age_match": "നിങ്ങളുടെ പ്രായം പദ്ധതിയുടെ മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്നു.",
            "state_match": "ഈ പദ്ധതി നിങ്ങളുടെ സംസ്ഥാനത്ത് ലഭ്യമാണ്.",
            "amount_match": "നിങ്ങൾക്ക് ആവശ്യമായ തുക പദ്ധതിയുടെ പരിധിക്കുള്ളിലാണ്.",
            "pmegp_amount_match": "നിങ്ങൾക്ക് ആവശ്യമായ പ്രോജക്ട് തുക ബാധകമായ PMEGP പ്രോജക്ട് ചെലവ് പരിധിക്കുള്ളിലാണ്.",
            "financial_verify": "സാമ്പത്തിക സഹായ പരിധിക്ക് പദ്ധതി-നിർദ്ദിഷ്ട പരിശോധന ആവശ്യമാണ്.",
            "project_verify": "ബാധകമായ പ്രോജക്ട് ചെലവ് പരിധിക്ക് പരിശോധന ആവശ്യമാണ്.",
            "source_verify": "പദ്ധതിയുടെ യോഗ്യതാ വിവരങ്ങൾക്ക് ഔദ്യോഗിക ഉറവിട പരിശോധന ആവശ്യമാണ്.",
            "category_missing": "സാമൂഹിക വിഭാഗത്തിന്റെ ആവശ്യകത പൊരുത്തപ്പെടുന്നില്ല.",
            "gender_missing": "ലിംഗ ആവശ്യകത പൊരുത്തപ്പെടുന്നില്ല.",
            "business_missing": "ബിസിനസ് തരം പൊരുത്തപ്പെടുന്നില്ല.",
            "age_missing": "പ്രായ ആവശ്യകത പൊരുത്തപ്പെടുന്നില്ല.",
            "state_missing": "ഈ പദ്ധതി നിങ്ങളുടെ സംസ്ഥാനത്തിനായി പട്ടികപ്പെടുത്തിയിട്ടില്ല.",
            "amount_above": "ആവശ്യമായ തുക പദ്ധതിയുടെ ₹{amount:,.0f} പരിധി കവിയുന്നു.",
            "project_above": "ആവശ്യമായ പ്രോജക്ട് തുക ₹{amount:,.0f} ബാധകമായ പരിധി കവിയുന്നു.",
        },

        "pa": {
            "category_match": "ਤੁਹਾਡੀ ਸਮਾਜਿਕ ਸ਼੍ਰੇਣੀ ਇਸ ਸਕੀਮ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਹੈ।",
            "category_all": "ਇਹ ਸਕੀਮ ਤੁਹਾਡੀ ਸਮਾਜਿਕ ਸ਼੍ਰੇਣੀ ਲਈ ਉਪਲਬਧ ਹੈ।",
            "gender_all": "ਇਹ ਸਕੀਮ ਸਾਰੇ ਲਿੰਗਾਂ ਲਈ ਉਪਲਬਧ ਹੈ।",
            "gender_match": "ਤੁਹਾਡਾ ਲਿੰਗ ਇਸ ਸਕੀਮ ਦੇ ਮਾਪਦੰਡ ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ।",
            "business_match": "ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਦੀ ਕਿਸਮ ਇਸ ਸਕੀਮ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਹੈ।",
            "business_all": "ਇਹ ਸਕੀਮ ਤੁਹਾਡੇ ਕਾਰੋਬਾਰ ਦੀ ਕਿਸਮ ਨੂੰ ਸਹਾਇਤਾ ਦਿੰਦੀ ਹੈ।",
            "age_match": "ਤੁਹਾਡੀ ਉਮਰ ਸਕੀਮ ਦੇ ਮਾਪਦੰਡ ਨਾਲ ਮੇਲ ਖਾਂਦੀ ਹੈ।",
            "state_match": "ਇਹ ਸਕੀਮ ਤੁਹਾਡੇ ਰਾਜ ਵਿੱਚ ਉਪਲਬਧ ਹੈ।",
            "amount_match": "ਤੁਹਾਨੂੰ ਲੋੜੀਂਦੀ ਰਕਮ ਸਕੀਮ ਦੀ ਸੀਮਾ ਦੇ ਅੰਦਰ ਹੈ।",
            "pmegp_amount_match": "ਤੁਹਾਨੂੰ ਲੋੜੀਂਦੀ ਪ੍ਰੋਜੈਕਟ ਰਕਮ ਲਾਗੂ PMEGP ਪ੍ਰੋਜੈਕਟ ਲਾਗਤ ਸੀਮਾ ਦੇ ਅੰਦਰ ਹੈ।",
            "financial_verify": "ਵਿੱਤੀ ਸਹਾਇਤਾ ਦੀ ਸੀਮਾ ਲਈ ਸਕੀਮ-ਵਿਸ਼ੇਸ਼ ਤਸਦੀਕ ਲੋੜੀਂਦੀ ਹੈ।",
            "project_verify": "ਲਾਗੂ ਪ੍ਰੋਜੈਕਟ ਲਾਗਤ ਸੀਮਾ ਲਈ ਤਸਦੀਕ ਲੋੜੀਂਦੀ ਹੈ।",
            "source_verify": "ਸਕੀਮ ਦੀ ਯੋਗਤਾ ਸੰਬੰਧੀ ਵੇਰਵਿਆਂ ਲਈ ਅਧਿਕਾਰਤ ਸਰੋਤ ਤੋਂ ਤਸਦੀਕ ਲੋੜੀਂਦੀ ਹੈ।",
            "category_missing": "ਸਮਾਜਿਕ ਸ਼੍ਰੇਣੀ ਦੀ ਲੋੜ ਮੇਲ ਨਹੀਂ ਖਾਂਦੀ।",
            "gender_missing": "ਲਿੰਗ ਦੀ ਲੋੜ ਮੇਲ ਨਹੀਂ ਖਾਂਦੀ।",
            "business_missing": "ਕਾਰੋਬਾਰ ਦੀ ਕਿਸਮ ਮੇਲ ਨਹੀਂ ਖਾਂਦੀ।",
            "age_missing": "ਉਮਰ ਦੀ ਲੋੜ ਮੇਲ ਨਹੀਂ ਖਾਂਦੀ।",
            "state_missing": "ਇਹ ਸਕੀਮ ਤੁਹਾਡੇ ਰਾਜ ਲਈ ਸੂਚੀਬੱਧ ਨਹੀਂ ਹੈ।",
            "amount_above": "ਲੋੜੀਂਦੀ ਰਕਮ ਸਕੀਮ ਦੀ ₹{amount:,.0f} ਸੀਮਾ ਤੋਂ ਵੱਧ ਹੈ।",
            "project_above": "ਲੋੜੀਂਦੀ ਪ੍ਰੋਜੈਕਟ ਰਕਮ ₹{amount:,.0f} ਦੀ ਲਾਗੂ ਸੀਮਾ ਤੋਂ ਵੱਧ ਹੈ।",
        },
    }

    t = translations.get(language, translations["en"])

    # =========================================================
    # CATEGORY
    # =========================================================

    user_category = user.get("category")
    scheme_categories = scheme.get("category", [])

    if user_category in scheme_categories:
        score += 30
        reasons.append(t["category_match"])

    elif "All" in scheme_categories:
        score += 30
        reasons.append(t["category_all"])

    else:
        missing.append(t["category_missing"])

    # =========================================================
    # GENDER
    # =========================================================

    user_gender = user.get("gender")
    scheme_gender = scheme.get("gender", [])

    if "All" in scheme_gender:
        score += 10
        reasons.append(t["gender_all"])

    elif user_gender in scheme_gender:
        score += 10
        reasons.append(t["gender_match"])

    else:
        missing.append(t["gender_missing"])

    # =========================================================
    # BUSINESS TYPE
    # =========================================================

    user_business = user.get("business_type")
    scheme_business_types = scheme.get("business_types", [])

    if user_business in scheme_business_types:
        score += 25
        reasons.append(t["business_match"])

    elif "All" in scheme_business_types:
        score += 25
        reasons.append(t["business_all"])

    else:
        missing.append(t["business_missing"])

    # =========================================================
    # AGE
    # =========================================================

    age = user.get("age")

    min_age = scheme.get("min_age")
    max_age = scheme.get("max_age")

    age_match = True

    if age is not None:

        if min_age is not None and age < min_age:
            age_match = False

        if max_age is not None and age > max_age:
            age_match = False

    if age_match:
        score += 10
        reasons.append(t["age_match"])

    else:
        missing.append(t["age_missing"])

    # =========================================================
    # STATE
    # =========================================================

    user_state = user.get("state")
    scheme_states = scheme.get("states", [])

    if "All" in scheme_states or user_state in scheme_states:
        score += 10
        reasons.append(t["state_match"])

    else:
        missing.append(t["state_missing"])

    # =========================================================
    # FINANCIAL REQUIREMENT
    # =========================================================

    required_amount = user.get("required_amount", 0)

    try:
        required_amount = float(required_amount)
    except (ValueError, TypeError):
        required_amount = 0

    max_loan = scheme.get("max_loan")

    if max_loan is not None:

        try:
            max_loan = float(max_loan)

            if required_amount <= max_loan:

                score += 15
                reasons.append(t["amount_match"])

            else:

                missing.append(
                    t["amount_above"].format(
                        amount=max_loan
                    )
                )

        except (ValueError, TypeError):

            score += 15

            verification_required.append(
                t["financial_verify"]
            )

    # =========================================================
    # PMEGP SPECIAL LIMIT
    # =========================================================

    elif scheme.get("id") == "pmegp":

        if user_business == "Manufacturing":

            max_amount = scheme.get(
                "max_project_cost_manufacturing"
            )

        elif user_business == "Services":

            max_amount = scheme.get(
                "max_project_cost_service"
            )

        else:

            max_amount = None

        if max_amount is None:

            score += 15

            verification_required.append(
                t["project_verify"]
            )

        else:

            try:
                max_amount = float(max_amount)

                if required_amount <= max_amount:

                    score += 15

                    reasons.append(
                        t["pmegp_amount_match"]
                    )

                else:

                    missing.append(
                        t["project_above"].format(
                            amount=max_amount
                        )
                    )

            except (ValueError, TypeError):

                score += 15

                verification_required.append(
                    t["project_verify"]
                )

    # =========================================================
    # LOAN LIMIT
    # =========================================================

    elif scheme.get("loan_limit") is not None:

        score += 15

        verification_required.append(
            t["financial_verify"]
        )

    # =========================================================
    # UNKNOWN FINANCIAL SUPPORT
    # =========================================================

    else:

        score += 15

        verification_required.append(
            t["financial_verify"]
        )

    # =========================================================
    # OFFICIAL SOURCE VERIFICATION
    # =========================================================

    source_status = scheme.get("source_status", "")

    if "Official source required" in source_status:

        verification_required.append(
            t["source_verify"]
        )

    # =========================================================
    # FINAL STATUS
    #
    # Status English me rakha gaya hai because frontend
    # counting + CSS isi values par depend karta hai.
    # =========================================================

    if missing:

        status = "Not Matched"

    elif verification_required:

        if score >= 80:
            status = "Verification Required"
        else:
            status = "Review Required"

    elif score >= 80:

        status = "Strong Recommendation"

    else:

        status = "Review Required"

    # =========================================================
    # FINAL RESPONSE
    # =========================================================

    return {
        "score": min(score, 100),
        "status": status,
        "reasons": reasons,
        "missing": missing,
        "verification_required": verification_required,
    }