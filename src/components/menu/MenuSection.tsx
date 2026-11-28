"use client";

import React, { useState, useMemo } from "react";
import { Search, ShoppingBag, ExternalLink } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS, MenuCategoryId } from "@/data/menu";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Language, translations } from "@/i18n";
import { MenuItemCard } from "./MenuItemCard";
import { useCart } from "@/context/CartContext";

interface MenuSectionProps {
  currentLang: Language;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ currentLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, addToCart, removeFromCart, totalCount, setIsDrawerOpen } = useCart();

  const t = translations[currentLang];

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.en.toLowerCase().includes(q) ||
        item.name.mr.toLowerCase().includes(q) ||
        item.name.hi.toLowerCase().includes(q) ||
        item.description.en.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="relative py-20 md:py-32 bg-[#0D221A] overflow-hidden border-t border-[#F6F1E8]/10">
      {/* Anchor for legacy or external #full-menu links */}
      <div id="full-menu" className="-mt-20 pt-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#F6F1E8]/10">
          <div>
            <span className="font-script text-3xl sm:text-4xl text-[#CBB079] block mb-1">
              Culinary Repertoire
            </span>
            <div className="flex items-center space-x-2 text-[11px] tracking-[0.3em] uppercase text-[#CBB079]/80 font-mono mb-2">
              <span>{t.menu.sectionTag}</span>
              <span>—</span>
              <span>TRADITION &amp; TASTE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#F6F1E8] font-light tracking-[0.02em]">
              {t.menu.title}
            </h2>
          </div>

          {/* Zomato Online Order Button */}
          <div className="mt-5 md:mt-0 flex items-center space-x-4">
            <a
              href={RESTAURANT_DATA.zomato.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#E23744] hover:bg-[#c92f3b] text-white px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-semibold transition-all shadow-lg active:scale-95"
            >
              <span>{t.menu.orderOnZomato}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Search Bar + Sticky Category Chips */}
        <div className="sticky top-16 z-20 bg-[#0D221A]/95 backdrop-blur-md pt-2 pb-4 border-b border-[#F6F1E8]/10 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F6F1E8]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.menu.searchPlaceholder}
                className="w-full bg-[#143328] border border-[#F6F1E8]/15 text-[#F6F1E8] text-xs pl-10 pr-12 py-2.5 rounded-full focus:border-[#CBB079] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#F6F1E8]/50 hover:text-[#CBB079] font-mono cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Cart Pill inside Menu */}
            {totalCount > 0 && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="inline-flex items-center justify-center space-x-2 bg-[#CBB079] hover:bg-[#E2CD9A] text-[#0D221A] px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-md cursor-pointer animate-fadeIn"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Selected Dishes ({totalCount})</span>
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 whitespace-nowrap rounded-full border text-xs uppercase tracking-wider font-mono transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-bold shadow"
                  : "border-[#F6F1E8]/15 bg-[#143328]/60 text-[#F6F1E8]/70 hover:text-[#F6F1E8] hover:border-[#CBB079]/40"
              }`}
            >
              {t.menu.allCategories} ({MENU_ITEMS.length})
            </button>

            {MENU_CATEGORIES.map((cat) => {
              const count = MENU_ITEMS.filter((i) => i.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 whitespace-nowrap rounded-full border text-xs uppercase tracking-wider font-mono transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-bold shadow"
                      : "border-[#F6F1E8]/15 bg-[#143328]/60 text-[#F6F1E8]/70 hover:text-[#F6F1E8] hover:border-[#CBB079]/40"
                  }`}
                >
                  {cat.name[currentLang]} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#F6F1E8]/10 p-6 rounded-2xl">
            <p className="font-display text-xl text-[#F6F1E8]/60 mb-2">
              No dishes found matching &quot;{searchQuery}&quot;.
            </p>
            <p className="text-xs text-[#F6F1E8]/40 font-mono">
              Try searching with another keyword or tap a category above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item) => {
              const cartEntry = cart.find((c) => c.item.id === item.id);
              const qty = cartEntry ? cartEntry.quantity : 0;

              return (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  currentLang={currentLang}
                  quantityInCart={qty}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                />
              );
            })}
          </div>
        )}

        {/* Menu Notice & Counter Policy */}
        <div className="mt-12 p-4 bg-[#143328]/60 rounded-xl border border-[#F6F1E8]/10 text-center">
          <p className="text-xs text-[#F6F1E8]/60 max-w-2xl mx-auto leading-relaxed">
            * {t.menu.disclaimerPrice} We prepare all gravies fresh in-house using pure milk paneer, ghee, and roasted whole spices.
          </p>
        </div>
      </div>
    </section>
  );
};
