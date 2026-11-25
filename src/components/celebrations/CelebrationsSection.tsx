"use client";

import React, { useState } from "react";
import { Users, Calendar, Check, Send, Sparkles, MessageCircle } from "lucide-react";
import { EVENT_CATEGORIES, EventType, buildWhatsAppEventUrl } from "@/data/celebrations";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Language, translations } from "@/i18n";
import { DevPhotoBadge } from "../ui/DevPhotoBadge";

interface CelebrationsSectionProps {
  currentLang: Language;
}

export const CelebrationsSection: React.FC<CelebrationsSectionProps> = ({ currentLang }) => {
  const [selectedEventType, setSelectedEventType] = useState<EventType>("birthday");
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [eventNotes, setEventNotes] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = translations[currentLang];
  const activeEvent = EVENT_CATEGORIES.find((e) => e.id === selectedEventType) || EVENT_CATEGORIES[0];

  const handleLaunchWhatsApp = () => {
    const url = buildWhatsAppEventUrl({
      eventType: activeEvent.title[currentLang] || activeEvent.title.en,
      date: eventDate,
      guestCount,
      notes: eventNotes,
      contactNumber: RESTAURANT_DATA.contact.whatsappNumber,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="celebrations" className="relative py-28 md:py-36 bg-[#102820] overflow-hidden border-t border-[#F6F1E8]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#F6F1E8]/10">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-[#CBB079] block mb-1">
              Banquets &amp; Gatherings
            </span>
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#CBB079]/80 font-mono mb-2">
              <span>{t.celebrations.sectionTag}</span>
              <span>—</span>
              <span>TIMELESS HOSPITALITY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#F6F1E8] font-light tracking-[0.02em] leading-tight max-w-2xl">
              {t.celebrations.title}
            </h2>
          </div>
          <p className="font-sans-clean text-xs md:text-sm text-[#F6F1E8]/60 max-w-md mt-4 md:mt-0 leading-relaxed">
            {t.celebrations.subtitle}
          </p>
        </div>

        {/* Event Type Selector Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {EVENT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedEventType(cat.id)}
              className={`px-4 py-2 whitespace-nowrap rounded-full border text-xs tracking-wider uppercase font-mono transition-all ${
                selectedEventType === cat.id
                  ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-semibold"
                  : "border-[#F6F1E8]/15 bg-[#143328]/60 text-[#F6F1E8]/70 hover:text-[#F6F1E8] hover:border-[#CBB079]/30"
              }`}
            >
              {cat.title[currentLang]}
            </button>
          ))}
        </div>

        {/* Main Event Feature Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Hall Photo Showcase (16:10 Aspect Ratio) */}
          <div className="lg:col-span-7 relative bg-[#143328] rounded-2xl border border-[#CBB079]/20 overflow-hidden shadow-2xl min-h-[380px] flex items-center">
            <DevPhotoBadge category="hall celebration" label={activeEvent.id.toUpperCase()} />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeEvent.photo}
              src={activeEvent.photo}
              alt={activeEvent.title[currentLang]}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0D221A] via-transparent to-transparent opacity-85" />

            {/* Overlay Notice: Strictly "Ask Us" for capacity as mandated */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs">
              <div className="bg-[#0D221A]/90 backdrop-blur-sm border border-[#CBB079]/40 px-4 py-1.5 rounded-full text-[11px] text-[#F6F1E8] font-mono">
                {activeEvent.capacityText[currentLang]}
              </div>
            </div>
          </div>

          {/* Hall Features & Direct WhatsApp Event Planner Form */}
          <div className="lg:col-span-5 bg-[#143328]/85 backdrop-blur-md rounded-2xl border border-[#CBB079]/20 p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-[10px] tracking-[0.25em] text-[#CBB079] font-mono uppercase mb-1">
                OCCASION CURATION
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-[#F6F1E8] font-light mb-2">
                {activeEvent.title[currentLang]}
              </h3>
              <p className="font-sans-clean text-xs sm:text-sm text-[#F6F1E8]/70 leading-relaxed mb-6">
                {activeEvent.description[currentLang]}
              </p>

              {/* Verified Included Services */}
              <div className="space-y-2.5 mb-8">
                <span className="text-[10px] tracking-widest text-[#CBB079] font-mono uppercase block mb-1">
                  Key Amenities Included:
                </span>
                {activeEvent.features[currentLang].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-[#F6F1E8]/80">
                    <Check className="w-3.5 h-3.5 text-[#CBB079] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Enquiry Form (Opens pre-filled WhatsApp directly) */}
            <div className="pt-6 border-t border-[#F6F1E8]/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[10px] tracking-wider text-[#F6F1E8]/50 font-mono uppercase mb-1">
                    {t.celebrations.dateLabel}
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full bg-[#102820] border border-[#F6F1E8]/15 text-[#F6F1E8] px-3.5 py-2.5 rounded-lg text-xs focus:border-[#CBB079] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] tracking-wider text-[#F6F1E8]/50 font-mono uppercase mb-1">
                    {t.celebrations.guestsLabel}
                  </label>
                  <input
                    type="text"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    placeholder="e.g. 50 - 100 Guests"
                    className="w-full bg-[#102820] border border-[#F6F1E8]/15 text-[#F6F1E8] px-3.5 py-2.5 rounded-lg text-xs focus:border-[#CBB079] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] tracking-wider text-[#F6F1E8]/50 font-mono uppercase mb-1">
                  {t.celebrations.notesLabel}
                </label>
                <input
                  type="text"
                  value={eventNotes}
                  onChange={(e) => setEventNotes(e.target.value)}
                  placeholder="e.g. Pure veg buffet, birthday cake table, AC hall"
                  className="w-full bg-[#102820] border border-[#F6F1E8]/15 text-[#F6F1E8] px-3.5 py-2.5 rounded-lg text-xs focus:border-[#CBB079] focus:outline-none"
                />
              </div>

              <button
                onClick={handleLaunchWhatsApp}
                className="w-full bg-[#CBB079] hover:bg-[#E2CD9A] text-[#0D221A] py-3.5 px-4 rounded-full flex items-center justify-center space-x-2 text-xs tracking-[0.16em] uppercase font-semibold transition-all shadow-xl font-mono"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.celebrations.submitWhatsApp}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
