import { CommentSection } from "@/components/comments"

export default function CommentsTestPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Comment System Test</h1>
          <p className="text-lg text-muted-foreground">
            Testing our SQLite-powered blog comment system
          </p>
        </div>

        <div className="space-y-8">
          {/* Sample blog post content */}
          <article className="prose prose-lg mx-auto">
            <h2>Sample Blog Post</h2>
            <p>
              This is a sample blog post to demonstrate our comment system. 
              The comment system uses SQLite database with Prisma ORM and includes:
            </p>
            <ul>
              <li>✅ Real-time comment posting and display</li>
              <li>✅ Author name and timestamp tracking</li>  
              <li>✅ Comment moderation system (auto-approved for demo)</li>
              <li>✅ Responsive design with Tailwind CSS</li>
              <li>✅ Error handling and loading states</li>
            </ul>
            <p>
              Try adding a comment below to see the system in action!
            </p>
          </article>

          {/* Comment Section */}
          <CommentSection 
            postId="sample-blog-post" 
            title="Discussion"
          />
        </div>

        {/* Development Info */}
        <div className="mt-16 p-6 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-3">🛠️ Development Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Database:</strong> SQLite + Prisma ORM
            </div>
            <div>
              <strong>API:</strong> Next.js App Router API Routes
            </div>
            <div>
              <strong>UI:</strong> Shadcn/ui + Tailwind CSS
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Comments are stored locally in <code>prisma/dev.db</code> and auto-approved for demonstration.
          </p>
        </div>
      </div>
    </div>
  )
}