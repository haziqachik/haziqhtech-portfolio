// API route for blog comments (SQLite database)
import { NextRequest, NextResponse } from 'next/server';
import { blogComments } from '@/lib/database';

// GET /api/comments?postSlug=blog-post-slug
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get('postSlug');

  if (!postSlug) {
    return NextResponse.json({ error: 'postSlug is required' }, { status: 400 });
  }

  try {
    const comments = await blogComments.getByPost(postSlug);
    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST /api/comments - Add new comment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postSlug, authorName, authorEmail, commentText, parentId } = body;

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

    const comment = await blogComments.create({
      postSlug,
      authorName,
      authorEmail,
      commentText,
      parentId: parentId ? parseInt(parentId) : null,
      ipAddress: ip,
      isApproved: true // Auto-approve for demo (set to false for production)
    });

    return NextResponse.json({ 
      comment,
      message: 'Comment added successfully!' 
    });
  } catch (error) {
    console.error('Failed to create comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}