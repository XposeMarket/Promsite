import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Prometheus — The AI System That Actually Executes",
    template: "%s | Prometheus",
  },
  description:
    "Prometheus is an AI system that runs tools, automates browsers, manages background tasks, remembers context, and orchestrates workflows. Not a chatbot. A system.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://prometheusaiagent.com"
  ),
  applicationName: "Prometheus",
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
    title: "Prometheus — The AI System That Actually Executes",
    description:
      "Prometheus runs tools, automates browsers, manages background tasks, remembers context, and orchestrates workflows.",
    images: [
      {
        url: "/og/prometheus-ai-agent-preview-v2.png",
        width: 1731,
        height: 909,
        alt: "Prometheus AI Agent — Search, create, code, voice, and agents",
      },
      {
        url: "/og/prometheus-ai-agent-square.png",
        width: 1254,
        height: 1254,
        alt: "Prometheus AI Agent logo and product preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prometheus — The AI System That Actually Executes",
    description:
      "Prometheus runs tools, automates browsers, manages background tasks, remembers context, and orchestrates workflows.",
    images: ["/og/prometheus-ai-agent-preview-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
