/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

export type BlogHeading = { id: string; title: string; depth: number };
export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime?: number;
};

const blogDirectory = path.join(process.cwd(), "content", "blog");

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function compileSource(raw: string, components = {}) {
  const headings: BlogHeading[] = [];

  const remarkHeadings = () => (tree: any) => {
    visit(tree, "heading", (node: any) => {
      const depth = node.depth ?? 0;
      if (depth < 1 || depth > 3) return;
      const text = toString(node).trim();
      if (!text) return;
      const id = slugify(text);
      node.data ??= {};
      node.data.hProperties ??= {};
      node.data.id = id;
      node.data.hProperties.id = id;
      headings.push({ id, title: text, depth });
    });
  };

  const { content } = await compileMDX({
    source: raw,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkHeadings],
        // cast to any to avoid vfile type mismatches coming from nested
        // versions of rehype/remark dependencies in different packages.
        rehypePlugins: [rehypeSlug as any, [rehypeAutolinkHeadings as any, { behavior: "wrap" }]] as any,
      },
    },
    components,
  });

  return { compiled: content, toc: headings };
}

export function getAllBlogPosts(includeContent = false) {
  if (!fs.existsSync(blogDirectory)) return [];
  const files = fs.readdirSync(blogDirectory).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(blogDirectory, file), "utf-8");
    const parsed = matter(raw) as unknown as { data: any; content: string };
    const meta = parsed.data as Record<string, any>;
    return {
      slug,
      title: String(meta.title ?? slug),
      date: String(meta.date ?? ""),
      summary: String(meta.summary ?? ""),
      tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
      content: includeContent ? parsed.content : undefined,
    } as any;
  });
}

export async function getBlogPost(slug: string) {
  const file = path.join(blogDirectory, `${slug}.mdx`);
  if (!fs.existsSync(file)) throw new Error("Not found");
  const raw = fs.readFileSync(file, "utf-8");
  const parsed = matter(raw) as unknown as { data: any; content: string };
  const meta = parsed.data as Record<string, any>;
  const { compiled, toc } = await compileSource(parsed.content);

  return {
    slug,
    title: String(meta.title ?? slug),
    date: String(meta.date ?? ""),
    summary: String(meta.summary ?? ""),
    tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
    readingTime: meta.readingTime,
    content: compiled,
    toc,
  } as any;
}

