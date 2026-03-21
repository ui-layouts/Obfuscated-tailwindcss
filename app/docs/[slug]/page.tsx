import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import GettingStartedDoc from "../getting-started.mdx";
import TokenSetupDoc from "../token-setup.mdx";

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
  "token-setup": {
    title: "Token Setup",
    description:
      "Fix semantic color token issues by moving shared variables into token.css and referencing them from the generated stylesheet.",
    Component: TokenSetupDoc,
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

      <div className="prose prose-lg max-w-none prose-pre:overflow-x-auto prose-code:break-words">
        <DocContent />
      </div>
    </article>
  );
}
