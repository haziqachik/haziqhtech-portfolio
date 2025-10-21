// API endpoint for AI-powered comment moderation
import { NextRequest, NextResponse } from 'next/server'
import { moderateComment, isAIModerationEnabled } from '@/lib/ai-moderation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { commentText, authorName, postSlug, postTitle } = body

    if (!commentText || !authorName) {
      return NextResponse.json(
        { error: 'commentText and authorName are required' },
        { status: 400 }
      )
    }

    if (!isAIModerationEnabled()) {
      return NextResponse.json({
        enabled: false,
        message: 'AI moderation is not enabled',
        result: {
          approved: true,
          confidence: 1.0,
          reason: 'AI moderation disabled'
        }
      })
    }

    const result = await moderateComment(commentText, authorName, {
      postSlug,
      postTitle
    })

    return NextResponse.json({
      enabled: true,
      result
    })
  } catch (error) {
    console.error('Moderation API error:', error)
    return NextResponse.json(
      { error: 'Failed to moderate comment' },
      { status: 500 }
    )
  }
}
