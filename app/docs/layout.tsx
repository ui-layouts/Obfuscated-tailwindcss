import type { Metadata } from "next";
import TableOfContents from "@/components/table-of-contents";
import { getDocBySlug } from "@/lib/docs";
import { Container } from "@/components/container";
import { GapPattern } from "@/components/gap-pattern";
import Link from "next/link";
import React from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Documentation | Obfustail",
  description: "Complete documentation for Obfustail",
};

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Container>
        <Header />
        <div className="md:flex gap-8">
          {/* Basic Navigation */}
          <Sidebar />
          <div className="md:flex w-full flex-1">{children}</div>
        </div>
      </Container>
    </div>
  );
}
