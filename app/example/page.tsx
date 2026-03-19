import React from "react";
import { HeroAiValueProposition } from "@/components/hero-ai-value-proposition";
import { FeatureFlow } from "@/components/feature-flow";
import { HeroFooter } from "@/components/hero-footer";

function page() {
  return (
    <div>
      <HeroAiValueProposition />
      <FeatureFlow />
      <HeroFooter />
    </div>
  );
}

export default page;
