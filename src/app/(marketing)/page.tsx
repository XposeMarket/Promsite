import { IntroGate } from "@/components/intro/IntroGate";
import { Hero } from "@/components/hero/Hero";
import { WatchItWork, ProofStrip, CapabilityGrid, SeeItShowcase, YourMachine } from "@/components/sections/HomeVisual";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { EverythingSection } from "@/components/sections/EverythingSection";

export default function HomePage() {
  return (
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
  );
}
