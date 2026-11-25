"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Sparkles, ChevronRight } from "lucide-react";
import { Language, translations } from "@/i18n";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { DevPhotoBadge } from "../ui/DevPhotoBadge";

interface ThePlaceWalkthroughProps {
  currentLang: Language;
}

interface PlaceFrame {
  id: string;
  tag: string;
  title: { en: string; mr: string; hi: string };
  narrative: { en: string; mr: string; hi: string };
  image: string;
  depthImage?: string;
  locationDetails: string;
}

const FRAMES: PlaceFrame[] = [
  {
    id: "facade",
    tag: "01 • THE HIGHWAY ARRIVAL",
    title: {
      en: "Basmat Road Gateway",
      mr: "वसमत हायवे प्रवेशद्वार",
      hi: "बासमथ रोड मुख्य प्रवेश",
    },
    narrative: {
      en: "Located conveniently along the Basmat Highway (NH22) near MIDC Parbhani, Hotel Vatika emerges as a luminous haven for hungry travelers and gathering families.",
      mr: "वसमत हायवेवर (NH22) एमआयडीसीजवळ स्थित, दूरवरून येणारे प्रवासी आणि परभणीकरांसाठी एक आत्मीय व शांत ठिकाण.",
      hi: "बासमथ हाईवे पर एमआईडीसी के समीप स्थित होटल वाटिका दूर-दराज से आने वाले यात्रियों और स्थानीय परिवारों का स्वागत करता है।",
    },
    image: "/assets/photos/exterior/facade-twilight.webp",
    depthImage: "/assets/photos/exterior/facade-twilight-depth.webp",
    locationDetails: "Plot 10, Sr 37/38, Near MIDC • Basmat Road",
  },
  {
    id: "entrance",
    tag: "02 • THE GREETING",
    title: {
      en: "Lantern Lit Warmth & Valet",
      mr: "दिव्यांची मंद रोषणाई व व्हॅले",
      hi: "दीपकों की शांत रोशनी और वैले",
    },
    narrative: {
      en: "From the moment you step onto our stone porch, the evening rush dissolves. Complimentary valet parking ensures your family's arrival is completely effortless.",
      mr: "शांत स्वागत मार्ग आणि मोफत व्हॅले पार्किंग सुविधा. वाहनाची चिंता न करता भोजनाचा आनंद घेण्यासाठी सज्ज व्हा.",
      hi: "सुगम वैले पार्किंग और दीपकों की शांत रोशनी के साथ आपका स्वागत, जहाँ से शांति और स्वाद का सफर शुरू होता है।",
    },
    image: "/assets/photos/exterior/entrance-warm.webp",
    locationDetails: "Complimentary Valet Parking • Wide Highway Entrance",
  },
  {
    id: "dining-hall",
    tag: "03 • THE SANCTUARY",
    title: {
      en: "Air-Conditioned Family Dining",
      mr: "प्रशस्त वातानुकूलित डायनिंग हॉल",
      hi: "भव्य वातानुकूलित डाइनिंग हॉल",
    },
    narrative: {
      en: "Subdued tungsten pendant lights, generous distances between handcrafted teak tables, and the comforting clatter of hammered brass handis create an unhurried, royal dining atmosphere.",
      mr: "उबदार प्रकाश, शांत बसण्याची व्यवस्था आणि पितळी भांड्यांचा सोनेरी खणखणाट. शांतपणे भोजनाचा आस्वाद घेण्यासाठी परिपूर्ण.",
      hi: "शांत रोशनी, सागौन की मेजें और पीतल के बर्तनों की सुगंधित चमक। परिवार के साथ इत्मीनान से भोजन करने का अनुभव।",
    },
    image: "/assets/photos/interior/main-dining-hall.webp",
    depthImage: "/assets/photos/interior/main-dining-hall-depth.webp",
    locationDetails: "Capacity: 120+ Seats • Pure Veg Family Atmosphere",
  },
];

