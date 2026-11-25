"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Utensils, Sparkles, Star } from "lucide-react";
import { Language, translations } from "@/i18n";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { HeroDepthCanvas } from "./HeroDepthCanvas";
import { VegBadge } from "../ui/VegBadge";
import { DevPhotoBadge } from "../ui/DevPhotoBadge";

interface HeroCinematicProps {
  currentLang: Language;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative w-full h-screen min-h-[680px] max-h-[1100px] flex items-end pb-16 md:pb-24 overflow-hidden bg-[#0E0C0A]">
      <DevPhotoBadge category="hero" label="HERO PLATING (4K 60FPS / 2.5D DEPTH)" />

      {/* 2.5D Depth Engine & Full-Bleed Video Canvas */}
      <div className="absolute inset-0 z-0">
        <HeroDepthCanvas
          colorTextureUrl="/assets/photos/food/paneer-angara-macro.webp"
          depthTextureUrl="/assets/photos/food/paneer-angara-depth.webp"
          fallbackPosterUrl="/assets/photos/food/paneer-angara-macro.webp"
          altText="Hotel Vatika Signature Charcoal Smoked Paneer Angara"
        />

        {/* Real Steam Loop Screen-Blend Overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-45 animate-pulse"
          style={{
            backgroundImage: `url('/assets/textures/steam-alpha.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
            animationDuration: "6s",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl">
          {/* Subtle Trust Indicators */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
            {/* Pure Veg Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#171412]/80 backdrop-blur-md border border-[#2E7D32]/40 px-3 py-1.5 rounded-full text-xs text-[#F4EBDD]">
              <VegBadge size="sm" />
              <span className="tracking-wide text-[11px] uppercase font-sans-clean font-medium text-[#A5D6A7]">
                {t.hero.pureVegBadge}
              </span>
            </div>

            {/* Small Zomato Trust Badge */}
            <a
              href={RESTAURANT_DATA.zomato.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 bg-[#171412]/80 backdrop-blur-md border border-[#F4EBDD]/15 hover:border-[#B8893B]/50 px-3 py-1.5 rounded-full text-xs text-[#F4EBDD] transition-colors"
              title="Official Zomato Page"
            >
              <Star className="w-3.5 h-3.5 text-[#B8893B] fill-[#B8893B]" />
              <span className="tracking-wider text-[11px] text-[#F4EBDD]/90">
                {RESTAURANT_DATA.zomato.badgeLabel}
              </span>
            </a>
          </div>

          {/* Grand Editorial Headline */}
          <h1 className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.04em] font-light leading-[1.05] text-[#F4EBDD] mb-5">
            Hotel Vatika
          </h1>

          {/* Tagline derived from verified client data */}
          <p className="font-serif-editorial text-lg sm:text-xl md:text-2xl text-[#F4EBDD]/90 font-light leading-relaxed max-w-2xl mb-3">
            {RESTAURANT_DATA.tagline[currentLang]}
          </p>
          <p className="font-sans-clean text-xs md:text-sm tracking-[0.15em] text-[#B8893B] uppercase mb-8">
            {RESTAURANT_DATA.subTagline[currentLang]}
          </p>

          {/* Dual CTAs: View Menu & Plan Your Celebration */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#full-menu"
              className="inline-flex items-center justify-center space-x-2 bg-[#B8893B] hover:bg-[#D4A359] text-[#0E0C0A] px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 shadow-xl"
            >
              <Utensils className="w-4 h-4" />
              <span>{t.hero.viewMenu}</span>
            </a>
            <a
              href="#celebrations"
              className="inline-flex items-center justify-center space-x-2 border border-[#F4EBDD]/30 hover:border-[#B8893B] bg-[#161311]/70 hover:bg-[#161311] text-[#F4EBDD] px-7 py-3.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-sm"
            >
              <span>{t.hero.planCelebration}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quiet Scroll Hint */}
      <a
        href="#the-place"
        className="hidden md:flex absolute bottom-8 right-12 z-10 flex-col items-center space-y-2 text-[#F4EBDD]/40 hover:text-[#B8893B] transition-colors group cursor-pointer focus:outline-none"
        aria-label="Scroll to explore the place"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-mono group-hover:tracking-[0.3em] transition-all">
          {t.hero.scrollHint}
        </span>
        <ChevronDown className="w-4 h-4 text-[#B8893B] animate-bounce" />
      </a>
    </section>
  );
};
