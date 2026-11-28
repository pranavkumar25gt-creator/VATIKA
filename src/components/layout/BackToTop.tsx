"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { totalCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      setIsVisible(currentScroll > 400);
      setScrollProgress(totalScroll > 0 ? Math.min(100, (currentScroll / totalScroll) * 100) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const win = window as unknown as { lenis?: { scrollTo: (target: number | string) => void } };
    if (win.lenis) {
      win.lenis.scrollTo(0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  if (!isVisible) return null;

  const size = 42;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed z-40 transition-all duration-300 ease-out flex items-center justify-center rounded-full bg-[#102820]/95 hover:bg-[#143328] backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.7)] border border-[#CBB079]/35 hover:border-[#CBB079] group cursor-pointer focus:outline-none active:scale-90 ${
        totalCount > 0
          ? "bottom-[134px] right-4 sm:bottom-6 sm:left-6"
          : "bottom-[70px] right-4 sm:bottom-6 sm:left-6"
      }`}
      style={{ width: size, height: size }}
    >
      {/* SVG Progress Ring */}
      <svg
        className="absolute inset-0 -rotate-90 pointer-events-none"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(203, 176, 121, 0.15)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#CBB079"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-75 ease-out"
        />
      </svg>

      <ChevronUp className="w-4 h-4 text-[#CBB079] group-hover:text-[#E2CD9A] group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
