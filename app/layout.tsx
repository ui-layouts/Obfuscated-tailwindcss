import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obfustail",
  description:
    "Transform your Tailwind utility classes into optimized, obfuscated CSS. Protect your code and enhance performance with automatic build-time obfuscation.",
  keywords: [
    "TailwindCSS",
    "ObfusTail",
    "ObfusTail Projects",
    "Protect your tailwindcss code using ObfusTail",
    "how can i hide my tailwindcss code using ObfusTail",
    "how can i hide my tailwindcss code",
    "CSS obfuscation",
    "bundle optimization",
    "code protection",
    "performance",
    "Next.js",
    "React",
    "CSS minification",
    "class name obfuscation",
    "build optimization",
    "CSS compression",
    "utility classes",
    "frontend optimization",
    "web performance",
    "bundle size reduction",
    "CSS security",
    "code obfuscation",
    "Tailwind optimization",
    "static site generation",
    "CSS purging",
    "production build",
    "asset optimization",
    "CSS delivery",
    "performance optimization",
    "web development",
    "CSS framework",
    "utility-first CSS",
    "responsive design",
    "mobile optimization",
    "page speed",
    "core web vitals",
    "SEO optimization",
    "frontend security",
    "intellectual property protection",
    "source code protection",
    "CSS optimization tools",
    "build tools",
    "development workflow",
    "deployment optimization",
  ],
  authors: [{ name: "Naymur", url: "https://x.com/naymur_dev" }],
  creator: "Naymur",
  publisher: "UI Layouts",
  metadataBase: new URL("https://obfuscated-tailwind.ui-layouts.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Obfustail - Protect & Optimize Your CSS",
    description:
      "Transform your readable Tailwind utility classes into optimized, obfuscated CSS that protects your code, reduces bundle size, and enhances performance.",
    url: "https://obfuscated-tailwind.ui-layouts.com",
    siteName: "Obfustail",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Obfustail - CSS Protection and Optimization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obfustail - Protect & Optimize Your CSS",
    description:
      "Transform your Tailwind classes into obfuscated CSS. Reduce bundle size and protect your code.",
    images: ["/og.jpg"],
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
