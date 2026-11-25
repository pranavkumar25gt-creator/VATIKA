import React from "react";

interface VegBadgeProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const VegBadge: React.FC<VegBadgeProps> = ({ size = "md", label }) => {
  const boxDim = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  const circleDim = size === "sm" ? "w-1.5 h-1.5" : size === "lg" ? "w-2.5 h-2.5" : "w-2 h-2";

  return (
    <span className="inline-flex items-center space-x-1.5" title="100% Pure Vegetarian" aria-label="Pure Vegetarian">
      <span className={`inline-flex items-center justify-center border border-[#2E7D32] bg-[#2E7D32]/10 rounded-[2px] p-[1.5px] ${boxDim}`}>
        <span className={`rounded-full bg-[#2E7D32] ${circleDim}`} />
      </span>
      {label && <span className="text-[11px] tracking-wider text-[#2E7D32] font-medium uppercase">{label}</span>}
    </span>
  );
};
