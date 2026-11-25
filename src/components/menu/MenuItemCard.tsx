"use client";

import React from "react";
import { Plus, Minus, Check, Flame } from "lucide-react";
import { MenuItem } from "@/data/menu";
import { Language } from "@/i18n";
import { VegBadge } from "../ui/VegBadge";

interface MenuItemCardProps {
  item: MenuItem;
  currentLang: Language;
  quantityInCart: number;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (itemId: string) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  currentLang,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
}) => {
  return (
    <div className="group relative bg-[#143328]/85 backdrop-blur-sm rounded-2xl border border-[#CBB079]/20 hover:border-[#CBB079]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl">
      {/* Optional Photo Header if photo exists */}
      {item.image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#102820]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.name[currentLang]}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#143328] via-transparent to-transparent opacity-85" />

          {/* Badges on photo */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            {item.isChefSpecial && (
              <span className="bg-[#CBB079] text-[#0D221A] text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full font-semibold shadow">
                Chef&apos;s Special
              </span>
            )}
            {item.isPopular && (
              <span className="bg-[#0D221A]/90 text-[#F6F1E8] border border-[#F6F1E8]/20 text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full">
                Popular
              </span>
            )}
          </div>
        </div>
      )}

      {/* Item Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Dietary + Title + Price Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-start space-x-2">
              <span className="mt-1">
                <VegBadge size="sm" />
              </span>
              <div>
                <h4 className="font-display text-lg sm:text-xl text-[#F6F1E8] font-light leading-snug group-hover:text-[#CBB079] transition-colors">
                  {item.name[currentLang]}
                </h4>
                {item.servingSize && (
                  <span className="text-[10px] text-[#F6F1E8]/40 font-mono tracking-wider">
                    {item.servingSize}
                  </span>
                )}
              </div>
            </div>

            {/* INR Price */}
            <div className="text-right">
              <span className="font-serif text-lg font-normal text-[#CBB079]">
                ₹{item.price}
              </span>
            </div>
          </div>

          {/* Mouthwatering Description */}
          <p className="font-sans-clean text-xs text-[#F6F1E8]/70 leading-relaxed mb-4">
            {item.description[currentLang]}
          </p>
        </div>

        {/* Footer: Spice Level & Enquiry Action */}
        <div className="pt-3 border-t border-[#F6F1E8]/10 flex items-center justify-between">
          {/* Spice indicators */}
          <div className="flex items-center space-x-1" title={`Spice level: ${item.spiceLevel || 1} of 3`}>
            {item.spiceLevel ? (
              Array.from({ length: item.spiceLevel }).map((_, i) => (
                <Flame key={i} className="w-3 h-3 text-[#E65100]" />
              ))
            ) : (
              <span className="text-[10px] text-[#F6F1E8]/30 font-mono">Mild</span>
            )}
          </div>

          {/* Add to Enquiry / Pre-Order Action */}
          <div>
            {quantityInCart === 0 ? (
              <button
                onClick={() => onAddToCart(item)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#CBB079]/40 hover:border-[#CBB079] bg-[#CBB079]/10 hover:bg-[#CBB079] text-[#F6F1E8] hover:text-[#0D221A] text-[11px] tracking-wider uppercase font-mono transition-all font-medium"
              >
                <Plus className="w-3 h-3" />
                <span>Enquire</span>
              </button>
            ) : (
              <div className="flex items-center border border-[#CBB079] bg-[#183C2F] rounded-full overflow-hidden">
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="px-2.5 py-1 text-xs text-[#F6F1E8] hover:text-[#CBB079] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-2 text-xs font-mono text-[#CBB079] font-semibold">
                  {quantityInCart}
                </span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="px-2.5 py-1 text-xs text-[#F6F1E8] hover:text-[#CBB079] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
