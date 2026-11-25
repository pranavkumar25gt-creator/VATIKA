"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, Menu as MenuIcon, X, Sparkles } from "lucide-react";
import { Language, translations } from "@/i18n";
import { RESTAURANT_DATA } from "@/data/restaurant";

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onLanguageChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const t = translations[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 40);
      setScrollProgress(totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.place, href: "#the-place" },
    { label: t.nav.food, href: "#the-food" },
    { label: t.nav.menu, href: "#full-menu" },
    { label: t.nav.celebrations, href: "#celebrations" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.visit, href: "#visit" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D221A]/95 backdrop-blur-md border-b border-[#F6F1E8]/10 py-3 shadow-2xl"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        {/* Subtle gold scroll progress line */}
        <div
          className="absolute top-0 left-0 h-[1.5px] bg-[#CBB079] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Cursive Signature Brand Logo (Matches Reference Theme) */}
          <Link
            href="/"
            className="flex items-center space-x-2 group cursor-pointer focus:outline-none"
            aria-label="Hotel Vatika Parbhani Home"
          >
            <div className="flex flex-col">
              <span className="font-script text-3xl sm:text-4xl text-[#F6F1E8] group-hover:text-[#CBB079] transition-colors tracking-wide leading-none py-1">
                Hotel Vatika
              </span>
              <span className="text-[8.5px] tracking-[0.35em] text-[#CBB079] uppercase font-sans-clean font-medium pl-1">
                PURE VEG • PARBHANI
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Centered Floating Pill */}
          <nav className="hidden lg:flex items-center space-x-7 bg-[#143328]/70 backdrop-blur-md border border-[#F6F1E8]/12 rounded-full px-7 py-2 text-xs tracking-[0.16em] uppercase text-[#F6F1E8]/85 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#CBB079] transition-colors py-0.5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#CBB079] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side: Language Switcher + Golden Reservation Pill */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Language Switcher */}
            <div
              className="flex items-center bg-[#143328] border border-[#F6F1E8]/15 rounded-full p-0.5 text-[11px]"
              role="radiogroup"
              aria-label="Select language"
            >
              <button
                onClick={() => onLanguageChange("en")}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  currentLang === "en"
                    ? "bg-[#CBB079] text-[#0D221A] font-semibold"
                    : "text-[#F6F1E8]/70 hover:text-[#F6F1E8]"
                }`}
                aria-checked={currentLang === "en"}
                role="radio"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange("mr")}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  currentLang === "mr"
                    ? "bg-[#CBB079] text-[#0D221A] font-semibold"
                    : "text-[#F6F1E8]/70 hover:text-[#F6F1E8]"
                }`}
                aria-checked={currentLang === "mr"}
                role="radio"
              >
                मराठी
              </button>
              <button
                onClick={() => onLanguageChange("hi")}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  currentLang === "hi"
                    ? "bg-[#CBB079] text-[#0D221A] font-semibold"
                    : "text-[#F6F1E8]/70 hover:text-[#F6F1E8]"
                }`}
                aria-checked={currentLang === "hi"}
                role="radio"
              >
                हिंदी
              </button>
            </div>

            {/* Golden Kraft Reservation Button (Matching Top-Right of Reference) */}
            <a
              href="#celebrations"
              className="hidden md:inline-flex items-center space-x-2 bg-[#CBB079] hover:bg-[#E2CD9A] text-[#0D221A] px-4 py-2 rounded-full text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.reserveTable}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center space-x-3">
            <button
              onClick={() => onLanguageChange(currentLang === "en" ? "mr" : currentLang === "mr" ? "hi" : "en")}
              className="px-2 py-1 bg-[#143328] border border-[#F6F1E8]/20 text-[10px] text-[#CBB079] uppercase rounded"
            >
              {currentLang.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#F6F1E8] p-2 hover:text-[#CBB079] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Slide Navigation */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#0D221A]/98 border-b border-[#F6F1E8]/15 px-6 py-8 flex flex-col space-y-6 animate-fadeIn">
            <nav className="flex flex-col space-y-5 text-sm tracking-[0.2em] uppercase text-[#F6F1E8]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#CBB079] transition-colors py-1 border-b border-[#F6F1E8]/10"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Language Radio Options */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#F6F1E8]/60">Language:</span>
              <div className="flex space-x-2">
                {(["en", "mr", "hi"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      onLanguageChange(l);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 text-xs uppercase rounded border ${
                      currentLang === l
                        ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-semibold"
                        : "border-[#F6F1E8]/20 text-[#F6F1E8]/70"
                    }`}
                  >
                    {l === "en" ? "English" : l === "mr" ? "मराठी" : "हिंदी"}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Mobile Call Button */}
            <a
              href={`tel:${RESTAURANT_DATA.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center space-x-2 bg-[#CBB079] text-[#0D221A] py-3 text-xs tracking-[0.2em] uppercase font-semibold rounded-full mt-4"
            >
              <Phone className="w-4 h-4" />
              <span>{t.nav.callNow} • {RESTAURANT_DATA.contact.primaryPhone}</span>
            </a>
          </div>
        )}
      </header>

      {/* Persistent Mobile Bottom Pill: Call / Book */}
      <div className="sm:hidden fixed bottom-5 left-4 right-4 z-40 flex items-center justify-between bg-[#143328]/95 backdrop-blur-md border border-[#CBB079]/40 px-5 py-3 shadow-2xl rounded-full">
        <a
          href={`tel:${RESTAURANT_DATA.contact.primaryPhone.replace(/\s+/g, "")}`}
          className="flex items-center space-x-2 text-xs tracking-[0.14em] uppercase text-[#F6F1E8] font-medium"
        >
          <Phone className="w-3.5 h-3.5 text-[#CBB079]" />
          <span>{t.nav.callNow}</span>
        </a>
        <div className="w-[1px] h-4 bg-[#F6F1E8]/20" />
        <a
          href="#celebrations"
          className="flex items-center space-x-2 text-xs tracking-[0.14em] uppercase text-[#CBB079] font-medium"
        >
          <Calendar className="w-3.5 h-3.5 text-[#CBB079]" />
          <span>{t.nav.reserveTable}</span>
        </a>
      </div>
    </>
  );
};
