"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Detect touch-only mobile devices to avoid touch hijacking jank
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 1024;

    let lenis: Lenis | null = null;

    if (!isTouchDevice) {
      // Initialize Lenis strictly on desktop for luxurious mousewheel inertia
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      lenisRef.current = lenis;
      (window as unknown as { lenis: Lenis }).lenis = lenis;

      let rafId: number;
      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(rafId);
        lenis?.destroy();
        lenisRef.current = null;
        delete (window as unknown as { lenis?: Lenis }).lenis;
      };
    } else {
      // On mobile devices, enable smooth native scrolling without touch interception
      document.documentElement.style.scrollBehavior = "smooth";
      return () => {
        document.documentElement.style.scrollBehavior = "";
      };
    }
  }, []);

  // Global anchor click listener for buttery smooth scrolling across both desktop & mobile
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          const win = window as unknown as { lenis?: Lenis };
          if (win.lenis) {
            win.lenis.scrollTo(targetElement as HTMLElement, {
              offset: -75,
              duration: 1.1,
            });
          } else {
            const top = targetElement.getBoundingClientRect().top + window.scrollY - 75;
            window.scrollTo({
              top,
              behavior: "smooth",
            });
          }
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return <>{children}</>;
};
