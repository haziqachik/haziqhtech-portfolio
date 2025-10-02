// API route for analytics (Vercel Postgres)
import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '@/lib/database';

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'popular-pages':
        const limit = parseInt(searchParams.get('limit') || '10');
        const popularPages = await analytics.getPopularPages(limit);
        return NextResponse.json({ popularPages });

      default:
        return NextResponse.json({ 
          error: 'Invalid analytics type. Use: popular-pages' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

// POST /api/analytics - Record analytics event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, path } = body;

    if (event === 'page_view' && path) {
      const userAgent = request.headers.get('user-agent') || undefined;
      const ip = request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 undefined;

      const result = await analytics.recordPageView(path, userAgent, ip);
      
      return NextResponse.json({ 
        success: true,
        message: 'Page view recorded',
        result 
      });
    }

    return NextResponse.json({ 
      error: 'Invalid event type or missing parameters' 
    }, { status: 400 });
  } catch (error) {
    console.error('Failed to record analytics:', error);
    return NextResponse.json(
      { error: 'Failed to record analytics event' },
      { status: 500 }
    );
  }
}