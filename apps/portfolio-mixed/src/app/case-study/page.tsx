import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Study: Multi-Database Portfolio Architecture",
  description: "Deep dive into building a production-ready portfolio with Next.js 15, multiple databases, and modern DevOps practices.",
};

export default function CaseStudyPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12">
      {/* Header */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Case Study</h1>
          <p className="text-xl text-muted-foreground">
            Building a Modern Portfolio with Multi-Database Architecture
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Next.js 15", "TypeScript", "MongoDB Atlas", "PostgreSQL", "SQLite", "Vercel", "Prisma"].map((tech) => (
            <span key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Challenge */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">The Challenge</h2>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>
            Building a professional portfolio that demonstrates real full-stack capabilities beyond simple static sites. 
            The goal was to create a production-ready system showcasing modern development practices, multiple database 
            integrations, and enterprise-level architecture decisions.
          </p>
          <div className="rounded-lg bg-muted p-6">
            <h3 className="font-semibold mb-2">Key Requirements:</h3>
            <ul className="space-y-2">
              <li>✅ Multi-database architecture demonstrating different use cases</li>
              <li>✅ Real-time features (comments, analytics, health monitoring)</li>
              <li>✅ Production-ready deployment with proper DevOps practices</li>
              <li>✅ Mobile-first responsive design with accessibility</li>
              <li>✅ Content management without external CMS dependencies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Solution Architecture */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Solution Architecture</h2>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border p-6 space-y-3">
              <h3 className="text-xl font-semibold text-blue-600">SQLite Layer</h3>
              <p className="text-sm text-muted-foreground">Comments System</p>
              <ul className="text-sm space-y-1">
                <li>• File-based database</li>
                <li>• Prisma ORM integration</li>
                <li>• Real-time comment system</li>
                <li>• Zero external dependencies</li>
              </ul>
            </div>
            <div className="rounded-lg border p-6 space-y-3">
              <h3 className="text-xl font-semibold text-green-600">MongoDB Atlas</h3>
              <p className="text-sm text-muted-foreground">Projects & Content</p>
              <ul className="text-sm space-y-1">
                <li>• Cloud-native NoSQL</li>
                <li>• Flexible schema design</li>
                <li>• Geographic distribution</li>
                <li>• Rich query capabilities</li>
              </ul>
            </div>
            <div className="rounded-lg border p-6 space-y-3">
              <h3 className="text-xl font-semibold text-purple-600">PostgreSQL</h3>
              <p className="text-sm text-muted-foreground">Analytics & Forms</p>
              <ul className="text-sm space-y-1">
                <li>• Relational integrity</li>
                <li>• Complex analytics queries</li>
                <li>• Vercel Postgres integration</li>
                <li>• ACID compliance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Technical Implementation</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Frontend Architecture</h3>
            <div className="rounded-lg bg-slate-50 p-6 dark:bg-slate-900">
              <pre className="text-sm overflow-x-auto">
{`// Multi-database connection strategy
export const database = {
  sqlite: () => prisma,           // Comments, sessions
  mongodb: () => mongoose,        // Projects, content
  postgres: () => vercelPg,      // Analytics, forms
}

// Type-safe API routes
export async function GET(request: NextRequest) {
  const health = await checkDatabaseHealth();
  return NextResponse.json({ 
    databases: health,
    timestamp: new Date().toISOString() 
  });
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Mobile Navigation Solution</h3>
            <p className="text-muted-foreground">
              Built a custom mobile menu replacing complex Sheet components with a more reliable solution:
            </p>
            <ul className="space-y-2">
              <li>• <strong>Hydration Protection:</strong> Prevents SSR/client mismatches</li>
              <li>• <strong>Accessibility First:</strong> Keyboard navigation, ARIA labels, screen reader support</li>
              <li>• <strong>Performance Optimized:</strong> Smooth animations with Framer Motion</li>
              <li>• <strong>Content-Aware Search:</strong> Searches across all page content and metadata</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Results & Metrics */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Results & Metrics</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                <span>Build Time</span>
                <span className="font-mono text-green-600">~10s</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                <span>Page Load (FCP)</span>
                <span className="font-mono text-blue-600">&lt;1.5s</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg dark:bg-purple-900/20">
                <span>Mobile Performance</span>
                <span className="font-mono text-purple-600">95+</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg dark:bg-orange-900/20">
                <span>Accessibility Score</span>
                <span className="font-mono text-orange-600">100</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Technical Achievements</h3>
            <ul className="space-y-2">
              <li>✅ Zero console errors in production</li>
              <li>✅ Perfect mobile responsiveness</li>
              <li>✅ Real-time database health monitoring</li>
              <li>✅ Automated deployment pipeline</li>
              <li>✅ Type-safe end-to-end development</li>
              <li>✅ Production-ready security practices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Lessons Learned */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Lessons Learned</h2>
        <div className="space-y-4">
          <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">Database Strategy</h3>
            <p className="mt-2 text-blue-800 dark:text-blue-200">
              Different databases excel at different use cases. SQLite for simple, fast operations; MongoDB for 
              flexible content; PostgreSQL for complex analytics. The key is matching the tool to the job.
            </p>
          </div>
          
          <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6 dark:bg-green-900/20">
            <h3 className="font-semibold text-green-900 dark:text-green-100">Mobile-First Development</h3>
            <p className="mt-2 text-green-800 dark:text-green-200">
              Building custom components from scratch often provides better control and reliability than complex 
              third-party libraries, especially for critical UI elements like navigation.
            </p>
          </div>

          <div className="rounded-lg border-l-4 border-purple-500 bg-purple-50 p-6 dark:bg-purple-900/20">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100">DevOps Integration</h3>
            <p className="mt-2 text-purple-800 dark:text-purple-200">
              Automated deployment, health monitoring, and proper environment management are essential for 
              professional portfolio projects that demonstrate real-world capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold">Future Enhancements</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Technical Roadmap</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Redis integration for caching</li>
              <li>• WebSocket real-time features</li>
              <li>• Advanced analytics dashboard</li>
              <li>• API rate limiting and security</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Content Expansion</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Technical blog series</li>
              <li>• Interactive code examples</li>
              <li>• Project deep-dives</li>
              <li>• Community features</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Interested in the Implementation?</h2>
          <p className="text-blue-100">
            This case study represents a real, production-ready system. All code is available on GitHub, 
            and the live system demonstrates the concepts in action.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://github.com/haziqachik/haziqhtech-portfolio" 
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white/10 px-6 py-2 font-medium backdrop-blur transition-colors hover:bg-white/20"
            >
              View Source Code
            </a>
            <a 
              href="/contact" 
              className="rounded-lg bg-white/10 px-6 py-2 font-medium backdrop-blur transition-colors hover:bg-white/20"
            >
              Discuss Implementation
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}