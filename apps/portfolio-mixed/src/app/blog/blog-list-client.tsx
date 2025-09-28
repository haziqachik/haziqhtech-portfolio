"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPostMeta[];
}

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function BlogList({ posts }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const collection = new Set<string>();
    posts.forEach((post) => {
      post.tags.forEach((tag) => collection.add(tag));
    });
    return Array.from(collection.values()).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filtered = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag, posts]);

  return (
    <div className="flex flex-col gap-10">
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4 text-center md:text-left"
      >
        <Badge variant="secondary" className="mx-auto w-fit md:mx-0">
          Blog
        </Badge>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Lab notes & working logs</h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:mx-0 md:text-base">
            Walkthroughs from automation, analytics, and cybersecurity experiments. Filter a topic to hone in on what matters to you.
          </p>
        </div>
      </motion.section>

      {tags.length ? (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          className="flex flex-wrap gap-2"
        >
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
              activeTag === null
                ? "border-primary bg-primary text-primary-foreground shadow-soft-sm"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            All topics
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                activeTag === tag
                  ? "border-primary bg-primary text-primary-foreground shadow-soft-sm"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.section>
      ) : null}

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
            >
              <Card className="h-full border-border/70 bg-card/90 transition-shadow hover:shadow-lg">
                <CardHeader className="space-y-3">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden>•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{post.summary}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={`${post.slug}-${tag}`} variant="outline" className="border-border/60 text-xs font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-primary transition hover:underline"
                  >
                    Read post →
                  </Link>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
        {filtered.length === 0 ? (
          <Card className="mt-8 border-border/70 bg-card/90 text-center">
            <CardHeader>
              <CardTitle className="text-lg">No posts for that topic yet</CardTitle>
              <CardDescription>Pick a different filter or check back soon for new long-form notes.</CardDescription>
            </CardHeader>
          </Card>
        ) : null}
      </motion.section>
    </div>
  );
}
