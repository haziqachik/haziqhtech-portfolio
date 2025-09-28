import fs from "node:fs";
import path from "node:path";

import type { ReactNode } from "react";

import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

import { mdxComponents } from "@/mdx/components";

const blogDirectory = path.join(process.cwd(), "content", "blog");

type PostStatus = "draft" | "preview" | "published";

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  lastModified: string | null;
  tags: string[];
  readingTime: number;
  wordCount: number;
  status: PostStatus;
  references?: string[];
  changelog: string[];
}

export interface BlogHeading {
  id: string;
  title: string;
  depth: number;
}

export interface BlogPost extends BlogPostMeta {
  content: ReactNode;
  toc: BlogHeading[];
}

function ensureBlogDirectory() {
  if (!fs.existsSync(blogDirectory)) {
    fs.mkdirSync(blogDirectory, { recursive: true });
  }
}

function readBlogFiles() {
  ensureBlogDirectory();
  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .sort();
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface RawFrontmatter {
  title: string;
  excerpt?: string;
  date: string;
  lastModified?: string;
  status?: PostStatus;
  tags?: string[];
  changelog?: string[];
}

function parseFrontmatter(slug: string, fm: RawFrontmatter, body: string): BlogPostMeta {
  if (!fm.title) {
    throw new Error(`Blog post ${slug} is missing a title in frontmatter.`);
  }
  if (!fm.date) {
    throw new Error(`Blog post ${slug} is missing a date in frontmatter.`);
  }

  const stats = readingTime(body);
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  const fileStats = fs.statSync(filePath);

  return {
    slug,
    title: fm.title.trim(),
    excerpt: fm.excerpt?.trim() ?? body.slice(0, 160).replace(/\s+/g, " ") + "…",
    date: fm.date,
    lastModified: fm.lastModified ?? fileStats.mtime.toISOString(),
    tags: fm.tags ?? [],
    readingTime: Math.max(1, Math.round(stats.minutes)),
    wordCount: stats.words,
    status: fm.status ?? "published",
    changelog: fm.changelog ?? [],
  };
}

export function getAllBlogPosts(includeDrafts = false): BlogPostMeta[] {
  const files = readBlogFiles();

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(blogDirectory, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw) as { data: RawFrontmatter; content: string };
    const meta = parseFrontmatter(slug, data, content);
    return meta;
  });

  return posts
    .filter((meta) => (includeDrafts ? true : meta.status === "published"))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found for slug ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw) as { data: RawFrontmatter; content: string };
  const meta = parseFrontmatter(slug, data, content);

  const headings: BlogHeading[] = [];

  const remarkHeadings = () => (tree: unknown) => {
    visit(tree, "heading", (node: any) => {
      if (node.depth > 3) return;
      const text = toString(node).trim();
      if (!text) return;
      const id = slugify(text);
      if (!node.data) node.data = {};
      if (!node.data.hProperties) node.data.hProperties = {};
      node.data.id = id;
      node.data.hProperties.id = id;
      headings.push({ id, title: text, depth: node.depth });
    });
  };

  const { content: compiled } = await compileMDX({
    source: raw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkHeadings],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
  });

  return {
    ...meta,
    content: compiled,
    toc: headings,
  };
}

export function findAdjacentPosts(slug: string) {
  const posts = getAllBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };
  const previous = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;
  return { previous, next };
}
