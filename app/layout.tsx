import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { profile } from "@/lib/config/profile";
import { siteUrl } from "@/lib/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Full-Stack Engineer · Applied AI`,
    template: `%s | ${profile.name}`,
  },
  description: `${profile.tagline} ${profile.yearsExperience} years in software engineering, focused on applied AI, RAG, and computer vision.`,
  keywords: [
    "AI Engineer",
    "Applied AI",
    "Full-Stack Engineer",
    "RAG",
    "FastAPI",
    "Python",
    "Computer Vision",
    "pgVector",
    "Machine Learning",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Full-Stack Engineer · Applied AI`,
    description: profile.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full-Stack Engineer · Applied AI`,
    description: profile.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="text-zinc-100">
        <SiteBackground />
        <MotionProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CommandPalette />
        </MotionProvider>
      </body>
    </html>
  );
}
