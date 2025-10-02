import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Eye, Clock, Globe } from "lucide-react"

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">📊 Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Website traffic and engagement insights
          </p>
        </div>

        {/* Status Banner */}
        <Card className="mb-8 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-800">Analytics Ready</h3>
                <p className="text-yellow-700 text-sm">
                  Connect Postgres database to start collecting visitor data and page views
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href="/setup/databases">Setup Postgres →</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mock Analytics Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Eye className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">--</p>
                  <p className="text-sm text-muted-foreground">Page Views</p>
                  <p className="text-xs text-green-600">↗ +0% vs last week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">--</p>
                  <p className="text-sm text-muted-foreground">Unique Visitors</p>
                  <p className="text-xs text-green-600">↗ +0% vs last week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">--</p>
                  <p className="text-sm text-muted-foreground">Avg. Session</p>
                  <p className="text-xs text-green-600">↗ +0% vs last week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">--</p>
                  <p className="text-sm text-muted-foreground">Bounce Rate</p>
                  <p className="text-xs text-red-600">↘ -0% vs last week</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Pages</CardTitle>
              <CardDescription>Most visited pages this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="font-semibold mb-2">No Data Yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Page view tracking will appear here once Postgres is connected
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Ready to collect data
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Live visitor activity stream</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="font-semibold mb-2">Waiting for Visitors</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Real-time visitor activity will stream here
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    Analytics system ready
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Preview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🚀 Analytics Features (Ready to Activate)</CardTitle>
            <CardDescription>
              What you'll get once Postgres database is connected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="font-semibold mb-2">📈 Page View Tracking</div>
                <div className="text-sm text-muted-foreground">
                  Automatic tracking of every page visit with timestamps and referrer data
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="font-semibold mb-2">👥 Visitor Analytics</div>
                <div className="text-sm text-muted-foreground">
                  Unique visitor counting, session duration, and user agent analysis
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="font-semibold mb-2">📊 Popular Content</div>
                <div className="text-sm text-muted-foreground">
                  Discover which blog posts and projects get the most engagement
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="font-semibold mb-2">🕒 Real-time Activity</div>
                <div className="text-sm text-muted-foreground">
                  Live stream of visitor activity across your portfolio
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="font-semibold mb-2">📱 Device & Browser Data</div>
                <div className="text-sm text-muted-foreground">
                  Understand your audience's technology preferences
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="font-semibold mb-2">📧 Contact Form Analytics</div>
                <div className="text-sm text-muted-foreground">
                  Track contact form submissions and response rates
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Ready to Start Tracking?</h3>
              <p className="text-muted-foreground mb-4">
                Set up your Postgres database to unlock powerful analytics insights
              </p>
              <div className="space-x-4">
                <Button asChild>
                  <a href="/setup/databases">Setup Database</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/api/health" target="_blank">Check Status</a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}