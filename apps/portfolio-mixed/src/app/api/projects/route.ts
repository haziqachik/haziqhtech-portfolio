// API route for projects (MongoDB)
import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/database';

// GET /api/projects - Get projects data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'featured':
        const featuredProjects = await projects.getFeatured();
        return NextResponse.json({ projects: featuredProjects });

      default:
        return NextResponse.json({ 
          error: 'Invalid project type. Use: featured' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects data' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Update project data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, slug } = body;

    if (action === 'increment_views' && slug) {
      const result = await projects.incrementViews(slug);
      
      return NextResponse.json({ 
        success: true,
        message: 'Project view count updated',
        project: result 
      });
    }

    return NextResponse.json({ 
      error: 'Invalid action or missing parameters' 
    }, { status: 400 });
  } catch (error) {
    console.error('Failed to update project:', error);
    return NextResponse.json(
      { error: 'Failed to update project data' },
      { status: 500 }
    );
  }
}