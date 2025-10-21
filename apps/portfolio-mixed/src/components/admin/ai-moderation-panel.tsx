"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"

export function AIModerationPanel() {
  const [commentText, setCommentText] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!commentText.trim() || !authorName.trim()) {
      alert("Please enter both author name and comment text")
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    try {
      const response = await fetch("/api/comments/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentText: commentText.trim(),
          authorName: authorName.trim()
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult(data.moderation)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("Failed to analyze:", error)
      alert("Failed to analyze comment. Check console for details.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Comment Moderation
        </CardTitle>
        <CardDescription>
          Test Claude Sonnet 4.5 moderation on any comment before publishing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Author Name</label>
          <Input
            placeholder="John Doe"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            disabled={isAnalyzing}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Comment Text</label>
          <Textarea
            placeholder="Enter comment to analyze..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isAnalyzing}
            rows={4}
            className="resize-none"
          />
        </div>

        <Button 
          onClick={handleAnalyze} 
          disabled={isAnalyzing || !commentText.trim() || !authorName.trim()}
          className="w-full"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Analyze with Claude Sonnet 4.5
            </>
          )}
        </Button>

        {result && (
          <Card className={result.isApproved ? "border-green-500/50 bg-green-500/5" : "border-red-500/50 bg-red-500/5"}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                {result.isApproved ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-semibold">
                  {result.isApproved ? "Approved" : "Rejected"}
                </span>
                <Badge variant="outline" className="ml-auto">
                  {(result.confidence * 100).toFixed(0)}% confident
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium mb-1">Reason:</p>
                <p className="text-sm text-muted-foreground">{result.reason}</p>
              </div>

              {result.flags && result.flags.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Flags:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.flags.map((flag: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {flag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {result.suggestions && (
                <div>
                  <p className="text-sm font-medium mb-1">Suggestions:</p>
                  <p className="text-sm text-muted-foreground italic">{result.suggestions}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
