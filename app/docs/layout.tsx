import type { Metadata } from "next";
import TableOfContents from "@/components/table-of-contents";
import { getDocBySlug } from "@/lib/docs";
import { Container } from "@/components/container";
import { GapPattern } from "@/components/gap-pattern";
import Link from "next/link";
import React from "react";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Documentation | Obfuscated TailwindCSS",
  description: "Complete documentation for Obfuscated TailwindCSS",
};

export default async function DocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string[] }>;
}) {
  const paramsResolved = await params;
  const slug = paramsResolved.slug?.[0] || "getting-started";

  // Get the current doc to extract TOC
  let doc = null;
  try {
    doc = await getDocBySlug(slug);
  } catch (error) {
    // Fallback if doc not found
    console.warn(`Doc not found for slug: ${slug}`);
  }

  return (
    <div className="min-h-screen bg-white">
      <Container>
        <header className="bg-white border-b p-2 sticky top-0 z-999">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <svg
                width="107"
                height="115"
                className="w-8 h-8 mx-auto"
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
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Obfuscated TailwindCSS
              </span>
            </a>
            <nav className="flex gap-6">
              <a
                href="/docs/getting-started"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Getting Started
              </a>
              <a
                href="/docs/token-setup"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Token Setup
              </a>
              <a
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to Home
              </a>
            </nav>
          </div>
        </header>
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Basic Navigation */}
          <Sidebar />
          <div className="lg:col-span-8">{children}</div>
          <div className="lg:col-span-2 pl-6 relative">
            <GapPattern className="2xl:w-10 lg:w-7 w-5 h-full border-x border-y-0 absolute -left-4 top-0" />

            {/* Table of Contents - only show if doc exists and has TOC */}
            {doc?.toc && (
              <div className="sticky top-14">
                <TableOfContents toc={doc.toc} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
