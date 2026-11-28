"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { Star, ChevronDown } from "lucide-react";
import { Language, translations } from "@/i18n";
import { RESTAURANT_DATA } from "@/data/restaurant";

interface HeroScrollTriggerCinemaProps {
  currentLang: Language;
}

/* ─── Floating Golden Dust Particle ─── */
const DustParticle: React.FC<{ delay: number; left: string; size: number; dur: number }> = ({
  delay,
  left,
  size,
  dur,
}) => (
  <div
    className="absolute bottom-0 rounded-full pointer-events-none"
    style={{
      left,
      width: size,
      height: size,
      background: `radial-gradient(circle, rgba(203,176,121,0.85) 0%, rgba(203,176,121,0) 70%)`,
      animation: `floatDust ${dur}s ease-in-out ${delay}s infinite`,
      willChange: "transform, opacity",
    }}
    aria-hidden="true"
  />
);

export const HeroScrollTriggerCinema: React.FC<HeroScrollTriggerCinemaProps> = ({
  currentLang,
}) => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const photoLayerRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang];

  // Deterministic golden dust particles
  const dustMotes = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        delay: (i * 1.3) % 7 + Math.sin(i) * 0.5,
        left: `${5 + (i * 5.3) % 90}%`,
        size: 2 + ((i * 3) % 4),
        dur: 8 + (i % 5) * 2,
      })),
    []
  );

  // Damped cursor & gyroscope coordinates
  const pointer = useRef({
    x: 0.72,
    y: 0.48,
    targetX: 0.72,
    targetY: 0.48,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      pointer.current.targetX = nx;
      pointer.current.targetY = ny;
      pointer.current.targetTiltX = (nx - 0.5) * 2;
      pointer.current.targetTiltY = (ny - 0.5) * 2;
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const gx = Math.max(-1, Math.min(1, e.gamma / 25));
      const gy = Math.max(-1, Math.min(1, (e.beta - 40) / 25));
      pointer.current.targetTiltX = gx;
      pointer.current.targetTiltY = gy;
      pointer.current.targetX = 0.72 + gx * 0.12;
      pointer.current.targetY = 0.48 + gy * 0.12;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", onOrientation, { passive: true });
    }

    let animId: number;
    const updateLoop = () => {
      pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.05;
      pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.05;
      pointer.current.tiltX += (pointer.current.targetTiltX - pointer.current.tiltX) * 0.06;
      pointer.current.tiltY += (pointer.current.targetTiltY - pointer.current.tiltY) * 0.06;

      if (spotlightRef.current) {
        const px = (pointer.current.x * 100).toFixed(2);
        const py = (pointer.current.y * 100).toFixed(2);
        spotlightRef.current.style.background = `
          radial-gradient(600px circle at ${px}% ${py}%, rgba(226, 205, 154, 0.16) 0%, rgba(203, 176, 121, 0.07) 35%, transparent 68%)
        `;
      }

      if (photoLayerRef.current) {
        const shiftX = pointer.current.tiltX * -10;
        const shiftY = pointer.current.tiltY * -7;
        photoLayerRef.current.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0) scale(1.02)`;
      }

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onOrientation);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section
      className="relative w-full min-h-[100dvh] lg:h-screen lg:min-h-[720px] lg:max-h-[1000px] bg-[#0D221A] overflow-hidden flex flex-col justify-end lg:justify-center"
      aria-label="Hotel Vatika Royal Overhead Feast"
    >
      {/* ═══ BASE BACKGROUND SURFACE ═══ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0D221A]">

        {/* ── Desktop: Full-bleed Right Stage with Ken Burns + Gradient Mask ── */}
        <div
          ref={photoLayerRef}
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 44%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85) 56%, black 62%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 44%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.85) 56%, black 62%, black 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/photos/hero-overhead-feast.jpg"
            alt="Royal Overhead Feast — Vatika Special Veg, Paneer Angara, Garlic Naan & Whole Spices"
            className="w-full h-full object-cover object-right"
            style={{
              clipPath: "inset(14% 0 0 47%)",
              animation: "kenBurnsDrift 25s ease-in-out infinite",
            }}
          />
          {/* Color-wash overlay to blend the photo's green into our exact #0D221A */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #0D221A 0%, #0D221A 46%, rgba(13,34,26,0.7) 54%, rgba(13,34,26,0.35) 62%, rgba(13,34,26,0.15) 72%, transparent 85%)",
            }}
          />
          <div
            className="absolute top-0 inset-x-0 pointer-events-none"
            style={{
              height: "16%",
              background: "linear-gradient(to bottom, #0D221A 40%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 pointer-events-none"
            style={{
              height: "14%",
              background: "linear-gradient(to top, #0D221A 30%, transparent 100%)",
            }}
          />
        </div>

        {/* ── Mobile/Tablet: Immersive Full-Bleed Top Backdrop (Seamless fade down) ── */}
        <div
          className="lg:hidden absolute top-0 inset-x-0 h-[58vh] sm:h-[62vh] pointer-events-none overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 48%, rgba(0,0,0,0.7) 68%, rgba(0,0,0,0.2) 86%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 48%, rgba(0,0,0,0.7) 68%, rgba(0,0,0,0.2) 86%, transparent 100%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/photos/hero-overhead-feast.jpg"
            alt="Royal Overhead Feast — Hotel Vatika"
            className="w-full h-full object-cover object-[78%_38%] scale-110"
            style={{ clipPath: "inset(12% 0 0 42%)" }}
          />

          {/* Emerald color wash to fuse photo background with #0D221A */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,34,26,0.2) 0%, transparent 35%, rgba(13,34,26,0.8) 75%, #0D221A 100%)",
            }}
          />
          {/* Left-edge feathering to soften the vertical boundary */}
          <div
            className="absolute inset-y-0 left-0 w-3/5 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #0D221A 0%, rgba(13,34,26,0.85) 40%, rgba(13,34,26,0.3) 70%, transparent 100%)",
            }}
          />
        </div>

        {/* ── Atmospheric Golden Dust Particles ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {dustMotes.map((p) => (
            <DustParticle key={p.id} delay={p.delay} left={p.left} size={p.size} dur={p.dur} />
          ))}
        </div>

        {/* ── Top Header Fade ── */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0D221A] from-45% via-[#0D221A]/80 to-transparent pointer-events-none z-10" />

        {/* ── Bottom Ambient Fade ── */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0D221A] via-[#0D221A]/60 to-transparent pointer-events-none z-10" />

        {/* ── Interactive Cursor-Tracked Warm Tungsten Spotlight ── */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none mix-blend-screen"
        />

        {/* ── Film Grain Noise ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* ═══ HERO CONTENT LOCKUP ═══ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-14 pb-28 sm:pb-32 lg:py-0 flex flex-col justify-end lg:justify-center">
        <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">

          {/* ── Ornamental Gold Divider Line ── */}
          <div className="hero-fade-in-1 mb-2.5 sm:mb-4 flex items-center justify-center lg:justify-start gap-2.5">
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#CBB079]/60" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#CBB079]/90 font-mono font-bold">
              EST. PARBHANI
            </span>
            <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#CBB079]/60" />
          </div>

          {/* ── Grand Calligraphic Script Title ── */}
          <div className="hero-fade-in-2 mb-2 sm:mb-3">
            <span
              className="font-script font-bold text-5xl sm:text-7xl md:text-8xl xl:text-[8.5rem] text-transparent bg-clip-text block leading-[0.9] select-none"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #CBB079 0%, #E8D5A8 25%, #CBB079 50%, #A8905A 75%, #CBB079 100%)",
                backgroundSize: "200% auto",
                animation: "shimmerGold 6s linear infinite",
                filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.6))",
              }}
            >
              Hotel Vatika
            </span>
          </div>

          {/* ── Luxe Serif Subtitle ── */}
          <div className="hero-fade-in-3 mb-4 sm:mb-6">
            <h1 className="font-display text-xl sm:text-3xl md:text-[2.4rem] xl:text-[2.8rem] text-[#F6F1E8] font-normal tracking-[0.06em] uppercase leading-tight drop-shadow-md">
              PURE VEG SANCTUARY
            </h1>
            <p className="font-serif-editorial text-xs sm:text-base text-[#F6F1E8]/70 mt-1.5 sm:mt-2 max-w-lg mx-auto lg:mx-0 leading-relaxed italic">
              {t.hero.subTagline}
            </p>
          </div>

          {/* ── Breathing Glow Behind Title (Desktop only) ── */}
          <div
            className="hidden lg:block absolute -top-8 -left-16 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(203,176,121,0.08) 0%, transparent 70%)",
              animation: "breatheGlow 5s ease-in-out infinite",
            }}
            aria-hidden="true"
          />

          {/* ── Compact Rating Pill ── */}
          <div className="hero-fade-in-4 mb-5 sm:mb-7 flex justify-center lg:justify-start">
            <a
              href={RESTAURANT_DATA.zomato.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#143328]/90 hover:bg-[#183C2F] backdrop-blur-md border border-[#CBB079]/30 hover:border-[#CBB079] rounded-full px-3.5 py-1.5 transition-all group"
            >
              <Star className="w-3.5 h-3.5 text-[#CBB079] fill-[#CBB079]" />
              <span className="text-xs text-[#F6F1E8] font-sans-clean font-bold tracking-wide">
                4.5
              </span>
              <span className="text-[10px] text-[#F6F1E8]/60 font-sans-clean">
                on Zomato • 3,140+ reviews
              </span>
            </a>
          </div>

          {/* ── Dual CTA Pill Buttons (Positioned comfortably above bottom bar) ── */}
          <div className="hero-fade-in-5 flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <a
              href="#menu"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center bg-[#CBB079] hover:bg-[#E2CD9A] text-[#0D221A] px-5 sm:px-8 py-3 rounded-full text-[11px] sm:text-xs tracking-[0.14em] uppercase font-bold transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
              style={{ animation: "ctaPulse 3s ease-in-out 2s infinite" }}
            >
              EXPLORE MENU
            </a>
            <a
              href="#celebrations"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center border border-[#CBB079]/50 hover:border-[#CBB079] bg-[#0D221A]/80 hover:bg-[#143328] text-[#F6F1E8] px-5 sm:px-8 py-3 rounded-full text-[11px] sm:text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-300 backdrop-blur-sm active:scale-95 cursor-pointer"
            >
              PLAN EVENT
            </a>
          </div>
        </div>
      </div>

      {/* ═══ QUIET SCROLL HINT (Desktop only) ═══ */}
      <a
        href="#the-place"
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center space-y-1 text-[#F6F1E8]/40 hover:text-[#CBB079] transition-colors group cursor-pointer"
        aria-label="Scroll to explore"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-mono group-hover:tracking-[0.4em] transition-all">
          {t.hero.scrollHint}
        </span>
        <ChevronDown className="w-4 h-4 text-[#CBB079]/60 animate-bounce" />
      </a>
    </section>
  );
};
