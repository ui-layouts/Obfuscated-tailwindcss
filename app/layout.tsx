import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Obfuscated TailwindCSS - Protect & Optimize Your CSS",
    template: "%s | Obfuscated TailwindCSS",
  },
  description:
    "Transform your Tailwind utility classes into optimized, obfuscated CSS. Reduce bundle size, protect your code, and enhance performance with automatic build-time obfuscation.",
  keywords: [
    "TailwindCSS",
    "CSS obfuscation",
    "bundle optimization",
    "code protection",
    "performance",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Naymur", url: "https://x.com/naymur_dev" }],
  creator: "Naymur",
  publisher: "UI Layouts",
  metadataBase: new URL("https://obfuscated-tailwind.ui-layouts.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Obfuscated TailwindCSS - Protect & Optimize Your CSS",
    description:
      "Transform your readable Tailwind utility classes into optimized, obfuscated CSS that protects your code, reduces bundle size, and enhances performance.",
    url: "https://obfuscated-tailwind.ui-layouts.com",
    siteName: "Obfuscated TailwindCSS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Obfuscated TailwindCSS - CSS Protection and Optimization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obfuscated TailwindCSS - Protect & Optimize Your CSS",
    description:
      "Transform your Tailwind classes into obfuscated CSS. Reduce bundle size and protect your code.",
    images: ["/og-image.png"],
    creator: "@naymur_dev",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
