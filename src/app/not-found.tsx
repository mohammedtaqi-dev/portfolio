import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800/50 flex items-center justify-center shadow-lg mx-auto mb-6 border border-gray-200 dark:border-slate-700">
          <Logo size={40} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-3">404</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-8 leading-relaxed">This page doesn&apos;t exist. It might have been moved or never existed at all.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium shadow-md hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
