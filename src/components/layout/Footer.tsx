"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, ExternalLink, MessageCircle } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Language, translations } from "@/i18n";
import { VegBadge } from "../ui/VegBadge";

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const year = 2026;

  return (
    <footer className="relative bg-[#0A1B14] border-t border-[#F6F1E8]/10 pt-20 pb-12 overflow-hidden text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#F6F1E8]/10 items-start">
          {/* Brand & Editorial Heritage */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-script text-4xl sm:text-5xl text-[#F6F1E8] font-normal tracking-wide block">
              Hotel Vatika
            </span>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#CBB079] font-mono">
              PARBHANI • BASMAT ROAD (NH22)
            </p>
            <p className="font-sans-clean text-xs text-[#F6F1E8]/60 max-w-sm leading-relaxed pt-2">
              {RESTAURANT_DATA.tagline[currentLang]}
            </p>
            <div className="pt-2">
              <VegBadge size="md" label="Pure Vegetarian Sanctuary" />
            </div>
          </div>

          {/* Center Overhead Brass Spice Bowl Motif (Matching Reference) */}
          <div className="md:col-span-2 flex flex-col items-center justify-center py-4 md:py-0">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#CBB079]/40 shadow-[0_12px_30px_rgba(0,0,0,0.65)] bg-[#143328] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/photos/food/vatika-special.webp"
                alt="Roasted Whole Spices & Culinary Craft"
                className="w-full h-full object-cover scale-125 brightness-90"
              />
              <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#CBB079]/30 pointer-events-none" />
            </div>
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#CBB079]/70 mt-3 text-center">
              HAND-ROASTED SPICES
            </span>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#CBB079] font-mono block mb-2">
              JOURNEY
            </span>
            <ul className="space-y-2.5 text-xs text-[#F6F1E8]/70 font-sans-clean">
              <li>
                <a href="#the-place" className="hover:text-[#CBB079] transition-colors">
                  {t.nav.place}
                </a>
              </li>
              <li>
                <a href="#the-food" className="hover:text-[#CBB079] transition-colors">
                  {t.nav.food}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#CBB079] transition-colors">
                  {t.nav.menu}
                </a>
              </li>
              <li>
                <a href="#celebrations" className="hover:text-[#CBB079] transition-colors">
                  {t.nav.celebrations}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#CBB079] transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#CBB079] transition-colors">
                  {t.nav.visit}
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Highway Landmark */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs text-[#F6F1E8]/70">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#CBB079] block mb-2">
              CONNECT &amp; LOCATE
            </span>
            <p className="leading-relaxed">
              {RESTAURANT_DATA.address.fullFormatted}
            </p>
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#CBB079]" />
                <a
                  href={`tel:${RESTAURANT_DATA.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="hover:text-[#CBB079] transition-colors"
                >
                  {RESTAURANT_DATA.contact.primaryPhone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <a
                  href={`https://wa.me/${RESTAURANT_DATA.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#CBB079] transition-colors"
                >
                  WhatsApp Reception Desk
                </a>
              </div>
            </div>

            {/* Zomato Link */}
            <div className="pt-3">
              <a
                href={RESTAURANT_DATA.zomato.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs text-[#F6F1E8]/60 hover:text-[#CBB079] transition-colors"
              >
                <span>{RESTAURANT_DATA.zomato.badgeLabel}</span>
                <ExternalLink className="w-3 h-3 text-[#CBB079]" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F6F1E8]/40 font-mono gap-4">
          <div>
            © {year} Hotel Vatika, Parbhani. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Photorealistic Warm Cinema Experience</span>
            <span>•</span>
            <span>Zero Synthetic Renders</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
