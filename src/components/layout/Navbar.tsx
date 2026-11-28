"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, Menu as MenuIcon, X, ShoppingBag } from "lucide-react";
import { Language, translations } from "@/i18n";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang, onLanguageChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { totalCount, setIsDrawerOpen } = useCart();
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
    { label: t.nav.menu, href: "#menu" },
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
            : "bg-transparent py-3 md:py-6"
        }`}
      >
        {/* Subtle gold scroll progress line */}
        <div
          className="absolute top-0 left-0 h-[1.5px] bg-[#CBB079] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
          {/* Cursive Signature Brand Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group cursor-pointer focus:outline-none"
            aria-label="Hotel Vatika Parbhani Home"
          >
            <div className="flex flex-col">
              <span className="font-script text-2xl sm:text-3xl md:text-4xl text-[#F6F1E8] group-hover:text-[#CBB079] transition-colors tracking-wide leading-none py-1">
                Hotel Vatika
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.35em] text-[#CBB079] uppercase font-sans-clean font-medium pl-1">
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

          {/* Right Side: Language Switcher + Cart Trigger + Reservation Pill */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            {/* Live Cart Button (Visible on Desktop & Mobile) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="relative p-2 rounded-full bg-[#143328]/80 hover:bg-[#183C2F] border border-[#CBB079]/30 hover:border-[#CBB079] text-[#F6F1E8] transition-all flex items-center justify-center cursor-pointer shadow-md"
              aria-label={`Open pre-order selection (${totalCount} items)`}
              title="View Pre-order Selection"
            >
              <ShoppingBag className="w-4 h-4 text-[#CBB079]" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#CBB079] text-[#0D221A] rounded-full text-[10px] font-mono font-bold flex items-center justify-center shadow animate-pulse">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Language Switcher (Desktop) */}
            <div
              className="hidden sm:flex items-center bg-[#143328] border border-[#F6F1E8]/15 rounded-full p-0.5 text-[11px]"
              role="radiogroup"
              aria-label="Select language"
            >
              {(["en", "mr", "hi"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2.5 py-1 rounded-full transition-colors ${
                    currentLang === lang
                      ? "bg-[#CBB079] text-[#0D221A] font-semibold"
                      : "text-[#F6F1E8]/70 hover:text-[#F6F1E8]"
                  }`}
                  aria-checked={currentLang === lang}
                  role="radio"
                >
                  {lang === "en" ? "EN" : lang === "mr" ? "मराठी" : "हिंदी"}
                </button>
              ))}
            </div>

            {/* Golden Reservation Button (Desktop) */}
            <a
              href="#celebrations"
              className="hidden md:inline-flex items-center space-x-2 bg-[#CBB079] hover:bg-[#E2CD9A] text-[#0D221A] px-4 py-2 rounded-full text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 shadow-md"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.nav.reserveTable}</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <div className="flex sm:hidden items-center space-x-2">
              <button
                onClick={() =>
                  onLanguageChange(
                    currentLang === "en" ? "mr" : currentLang === "mr" ? "hi" : "en"
                  )
                }
                className="px-2 py-1 bg-[#143328] border border-[#F6F1E8]/20 text-[10px] text-[#CBB079] uppercase rounded font-mono font-bold"
                aria-label="Switch language"
              >
                {currentLang.toUpperCase()}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#F6F1E8] p-1.5 hover:text-[#CBB079] transition-colors focus:outline-none rounded-lg bg-[#143328]/60 border border-[#F6F1E8]/10"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen Slide Navigation */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-[#0D221A]/98 border-b border-[#CBB079]/20 px-6 py-6 flex flex-col space-y-5 animate-fadeIn backdrop-blur-xl">
            <nav className="flex flex-col space-y-3.5 text-xs tracking-[0.2em] uppercase text-[#F6F1E8]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#CBB079] transition-colors py-2 border-b border-[#F6F1E8]/10 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[#CBB079]/50 font-mono text-[10px]">→</span>
                </a>
              ))}
            </nav>

            {/* Mobile Language Radio Options */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-[#F6F1E8]/60 font-mono">
                Language:
              </span>
              <div className="flex space-x-1.5">
                {(["en", "mr", "hi"] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      onLanguageChange(l);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 text-xs uppercase rounded-full border transition-all ${
                      currentLang === l
                        ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-semibold"
                        : "border-[#F6F1E8]/20 text-[#F6F1E8]/70"
                    }`}
                  >
                    {l === "en" ? "EN" : l === "mr" ? "मराठी" : "हिंदी"}
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Mobile Call Button */}
            <a
              href={`tel:${RESTAURANT_DATA.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center space-x-2 bg-[#CBB079] text-[#0D221A] py-3 text-xs tracking-[0.16em] uppercase font-semibold rounded-full mt-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>{t.nav.callNow} • {RESTAURANT_DATA.contact.primaryPhone}</span>
            </a>
          </div>
        )}
      </header>

      {/* Persistent Mobile Bottom Pill: Call / Book */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30 flex items-center justify-between bg-[#102820]/95 backdrop-blur-xl border border-[#CBB079]/40 px-5 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.8)] rounded-full">
        <a
          href={`tel:${RESTAURANT_DATA.contact.primaryPhone.replace(/\s+/g, "")}`}
          className="flex items-center space-x-2 text-xs tracking-[0.14em] uppercase text-[#F6F1E8] font-medium py-1"
        >
          <Phone className="w-3.5 h-3.5 text-[#CBB079]" />
          <span>{t.nav.callNow}</span>
        </a>
        <div className="w-[1px] h-4 bg-[#F6F1E8]/20" />
        <a
          href="#celebrations"
          className="flex items-center space-x-2 text-xs tracking-[0.14em] uppercase text-[#CBB079] font-medium py-1"
        >
          <Calendar className="w-3.5 h-3.5 text-[#CBB079]" />
          <span>{t.nav.reserveTable}</span>
        </a>
      </div>
    </>
  );
};
