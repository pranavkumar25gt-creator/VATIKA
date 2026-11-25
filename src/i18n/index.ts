export type Language = "en" | "mr" | "hi";

export interface Translations {
  nav: {
    menu: string;
    place: string;
    food: string;
    celebrations: string;
    gallery: string;
    visit: string;
    callNow: string;
    reserveTable: string;
    orderZomato: string;
  };
  hero: {
    tagline: string;
    subTagline: string;
    viewMenu: string;
    planCelebration: string;
    scrollHint: string;
    pureVegBadge: string;
    zomatoRating: string;
  };
  place: {
    sectionTag: string;
    title: string;
    subtitle: string;
    story1: string;
    story2: string;
    story3: string;
    viewAtmosphere: string;
  };
  food: {
    sectionTag: string;
    title: string;
    subtitle: string;
    interactive3dBadge: string;
    rotateToInspect: string;
    realPhotoFallback: string;
    exploreFullMenu: string;
    signatureNote: string;
  };
  menu: {
    sectionTag: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    chefsSpecial: string;
    popular: string;
    pureVeg: string;
    addToEnquiry: string;
    enquiryCart: string;
    itemsSelected: string;
    clearCart: string;
    sendWhatsAppEnquiry: string;
    disclaimerPrice: string;
    orderOnZomato: string;
  };
  celebrations: {
    sectionTag: string;
    title: string;
    subtitle: string;
    capacityNotice: string;
    planMyEvent: string;
    selectOccasion: string;
    dateLabel: string;
    guestsLabel: string;
    notesLabel: string;
    submitWhatsApp: string;
  };
  gallery: {
    sectionTag: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFood: string;
    filterInterior: string;
    filterHall: string;
    filterExterior: string;
  };
  visit: {
    sectionTag: string;
    title: string;
    subtitle: string;
    addressHeading: string;
    hoursHeading: string;
    callHeading: string;
    valetHeading: string;
    getDirections: string;
    chatWhatsApp: string;
    callFrontDesk: string;
    hoursNotice: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    highwayNote: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      menu: "Menu",
      place: "The Place",
      food: "Cuisine",
      celebrations: "Celebrations & Halls",
      gallery: "Gallery",
      visit: "Visit",
      callNow: "Call Desk",
      reserveTable: "Reserve Table",
      orderZomato: "Order on Zomato",
    },
    hero: {
      tagline: "Where Authentic Marathwada & North Indian Flavors Meet Timeless Hospitality",
      subTagline: "Fine Vegetarian Dining & Grand Celebration Banquet Halls in Parbhani",
      viewMenu: "Explore The Menu",
      planCelebration: "Plan Your Celebration",
      scrollHint: "Scroll to Experience",
      pureVegBadge: "100% Pure Vegetarian Cuisine",
      zomatoRating: "4.5 ★ Delivery (3,140+) • 4.2 ★ Dining • 4.0 ★ Google (3,360+)",
    },
    place: {
      sectionTag: "The Ambiance",
      title: "Rooted in Parbhani. Crafted for Feasts.",
      subtitle: "From the quiet glow of evening lanterns to the hum of cheerful family tables.",
      story1: "Situated along the Basmat Highway near MIDC, Hotel Vatika was built to be a calm sanctuary where weary travelers and local families gather.",
      story2: "Every space—from our spacious air-conditioned family dining hall to private celebration banquets—is illuminated with warm tungsten tones and timeless hospitality.",
      story3: "Here, food is not merely prepared; it is honored over live hearths, clay tandoors, and bubbling copper handis.",
      viewAtmosphere: "Experience the Dining Hall",
    },
    food: {
      sectionTag: "The Kitchen",
      title: "Signature Culinary Artistry",
      subtitle: "Real textures, aromatic charcoal smoke, and rich gravies simmered with patient craft.",
      interactive3dBadge: "Interactive Photogrammetry Scan",
      rotateToInspect: "Drag to rotate • Pinch to zoom",
      realPhotoFallback: "Authentic Photo View",
      exploreFullMenu: "Browse All Delicacies",
      signatureNote: "Each signature dish is cooked fresh to order using whole spices and churned dairy butter.",
    },
    menu: {
      sectionTag: "The Complete Menu",
      title: "Curated Vegetarian Specialties",
      subtitle: "Handcrafted North Indian gravies, clay-oven rotis, spicy Maharashtrian thecha, and fresh morning tiffin.",
      searchPlaceholder: "Search dishes, rotis, desserts...",
      allCategories: "All Sections",
      chefsSpecial: "Chef's Special",
      popular: "Guest Favorite",
      pureVeg: "Pure Veg",
      addToEnquiry: "Add to Enquiry",
      enquiryCart: "Pre-Order / Enquiry List",
      itemsSelected: "dishes selected",
      clearCart: "Clear List",
      sendWhatsAppEnquiry: "Send Enquiry via WhatsApp",
      disclaimerPrice: "Prices are approximate and subject to seasonal revision at the restaurant counter.",
      orderOnZomato: "Order for Home Delivery on Zomato",
    },
    celebrations: {
      sectionTag: "Banquets & Halls",
      title: "A Dignified Setting for Every Milestone",
      subtitle: "Air-conditioned celebration halls for birthdays, anniversaries, kitty parties, and family functions.",
      capacityNotice: "Seating Capacity: Ask us (Customized strictly to your guest count)",
      planMyEvent: "Plan Your Event",
      selectOccasion: "Select Celebration Type",
      dateLabel: "Preferred Date",
      guestsLabel: "Expected Number of Guests",
      notesLabel: "Special Dietary or Hall Requests",
      submitWhatsApp: "Connect with Event Manager on WhatsApp",
    },
    gallery: {
      sectionTag: "Real Moments",
      title: "Through the Lens",
      subtitle: "Unretouched real photography of our dining spaces, tandoor hearths, and celebration halls.",
      filterAll: "All Frames",
      filterFood: "Culinary",
      filterInterior: "Interior",
      filterHall: "Celebration Halls",
      filterExterior: "Exterior & Grounds",
    },
    visit: {
      sectionTag: "Location & Hours",
      title: "Join Us for Lunch or Dinner",
      subtitle: "Conveniently located on Basmat Road (NH22) with complimentary valet parking.",
      addressHeading: "Our Location",
      hoursHeading: "Service Hours",
      callHeading: "Direct Inquiries",
      valetHeading: "Valet & Parking",
      getDirections: "Get Directions on Google Maps",
      chatWhatsApp: "Message on WhatsApp",
      callFrontDesk: "Call Front Desk",
      hoursNotice: "Daily: 12:00 PM – 11:00 PM (Lunch & Dinner, Kitchen closes 10:30 PM)",
    },
    footer: {
      copyright: "Hotel Vatika, Parbhani. All rights reserved.",
      tagline: "Authentic Vegetarian Dining & Celebration Banquet Halls",
      highwayNote: "Plot 10, Sr 37/38, Near MIDC, Basmat Road (NH22), Parbhani 431402",
    },
  },
  mr: {
    nav: {
      menu: "मेनू",
      place: "परिसर",
      food: "विशेष चव",
      celebrations: "हॉल्स व सोहळे",
      gallery: "छायाचित्रे",
      visit: "भेट द्या",
      callNow: "फोन करा",
      reserveTable: "टेबल बुक करा",
      orderZomato: "झोमॅटोवर ऑर्डर करा",
    },
    hero: {
      tagline: "जिथे अस्सल मराठवाडी आणि उत्तर भारतीय स्वाद मिळतात आदरातिथ्यासह",
      subTagline: "परभणीतील उत्कृष्ट शाकाहारी भोजन आणि भव्य सेलिब्रेशन बँक्वेट हॉल्स",
      viewMenu: "संपूर्ण मेनू पहा",
      planCelebration: "सोहळ्याचे नियोजन करा",
      scrollHint: "अनुभव घेण्यासाठी खाली स्क्रोल करा",
      pureVegBadge: "१००% शुद्ध शाकाहारी भोजन",
      zomatoRating: "झोमॅटो ४.५ ★ (३,१४०+ डिलिव्हरी) • ४.२ ★ डायनिंग • ४.० ★ गुगल (३,३६०+)",
    },
    place: {
      sectionTag: "शांत वातावरण",
      title: "परभणीच्या मातीतील आपुलकी आणि उत्तम चव.",
      subtitle: "संध्याकाळच्या दिव्यांची मंद रोषणाई आणि आप्तेष्टांसोबत भोजनाचा मनसोक्त आनंद.",
      story1: "वसमत हायवेवर एमआयडीसीजवळ स्थित हॉटेल वाटिका हे प्रवासी आणि स्थानिक कुटुंबांसाठी एक शांत व विश्वासू ठिकाण आहे.",
      story2: "वातानुकूलित डायनिंग हॉलपासून ते स्वतंत्र सेलिब्रेशन बँक्वेट हॉलपर्यंत, प्रत्येक जागा आदरातिथ्याने सजलेली आहे.",
      story3: "येथे प्रत्येक पदार्थ पारंपारिक मातीच्या तंदूर आणि पितळी हांडीत मंद आचेवर प्रेमाने तयार केला जातो.",
      viewAtmosphere: "डायनिंग हॉलची झलक",
    },
    food: {
      sectionTag: "आमची पाककृती",
      title: "हॉटेल वाटिकाचे स्वाक्षरी पदार्थ",
      subtitle: "कोळशाच्या धुराचा अस्सल सुगंध, दाट ग्रेव्ही आणि शुद्ध दुधाच्या लोण्याची चव.",
      interactive3dBadge: "३डी वास्तववादी दर्शन",
      rotateToInspect: "फिरवून पाहण्यासाठी ड्रॅग करा",
      realPhotoFallback: "अस्सल फोटो",
      exploreFullMenu: "सर्व पदार्थ पहा",
      signatureNote: "प्रत्येक स्वाक्षरी डिश ताजी आणि दर्जेदार मसाल्यात तयार केली जाते.",
    },
    menu: {
      sectionTag: "संपूर्ण मेनू",
      title: "उत्कृष्ट शाकाहारी मेजवानी",
      subtitle: "पंजाबी ग्रेव्ही, तंदूर रोट्या, गावरान मिरची ठेचा, आणि सकाळचा खमंग नाश्ता.",
      searchPlaceholder: "पदार्थ, रोट्या, मिठाई शोधा...",
      allCategories: "सर्व विभाग",
      chefsSpecial: "शेफ स्पेशल",
      popular: "लोकप्रिय डिश",
      pureVeg: "शुद्ध शाकाहारी",
      addToEnquiry: "चौकशी यादीत जोडा",
      enquiryCart: "ऑर्डर / चौकशी यादी",
      itemsSelected: "पदार्थ निवडले",
      clearCart: "यादी रिकामी करा",
      sendWhatsAppEnquiry: "व्हॉट्सॲपवर पाठवा",
      disclaimerPrice: "दर साधारण असून प्रत्यक्ष हॉटेल काउंटरवर बदलू शकतात.",
      orderOnZomato: "झोमॅटोवरून घरपोच मागवा",
    },
    celebrations: {
      sectionTag: "बँक्वेट व पार्टी हॉल्स",
      title: "प्रत्येक आनंदी सोहळ्यासाठी भव्य जागा",
      subtitle: "वाढदिवस, लग्न वाढदिवस, किट्टी पार्टी आणि कौटुंबिक मंगल कार्यासाठी वातानुकूलित हॉल्स.",
      capacityNotice: "बैठक क्षमता: आम्हाला विचारा (पाहुण्यांच्या संख्येनुसार नियोजन)",
      planMyEvent: "कार्यक्रमाचे नियोजन करा",
      selectOccasion: "सोहळ्याचा प्रकार निवडा",
      dateLabel: "अपेक्षित तारीख",
      guestsLabel: "अपेक्षित पाहुण्यांची संख्या",
      notesLabel: "खास सूचना किंवा मेनू पसंती",
      submitWhatsApp: "व्हॉट्सॲपवर व्यवस्थापकाशी बोला",
    },
    gallery: {
      sectionTag: "अस्सल छायाचित्रे",
      title: "कॅमेऱ्याच्या नजरेतून वाटिका",
      subtitle: "आमच्या हॉटेलची, डायनिंग हॉलची आणि पदार्थांची खरीखुरी छायाचित्रे.",
      filterAll: "सर्व",
      filterFood: "भोजन",
      filterInterior: "डायनिंग हॉल",
      filterHall: "पार्टी हॉल",
      filterExterior: "परिसर",
    },
    visit: {
      sectionTag: "पत्ता व वेळ",
      title: "दुपारच्या वा रात्रीच्या जेवणासाठी जरूर या",
      subtitle: "वसमत रोड (NH22) वर सोयीस्कर जागा आणि मोफत व्हॅले पार्किंग.",
      addressHeading: "आमचा पत्ता",
      hoursHeading: "हॉटेलची वेळ",
      callHeading: "थेट संपर्क",
      valetHeading: "पार्किंग व्यवस्था",
      getDirections: "गुगल मॅप्सवर रस्ता पहा",
      chatWhatsApp: "व्हॉट्सॲपवर संदेश पाठवा",
      callFrontDesk: "रिसेप्शनवर फोन करा",
      hoursNotice: "दररोज: दुपारी १२:०० ते रात्री ११:०० (किचन रात्री १०:३० वाजता बंद होते)",
    },
    footer: {
      copyright: "हॉटेल वाटिका, परभणी. सर्व हक्क सुरक्षित.",
      tagline: "अस्सल शाकाहारी जेवण आणि सेलिब्रेशन बँक्वेट हॉल्स",
      highwayNote: "प्लॉट १०, सर्व्हे ३७/३८, एमआयडीसीजवळ, वसमत रोड (NH22), परभणी ४३१४०२",
    },
  },
  hi: {
    nav: {
      menu: "मेनू",
      place: "परिसर",
      food: "विशेष स्वाद",
      celebrations: "उत्सव व हॉल्स",
      gallery: "तस्वीरें",
      visit: "स्थान",
      callNow: "कॉल करें",
      reserveTable: "टेबल बुक करें",
      orderZomato: "ज़ोमैटो पर ऑर्डर करें",
    },
    hero: {
      tagline: "जहाँ प्रामाणिक मराठवाड़ा और उत्तर भारतीय स्वाद का संगम होता है",
      subTagline: "परभणी में बेहतरीन शाकाहारी भोजन और भव्य उत्सव हॉल",
      viewMenu: "मेनू देखें",
      planCelebration: "उत्सव की योजना बनाएं",
      scrollHint: "अनुभव करने के लिए नीचे स्क्रॉल करें",
      pureVegBadge: "१००% शुद्ध शाकाहारी भोजन",
      zomatoRating: "ज़ोमैटो ४.५ ★ (३,१४०+ डिलीवरी) • ४.२ ★ डाइनिंग • ४.० ★ गूगल (३,३६०+)",
    },
    place: {
      sectionTag: "शांत माहौल",
      title: "परभणी का अपना आत्मीय और स्वादिष्ट भोजन स्थल।",
      subtitle: "शांत रोशनी, परिवार के साथ बैठने का सुखद वातावरण और गर्मजोशी से स्वागत।",
      story1: "बासमथ हाईवे पर एमआईडीसी के पास स्थित होटल वाटिका यात्रियों और स्थानीय परिवारों के लिए एक शांत और विश्वसनीय भोजन स्थल है।",
      story2: "वातानुकूलित पारिवारिक डाइनिंग हॉल से लेकर निजी बैंक्वेट हॉल तक, हर जगह शांत और सुरुचिपूर्ण माहौल है।",
      story3: "यहाँ भोजन केवल पकाया नहीं जाता, बल्कि मिट्टी के तंदूर और पीतल की हांडी में शुद्ध मन से तैयार किया जाता है।",
      viewAtmosphere: "डाइनिंग हॉल की झलक",
    },
    food: {
      sectionTag: "हमारी रसोई",
      title: "होटल वाटिका के विशेष व्यंजन",
      subtitle: "कोयले के धुएं की खुशबू, गाढ़ी मखमली ग्रेवी और ताजे मक्खन का स्वाद।",
      interactive3dBadge: "3D वास्तविक मॉडल",
      rotateToInspect: "घुमाने के लिए ड्रैग करें",
      realPhotoFallback: "असली फोटो",
      exploreFullMenu: "पूरा मेनू देखें",
      signatureNote: "प्रत्येक व्यंजन ताजे खड़े मसालों और शुद्ध घी में तैयार किया जाता है।",
    },
    menu: {
      sectionTag: "संपूर्ण मेनू",
      title: "शुद्ध शाकाहारी विशेष व्यंजन",
      subtitle: "पंजाबी ग्रेवी, तंदूरी रोटियां, तीखा ठेचा और सुबह का स्वादिष्ट नाश्ता।",
      searchPlaceholder: "व्यंजन, रोटी, मिठाई खोजें...",
      allCategories: "सभी श्रेणियां",
      chefsSpecial: "शेफ स्पेशल",
      popular: "अतिथि प्रिय",
      pureVeg: "शुद्ध शाकाहारी",
      addToEnquiry: "पूछताछ सूची में जोड़ें",
      enquiryCart: "प्री-ऑर्डर सूची",
      itemsSelected: "व्यंजन चुने गए",
      clearCart: "सूची खाली करें",
      sendWhatsAppEnquiry: "व्हाट्सएप पर पूछताछ भेजें",
      disclaimerPrice: "कीमतें सांकेतिक हैं और काउंटर पर बदल सकती हैं।",
      orderOnZomato: "ज़ोमैटो से होम डिलीवरी ऑर्डर करें",
    },
    celebrations: {
      sectionTag: "बैंक्वेट व पार्टी हॉल्स",
      title: "हर यादगार लम्हे के लिए भव्य उत्सव स्थल",
      subtitle: "जन्मदिन, सालगिरह, किट्टी पार्टी और मांगलिक कार्यों के लिए वातानुकूलित हॉल।",
      capacityNotice: "बैठक क्षमता: हमसे पूछें (अतिथियों की संख्या अनुसार)",
      planMyEvent: "उत्सव का आयोजन करें",
      selectOccasion: "अवसर का प्रकार चुनें",
      dateLabel: "प्रस्तावित तारीख",
      guestsLabel: "अपेक्षित मेहमानों की संख्या",
      notesLabel: "विशेष आग्रह या मेनू चयन",
      submitWhatsApp: "व्हाट्सएप पर मैनेजर से संपर्क करें",
    },
    gallery: {
      sectionTag: "असली झलकियां",
      title: "कैमरे की नजर से वाटिका",
      subtitle: "हमारे डाइनिंग हॉल, तंदूर और उत्सव हॉल की वास्तविक तस्वीरें।",
      filterAll: "सभी",
      filterFood: "व्यंजन",
      filterInterior: "डाइनिंग हॉल",
      filterHall: "पार्टी हॉल",
      filterExterior: "परिसर",
    },
    visit: {
      sectionTag: "पता और समय",
      title: "दोपहर या रात के भोजन के लिए पधारें",
      subtitle: "बासमथ रोड (NH22) पर सुविधाजनक स्थान और निशुल्क वैले पार्किंग।",
      addressHeading: "हमारा पता",
      hoursHeading: "समय",
      callHeading: "सीधा संपर्क",
      valetHeading: "पार्किंग सुविधा",
      getDirections: "गूगल मैप्स पर रास्ता देखें",
      chatWhatsApp: "व्हाट्सएप पर संदेश भेजें",
      callFrontDesk: "रिसेप्शन पर कॉल करें",
      hoursNotice: "प्रतिदिन: दोपहर 12:00 से रात 11:00 (रसोई रात 10:30 बजे बंद होती है)",
    },
    footer: {
      copyright: "होटल वाटिका, परभणी। सर्वाधिकार सुरक्षित।",
      tagline: "शुद्ध शाकाहारी भोजन और भव्य उत्सव हॉल",
      highwayNote: "प्लॉट 10, सर्वे 37/38, एमआईडीसी के पास, बासमथ रोड (NH22), परभणी 431402",
    },
  },
};
