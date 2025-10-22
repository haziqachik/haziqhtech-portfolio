export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/setup/'],
      },
    ],
    sitemap: 'https://haziqhtech.sg/sitemap.xml',
  };
}
