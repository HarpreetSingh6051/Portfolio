import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 text-zinc-100">
        <MotionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
