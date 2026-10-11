import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteBackground } from "@/components/layout/SiteBackground";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { profile, socialLinks } from "@/lib/config/profile";
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
  authors: [{ name: profile.name, url: socialLinks.github }],
  creator: profile.name,
  publisher: profile.name,
  applicationName: `${profile.name} — Portfolio`,
  category: "technology",
  openGraph: {
    title: `${profile.name} — Full-Stack Engineer · Applied AI`,
    description: `${profile.tagline} I build production software, and make AI work inside it.`,
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    locale: "en_US",
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the stored appearance before first paint so the page never
            flashes the wrong theme. Kept in sync with lib/theme.ts. */}
        <Script id="theme-boot" strategy="beforeInteractive">
          {`(function(){try{var root=document.documentElement;var mode=localStorage.getItem("hp-theme");if(mode!=="light"&&mode!=="dark"){mode="system"}var dark=mode==="dark"||(mode==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);root.dataset.theme=dark?"dark":"light";root.style.colorScheme=dark?"dark":"light";var fx=localStorage.getItem("hp-effects");root.dataset.effects=fx==="off"?"off":"on"}catch(e){}})()`}
        </Script>
      </head>
      <body className="bg-canvas text-ink">
        <SiteBackground />
        <ThemeProvider>
          <MotionProvider>
            <div className="relative z-10 flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CommandPalette />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
