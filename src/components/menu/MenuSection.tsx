"use client";

import React, { useState, useMemo } from "react";
import { Search, ShoppingBag, ExternalLink, Filter } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem, MenuCategoryId } from "@/data/menu";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { Language, translations } from "@/i18n";
import { MenuItemCard } from "./MenuItemCard";
import { EnquiryDrawer, CartItem } from "./EnquiryDrawer";

interface MenuSectionProps {
  currentLang: Language;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ currentLang }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map((c) =>
          c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c
        );
      }
      return prev.filter((c) => c.item.id !== itemId);
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === itemId);
      if (!existing) return prev;
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        return prev.filter((c) => c.item.id !== itemId);
      }
      return prev.map((c) =>
        c.item.id === itemId ? { ...c, quantity: newQty } : c
      );
    });
  };

  const totalCartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <section id="menu" className="relative py-28 md:py-36 bg-[#0D221A] overflow-hidden border-t border-[#F6F1E8]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#F6F1E8]/10">
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
          <div className="mt-6 md:mt-0 flex items-center space-x-4">
            <a
              href={RESTAURANT_DATA.zomato.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#E23744] hover:bg-[#c92f3b] text-white px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all shadow-lg"
            >
              <span>{t.menu.orderOnZomato}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Search Bar + Sticky Category Chips */}
        <div className="sticky top-16 z-30 bg-[#0D221A]/95 backdrop-blur-md pt-3 pb-5 border-b border-[#F6F1E8]/10 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F6F1E8]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.menu.searchPlaceholder}
                className="w-full bg-[#143328] border border-[#F6F1E8]/15 text-[#F6F1E8] text-xs pl-10 pr-4 py-2.5 rounded-full focus:border-[#CBB079] focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#F6F1E8]/40 hover:text-[#F6F1E8]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Floating / Sticky Cart Pill Trigger */}
            {totalCartCount > 0 && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="inline-flex items-center space-x-2 bg-[#CBB079] hover:bg-[#E2CD9A] text-[#0D221A] px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-xl animate-fadeIn"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Enquiry List ({totalCartCount})
                </span>
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-4 pb-1 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-1.5 whitespace-nowrap rounded-full border text-xs uppercase tracking-wider font-mono transition-all ${
                selectedCategory === "all"
                  ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-semibold"
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
                  className={`px-4 py-1.5 whitespace-nowrap rounded-full border text-xs uppercase tracking-wider font-mono transition-all ${
                    selectedCategory === cat.id
                      ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-semibold"
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
          <div className="text-center py-20 border border-dashed border-[#F6F1E8]/10 p-8 rounded-2xl">
            <p className="font-display text-2xl text-[#F6F1E8]/50 mb-2">
              No dishes found matching your search.
            </p>
            <p className="text-xs text-[#F6F1E8]/40 font-mono">
              Try searching with another keyword or explore all sections.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const cartEntry = cart.find((c) => c.item.id === item.id);
              const qty = cartEntry ? cartEntry.quantity : 0;

              return (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  currentLang={currentLang}
                  quantityInCart={qty}
                  onAddToCart={handleAddToCart}
                  onRemoveFromCart={handleRemoveFromCart}
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

      {/* Slide-Over Enquiry Drawer */}
      <EnquiryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cart={cart}
        currentLang={currentLang}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCart([])}
      />
    </section>
  );
};
