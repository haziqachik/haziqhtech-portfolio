// API route for projects (MongoDB/Mock)
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
      
      case 'all':
        const allProjects = await projects.getAll();
        return NextResponse.json({ projects: allProjects });

      default:
        // Default to all projects
        const defaultProjects = await projects.getAll();
        return NextResponse.json({ projects: defaultProjects });
    }
  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects data' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create or update project data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, slug, title, description, technologies, status, year, featured, githubUrl, liveUrl } = body;

    if (action === 'increment_views' && slug) {
      const result = await projects.incrementViews(slug);
      
      return NextResponse.json({ 
        success: true,
        message: 'Project view count updated',
        project: result 
      });
    }

    if (action === 'create') {
      if (!title || !description || !technologies || !status || !year) {
        return NextResponse.json(
          { error: 'title, description, technologies, status, and year are required' },
          { status: 400 }
        );
      }

      const project = await projects.create({
        title,
        description,
        technologies,
        status,
        year,
        featured: featured || false,
        githubUrl,
        liveUrl
      });

      return NextResponse.json({ 
        project,
        message: 'Project created successfully!' 
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