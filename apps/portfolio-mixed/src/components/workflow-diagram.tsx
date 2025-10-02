"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown, Database, Server, Globe, Code, Zap, Users, MessageCircle, BarChart3, Settings, CheckCircle } from "lucide-react"

interface WorkflowNode {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: "active" | "ready" | "demo"
  color: string
  details: string[]
}

const workflowNodes: WorkflowNode[] = [
  {
    id: "user-input",
    title: "User Interaction",
    description: "Comment submission, page views",
    icon: <Users className="h-6 w-6" />,
    status: "active",
    color: "bg-blue-100 border-blue-300 text-blue-700",
    details: [
      "Blog comment forms with validation",
      "Page view tracking (analytics)",
      "Admin dashboard interactions",
      "Mobile-responsive interface"
    ]
  },
  {
    id: "api-layer",
    title: "API Processing",
    description: "RESTful endpoints with validation",
    icon: <Server className="h-6 w-6" />,
    status: "active",
    color: "bg-green-100 border-green-300 text-green-700",
    details: [
      "/api/comments - CRUD operations",
      "/api/health - Database monitoring", 
      "/api/analytics - Traffic data",
      "Input validation & error handling"
    ]
  },
  {
    id: "database-layer",
    title: "Multi-Database Storage",
    description: "Specialized data persistence",
    icon: <Database className="h-6 w-6" />,
    status: "active",
    color: "bg-purple-100 border-purple-300 text-purple-700",
    details: [
      "SQLite: Blog comments (ACTIVE)",
      "Postgres: Analytics data (READY)",
      "MongoDB: Projects/skills (READY)",
      "Prisma ORM with type safety"
    ]
  },
  {
    id: "real-time-ui",
    title: "Real-time UI Update",
    description: "Live interface refresh",
    icon: <Zap className="h-6 w-6" />,
    status: "active",
    color: "bg-orange-100 border-orange-300 text-orange-700",
    details: [
      "Instant comment display",
      "Loading states & error handling",
      "Auto-refresh on new data",
      "Responsive design patterns"
    ]
  }
]

const techStack = [
  {
    category: "Frontend",
    technologies: ["Next.js 15", "React Server Components", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
    color: "bg-blue-50 border-blue-200",
    icon: <Globe className="h-5 w-5 text-blue-600" />
  },
  {
    category: "Backend",
    technologies: ["API Routes", "Prisma ORM", "Input Validation", "Error Handling"],
    color: "bg-green-50 border-green-200",
    icon: <Server className="h-5 w-5 text-green-600" />
  },
  {
    category: "Database",
    technologies: ["SQLite", "PostgreSQL", "MongoDB", "Multi-DB Architecture"],
    color: "bg-purple-50 border-purple-200",
    icon: <Database className="h-5 w-5 text-purple-600" />
  },
  {
    category: "DevOps",
    technologies: ["Vercel Deploy", "Environment Config", "Git Workflow", "Hot Reload"],
    color: "bg-orange-50 border-orange-200",
    icon: <Settings className="h-5 w-5 text-orange-600" />
  }
]

export function WorkflowDiagram() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {/* Workflow Title */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-green-100 text-green-800">LIVE SYSTEM WORKFLOW</Badge>
        <h2 className="text-3xl font-bold mb-2">Real-Time Data Flow</h2>
        <p className="text-muted-foreground">Interactive diagram showing how data flows through the custom-built system</p>
      </div>

      {/* Main Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {workflowNodes.map((node, index) => (
          <div key={node.id} className="relative">
            <Card 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedNode === node.id ? 'ring-2 ring-primary' : ''
              } ${node.color}`}
              onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  {node.icon}
                  <Badge variant="secondary" className={`text-xs ${
                    node.status === 'active' ? 'bg-green-100 text-green-800' : 
                    node.status === 'ready' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {node.status.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{node.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">{node.description}</p>
              </CardContent>
            </Card>
            
            {/* Arrow to next node */}
            {index < workflowNodes.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            )}
            
            {/* Arrow down on mobile */}
            {index < workflowNodes.length - 1 && (
              <div className="lg:hidden flex justify-center my-4">
                <ArrowDown className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {workflowNodes.find(n => n.id === selectedNode)?.icon}
              {workflowNodes.find(n => n.id === selectedNode)?.title} Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {workflowNodes.find(n => n.id === selectedNode)?.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{detail}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {techStack.map((stack) => (
          <Card key={stack.category} className={stack.color}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                {stack.icon}
                {stack.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {stack.technologies.map((tech) => (
                  <li key={tech} className="text-sm">• {tech}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Demo Links */}
      <Card>
        <CardHeader>
          <CardTitle>🧪 Test the Live System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" size="sm" asChild className="h-auto p-3">
              <a href="/comments-test" target="_blank">
                <div className="text-center">
                  <MessageCircle className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Comment System</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" size="sm" asChild className="h-auto p-3">
              <a href="/admin" target="_blank">
                <div className="text-center">
                  <Settings className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Admin Dashboard</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" size="sm" asChild className="h-auto p-3">
              <a href="/api/health" target="_blank">
                <div className="text-center">
                  <Database className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Database Health</div>
                </div>
              </a>
            </Button>
            
            <Button variant="outline" size="sm" asChild className="h-auto p-3">
              <a href="/admin/analytics" target="_blank">
                <div className="text-center">
                  <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Analytics</div>
                </div>
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}