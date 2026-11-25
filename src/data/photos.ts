/**
 * Hotel Vatika — Master Photography Manifest
 * Fully updated with real photographs extracted directly from Hotel Vatika's
 * live Zomato listing (res_id: 19159650) and Google Maps listing (Parbhani).
 * Categorized by food | interior | hall | event | exterior
 */

export interface PhotoAsset {
  id: string;
  src: string;
  depthSrc?: string;
  alt: {
    en: string;
    mr: string;
    hi: string;
  };
  category: "food" | "interior" | "hall" | "event" | "exterior";
  caption?: {
    en: string;
    mr: string;
    hi: string;
  };
  dominantColor: string; // Hex extracted from real photo
  isRealAssetProvided: boolean;
  dimensions: {
    width: number;
    height: number;
  };
}

export const PHOTO_MANIFEST: PhotoAsset[] = [
  // EXTERIOR & ENTRANCE (Real photography of Hotel Vatika Pure Veg)
  {
    id: "exterior-facade",
    src: "/assets/photos/exterior/facade-twilight.webp",
    depthSrc: "/assets/photos/exterior/facade-twilight-depth.webp",
    alt: {
      en: "Hotel Vatika illuminated exterior building and signage at twilight on Basmat Road",
      mr: "संध्याकाळच्या वेळी वसमत रोडवरील हॉटेल वाटिकाची भव्य रोषणाई आणि इमारत",
      hi: "गोधूलि वेला में बासमथ रोड पर होटल वाटिका का भव्य स्वरूप और प्रकाश",
    },
    category: "exterior",
    caption: {
      en: "Basmat Road Highway Arrival — Hotel Vatika Pure Veg illuminated at twilight",
      mr: "वसमत रोडवरील आगमन — संध्यासमयी रोषणाईने उजळलेले हॉटेल वाटिका",
      hi: "बासमथ रोड मुख्य द्वार — गोधूलि वेला में जगमगाता होटल वाटिका",
    },
    dominantColor: "#a18875",
    isRealAssetProvided: true,
    dimensions: { width: 1920, height: 1280 },
  },
  {
    id: "entrance-porch",
    src: "/assets/photos/exterior/entrance-warm.webp",
    alt: {
      en: "Hotel Vatika welcoming entrance porch, valet point and natural garden lawn",
      mr: "हॉटेल वाटिकाचे स्वागत दालन, व्हॅले पार्किंग आणि हिरवेगार लॉन",
      hi: "होटल वाटिका का स्वागत द्वार, वैले पार्किंग और प्राकृतिक प्रांगण",
    },
    category: "exterior",
    caption: {
      en: "Warm Highway Sanctuary & Dedicated Parking Arrival",
      mr: "महामार्गावरील प्रसन्न स्वागत व सुसज्ज पार्किंग व्यवस्था",
      hi: "राजमार्ग पर सुकून भरा पड़ाव और सुगम पार्किंग",
    },
    dominantColor: "#665c50",
    isRealAssetProvided: true,
    dimensions: { width: 1920, height: 1279 },
  },

  // DINING HALL & INTERIOR (Real photos of the AC hall and seating)
  {
    id: "interior-main-hall",
    src: "/assets/photos/interior/main-dining-hall.webp",
    depthSrc: "/assets/photos/interior/main-dining-hall-depth.webp",
    alt: {
      en: "Spacious air-conditioned family dining hall at Hotel Vatika with clean tables and warm ambient lighting",
      mr: "हॉटेल वाटिकाचे भव्य वातानुकूलित कौटुंबिक डायनिंग दालन, स्वच्छ टेबल्स व उबदार प्रकाश",
      hi: "होटल वाटिका का विशाल वातानुकूलित पारिवारिक डाइनिंग हॉल, शांत रोशनी और सुरुचिपूर्ण माहौल",
    },
    category: "interior",
    caption: {
      en: "Main Family Dining Sanctuary — Air-conditioned comfort for relaxed family gatherings",
      mr: "मुख्य कौटुंबिक डायनिंग दालन — संपूर्ण कुटुंबासाठी वातानुकूलित व निवांत सहभोजन",
      hi: "पारिवारिक डाइनिंग हॉल — पूरे परिवार के लिए आरामदायक और वातानुकूलित बैठक",
    },
    dominantColor: "#626158",
    isRealAssetProvided: true,
    dimensions: { width: 1440, height: 1080 },
  },
  {
    id: "interior-brass-details",
    src: "/assets/photos/interior/brass-handi-counter.webp",
    alt: {
      en: "Interior seating and authentic hospitality setup at Hotel Vatika",
      mr: "हॉटेल वाटिकाची अंतर्गत बैठक व्यवस्था आणि आदरातिथ्य",
      hi: "होटल वाटिका की आंतरिक बैठक व्यवस्था और आतिथ्य",
    },
    category: "interior",
    caption: {
      en: "Comfortable Seating Crafted for Long Conversations",
      mr: "आरामदायी आसनव्यवस्था आणि शांत वातावरण",
      hi: "आरामदायक बैठक और सुकून भरा वातावरण",
    },
    dominantColor: "#7c5f62",
    isRealAssetProvided: true,
    dimensions: { width: 675, height: 1200 },
  },

  // CELEBRATION & BANQUET HALLS (Real event setups)
  {
    id: "hall-grand-banquet",
    src: "/assets/photos/hall/banquet-hall-stage.webp",
    depthSrc: "/assets/photos/hall/banquet-hall-stage-depth.webp",
    alt: {
      en: "Celebration banquet hall at Hotel Vatika arranged for family function and milestone events",
      mr: "कौटुंबिक व मंगल कार्यासाठी सजवलेला हॉटेल वाटिकाचा भव्य सेलिब्रेशन हॉल",
      hi: "पारिवारिक उत्सव और सगाई समारोह के लिए सजा होटल वाटिका का भव्य बैंक्वेट हॉल",
    },
    category: "hall",
    caption: {
      en: "Grand Celebration Hall — Specially curated for birthdays, engagements, and kitty parties",
      mr: "भव्य सेलिब्रेशन हॉल — वाढदिवस, साखरपुडा व स्नेहसंमेलनांसाठी सज्ज",
      hi: "भव्य उत्सव हॉल — जन्मदिन, वर्षगांठ और पारिवारिक आयोजनों के लिए उपयुक्त",
    },
    dominantColor: "#6c6464",
    isRealAssetProvided: true,
    dimensions: { width: 810, height: 1080 },
  },
  {
    id: "hall-birthday-setup",
    src: "/assets/photos/hall/birthday-setup.webp",
    alt: {
      en: "Milestone birthday and celebration lighting at Hotel Vatika banquet",
      mr: "वाढदिवसाच्या सोहळ्यासाठी आकर्षक दिव्यांनी सजवलेला पार्टी हॉल",
      hi: "जन्मदिन समारोह के लिए रोशनी और मंच से सजा पार्टी हॉल",
    },
    category: "event",
    caption: {
      en: "Curated Milestone Birthday Celebrations",
      mr: "आठवणीत राहणारे खास वाढदिवस सोहळे",
      hi: "यादगार जन्मदिन और वर्षगांठ समारोह",
    },
    dominantColor: "#7d6e66",
    isRealAssetProvided: true,
    dimensions: { width: 810, height: 1080 },
  },
  {
    id: "hall-kitty-party",
    src: "/assets/photos/hall/kitty-party-setup.webp",
    alt: {
      en: "Outdoor lawn garden dining and kitty party setup under evening festoon lights",
      mr: "संध्याकाळच्या रोषणाईखालील खुली लॉन बैठक व किट्टी पार्टी व्यवस्था",
      hi: "शाम के समय खुले लॉन में मित्र मिलन और किट्टी पार्टी की व्यवस्था",
    },
    category: "event",
    caption: {
      en: "Open-Air Evening Lawn & Kitty Party Gatherings",
      mr: "मोकळ्या हवेतील संध्याकाळचे लॉन जेवण व स्नेहमिलन",
      hi: "खुले प्रांगण में शाम का सुरुचिपूर्ण भोजन व सभाएं",
    },
    dominantColor: "#7f706a",
    isRealAssetProvided: true,
    dimensions: { width: 810, height: 1080 },
  },

  // FOOD EDITORIAL HEROES (Real dish photography from Hotel Vatika Zomato menu)
  {
    id: "food-vatika-special-macro",
    src: "/assets/photos/food/vatika-special.webp",
    depthSrc: "/assets/photos/food/vatika-special-depth.webp",
    alt: {
      en: "Signature Vatika Special Veg served in rich handi gravy with roasted dry fruits and paneer",
      mr: "हॉटेल वाटिकाची खास ओळख — वाटिका स्पेशल व्हेज, सुकामेवा आणि अस्सल मसाल्यांची मेजवानी",
      hi: "होटल वाटिका की विशेष पहचान — वाटिका स्पेशल वेज, काजू और पनीर की लाजवाब ग्रेवी",
    },
    category: "food",
    caption: {
      en: "The Flagship: Vatika Special Veg (₹450)",
      mr: "हॉटेल वाटिकाची स्वाक्षरी: वाटिका स्पेशल व्हेज (₹450)",
      hi: "होटल वाटिका की खास डिश: वाटिका स्पेशल वेज (₹450)",
    },
    dominantColor: "#886d4e",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: "food-paneer-angara-macro",
    src: "/assets/photos/food/paneer-angara.webp",
    depthSrc: "/assets/photos/food/paneer-angara-depth.webp",
    alt: {
      en: "Real photograph of Paneer Angara at Hotel Vatika with slow-smoked charcoal infusion",
      mr: "कोळशाच्या धुरावर तयार झालेले अस्सल धुरकट चवीचे पनीर अंगारा",
      hi: "सुलगते अंगारों की खुशबू में तैयार प्रामाणिक पनीर अंगारा",
    },
    category: "food",
    caption: {
      en: "Charcoal Smoked Paneer Angara (₹380)",
      mr: "कोळशाच्या धुरावर तयार झालेले पनीर अंगारा (₹380)",
      hi: "कोयले के धुएं में तैयार पनीर अंगारा (₹380)",
    },
    dominantColor: "#c5a689",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 799 },
  },
  {
    id: "food-kaju-masala-macro",
    src: "/assets/photos/food/kaju-masala.webp",
    depthSrc: "/assets/photos/food/kaju-masala-depth.webp",
    alt: {
      en: "Real photograph of rich slow-roasted Kaju Masala simmered in rich gravy at Hotel Vatika",
      mr: "सोनेरी तुपात भाजलेले काजू आणि दाट मसाल्यांचा अस्सल काजू मसाला",
      hi: "घी में भुने काजू और गाढ़े मसालों से भरपूर स्वादिष्ट काजू मसाला",
    },
    category: "food",
    caption: {
      en: "Slow-Braised Kaju Masala (₹370)",
      mr: "मंद आचेवर शिजवलेला काजू मसाला (₹370)",
      hi: "धीमी आंच पर पका काजू मसाला (₹370)",
    },
    dominantColor: "#886d4e",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: "food-tandoor-spread",
    src: "/assets/photos/food/tandoor-bread-spread.webp",
    alt: {
      en: "Real photograph of freshly baked Garlic Naan and Butter Kulcha brushed with golden butter",
      mr: "मातीच्या तंदूरमधून नुकताच बाहेर काढलेला खमंग गार्लिक नान व बटर कुलचा",
      hi: "मिट्टी के तंदूर से ताजा निकला लहसुन नान और मक्खन कुलचा",
    },
    category: "food",
    caption: {
      en: "Clay-Fired Artisan Breads & Cheese Garlic Naan",
      mr: "तंदूरमध्ये भाजलेल्या ताज्या रोट्या व नान",
      hi: "तंदूर की ताजा और कुरकुरी रोटियां व नान",
    },
    dominantColor: "#e3dfd9",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 615 },
  },
  {
    id: "food-malai-methi",
    src: "/assets/photos/food/malai-methi.webp",
    alt: {
      en: "Real photo of delicate Shahi Malai Methi simmered with fresh fenugreek and sweet cream",
      mr: "ताज्या मेथीच्या पानांमध्ये आणि दुधाच्या मलाईमध्ये शिजवलेली मलाई मेथी",
      hi: "ताजी मेथी और मलाई के संगम से बनी शाही मलाई मेथी",
    },
    category: "food",
    caption: {
      en: "Shahi Malai Methi (₹350)",
      mr: "शाही मलाई मेथी (₹350)",
      hi: "शाही मलाई मेथी (₹350)",
    },
    dominantColor: "#dbd5c9",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: "food-navratan-kurma",
    src: "/assets/photos/food/navratan-kurma.webp",
    alt: {
      en: "Real photo of rich royal Navratan Kurma with nine gems of seasonal vegetables and nuts",
      mr: "नऊ प्रकारच्या भाज्या आणि सुकामेव्याने सजवलेला नवरत्न कुरमा",
      hi: "मौसमी सब्जियों और मेवों से भरपूर शाही नवरत्न कुरमा",
    },
    category: "food",
    caption: {
      en: "Royal Navratan Kurma (₹370)",
      mr: "नवरत्न कुरमा (₹370)",
      hi: "नवरत्न कुरमा (₹370)",
    },
    dominantColor: "#c8c2b3",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: "food-sev-bhaji",
    src: "/assets/photos/food/sev-bhaji.webp",
    alt: {
      en: "Authentic Khandeshi / Marathwada Sev Bhaji with spicy red rassa and crisp sev",
      mr: "अस्सल झणझणीत मराठवाडी शेव भाजी आणि तर्रीदार रस्सा",
      hi: "मराठवाड़ा की प्रसिद्ध तीखी और स्वादिष्ट सेव भाजी",
    },
    category: "food",
    caption: {
      en: "Authentic Marathwada Sev Bhaji (₹280)",
      mr: "अस्सल मराठवाडी शेव भाजी (₹280)",
      hi: "मराठवाड़ा की प्रसिद्ध सेव भाजी (₹280)",
    },
    dominantColor: "#7e715e",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 843 },
  },
  {
    id: "food-mushroom-handi",
    src: "/assets/photos/food/mushroom-handi.webp",
    alt: {
      en: "Real photo of fresh button Mushroom Handi slow cooked in earthenware",
      mr: "हांडीमध्ये मंद आचेवर शिजवलेली मशरूम हांडी",
      hi: "मिट्टी की हांडी में पकाई गई स्वादिष्ट मशरूम हांडी",
    },
    category: "food",
    caption: {
      en: "Clay Pot Mushroom Handi (₹370)",
      mr: "मशरूम हांडी (₹370)",
      hi: "मशरूम हांडी (₹370)",
    },
    dominantColor: "#9c7159",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: "food-paneer-rajwadi",
    src: "/assets/photos/food/paneer-rajwadi.webp",
    alt: {
      en: "Real photo of royal Paneer Rajwadi in golden saffron curry",
      mr: "शाही राजस्थानी शैलीतील चवदार पनीर रजवाडी",
      hi: "शाही अंदाज में तैयार स्वादिष्ट पनीर रजवाड़ी",
    },
    category: "food",
    caption: {
      en: "Royal Paneer Rajwadi (₹380)",
      mr: "पनीर रजवाडी (₹380)",
      hi: "पनीर रजवाड़ी (₹380)",
    },
    dominantColor: "#a19885",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 843 },
  },
  {
    id: "food-veg-lollipop",
    src: "/assets/photos/food/veg-lollipop.webp",
    alt: {
      en: "Crisp golden spiced Veg Lollipop served with hot schezwan dip",
      mr: "कुरकुरीत गरमागरम व्हेज लॉलीपॉप आणि शेजवान चटणी",
      hi: "कुरकुरा वेज लॉलीपॉप और तीखी शेजवान चटनी",
    },
    category: "food",
    caption: {
      en: "Crispy Veg Lollipop (₹190)",
      mr: "कुरकुरीत व्हेज लॉलीपॉप (₹190)",
      hi: "कुरकुरा वेज लॉलीपॉप (₹190)",
    },
    dominantColor: "#9a7452",
    isRealAssetProvided: true,
    dimensions: { width: 1200, height: 843 },
  },
];
