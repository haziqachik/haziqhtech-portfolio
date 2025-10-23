import { getAllBlogPosts } from '@/lib/blog';

const baseUrl = 'https://haziqhtech.sg';

export default function sitemap() {
  const blogPosts = getAllBlogPosts();
  
  const blogUrls = blogPosts.map((post) => {
    // Ensure valid date or fallback to current date
    let lastModified: Date;
    try {
      const parsedDate = new Date(post.date);
      lastModified = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
    } catch {
      lastModified = new Date();
    }
    
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

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
