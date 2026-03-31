import type { Metadata } from "next";

export const siteConfig = {
  name: "Obfustail",
  shortDescription: "Scan, Fix & Obfuscate TailwindCSS Classes",
  description:
    "Transform your Tailwind utility classes into optimized, obfuscated CSS to protect source code and improve performance.",
  url: "https://obfustail.ui-layouts.com",
  ogImage: "/og.jpg",
  author: "Naymur",
  xHandle: "@naymur_dev",
};

export const defaultKeywords = [
  "tailwindcss obfuscation",
  "tailwind class obfuscator",
  "css obfuscation",
  "tailwind optimization",
  "frontend code protection",
  "next.js tailwind build",
  "core web vitals",
  "seo friendly tailwind",
];

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: defaultKeywords,
  authors: [{ name: siteConfig.author, url: "https://x.com/naymur_dev" }],
  creator: siteConfig.author,
  publisher: "UI Layouts",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Obfustail - Tailwind CSS obfuscation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.xHandle,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage}`,
  author: {
    "@type": "Person",
    name: siteConfig.author,
    url: "https://x.com/naymur_dev",
  },
};
