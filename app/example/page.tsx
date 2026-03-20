import React from "react";
import { Metadata } from "next";
import { HeroAiValueProposition } from "@/components/hero-ai-value-proposition";
import { FeatureFlow } from "@/components/feature-flow";
import { HeroFooter } from "@/components/hero-footer";

export const metadata: Metadata = {
  title: "Example - Obfuscated TailwindCSS",
  description:
    "See live examples of TailwindCSS obfuscation. View before and after comparisons, real-world use cases, and performance benefits of CSS obfuscation.",
  keywords: [
    "TailwindCSS example",
    "CSS obfuscation demo",
    "before after",
    "performance optimization",
    "code protection",
  ],
  openGraph: {
    title: "Obfuscated TailwindCSS Examples - See It in Action",
    description:
      "Explore real-world examples of CSS obfuscation with before/after comparisons and performance metrics.",
    url: "https://obfuscated-tailwind.ui-layouts.com/example",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Obfuscated TailwindCSS Examples and Demos",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obfuscated TailwindCSS Examples - See It in Action",
    description:
      "Explore real-world examples of CSS obfuscation with before/after comparisons.",
    images: ["/og.jpg"],
  },
};

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
