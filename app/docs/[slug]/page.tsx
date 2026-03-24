import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getDocBySlug, getAllDocs } from "@/lib/docs";
import { absoluteUrl, cn } from "@/lib/utils";
import { Component } from "lucide-react";
import TableOfContents from "@/components/table-of-contents";
import Footer from "@/components/footer";
import CopyPage from "@/components/copy-page";
import { GapPattern } from "@/components/gap-pattern";

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => {
    const slugParts = doc.slug === "index" ? [] : doc.slug.split("/");
    return {
      slug: slugParts,
    };
  });
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  let slug = "";
  if (params.slug) {
    if (Array.isArray(params.slug)) {
      slug = params.slug.length > 0 ? params.slug.join("/") : "";
    } else {
      slug = params.slug;
    }
  }

  // @ts-ignore
  const doc = await getDocBySlug(slug);
  if (!doc?.content?.metadata) return {};

  const md = doc.content.metadata;

  const title =
    typeof md.title === "string"
      ? md.title
      : ((md.title as any)?.absolute ??
        (md.title as any)?.default ??
        "UI Layouts");

  const description = md.description ?? "";

  return {
    // Core
    metadataBase: md.metadataBase,
    title: title.includes("| UI Layouts") ? title : `${title} | UI Layouts`,
    description,

    // Keywords (still useful for Bing + some SEO tools)
    keywords: md.keywords ?? [],

    // Authors / branding
    authors: md.authors,
    creator: md.creator ?? "@naymur_dev",
    publisher: md.publisher ?? "UI Layouts",
    category: md.category ?? "technology",

    // Open Graph (VERY important)
    openGraph: {
      ...(md.openGraph ?? {}),
      title:
        md.openGraph?.title ??
        (title.includes("| UI Layouts") ? title : `${title} | UI Layouts`),
      description: md.openGraph?.description ?? description,
      url: md.openGraph?.url ?? absoluteUrl(doc.slug),
      images: md.openGraph?.images ?? [
        {
          url: "https://ui-layouts.com/component-og.jpg",
          width: 1200,
          height: 630,
          alt: "UI Layouts Components",
        },
      ],
      siteName: md.openGraph?.siteName ?? "UI Layouts",
      locale: md.openGraph?.locale ?? "en_US",
      type: md.openGraph?.type ?? "website",
    },

    // Twitter
    twitter: {
      ...(md.twitter ?? {}),
      card: md.twitter?.card ?? "summary_large_image",
      title:
        md.twitter?.title ??
        (title.includes("| UI Layouts") ? title : `${title} | UI Layouts`),
      description: md.twitter?.description ?? description,
      images: md.twitter?.images ?? ["https://ui-layouts.com/component-og.jpg"],
      creator: md.twitter?.creator ?? "@naymur_dev",
    },

    // Robots (Google uses this heavily)
    robots: {
      index: true,
      follow: true,
      ...md.robots,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
        ...md.robots?.googleBot,
      },
    },
  };
}

export default async function DocPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  // Handle both string and array cases
  let slug = "";
  if (params.slug) {
    if (Array.isArray(params.slug)) {
      slug = params.slug.length > 0 ? params.slug.join("/") : "";
    } else {
      slug = params.slug;
    }
  }

  // @ts-ignore
  const doc = await getDocBySlug(slug);

  if (!doc) notFound();

  const { default: Content } = doc.content;

  return (
    <>
      <section className="md:pr-8 pr-4 lg:pl-0 pl-4 md:w-full max-w-none prose pb-5 prose-h1:text-2xl prose-h1:font-medium prose-h1:mb-4 prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:font-medium prose-h3:text-2xl prose-h3:text-primary/70 prose-h3:mt-6 prose-h3:mb-3 prose-h3:font-medium prose-strong:font-medium prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1 prose-blockquote:mb-4 prose-table:mb-4 prose-pre:mb-4">
        <article className="mb-4 mt-4 not-prose">
          <div className="space-y-2 rounded-md bg-neutral-100 p-4 border text-black">
            <div className="flex items-center gap-2 justify-between">
              <h1
                className={cn(
                  "flex scroll-m-20 items-center lg:text-2xl text-xl gap-2 font-medium tracking-tight",
                )}
              >
                <div className="lg:w-7 w-6 lg:h-7 h-6 bg-primary md:grid hidden place-content-center text-primary-foreground rounded">
                  <Component size={16} />
                </div>
                {doc.content.metadata.title}
              </h1>
              <CopyPage />
            </div>
            <p className="sm:text-sm text-xs text-primary/80">
              {doc.content.metadata.description}
            </p>
          </div>
        </article>
        <Content />
        {/* <ComponentPagination doc={doc} /> */}
        <Footer />
      </section>
      <div className="relative lg:w-52 w-40 shrink-0 lg:pl-6 hidden md:block ">
        <GapPattern className="2xl:w-10 lg:w-7 w-5 h-full border-x border-y-0 absolute lg:-left-4 -left-5 top-0" />

        {/* Table of Contents - only show if doc exists and has TOC */}
        {doc?.toc && (
          <div className="sticky top-14">
            <TableOfContents toc={doc.toc} />
          </div>
        )}
      </div>
    </>
  );
}
