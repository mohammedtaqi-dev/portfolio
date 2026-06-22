"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

export default function LoadingScreen() {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFading(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] bg-gray-50 dark:bg-slate-900 flex items-center justify-center transition-opacity duration-700 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800/50 flex items-center justify-center shadow-lg animate-scale-in border border-gray-200 dark:border-slate-700">
          <Logo size={40} />
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-500"
              style={{ animation: `bounce 0.6s ${i * 0.15}s infinite alternate` }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          from { transform: translateY(0); opacity: 0.3; }
          to { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
