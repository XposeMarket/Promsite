import { IntroGate } from "@/components/intro/IntroGate";
import { Hero } from "@/components/hero/Hero";
import { WatchItWork, ProofStrip, CapabilityGrid, SeeItShowcase, YourMachine } from "@/components/sections/HomeVisual";
import { PricingPreview } from "@/components/sections/PricingPreview";

export default function HomePage() {
  return (
    <IntroGate>
      <Hero />
      <ProofStrip />
      <WatchItWork />
      <CapabilityGrid />
      <SeeItShowcase />
      <YourMachine />
      <PricingPreview />
    </IntroGate>
  );
}
