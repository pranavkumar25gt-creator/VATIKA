import React from "react";

interface DevPhotoBadgeProps {
  label?: string;
  category?: string;
}

export const DevPhotoBadge: React.FC<DevPhotoBadgeProps> = ({
  label = "REAL OWNER PHOTOGRAPHY SLOT",
  category,
}) => {
  // Only display in development mode
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="absolute top-3 right-3 z-20 pointer-events-none">
      <div className="bg-[#0E0C0A]/90 border border-[#B8893B]/60 text-[#B8893B] text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded shadow-lg backdrop-blur-sm flex items-center space-x-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8893B] animate-pulse" />
        <span>{category ? `${category.toUpperCase()} • ` : ""}{label}</span>
      </div>
    </div>
  );
};
