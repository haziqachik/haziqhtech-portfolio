"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Send } from "lucide-react"

interface CommentFormProps {
  postId: string
  onCommentAdded?: () => void
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [author, setAuthor] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!author.trim() || !content.trim()) {
      alert("Please fill in both name and comment")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postSlug: postId,
          authorName: author.trim(),
          commentText: content.trim(),
        }),
      })

      if (response.ok) {
        setAuthor("")
        setContent("")
        onCommentAdded?.()
        alert("Comment added successfully!")
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
      alert("Failed to submit comment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Leave a Comment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={isSubmitting}
              className="w-full"
            />
          </div>
          
          <div>
            <Textarea
              placeholder="What are your thoughts?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
              className="w-full min-h-[100px]"
              rows={4}
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting || !author.trim() || !content.trim()}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              "Posting..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Post Comment
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}