import { IntroGate } from "@/components/intro/IntroGate";
import { Hero } from "@/components/hero/Hero";
import { BeyondChatbots } from "@/components/sections/BeyondChatbots";
import { FourPillars } from "@/components/sections/FourPillars";
import { RealWorkflows } from "@/components/sections/RealWorkflows";
import { PrometheusExecutes } from "@/components/sections/PrometheusExecutes";
import { PromptToProduction } from "@/components/sections/PromptToProduction";
import { PricingPreview } from "@/components/sections/PricingPreview";

export default function HomePage() {
  return (
    <IntroGate>
      <Hero />
      <BeyondChatbots />
      <FourPillars />
      <RealWorkflows />
      <PrometheusExecutes />
      <PromptToProduction />
      <PricingPreview />
    </IntroGate>
  );
}
