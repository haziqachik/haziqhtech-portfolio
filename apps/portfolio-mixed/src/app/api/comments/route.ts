// API route for blog comments (SQLite database)
import { NextRequest, NextResponse } from 'next/server';
import { blogComments } from '@/lib/database';

console.log('⚙️ [comments/route] Startup - NODE_ENV=', process.env.NODE_ENV);
console.log('⚙️ [comments/route] Resolved DATABASE_URL (first 100 chars):', (process.env.DATABASE_URL || '').substring(0, 100));

// Detect common serverless + SQLite misconfiguration (e.g., Vercel with file: DB)
function isServerlessWithSqlite() {
  const db = process.env.DATABASE_URL || '';
  const isFileSqlite = db.startsWith('file:');
  const runningOnVercel = process.env.VERCEL === '1' || process.env.NEXT_PUBLIC_VERCEL === '1';
  const onLambdaLike = !!process.env.AWS_LAMBDA_FUNCTION_NAME || !!process.env.FUNCTIONS_WORKER_RUNTIME;
  return isFileSqlite && (runningOnVercel || onLambdaLike);
}

// GET /api/comments?postSlug=blog-post-slug
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get('postSlug');

  if (!postSlug) {
    return NextResponse.json({ error: 'postSlug is required' }, { status: 400 });
  }

  try {
    // Debug logging
    console.log('[Comments API] DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 30));
    console.log('[Comments API] Attempting to fetch comments for:', postSlug);
    
    const comments = await (async () => {
      try {
        console.log('⚙️ [comments/route] Calling blogComments.getByPost', postSlug);
        const res = await blogComments.getByPost(postSlug);
        console.log('⚙️ [comments/route] blogComments.getByPost returned, count=', Array.isArray(res)?res.length:0);
        return res;
      } catch (err) {
        console.error('⚠️ [comments/route] Error inside blogComments.getByPost', err);
        throw err;
      }
    })();
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    console.error('[Comments API] DATABASE_URL at error:', process.env.DATABASE_URL?.substring(0, 50));
    // If running serverless with a file-based SQLite DB, surface a helpful message
    if (isServerlessWithSqlite()) {
      return NextResponse.json(
        {
          error:
            'Comments storage unavailable: running with a file-based SQLite database in a serverless environment. Use Postgres (Vercel Postgres) or a managed DB and set DATABASE_URL to the connection string.'
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST /api/comments - Add new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postSlug, authorName, authorEmail, commentText, parentId, skipModeration } = body;

    if (!postSlug || !authorName || !commentText) {
      return NextResponse.json(
        { error: 'postSlug, authorName, and commentText are required' },
        { status: 400 }
      );
    }

    // Get IP address for moderation
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // AI moderation (if enabled and not explicitly skipped)
    let isApproved = true;
    let moderationReason = 'Auto-approved';

    if (!skipModeration && process.env.ANTHROPIC_API_KEY && process.env.ENABLE_AI_MODERATION === 'true') {
      try {
        const { moderateComment } = await import('@/lib/ai-moderation');
        const modResult = await moderateComment(commentText, authorName);
        isApproved = modResult.approved;
        moderationReason = modResult.reason || 'Moderated by AI';
        
        console.log(`🤖 AI Moderation: ${isApproved ? 'APPROVED' : 'REJECTED'} - ${moderationReason}`);
      } catch (error) {
        console.error('AI moderation failed, defaulting to auto-approve:', error);
        isApproved = true;
      }
    }

    const comment = await blogComments.create({
      postSlug,
      authorName,
      authorEmail,
      commentText,
      parentId: parentId ? parseInt(parentId) : null,
      ipAddress: ip,
      isApproved
    });

    return NextResponse.json({ 
      comment,
      message: isApproved 
        ? 'Comment added successfully!' 
        : 'Comment submitted and awaiting moderation',
      moderation: !skipModeration && process.env.ENABLE_AI_MODERATION === 'true' 
        ? { isApproved, reason: moderationReason }
        : undefined
    });
  } catch (error) {
    console.error('Failed to create comment:', error);
    if (isServerlessWithSqlite()) {
      return NextResponse.json(
        {
          error:
            'Unable to save comment: the site is using a file-based SQLite database in a serverless environment. Switch to Postgres or provide a managed DB (set DATABASE_URL) to enable comments.'
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}