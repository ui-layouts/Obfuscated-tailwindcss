import Image from "next/image";
import { Metadata } from "next";
import { Container } from "@/components/container";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Obfustail",
  description: "Scan, Fix & Obfuscate TailwindCSS Classes",
  keywords: [
    "TailwindCSS",
    "Hide tailwindcss Classes",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function Home() {
  return (
    <Container>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-neutral-50 to-neutral-100">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <a href="/" className="block relative w-fit mx-auto">
            <svg
              width="107"
              height="115"
              className="w-14 h-14 mx-auto mb-5"
              viewBox="0 0 107 115"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M35.5 35.5C16.5667 35.5 4.73333 44.9444 0 63.8333C7.1 54.3889 15.3833 50.8472 24.85 53.2083C30.2513 54.5568 34.1116 58.4657 38.3847 62.7918C45.3453 69.8411 53.4025 78 71 78C89.9333 78 101.767 68.5556 106.5 49.6667C99.4 59.1111 91.1167 62.6528 81.65 60.2917C76.2487 58.9458 72.3884 55.0343 68.1153 50.7082C61.1547 43.6589 53.0975 35.5 35.5 35.5Z"
                fill="#38BDF8"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M80.21 50.4811C88.4673 33.4433 85.1291 18.6757 70.1956 6.17832C75.598 16.6865 75.1726 25.6851 68.9192 33.1743C65.3501 37.4467 60.149 39.2158 54.3924 41.1744C45.0131 44.3639 34.1571 48.0561 26.4824 63.8918C18.2251 80.9297 21.5633 95.6973 36.4968 108.195C31.0944 97.6865 31.5198 88.6879 37.7732 81.1987C41.3399 76.9251 46.5434 75.1572 52.3 73.1986C61.6792 70.0091 72.5353 66.3169 80.21 50.4811Z"
                fill="#38BDF8"
              />
            </svg>
            <span className="text-blue-600 text-xs ml-2 absolute top-0 -right-8">
              (Beta)
            </span>
          </a>
          <div className="text-center mb-5">
            <h1 className="2xl:text-5xl lg:text-4xl text-3xl font-medium text-neutral-900 mb-4 relative">
              Obfuscated Tailwindcss
            </h1>
            <p className="2xl:text-xl lg:text-lg text-sm text-neutral-600 max-w-2xl mx-auto mb-8">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 font-medium">
                No npm, No other dependencies.
              </span>
              Transform your readable Tailwind utility classes into optimized,
              obfuscated CSS that protects your code and enhances performance.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/docs/getting-started"
                className="inline-flex p-3 bg-black text-white cursor-pointer border"
              >
                Documentation
              </a>
              <a
                href="/example"
                target="_blank"
                className="inline-flex p-3 bg-blue-500 text-white cursor-pointer border"
              >
                <Globe className="mr-2" /> Live Example
              </a>
            </div>
          </div>
          <div className="flex justify-center pb-5">
            <a
              href="https://peerlist.io/naymurr/project/obfustail"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://peerlist.io/api/v1/projects/embed/PRJHLKLRR98JG8EQ7C7RK9BNPGENRK?showUpvote=true&theme=light"
                alt="Obfustail"
                style={{ width: "auto", height: "72px" }}
              />
            </a>
          </div>
          {/* Interactive Demo */}
          <section className="relative">
            <a
              href="https://youtu.be/-bJ5U8W7Kss"
              target="_blank"
              rel="noreferrer"
              className="p-10 rounded-md block bg-background border w-full"
            >
              <Image
                src="/og.jpg"
                alt="Demo"
                className="rounded-md"
                width={2000}
                height={800}
              />
            </a>
          </section>

          {/* CTA Section */}
          <Footer className="flex justify-center mt-0" />
        </div>
      </div>
    </Container>
  );
}
