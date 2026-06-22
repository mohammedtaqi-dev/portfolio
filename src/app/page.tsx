"use client";

import { useEffect, useState, useMemo } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import ProjectCard from "@/components/ProjectCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import Typewriter from "@/components/Typewriter";
import LoadingScreen from "@/components/LoadingScreen";
import Logo from "@/components/Logo";

const NAV_ITEMS = ["about", "projects", "what-i-do", "process", "skills", "contact"] as const;

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useScroll() {
  const [state, setState] = useState({ scrollY: 0, progress: 0 });
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setState({ scrollY: window.scrollY, progress: (window.scrollY / max) * 100 });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return state;
}

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );
    NAV_ITEMS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

function SectionDivider() {
  return (
    <div className="relative h-16 overflow-hidden">
      <svg viewBox="0 0 1440 64" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
        <path d="M0,28 C360,56 720,0 1080,28 C1260,42 1350,14 1440,28 L1440,64 L0,64 Z" className="fill-gray-100 dark:fill-slate-800/30" />
      </svg>
    </div>
  );
}

export default function Home() {
  useReveal();
  const { scrollY, progress: scrollProgress } = useScroll();
  const scrolled = scrollY > 20;
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const labels: Record<string, string> = { about: "About", projects: "Projects", "what-i-do": "What I Do", process: "Process", skills: "Skills", contact: "Contact" };
    document.title = activeSection ? `${labels[activeSection] || "Home"} — Mohammed Taqi Uddin` : "Mohammed Taqi Uddin | Developer";
  }, [activeSection]);

  const projects = [
    {
      title: "Vantage",
      description: "A premium e-commerce dashboard for managing products, orders, and analytics. Features real-time CRUD, CSV export, dark mode, PWA support, and interactive charts.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "PWA", "Recharts", "Vercel"],
      liveUrl: "https://vantage-orpin.vercel.app",
      gradient: "bg-gradient-to-r from-indigo-500 to-violet-600",
      mockupBg: "bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800",
      featured: true,
    },
    {
      title: "Quik",
      description: "A premium quiz app with 4 game modes, lifelines, flashcards, daily streaks, ghost mode, leaderboards, sound packs, and 20+ categories — built to compete with Quizizz and Quizlet.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "PWA", "Open Trivia DB", "Vercel"],
      liveUrl: "https://quik-cyan.vercel.app",
      gradient: "bg-gradient-to-r from-violet-500 to-teal-600",
      mockupBg: "bg-gradient-to-br from-violet-600 via-purple-700 to-teal-800",
      featured: true,
    },
    {
      title: "Aura",
      description: "A wellness tracking app for monitoring health habits, mood, and fitness goals. Built with a clean, calming UI and daily streak tracking, PWA support, and data export.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "PWA", "Notifications", "Vercel"],
      liveUrl: "https://aura-mu-sandy.vercel.app",
      gradient: "bg-gradient-to-r from-emerald-500 to-teal-600",
      mockupBg: "bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800",
    },
  ];

  const skills = [
    { name: "Next.js", icon: "nextdotjs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "JavaScript", icon: "javascript" },
    { name: "Tailwind CSS", icon: "tailwindcss" },
    { name: "React", icon: "react" },
    { name: "HTML5", icon: "html5" },
    { name: "Node.js", icon: "nodedotjs" },
    { name: "Git", icon: "git" },
    { name: "PWA", icon: "pwa" },
    { name: "CSS3", icon: "css3" },
    { name: "Vercel", icon: "vercel" },
    { name: "GitHub", icon: "github" },
    { name: "npm", icon: "npm" },
  ];

  const particles = useMemo(() =>
    Array.from({ length: 12 }).map(() => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${12 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * -20}s`,
      width: `${2 + Math.random() * 3}px`,
      height: `${2 + Math.random() * 3}px`,
      opacity: 0.3 + Math.random() * 0.3,
    })), []
  );

  return (
    <>
      <LoadingScreen />
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {particles.map((s, i) => (
          <div key={i} className="particle" style={s} />
        ))}
      </div>
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-gray-200 dark:bg-slate-700">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-150" style={{ width: `${scrollProgress}%` }} />
      </div>
      <div className="min-h-screen">
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-indigo-500/5" : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md"} border-b border-gray-200 dark:border-slate-700/50`}>
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="#" className="group/logo flex items-center gap-3 rounded-xl px-3 py-1.5 -mx-3 transition-all duration-200 hover:bg-indigo-50/50 dark:hover:bg-indigo-500/10 hover:shadow-sm hover:-translate-y-0.5"><Logo size={28} /><span className="text-sm font-semibold text-gray-900 dark:text-white transition-all duration-200 group-hover/logo:text-indigo-600 dark:group-hover/logo:text-indigo-400">Mohammed Taqi Uddin</span></a>
            <div className="hidden md:flex items-center gap-6">
              {NAV_ITEMS.map((id) => (
                <a key={id} href={`#${id}`} className={`nav-link text-sm transition-colors ${activeSection === id ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"}`} aria-current={activeSection === id ? "page" : undefined}>
                  {id === "what-i-do" ? "What I Do" : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
              <ThemeToggle />
            </div>
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label={mobileOpen ? "Close menu" : "Menu"}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={mobileOpen ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} /></svg>
              </button>
            </div>
          </div>
          {mobileOpen && (
            <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700/50 animate-slide-down">
              <div className="px-6 py-4 flex flex-col gap-2">
                {NAV_ITEMS.map((id) => (
                  <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)} className={`text-sm py-2 transition-colors ${activeSection === id ? "text-indigo-600 dark:text-indigo-400 font-medium" : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white"}`} aria-current={activeSection === id ? "page" : undefined}>
                    {id === "what-i-do" ? "What I Do" : id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-16">
          <div className="max-w-3xl text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-8 available-badge">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Open to Work — internships
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 min-h-[1.2em]">
              Hi, I&apos;m{" "}
              <span className="gradient-text"><Typewriter text="Mohammed Taqi Uddin" speed={160} delay={400} /></span>
            </h1>
            <p className="text-lg text-gray-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-10 animate-fade-up delay-300">
              A 13-year-old developer crafting premium web apps with Next.js, TypeScript, and Tailwind. Currently seeking an internship to grow on a real engineering team.
            </p>
            <div className="flex items-center justify-center gap-4 animate-fade-up delay-400">
              <a href="#projects" className="btn-primary px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium shadow-md hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300">View Projects</a>
              <a href="#contact" className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 text-sm font-medium border border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:scale-105 transition-all duration-300">Contact Me</a>
            </div>
          </div>
        </section>

        <SectionDivider />
        <section id="about" className="relative z-10 px-6 py-24 bg-white/50 dark:bg-slate-800/20" style={{ scrollMarginTop: 80 }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 reveal">About Me</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-12 reveal delay-100">A quick overview of who I am.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal delay-200">
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  I&apos;m a 13-year-old developer passionate about building modern, premium web applications. I started coding with basic HTML and CSS, then quickly moved to JavaScript, React, Next.js, and TypeScript.
                </p>
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed">
                  Every project I build is a step forward — from simple static pages to full-featured apps with dark mode, PWA support, charts, and real-time data. I focus on clean design, smooth interactions, and solid code.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Years Coding", value: 2, suffix: "+" },
                  { label: "Apps Deployed", value: 3 },
                  { label: "Tech Stack", value: 11, suffix: "+" },
                  { label: "Lines of Code", value: 10, suffix: "K+" },
                ].map((stat, i) => (
                  <div key={stat.label} className={`stagger-item stagger-delay-${Math.min(i + 1, 10)} rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 text-center card-hover`}>
                    <p className="text-2xl font-bold gradient-text"><AnimatedCounter value={stat.value} suffix={stat.suffix || ""} /></p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />
        <section id="projects" className="relative z-10 px-6 py-24" style={{ scrollMarginTop: 80 }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 reveal">Projects</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-12 reveal delay-100">Real applications I&apos;ve built and deployed.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal delay-200">
              {projects.map((p) => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />
        <section id="what-i-do" className="relative z-10 px-6 py-24 bg-white/50 dark:bg-slate-800/20" style={{ scrollMarginTop: 80 }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 reveal">What I Do</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-12 reveal delay-100">The kind of applications I build.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal delay-200">
              {[
                { title: "Dashboards", desc: "Full-featured admin panels with real-time data, charts, CRUD operations, and filtering.", icon: "📊" },
                { title: "Web Apps", desc: "Modern single-page and multi-page applications with routing, state management, and APIs.", icon: "🌐" },
                { title: "PWAs", desc: "Progressive web apps that install on phones and desktops, work offline, and feel native.", icon: "📱" },
                { title: "Dark Mode", desc: "Seamless light/dark themes with smooth transitions and per-page accent colors.", icon: "🌙" },
                { title: "Data Viz", desc: "Interactive charts, graphs, and analytics dashboards using Recharts and custom SVGs.", icon: "📈" },
                { title: "Export & Backup", desc: "CSV export, JSON backup/restore, and local storage persistence for offline-first apps.", icon: "💾" },
              ].map((item, i) => (
                <div key={item.title} className={`stagger-item stagger-delay-${Math.min(i + 1, 10)} rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-5 card-hover card-glow`}>
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />
        <section id="process" className="relative z-10 px-6 py-24" style={{ scrollMarginTop: 80 }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-2 reveal">How I Build</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-12 reveal delay-100">My development workflow from idea to deployment.</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 reveal delay-200">
              {[
                { step: "01", title: "Plan", desc: "Wireframe the UI, define features, choose the stack, map out data flow.", icon: "📋", gradient: "from-indigo-500 to-violet-600" },
                { step: "02", title: "Code", desc: "Build components, wire up state, connect storage, iterate fast.", icon: "💻", gradient: "from-amber-500 to-orange-600" },
                { step: "03", title: "Test", desc: "Check all flows, fix edge cases, polish animations and responsive layout.", icon: "🧪", gradient: "from-emerald-500 to-teal-600" },
                { step: "04", title: "Deploy", desc: "Export static build, drag to Netlify, verify live HTTPS and PWA install.", icon: "🚀", gradient: "from-violet-500 to-purple-600" },
              ].map((item, i) => (
                <div key={item.step} className={`stagger-item stagger-delay-${Math.min(i + 1, 10)} rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-5 card-hover card-glow text-center`}>
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} text-white text-sm font-bold mb-3 shadow-xs`}>{item.step}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />
        <section id="skills" className="relative z-10 px-6 py-24" style={{ scrollMarginTop: 80 }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-2 reveal">Skills</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-10 reveal delay-100">Technologies I work with.</p>
            <div className="flex flex-wrap justify-center gap-3 reveal delay-200">
                {skills.map((s, i) => (
                <span key={s.name} className={`skill-tag stagger-item stagger-delay-${Math.min(i + 1, 10)} px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-700 dark:text-slate-300 shadow-sm cursor-default flex items-center gap-2`}>
                  <img src={s.icon === "css3" ? "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/css3.svg" : `https://cdn.simpleicons.org/${s.icon}`} alt={s.name} className="w-5 h-5 shrink-0" loading="lazy" />
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />
        <section id="contact" className="relative z-10 px-6 py-24 bg-white/50 dark:bg-slate-800/20" style={{ scrollMarginTop: 80 }}>
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl font-bold mb-2 reveal">Get in Touch</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-2 reveal delay-100">Currently looking for an internship opportunity.</p>
            <p className="text-gray-400 dark:text-slate-500 text-sm mb-10 reveal delay-100">I build with Next.js, TypeScript, and Tailwind — and I'm ready to learn on a real team.</p>
            <div className="flex flex-col items-center gap-4 reveal delay-200">
              <button
                onClick={() => { navigator.clipboard.writeText("javeriya337@gmail.com"); setToast("Email copied!"); setTimeout(() => setToast(""), 2500); }}
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium shadow-md hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
                Copy Email
              </button>
            </div>
          </div>
        </section>

        <footer className="relative z-10 px-6 py-8 border-t border-gray-200 dark:border-slate-700/50">
          <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs text-gray-400 dark:text-slate-500">&copy; {new Date().getFullYear()} Mohammed Taqi Uddin</p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/mohammedtaqi-dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 hover:scale-110 transition-all duration-200" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/mohammedtaqi-dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 hover:scale-110 transition-all duration-200" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 z-40 w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-110 active:scale-95 transition-all duration-300 ${scrollY > 500 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
        aria-label="Back to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 15l-6-6-6 6"/></svg>
      </button>
      {toast && <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium shadow-xl animate-fade-up pointer-events-none">{toast}</div>}
    </>
  );
}
