"use client"

import { useState } from "react"
import { CommentForm } from "./comment-form"
import { CommentList } from "./comment-list"

interface CommentSectionProps {
  postId: string
  title?: string
}

export function CommentSection({ postId, title }: CommentSectionProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleCommentAdded = () => {
    // Trigger a refresh of the comment list
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {title && (
        <h2 className="text-2xl font-bold text-center">{title}</h2>
      )}
      
      {/* Comment Form */}
      <CommentForm 
        postId={postId} 
        onCommentAdded={handleCommentAdded}
      />
      
      {/* Comment List */}
      <CommentList 
        postId={postId} 
        refreshTrigger={refreshTrigger}
      />
    </div>
  )
}

// Export individual components as well
export { CommentForm, CommentList }