export const ThePlaceWalkthrough: React.FC<ThePlaceWalkthroughProps> = ({ currentLang }) => {
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const t = translations[currentLang];
  const activeFrame = FRAMES[activeFrameIndex];

  return (
    <section id="the-place" className="relative py-28 md:py-36 bg-[#0D221A] overflow-hidden border-t border-[#F6F1E8]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#F6F1E8]/10">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-[#CBB079] block mb-1">
              Sanctuary &amp; Space
            </span>
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#CBB079]/80 font-mono mb-2">
              <span>{t.place.sectionTag}</span>
              <span>—</span>
              <span>ARCHITECTURAL CINEMA</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#F6F1E8] font-light tracking-[0.02em] leading-tight max-w-2xl">
              {t.place.title}
            </h2>
          </div>
          <p className="font-sans-clean text-xs md:text-sm text-[#F6F1E8]/60 max-w-md mt-4 md:mt-0 leading-relaxed">
            {t.place.subtitle}
          </p>
        </div>

        {/* Walk-through Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Visual Display (Large Editorial 16:9 Photographic Frame) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#143328] border border-[#CBB079]/20 shadow-2xl group">
            <DevPhotoBadge category="interior / exterior" label={activeFrame.id.toUpperCase()} />

            {/* Photographic Image with smooth crossfade */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={activeFrame.image}
              src={activeFrame.image}
              alt={activeFrame.title[currentLang]}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D221A] via-[#0D221A]/20 to-transparent opacity-85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D221A]/60 via-transparent to-transparent" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-[#F6F1E8]/80">
              <div className="flex items-center space-x-2 bg-[#0D221A]/90 backdrop-blur-sm border border-[#CBB079]/30 px-3.5 py-1.5 rounded-full text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#CBB079]" />
                <span className="font-mono text-[#F6F1E8]">{activeFrame.locationDetails}</span>
              </div>
              <span className="text-[10px] tracking-widest text-[#CBB079] uppercase font-mono">
                {activeFrameIndex + 1} OF {FRAMES.length}
              </span>
            </div>
          </div>

          {/* Interactive Frame Navigator & Story Text */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            <div className="space-y-4">
              <div className="space-y-2.5">
                {FRAMES.map((frame, idx) => (
                  <button
                    key={frame.id}
                    onClick={() => setActiveFrameIndex(idx)}
                    className={`w-full text-left p-4.5 rounded-xl transition-all duration-300 border flex items-center justify-between group ${
                      activeFrameIndex === idx
                        ? "bg-[#183C2F] border-[#CBB079] text-[#F6F1E8] shadow-lg"
                        : "bg-[#143328]/70 border-[#F6F1E8]/10 text-[#F6F1E8]/60 hover:text-[#F6F1E8] hover:border-[#CBB079]/40"
                    }`}
                  >
                    <div>
                      <div className="text-[10px] tracking-widest text-[#CBB079] font-mono uppercase mb-0.5">
                        {frame.tag}
                      </div>
                      <div className="font-display text-lg tracking-wide">
                        {frame.title[currentLang]}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeFrameIndex === idx
                          ? "text-[#CBB079] translate-x-1"
                          : "text-[#F6F1E8]/20 group-hover:translate-x-0.5"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Active Narrative Box */}
              <div className="p-6 bg-[#143328]/85 backdrop-blur-md rounded-2xl border border-[#CBB079]/25 mt-4 shadow-xl">
                <div className="text-[10px] tracking-[0.25em] text-[#CBB079] font-mono uppercase mb-2">
                  CINEMATIC WALK-THROUGH
                </div>
                <p className="font-sans-clean text-sm text-[#F6F1E8]/90 leading-relaxed">
                  {activeFrame.narrative[currentLang]}
                </p>
              </div>
            </div>

            {/* Quick Visit Link */}
            <a
              href="#visit"
              className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase text-[#CBB079] hover:text-[#E2CD9A] transition-colors pt-2 font-mono"
            >
              <span>{t.place.viewAtmosphere}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
