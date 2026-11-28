"use client";

import React, { useState, useEffect } from "react";
import { X, Trash2, Send, MessageSquare, Plus, Minus, Sparkles } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { buildWhatsAppMenuEnquiryUrl } from "@/data/celebrations";
import { Language, translations } from "@/i18n";
import { useCart } from "@/context/CartContext";

interface EnquiryDrawerProps {
  currentLang: Language;
}

export const EnquiryDrawer: React.FC<EnquiryDrawerProps> = ({ currentLang }) => {
  const { cart, isDrawerOpen, setIsDrawerOpen, updateQuantity, clearCart, totalAmount, totalCount } =
    useCart();
  const [guestName, setGuestName] = useState("");
  const [diningType, setDiningType] = useState<"dine-in" | "takeaway" | "party">("dine-in");
  const [notes, setNotes] = useState("");

  const t = translations[currentLang];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsDrawerOpen(false);
    };
    if (isDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, setIsDrawerOpen]);

  const handleSendWhatsApp = () => {
    if (cart.length === 0) return;

    const url = buildWhatsAppMenuEnquiryUrl({
      items: cart.map((c) => ({
        name: c.item.name[currentLang] || c.item.name.en,
        quantity: c.quantity,
        price: c.item.price,
      })),
      contactNumber: RESTAURANT_DATA.contact.whatsappNumber,
      guestName: guestName.trim() || undefined,
      diningType,
      notes: notes.trim() || undefined,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsDrawerOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Pre-order selection drawer"
    >
      <div
        className="relative w-full max-w-md bg-[#102820] border-l border-[#CBB079]/30 h-[100dvh] flex flex-col justify-between shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#F6F1E8]/10 flex items-center justify-between bg-[#143328]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D221A] border border-[#CBB079]/40 flex items-center justify-center text-[#CBB079]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9.5px] tracking-[0.28em] text-[#CBB079] font-mono uppercase font-bold">
                HOTEL VATIKA • PRE-ORDER
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-[#F6F1E8] font-normal">
                {t.menu.enquiryCart}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 text-[#F6F1E8]/60 hover:text-[#CBB079] transition-colors rounded-lg hover:bg-white/5 cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Items Scroll Area */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 text-[#F6F1E8]/40 text-xs font-mono">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#CBB079]" />
              <p className="font-display text-lg text-[#F6F1E8]/60 mb-1">Your cart is empty.</p>
              <p className="mt-1 text-[11px] text-[#F6F1E8]/40">
                Tap &apos;ADD&apos; on any delicacy in the menu to build your feast.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#F6F1E8]/60 pb-1 border-b border-[#F6F1E8]/10 font-mono">
                <span>{totalCount} Dishes Selected</span>
                <button
                  onClick={clearCart}
                  className="inline-flex items-center space-x-1 text-[11px] text-[#F6F1E8]/50 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>

              {cart.map((entry) => (
                <div
                  key={entry.item.id}
                  className="flex items-center justify-between p-3 bg-[#143328] rounded-xl border border-[#CBB079]/20 shadow-sm"
                >
                  <div className="flex-1 pr-3 min-w-0">
                    <h5 className="font-display text-base text-[#F6F1E8] truncate font-normal">
                      {entry.item.name[currentLang]}
                    </h5>
                    <span className="text-[11px] font-mono text-[#CBB079] font-medium">
                      ₹{entry.item.price * entry.quantity} (₹{entry.item.price} each)
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 border border-[#CBB079]/40 bg-[#0D221A] rounded-full p-0.5">
                    <button
                      onClick={() => updateQuantity(entry.item.id, -1)}
                      className="w-6 h-6 rounded-full text-[#F6F1E8] hover:text-[#CBB079] hover:bg-white/5 flex items-center justify-center text-xs cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-mono text-[#CBB079] font-bold">
                      {entry.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(entry.item.id, 1)}
                      className="w-6 h-6 rounded-full text-[#F6F1E8] hover:text-[#CBB079] hover:bg-white/5 flex items-center justify-center text-xs cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="pt-4 border-t border-[#F6F1E8]/10 space-y-3.5">
              {/* Dining Mode */}
              <div>
                <label className="block text-[10px] tracking-widest text-[#CBB079] font-mono uppercase mb-1.5 font-bold">
                  Dining Preference
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {(["dine-in", "takeaway", "party"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setDiningType(mode)}
                      className={`py-2 px-1 rounded-xl border text-center uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
                        diningType === mode
                          ? "border-[#CBB079] bg-[#CBB079] text-[#0D221A] font-bold shadow"
                          : "border-[#F6F1E8]/15 text-[#F6F1E8]/60 hover:text-[#F6F1E8]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Name & Notes */}
              <div>
                <label className="block text-[10px] tracking-widest text-[#CBB079] font-mono uppercase mb-1 font-bold">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rahul Patil"
                  className="w-full bg-[#143328] border border-[#F6F1E8]/15 rounded-xl text-[#F6F1E8] text-xs px-3.5 py-2.5 focus:border-[#CBB079] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-widest text-[#CBB079] font-mono uppercase mb-1 font-bold">
                  Notes / Timing / Special Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Table for 4 at 8:00 PM, medium spicy"
                  className="w-full bg-[#143328] border border-[#F6F1E8]/15 rounded-xl text-[#F6F1E8] text-xs px-3.5 py-2.5 focus:border-[#CBB079] focus:outline-none resize-none transition-colors"
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 sm:p-5 border-t border-[#F6F1E8]/15 bg-[#143328] space-y-3.5 shrink-0">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-[#F6F1E8]/70">
              Estimated Total
            </span>
            <span className="font-serif text-2xl text-[#CBB079] font-bold">
              ₹{totalAmount}
            </span>
          </div>

          <p className="text-[10.5px] text-[#F6F1E8]/50 leading-tight">
            * Direct reservation &amp; pre-order sent to Hotel Vatika kitchen desk on WhatsApp.
          </p>

          <button
            onClick={handleSendWhatsApp}
            disabled={cart.length === 0}
            className={`w-full py-3.5 px-4 rounded-full flex items-center justify-center space-x-2 text-xs tracking-[0.16em] uppercase font-bold transition-all shadow-xl ${
              cart.length > 0
                ? "bg-[#25D366] hover:bg-[#20ba59] text-black cursor-pointer active:scale-95"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Send Pre-order via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
