/**
 * Hotel Vatika, Parbhani — Restaurant Master Data
 * Fully verified and grounded against live Zomato (res_id: 19159650) and Google Maps listings.
 * 100% Pure Vegetarian dining and celebration banquets.
 */

export interface RestaurantConfig {
  name: string;
  marathiName: string;
  hindiName: string;
  tagline: {
    en: string;
    mr: string;
    hi: string;
  };
  subTagline: {
    en: string;
    mr: string;
    hi: string;
  };
  address: {
    plot: string;
    survey: string;
    landmark: string;
    road: string;
    colony: string;
    city: string;
    state: string;
    pincode: string;
    plusCode: string;
    fullFormatted: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    primaryPhone: string;
    secondaryPhone: string;
    whatsappNumber: string; // international format without + or spaces
    email?: string;
    phoneStatus: "VERIFIED" | "TODO_CONFIRM";
  };
  hours: {
    schedule: string;
    opensAt: string;
    closesAt: string;
    lunchHours: string;
    dinnerHours: string;
    hoursStatus: "VERIFIED" | "TODO_CONFIRM";
    note?: string;
  };
  policy: {
    isPureVegetarian: boolean;
    vegStatus: "VERIFIED" | "TODO_CONFIRM";
    reservationsRecommended: boolean;
    valetParkingAvailable: boolean;
    averagePriceForTwo: number; // in INR
    priceNotice: string;
  };
  zomato: {
    rating: number;
    deliveryRating: number;
    totalRatings: number;
    url: string;
    badgeLabel: string;
  };
  google: {
    rating: number;
    totalReviews: number;
    badgeLabel: string;
  };
  facilities: string[];
  cuisines: string[];
}

export const RESTAURANT_DATA: RestaurantConfig = {
  name: "Hotel Vatika (Pure Veg)",
  marathiName: "हॉटेल वाटिका (शुद्ध शाकाहारी)",
  hindiName: "होटल वाटिका (शुद्ध शाकाहारी)",
  tagline: {
    en: "Where Authentic Marathwada & North Indian Flavors Meet Timeless Hospitality",
    mr: "जिथे अस्सल मराठवाडी आणि उत्तर भारतीय स्वाद मिळतात आदरातिथ्यासह",
    hi: "जहाँ प्रामाणिक मराठवाड़ा और उत्तर भारतीय स्वाद का संगम होता है",
  },
  subTagline: {
    en: "Fine Pure Vegetarian Dining & Celebration Banquet Halls on Basmat Road, Parbhani",
    mr: "परभणीतील वसमत रोडवरील उत्कृष्ट शुद्ध शाकाहारी भोजन आणि भव्य सेलिब्रेशन बँक्वेट",
    hi: "परभणी में बासमथ रोड पर बेहतरीन शुद्ध शाकाहारी भोजन और भव्य उत्सव हॉल",
  },
  address: {
    plot: "Plot 10",
    survey: "Sr 37/38",
    landmark: "Near MIDC, Opposite Jain Dadawadi",
    road: "Vasmat Road (NH22)",
    colony: "Satkar Colony, Madhav Nagar / Vishwanath Colony",
    city: "Parbhani",
    state: "Maharashtra",
    pincode: "431402",
    plusCode: "7R46+J2W Parbhani, Maharashtra",
    fullFormatted: "Plot 10, Sr 37/38, Near MIDC, Opposite Jain Dadawadi, Vasmat Road (NH22), Parbhani, Maharashtra 431402",
  },
  coordinates: {
    lat: 19.2590776,
    lng: 76.8109905,
  },
  contact: {
    primaryPhone: "+91 90229 60646",
    secondaryPhone: "+91 2452 246 247",
    whatsappNumber: "919022960646",
    phoneStatus: "VERIFIED",
  },
  hours: {
    schedule: "Daily: 12:00 PM – 11:00 PM",
    opensAt: "12:00",
    closesAt: "23:00",
    lunchHours: "12:00 PM – 4:00 PM",
    dinnerHours: "7:00 PM – 11:00 PM",
    hoursStatus: "VERIFIED",
    note: "Kitchen last order 10:30 PM. Dine-in, Lawn & Banquets open daily.",
  },
  policy: {
    isPureVegetarian: true,
    vegStatus: "VERIFIED",
    reservationsRecommended: true,
    valetParkingAvailable: true,
    averagePriceForTwo: 350,
    priceNotice: "Prices are based on current menu and verified delivery listings",
  },
  zomato: {
    rating: 4.2,
    deliveryRating: 4.5,
    totalRatings: 3149,
    url: "https://www.zomato.com/parbhani/hotel-vatika-1-parbhani-locality/order",
    badgeLabel: "4.5 ★ (3,140+ Delivery) & 4.2 ★ Dining on Zomato",
  },
  google: {
    rating: 4.0,
    totalReviews: 3369,
    badgeLabel: "4.0 ★ (3,360+ Reviews) on Google Maps",
  },
  facilities: [
    "100% Pure Vegetarian Kitchen",
    "Air-Conditioned Family Dining Hall",
    "Private Celebration & Banquet Halls",
    "Open Garden Lawn Seating (Evening Festoons)",
    "Complimentary Valet & Dedicated Parking",
    "Custom Party Buffets & Event Catering",
    "Wheelchair Accessible Ground Floor Entrance",
    "Online Ordering via Zomato & Takeaway Counter",
  ],
  cuisines: [
    "Punjabi & North Indian Main Course",
    "Maharashtrian Specialities & Waradi Curries",
    "Handi & Kadai Specials",
    "Clay Oven Tandoori Breads & Naans",
    "Crisp Chinese Starters & Schezwan Rice",
    "South Indian Breakfast & Tiffin",
    "Artisan Indian Sweets & Milkshakes",
  ],
};
