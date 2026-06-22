"use client";

import { useRef, useState } from "react";

export default function ProjectCard({
  title, description, tags, liveUrl, gradient, mockupBg, featured,
}: {
  title: string; description: string; tags: string[]; liveUrl: string; gradient: string; mockupBg: string; featured?: boolean;
}) {
  function MockupPreview() {
    const screenshots: Record<string, string> = {
      Vantage: "/vantage-screenshot.png",
      Aura: "/aura-screenshot.png",
    };
    const src = screenshots[title];
    return src ? (
      <img src={src} alt={`${title} screenshot`} className="absolute inset-0 w-full h-full object-cover object-top" loading="lazy" />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-4xl font-bold text-white/30">{title.slice(0, 2).toUpperCase()}</span>
      </div>
    );
  }
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -8, y: x * 8 });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-hover card-glow rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 overflow-hidden group"
      style={{ transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      tabIndex={0}
    >
      <div className={`relative h-36 ${mockupBg} overflow-hidden`}>
        <div className="absolute top-0 left-0 right-0 h-6 bg-black/20 flex items-center gap-1.5 px-3">
          <span className="w-2 h-2 rounded-full bg-red-400/70" />
          <span className="w-2 h-2 rounded-full bg-amber-400/70" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
          <span className="ml-auto flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[7px] text-white/50 font-mono">Live</span>
          </span>
          <span className="text-[8px] text-white/40 font-mono ml-1.5">{title.toLowerCase()}</span>
        </div>
        <MockupPreview />
      </div>
      <div className={`h-1 ${gradient}`} />
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 group-hover:tracking-wide transition-all duration-300 flex items-center gap-2">{title}{featured && <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">Featured ⭐</span>}</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-slate-300 transition-colors duration-300">{description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 hover:scale-110 transition-all duration-200 cursor-default">{t}</span>
          ))}
        </div>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200 group/link"
          aria-label={`View ${title} live demo`}
        >
          <span className="group-hover/link:tracking-wider transition-all duration-300">Live Demo</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300"><path d="M7 17l9-9M19 5v14H5"/></svg>
        </a>
      </div>
    </div>
  );
}
