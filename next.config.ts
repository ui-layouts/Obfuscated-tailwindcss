import type { NextConfig } from "next";
import withMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMDX({
  ...nextConfig,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
    jsx: true,
  },
});
