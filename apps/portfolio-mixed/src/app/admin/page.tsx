import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Database, BarChart3, MessageCircle, Home, ExternalLink } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">⚡ Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your portfolio, analytics, and content
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/comments">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="font-semibold">Comments</div>
                    <div className="text-sm text-muted-foreground">Moderate & manage</div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/admin/analytics">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-8 w-8 text-green-500" />
                  <div>
                    <div className="font-semibold">Analytics</div>
                    <div className="text-sm text-muted-foreground">Traffic & insights</div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/setup/databases">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Database className="h-8 w-8 text-purple-500" />
                  <div>
                    <div className="font-semibold">Database Setup</div>
                    <div className="text-sm text-muted-foreground">Configure & test</div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/api/health" target="_blank">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Settings className="h-8 w-8 text-orange-500" />
                  <div>
                    <div className="font-semibold">Health Check</div>
                    <div className="text-sm text-muted-foreground">System status</div>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* System Status */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🔍 System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-green-700">SQLite Database</div>
                  <div className="text-sm text-green-600">Comment system operational</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-yellow-700">Vercel Postgres</div>
                  <div className="text-sm text-yellow-600">Ready for setup</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-yellow-700">MongoDB Atlas</div>
                  <div className="text-sm text-yellow-600">Ready for setup</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>🚀 Active Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="default" className="w-16 justify-center">LIVE</Badge>
                <div>
                  <div className="font-semibold">Blog Comment System</div>
                  <div className="text-sm text-muted-foreground">SQLite + Real-time UI</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="default" className="w-16 justify-center">LIVE</Badge>
                <div>
                  <div className="font-semibold">Page View Tracking</div>
                  <div className="text-sm text-muted-foreground">Client-side analytics</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="default" className="w-16 justify-center">LIVE</Badge>
                <div>
                  <div className="font-semibold">Multi-Database Health</div>
                  <div className="text-sm text-muted-foreground">Connection monitoring</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⏳ Ready to Activate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="w-16 justify-center">READY</Badge>
                <div>
                  <div className="font-semibold">Website Analytics</div>
                  <div className="text-sm text-muted-foreground">Needs Postgres connection</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="w-16 justify-center">READY</Badge>
                <div>
                  <div className="font-semibold">Project Management</div>
                  <div className="text-sm text-muted-foreground">Needs MongoDB connection</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="w-16 justify-center">READY</Badge>
                <div>
                  <div className="font-semibold">Contact Form Storage</div>
                  <div className="text-sm text-muted-foreground">Needs Postgres connection</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Test Links */}
        <Card>
          <CardHeader>
            <CardTitle>🧪 Quick Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" size="sm" asChild className="h-auto p-3">
                <Link href="/comments-test" target="_blank">
                  <div className="text-center">
                    <div className="font-medium">Test Comments</div>
                    <ExternalLink className="h-3 w-3 mx-auto mt-1" />
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="h-auto p-3">
                <Link href="/blog/ccna-ceh-lab-notes" target="_blank">
                  <div className="text-center">
                    <div className="font-medium">Live Blog Post</div>
                    <ExternalLink className="h-3 w-3 mx-auto mt-1" />
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="h-auto p-3">
                <Link href="/api/health" target="_blank">
                  <div className="text-center">
                    <div className="font-medium">API Health</div>
                    <ExternalLink className="h-3 w-3 mx-auto mt-1" />
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="h-auto p-3">
                <Link href="/api/comments?postId=test" target="_blank">
                  <div className="text-center">
                    <div className="font-medium">Comments API</div>
                    <ExternalLink className="h-3 w-3 mx-auto mt-1" />
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>🎯 Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge>1</Badge>
                <div>
                  <Link href="/setup/databases" className="font-semibold text-primary hover:underline">
                    Set up external databases (10 minutes)
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Connect Postgres and MongoDB to unlock all features
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge>2</Badge>
                <div>
                  <div className="font-semibold">Test complete system</div>
                  <div className="text-sm text-muted-foreground">
                    Verify all databases show ✅ in health check
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge>3</Badge>
                <div>
                  <div className="font-semibold">Deploy to production</div>
                  <div className="text-sm text-muted-foreground">
                    Push to Vercel with all database connections configured
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