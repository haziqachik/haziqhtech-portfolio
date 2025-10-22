import { getAllBlogPosts } from '@/lib/blog';

const baseUrl = 'https://haziqhtech.sg';

export default function sitemap() {
  const blogPosts = getAllBlogPosts();
  
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const routes = ['', '/about', '/architecture', '/projects', '/timeline', '/blog', '/resume', '/contact'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.9,
    })
  );

  return [...routes, ...blogUrls];
}
