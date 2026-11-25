"use client";

import React, { useState } from "react";
import { Language } from "@/i18n";
import { MicroLoader } from "@/components/layout/MicroLoader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { HeroScrollTriggerCinema } from "@/components/hero/HeroScrollTriggerCinema";
import { ThePlaceWalkthrough } from "@/components/place/ThePlaceWalkthrough";
import { FoodEditorial } from "@/components/food/FoodEditorial";
import { MenuSection } from "@/components/menu/MenuSection";
import { CelebrationsSection } from "@/components/celebrations/CelebrationsSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { VisitSection } from "@/components/visit/VisitSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<Language>("en");

  return (
    <>
      {/* 0. Editorial Micro-Loader (< 1.2s, skips on repeat visits) */}
      <MicroLoader />

      {/* Cinematic Smooth Scroll Provider */}
      <SmoothScroll>
        {/* Persistent Floating Navigation with Language Switcher */}
        <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} />

        <main className="flex-1 w-full bg-[#0D221A]">
          {/* 1. HERO: 3D ScrollTrigger Cinematic Video Stage */}
          <HeroScrollTriggerCinema currentLang={currentLang} />

          {/* 2. THE PLACE: Architectural Walk-Through */}
          <ThePlaceWalkthrough currentLang={currentLang} />

          {/* 3. THE FOOD: Culinary Artistry & 3D Scanned Handi Viewer */}
          <FoodEditorial currentLang={currentLang} />

          {/* 4. FULL MENU: Searchable, Categorized, Live WhatsApp Enquiry Cart */}
          <MenuSection currentLang={currentLang} />

          {/* 5. CELEBRATIONS: Banquet Halls & WhatsApp Event Planner */}
          <CelebrationsSection currentLang={currentLang} />

          {/* 6. GALLERY: Curated Real Moments & Fullscreen Lightbox */}
          <GallerySection currentLang={currentLang} />

          {/* 7. VISIT: Location, Dark Map, Hours, Valet & JSON-LD */}
          <VisitSection currentLang={currentLang} />
        </main>

        {/* Quiet, Beautiful Editorial Footer */}
        <Footer currentLang={currentLang} />
      </SmoothScroll>
    </>
  );
}
