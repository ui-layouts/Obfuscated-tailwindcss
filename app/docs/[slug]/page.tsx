import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";

export async function generateStaticParams() {
  return [{ slug: "getting-started" }, { slug: "examples" }];
}

async function getDocContent(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "app", "docs", `${slug}.mdx`);
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    return null;
  }
}

export default async function DocPage({
  params,
}: {
  params: { slug: string };
}) {
  const content = await getDocContent(params.slug);

  if (!content) {
    notFound();
  }

  // Extract frontmatter and content
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!frontmatterMatch) {
    notFound();
  }

  const [, frontmatterStr, mdxContent] = frontmatterMatch;

  // Parse frontmatter
  const frontmatter: Record<string, string> = {};
  frontmatterStr.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts
        .join(":")
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <a
          href="/"
          className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-6"
        >
          ← Back to Home
        </a>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {frontmatter.title || params.slug}
        </h1>
        {frontmatter.description && (
          <p className="text-xl text-gray-600">{frontmatter.description}</p>
        )}
      </div>

      <div className="prose prose-lg max-w-none">
        {/* In a real implementation, you'd use an MDX renderer here */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-yellow-800">
            <strong>Note:</strong> This is a basic MDX page. In a production
            setup, you'd integrate a proper MDX renderer like @mdx-js/loader
            with Next.js MDX support.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Raw MDX Content Preview:
          </h3>
          <pre className="bg-white p-4 rounded border border-gray-200 overflow-auto text-sm">
            <code>{mdxContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
