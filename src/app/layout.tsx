import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  TITLE_BRAND,
  TWITTER_HANDLE,
  TWITTER_URL,
  DEFAULT_OG_IMAGE,
  SQUARE_OG_IMAGE,
  LOGO_URL,
  IS_INDEXABLE_DEPLOYMENT,
} from "@/lib/seo/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const SITE_DESCRIPTION =
  "Prometheus One is a free, local-first AI agent for Windows and Mac. It browses, codes, runs scheduled tasks, remembers context and gets real work done.";

export const metadata: Metadata = {
  title: {
    default: "Prometheus One: Free Local-First AI Agent for Windows & Mac",
    // Pages built with createMetadata() set `title.absolute`, so this only applies to plain-string titles.
    template: `%s | ${TITLE_BRAND}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: "Prometheus",
  authors: [{ name: "Prometheus", url: SITE_URL }],
  creator: "Prometheus",
  publisher: "Prometheus",
  category: "technology",
  keywords: [
    "Prometheus AI",
    "Prometheus AI agent",
    "Prometheus One",
    "local-first AI agent",
    "AI agent for Windows",
    "AI agent for Mac",
    "AI browser automation",
    "desktop AI agent",
    "free AI agent",
  ],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Prometheus",
    locale: "en_US",
    url: SITE_URL,
    title: "Prometheus One: Free Local-First AI Agent for Windows & Mac",
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE, SQUARE_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    title: "Prometheus One: Free Local-First AI Agent for Windows & Mac",
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: IS_INDEXABLE_DEPLOYMENT
    ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
    : { index: false, follow: false },
  formatDetection: { telephone: false },
};

const organizationJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Prometheus",
    alternateName: ["Prometheus AI", "Prometheus One"],
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
    sameAs: [TWITTER_URL],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Prometheus AI",
    alternateName: "Prometheus One",
    url: SITE_URL,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={organizationJsonLd} />
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
