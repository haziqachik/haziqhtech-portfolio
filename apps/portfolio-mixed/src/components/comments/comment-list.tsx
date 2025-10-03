"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, RefreshCw, Calendar } from "lucide-react"

interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
  postId: string
  parentId?: string
  isApproved: boolean
}

interface CommentListProps {
  postId: string
  refreshTrigger?: number
}

export function CommentList({ postId, refreshTrigger }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadComments = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch(`/api/comments?postSlug=${encodeURIComponent(postId)}`)
      
      if (!response.ok) {
        throw new Error(`Failed to load comments: ${response.statusText}`)
      }
      
      const data = await response.json()
      setComments(data.comments || [])
    } catch (err) {
      console.error("Error loading comments:", err)
      setError(err instanceof Error ? err.message : "Failed to load comments")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadComments()
  }, [postId, refreshTrigger])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", 
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    } catch {
      return "Invalid date"
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading comments...
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <Button onClick={loadComments} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const approvedComments = comments.filter(comment => comment.isApproved)

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Comments ({approvedComments.length})
          <Button onClick={loadComments} variant="ghost" size="sm" className="ml-auto">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {approvedComments.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {approvedComments.map((comment) => (
              <div 
                key={comment.id} 
                className="border-l-2 border-primary/20 pl-4 py-3 bg-muted/30 rounded-r-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-primary">
                    {comment.author}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}