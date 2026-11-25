"use client";

import React, { useEffect, useState } from "react";

interface MicroLoaderProps {
  onComplete?: () => void;
}

export const MicroLoader: React.FC<MicroLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    // Check if visitor has already seen the loader in this session
    const hasVisited = sessionStorage.getItem("vatika_visited");
    if (hasVisited) {
      setVisible(false);
      onComplete?.();
      return;
    }

    // Fast, calm progress animation (< 1.1s total)
    const startTime = performance.now();
    const duration = 950; // ms

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const current = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        sessionStorage.setItem("vatika_visited", "true");
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 180);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D221A] transition-opacity duration-500 ease-out ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Hotel Vatika experience"
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 text-center">
        {/* Minimal Monogram Emblem */}
        <div className="mb-4">
          <span className="font-script text-5xl md:text-6xl text-[#F6F1E8] font-normal tracking-wide block">
            Hotel Vatika
          </span>
          <p className="text-[10px] tracking-[0.35em] text-[#CBB079] uppercase mt-2 font-mono">
            Parbhani • Pure Veg
          </p>
        </div>

        {/* Razor-thin gold loading line */}
        <div className="w-48 h-[1px] bg-[#F6F1E8]/15 relative overflow-hidden my-4">
          <div
            className="h-full bg-[#CBB079] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress numeral in refined tabular tracking */}
        <div className="text-[10px] tracking-[0.3em] text-[#F6F1E8]/40 font-mono">
          {progress < 10 ? `0${progress}` : progress}%
        </div>
      </div>
    </div>
  );
};
