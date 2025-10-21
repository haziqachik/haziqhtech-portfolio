/**
 * AI-powered comment moderation and analysis using Anthropic Claude Sonnet 4.5
 * 
 * Features:
 * - Automatic spam detection
 * - Inappropriate content filtering
 * - Sentiment analysis
 * - Comment summarization
 * 
 * To enable: Set ANTHROPIC_API_KEY and optionally ENABLE_AI_MODERATION=true
 */

import { generateText, AI_MODEL } from './llm'

export interface ModerationResult {
  approved: boolean
  confidence: number
  reason?: string
  categories?: {
    spam: boolean
    inappropriate: boolean
    promotional: boolean
    offtopic: boolean
  }
  sentiment?: 'positive' | 'neutral' | 'negative'
}

export interface CommentSummary {
  summary: string
  keyPoints: string[]
  sentiment: string
  totalComments: number
}

/**
 * Check if AI moderation is enabled
 */
export function isAIModerationEnabled(): boolean {
  return (
    !!process.env.ANTHROPIC_API_KEY &&
    process.env.ENABLE_AI_MODERATION !== 'false'
  )
}

/**
 * Moderate a comment using AI
 * Returns approval status and detailed analysis
 */
export async function moderateComment(
  commentText: string,
  authorName: string,
  context?: { postSlug?: string; postTitle?: string }
): Promise<ModerationResult> {
  if (!isAIModerationEnabled()) {
    // Default: auto-approve if AI is not enabled
    return {
      approved: true,
      confidence: 1.0,
      reason: 'AI moderation disabled - auto-approved'
    }
  }

  try {
    const prompt = `You are a content moderation assistant. Analyze this blog comment and determine if it should be approved.

Comment Author: ${authorName}
Comment Text: ${commentText}
${context?.postTitle ? `Blog Post: ${context.postTitle}` : ''}

Evaluate for:
1. Spam or automated content
2. Inappropriate language or hate speech
3. Promotional/advertising content
4. Off-topic or irrelevant content
5. Overall sentiment (positive/neutral/negative)

Respond in this exact JSON format:
{
  "approved": true/false,
  "confidence": 0.0-1.0,
  "reason": "brief explanation",
  "categories": {
    "spam": true/false,
    "inappropriate": true/false,
    "promotional": true/false,
    "offtopic": true/false
  },
  "sentiment": "positive/neutral/negative"
}

Be lenient with constructive criticism and questions. Only reject clearly problematic content.`

    const response = await generateText(prompt, {
      maxTokens: 500,
      temperature: 0.2
    })

    // Parse the AI response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('AI moderation: Could not parse response', response)
      return { approved: true, confidence: 0.5, reason: 'Failed to parse AI response' }
    }

    const result = JSON.parse(jsonMatch[0]) as ModerationResult
    
    console.log(`AI Moderation (${AI_MODEL}):`, {
      author: authorName,
      approved: result.approved,
      confidence: result.confidence,
      reason: result.reason
    })

    return result
  } catch (error) {
    console.error('AI moderation error:', error)
    // On error, default to approval to avoid blocking legitimate comments
    return {
      approved: true,
      confidence: 0.0,
      reason: `Moderation error: ${error instanceof Error ? error.message : 'unknown'}`
    }
  }
}

/**
 * Generate a summary of multiple comments using AI
 */
export async function summarizeComments(
  comments: Array<{ authorName: string; commentText: string; createdAt: Date }>,
  postTitle?: string
): Promise<CommentSummary> {
  if (!isAIModerationEnabled()) {
    return {
      summary: 'AI summarization is not enabled',
      keyPoints: [],
      sentiment: 'neutral',
      totalComments: comments.length
    }
  }

  if (comments.length === 0) {
    return {
      summary: 'No comments to summarize',
      keyPoints: [],
      sentiment: 'neutral',
      totalComments: 0
    }
  }

  try {
    const commentsList = comments
      .map((c, i) => `${i + 1}. ${c.authorName}: "${c.commentText}"`)
      .join('\n')

    const prompt = `Summarize these blog comments for the post "${postTitle || 'untitled'}".

Comments (${comments.length} total):
${commentsList}

Provide:
1. A brief 2-3 sentence summary of the discussion
2. 3-5 key points or themes
3. Overall sentiment (positive/neutral/negative)

Respond in this exact JSON format:
{
  "summary": "2-3 sentence summary",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "sentiment": "positive/neutral/negative"
}`

    const response = await generateText(prompt, {
      maxTokens: 600,
      temperature: 0.3
    })

    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Could not parse AI response')
    }

    const result = JSON.parse(jsonMatch[0])

    return {
      summary: result.summary || 'Unable to generate summary',
      keyPoints: result.keyPoints || [],
      sentiment: result.sentiment || 'neutral',
      totalComments: comments.length
    }
  } catch (error) {
    console.error('AI summarization error:', error)
    return {
      summary: 'Unable to generate summary',
      keyPoints: [],
      sentiment: 'neutral',
      totalComments: comments.length
    }
  }
}

/**
 * Generate an AI-powered reply suggestion
 */
export async function suggestReply(
  commentText: string,
  postContext?: string
): Promise<string> {
  if (!isAIModerationEnabled()) {
    return 'AI reply suggestions are not enabled'
  }

  try {
    const prompt = `As a helpful blog author, suggest a brief, friendly reply to this comment.

Comment: "${commentText}"
${postContext ? `Post context: ${postContext}` : ''}

Generate a 1-2 sentence reply that:
- Thanks them for their input
- Addresses their main point
- Encourages further discussion

Reply:`

    const response = await generateText(prompt, {
      maxTokens: 200,
      temperature: 0.7
    })

    return response.trim()
  } catch (error) {
    console.error('AI reply suggestion error:', error)
    return 'Unable to generate reply suggestion'
  }
}
