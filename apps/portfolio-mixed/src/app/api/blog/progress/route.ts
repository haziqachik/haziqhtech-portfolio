import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

// GET: Fetch reading progress for a post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const userId = searchParams.get('userId');

    if (!slug || !userId) {
      return NextResponse.json(
        { error: 'Missing slug or userId' },
        { status: 400 }
      );
    }

    const progress = await prisma.readingProgress.findUnique({
      where: {
        postSlug_userId: {
          postSlug: slug,
          userId: userId,
        },
      },
    });

    return NextResponse.json({
      progress: progress?.progress || 0,
      lastPosition: progress?.lastPosition || 0,
    });
  } catch (error) {
    console.error('Error fetching reading progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reading progress' },
      { status: 500 }
    );
  }
}

// POST: Save reading progress for a post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, userId, progress, lastPosition } = body;

    if (!slug || !userId || progress === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upsert: Update if exists, create if doesn't
    const savedProgress = await prisma.readingProgress.upsert({
      where: {
        postSlug_userId: {
          postSlug: slug,
          userId: userId,
        },
      },
      update: {
        progress: progress,
        lastPosition: lastPosition || 0,
        updatedAt: new Date(),
      },
      create: {
        postSlug: slug,
        userId: userId,
        progress: progress,
        lastPosition: lastPosition || 0,
      },
    });

    return NextResponse.json({
      success: true,
      progress: savedProgress.progress,
    });
  } catch (error) {
    console.error('Error saving reading progress:', error);
    return NextResponse.json(
      { error: 'Failed to save reading progress' },
      { status: 500 }
    );
  }
}
