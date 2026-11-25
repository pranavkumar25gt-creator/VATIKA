/**
 * Master Menu Dataset for Hotel Vatika (Pure Veg), Parbhani
 * Synchronized with live Zomato listing (res_id: 19159650) and Google Places data.
 * All items support English, Marathi, and Hindi descriptions.
 */

export interface MenuItem {
  id: string;
  name: {
    en: string;
    mr: string;
    hi: string;
  };
  description: {
    en: string;
    mr: string;
    hi: string;
  };
  price: number;
  category: MenuCategoryId;
  isChefSpecial?: boolean;
  isPopular?: boolean;
  isSignature?: boolean;
  isVeg: boolean;
  image?: string;
  depthMap?: string;
  has3DModel?: boolean;
  modelPath?: string;
  spiceLevel?: 1 | 2 | 3; // 1 = mild, 2 = medium, 3 = spicy
  servingSize?: string;
}

export type MenuCategoryId =
  | "punjabi"
  | "chinese"
  | "south-indian"
  | "street-food"
  | "breads"
  | "breakfast"
  | "desserts"
  | "accompaniments";

export interface MenuCategory {
  id: MenuCategoryId;
  name: {
    en: string;
    mr: string;
    hi: string;
  };
  description: {
    en: string;
    mr: string;
    hi: string;
  };
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "punjabi",
    name: {
      en: "Punjabi Main Course",
      mr: "पंजाबी मुख्य जेवण",
      hi: "पंजाबी मुख्य भोजन",
    },
    description: {
      en: "Simmered in rich gravies, slow-cooked in handis with pure ghee and aromatic spices.",
      mr: "शुद्ध तुपात आणि सुगंधी मसाल्यांत मंद आचेवर शिजवलेल्या उत्कृष्ट भाज्या.",
      hi: "शुद्ध घी और सुगंधित मसालों में धीमी आंच पर पकाई गई गाढ़ी ग्रेवी वाली सब्जियां।",
    },
  },
  {
    id: "breads",
    name: {
      en: "Tandoori Breads",
      mr: "तंदूरी रोट्या व नान",
      hi: "तंदूरी रोटियां और नान",
    },
    description: {
      en: "Fired fresh in the clay tandoor, brushed with golden butter and fresh herbs.",
      mr: "पारंपारिक मातीच्या तंदूरमध्ये भाजलेले गरमागरम आणि मऊ बटर नान व कुलचे.",
      hi: "पारंपरिक मिट्टी के तंदूर में ताजा सेके गए मक्खन युक्त नान और कुलचे।",
    },
  },
  {
    id: "chinese",
    name: {
      en: "Chinese & Sizzlers",
      mr: "चायनीज आणि सिझलर्स",
      hi: "चाइनीज और सिज़लर्स",
    },
    description: {
      en: "Wok-tossed starters, fiery schezwan creations, and sizzling hot plates.",
      mr: "कुरकुरीत स्टार्टर्स, शेजवान चव आणि गरमागरम सिझलिंग प्लॅटर्स.",
      hi: "कड़ाही में टॉस किए गए कुरकुरे स्टार्टर्स और तीखे सिज़लिंग प्लैटर्स।",
    },
  },
  {
    id: "breakfast",
    name: {
      en: "Breakfast & Morning Tiffin",
      mr: "सकाळचा नाश्ता व टिफिन",
      hi: "सुबह का नाश्ता और टिफिन",
    },
    description: {
      en: "Traditional morning delicacies made fresh daily with stone-ground chutneys.",
      mr: "पारंपारिक पद्धतीचा चवदार सकाळचा नाश्ता आणि अस्सल चटण्या.",
      hi: "ताजा तैयार स्वादिष्ट पारंपरिक नाश्ता और ताजी पिसी हुई चटनी।",
    },
  },
  {
    id: "south-indian",
    name: {
      en: "South Indian Delights",
      mr: "दाक्षिणात्य विशेष",
      hi: "दक्षिण भारतीय व्यंजन",
    },
    description: {
      en: "Crisp dosas, fluffy idlis, and slow-steeped sambar infused with curry leaves.",
      mr: "कुरकुरीत डोसे, मऊ इडल्या आणि अस्सल सांबार.",
      hi: "कुरकुरे डोसे, नरम इडली और सुगंधित सांभर।",
    },
  },
  {
    id: "street-food",
    name: {
      en: "Street Food & Snacks",
      mr: "चाट व स्ट्रीट फूड",
      hi: "स्ट्रीट फूड और चाट",
    },
    description: {
      en: "Tawa tossed pav bhaji, zesty chaats, and evening tea-time savories.",
      mr: "तवा पावभाजी, चटपटीत चाट आणि संध्याकाळचा खमंग नाश्ता.",
      hi: "तवा पाव भाजी, चटपटी चाट और शाम का स्वादिष्ट नाश्ता।",
    },
  },
  {
    id: "desserts",
    name: {
      en: "Desserts & Beverages",
      mr: "मिठाई व पेये",
      hi: "मिठाई और पेय",
    },
    description: {
      en: "Decadent Indian sweets, warm gulab jamuns, rich mastani, and refreshing coolers.",
      mr: "गरमागरम मालपुआ, जिलेबी, मस्तानी आणि थंडगार पेये.",
      hi: "गरम मालपुआ, जलेबी, मैंगो मस्तानी और ताज़ा पेय।",
    },
  },
  {
    id: "accompaniments",
    name: {
      en: "Accompaniments & Salads",
      mr: "सॅलड, रायता व ठेचा",
      hi: "सलाद, रायता और ठेचा",
    },
    description: {
      en: "Fiery Maharashtrian thecha, fresh garden salads, roasted papads, and chilled curd.",
      mr: "मराठवाडी तिखट मिरची ठेचा, थंडगार रायता आणि कुरकुरीत पापड.",
      hi: "मराठवाड़ी तीखा ठेचा, ठंडा रायता और कुरकुरे पापड़।",
    },
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // PUNJABI MAIN COURSE (Verified live from Zomato ID 19159650)
  {
    id: "vatika-special-veg",
    name: {
      en: "Vatika Special Veg",
      mr: "वाटिका स्पेशल व्हेज",
      hi: "वाटिका स्पेशल वेज",
    },
    description: {
      en: "Hotel Vatika flagship signature multi-layered vegetable delicacy with whole cashews, rich malai paneer, and two velvety gravies.",
      mr: "हॉटेल वाटिकाची खास ओळख — दोन मखमली ग्रेव्ही, संपूर्ण काजू आणि मलाई पनीरची शाही मेजवानी.",
      hi: "होटल वाटिका की विशेष पहचान — काजू, मलाई पनीर और दो मखमली ग्रेवियों से सजी लाजवाब सब्ज़ी।",
    },
    price: 450,
    category: "punjabi",
    isChefSpecial: true,
    isSignature: true,
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/vatika-special.webp",
    depthMap: "/assets/photos/food/vatika-special-depth.webp",
    has3DModel: true,
    modelPath: "/assets/models/vatika-special.glb",
    spiceLevel: 2,
    servingSize: "Serves 2-3",
  },
  {
    id: "paneer-angara",
    name: {
      en: "Paneer Angara",
      mr: "पनीर अंगारा (धुरकट चव)",
      hi: "पनीर अंगारा",
    },
    description: {
      en: "Charcoal-smoked fresh cottage cheese infused with whole spices, roasted red chillies, and a fiery dhungar aroma.",
      mr: "कोळशाच्या धुराची अस्सल चव, ताज्या पनीरचे तुकडे आणि तिखट लाल रंगाची मनपसंत ग्रेव्ही.",
      hi: "कोयले के धुएं के स्वाद में डूबा ताजा पनीर, तीखी लाल मिर्च और मसालों का जोरदार मेल।",
    },
    price: 380,
    category: "punjabi",
    isChefSpecial: true,
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/paneer-angara.webp",
    depthMap: "/assets/photos/food/paneer-angara-depth.webp",
    has3DModel: true,
    modelPath: "/assets/models/paneer-angara.glb",
    spiceLevel: 3,
    servingSize: "Serves 2",
  },
  {
    id: "paneer-rajwadi",
    name: {
      en: "Paneer Rajwadi",
      mr: "पनीर रजवाडी",
      hi: "पनीर रजवाड़ी",
    },
    description: {
      en: "Royal Rajasthani preparation with rich crushed spices, khoya, saffron hints, and succulent paneer slices.",
      mr: "शाही रजवाडी मसाल्यांत आणि माव्यात तयार केलेले मखमली पनीर.",
      hi: "शाही मसालों, खोया और मखमली ग्रेवी में तैयार किया गया शाही पनीर।",
    },
    price: 380,
    category: "punjabi",
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/paneer-rajwadi.webp",
    spiceLevel: 2,
    servingSize: "Serves 2",
  },
  {
    id: "shahi-malai-methi",
    name: {
      en: "Shahi Malai Methi",
      mr: "शाही मलाई मेथी",
      hi: "शाही मलाई मेथी",
    },
    description: {
      en: "Fresh tender fenugreek leaves blended with sweet green peas and velvety whole milk cream gravy.",
      mr: "ताजी मेथी, मटार आणि समृद्ध दुधाच्या मलाईची गोडसर व सुगंधी ग्रेव्ही.",
      hi: "ताजी मेथी के पत्ते, मटर और गाढ़ी मलाई की शाही ग्रेवी।",
    },
    price: 350,
    category: "punjabi",
    isChefSpecial: true,
    isVeg: true,
    image: "/assets/photos/food/malai-methi.webp",
    spiceLevel: 1,
    servingSize: "Serves 2",
  },
  {
    id: "kaju-masala",
    name: {
      en: "Kaju Masala / Kaju Curry",
      mr: "काजू मसाला / काजू करी",
      hi: "काजू मसाला / काजू करी",
    },
    description: {
      en: "Whole roasted Goan cashews tossed in a golden browned onion, tomato, and clove gravy.",
      mr: "तूपामध्ये भाजलेले संपूर्ण काजू आणि खमंग कांदा-टोमॅटोची मसालेदार ग्रेव्ही.",
      hi: "घी में भुने साबुत काजू और खुशबूदार भुने प्याज-टमाटर की गाढ़ी ग्रेवी।",
    },
    price: 370,
    category: "punjabi",
    isPopular: true,
    isSignature: true,
    isVeg: true,
    image: "/assets/photos/food/kaju-masala.webp",
    depthMap: "/assets/photos/food/kaju-masala-depth.webp",
    has3DModel: true,
    modelPath: "/assets/models/kaju-masala.glb",
    spiceLevel: 2,
    servingSize: "Serves 2",
  },
  {
    id: "malai-kofta",
    name: {
      en: "Malai Kofta / Shaam Savera",
      mr: "मलाई कोफ्ता / शाम सवेरा",
      hi: "मलाई कोफ्ता / शाम सवेरा",
    },
    description: {
      en: "Melt-in-mouth cottage cheese and mawa dumplings gently immersed in a silky white-gold cashew gravy.",
      mr: "तोंडात विरघळणारे पनीर व माव्याचे मऊ कोफ्ते आणि क्रीमी काजू ग्रेव्ही.",
      hi: "मुंह में घुल जाने वाले पनीर व खोये के कोफ्ते और मखमली काजू ग्रेवी।",
    },
    price: 370,
    category: "punjabi",
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/malai-kofta.webp",
    spiceLevel: 1,
    servingSize: "Serves 2",
  },
  {
    id: "navratan-kurma",
    name: {
      en: "Navratan Kurma",
      mr: "नवरतन कुर्मा",
      hi: "नवरतन कोरमा",
    },
    description: {
      en: "Nine gems of vegetables, dried fruits, and paneer braised in a fragrant saffron and cardamom reduction.",
      mr: "नऊ प्रकारच्या भाज्या, सुकामेवा आणि पनीर यांचे केशरयुक्त समृद्ध मिश्रण.",
      hi: "नौ प्रकार की सब्जियां, मेवे और पनीर का सुगंधित केसरिया व्यंजन।",
    },
    price: 370,
    category: "punjabi",
    isVeg: true,
    image: "/assets/photos/food/navratan-kurma.webp",
    spiceLevel: 1,
    servingSize: "Serves 2-3",
  },
  {
    id: "veg-kofta-handi",
    name: {
      en: "Veg Kofta Handi",
      mr: "व्हेज कोफ्ता हांडी",
      hi: "वेज कोफ्ता हांडी",
    },
    description: {
      en: "Spiced vegetable croquettes served in a traditional clay handi with rich simmered gravy.",
      mr: "मातीच्या हांडीमध्ये वाढलेले कुरकुरीत भाज्यांचे कोफ्ते आणि खमंग ग्रेव्ही.",
      hi: "मिट्टी की हांडी में परोसे गए मसालेदार वेज कोफ्ते और स्वादिष्ट ग्रेवी।",
    },
    price: 370,
    category: "punjabi",
    isVeg: true,
    image: "/assets/photos/food/veg-kofta.webp",
    spiceLevel: 2,
    servingSize: "Serves 2",
  },
  {
    id: "mushroom-handi",
    name: {
      en: "Mushroom Handi",
      mr: "मशरूम हांडी",
      hi: "मशरूम हांडी",
    },
    description: {
      en: "Tender button mushrooms slow-simmered in roasted cumin, coriander seeds, and brown onion paste.",
      mr: "ताजे मशरूम, भाजलेले जिरे आणि धणे यांच्या सुरेख चवीत बनवलेली हांडी भाजी.",
      hi: "ताजा बटन मशरूम और भुने हुए खड़े मसालों से तैयार हांडी ग्रेवी।",
    },
    price: 370,
    category: "punjabi",
    isVeg: true,
    image: "/assets/photos/food/mushroom-handi.webp",
    spiceLevel: 2,
    servingSize: "Serves 2",
  },
  {
    id: "babycorn-mushroom-kadai",
    name: {
      en: "Babycorn Mushroom Kadai",
      mr: "बेबीकॉर्न मशरूम कढाई",
      hi: "बेबीकॉर्न मशरूम कढ़ाई",
    },
    description: {
      en: "Crisp babycorn and juicy mushrooms tossed in an iron wok with bell peppers and crushed black peppercorns.",
      mr: "लोखंडी कढाईत भाजलेली शिमला मिरची, कुरकुरीत बेबीकॉर्न आणि मशरूम.",
      hi: "कढ़ाई में शिमला मिर्च, कुरकुरे बेबी कॉर्न और रसीले मशरूम का मेल।",
    },
    price: 370,
    category: "punjabi",
    isVeg: true,
    image: "/assets/photos/food/kadai-mushroom.webp",
    spiceLevel: 2,
    servingSize: "Serves 2",
  },
  {
    id: "baingan-bharta",
    name: {
      en: "Baingan Bharta / Baingan Masala",
      mr: "चुलीवरचे वांग्याचे भरीत / बैंगन मसाला",
      hi: "देसी बैंगन भर्ता / बैंगन मसाला",
    },
    description: {
      en: "Woodfire-roasted eggplant mashed with crushed garlic, green chillies, spring onions, and mustard oil drizzle.",
      mr: "गावरान पद्धतीने भाजलेल्या वांग्याचे खमंग लसूण आणि मिरचीयुक्त भरीत.",
      hi: "धीमी आंच पर भुना बैंगन, लहसुन, हरी मिर्च और मसालों का तड़का।",
    },
    price: 280,
    category: "punjabi",
    isSignature: true,
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/baingan-bharta.webp",
    spiceLevel: 2,
    servingSize: "Serves 2",
  },
  {
    id: "sev-bhaji",
    name: {
      en: "Khandeshi Sev Bhaji",
      mr: "खानदेशी शेव भाजी (झणझणीत रस्सा)",
      hi: "खानदेशी सेव भाजी",
    },
    description: {
      en: "Crisp gram flour sev served with fiery roasted kala masala rassa, coconut, and sesame undertones.",
      mr: "झणझणीत काळा मसाला रस्सा आणि कुरकुरीत तिखट शेव.",
      hi: "खानदेशी काले मसाले का तीखा रस्सा और कुरकुरी सेव।",
    },
    price: 280,
    category: "punjabi",
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/sev-bhaji.webp",
    spiceLevel: 3,
    servingSize: "Serves 1-2",
  },

  // TANDOORI BREADS (Verified prices)
  {
    id: "garlic-naan",
    name: {
      en: "Cheese Garlic Naan",
      mr: "चीज लसूण नान (बटरयुक्त)",
      hi: "चीज गार्लिक नान",
    },
    description: {
      en: "Hand-stretched leavened flatbread topped with minced roasted garlic, gooey cheese, fresh coriander, and melted butter.",
      mr: "तंदूरमध्ये भाजलेला आणि लसूण, चीज व लोण्याने माखलेला मऊ लुसलुशीत नान.",
      hi: "तंदूर में सेका हुआ कुरकुरा नान, भुने लहसुन, चीज और मक्खन की खुशबू के साथ।",
    },
    price: 160,
    category: "breads",
    isPopular: true,
    isSignature: true,
    isVeg: true,
    image: "/assets/photos/food/garlic-naan.webp",
    servingSize: "1 Large Piece",
  },
  {
    id: "butter-kulcha",
    name: {
      en: "Butter Kulcha",
      mr: "बटर कुलचा",
      hi: "बटर कुलचा",
    },
    description: {
      en: "Flaky, layered Punjabi flatbread sprinkled with nigella seeds and baked till blistered and golden.",
      mr: "कलौंजी लावलेला आणि मुबलक लोणी घातलेला खमंग कुलचा.",
      hi: "कलौंजी के दानों से सजा, परतों वाला कुरकुरा बटर कुलचा।",
    },
    price: 115,
    category: "breads",
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/butter-kulcha.webp",
    servingSize: "1 Piece",
  },
  {
    id: "butter-naan",
    name: {
      en: "Butter Naan",
      mr: "बटर नान",
      hi: "बटर नान",
    },
    description: {
      en: "Classic clay oven bread generously brushed with churned dairy butter.",
      mr: "पारंपारिक तंदूरी मऊ नान, भरपूर बटरसह.",
      hi: "तंदूर में बना पारंपरिक मक्खन युक्त नान।",
    },
    price: 105,
    category: "breads",
    isVeg: true,
    image: "/assets/photos/food/butter-naan.webp",
    servingSize: "1 Piece",
  },
  {
    id: "butter-roti",
    name: {
      en: "Tandoori Butter Roti",
      mr: "तंदूरी बटर रोटी",
      hi: "तंदूरी बटर रोटी",
    },
    description: {
      en: "100% whole wheat tandoor baked roti brushed with fresh butter.",
      mr: "गव्हाची तंदूरी पोळी, हलक्या लोण्यासह.",
      hi: "गेहूं के आटे से तंदूर में सिकी मक्खन वाली रोटी।",
    },
    price: 47,
    category: "breads",
    isVeg: true,
    image: "/assets/photos/food/butter-roti.webp",
    servingSize: "1 Piece",
  },
  {
    id: "tandoori-paratha",
    name: {
      en: "Lachha Tandoori Paratha",
      mr: "लच्छा तंदूरी पराठा",
      hi: "लच्छा तंदूरी पराठा",
    },
    description: {
      en: "Crisp multi-layered whole wheat paratha baked in the tandoor.",
      mr: "गव्हाचा पदर असलेला कुरकुरीत तंदूर पराठा.",
      hi: "परतों वाला कुरकुरा तंदूरी पराठा।",
    },
    price: 85,
    category: "breads",
    isVeg: true,
    image: "/assets/photos/food/lachha-paratha.webp",
    servingSize: "1 Piece",
  },
  {
    id: "aloo-paratha",
    name: {
      en: "Amritsari Aloo Paratha",
      mr: "अमृतसरी आलू पराठा",
      hi: "अमृतसरी आलू पराठा",
    },
    description: {
      en: "Spiced mashed potato stuffing with roasted cumin, served with homemade pickle and butter.",
      mr: "मसालेदार बटाट्याचे सारण असलेला गरमागरम पराठा, लोणचे आणि बटरसह.",
      hi: "चटपटे आलू के भरावन वाला भरवां पराठा।",
    },
    price: 175,
    category: "breads",
    isVeg: true,
    image: "/assets/photos/food/aloo-paratha.webp",
    servingSize: "1 Large Piece",
  },
  {
    id: "paneer-paratha",
    name: {
      en: "Stuffed Paneer Paratha",
      mr: "पनीर पराठा",
      hi: "पनीर पराठा",
    },
    description: {
      en: "Grated fresh malai paneer with green chillies, coriander, and garam masala.",
      mr: "किसलेल्या ताज्या पनीरने भरलेला रुचकर पराठा.",
      hi: "ताजा कद्दूकस पनीर और मसालों से भरपूर पराठा।",
    },
    price: 195,
    category: "breads",
    isVeg: true,
    image: "/assets/photos/food/paneer-paratha.webp",
    servingSize: "1 Large Piece",
  },

  // CHINESE & SIZZLERS (Verified prices)
  {
    id: "veg-lollipop",
    name: {
      en: "Crispy Veg Lollipop / Gold Finger",
      mr: "व्हेज लॉलीपॉप / गोल्ड फिंगर",
      hi: "वेज लॉलीपॉप / गोल्ड फिंगर",
    },
    description: {
      en: "Crispy breadcrumb-crusted vegetable skewers tossed in garlic-coriander glaze, served with hot schezwan sauce.",
      mr: "कुरकुरीत तळलेले व्हेज लॉलीपॉप आणि झणझणीत शेजवान चटणी.",
      hi: "कुरकुरा क्रिस्पी वेज लॉलीपॉप और तीखी शेजवान सॉस।",
    },
    price: 190,
    category: "chinese",
    isPopular: true,
    isSignature: true,
    isVeg: true,
    image: "/assets/photos/food/veg-lollipop.webp",
    spiceLevel: 2,
    servingSize: "6 Pieces",
  },
  {
    id: "paneer-hot-pan",
    name: {
      en: "Paneer Hot Pan / Chilli Sizzler",
      mr: "पनीर हॉट पॅन / चिली सिझलर",
      hi: "पनीर हॉट पैन / चिली सिज़लर",
    },
    description: {
      en: "Marinated cottage cheese tossed with scallions, capsicum, burnt garlic, and smokey soy served on a smoking cast iron pan.",
      mr: "गरम लोखंडी तव्यावर वाफाळणारे पनीर, शिमला मिरची आणि चिली गार्लिक सॉस.",
      hi: "धुआंधार गर्म लोहे की प्लेट पर परोसा गया स्वादिष्ट चिली पनीर।",
    },
    price: 210,
    category: "chinese",
    isChefSpecial: true,
    isVeg: true,
    image: "/assets/photos/food/paneer-hot-pan.webp",
    spiceLevel: 3,
    servingSize: "Serves 2",
  },

  // BREAKFAST & MORNING TIFFIN (Verified prices)
  {
    id: "puri-bhaji",
    name: {
      en: "Traditional Puri Bhaji",
      mr: "गरमागरम पुरी भाजी",
      hi: "पारंपरिक पूरी भाजी",
    },
    description: {
      en: "Golden puffed whole wheat puris served with tempered potato sabzi, green chilli thecha, and lemon wedge.",
      mr: "फुगलेल्या गरम पुऱ्या, बटाट्याची खमंग पिवळी भाजी आणि लिंबू.",
      hi: "फूली हुई गरमागरम पूरियां, आलू की रसेदार सब्जी और नींबू।",
    },
    price: 160,
    category: "breakfast",
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/puri-bhaji.webp",
    servingSize: "Puris + Bhaji",
  },
  {
    id: "dahi-poha",
    name: {
      en: "Maharashtrian Dahi Poha",
      mr: "दही पोहे (जिरे-मोहरी फोडणी)",
      hi: "दही पोहा",
    },
    description: {
      en: "Beaten rice soaked in chilled creamy yogurt, tempered with green chillies, curry leaves, crunchy peanuts, and fresh pomegranate.",
      mr: "थंडगार ताज्या दह्यात भिजवलेले पोहे, जिरे-मोहरीची खमंग फोडणी आणि डाळिंबाचे दाणे.",
      hi: "ताजे गाढ़े दही में भीगा हुआ पोहा, राई-करी पत्ते का तड़का और मूंगफली।",
    },
    price: 125,
    category: "breakfast",
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/dahi-poha.webp",
    servingSize: "1 Plate",
  },
  {
    id: "upma",
    name: {
      en: "South-Style Semolina Upma",
      mr: "खमंग सांजा / उपमा",
      hi: "स्वादिष्ट उपमा",
    },
    description: {
      en: "Roasted semolina cooked with ghee, mustard seeds, ginger, curry leaves, and crunchy cashews.",
      mr: "शुद्ध तुपात भाजलेला रव्याचा उपमा, काजू आणि खोबऱ्याच्या किसासह.",
      hi: "देसी घी में भुनी सूजी, काजू और करी पत्ते का स्वादिष्ट उपमा।",
    },
    price: 110,
    category: "breakfast",
    isVeg: true,
    image: "/assets/photos/food/upma.webp",
    servingSize: "1 Plate",
  },

  // SOUTH INDIAN DELIGHTS
  {
    id: "masala-dosa",
    name: {
      en: "Crispy Butter Masala Dosa",
      mr: "कुरकुरीत बटर मसाला डोसा",
      hi: "कुरकुरा बटर मसाला डोसा",
    },
    description: {
      en: "Golden crisp fermented rice-lentil crepe smeared with fresh butter, spiced potato masala, and coconut chutney.",
      mr: "बटरने कुरकुरीत केलेला डोसा, बटाट्याची भाजी आणि नारळाची चटणी.",
      hi: "मक्खन में सिका कुरकुरा डोसा, आलू मसाला और नारियल चटनी।",
    },
    price: 130,
    category: "south-indian",
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/puri-bhaji.webp",
    servingSize: "1 Dosa with Sambar",
  },

  // STREET FOOD & SNACKS
  {
    id: "tawa-bhaji-pav",
    name: {
      en: "Special Tawa Bhaji Pav",
      mr: "स्पेशल तवा भाजी पाव",
      hi: "स्पेशल तवा भाजी पाव",
    },
    description: {
      en: "Slow-mashed spiced tomato-potato gravy simmered on a large iron tawa with generous butter, served with two toasted pavs.",
      mr: "मोठ्या तव्यावर घोटलेली भरपूर बटरयुक्त भाजी आणि भाजलेले दोन पाव.",
      hi: "मक्खन से भरपूर तवा भाजी और गरमागरम सिके हुए पाव।",
    },
    price: 160,
    category: "street-food",
    isPopular: true,
    isVeg: true,
    image: "/assets/photos/food/pav-bhaji.webp",
    spiceLevel: 2,
    servingSize: "Plate with 2 Pav",
  },

  // DESSERTS & BEVERAGES (Verified Zomato)
  {
    id: "keshar-jalebi",
    name: {
      en: "Keshar Jalebi",
      mr: "केशर जिलेबी",
      hi: "केसर जलेबी",
    },
    description: {
      en: "Crisp spiral jalebis steeped in pure saffron and cardamom scented sugar syrup.",
      mr: "शुद्ध तुपात तळलेली आणि केशराच्या पाकात मुरलेली कुरकुरीत जिलेबी.",
      hi: "शुद्ध घी में तली और केसर की चाशनी में डूबी कुरकुरी जलेबी।",
    },
    price: 85,
    category: "desserts",
    isPopular: true,
    isVeg: true,
    servingSize: "100g",
  },
  {
    id: "rabadi-malpua",
    name: {
      en: "Rabadi Malpua",
      mr: "रबडी मालपुआ",
      hi: "रबड़ी मालपुआ",
    },
    description: {
      en: "Traditional fried pancakes drenched in sweet syrup and topped with slow-reduced thick saffron rabadi.",
      mr: "मऊ लुसलुशीत मालपुआ आणि वरून दाट केशरी रबडीची मेजवानी.",
      hi: "स्वादिष्ट मालपुआ और ऊपर से गाढ़ी मलाईदार केसरिया रबड़ी।",
    },
    price: 150,
    category: "desserts",
    isChefSpecial: true,
    isVeg: true,
    servingSize: "2 Pieces with Rabadi",
  },
  {
    id: "mango-mastani",
    name: {
      en: "Pune-Style Mango Mastani",
      mr: "पुणेरी मॅन्गो मस्तानी",
      hi: "पुणेरी मैंगो मस्तानी",
    },
    description: {
      en: "Thick Alphonso mango shake topped with vanilla ice cream, dry fruits, and glazed cherries.",
      mr: "घट्ट हापूस आंबा शेक, आईस्क्रीम आणि भरपूर सुकामेवा.",
      hi: "गाढ़ा आम का शेक, आइसक्रीम और सूखे मेवों से भरपूर।",
    },
    price: 170,
    category: "desserts",
    isPopular: true,
    isVeg: true,
    servingSize: "Tall Glass",
  },

  // ACCOMPANIMENTS & SALADS (Verified prices)
  {
    id: "marathwada-thecha",
    name: {
      en: "Marathwada Mirchi Thecha",
      mr: "गावरान हिरवी मिरची ठेचा",
      hi: "मराठवाड़ा मिर्ची ठेचा",
    },
    description: {
      en: "Hand-pounded fiery green chillies and garlic cloves roasted in peanut oil with roasted peanuts and rock salt.",
      mr: "खलबत्त्यात कुटलेली गावरान मिरची, लसूण आणि भाजलेले शेंगदाणे.",
      hi: "ओखली में कुटी तीखी हरी मिर्च, लहसुन और भुनी मूंगफली का ठेचा।",
    },
    price: 60,
    category: "accompaniments",
    isSignature: true,
    isVeg: true,
    image: "/assets/photos/food/thecha.webp",
    spiceLevel: 3,
    servingSize: "Bowl",
  },
  {
    id: "veg-raita",
    name: {
      en: "Chilled Veg Boondi Raita",
      mr: "व्हेज बुंदी रायता",
      hi: "वेज बूंदी रायता",
    },
    description: {
      en: "Whisked curd with diced cucumber, crispy gram flour pearls, roasted cumin, and mint.",
      mr: "थंडगार दही, काकडी, बुंदी आणि भाजलेल्या जिऱ्याची पूड.",
      hi: "ठंडे दही में खीरा, कुरकुरी बूंदी और भुने जीरे का तड़का।",
    },
    price: 170,
    category: "accompaniments",
    isVeg: true,
    image: "/assets/photos/food/raita.webp",
    servingSize: "1 Bowl",
  },
  {
    id: "plain-curd",
    name: {
      en: "Fresh Clay-Pot Curd",
      mr: "मातीच्या मडक्यातील ताजे दही",
      hi: "ताजा मटका दही",
    },
    description: {
      en: "Thick whole milk curd set naturally in an earthen pot.",
      mr: "मातीच्या मडक्यात विरजण लावलेले घट्ट गोडसर दही.",
      hi: "मिटट्टी के बर्तन में जमाया गया गाढ़ा और मीठा दही।",
    },
    price: 60,
    category: "accompaniments",
    isVeg: true,
    image: "/assets/photos/food/curd.webp",
    servingSize: "1 Bowl",
  },
  {
    id: "green-salad",
    name: {
      en: "Farm Fresh Green Salad",
      mr: "फार्म फ्रेश ग्रीन सॅलड",
      hi: "फार्म फ्रेश ग्रीन सलाद",
    },
    description: {
      en: "Crisp sliced cucumber, vine tomatoes, carrots, beetroot, and green chillies with fresh lemon.",
      mr: "काकडी, टोमॅटो, गाजर, बीट आणि लिंबू यांच्या चकत्या.",
      hi: "ताजा ककड़ी, टमाटर, गाजर और चुकंदर का सलाद।",
    },
    price: 105,
    category: "accompaniments",
    isVeg: true,
    image: "/assets/photos/food/salad.webp",
    servingSize: "Full Plate",
  },
];
