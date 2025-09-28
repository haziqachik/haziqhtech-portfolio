import BlogList from "./blog-list-client";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Haziq Asyraaf",
  description: "Notes from automation, analytics, and cybersecurity lab work.",
};

export default async function BlogPage() {
  const posts = getAllBlogPosts();

  return <BlogList posts={posts} />;
}
