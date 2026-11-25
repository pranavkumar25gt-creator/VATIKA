"use client";

import React from "react";
import { Phone, MessageCircle, Navigation, Clock, ShieldCheck, Car, AlertCircle, Star } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Language, translations } from "@/i18n";
import { VegBadge } from "../ui/VegBadge";

interface VisitSectionProps {
  currentLang: Language;
}

export const VisitSection: React.FC<VisitSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT_DATA.coordinates.lat},${RESTAURANT_DATA.coordinates.lng}`;
  const phoneClean = RESTAURANT_DATA.contact.primaryPhone.replace(/\s+/g, "");
  const whatsappUrl = `https://wa.me/${RESTAURANT_DATA.contact.whatsappNumber}?text=${encodeURIComponent(
    "Namaste Hotel Vatika, Parbhani! I would like to inquire about table availability / banquet bookings."
  )}`;

  return (
    <section id="visit" className="relative py-28 md:py-36 bg-[#0D221A] overflow-hidden border-t border-[#F6F1E8]/10">
      {/* JSON-LD Structured Data for Restaurant SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Restaurant",
            name: RESTAURANT_DATA.name,
            image: "https://hotelvatika.in/assets/photos/food/paneer-angara-macro.webp",
            telephone: RESTAURANT_DATA.contact.primaryPhone,
            url: "https://hotelvatika.in",
            priceRange: "₹₹",
            servesCuisine: RESTAURANT_DATA.cuisines,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${RESTAURANT_DATA.address.plot}, ${RESTAURANT_DATA.address.survey}, ${RESTAURANT_DATA.address.landmark}, ${RESTAURANT_DATA.address.road}`,
              addressLocality: RESTAURANT_DATA.address.city,
              addressRegion: RESTAURANT_DATA.address.state,
              postalCode: RESTAURANT_DATA.address.pincode,
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: RESTAURANT_DATA.coordinates.lat,
              longitude: RESTAURANT_DATA.coordinates.lng,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                opens: RESTAURANT_DATA.hours.opensAt,
                closes: RESTAURANT_DATA.hours.closesAt,
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: RESTAURANT_DATA.zomato.rating,
              reviewCount: "3369",
            },
          }),
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#F6F1E8]/10">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-[#CBB079] block mb-1">
              Find Your Way
            </span>
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#CBB079]/80 font-mono mb-2">
              <span>{t.visit.sectionTag}</span>
              <span>—</span>
              <span>PARBHANI • BASMAT ROAD</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#F6F1E8] font-light tracking-[0.02em]">
              {t.visit.title}
            </h2>
          </div>
          <p className="font-sans-clean text-xs md:text-sm text-[#F6F1E8]/60 max-w-sm mt-4 md:mt-0 leading-relaxed">
            {t.visit.subtitle}
          </p>
        </div>

        {/* 2-Column Info & Dark Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Coordinates, Hours, Contact, Valet Notice */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="p-6 bg-[#143328]/80 backdrop-blur-sm rounded-2xl border border-[#CBB079]/20 shadow-lg">
              <span className="text-[10px] tracking-widest text-[#CBB079] font-mono uppercase block mb-1">
                {t.visit.addressHeading}
              </span>
              <h3 className="font-display text-xl text-[#F6F1E8] font-light mb-2">
                Hotel Vatika, Parbhani
              </h3>
              <p className="font-sans-clean text-xs sm:text-sm text-[#F6F1E8]/75 leading-relaxed mb-4">
                {RESTAURANT_DATA.address.fullFormatted}
              </p>
              <div className="text-[11px] font-mono text-[#F6F1E8]/40">
                GPS: {RESTAURANT_DATA.coordinates.lat}, {RESTAURANT_DATA.coordinates.lng}
              </div>
            </div>

            {/* Service Hours & Kitchen Schedule */}
            <div className="p-6 bg-[#143328]/80 backdrop-blur-sm rounded-2xl border border-[#CBB079]/20 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-widest text-[#CBB079] font-mono uppercase">
                  {t.visit.hoursHeading}
                </span>
                {RESTAURANT_DATA.hours.hoursStatus === "TODO_CONFIRM" && (
                  <span className="text-[9px] font-mono text-[#CBB079] bg-[#CBB079]/10 px-2.5 py-0.5 rounded-full border border-[#CBB079]/30 uppercase">
                    TODO Confirm with owner
                  </span>
                )}
              </div>
              <p className="font-display text-xl text-[#F6F1E8] mb-1">
                {RESTAURANT_DATA.hours.schedule}
              </p>
              <p className="font-sans-clean text-xs text-[#F6F1E8]/60 leading-relaxed">
                {t.visit.hoursNotice}
              </p>
            </div>

            {/* Parking & Reservation Policies */}
            <div className="p-6 bg-[#143328]/80 backdrop-blur-sm rounded-2xl border border-[#CBB079]/20 space-y-3 shadow-lg">
              <div className="flex items-center space-x-2 text-xs text-[#F6F1E8]/80">
                <Car className="w-4 h-4 text-[#CBB079] shrink-0" />
                <span>Complimentary Valet Parking available on Basmat Highway front.</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#F6F1E8]/80">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
                <span>Table reservations strongly recommended for weekend dinners &amp; family celebrations.</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-[#F6F1E8]/80">
                <VegBadge size="sm" />
                <span>Vegetarian kitchen with separate utensils and fresh morning deliveries.</span>
              </div>
            </div>

            {/* Direct Action Grid (Call, WhatsApp, Directions) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${phoneClean}`}
                className="flex items-center justify-center space-x-2 bg-[#CBB079] hover:bg-[#E2CD9A] text-[#0D221A] py-3.5 px-3 rounded-full text-xs tracking-wider uppercase font-semibold transition-all shadow-lg font-mono"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20ba59] text-black py-3.5 px-3 rounded-full text-xs tracking-wider uppercase font-semibold transition-all shadow-lg font-mono"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 border border-[#F6F1E8]/20 hover:border-[#CBB079] bg-[#143328] hover:bg-[#183C2F] text-[#F6F1E8] py-3.5 px-3 rounded-full text-xs tracking-wider uppercase font-mono transition-all"
              >
                <Navigation className="w-3.5 h-3.5 text-[#CBB079]" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dark Styled Interactive Map Embed */}
          <div className="lg:col-span-7 bg-[#143328] rounded-2xl border border-[#CBB079]/25 overflow-hidden shadow-2xl relative min-h-[440px] flex flex-col justify-between">
            {/* Dark Styled Google Maps Embed with exact coordinates */}
            <div className="relative w-full h-full min-h-[440px]">
              <iframe
                title="Hotel Vatika Parbhani Location Map"
                src={`https://maps.google.com/maps?q=${RESTAURANT_DATA.coordinates.lat},${RESTAURANT_DATA.coordinates.lng}&hl=en&z=15&output=embed`}
                width="100%"
                height="100%"
                className="w-full h-full border-0 filter invert-[0.9] hue-rotate-[160deg] contrast-[1.15] brightness-[0.85]"
                loading="lazy"
                aria-label="Map showing Hotel Vatika location on Basmat Road Parbhani"
              />

              {/* Highway Landmark Marker Card */}
              <div className="absolute top-4 left-4 bg-[#0D221A]/95 backdrop-blur-md rounded-xl border border-[#CBB079]/40 p-4 max-w-xs shadow-2xl">
                <div className="text-[10px] font-mono tracking-widest text-[#CBB079] uppercase mb-0.5">
                  HIGHWAY LANDMARK
                </div>
                <h4 className="font-display text-lg text-[#F6F1E8] font-light">
                  Near MIDC • Basmat Road NH22
                </h4>
                <p className="text-[11px] text-[#F6F1E8]/60 mt-1">
                  Plot 10, Sr 37/38, Parbhani 431402
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-[11px] text-[#CBB079] hover:text-[#E2CD9A] font-mono mt-2"
                >
                  <span>Open in Google Maps App →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
