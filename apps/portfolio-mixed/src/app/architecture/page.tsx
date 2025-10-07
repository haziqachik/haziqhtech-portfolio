import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Database, Server, Globe, Code, Zap, Users } from "lucide-react"
import { WorkflowDiagram } from "@/components/workflow-diagram"

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">BUILT FROM SCRATCH</Badge>
          <h1 className="text-5xl font-bold mb-4">🏗️ Full-Stack Architecture</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete system designed and developed from the ground up. 
            No templates, no purchased themes - pure custom development showcasing modern full-stack capabilities.
          </p>
        </div>

        {/* Development Approach */}
        <Card className="mb-12 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-800">
              <Code className="h-6 w-6" />
              Built from Scratch - Zero to Production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-green-700">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">0</div>
                <div className="text-sm">Templates Used</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">100%</div>
                <div className="text-sm">Custom Code</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">15+</div>
                <div className="text-sm">Technologies Integrated</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Workflow Diagram */}
        <WorkflowDiagram />

        {/* Architecture Diagram */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>System Architecture Layers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Layer 1: Frontend */}
              <div className="text-center">
                <Badge variant="outline" className="mb-4">FRONTEND LAYER</Badge>
                <div className="flex flex-wrap justify-center gap-4">
                  <Card className="w-48 bg-blue-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold text-blue-800">Next.js 15</div>
                      <div className="text-xs text-blue-600">App Router + RSC</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="w-48 bg-purple-50 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <div className="font-semibold text-purple-800">React UI</div>
                      <div className="text-xs text-purple-600">Shadcn/ui + Tailwind</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="w-48 bg-orange-50 border-orange-200">
                    <CardContent className="p-4 text-center">
                      <Code className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                      <div className="font-semibold text-orange-800">TypeScript</div>
                      <div className="text-xs text-orange-600">Type Safety</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-gray-400 rotate-90" />
              </div>

              {/* Layer 2: API Layer */}
              <div className="text-center">
                <Badge variant="outline" className="mb-4">API LAYER</Badge>
                <div className="flex flex-wrap justify-center gap-4">
                  <Card className="w-48 bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <Server className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <div className="font-semibold text-green-800">REST API</div>
                      <div className="text-xs text-green-600">/api/comments</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="w-48 bg-yellow-50 border-yellow-200">
                    <CardContent className="p-4 text-center">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                      <div className="font-semibold text-yellow-800">Analytics API</div>
                      <div className="text-xs text-yellow-600">/api/analytics</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="w-48 bg-red-50 border-red-200">
                    <CardContent className="p-4 text-center">
                      <Server className="h-8 w-8 mx-auto mb-2 text-red-600" />
                      <div className="font-semibold text-red-800">Health Monitor</div>
                      <div className="text-xs text-red-600">/api/health</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Arrow Down */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-gray-400 rotate-90" />
              </div>

              {/* Layer 3: Database Layer */}
              <div className="text-center">
                <Badge variant="outline" className="mb-4">DATABASE LAYER</Badge>
                <div className="flex flex-wrap justify-center gap-4">
                  <Card className="w-48 bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <Database className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <div className="font-semibold text-green-800">SQLite</div>
                      <div className="text-xs text-green-600">Comments System</div>
                      <Badge className="mt-2 bg-green-100 text-green-800 text-xs">ACTIVE</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="w-48 bg-blue-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <div className="font-semibold text-blue-800">Postgres</div>
                      <div className="text-xs text-blue-600">Analytics Data</div>
                      <Badge className="mt-2 bg-green-100 text-green-800 text-xs">DEPLOYED</Badge>
                    </CardContent>
                  </Card>
                  
                  <Card className="w-48 bg-purple-50 border-purple-200">
                    <CardContent className="p-4 text-center">
                      <Database className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <div className="font-semibold text-purple-800">MongoDB</div>
                      <div className="text-xs text-purple-600">Projects Data</div>
                      <Badge className="mt-2 bg-green-100 text-green-800 text-xs">DEPLOYED</Badge>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Flow */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Real-Time Data Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="font-semibold">User Interaction</div>
                <div className="text-sm text-muted-foreground">Comments, page views</div>
              </div>
              
              <div className="text-center">
                <ArrowRight className="h-6 w-6 mx-auto mb-4 text-gray-400" />
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Server className="h-8 w-8 text-green-600" />
                </div>
                <div className="font-semibold">API Processing</div>
                <div className="text-sm text-muted-foreground">Validation, business logic</div>
              </div>
              
              <div className="text-center">
                <ArrowRight className="h-6 w-6 mx-auto mb-4 text-gray-400" />
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="h-8 w-8 text-purple-600" />
                </div>
                <div className="font-semibold">Database Storage</div>
                <div className="text-sm text-muted-foreground">Persistent data</div>
              </div>
              
              <div className="text-center">
                <ArrowRight className="h-6 w-6 mx-auto mb-4 text-gray-400" />
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="font-semibold">Real-time Update</div>
                <div className="text-sm text-muted-foreground">Live UI refresh</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Complete Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-700">Frontend</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Next.js 15 (App Router)</li>
                  <li>• React Server Components</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Shadcn/ui Components</li>
                  <li>• Framer Motion</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-green-700">Backend</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Next.js API Routes</li>
                  <li>• RESTful API Design</li>
                  <li>• Prisma ORM</li>
                  <li>• Input Validation</li>
                  <li>• Error Handling</li>
                  <li>• Health Monitoring</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-purple-700">Database</h4>
                <ul className="space-y-1 text-sm">
                  <li>• SQLite (Comments)</li>
                  <li>• PostgreSQL (Analytics)</li>
                  <li>• MongoDB (Projects)</li>
                  <li>• Database Relations</li>
                  <li>• Query Optimization</li>
                  <li>• Connection Pooling</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-orange-700">DevOps</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Vercel Deployment</li>
                  <li>• Environment Config</li>
                  <li>• Git Version Control</li>
                  <li>• Hot Reload Dev</li>
                  <li>• Production Builds</li>
                  <li>• Performance Monitoring</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Development Process */}
        <Card>
          <CardHeader>
            <CardTitle>Development Journey: From Concept to Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold">Planning</div>
                <div className="text-xs text-muted-foreground">Architecture design, tech stack selection</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold">Frontend</div>
                <div className="text-xs text-muted-foreground">React components, responsive UI</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">🗄️</div>
                <div className="font-semibold">Backend</div>
                <div className="text-xs text-muted-foreground">API routes, database integration</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl mb-2">🧪</div>
                <div className="font-semibold">Testing</div>
                <div className="text-xs text-muted-foreground">Feature testing, error handling</div>
              </div>
              
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-semibold">Deploy</div>
                <div className="text-xs text-muted-foreground">Production ready, monitoring</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Explore the Live System</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/admin">Admin Dashboard</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/api/health" target="_blank">System Health</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/comments-test" target="_blank">Live Demo</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}