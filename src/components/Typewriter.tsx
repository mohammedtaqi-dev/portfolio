"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ text, speed = 60, delay = 800 }: { text: string; speed?: number; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(timer); setDone(true); }
    }, speed);
    return () => clearInterval(timer);
  }, [started, text, speed]);

  return (
    <span>
      {displayed}
      <span className={`inline-block w-0.5 h-[1em] bg-indigo-500 ml-0.5 align-middle transition-opacity duration-700 ${done ? "opacity-0" : "animate-pulse opacity-100"}`} />
    </span>
  );
}
