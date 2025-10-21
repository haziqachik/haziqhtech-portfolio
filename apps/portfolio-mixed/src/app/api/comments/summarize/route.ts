// API endpoint for AI-powered comment summarization
import { NextRequest, NextResponse } from 'next/server'
import { summarizeComments, isAIModerationEnabled } from '@/lib/ai-moderation'
import { blogComments } from '@/lib/database'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const postSlug = searchParams.get('postSlug')

  if (!postSlug) {
    return NextResponse.json(
      { error: 'postSlug is required' },
      { status: 400 }
    )
  }

  if (!isAIModerationEnabled()) {
    return NextResponse.json({
      enabled: false,
      message: 'AI summarization is not enabled'
    })
  }

  try {
    // Fetch comments for the post
    const comments = await blogComments.getByPost(postSlug)

    // Flatten replies into the main list for summarization
    const allComments = comments.flatMap(comment => [
      comment,
      ...(comment.replies || [])
    ])

    const summary = await summarizeComments(
      allComments.map(c => ({
        authorName: c.authorName,
        commentText: c.commentText,
        createdAt: new Date(c.createdAt)
      })),
      postSlug
    )

    return NextResponse.json({
      enabled: true,
      summary
    })
  } catch (error) {
    console.error('Summarization API error:', error)
    return NextResponse.json(
      { error: 'Failed to summarize comments' },
      { status: 500 }
    )
  }
}
