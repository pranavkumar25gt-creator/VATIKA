"use client";

import React from "react";
import { ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Language, translations } from "@/i18n";

interface FloatingCartBarProps {
  currentLang: Language;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({ currentLang }) => {
  const { totalCount, totalAmount, setIsDrawerOpen } = useCart();
  const t = translations[currentLang];

  if (totalCount === 0) return null;

  return (
    <aside
      className="fixed z-40 transition-all duration-300 ease-out animate-fadeIn bottom-[68px] sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md"
      aria-label="Floating pre-order cart"
    >
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="w-full flex items-center justify-between bg-[#143328]/95 hover:bg-[#183C2F] backdrop-blur-xl border border-[#CBB079]/50 hover:border-[#CBB079] rounded-2xl p-3 sm:px-5 sm:py-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(203,176,121,0.2)] group transition-all transform hover:-translate-y-0.5 cursor-pointer text-left"
      >
        {/* Left: Bag Icon with Live Gold Pulse Badge */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="relative shrink-0 w-10 h-10 rounded-xl bg-[#0D221A] border border-[#CBB079]/40 flex items-center justify-center text-[#CBB079] shadow-inner">
            <ShoppingBag className="w-5 h-5 text-[#CBB079] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#CBB079] text-[#0D221A] rounded-full text-[10px] font-mono font-bold flex items-center justify-center shadow-md animate-pulse">
              {totalCount}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-serif font-bold text-[#F6F1E8] tracking-wide">
                {totalCount} {totalCount === 1 ? "Dish" : "Dishes"} Selected
              </span>
              <Sparkles className="w-3 h-3 text-[#CBB079] opacity-80" />
            </div>
            <p className="text-[11px] font-mono text-[#CBB079] font-medium truncate">
              Estimated ₹{totalAmount} • Tap to Pre-order
            </p>
          </div>
        </div>

        {/* Right: Golden CTA Pill */}
        <div className="shrink-0 ml-3 flex items-center space-x-1.5 bg-[#CBB079] group-hover:bg-[#E2CD9A] text-[#0D221A] px-3.5 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors shadow-md">
          <span className="hidden xs:inline sm:inline">View Cart</span>
          <span className="xs:hidden sm:hidden">Cart</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </button>
    </aside>
  );
};
