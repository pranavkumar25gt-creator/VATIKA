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

  // Damped cursor & gyroscope for tungsten spotlight + 2.5D depth
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
      className="relative w-full min-h-screen lg:h-screen lg:min-h-[720px] lg:max-h-[1000px] bg-[#0D221A] overflow-hidden flex items-center"
      aria-label="Hotel Vatika Royal Overhead Feast"
    >
      {/* ═══ BASE BACKGROUND SURFACE ═══ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0D221A]">

        {/* ── Desktop: Hero Feast Photo with Ken Burns + Color Wash ── */}
        <div
          ref={photoLayerRef}
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none"
          style={{
            /* Wide gradient mask: fade from left into the photo area */
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
          {/* Top blend — covers the baked-in nav text from the AI image */}
          <div
            className="absolute top-0 inset-x-0 pointer-events-none"
            style={{
              height: "16%",
              background: "linear-gradient(to bottom, #0D221A 40%, transparent 100%)",
            }}
          />
          {/* Bottom blend */}
          <div
            className="absolute bottom-0 inset-x-0 pointer-events-none"
            style={{
              height: "14%",
              background: "linear-gradient(to top, #0D221A 30%, transparent 100%)",
            }}
          />
        </div>

        {/* ── Mobile/Tablet: Radial Vignette Dish Crop ── */}
        <div
          className="lg:hidden absolute inset-x-0 top-14 h-[55%] pointer-events-none opacity-85"
          style={{
            maskImage: "radial-gradient(ellipse 65% 55% at 55% 50%, black 20%, transparent 55%)",
            WebkitMaskImage: "radial-gradient(ellipse 65% 55% at 55% 50%, black 20%, transparent 55%)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/photos/hero-overhead-feast.jpg"
            alt="Royal Overhead Feast — Hotel Vatika"
            className="w-full h-full object-cover object-[85%_55%] scale-[1.5]"
            style={{ clipPath: "inset(14% 0 0 42%)" }}
          />
        </div>

        {/* ── Atmospheric Golden Dust Particles ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {dustMotes.map((p) => (
            <DustParticle key={p.id} delay={p.delay} left={p.left} size={p.size} dur={p.dur} />
          ))}
        </div>

        {/* ── Top & Bottom Cinematic Fades ── */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0D221A] from-50% via-[#0D221A]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0D221A] via-[#0D221A]/50 to-transparent pointer-events-none" />

        {/* ── Interactive Cursor-Tracked Warm Tungsten Spotlight ── */}
        <div
          ref={spotlightRef}
          className="absolute inset-0 pointer-events-none mix-blend-screen"
        />

        {/* ── Subtle Film Grain Noise (layered on the hero only) ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* ═══ HERO CONTENT LOCKUP ═══ */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-14 pt-28 pb-28 lg:py-0 flex flex-col justify-end lg:justify-center min-h-screen lg:min-h-0">
        <div className="max-w-2xl">

          {/* ── Ornamental Gold Divider Line ── */}
          <div className="hero-fade-in-1 mb-5 flex items-center gap-3">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#CBB079]/60" />
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#CBB079]/80 font-sans-clean font-medium">
              EST. PARBHANI
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#CBB079]/60" />
          </div>

          {/* ── Grand Calligraphic Script Title ── */}
          <div className="hero-fade-in-2 mb-4">
            <span
              className="font-script font-bold text-7xl sm:text-8xl md:text-9xl xl:text-[9rem] text-transparent bg-clip-text block leading-[0.85] select-none"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #CBB079 0%, #E8D5A8 25%, #CBB079 50%, #A8905A 75%, #CBB079 100%)",
                backgroundSize: "200% auto",
                animation: "shimmerGold 6s linear infinite",
                filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.6))",
              }}
            >
              Hotel Vatika
            </span>
          </div>

          {/* ── Luxe Serif Subtitle ── */}
          <div className="hero-fade-in-3 mb-6">
            <h1 className="font-display text-2xl sm:text-3xl md:text-[2.4rem] xl:text-[2.8rem] text-[#F6F1E8] font-normal tracking-[0.06em] uppercase leading-tight drop-shadow-md">
              PURE VEG SANCTUARY
            </h1>
            <p className="font-serif-editorial text-sm sm:text-base text-[#F6F1E8]/65 mt-2 max-w-lg leading-relaxed italic">
              {t.hero.subTagline}
            </p>
          </div>

          {/* ── Breathing Glow Behind Title (ambient halo) ── */}
          <div
            className="hidden lg:block absolute -top-8 -left-16 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(203,176,121,0.08) 0%, transparent 70%)",
              animation: "breatheGlow 5s ease-in-out infinite",
            }}
            aria-hidden="true"
          />

          {/* ── Compact Rating Pill ── */}
          <a
            href={RESTAURANT_DATA.zomato.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-fade-in-4 inline-flex items-center space-x-2 mb-8 bg-[#143328]/80 hover:bg-[#183C2F] backdrop-blur-md border border-[#CBB079]/25 hover:border-[#CBB079]/60 rounded-full px-4 py-2 transition-all group"
          >
            <Star className="w-3.5 h-3.5 text-[#CBB079] fill-[#CBB079]" />
            <span className="text-xs text-[#F6F1E8] font-sans-clean font-medium tracking-wide">
              4.5
            </span>
            <span className="text-[10px] text-[#F6F1E8]/50 font-sans-clean">
              on Zomato • 3,140+ ratings
            </span>
          </a>

          {/* ── Dual CTA Pill Buttons ── */}
          <div className="hero-fade-in-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center justify-center bg-[#CBB079] hover:bg-[#E2CD9A] text-[#0D221A] px-8 py-3.5 rounded-full text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-300 hover:shadow-[0_10px_40px_rgba(203,176,121,0.4)]"
              style={{ animation: "ctaPulse 3s ease-in-out 2s infinite" }}
            >
              EXPLORE THE MENU
            </a>
            <a
              href="#celebrations"
              className="inline-flex items-center justify-center border border-[#CBB079]/50 hover:border-[#CBB079] bg-[#0D221A]/70 hover:bg-[#143328] text-[#F6F1E8] px-8 py-3.5 rounded-full text-xs tracking-[0.16em] uppercase font-medium transition-all duration-300 backdrop-blur-sm"
            >
              PLAN YOUR CELEBRATION
            </a>
          </div>
        </div>
      </div>

      {/* ═══ QUIET SCROLL HINT ═══ */}
      <a
        href="#the-place"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center space-y-1 text-[#F6F1E8]/35 hover:text-[#CBB079] transition-colors group cursor-pointer"
        aria-label="Scroll to explore"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-sans-clean group-hover:tracking-[0.4em] transition-all">
          {t.hero.scrollHint}
        </span>
        <ChevronDown className="w-4 h-4 text-[#CBB079]/60 animate-bounce" />
      </a>
    </section>
  );
};
