/**
 * AuraLife Energy Therapy - Internationalization (i18n) Module
 * Complete Bilingual Support (English & Tamil)
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    var exp = factory();
    root.AuraLife_i18n = exp;
    root.t = exp.t;
    root.currentLanguage = exp.getCurrentLanguage();
    root.setLanguage = exp.setLanguage;
    root.toggleLanguage = exp.toggleLanguage;
    root.initLanguage = exp.initLanguage;
    root.applyTranslations = exp.applyTranslations;
    root.applyLanguage = exp.applyLanguage;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var STORAGE_KEY = 'auralife_lang';
  var currentLang = (function () {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (e) {
      return 'en';
    }
  })();

  var translations = {
    en: {
      // Navigation
      nav_brand: 'AuraLife Energy Therapy',
      nav_about: 'About Energy',
      nav_services: 'Services',
      nav_chakras: 'Chakra Guide',
      nav_book: 'Book Session',
      nav_report: 'Sample Report',
      lang_toggle: 'தமிழ்',

      // Hero
      hero_title: 'Balance Your Energy Body for Better Health & Better Life Mileage',
      hero_subtitle: 'Remote Energy Therapy by a Certified Energy Therapist for physical recovery, mental peace, prosperity, and long-distance family care.',
      hero_cta: 'Request Energy Therapy',

      // About Anatomy
      about_title: 'Understanding Your Energy Anatomy',
      about_subtitle: 'True wellness begins when both your visible physical body and subtle energy body work in harmony.',
      about_physical_title: '1. Physical & Energy Bodies',
      about_physical_text: 'Beyond our visible physical body exists a subtle Energy Body (Bioplasmic Body) that sustains vitality, cellular renewal, and organic function.',
      about_aura_title: '2. The Aura (Energy Field)',
      about_aura_text: 'Surrounding our physical body is a luminous field called the Aura. Stress and imbalances appear as congestion or depletion in the Aura before affecting the physical organs.',
      about_chakra_title: '3. Energy Chakras (Energy Points)',
      about_chakra_text: 'Within the Aura exist major energy centers known as Chakras. They absorb, digest, and distribute life force energy (Prana) to govern physical and emotional health.',

      // Mileage Analogy Banner
      mileage_title: 'Why Regular Energy Servicing Gives "Better Life Mileage"',
      mileage_text: 'Just like you service your vehicle regularly to prevent breakdowns and ensure optimal mileage, cleansing and energizing your Aura periodically clears emotional congestion and delivers Better Life Mileage — keeping you energetic, focused, and resilient.',

      // Services
      services_title: 'Energy Therapy Services',
      services_subtitle: 'Tailored remote energy therapy sessions (incorporating proven energy principles) for every stage of personal and family life.',
      service_physical_title: 'Physical Wellness',
      service_physical_text: 'Supportive energy therapy for ailments ranging from basic cough and pain to chronic heart, lung, and immune recovery.',
      service_mental_title: 'Mental & Emotional Balance',
      service_mental_text: 'Deep Aura cleansing for stress, anxiety, emotional trauma, hallucinations, and overcoming addictive patterns.',
      service_prosperity_title: 'Prosperity & Life Flow',
      service_prosperity_text: 'Clearing energetic stagnation affecting career progress, financial flow, business profitability, and marriage delays.',
      service_family_title: 'Remote Family Care',
      service_family_text: 'Living away from home in another city or abroad? Dedicated remote healing sessions to keep your aging parents healthy and peaceful.',
      service_maintenance_title: 'Life Mileage Maintenance',
      service_maintenance_text: 'Periodic energy tune-ups (monthly or quarterly) for healthy professionals and entrepreneurs to sustain peak vitality and immunity.',

      // Chakra Explorer
      chakra_title: 'Energy Chakras & Their Functions',
      chakra_subtitle: 'Explore how each major energy point governs physical organs and emotional states. (Purely for educational awareness — your therapist assesses them for you).',
      chakra_physical_label: 'Physical Functions:',
      chakra_psychological_label: 'Psychological Functions:',

      // Chakra 1: Basic
      chakra_1_name: '1. Basic Chakra (Root)',
      chakra_1_physical: 'Governs bones, skeletal system, spine, muscular strength, blood production, and overall physical vitality.',
      chakra_1_psychological: 'Drives dynamic action, groundedness, practical drive, stamina, and fearlessness.',

      // Chakra 2: Sex
      chakra_2_name: '2. Sex Chakra (Sacral)',
      chakra_2_physical: 'Governs reproductive system, kidneys, urinary bladder, and lower limbs.',
      chakra_2_psychological: 'Influences creative expression, constructive thinking, and healthy emotional bonds.',

      // Chakra 3: Solar Plexus
      chakra_3_name: '3. Solar Plexus Chakra',
      chakra_3_physical: 'Governs stomach, liver, pancreas, digestive organs, diaphragm, and metabolic immunity.',
      chakra_3_psychological: 'Regulates emotional equilibrium, stress response, anger, fear, personal courage, and willpower.',

      // Chakra 4: Heart
      chakra_4_name: '4. Heart Chakra',
      chakra_4_physical: 'Governs physical heart, lungs, blood circulation, and thymus gland.',
      chakra_4_psychological: 'Cultivates love, compassion, inner serenity, forgiveness, and harmonious relationships.',

      // Chakra 5: Throat
      chakra_5_name: '5. Throat Chakra',
      chakra_5_physical: 'Governs throat, thyroid & parathyroid glands, vocal cords, and lymphatic system.',
      chakra_5_psychological: 'Enhances expressive communication, self-confidence, mental clarity, and strategic planning.',

      // Chakra 6: Ajna
      chakra_6_name: '6. Ajna Chakra (Third Eye)',
      chakra_6_physical: 'Governs brain, eyes, ears, nose, and the pituitary endocrine master gland.',
      chakra_6_psychological: 'Commands intellect, sharp concentration, intuitive insight, and decisive execution.',

      // Chakra 7: Crown
      chakra_7_name: '7. Crown Chakra',
      chakra_7_physical: 'Governs the upper brain, pineal gland, and central nervous system.',
      chakra_7_psychological: 'Promotes deep inner peace, spiritual awareness, universal connectivity, and higher wisdom.',

      // Booking Form
      book_title: 'Request an Energy Therapy Session',
      book_subtitle: 'No technical knowledge needed. Simply describe your concern in English or Tamil, and our Energy Therapist will connect with you.',
      book_for_label: 'Booking For',
      book_for_self: 'Myself',
      book_for_family: 'Parents / Family (Remote)',
      book_family_name: 'Family Member Name',
      book_family_name_placeholder: "Enter family member's full name",
      book_family_age: 'Age',
      book_family_relation: 'Relationship',
      book_name: 'Your Name',
      book_name_placeholder: 'Enter your full name',
      book_phone: 'Phone / WhatsApp',
      book_phone_placeholder: 'Your WhatsApp or mobile number',
      book_email: 'Email Address',
      book_email_placeholder: 'Your email address (optional)',
      book_plan: 'Select Therapy Plan',
      book_plan_single: 'Single Consultation & Trial Session',
      book_plan_physical: 'Physical Wellness Plan',
      book_plan_mental: 'Mental & Emotional Balance Plan',
      book_plan_prosperity: 'Prosperity & Career Flow Plan',
      book_plan_family: 'Remote Family Care Package (Parents)',
      book_plan_maintenance: 'Life Mileage Maintenance (Periodic Tune-up)',
      book_concern: 'Describe Your Concern or Goal (English or Tamil)',
      book_concern_placeholder: 'Describe symptoms, concerns, or goals in your own words (English or Tamil input accepted)...',
      book_submit: 'Submit Therapy Request',
      book_success: 'Thank you! Your request has been sent to the Energy Therapist\'s dashboard. We will contact you shortly.',

      // Sample Report
      report_title: 'Sample Progress Report (Before vs. After Therapy)',
      report_subtitle: 'After completing sessions, your Energy Therapist provides a transparent visual progress report showing your Aura & Chakra improvements.',
      report_client: 'Client:',
      report_plan: 'Plan:',
      report_plan_detail: 'Stress & Life Mileage (5 Sessions)',
      report_col_center: 'Energy Center / Field',
      report_col_before: 'Before Therapy',
      report_col_after: 'After Therapy',
      report_aura: 'Overall Aura Field',
      report_aura_before: 'Congested & Dull',
      report_aura_after: 'Clean, Bright & Balanced',
      report_solar: 'Solar Plexus Chakra',
      report_solar_before: 'Over-activated (Stress & Acidity)',
      report_solar_after: 'Calm & Harmonized',
      report_basic: 'Basic Chakra',
      report_basic_before: 'Depleted (Low Stamina)',
      report_basic_after: 'Energized & Vital',
      report_heart: 'Heart Chakra',
      report_heart_before: 'Constricted & Anxious',
      report_heart_after: 'Open, Light & Peaceful',
      report_feedback_label: 'Client Feedback (English or Tamil)',
      report_feedback_placeholder: 'Share your recovery and improvements after the sessions...',
      report_feedback_submit: 'Submit Feedback',
      feedback_thankyou: 'Thank you for your feedback! It helps refine your energy care journey.',

      // Footer
      footer_tagline: 'Restoring balance, vitality, and peace across any distance.',
      footer_quick_links: 'Quick Links',
      footer_services: 'Services',
      footer_contact: 'Contact & Support',
      footer_copyright: '© 2026 AuraLife Energy Therapy. Holistic Remote Wellness & Life Mileage Care.',
      footer_disclaimer: 'Disclaimer: Energy Therapy is a complementary holistic modality and is not intended to replace licensed medical diagnosis or medical treatment.',

      // Admin Dashboard
      admin_panel: 'Admin Dashboard',
      admin_name: 'Anand Kumar',
      admin_role_label: 'Senior Energy Therapist',
      nav_dashboard: 'Dashboard',
      nav_client_requests: 'Client Requests',
      nav_reports: 'Reports',
      nav_packages: 'Packages & Pricing',
      nav_settings: 'Settings',
      nav_logout: 'Logout',
      header_dashboard: 'Therapist Dashboard',
      header_requests: 'Client Requests Queue',
      header_reports: 'Healing Progress Reports',
      header_packages: 'Dynamic Packages & Pricing',
      header_settings: 'System & Profile Settings',

      dashboard_overview: 'Therapy Practice Overview',
      stat_total_clients: 'Total Clients',
      stat_new_requests: 'New Requests',
      stat_in_progress: 'Active Sessions',
      stat_completed: 'Completed Cases',
      recent_requests: 'Recent Requests',
      view_all: 'View All Requests',
      client_requests_title: 'Client Therapy Requests',

      filter_all: 'All Requests',
      filter_new: 'New',
      filter_in_progress: 'In Progress',
      filter_completed: 'Completed',

      status_new: 'New',
      status_in_progress: 'In Progress',
      status_completed: 'Completed',

      th_client_name: 'Client Name',
      th_service_type: 'Therapy Plan',
      th_booking_for: 'Booking For',
      th_date: 'Date',
      th_status: 'Status',
      th_actions: 'Actions',

      booking_self: 'Self',
      booking_family: 'Remote Family',
      meta_service: 'Plan:',
      meta_booking_for: 'Booking For:',

      btn_view: 'View',
      btn_view_details: 'View Details',
      btn_start_consultation: 'Start Consultation',
      btn_assess_chakras: 'Assess Chakras',
      btn_cancel: 'Cancel',
      btn_save_assessment: 'Save Assessment',
      btn_save_draft: 'Save Draft',
      btn_generate_send: 'Generate & Share Report',
      btn_add_package: '+ Add New Package',
      btn_save_package: 'Save Package',
      btn_edit: 'Edit',
      btn_deactivate: 'Deactivate',
      btn_save_changes: 'Save Settings',

      service_mental_healing: 'Mental & Emotional Balance',
      service_remote_family: 'Remote Family Care',
      service_life_mileage: 'Life Mileage Maintenance',
      service_physical_wellness: 'Physical Wellness',
      service_prosperity: 'Prosperity & Career Flow',

      modal_chakra_title: 'Private Aura & Chakra Assessment',
      modal_client: 'Client:',
      modal_service: 'Plan:',
      modal_date: 'Assessment Date:',

      chakra_status_label: 'Status:',
      chakra_notes_label: 'Clinical Notes:',
      chakra_root: '1. Basic (Root) Chakra',
      chakra_sacral: '2. Sex (Sacral) Chakra',
      chakra_solar: '3. Solar Plexus Chakra',
      chakra_heart: '4. Heart Chakra',
      chakra_throat: '5. Throat Chakra',
      chakra_third_eye: '6. Ajna (Third Eye) Chakra',
      chakra_crown: '7. Crown Chakra',

      chakra_normal: 'Normal / Balanced',
      chakra_congested: 'Congested (Toxic Energy)',
      chakra_depleted: 'Depleted (Deficient Prana)',
      chakra_over_activated: 'Over-Activated (Stress/Agitation)',
      chakra_harmonized: 'Harmonized & Cleansed',
      chakra_balanced: 'Balanced & Stable',
      chakra_energized: 'Energized & Vital',
      chakra_improved: 'Noticeably Improved',
      chakra_needs_attention: 'Requires Further Cleansing',

      aura_normal: 'Normal Aura',
      aura_dim: 'Dim / Weak Aura',
      aura_murky: 'Murky / Congested Aura',
      aura_tight: 'Constricted Aura',
      aura_uneven: 'Asymmetrical / Torn Aura',
      aura_balanced: 'Balanced Aura',
      aura_bright: 'Luminous & Clear Aura',
      aura_clear: 'Purified & Clean Aura',
      aura_expanded: 'Vibrant & Expanded Aura',
      aura_strengthened: 'Strengthened Protective Aura',

      reports_title: 'Generate Client Before & After Reports',
      report_overall_aura: 'Overall Aura Field',
      report_chakra_assessment: 'Chakra Balance Comparison',
      report_before: 'Before Therapy Condition',
      report_after: 'After Therapy Condition',
      report_therapist_notes: 'Therapist Clinical Notes',
      report_select_client: 'Select Client Request:',
      report_select_placeholder: '— Choose an active client —',
      report_client_label: 'Client Name',
      report_select_status: 'Select Status',
      report_notes_label: 'Progress Notes & Recommendations:',

      packages_title: 'Dynamic Packages & Pricing Manager',
      new_package_title: 'Create New Therapy Package',
      th_package_name: 'Package Name',
      th_sessions: 'Sessions',
      th_price: 'Price (INR)',
      pkg_name_label: 'Package Title:',
      pkg_sessions_label: 'Number of Sessions:',
      pkg_price_label: 'Price (₹):',
      pkg_description_label: 'Package Description:',
      pkg_active_label: 'Active & Available on Booking Form',
      pkg_status_active: 'Active',
      pkg_single_session: 'Single Consultation Session',
      pkg_physical_wellness: 'Physical Wellness Care (5 Sessions)',
      pkg_mental_balance: 'Emotional Peace & Stress Relief (5 Sessions)',
      pkg_prosperity_flow: 'Prosperity & Career Energy Clearing (7 Sessions)',
      pkg_remote_family: 'Remote Family Care (Monthly Subscription)',
      pkg_life_mileage_monthly: 'Life Mileage Monthly Maintenance (2 Sessions)',
      pkg_free_trial: 'Introductory Trial Session',
      pkg_2_per_month: '2 Sessions / Month',
      pkg_10_per_month: '10 Sessions Comprehensive',

      settings_title: 'Therapist Practice Settings',
      settings_profile: 'Therapist Profile',
      settings_name_label: 'Therapist Name',
      settings_email_label: 'Email',
      settings_phone_label: 'WhatsApp / Phone',
      settings_business: 'Practice Details',
      settings_business_name: 'Practice / Clinic Name',
      settings_language: 'Language & Locale',
      settings_default_lang: 'Default Platform Language',
      settings_timezone: 'Timezone',
      settings_bilingual_reports: 'Enable Bilingual Reports (English & Tamil)',
      settings_bilingual_desc: 'Automatically generate progress reports formatted in both English and Tamil.',
      settings_notifications: 'Client Alert Notifications',
      settings_email_notif: 'Email Notifications for New Bookings',
      settings_email_notif_desc: 'Receive an instant email when a client submits a therapy request.',
      settings_sms_notif: 'SMS Alerts',
      settings_sms_notif_desc: 'Send urgent session reminders via SMS.',
      settings_whatsapp_notif: 'WhatsApp Session Reminders',
      settings_whatsapp_notif_desc: 'Auto-send Life Mileage service reminders directly on WhatsApp.'
    },

    ta: {
      // Navigation
      nav_brand: 'ஆராலைஃப் எனர்ஜி தெரபி',
      nav_about: 'ஆற்றல் உடல்',
      nav_services: 'சேவைகள்',
      nav_chakras: 'சக்கரங்கள்',
      nav_book: 'முன்பதிவு',
      nav_report: 'மாதிரி அறிக்கை',
      lang_toggle: 'English',

      // Hero
      hero_title: 'சிறந்த ஆரோக்கியம் மற்றும் வாழ்க்கை மைலேஜிற்காக உங்கள் ஆற்றல் உடலைச் சமநிலைப்படுத்துங்கள்',
      hero_subtitle: 'உடல் நலம், மன அமைதி, பொருளாதார முன்னேற்றம் மற்றும் தொலைதூர குடும்பப் பராமரிப்புக்கான சான்றளிக்கப்பட்ட எனர்ஜி தெரபிஸ்ட்டின் தொலைதூர எனர்ஜி தெரபி.',
      hero_cta: 'எனர்ஜி தெரபி முன்பதிவு செய்க',

      // About Anatomy
      about_title: 'நமது ஆற்றல் உடலைப் புரிந்துகொள்ளுதல்',
      about_subtitle: 'உங்கள் பருவுடலும் (Physical Body) நுண்ணிய ஆற்றல் உடலும் (Energy Body) இணக்கமாகச் செயல்படும்போது முழுமையான ஆரோக்கியம் கிடைக்கிறது.',
      about_physical_title: '1. பருவுடல் மற்றும் ஆற்றல் உடல்',
      about_physical_text: 'நாம் பார்க்கும் பருவுடலுக்கு அப்பால், உயிர் சக்தியையும் உயிரணுப் புதுப்பித்தலையும் தாங்கி நிற்கும் நுண்ணிய ஆற்றல் உடல் (Bioplasmic Energy Body) உள்ளது.',
      about_aura_title: '2. ஆரா (ஆற்றல் களம்)',
      about_aura_text: 'நமது உடலைச் சுற்றி ஒளிரும் ஒரு சக்தி களம் உள்ளது, அதுவே ஆரா (Aura). மன அழுத்தம் மற்றும் நோய்கள் உடலில் தோன்றுவதற்கு முன்பே ஆராவில் நச்சுத் தேக்கமாக வெளிப்படும்.',
      about_chakra_title: '3. எனர்ஜி சக்கரங்கள் (ஆற்றல் மையங்கள்)',
      about_chakra_text: 'ஆராவிற்குள் சக்கரங்கள் எனப்படும் முக்கிய ஆற்றல் மையங்கள் இயங்குகின்றன. அவை பிராண சக்தியை உட்கிரகித்து, உடலின் உறுப்புகளையும் மனநிலையையும் சீராக இயக்குகின்றன.',

      // Mileage Analogy Banner
      mileage_title: '🚗 வாகன சர்வீஸ் போல ஆற்றலைச் சுத்தப்படுத்தினால் "சிறந்த வாழ்க்கை மைலேஜ்"!',
      mileage_text: 'வாகனத்தைத் தொடர்ந்து சர்வீஸ் செய்தால் மட்டுமே அது பழுதாகாமல் சிறந்த மைலேஜ் கொடுக்கும். அதுபோலவே, அன்றாட மன அழுத்தத்தால் மாசடையும் ஆராவையும் சக்கரங்களையும் எனர்ஜி தெரபி மூலம் அவ்வப்போது சுத்தப்படுத்தினால், அதிக ஆற்றலும் சிறந்த வாழ்க்கை மைலேஜும் ("Better Life Mileage") கிடைக்கும்.',

      // Services
      services_title: 'எனர்ஜி தெரபி சேவைகள்',
      services_subtitle: 'நிரூபிக்கப்பட்ட பிராணிக் ஆற்றல் கோட்பாடுகளின் அடிப்படையில் வாழ்க்கையின் ஒவ்வொரு தேவைக்குமான பிரத்யேகத் தொலைதூர எனர்ஜி தெரபி.',
      service_physical_title: 'உடல் நலம் (Physical Wellness)',
      service_physical_text: 'சாதாரண சளி, இருமல் மற்றும் உடல் வலி முதல் இதயம், நுரையீரல், இரத்த அழுத்தம் போன்ற நாள்பட்ட உடல்நலக் குறைபாடுகளுக்கான ஆற்றல் சிகிச்சை.',
      service_mental_title: 'மன அமைதி (Mental & Emotional Balance)',
      service_mental_text: 'மன அழுத்தம், பதற்றம், தூக்கமின்மை, மனக்கவலை, உளவியல் அதிர்ச்சிகள் மற்றும் அனைத்து வகையான போதைப் பழக்கங்களில் இருந்து மீள்வதற்கான ஆற்றல் சிகிச்சை.',
      service_prosperity_title: 'பொருளாதார முன்னேற்றம் (Prosperity Flow)',
      service_prosperity_text: 'வேலை வாய்ப்புத் தடைகள், வியாபார மந்தநிலை, நிதிச் சிக்கல்கள் மற்றும் திருமணத் தாமதங்களை உருவாக்கும் எதிர்மறை ஆற்றல்களை நீக்குதல்.',
      service_family_title: 'தொலைதூர குடும்பப் பராமரிப்பு (Remote Family Care)',
      service_family_text: 'வேலை நிமித்தமாக வேறு ஊர்களிலோ அல்லது வெளிநாடுகளிலோ வசிப்பவர்கள், சொந்த ஊரில் உள்ள பெற்றோரின் உடல் மற்றும் மன நலனைத் தொடர்ந்து பாதுகாக்கும் சேவை.',
      service_maintenance_title: 'லைஃப் மைலேஜ் பராமரிப்பு (Life Mileage Maintenance)',
      service_maintenance_text: 'எந்த நோயும் இல்லாதவர்களும் எப்போதும் முழு உற்சாகத்துடனும், நோய் எதிர்ப்பு சக்தியுடனும் இருக்க உதவும் மாதாந்திர அல்லது காலாண்டு எனர்ஜி சர்வீஸ் பேக்கேஜ்.',

      // Chakra Explorer
      chakra_title: 'எனர்ஜி சக்கரங்களும் அவற்றின் செயல்பாடுகளும்',
      chakra_subtitle: 'ஒவ்வொரு சக்கரமும் எந்தெந்த உடல் உறுப்புகளையும் மன உணர்வுகளையும் இயக்குகிறது என்பதைத் தெரிந்துகொள்ளுங்கள். (இது புரிதலுக்காக மட்டுமே — உங்கள் சக்கரங்களை எனர்ஜி தெரபிஸ்ட்டே பரிசோதிப்பார்).',
      chakra_physical_label: 'உடல் ரீதியான செயல்பாடுகள்:',
      chakra_psychological_label: 'உளவியல் ரீதியான செயல்பாடுகள்:',

      // Chakra 1: Basic
      chakra_1_name: '1. மூலாதார சக்கரம் (Basic Chakra)',
      chakra_1_physical: 'எலும்புகள், தசைகள், முதுகுத்தண்டு, ரத்த உற்பத்தி மற்றும் ஒட்டுமொத்த உடல் வலிமையை நிர்வகிக்கிறது.',
      chakra_1_psychological: 'சுறுசுறுப்பு, பயமின்மை, வாழ்க்கையில் முன்னேறும் ஆர்வம் மற்றும் மன உறுதியைத் தருகிறது.',

      // Chakra 2: Sex
      chakra_2_name: '2. சுவாதிஷ்டான சக்கரம் (Sex Chakra)',
      chakra_2_physical: 'இனப்பெருக்க உறுப்புகள், சிறுநீரகம், சிறுநீர்ப்பை மற்றும் கால்களை நிர்வகிக்கிறது.',
      chakra_2_psychological: 'படைப்பாற்றல் (Creativity), ஆக்கப்பூர்வமான சிந்தனை மற்றும் ஆரோக்கியமான உறவுகளை வளர்க்கிறது.',

      // Chakra 3: Solar Plexus
      chakra_3_name: '3. மணிப்பூரக சக்கரம் (Solar Plexus Chakra)',
      chakra_3_physical: 'வயிறு, கல்லீரல், கணையம், செரிமான மண்டலம் மற்றும் நோய் எதிர்ப்பு சக்தியை நிர்வகிக்கிறது.',
      chakra_3_psychological: 'கோபம், பயம், மன அழுத்தத்தைக் குறைத்து தைரியத்தையும் உணர்ச்சி சமநிலையையும் தருகிறது.',

      // Chakra 4: Heart
      chakra_4_name: '4. அனாகத சக்கரம் (Heart Chakra)',
      chakra_4_physical: 'இதயம், நுரையீரல், ரத்த ஓட்டம் மற்றும் தைமஸ் சுரப்பியை நிர்வகிக்கிறது.',
      chakra_4_psychological: 'அன்பு, கருணை, மன அமைதி, மன்னிக்கும் குணம் மற்றும் உறவுகளில் நல்லிணக்கத்தை உருவாக்குகிறது.',

      // Chakra 5: Throat
      chakra_5_name: '5. விசுத்தி சக்கரம் (Throat Chakra)',
      chakra_5_physical: 'தொண்டை, தைராய்டு சுரப்பி, குரல்வளை மற்றும் நிணநீர் மண்டலத்தை நிர்வகிக்கிறது.',
      chakra_5_psychological: 'சிறந்த பேச்சாற்றல், தன்னம்பிக்கை, தெளிவான சிந்தனை மற்றும் திட்டமிடும் திறனைத் தருகிறது.',

      // Chakra 6: Ajna
      chakra_6_name: '6. ஆக்ஞா சக்கரம் (Ajna Chakra)',
      chakra_6_physical: 'மூளை, கண், காது, மூக்கு மற்றும் நாளமில்லா பிட்யூட்டரி சுரப்பியை நிர்வகிக்கிறது.',
      chakra_6_psychological: 'அறிவாற்றல், மன ஒருமைப்பாடு, தீர்க்கமான முடிவெடுக்கும் திறன் மற்றும் கூரிய கவனத்தை அளிக்கிறது.',

      // Chakra 7: Crown
      chakra_7_name: '7. சகஸ்ரார சக்கரம் (Crown Chakra)',
      chakra_7_physical: 'மூளை மற்றும் ஒட்டுமொத்த மைய நரம்பு மண்டலத்தை நிர்வகிக்கிறது.',
      chakra_7_psychological: 'ஆழ்ந்த உள் அமைதி (Inner Peace), ஆன்மீக விழிப்புணர்வு மற்றும் தெளிவான ஞானத்தை அளிக்கிறது.',

      // Booking Form
      book_title: 'எனர்ஜி தெரபி முன்பதிவு படிவம்',
      book_subtitle: 'சக்கரங்களைத் தேர்ந்தெடுக்க வேண்டியதில்லை. உங்கள் பிரச்சனையை தமிழ் அல்லது ஆங்கிலத்தில் எழுதுங்கள்; எனர்ஜி தெரபிஸ்ட் உங்களைத் தொடர்புகொள்வார்.',
      book_for_label: 'யாருக்கு முன்பதிவு செய்கிறீர்கள்?',
      book_for_self: 'எனக்கு (Myself)',
      book_for_family: 'பெற்றோர் / குடும்பத்தினர் (Remote)',
      book_family_name: 'குடும்ப உறுப்பினர் பெயர்',
      book_family_name_placeholder: 'பெற்றோர் அல்லது குடும்பத்தினர் பெயர்',
      book_family_age: 'வயது',
      book_family_relation: 'உறவுமுறை',
      book_name: 'உங்கள் பெயர்',
      book_name_placeholder: 'உங்கள் முழுப் பெயரை உள்ளிடவும்',
      book_phone: 'வாட்ஸ்அப் / அலைபேசி எண்',
      book_phone_placeholder: 'உங்கள் தொடர்பு எண்',
      book_email: 'மின்னஞ்சல் முகவரி',
      book_email_placeholder: 'மின்னஞ்சல் முகவரி (விருப்பத்திற்குரியது)',
      book_plan: 'தெரபி திட்டத்தைத் தேர்ந்தெடுக்கவும்',
      book_plan_single: 'ஒற்றை கலந்தாய்வு & ஆரம்ப செஷன்',
      book_plan_physical: 'உடல் நலம் பேக்கேஜ் (Physical Wellness)',
      book_plan_mental: 'மன அமைதி பேக்கேஜ் (Mental & Emotional)',
      book_plan_prosperity: 'பொருளாதார முன்னேற்றம் பேக்கேஜ்',
      book_plan_family: 'தொலைதூர பெற்றோர் பராமரிப்பு பேக்கேஜ்',
      book_plan_maintenance: 'லைஃப் மைலேஜ் எனர்ஜி பராமரிப்பு (Life Mileage)',
      book_concern: 'உங்கள் பிரச்சனை அல்லது தேவையை விவரிக்கவும் (தமிழ் அல்லது English)',
      book_concern_placeholder: 'உங்கள் உடல் அல்லது மன நலப் பிரச்சனைகளைத் தமிழில் அல்லது ஆங்கிலத்தில் இங்கு விரிவாக எழுதலாம்...',
      book_submit: 'முன்பதிவு விண்ணப்பத்தை சமர்ப்பிக்கவும்',
      book_success: 'நன்றி! உங்கள் விண்ணப்பம் எனர்ஜி தெரபிஸ்ட்டின் அட்மின் பேனலுக்கு அனுப்பப்பட்டது. விரைவில் உங்களைத் தொடர்புகொள்வோம்.',

      // Sample Report
      report_title: 'மாதிரி முன்னேற்ற அறிக்கை (Before vs. After)',
      report_subtitle: 'செஷன்கள் முடிந்த பிறகு உங்கள் ஆரா மற்றும் சக்கரங்களில் ஏற்பட்டுள்ள மாற்றங்களை எனர்ஜி தெரபிஸ்ட் வெளிப்படையான அறிக்கையாக வழங்குவார்.',
      report_client: 'வாடிக்கையாளர்:',
      report_plan: 'திட்டம்:',
      report_plan_detail: 'மன அழுத்தம் & லைஃப் மைலேஜ் (5 செஷன்கள்)',
      report_col_center: 'ஆற்றல் மையம் / களம்',
      report_col_before: 'தெரபிக்கு முன் (Before)',
      report_col_after: 'தெரபிக்கு பின் (After)',
      report_aura: 'முழுமையான ஆரா களம் (Overall Aura)',
      report_aura_before: 'நச்சுத் தேக்கம் & சோர்வு',
      report_aura_after: 'சுத்தமான, பிரகாசமான சமநிலை',
      report_solar: 'மணிப்பூரக சக்கரம் (Solar Plexus)',
      report_solar_before: 'அதிக இயக்கம் (மன அழுத்தம் & அசிடிட்டி)',
      report_solar_after: 'சாந்தமான சமநிலை',
      report_basic: 'மூலாதார சக்கரம் (Basic Chakra)',
      report_basic_before: 'சக்தி குறைவு (சோர்வு)',
      report_basic_after: 'புத்துணர்ச்சியான வீரியம்',
      report_heart: 'அனாகத சக்கரம் (Heart Chakra)',
      report_heart_before: 'சுருங்கிய களம் & படபடப்பு',
      report_heart_after: 'அமைதியான, லேசான இதயம்',
      report_feedback_label: 'உங்கள் கருத்து / பின்னூட்டம் (Tamil or English)',
      report_feedback_placeholder: 'தெரபிக்குப் பிறகு உங்கள் உடல் மற்றும் மன நலனில் ஏற்பட்ட முன்னேற்றத்தைப் பகிரவும்...',
      report_feedback_submit: 'கருத்தைச் சமர்ப்பிக்கவும்',
      feedback_thankyou: 'உங்கள் மதிப்புமிக்க கருத்திற்கு நன்றி! இது உங்கள் ஆரோக்கியப் பயணத்தை மேலும் சிறப்பாக்க உதவும்.',

      // Footer
      footer_tagline: 'எவ்வளவு தூரத்திலிருந்தாலும் உங்கள் ஆற்றல் உடலைச் சமநிலைப்படுத்தி நல்வாழ்வு தருதல்.',
      footer_quick_links: 'முக்கிய இணைப்புகள்',
      footer_services: 'சேவைகள்',
      footer_contact: 'தொடர்பு & உதவி',
      footer_copyright: '© 2026 AuraLife Energy Therapy. தொலைதூர எனர்ஜி தெரபி & லைஃப் மைலேஜ் பாதுகாப்பு.',
      footer_disclaimer: 'அறிவிப்பு: எனர்ஜி தெரபி என்பது ஒரு துணைநிலை ஆற்றல் சிகிச்சை முறையாகும்; இது மருத்துவப் பரிசோதனைகளுக்கோ அல்லது மருத்துவர்களின் சிகிச்சைகளுக்கோ மாற்றானது அல்ல.',

      // Admin Dashboard
      admin_panel: 'அட்மின் டாஷ்போர்டு',
      admin_name: 'ஆனந்த் குமார்',
      admin_role_label: 'முதன்மை எனர்ஜி தெரபிஸ்ட்',
      nav_dashboard: 'டாஷ்போர்டு',
      nav_client_requests: 'வாடிக்கையாளர் கோரிக்கைகள்',
      nav_reports: 'அறிக்கைகள்',
      nav_packages: 'பேக்கேஜ்கள் & கட்டணம்',
      nav_settings: 'அமைப்புகள்',
      nav_logout: 'வெளியேறு',
      header_dashboard: 'தெரபிஸ்ட் டாஷ்போர்டு',
      header_requests: 'வாடிக்கையாளர் கோரிக்கைப் பட்டியல்',
      header_reports: 'முன்னேற்ற அறிக்கைகள்',
      header_packages: 'விலை மற்றும் பேக்கேஜ் மேலாண்மை',
      header_settings: 'கணக்கு & தள அமைப்புகள்',

      dashboard_overview: 'தெரபி சிகிச்சை மேலோட்டம்',
      stat_total_clients: 'மொத்த வாடிக்கையாளர்கள்',
      stat_new_requests: 'புதிய கோரிக்கைகள்',
      stat_in_progress: 'நடைபெறும் செஷன்கள்',
      stat_completed: 'நிறைவடைந்தவை',
      recent_requests: 'சமீபத்திய கோரிக்கைகள்',
      view_all: 'அனைத்தையும் காண்க',
      client_requests_title: 'வாடிக்கையாளர் சிகிச்சை விண்ணப்பங்கள்',

      filter_all: 'அனைத்து விண்ணப்பங்கள்',
      filter_new: 'புதியவை',
      filter_in_progress: 'நடப்பில் உள்ளவை',
      filter_completed: 'நிறைவடைந்தவை',

      status_new: 'புதியது',
      status_in_progress: 'நடப்பில்',
      status_completed: 'முடிந்தது',

      th_client_name: 'வாடிக்கையாளர் பெயர்',
      th_service_type: 'சேவைத் திட்டம்',
      th_booking_for: 'யாருக்கு',
      th_date: 'தேதி',
      th_status: 'நிலை',
      th_actions: 'செயல்கள்',

      booking_self: 'சுயமுயற்சி (Self)',
      booking_family: 'தொலைதூர குடும்பம்',
      meta_service: 'திட்டம்:',
      meta_booking_for: 'விண்ணப்பம்:',

      btn_view: 'பார்வை',
      btn_view_details: 'விவரங்கள்',
      btn_start_consultation: 'கலந்தாய்வு தொடங்கு',
      btn_assess_chakras: 'சக்கரங்களை ஆராய்க',
      btn_cancel: 'ரத்து செய்',
      btn_save_assessment: 'மதிப்பீட்டைச் சேமிக்க',
      btn_save_draft: 'வரைவைச் சேமிக்க',
      btn_generate_send: 'அறிக்கையை உருவாக்கி அனுப்புக',
      btn_add_package: '+ புதிய பேக்கேஜ் சேர்க்க',
      btn_save_package: 'பேக்கேஜைச் சேமிக்க',
      btn_edit: 'மாற்று',
      btn_deactivate: 'முடக்கு',
      btn_save_changes: 'அமைப்புகளைச் சேமிக்க',

      service_mental_healing: 'மன அமைதி & மனநலம்',
      service_remote_family: 'தொலைதூர குடும்பப் பராமரிப்பு',
      service_life_mileage: 'லைஃப் மைலேஜ் பராமரிப்பு',
      service_physical_wellness: 'உடல் நலம் (Physical)',
      service_prosperity: 'பொருளாதார வளர்ச்சி',

      modal_chakra_title: 'தனிப்பட்ட ஆரா மற்றும் சக்கரப் பரிசோதனை',
      modal_client: 'வாடிக்கையாளர்:',
      modal_service: 'திட்டம்:',
      modal_date: 'பரிசோதனை தேதி:',

      chakra_status_label: 'சக்கர நிலை:',
      chakra_notes_label: 'மருத்துவக் குறிப்புகள்:',
      chakra_root: '1. மூலாதார சக்கரம் (Basic)',
      chakra_sacral: '2. சுவாதிஷ்டான சக்கரம் (Sex)',
      chakra_solar: '3. மணிப்பூரக சக்கரம் (Solar Plexus)',
      chakra_heart: '4. அனாகத சக்கரம் (Heart)',
      chakra_throat: '5. விசுத்தி சக்கரம் (Throat)',
      chakra_third_eye: '6. ஆக்ஞா சக்கரம் (Ajna)',
      chakra_crown: '7. சகஸ்ரார சக்கரம் (Crown)',

      chakra_normal: 'இயல்பானது / சமநிலை',
      chakra_congested: 'நச்சுத் தேக்கம் (Congested)',
      chakra_depleted: 'சக்திக் குறைவு (Depleted)',
      chakra_over_activated: 'அதிக இயக்கம் / அழுத்தம்',
      chakra_harmonized: 'சுத்திகரிக்கப்பட்டு சமநிலை',
      chakra_balanced: 'முழு சமநிலை',
      chakra_energized: 'உயிர்ச் சக்தி ஏற்றப்பட்டது',
      chakra_improved: 'குறிப்பிடத்தக்க முன்னேற்றம்',
      chakra_needs_attention: 'தொடர் சுத்திகரிப்பு தேவை',

      aura_normal: 'இயல்பான ஆரா',
      aura_dim: 'மங்கலான / பலவீனமான ஆரா',
      aura_murky: 'கலங்கலான / மாசடைந்த ஆரா',
      aura_tight: 'சுருங்கிய ஆரா',
      aura_uneven: 'சமச்சீரற்ற / உடைந்த ஆரா',
      aura_balanced: 'சமநிலையான ஆரா',
      aura_bright: 'பிரகாசமான, தெளிவான ஆரா',
      aura_clear: 'தூய்மையான ஆரா',
      aura_expanded: 'விரிவடைந்த ஆரோக்கிய ஆரா',
      aura_strengthened: 'பாதுகாப்புமிக்க வலிமையான ஆரா',

      reports_title: 'வாடிக்கையாளர் முன்னேற்ற அறிக்கை உருவாக்கம்',
      report_overall_aura: 'முழுமையான ஆரா களம்',
      report_chakra_assessment: 'சக்கர சமநிலை ஒப்பீடு',
      report_before: 'சிகிச்சைக்கு முந்தைய நிலை',
      report_after: 'சிகிச்சைக்குப் பிந்தைய நிலை',
      report_therapist_notes: 'தெரபிஸ்ட்டின் ஆலோசனைக் குறிப்பு',
      report_select_client: 'வாடிக்கையாளரைத் தேர்வு செய்க:',
      report_select_placeholder: '— வாடிக்கையாளரைத் தேர்ந்தெடுக்கவும் —',
      report_client_label: 'வாடிக்கையாளர் பெயர்',
      report_select_status: 'நிலையைத் தேர்ந்தெடு',
      report_notes_label: 'முன்னேற்றக் குறிப்பு மற்றும் அடுத்த கட்ட பரிந்துரைகள்:',

      packages_title: 'பேக்கேஜ்கள் மற்றும் கட்டண மேலாண்மை',
      new_package_title: 'புதிய சிகிச்சை பேக்கேஜ் உருவாக்குதல்',
      th_package_name: 'பேக்கேஜ் பெயர்',
      th_sessions: 'செஷன்கள்',
      th_price: 'கட்டணம் (INR)',
      pkg_name_label: 'பேக்கேஜ் தலைப்பு:',
      pkg_sessions_label: 'செஷன்களின் எண்ணிக்கை:',
      pkg_price_label: 'கட்டணம் (₹):',
      pkg_description_label: 'விளக்கம்:',
      pkg_active_label: 'புக்கிங் ஃபார்மில் கிடைக்கச் செய்',
      pkg_status_active: 'நடைமுறையில்',
      pkg_single_session: 'ஒற்றைக் கலந்தாய்வு செஷன்',
      pkg_physical_wellness: 'உடல்நலப் பராமரிப்பு (5 செஷன்கள்)',
      pkg_mental_balance: 'மன அமைதி & மன அழுத்த நிவாரணம் (5 செஷன்கள்)',
      pkg_prosperity_flow: 'தொழில் & நிதித் தடை நீக்கம் (7 செஷன்கள்)',
      pkg_remote_family: 'தொலைதூர குடும்பப் பராமரிப்பு (மாதாந்திரச் சந்தா)',
      pkg_life_mileage_monthly: 'லைஃப் மைலேஜ் மாதாந்திரப் பராமரிப்பு (2 செஷன்கள்)',
      pkg_free_trial: 'அறிமுக சோதனை செஷன்',
      pkg_2_per_month: 'மாதம் 2 செஷன்கள்',
      pkg_10_per_month: '10 செஷன்கள் விரிவான சிகிச்சை',

      settings_title: 'தெரபிஸ்ட் கிளினிக் அமைப்புகள்',
      settings_profile: 'தெரபிஸ்ட் சுயவிவரம்',
      settings_name_label: 'தெரபிஸ்ட் பெயர்',
      settings_email_label: 'மின்னஞ்சல்',
      settings_phone_label: 'வாட்ஸ்அப் / அலைபேசி',
      settings_business: 'கிளினிக் விவரங்கள்',
      settings_business_name: 'கிளினிக் பெயர்',
      settings_language: 'மொழி மற்றும் வட்டாரம்',
      settings_default_lang: 'இயல்புநிலை மொழி',
      settings_timezone: 'நேர மண்டலம்',
      settings_bilingual_reports: 'இருமொழி அறிக்கைகளை அனுமதி (English & தமிழ்)',
      settings_bilingual_desc: 'அறிக்கைகளை ஆங்கிலம் மற்றும் தமிழ் ஆகிய இரு மொழிகளிலும் தானாக வடிவமைத்தல்.',
      settings_notifications: 'அறிவிப்பு வசதிகள்',
      settings_email_notif: 'புதிய புக்கிங்களுக்கான மின்னஞ்சல் அறிவிப்பு',
      settings_email_notif_desc: 'புதிய கோரிக்கை வரும்போது உடனடியாக மின்னஞ்சல் அனுப்புதல்.',
      settings_sms_notif: 'SMS விழிப்பூட்டல்கள்',
      settings_sms_notif_desc: 'முக்கிய செஷன் நினைவூட்டல்களை குறுஞ்செய்தியாக அனுப்புதல்.',
      settings_whatsapp_notif: 'வாட்ஸ்அப் செஷன் நினைவூட்டல்',
      settings_whatsapp_notif_desc: 'லைஃப் மைலேஜ் பராமரிப்பு நினைவூட்டல்களை வாடிக்கையாளருக்கு வாட்ஸ்அப்பில் அனுப்புதல்.'
    }
  };

  function t(key, lang) {
    var targetLang = lang || currentLang || 'en';
    if (translations[targetLang] && translations[targetLang][key] !== undefined) {
      return translations[targetLang][key];
    }
    if (translations.en && translations.en[key] !== undefined) {
      return translations.en[key];
    }
    return key;
  }

  function applyTranslations(lang) {
    if (lang) currentLang = lang;
    var targetLang = currentLang;

    try {
      localStorage.setItem(STORAGE_KEY, targetLang);
    } catch (e) {}

    // Update document language attribute
    if (document.documentElement) {
      document.documentElement.lang = targetLang;
    }

    // Translate standard text content
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) {
        var translated = t(key, targetLang);
        if (translated !== key) {
          el.textContent = translated;
        }
      }
    });

    // Translate attributes like placeholder, title, value
    var attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(function (el) {
      var attr = el.getAttribute('data-i18n-attr');
      var key = el.getAttribute('data-i18n');
      if (attr && key) {
        var translated = t(key, targetLang);
        if (translated !== key) {
          el.setAttribute(attr, translated);
        }
      }
    });

    // Translate placeholders explicitly
    var placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        var translated = t(key, targetLang);
        if (translated !== key) {
          el.setAttribute('placeholder', translated);
        }
      }
    });

    // Update Language Toggle button labels
    var toggles = document.querySelectorAll('.lang-toggle, #langToggle');
    toggles.forEach(function (btn) {
      var labelSpan = btn.querySelector('#langLabel');
      if (labelSpan) {
        labelSpan.textContent = targetLang.toUpperCase();
      } else {
        btn.textContent = targetLang === 'en' ? 'தமிழ்' : 'English';
      }
    });

    // Dispatch custom event for dynamic components (chakras, tables, etc.)
    var event;
    if (typeof CustomEvent === 'function') {
      event = new CustomEvent('languageChanged', { detail: { lang: targetLang } });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('languageChanged', true, true, { lang: targetLang });
    }
    document.dispatchEvent(event);
  }

  function setLanguage(lang) {
    if (lang === 'en' || lang === 'ta') {
      currentLang = lang;
      applyTranslations(lang);
    }
  }

  function toggleLanguage() {
    var next = currentLang === 'en' ? 'ta' : 'en';
    setLanguage(next);
    return next;
  }

  function initLanguage() {
    // Bind toggle buttons if present
    document.querySelectorAll('.lang-toggle, #langToggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        toggleLanguage();
      });
    });

    // Initial translation apply
    applyTranslations(currentLang);
  }

  return {
    t: t,
    getCurrentLanguage: function () {
      return currentLang;
    },
    setLanguage: setLanguage,
    toggleLanguage: toggleLanguage,
    initLanguage: initLanguage,
    applyTranslations: applyTranslations,
    applyLanguage: setLanguage,
    translations: translations
  };
});
