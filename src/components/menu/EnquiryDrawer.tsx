"use client";

import React, { useState } from "react";
import { X, Trash2, Send, MessageSquare } from "lucide-react";
import { MenuItem } from "@/data/menu";
import { RESTAURANT_DATA } from "@/data/restaurant";
import { buildWhatsAppMenuEnquiryUrl } from "@/data/celebrations";
import { Language, translations } from "@/i18n";

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface EnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currentLang: Language;
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

export const EnquiryDrawer: React.FC<EnquiryDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currentLang,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [guestName, setGuestName] = useState("");
  const [diningType, setDiningType] = useState<"dine-in" | "takeaway" | "party">("dine-in");
  const [notes, setNotes] = useState("");

  const t = translations[currentLang];

  const totalEstimated = cart.reduce(
    (sum, entry) => sum + entry.item.price * entry.quantity,
    0
  );

  const totalItemCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0D221A]/85 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-[#102820] border-l border-[#CBB079]/25 h-full flex flex-col justify-between shadow-2xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Menu Enquiry & Pre-order List"
      >
        {/* Drawer Header */}
        <div className="p-5 md:p-6 border-b border-[#F6F1E8]/10 flex items-center justify-between bg-[#143328]">
          <div>
            <div className="text-[10px] tracking-[0.25em] text-[#CBB079] font-mono uppercase mb-0.5">
              PRE-ORDER &amp; ENQUIRY
            </div>
            <h3 className="font-display text-2xl text-[#F6F1E8] font-light">
              {t.menu.enquiryCart}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#F6F1E8]/60 hover:text-[#CBB079] transition-colors"
            aria-label="Close enquiry drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Items List */}
        <div className="p-5 md:p-6 flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-[#F6F1E8]/40 text-xs font-mono">
              <MessageSquare className="w-8 h-8 mx-auto mb-3 opacity-30 text-[#CBB079]" />
              <p>Your enquiry list is currently empty.</p>
              <p className="mt-1 text-[11px] text-[#F6F1E8]/30">Tap &apos;Enquire&apos; on any dish in the menu to assemble a pre-order.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((entry) => (
                <div
                  key={entry.item.id}
                  className="flex items-center justify-between p-3 bg-[#143328] rounded-xl border border-[#CBB079]/20"
                >
                  <div className="flex-1 pr-3">
                    <h5 className="font-display text-base text-[#F6F1E8]">
                      {entry.item.name[currentLang]}
                    </h5>
                    <span className="text-[11px] font-mono text-[#CBB079]">
                      ₹{entry.item.price} each
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, -1)}
                      className="w-6 h-6 rounded-full border border-[#F6F1E8]/20 text-[#F6F1E8] hover:border-[#CBB079] flex items-center justify-center text-xs"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-mono text-[#F6F1E8]">
                      {entry.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(entry.item.id, 1)}
                      className="w-6 h-6 rounded-full border border-[#F6F1E8]/20 text-[#F6F1E8] hover:border-[#CBB079] flex items-center justify-center text-xs"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={onClearCart}
                className="inline-flex items-center space-x-1.5 text-[11px] text-[#F6F1E8]/40 hover:text-red-400 font-mono transition-colors pt-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.menu.clearCart}</span>
              </button>
            </div>
          )}

          {cart.length > 0 && (
            <div className="pt-6 border-t border-[#F6F1E8]/10 space-y-4">
              {/* Dining Mode */}
              <div>
                <label className="block text-[10px] tracking-widest text-[#CBB079] font-mono uppercase mb-2">
                  Dining Preference
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {(["dine-in", "takeaway", "party"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setDiningType(mode)}
                      className={`py-2 px-2 rounded-full border text-center uppercase tracking-wider transition-colors ${
                        diningType === mode
                          ? "border-[#CBB079] bg-[#CBB079]/15 text-[#F6F1E8] font-medium"
                          : "border-[#F6F1E8]/15 text-[#F6F1E8]/50 hover:text-[#F6F1E8]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Name & Notes */}
              <div>
                <label className="block text-[10px] tracking-widest text-[#CBB079] font-mono uppercase mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Rahul Patil"
                  className="w-full bg-[#143328] border border-[#F6F1E8]/15 rounded-lg text-[#F6F1E8] text-xs px-3 py-2 focus:border-[#CBB079] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] tracking-widest text-[#CBB079] font-mono uppercase mb-1">
                  Notes / Timing / Special Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Table for 4 at 8:00 PM, medium spicy"
                  className="w-full bg-[#143328] border border-[#F6F1E8]/15 rounded-lg text-[#F6F1E8] text-xs px-3 py-2 focus:border-[#CBB079] focus:outline-none resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer & Action Button */}
        <div className="p-5 md:p-6 border-t border-[#F6F1E8]/15 bg-[#143328] space-y-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-[#F6F1E8]/60">
              Estimated Total ({totalItemCount} {t.menu.itemsSelected})
            </span>
            <span className="font-serif text-lg text-[#CBB079] font-semibold">
              ₹{totalEstimated}
            </span>
          </div>

          <p className="text-[10px] text-[#F6F1E8]/40 leading-normal">
            {t.menu.disclaimerPrice}
          </p>

          <button
            onClick={handleSendWhatsApp}
            disabled={cart.length === 0}
            className={`w-full py-3.5 px-4 rounded-full flex items-center justify-center space-x-2 text-xs tracking-[0.18em] uppercase font-medium transition-all ${
              cart.length > 0
                ? "bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold shadow-xl cursor-pointer"
                : "bg-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.menu.sendWhatsAppEnquiry}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
