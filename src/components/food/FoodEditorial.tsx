"use client";

import React, { useState } from "react";
import { Utensils, RotateCw, Sparkles, ChevronRight, Plus, Check } from "lucide-react";
import { SCANNED_MODELS, ScannedModelAsset } from "@/data/models";
import { Language, translations } from "@/i18n";
import { VegBadge } from "../ui/VegBadge";
import { DevPhotoBadge } from "../ui/DevPhotoBadge";
import { DishModelViewer } from "./DishModelViewer";

interface FoodEditorialProps {
  currentLang: Language;
}

export const FoodEditorial: React.FC<FoodEditorialProps> = ({ currentLang }) => {
  const [selectedModel, setSelectedModel] = useState<ScannedModelAsset>(SCANNED_MODELS[0]);
  const [activeDishIndex, setActiveDishIndex] = useState(0);
  const t = translations[currentLang];

  const signatureCurations = [
    {
      id: "vatika-special-veg",
      name: {
        en: "Vatika Special Veg Handi",
        mr: "वाटिका स्पेशल व्हेज हांडी",
        hi: "वाटिका स्पेशल वेज हांडी",
      },
      tag: "FLAGSHIP SIGNATURE",
      price: 450,
      photo: "/assets/photos/food/vatika-special.webp",
      desc: {
        en: "Double-layered velvety cashew and onion gravy slow-simmered with cottage cheese and farm vegetables.",
        mr: "दोन वेगवेगळ्या वेलव्हेटी ग्रेव्ही, काजू क्रीम आणि ताज्या पनीरने सजलेली वाटिकाची खास डिश.",
        hi: "काजू क्रीम और पनीर के टुकड़ों के साथ दो अलग-अलग ग्रेवी में पकाई गई विशेष सब्ज़ी।",
      },
      has3D: true,
      modelIndex: 0,
    },
    {
      id: "paneer-angara",
      name: {
        en: "Charcoal Paneer Angara",
        mr: "धुरकट पनीर अंगारा",
        hi: "स्मोकी पनीर अंगारा",
      },
      tag: "CHEF'S SPECIAL",
      price: 380,
      photo: "/assets/photos/food/paneer-angara.webp",
      desc: {
        en: "Fresh cottage cheese cubes infused with smokey whole spices and red embers in a traditional brazier.",
        mr: "कोळशाच्या मंद धुरावर शेकलेले ताजे पनीर आणि सुगंधी मसाल्यांची झणझणीत चव.",
        hi: "सुलगते अंगारों की खुशबू से महकता पनीर, तीखी लाल मिर्च और मसालों का जोरदार मेल।",
      },
      has3D: true,
      modelIndex: 1,
    },
    {
      id: "kaju-masala",
      name: {
        en: "Royal Kaju Masala",
        mr: "शाही काजू मसाला",
        hi: "शाही काजू मसाला",
      },
      tag: "POPULAR DELICACY",
      price: 370,
      photo: "/assets/photos/food/kaju-masala.webp",
      desc: {
        en: "Whole roasted Goan cashews tossed in browned onion and tomato reduction with pure churned butter.",
        mr: "तूपामध्ये भाजलेले संपूर्ण काजू आणि खमंग कांदा-टोमॅटोची मसालेदार ग्रेव्ही.",
        hi: "घी में भुने साबुत काजू और खुशबूदार भुने प्याज-टमाटर की गाढ़ी ग्रेवी।",
      },
      has3D: true,
      modelIndex: 2,
    },
    {
      id: "tandoori-spread",
      name: {
        en: "Garlic Naan & Clay Oven Breads",
        mr: "लसूण नान व तंदूरी कुलचे",
        hi: "गार्लिक नान और तंदूरी रोटियां",
      },
      tag: "HEARTH FIRED",
      price: 160,
      photo: "/assets/photos/food/tandoor-bread-spread.webp",
      desc: {
        en: "Hand-slapped against live clay tandoor walls, topped with roasted garlic flakes, cheese, and melted butter.",
        mr: "पारंपारिक मातीच्या तंदूरमध्ये भाजलेले गरमागरम आणि मऊ चीज बटर नान.",
        hi: "पारंपरिक मिट्टी के तंदूर में ताजा सेके गए मक्खन और भुने लहसुन से युक्त चीज नान।",
      },
      has3D: false,
    },
  ];

  return (
    <section id="the-food" className="relative py-28 md:py-36 bg-[#0D221A] overflow-hidden">
      {/* Background Subtle Tabletop Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(203, 176, 121, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(46, 125, 50, 0.2) 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* ========================================================== */}
        {/* SECTION 2: CHEF'S SIGNATURE SELECTION (Matches Reference)   */}
        {/* ========================================================== */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-script text-5xl sm:text-7xl md:text-8xl text-[#CBB079] block mb-1 leading-none drop-shadow-md">
            Signature Selection
          </span>
          <p className="font-sans-clean text-xs sm:text-sm text-[#F6F1E8]/70 uppercase tracking-[0.22em] font-mono max-w-xl mx-auto">
            Slow-cooked in earthenware handis with pure ghee &amp; whole roasted spices
          </p>
        </div>

        {/* Split Grid: Left Overhead Dish + Right Curated Menu Card (Exact Reference Image Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-28">
          {/* Left: Overhead Circular Plate Staging with Herbs & Spices */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Tabletop scattered spice embellishment */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#CBB079]/10 blur-xl pointer-events-none" />

            <div className="relative w-full max-w-md aspect-square rounded-full p-3 bg-gradient-to-br from-[#183C2F] to-[#0D221A] border border-[#CBB079]/30 plate-shadow overflow-hidden group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={signatureCurations[activeDishIndex].photo}
                alt={signatureCurations[activeDishIndex].name[currentLang]}
                className="w-full h-full object-cover rounded-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-radial from-transparent via-transparent to-[#0D221A]/60 pointer-events-none" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0D221A]/90 backdrop-blur-md border border-[#CBB079]/40 px-4 py-1.5 rounded-full text-xs text-[#F6F1E8] font-mono tracking-wider uppercase shadow-xl whitespace-nowrap">
                {signatureCurations[activeDishIndex].tag}
              </div>
            </div>
          </div>

          {/* Right: Dark Emerald Translucent Card (Exact Reference Image Card Style) */}
          <div className="lg:col-span-6 bg-[#143328]/80 backdrop-blur-md border border-[#CBB079]/25 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#F6F1E8]/10 mb-6">
              <span className="font-script text-3xl text-[#CBB079]">
                Featured Dishes
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#F6F1E8]/60 uppercase">
                HOTEL VATIKA • 100% PURE VEG
              </span>
            </div>

            {/* List of 4 Signature Dishes */}
            <div className="space-y-6">
              {signatureCurations.map((dish, idx) => (
                <div
                  key={dish.id}
                  onClick={() => setActiveDishIndex(idx)}
                  className={`group p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                    activeDishIndex === idx
                      ? "bg-[#183C2F] border-[#CBB079]/50 shadow-lg"
                      : "bg-[#102820]/60 border-transparent hover:border-[#F6F1E8]/15 hover:bg-[#183C2F]/50"
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#CBB079]/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={dish.photo}
                        alt={dish.name[currentLang]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <VegBadge size="sm" />
                        <h4 className="font-serif-editorial text-base sm:text-lg text-[#F6F1E8] truncate font-medium group-hover:text-[#CBB079] transition-colors">
                          {dish.name[currentLang]}
                        </h4>
                      </div>
                      <p className="font-sans-clean text-xs text-[#F6F1E8]/65 truncate max-w-xs mt-0.5">
                        {dish.desc[currentLang]}
                      </p>
                    </div>
                  </div>

                  {/* Price in Gold */}
                  <div className="text-right shrink-0">
                    <span className="font-mono text-base font-semibold text-[#CBB079]">
                      ₹{dish.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Card Action */}
            <div className="mt-8 pt-5 border-t border-[#F6F1E8]/10 flex items-center justify-between">
              <span className="text-xs text-[#F6F1E8]/60 font-sans-clean">
                All curries served with freshly churned butter &amp; salads
              </span>
              <a
                href="#menu"
                className="inline-flex items-center space-x-1.5 text-xs text-[#CBB079] hover:text-[#E2CD9A] font-mono tracking-wider uppercase font-semibold"
              >
                <span>Full Menu</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* SECTION 3: DOUBLE-PLATE FLATLAY SPREAD (Matches Reference) */}
        {/* ========================================================== */}
        <div className="mb-28 pt-10 border-t border-[#F6F1E8]/10">
          <div className="text-center mb-14">
            <span className="font-script text-4xl sm:text-6xl text-[#CBB079] block mb-1">
              The Artisan Hearth
            </span>
            <p className="font-sans-clean text-xs sm:text-sm text-[#F6F1E8]/70 uppercase tracking-[0.2em] font-mono">
              Pure hand-churned dairy • Stone-ground spices • Live firewood tandoor
            </p>
          </div>

          {/* Double Plate Flatlay Presentation with Vertical Silverware Fork */}
          <div className="relative bg-[#102820]/80 border border-[#CBB079]/20 rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden plate-shadow">
            {/* Background tabletop botanical lighting */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#CBB079]/5 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-11 gap-8 items-center">
              {/* Plate 1: Spiced Handi Specialty */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-full p-2 bg-[#143328] border border-[#CBB079]/30 plate-shadow overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/photos/food/paneer-angara.webp"
                    alt="Paneer Angara"
                    className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-radial from-transparent to-[#0D221A]/50 pointer-events-none" />
                </div>
                <h4 className="font-serif-editorial text-2xl text-[#F6F1E8] font-medium mt-5 mb-1">
                  Charcoal-Smoked Paneer Angara
                </h4>
                <span className="font-mono text-sm text-[#CBB079] font-medium">₹380</span>
                <p className="font-sans-clean text-xs text-[#F6F1E8]/70 max-w-xs mt-2 leading-relaxed">
                  Smoked with live charcoal embers and whole roasted spices in traditional heavy cookware.
                </p>
              </div>

              {/* Center Divider: Vertical Vintage Silverware Fork Motif (Matching Reference Flatlay) */}
              <div className="md:col-span-1 hidden md:flex flex-col items-center justify-center space-y-4">
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-[#CBB079]/40" />
                <div className="w-9 h-9 rounded-full bg-[#183C2F] border border-[#CBB079]/40 flex items-center justify-center text-[#CBB079] shadow-lg">
                  <Utensils className="w-4 h-4" />
                </div>
                <div className="w-[1px] h-16 bg-gradient-to-t from-transparent to-[#CBB079]/40" />
              </div>

              {/* Plate 2: Velvety Shahi Main Specialty */}
              <div className="md:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-full p-2 bg-[#143328] border border-[#CBB079]/30 plate-shadow overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/photos/food/kaju-masala.webp"
                    alt="Kaju Masala"
                    className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-radial from-transparent to-[#0D221A]/50 pointer-events-none" />
                </div>
                <h4 className="font-serif-editorial text-2xl text-[#F6F1E8] font-medium mt-5 mb-1">
                  Golden Roasted Kaju Masala
                </h4>
                <span className="font-mono text-sm text-[#CBB079] font-medium">₹370</span>
                <p className="font-sans-clean text-xs text-[#F6F1E8]/70 max-w-xs mt-2 leading-relaxed">
                  Whole roasted cashews gently simmered in an aromatic onion, tomato, and pure butter reduction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* INTERACTIVE 3D PHOTOGRAMMETRY SCANNER SECTION              */}
        {/* ========================================================== */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#F6F1E8]/10">
            <div>
              <div className="flex items-center space-x-2 text-[11px] tracking-[0.28em] uppercase text-[#CBB079] font-mono mb-2">
                <span>3D PHOTOGRAMMETRY</span>
                <span>—</span>
                <span>INTERACTIVE INSPECTOR</span>
              </div>
              <h3 className="font-serif-editorial text-3xl sm:text-4xl text-[#F6F1E8] font-light">
                Inspect Signature Discs in 3D
              </h3>
            </div>

            {/* Quick 3D Dish Switcher Tabs */}
            <div className="flex space-x-2 mt-4 sm:mt-0">
              {SCANNED_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] tracking-wider uppercase font-mono border transition-all ${
                    selectedModel.id === m.id
                      ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-semibold"
                      : "border-[#F6F1E8]/20 bg-[#143328] text-[#F6F1E8]/60 hover:text-[#F6F1E8]"
                  }`}
                >
                  {m.name[currentLang].split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <DishModelViewer
            key={selectedModel.id}
            model={selectedModel}
            currentLang={currentLang}
          />
        </div>
      </div>
    </section>
  );
};
