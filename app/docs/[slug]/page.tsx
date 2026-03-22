import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import GettingStartedDoc from "../getting-started.mdx";
import SetupScriptDoc from "../setup-script.mdx";
import SkipClassesDoc from "../skip-classes.mdx";

type DocModule = {
  title: string;
  description: string;
  Component: ComponentType;
};

const docs: Record<string, DocModule> = {
  "getting-started": {
    title: "Getting Started",
    description:
      "Install the obfuscation script, wire up token.css, and generate production-ready obfuscated Tailwind styles.",
    Component: GettingStartedDoc,
  },
  "setup-script": {
    title: "Setup Script",
    description: "Simple 3-step setup for Tailwind class obfuscation",
    Component: SetupScriptDoc,
  },
  "skip-classes": {
    title: "Skipping Tailwind Classes",
    description:
      "Learn how to bypass class obfuscation with custom CSS classes and semantic naming strategies.",
    Component: SkipClassesDoc,
  },
};

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docs[slug];

  if (!doc) {
    notFound();
  }

  const DocContent = doc.Component;

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-10 border-b border-gray-200 pb-6">
        <a
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          ← Back to Home
        </a>
        <h1 className="mb-3 text-4xl font-bold text-gray-900">{doc.title}</h1>
        <p className="text-lg text-gray-600">{doc.description}</p>
      </div>

      <div className="prose max-w-none pb-5 prose-h1:text-2xl prose-h1:font-semibold prose-h1:mb-4 prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:font-medium prose-strong:font-medium prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1 prose-blockquote:mb-4 prose-table:mb-4 prose-pre:mb-4">
        <DocContent />
      </div>
    </article>
  );
}
