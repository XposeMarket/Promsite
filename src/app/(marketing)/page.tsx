import { IntroGate } from "@/components/intro/IntroGate";
import { Hero } from "@/components/hero/Hero";
import { WatchItWork, ProofStrip, CapabilityGrid, SeeItShowcase, YourMachine } from "@/components/sections/HomeVisual";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { EverythingSection } from "@/components/sections/EverythingSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { SITE_URL, PRODUCT_NAME, DEFAULT_OG_IMAGE, absoluteUrl } from "@/lib/seo/site";

const HOME_DESCRIPTION =
  "Prometheus One is a free, local-first AI agent for Windows and Mac. It browses, codes, runs scheduled tasks, remembers context and gets real work done.";

export const metadata = createMetadata({
  title: "Prometheus One: Free Local-First AI Agent for Windows & Mac",
  description: HOME_DESCRIPTION,
  path: "",
});

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: PRODUCT_NAME,
  alternateName: ["Prometheus", "Prometheus AI", "Prometheus AI agent"],
  description: HOME_DESCRIPTION,
  url: SITE_URL,
  downloadUrl: absoluteUrl("/download"),
  image: absoluteUrl(DEFAULT_OG_IMAGE.url),
  applicationCategory: "ProductivityApplication",
  applicationSubCategory: "AI agent",
  operatingSystem: "Windows 10, Windows 11, macOS 11+",
  memoryRequirements: "8 GB RAM minimum, 16 GB recommended",
  storageRequirements: "2 GB",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/pricing"),
  },
  featureList: [
    "AI browser automation in a real signed-in browser",
    "Desktop app control",
    "Files, terminal and code editing",
    "Scheduled and background tasks",
    "Subagents and managed multi-agent teams",
    "Persistent memory across sessions",
    "Image and video generation",
    "Voice mode and phone access",
    "Connectors and MCP servers",
    "Approvals for risky actions",
  ],
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareJsonLd} />
      <IntroGate>
        <Hero />
        <ProofStrip />
        <WatchItWork />
        <CapabilityGrid />
        <EverythingSection />
        <SeeItShowcase />
        <YourMachine />
        <PricingPreview />
      </IntroGate>
    </>
  );
}
