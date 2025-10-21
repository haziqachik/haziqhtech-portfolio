"use client"

import { useState, useEffect } from "react"
import { CommentForm } from "./comment-form"
import { CommentList } from "./comment-list"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Database } from "lucide-react"

interface CommentSectionProps {
  postSlug: string
}

export function CommentSectionWithFallback({ postSlug }: CommentSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [dbAvailable, setDbAvailable] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    // Check if comments API is available
    const checkAvailability = async () => {
      try {
        const response = await fetch(`/api/comments?postSlug=${encodeURIComponent(postSlug)}`)
        
        if (response.status === 503) {
          const data = await response.json()
          setDbAvailable(false)
          setErrorMessage(data.error || "Comments are temporarily unavailable")
        } else if (response.ok) {
          setDbAvailable(true)
        } else {
          setDbAvailable(true) // Assume available, let component handle errors
        }
      } catch (error) {
        console.error("Failed to check comments availability:", error)
        setDbAvailable(true) // Fail open - let component show its own errors
      }
    }

    checkAvailability()
  }, [postSlug])

  const handleCommentAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  // Show loading state while checking
  if (dbAvailable === null) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Database className="h-4 w-4 animate-pulse" />
              Checking comments availability...
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show fallback message if DB is unavailable
  if (dbAvailable === false) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <Card className="border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Comments Temporarily Unavailable</h3>
                <p className="text-sm text-muted-foreground">
                  The comment system is currently being set up with a production database.
                  Comments will be available soon!
                </p>
                {errorMessage && (
                  <details className="text-xs text-muted-foreground mt-2">
                    <summary className="cursor-pointer hover:text-foreground">Technical details</summary>
                    <p className="mt-2 p-2 bg-muted/50 rounded">{errorMessage}</p>
                  </details>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show normal comment section
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <CommentForm postId={postSlug} onCommentAdded={handleCommentAdded} />
      <CommentList postId={postSlug} refreshTrigger={refreshTrigger} />
    </div>
  )
}
