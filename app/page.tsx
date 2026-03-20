import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obfuscated TailwindCSS",
  description:
    "Transform your Tailwind utility classes into optimized, obfuscated CSS. Protect your code and enhance performance with automatic build-time obfuscation.",
  keywords: [
    "TailwindCSS",
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
    title: "Obfuscated TailwindCSS - Protect & Optimize Your CSS",
    description:
      "Transform your readable Tailwind utility classes into optimized, obfuscated CSS that protects your code, reduces bundle size, and enhances performance.",
    url: "https://obfuscated-tailwind.ui-layouts.com",
    siteName: "Obfuscated TailwindCSS",
    images: [
      {
        url: "/og.jpg",
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
  const steps = [
    {
      step: "1",
      title: "Install Dependencies",
      description: "Add uuid and glob packages to your project",
      code: "npm install uuid && npm install -D glob @types/uuid",
    },
    {
      step: "2",
      title: "Add Obfuscation Script",
      description: "Create the obfuscation script in your project",
      code: "scripts/obfuscate-tailwind.js",
    },
    {
      step: "3",
      title: "Update Build Script",
      description: "Modify your package.json build command",
      code: '"build": "node scripts/obfuscate-tailwind.js && next build"',
    },
    {
      step: "4",
      title: "Add CSS Import",
      description: "Import the generated CSS in your layout",
      code: 'import "./obfuscated-styles.css";',
    },
  ];

  return (
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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-medium text-neutral-900 mb-4 relative">
            Obfuscated TailwindCSS
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-7 mb-8">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 font-medium">
              No npm, no other dependencies.
            </span>
            Transform your readable Tailwind utility classes into optimized,
            obfuscated CSS that protects your code and enhances performance.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/example"
              className="inline-flex p-3 bg-black text-white cursor-pointer border"
            >
              View Examples
            </a>
            <a
              href="https://github.com/ui-layouts/Obfuscated-tailwindcss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex p-3 gap-2 bg-blue-500 text-white cursor-pointer border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="currentColor"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17" />
                <path d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22" />
              </svg>{" "}
              View on GitHub
            </a>
          </div>
        </div>

        {/* Interactive Demo */}
        <section className="mb-16">
          <div className="bg-white p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-2">
                  Your Tailwind Classes
                </label>
                <div className="w-full p-4 h-32 border bg-neutral-100 border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto">
                  <span>className=</span>
                  <span className="text-blue-600 italic">
                    "flex items-center justify-center p-4 bg-blue-500 text-white
                    rounded-lg shadow-lg hover:bg-blue-600 transition-colors
                    transform hover:scale-105 border-2 border-blue-300
                    font-semibold"
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  After Build Obfuscation
                </label>
                <div className="w-full h-32 p-4 bg-blue-50 border border-neutral-200 text-sm overflow-auto">
                  <span>className=</span>
                  <span className="text-blue-600 italic">
                    "x1y2z3a4 b5c6d7e8 f9g0h1i2 j3k4l5m6 n7o8p9q0 s3o4xyzp1
                    a2b3c4d5 e6f7g8h9 k1l2m3n4 o5p6q7r8 s9t0u1v2 w3x4y5z6"
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mt-3 text-center">
              Note: Actual obfuscation happens automatically during build
            </p>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
            Quick Setup
          </h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white border p-6 flex items-start gap-6"
              >
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 mb-3">{step.description}</p>
                  <div className="bg-neutral-100 text-neutral-900 p-3 font-mono text-sm">
                    {step.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">
            Ready to contribute?
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            This is still in development - we welcome your feedback and
            contributions to help make it better!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="rounded-none h-12">
              Start Using It Now
            </Button>
            <a
              href="https://github.com/ui-layouts/Obfuscated-tailwindcss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center px-3 gap-2 bg-blue-500 text-white cursor-pointer border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="currentColor"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17" />
                <path d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22" />
              </svg>{" "}
              View on GitHub
            </a>
          </div>
          <p className="text-sm text-neutral-500 mt-6">
            created by{" "}
            <a
              href="https://x.com/naymur_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              Naymur
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
