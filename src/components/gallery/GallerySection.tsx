"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { PHOTO_MANIFEST, PhotoAsset } from "@/data/photos";
import { Language, translations } from "@/i18n";
import { DevPhotoBadge } from "../ui/DevPhotoBadge";

interface GallerySectionProps {
  currentLang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ currentLang }) => {
  const [filter, setFilter] = useState<"all" | "food" | "interior" | "hall" | "exterior">("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const t = translations[currentLang];

  const filteredPhotos = PHOTO_MANIFEST.filter((p) => {
    if (filter === "all") return true;
    if (filter === "hall") return p.category === "hall" || p.category === "event";
    return p.category === filter;
  });

  // Handle keyboard navigation inside fullscreen lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
      }
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-[#0D221A] overflow-hidden border-t border-[#F6F1E8]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#F6F1E8]/10">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-[#CBB079] block mb-1">
              Visual Chronicle
            </span>
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#CBB079]/80 font-mono mb-2">
              <span>{t.gallery.sectionTag}</span>
              <span>—</span>
              <span>UNRETOUCHED TRUTH</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#F6F1E8] font-light tracking-[0.02em]">
              {t.gallery.title}
            </h2>
          </div>
          <p className="font-sans-clean text-xs md:text-sm text-[#F6F1E8]/60 max-w-sm mt-4 md:mt-0 leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-6 mb-8 no-scrollbar text-xs font-mono uppercase tracking-wider">
          {[
            { id: "all", label: t.gallery.filterAll },
            { id: "food", label: t.gallery.filterFood },
            { id: "interior", label: t.gallery.filterInterior },
            { id: "hall", label: t.gallery.filterHall },
            { id: "exterior", label: t.gallery.filterExterior },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as typeof filter)}
              className={`px-4 py-2 rounded-full border transition-all ${
                filter === item.id
                  ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-semibold"
                  : "border-[#F6F1E8]/15 bg-[#143328]/60 text-[#F6F1E8]/70 hover:text-[#F6F1E8] hover:border-[#CBB079]/40"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Editorial Masonry / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="group relative bg-[#143328] rounded-2xl border border-[#CBB079]/20 hover:border-[#CBB079]/60 overflow-hidden cursor-pointer aspect-[4/3] transition-all duration-500 shadow-lg hover:shadow-2xl"
            >
              <DevPhotoBadge category={photo.category} label={photo.id.toUpperCase()} />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt[currentLang]}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D221A]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] tracking-widest text-[#CBB079] font-mono uppercase mb-1">
                  {photo.category}
                </span>
                <p className="font-display text-lg text-[#F6F1E8] font-light leading-snug">
                  {photo.caption ? photo.caption[currentLang] : photo.alt[currentLang]}
                </p>
                <div className="flex items-center space-x-1 text-[10px] text-[#F6F1E8]/60 font-mono mt-2">
                  <Maximize2 className="w-3 h-3 text-[#CBB079]" />
                  <span>Click to expand full resolution</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Editorial Lightbox */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#0D221A]/98 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Lightbox Bar */}
          <div className="w-full max-w-7xl flex items-center justify-between py-2 border-b border-[#F6F1E8]/15">
            <div className="text-xs font-mono text-[#CBB079] tracking-widest uppercase">
              PHOTO {activePhotoIndex + 1} OF {filteredPhotos.length} • {filteredPhotos[activePhotoIndex].category.toUpperCase()}
            </div>
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="p-2 text-[#F6F1E8] hover:text-[#CBB079] transition-colors"
              aria-label="Close fullscreen gallery"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Large Image Frame */}
          <div className="relative flex-1 w-full max-w-6xl my-4 flex items-center justify-center overflow-hidden">
            <button
              onClick={() => setActivePhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length)}
              className="absolute left-2 md:left-4 z-10 p-3 bg-[#143328]/90 rounded-full border border-[#CBB079]/30 text-[#F6F1E8] hover:text-[#CBB079] transition-colors shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={filteredPhotos[activePhotoIndex].src}
              alt={filteredPhotos[activePhotoIndex].alt[currentLang]}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            <button
              onClick={() => setActivePhotoIndex((prev) => (prev! + 1) % filteredPhotos.length)}
              className="absolute right-2 md:right-4 z-10 p-3 bg-[#143328]/90 rounded-full border border-[#CBB079]/30 text-[#F6F1E8] hover:text-[#CBB079] transition-colors shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption Footer */}
          <div className="w-full max-w-4xl text-center pb-2">
            <p className="font-display text-lg md:text-xl text-[#F6F1E8] font-light">
              {filteredPhotos[activePhotoIndex].caption
                ? filteredPhotos[activePhotoIndex].caption![currentLang]
                : filteredPhotos[activePhotoIndex].alt[currentLang]}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
