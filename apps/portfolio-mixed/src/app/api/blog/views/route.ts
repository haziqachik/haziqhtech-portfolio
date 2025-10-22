// API route for blog analytics - view counts per post
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

// GET /api/blog/views?slug=post-slug
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'slug parameter is required' }, { status: 400 });
    }

    // Get view count for specific blog post
    const viewCount = await prisma.blogView.count({
      where: { postSlug: slug }
    });

    return NextResponse.json({ slug, viewCount });
  } catch (error) {
    console.error('Failed to fetch blog views:', error);
    return NextResponse.json(
      { error: 'Failed to fetch view count', viewCount: 0 },
      { status: 500 }
    );
  }
}

// POST /api/blog/views - Record a blog view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'slug is required' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent') || undefined;
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               undefined;

    // Record the view
    await prisma.blogView.create({
      data: {
        postSlug: slug,
        ipAddress: ip,
        userAgent: userAgent
      }
    });

    // Get updated count
    const viewCount = await prisma.blogView.count({
      where: { postSlug: slug }
    });

    return NextResponse.json({ 
      success: true,
      slug,
      viewCount
    });
  } catch (error) {
    console.error('Failed to record blog view:', error);
    return NextResponse.json(
      { error: 'Failed to record view' },
      { status: 500 }
    );
  }
}
