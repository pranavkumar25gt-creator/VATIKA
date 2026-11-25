/**
 * Hotel Vatika — Celebrations & Party Halls Dataset
 * Strict client rule: Never invent capacities; show "Ask us" unless provided in config.
 * Includes dynamic WhatsApp event planner message builder.
 */

export type EventType =
  | "birthday"
  | "anniversary"
  | "kitty-party"
  | "corporate"
  | "engagement"
  | "other";

export interface EventCategoryConfig {
  id: EventType;
  title: {
    en: string;
    mr: string;
    hi: string;
  };
  subtitle: {
    en: string;
    mr: string;
    hi: string;
  };
  description: {
    en: string;
    mr: string;
    hi: string;
  };
  photo: string;
  capacityText: {
    en: string;
    mr: string;
    hi: string;
  };
  features: {
    en: string[];
    mr: string[];
    hi: string[];
  };
}

export const EVENT_CATEGORIES: EventCategoryConfig[] = [
  {
    id: "birthday",
    title: {
      en: "Milestone Birthdays",
      mr: "वाढदिवस सोहळा",
      hi: "जन्मदिन समारोह",
    },
    subtitle: {
      en: "Joyous gatherings, celebratory dining, and customized decor",
      mr: "आनंददायी क्षण, खास भोजनाची सोय आणि आकर्षक सजावट",
      hi: "खुशियों भरी महफिल, स्वादिष्ट भोजन और मनपसंद सजावट",
    },
    description: {
      en: "From kids' theme celebrations to 50th jubilee milestones, our air-conditioned party halls provide the warmth and hospitality your family deserves.",
      mr: "लहान मुलांच्या थीम पार्टीपासून ते ज्येष्ठ सदस्यांच्या सुवर्ण महोत्सवापर्यंत, सर्व वाढदिवसांसाठी प्रशस्त हॉल.",
      hi: "बच्चों की थीम पार्टी से लेकर 50वीं वर्षगांठ तक, हर जश्न के लिए हमारा एसी बैंक्वेट हॉल तैयार है।",
    },
    photo: "/assets/photos/hall/birthday-setup.webp",
    capacityText: {
      en: "Seating Capacity: Ask us (Tailored to your guest count)",
      mr: "बैठक क्षमता: आम्हाला विचारा (तुमच्या पाहुण्यांच्या संख्येनुसार)",
      hi: "बैठक क्षमता: हमसे पूछें (आपकी अतिथि संख्या के अनुसार)",
    },
    features: {
      en: ["Custom Pure Veg Buffet Menu", "Flexible Stage & Lighting", "Valet Parking For All Guests", "Music & Audio Support"],
      mr: ["खास शाकाहारी बुफे मेनू", "स्टेज आणि प्रकाश योजना", "पाहुण्यांसाठी व्हॅले पार्किंग", "साऊंड सिस्टीम व्यवस्था"],
      hi: ["विशेष शाकाहारी बुफे मेनू", "स्टेज और प्रकाश व्यवस्था", "सभी मेहमानों के लिए वैले पार्किंग", "साउंड सिस्टम सुविधा"],
    },
  },
  {
    id: "anniversary",
    title: {
      en: "Wedding Anniversaries",
      mr: "लग्न वाढदिवस / वर्धापनदिन",
      hi: "विवाह वर्षगांठ",
    },
    subtitle: {
      en: "An evening of nostalgia, fine dining, and golden memories",
      mr: "सुखद आठवणी, उत्तम जेवण आणि आपुलकीचे वातावरण",
      hi: "यादों भरी शाम, शानदार भोजन और आत्मीय माहौल",
    },
    description: {
      en: "Celebrate years of togetherness in an intimate, dignified setting with exquisite Punjabi gravies, clay-oven tandoor breads, and attentive table service.",
      mr: "कुटुंब आणि मित्रपरिवारासह सहजीवनाचा आनंद साजरा करण्यासाठी शांत आणि प्रसन्न वातावरण.",
      hi: "परिवार और मित्रों के साथ वैवाहिक सफर का जश्न मनाने के लिए सुरुचिपूर्ण हॉल।",
    },
    photo: "/assets/photos/hall/banquet-hall-stage.webp",
    capacityText: {
      en: "Seating Capacity: Ask us (Tailored to your guest count)",
      mr: "बैठक क्षमता: आम्हाला विचारा (तुमच्या पाहुण्यांच्या संख्येनुसार)",
      hi: "बैठक क्षमता: हमसे पूछें (आपकी अतिथि संख्या के अनुसार)",
    },
    features: {
      en: ["Personalized Table Layouts", "Signature Welcome Drinks", "Multi-Course Family Feast", "Dedicated Event Captain"],
      mr: ["स्वतंत्र बैठक व्यवस्था", "स्वागत पेये", "विविध पदार्थांची मेजवानी", "समर्पित इव्हेंट कॅप्टन"],
      hi: ["विशेष बैठक व्यवस्था", "स्वागत पेय", "शाही भोजन थाली/बुफे", "समर्पित इवेंट कैप्टन"],
    },
  },
  {
    id: "kitty-party",
    title: {
      en: "Kitty Parties & Socials",
      mr: "किट्टी पार्टी व स्नेहसंमेलन",
      hi: "किट्टी पार्टी और मित्र मिलन",
    },
    subtitle: {
      en: "Private, cheerful, and filled with delicious starters & chaats",
      mr: "शांत प्रायव्हेट जागा, मनसोक्त गप्पा आणि चवदार स्टार्टर्स",
      hi: "प्राइवेट हॉल, हंसी-मजाक और लजीज स्टार्टर्स व चाट",
    },
    description: {
      en: "Afternoons made memorable with hot sizzlers, crispy veg lollipops, tawa bhaji, dahi pohe, and refreshing beverages in a comfortable private dining enclosure.",
      mr: "दुपारच्या किट्टी पार्टीसाठी मनपसंत चायनीज स्टार्टर्स, चाट आणि थंडगार पेयांची रेलचेल.",
      hi: "दोपहर की किट्टी पार्टी के लिए गर्मागर्म सिज़लर्स, चाट और ठंडे पेय पदार्थों का लुत्फ उठाएं।",
    },
    photo: "/assets/photos/hall/kitty-party-setup.webp",
    capacityText: {
      en: "Seating Capacity: Ask us (Flexible private zone)",
      mr: "बैठक क्षमता: आम्हाला विचारा (स्वतंत्र जागा)",
      hi: "बैठक क्षमता: हमसे पूछें (लचीली व्यवस्था)",
    },
    features: {
      en: ["High-Tea & Starter Combos", "Private Air-Conditioned Section", "Flexible Seating Arrangements", "Hassle-Free Booking"],
      mr: ["हाय-टी व स्टार्टर कॉम्बो", "स्वतंत्र एसी हॉल", "मनपसंत बैठक रचना", "सुलभ बुकिंग"],
      hi: ["हाई-टी व स्टार्टर कॉम्बो", "अलग एसी हॉल", "आरामदायक बैठक", "आसान बुकिंग"],
    },
  },
  {
    id: "corporate",
    title: {
      en: "Corporate & Business Dinners",
      mr: "कॉर्पोरेट व व्यापारी स्नेहभोजन",
      hi: "कॉर्पोरेट और व्यापारिक बैठकें",
    },
    subtitle: {
      en: "Professional ambiance, swift service, and refined catering",
      mr: "शांत व्यावसायिक वातावरण, तत्पर सेवा आणि दर्जेदार जेवण",
      hi: "व्यावसायिक माहौल, त्वरित सेवा और गुणवत्तापूर्ण भोजन",
    },
    description: {
      en: "Located conveniently on Basmat Road near MIDC Parbhani, Hotel Vatika is the premier destination for executive team dinners, dealer meets, and corporate celebrations.",
      mr: "वसमत रोड, एमआयडीसी परभणीजवळ मोक्याचे ठिकाण. व्यापारी बैठका आणि कंपनीच्या स्नेहभोजनासाठी उत्तम.",
      hi: "बासमथ रोड एमआईडीसी के पास स्थित। व्यापारिक बैठकों और कंपनी डिनर के लिए उत्तम स्थान।",
    },
    photo: "/assets/photos/interior/main-dining-hall.webp",
    capacityText: {
      en: "Seating Capacity: Ask us (Custom business setup)",
      mr: "बैठक क्षमता: आम्हाला विचारा (व्यावसायिक गरजेनुसार)",
      hi: "बैठक क्षमता: हमसे पूछें (व्यावसायिक आवश्यकतानुसार)",
    },
    features: {
      en: ["Convenient Highway & MIDC Access", "Prompt Executive Buffets", "Invoice & Corporate Billing", "Ample Parking Space"],
      mr: ["हायवे व एमआयडीसीजवळ सहज पोहोच", "एक्झिक्युटिव्ह बुफे भोजन", "जीएसटी बिलिंग सुविधा", "विशाल पार्किंग"],
      hi: ["हाईवे और एमआईडीसी के नजदीक", "त्वरित बुफे सेवा", "जीएसटी बिलिंग", "विशाल पार्किंग"],
    },
  },
  {
    id: "engagement",
    title: {
      en: "Engagements & Family Functions",
      mr: "साखरपुडा व कौटुंबिक सोहळे",
      hi: "सगाई और मांगलिक कार्य",
    },
    subtitle: {
      en: "Dignified celebrations blessed with tradition and royal hospitality",
      mr: "पारंपारिक गोडवा, आप्तस्वकीयांची उपस्थिती आणि आदरातिथ्य",
      hi: "पारंपरिक रीति-रिवाज, अपनों का साथ और उत्कृष्ट मेजबानी",
    },
    description: {
      en: "Host your auspicious engagement, naming ceremony, or family gathering with peace of mind. Our experienced culinary staff curates a lavish pure vegetarian feast.",
      mr: "साखरपुडा, बारसे, किंवा इतर सर्व मंगल कार्यांसाठी उत्कृष्ट आणि विश्वासार्ह ठिकाण.",
      hi: "सगाई, नामकरण या किसी भी पारिवारिक मांगलिक कार्य के लिए भरोसेमंद और भव्य स्थल।",
    },
    photo: "/assets/photos/hall/banquet-hall-stage.webp",
    capacityText: {
      en: "Seating Capacity: Ask us (Hall selection based on attendees)",
      mr: "बैठक क्षमता: आम्हाला विचारा (पाहुण्यांच्या संख्येनुसार हॉल निवड)",
      hi: "बैठक क्षमता: हमसे पूछें (उपस्थिति के अनुसार हॉल चयन)",
    },
    features: {
      en: ["Auspicious Pure Veg Feasts", "Dedicated Mandap/Stage Area", "Pre-Event Tasting Available", "Direct Front Desk Coordination"],
      mr: ["अस्सल शाकाहारी जेवण", "स्वतंत्र स्टेज/मंडप जागा", "मेनू टेस्टिंग सुविधा", "थेट व्यवस्थापक संपर्क"],
      hi: ["शुद्ध शाकाहारी भोजन", "स्टेज/मंडप के लिए विशेष स्थान", "मेनू टेस्टिंग सुविधा", "मैनेजर द्वारा सीधी देखरेख"],
    },
  },
  {
    id: "other",
    title: {
      en: "Custom Gatherings & Get-Togethers",
      mr: "इतर मेळावे व स्नेहसंमेलन",
      hi: "अन्य उत्सव और समारोह",
    },
    subtitle: {
      en: "Tell us your vision, and we will tailor the feast and space for you",
      mr: "तुमची कल्पना सांगा, त्यानुसार भोजन आणि जागेचे नियोजन करू",
      hi: "अपनी आवश्यकता बताएं, हम भोजन और व्यवस्था उसी अनुसार तैयार करेंगे",
    },
    description: {
      en: "School reunions, retirement celebrations, festive gatherings—our team adapts the hall layout and customized menu to match your precise preferences.",
      mr: "मित्र मेळावे, सेवानिवृत्ती सत्कार सोहळा आणि सण-उत्सवासाठी खास नियोजन.",
      hi: "मित्र मिलन, सेवानिवृत्ति समारोह या त्योहारों के उत्सव के लिए अनुकूलित व्यवस्था।",
    },
    photo: "/assets/photos/exterior/facade-twilight.webp",
    capacityText: {
      en: "Seating Capacity: Ask us (Customized to event scale)",
      mr: "बैठक क्षमता: आम्हाला विचारा (सोहळ्याच्या स्वरूपानुसार)",
      hi: "बैठक क्षमता: हमसे पूछें (समारोह के अनुसार)",
    },
    features: {
      en: ["Tailored Dish Selection", "Flexible Duration", "Dedicated Service Staff", "Hassle-Free Coordination"],
      mr: ["मनपसंत पदार्थांची निवड", "वेळेची लवचिकता", "तत्पर कर्मचारी वर्ग", "सुगम समन्वय"],
      hi: ["मनपसंद व्यंजन चयन", "समय की सुविधा", "समर्पित स्टाफ", "सरल समन्वय"],
    },
  },
];

