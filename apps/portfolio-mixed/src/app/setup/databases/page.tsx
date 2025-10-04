import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink, Database, Server, Zap } from "lucide-react"

export default function DatabaseSetupPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🗄️ Database Setup Guide</h1>
          <p className="text-lg text-muted-foreground">
            Set up your free cloud databases in 10 minutes
          </p>
        </div>

        {/* Current Status */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              SQLite Database (WORKING ✅)
            </CardTitle>
            <CardDescription className="text-green-600">
              Your comment system is already running with SQLite backend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>• Blog comments with real-time updates</div>
              <div>• Author tracking and timestamps</div>
              <div>• Moderation system ready</div>
              <div>• Mobile-responsive UI</div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Steps */}
        <div className="space-y-6">
          {/* Vercel Postgres */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-blue-500" />
                Step 1: Vercel Postgres Setup
                <Badge variant="secondary">5 minutes</Badge>
              </CardTitle>
              <CardDescription>
                Free tier: 60 compute hours/month, 5GB storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">1</Badge>
                  <div>
                    <div className="font-medium">Go to Vercel Storage</div>
                    <div className="text-sm text-muted-foreground">
                      Visit the Vercel dashboard and create a new Postgres database
                    </div>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <a href="https://vercel.com/storage/postgres" target="_blank">
                        Open Vercel Storage <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-1">2</Badge>
                  <div>
                    <div className="font-medium">Create Database</div>
                    <div className="text-sm text-muted-foreground">
                      Click "Create Database" → Choose "Postgres" → Name it "portfolio-analytics"
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-1">3</Badge>
                  <div>
                    <div className="font-medium">Copy Connection Strings</div>
                    <div className="text-sm text-muted-foreground">
                      Go to the ".env.local" tab and copy all POSTGRES_* variables
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-1">4</Badge>
                  <div>
                    <div className="font-medium">Update .env.local</div>
                    <div className="text-sm text-muted-foreground">
                      Paste the connection strings into your local .env.local file
                    </div>
                    <div className="mt-2 p-3 bg-muted rounded text-xs font-mono">
                      POSTGRES_URL="postgresql://..."<br/>
                      POSTGRES_PRISMA_URL="postgresql://..."<br/>
                      POSTGRES_URL_NO_SSL="postgresql://..."<br/>
                      # ... etc
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* MongoDB Atlas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-500" />
                Step 2: MongoDB Atlas Setup
                <Badge variant="secondary">5 minutes</Badge>
              </CardTitle>
              <CardDescription>
                Free tier: M0 cluster, 512MB storage, no time limit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">1</Badge>
                  <div>
                    <div className="font-medium">Create MongoDB Account</div>
                    <div className="text-sm text-muted-foreground">
                      Sign up for a free MongoDB Atlas account
                    </div>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <a href="https://www.mongodb.com/atlas" target="_blank">
                        Open MongoDB Atlas <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-1">2</Badge>
                  <div>
                    <div className="font-medium">Create Free Cluster</div>
                    <div className="text-sm text-muted-foreground">
                      Choose "M0 Sandbox" (free tier) → Pick a cloud provider → Create cluster
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-1">3</Badge>
                  <div>
                    <div className="font-medium">Setup Database User</div>
                    <div className="text-sm text-muted-foreground">
                      Create a database user with read/write access
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-1">4</Badge>
                  <div>
                    <div className="font-medium">Get Connection String</div>
                    <div className="text-sm text-muted-foreground">
                      Click "Connect" → "Connect your application" → Copy the connection string
                    </div>
                    <div className="mt-2 p-3 bg-muted rounded text-xs font-mono">
                      MONGODB_URI="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE"
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Everything */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Step 3: Test Your Setup
              </CardTitle>
              <CardDescription>
                Verify all databases are connected and working
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">1</Badge>
                  <div>
                    <div className="font-medium">Restart Dev Server</div>
                    <div className="text-sm text-muted-foreground">
                      Stop and restart your development server to load new environment variables
                    </div>
                    <div className="mt-2 p-3 bg-muted rounded text-xs font-mono">
                      Ctrl+C (stop server)<br/>
                      npm run dev (restart)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-1">2</Badge>
                  <div>
                    <div className="font-medium">Check Health Endpoint</div>
                    <div className="text-sm text-muted-foreground">
                      Visit the health check to see all three databases show ✅ status
                    </div>
                    <Button variant="outline" size="sm" className="mt-2" asChild>
                      <a href="/api/health" target="_blank">
                        Check Database Health <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="mt-1">3</Badge>
                  <div>
                    <div className="font-medium">Test Analytics & Projects</div>
                    <div className="text-sm text-muted-foreground">
                      Once all databases show healthy, test the analytics and projects endpoints
                    </div>
                    <div className="mt-2 space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href="/api/analytics" target="_blank">
                          Analytics API <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="/api/projects" target="_blank">
                          Projects API <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Success */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  🎉 Congratulations!
                </h3>
                <p className="text-green-600 mb-4">
                  You now have a complete multi-database architecture:
                </p>
                <div className="text-sm text-green-600 space-y-1">
                  <div>✅ SQLite for blog comments</div>
                  <div>✅ Postgres for analytics & contact forms</div>
                  <div>✅ MongoDB for projects & dynamic content</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}