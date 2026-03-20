import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obfuscated TailwindCSS - Protect & Optimize Your CSS",
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
        <a href="https://ui-layouts.com" target="_blank" className="block">
          <svg
            width="97"
            height="108"
            viewBox="0 0 97 108"
            className="w-10 h-10 mx-auto mb-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.136 0.0406614C11.6287 0.038729 12.1213 0.036371 12.6139 0.0336212C13.9473 0.0275629 15.2806 0.0279447 16.614 0.0298781C17.7296 0.0309268 18.8453 0.0288601 19.9609 0.0268185C22.5947 0.0220681 25.2285 0.0225889 27.8623 0.0264467C30.5731 0.0303299 33.2838 0.0255732 35.9947 0.0164958C38.3274 0.00897879 40.6602 0.0067526 42.993 0.00873605C44.3839 0.00987345 45.7747 0.00908092 47.1655 0.00323497C48.4746 -0.0020273 49.7836 -0.000634229 51.0926 0.00570781C51.5708 0.00694858 52.0489 0.00592365 52.5271 0.00236141C56.6751 -0.0261629 59.5811 0.671153 62.6253 3.55457C64.4079 5.50332 64.6454 7.48415 64.6679 10.0193C64.6758 10.4946 64.684 10.97 64.6924 11.4453C64.7043 12.188 64.7142 12.9305 64.7188 13.6733C64.7479 17.6249 65.1942 20.598 67.9835 23.5846C71.3021 26.5813 75.3678 27.6292 79.7449 27.656C80.2467 27.6638 80.7485 27.672 81.2503 27.6804C82.03 27.6923 82.8094 27.7022 83.5892 27.7068C87.7704 27.736 91.3881 28.0131 94.5662 31.049C96.5145 33.1636 96.8739 34.8903 96.8732 37.7199C96.8745 37.9914 96.8757 38.263 96.877 38.5428C96.8808 39.4538 96.8821 40.3649 96.8833 41.2759C96.8855 41.9287 96.8877 42.5815 96.8901 43.2343C96.8972 45.3789 96.9007 47.5235 96.9041 49.6682C96.9055 50.4067 96.9069 51.1451 96.9083 51.8836C96.9148 55.3527 96.9196 58.8219 96.9224 62.291C96.9257 66.2951 96.9347 70.299 96.9484 74.303C96.9586 77.3984 96.9636 80.4937 96.9648 83.589C96.9655 85.4376 96.9686 87.286 96.9771 89.1346C96.985 90.8739 96.9864 92.6131 96.983 94.3524C96.9828 94.99 96.9849 95.6275 96.9896 96.265C96.9956 97.1372 96.9932 98.009 96.9887 98.8812C96.9943 99.2572 96.9943 99.2572 97 99.6408C96.9733 101.811 96.2408 103.538 94.8245 105.185C94.6098 105.364 94.3952 105.543 94.1741 105.728C93.9621 105.912 93.75 106.095 93.5316 106.285C90.9459 108.022 88.6015 107.97 85.5576 107.959C85.0683 107.961 84.579 107.964 84.0897 107.966C82.7654 107.972 81.4412 107.972 80.117 107.97C79.0089 107.969 77.9008 107.971 76.7928 107.973C74.1769 107.978 71.561 107.977 68.9451 107.974C66.2527 107.97 63.5605 107.974 60.8682 107.984C58.5512 107.991 56.2343 107.993 53.9173 107.991C52.5359 107.99 51.1546 107.991 49.7732 107.997C48.473 108.002 47.173 108.001 45.8729 107.994C45.398 107.993 44.9231 107.994 44.4483 107.998C40.7688 108.023 37.7419 107.578 34.9578 105.009C34.6854 104.766 34.4131 104.523 34.1325 104.272C32.6316 102.505 32.2686 100.847 32.2555 98.5705C32.2518 98.3414 32.2482 98.1124 32.2444 97.8764C32.2329 97.1508 32.2275 96.4254 32.2237 95.6998C32.2006 91.2963 32.067 87.261 29.0022 83.7886C26.8921 81.9187 24.5666 80.8616 21.881 80.065C21.6004 79.9758 21.6004 79.9758 21.3141 79.8849C20.1853 79.6585 19.0618 79.6668 17.9151 79.6551C17.394 79.6456 16.873 79.6359 16.352 79.626C15.5373 79.6121 14.7228 79.5996 13.9081 79.5906C9.58716 79.539 5.89295 79.4091 2.55199 76.3414C0.65809 74.3932 0.0765215 72.9498 0.0875654 70.2521C0.0860288 69.9776 0.0844928 69.703 0.0829097 69.4201C0.0786122 68.4989 0.0791717 67.5778 0.0797314 66.6566C0.0777024 65.9965 0.0753947 65.3365 0.0728288 64.6765C0.0668312 62.8825 0.0652474 61.0886 0.0648151 59.2946C0.0641714 57.7972 0.0616774 56.2999 0.0592734 54.8025C0.0537487 51.2696 0.0520946 47.7368 0.0525765 44.2039C0.0529839 40.5593 0.045829 36.9148 0.035117 33.2703C0.0262488 30.1416 0.0226104 27.0129 0.0230439 23.8842C0.0232169 22.0155 0.0212827 20.1468 0.0141065 18.278C0.00754039 16.5201 0.00748724 14.7622 0.0124223 13.0043C0.0131316 12.3595 0.0115291 11.7148 0.00743035 11.07C0.00219164 10.1888 0.00534578 9.30796 0.0105712 8.42673C0.00708275 8.17245 0.00359413 7.91817 0 7.65619C0.0277447 5.53431 0.70155 4.16227 2.10294 2.58401C2.2861 2.43216 2.46925 2.2803 2.65796 2.12385C2.83849 1.96851 3.01903 1.81316 3.20503 1.65311C5.77761 -0.0298915 8.12954 0.0300142 11.136 0.0406614ZM33.0715 28.9505C32.6961 30.0442 32.689 31.0827 32.687 32.2317C32.6856 32.6247 32.6842 33.0176 32.6827 33.4225C32.6828 33.8523 32.683 34.2821 32.6831 34.725C32.6821 35.1832 32.681 35.6414 32.6797 36.0997C32.6767 37.3431 32.6759 38.5866 32.6757 39.8301C32.6753 40.8682 32.6741 41.9063 32.6729 42.9444C32.6701 45.3932 32.6693 47.8419 32.6695 50.2906C32.6697 52.8173 32.6662 55.3439 32.6608 57.8705C32.6564 60.0398 32.6546 62.2092 32.6548 64.3785C32.6549 65.6742 32.6539 66.9698 32.6503 68.2654C32.647 69.4835 32.647 70.7016 32.6495 71.9196C32.65 72.5799 32.6472 73.2402 32.6442 73.9005C32.6457 74.2935 32.6471 74.6864 32.6485 75.0913C32.6484 75.4328 32.6482 75.7743 32.648 76.1261C32.7354 77.0505 32.9063 77.5976 33.4106 78.3725C34.7886 79.1651 36.1815 79.1459 37.7309 79.1371C37.9897 79.1383 38.2485 79.1395 38.5152 79.1407C39.3676 79.1437 40.2199 79.1417 41.0723 79.1394C41.6664 79.1399 42.2605 79.1405 42.8547 79.1414C44.0986 79.1424 45.3426 79.1409 46.5865 79.1378C48.1795 79.1339 49.7724 79.1361 51.3654 79.1402C52.5919 79.1426 53.8183 79.1418 55.0448 79.1401C55.6321 79.1396 56.2194 79.1402 56.8067 79.1418C57.6281 79.1435 58.4493 79.1409 59.2707 79.1371C59.5124 79.1385 59.7542 79.1398 60.0033 79.1413C61.4085 79.1293 62.8788 79.0834 63.9301 78.034C63.9665 77.4117 63.979 76.788 63.9823 76.1647C63.9852 75.7589 63.9881 75.3531 63.9911 74.935C63.9926 74.4811 63.9941 74.0273 63.9955 73.5735C63.9982 73.0987 64.001 72.624 64.0039 72.1492C64.0128 70.586 64.018 69.0228 64.0228 67.4596C64.0246 66.9222 64.0265 66.3848 64.0283 65.8473C64.0356 63.6123 64.042 61.3772 64.0458 59.1421C64.0513 55.9354 64.0626 52.7288 64.0819 49.5222C64.095 47.2695 64.1016 45.0168 64.1034 42.7641C64.1047 41.4177 64.1087 40.0714 64.1197 38.725C64.1299 37.4583 64.1321 36.1918 64.1281 34.925C64.128 34.4599 64.1308 33.9949 64.1368 33.5298C64.1444 32.8952 64.1406 32.2604 64.1363 31.6258C64.1374 31.2705 64.1385 30.9152 64.1397 30.5492C63.9998 29.5589 63.9998 29.5589 63.1476 28.8361C61.9385 28.091 60.889 28.0882 59.511 28.109C59.2418 28.1077 58.9725 28.1065 58.695 28.1051C57.8079 28.1026 56.9211 28.1099 56.034 28.1175C55.4162 28.1183 54.7985 28.1186 54.1807 28.1184C52.8874 28.1195 51.5942 28.1251 50.3009 28.1342C48.6432 28.1457 46.9858 28.1482 45.3281 28.1477C44.053 28.1479 42.778 28.1516 41.5029 28.1565C40.8917 28.1587 40.2804 28.16 39.6692 28.1605C38.8152 28.162 37.9615 28.1679 37.1076 28.1751C36.7288 28.1747 36.7289 28.1747 36.3425 28.1742C34.5885 28.1802 34.5885 28.1802 33.0715 28.9505Z"
              fill="black"
            />
          </svg>
        </a>
        <div className="text-center mb-16">
          <h1 className="text-5xl font-medium text-neutral-900 mb-4 relative">
            Obfuscated TailwindCSS
            <span className="text-blue-600 text-sm ml-2 absolute top-0">
              (Beta)
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-7 mb-8">
            Transform your readable Tailwind utility classes into optimized,
            obfuscated CSS that protects your code, reduces bundle size, and
            enhances performance.
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
