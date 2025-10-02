import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import { CommentSection } from "@/components/comments";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";

type Params = { slug: string };

export async function generateStaticParams() {
  const posts = getAllBlogPosts(true);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  try {
    const p = await params;
    const post = await getBlogPost(p.slug);
    return {
      title: `${post.title} | Haziq Asyraaf`,
      description: post.summary,
    };
  } catch {
    return { title: "Post not found" };
  }
}

export default async function Page({ params }: { params: Promise<Params> }) {
  try {
    const p = await params;
    const post = await getBlogPost(p.slug);

    const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
      <article className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 md:px-0">
        {/* Analytics Tracking */}
        <PageViewTracker pageId={`blog-${post.slug}`} title={post.title} />
        <header className="relative overflow-hidden rounded-3xl border border-primary/25 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.18),_transparent_65%)] p-10 shadow-lg shadow-primary/10 md:p-14">
          <div className="flex flex-col gap-5">
            <Badge variant="secondary" className="w-fit">{formattedDate}</Badge>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl xl:text-6xl">
                {post.title}
              </h1>
              <p className="max-w-3xl text-base text-muted-foreground md:text-lg">{post.summary}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              {post.tags.map((tag: string) => (
                <Badge key={`${post.slug}-${tag}`} variant="outline" className="border-border/60 font-medium uppercase tracking-[0.2em]">
                  {tag}
                </Badge>
              ))}
              <Badge variant="outline" className="border-border/60 font-medium uppercase tracking-[0.2em]">
                {post.readingTime} min read
              </Badge>
            </div>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:items-start">
          <div className="rounded-3xl border border-border/50 bg-background/80 p-8 shadow-lg shadow-primary/5">
            <div className="prose prose-slate dark:prose-invert max-w-none prose-p:my-6 prose-ul:my-6 prose-ol:my-6 prose-headings:mt-10 prose-headings:mb-4 prose-li:marker:text-primary">
              {post.content /* MDX content as React nodes */}
            </div>
          </div>

          {post.toc.length ? (
            <aside className="sticky top-32 hidden lg:block">
              <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-soft">
                <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">On this page</h2>
                <nav className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {post.toc.map((h: { id: string; title: string; depth: number }) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="block rounded-lg px-3 py-2 transition hover:bg-muted hover:text-foreground"
                      style={{ marginLeft: h.depth > 2 ? 16 : 0 }}
                    >
                      {h.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          ) : null}
        </div>

        {/* Comment Section */}
        <section className="w-full">
          <CommentSection 
            postId={post.slug} 
            title="Join the Discussion"
          />
        </section>

        <Card className="border-border/70 bg-card/90">
          <CardHeader>
            <CardTitle className="text-lg">Keep exploring</CardTitle>
            <CardDescription>More posts and case studies live on the main blog page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/blog" className="text-sm font-semibold text-primary transition hover:underline">
              ← Back to all posts
            </Link>
          </CardContent>
        </Card>
      </article>
    );
  } catch {
    notFound();
  }
}