/**
 * Builds an authentic, pre-filled WhatsApp message URL
 */
export function buildWhatsAppEventUrl(params: {
  eventType: string;
  date: string;
  guestCount: string;
  notes?: string;
  contactNumber: string;
}): string {
  const text = `Namaste Hotel Vatika, Parbhani!
I would like to plan an event at your banquet hall:
• Occasion: ${params.eventType}
• Proposed Date: ${params.date || "To be decided"}
• Expected Guests: ${params.guestCount || "To be discussed"}
• Special Requests: ${params.notes ? params.notes : "None"}

Please share available hall options, menu packages, and pricing. Thank you!`;

  return `https://wa.me/${params.contactNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Builds a pre-filled WhatsApp message URL for menu pre-orders or enquiries
 */
export function buildWhatsAppMenuEnquiryUrl(params: {
  items: Array<{ name: string; quantity: number; price: number }>;
  contactNumber: string;
  guestName?: string;
  diningType: "dine-in" | "takeaway" | "party";
  date?: string;
  notes?: string;
}): string {
  const itemLines = params.items
    .map((item, idx) => `${idx + 1}. ${item.name} × ${item.quantity} (₹${item.price * item.quantity})`)
    .join("\n");

  const total = params.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const text = `Namaste Hotel Vatika, Parbhani!
I would like to enquire / pre-order the following items (${params.diningType.toUpperCase()}):

${itemLines}

Estimated Item Total: ₹${total}
${params.guestName ? `Name: ${params.guestName}\n` : ""}${params.date ? `Date/Time: ${params.date}\n` : ""}${params.notes ? `Note: ${params.notes}\n` : ""}
Please confirm item availability and preparation time. Thank you!`;

  return `https://wa.me/${params.contactNumber}?text=${encodeURIComponent(text)}`;
}
