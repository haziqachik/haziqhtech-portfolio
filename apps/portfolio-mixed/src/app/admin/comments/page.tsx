import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, CheckCircle, XCircle, Clock, Trash2 } from "lucide-react"

// This would be a server component in a real app with proper auth
export default async function AdminCommentsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Comment Moderation</h1>
          <p className="text-muted-foreground">
            Manage blog comments across all posts
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Total Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <XCircle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Spam/Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Comments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Comments</CardTitle>
            <CardDescription>
              Latest comments from all blog posts requiring moderation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Comments Yet</h3>
              <p className="text-muted-foreground mb-4">
                Comments will appear here when visitors start engaging with your blog posts.
              </p>
              <Button variant="outline" asChild>
                <a href="/blog" target="_blank">
                  Visit Blog →
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Testing */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🧪 Development Tools</CardTitle>
            <CardDescription>
              Test the comment system and database connections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" asChild className="h-auto p-4">
                <a href="/comments-test" target="_blank" className="block">
                  <div className="text-left">
                    <div className="font-semibold">Comment System Test</div>
                    <div className="text-sm text-muted-foreground">
                      Try the comment form
                    </div>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" asChild className="h-auto p-4">
                <a href="/api/health" target="_blank" className="block">
                  <div className="text-left">
                    <div className="font-semibold">Database Health</div>
                    <div className="text-sm text-muted-foreground">
                      Check all connections
                    </div>
                  </div>
                </a>
              </Button>
              
              <Button variant="outline" asChild className="h-auto p-4">
                <a href="/blog/ccna-ceh-lab-notes" target="_blank" className="block">
                  <div className="text-left">
                    <div className="font-semibold">Live Blog Post</div>
                    <div className="text-sm text-muted-foreground">
                      Real comments in action
                    </div>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚀 Next Steps: Complete Database Setup
            </CardTitle>
            <CardDescription>
              Ready to unlock analytics and project management features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">1</Badge>
                <div>
                  <div className="font-semibold">Vercel Postgres Setup</div>
                  <div className="text-sm text-muted-foreground">
                    5 minutes → Enable analytics & contact form storage
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="secondary">2</Badge>
                <div>
                  <div className="font-semibold">MongoDB Atlas Setup</div>
                  <div className="text-sm text-muted-foreground">
                    5 minutes → Dynamic projects & skills management
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="secondary">3</Badge>
                <div>
                  <div className="font-semibold">Test Everything</div>
                  <div className="text-sm text-muted-foreground">
                    Verify all 3 databases show ✅ in health check
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}