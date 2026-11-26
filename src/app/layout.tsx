import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { profile } from "@/data/profile";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { getPublishedPosts } from "@/lib/blog";

const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Anshu Saini — Applied AI & Generative AI Engineer";
const description =
  "Portfolio of Anshu Saini — an entry-level applied AI and generative AI engineer and Python developer building retrieval-grounded LLM applications, backend services and practical software products.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: title,
    template: "%s — Anshu",
  },
  description,
  applicationName: "Anshu",
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  keywords: [
    "Anshu Saini",
    "entry-level AI engineer",
    "applied AI engineer",
    "generative AI engineer",
    "RAG",
    "LLM applications",
    "Python developer",
    "FastAPI",
    "FAISS",
    "Ollama",
    "software developer",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.url,
    siteName: "Anshu",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const hasPublishedBlogPosts = getPublishedPosts().length > 0;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${profile.url}/#person`,
        name: profile.name,
        url: profile.url,
        jobTitle: profile.role,
        description: profile.position,
        email: `mailto:${profile.email}`,
        sameAs: [profile.links.github.href, profile.links.linkedin.href],
        knowsAbout: profile.interests,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Pillai College of Engineering",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${profile.url}/#website`,
        url: profile.url,
        name: "Anshu",
        description,
        inLanguage: "en",
        author: { "@id": `${profile.url}/#person` },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <noscript>
          <style>{".reveal{opacity:1 !important;transform:none !important}"}</style>
        </noscript>
        <a
          href="#main"
          className="skip-link sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-chalk focus:px-5 focus:py-3 focus:font-mono focus:text-[10px] focus:uppercase focus:tracking-[0.16em] focus:text-ink"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <SiteHeader hasPublishedBlogPosts={hasPublishedBlogPosts} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer hasPublishedBlogPosts={hasPublishedBlogPosts} />
        <div className="noise-overlay" aria-hidden="true" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
