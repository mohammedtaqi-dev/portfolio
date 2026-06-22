import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mohammed Taqi Uddin | Developer",
  description: "Portfolio of Mohammed Taqi Uddin — full-stack developer building premium web applications.",
  metadataBase: new URL("https://quik-cyan.vercel.app"),
  openGraph: {
    title: "Mohammed Taqi Uddin | Developer",
    description: "Portfolio of Mohammed Taqi Uddin — full-stack developer building premium web applications.",
    type: "website",
    url: "https://quik-cyan.vercel.app",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
