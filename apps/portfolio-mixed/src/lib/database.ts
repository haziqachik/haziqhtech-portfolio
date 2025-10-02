// Database connection utilities for multi-database architecture
import { PrismaClient } from '@prisma/client';
import { sql } from '@vercel/postgres';
import mongoose from 'mongoose';

// =============================================================================
// SQLite Connection (Prisma) - Blog Comments
// =============================================================================
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// =============================================================================
// Vercel Postgres Connection - Analytics & Contact Forms  
// =============================================================================
export { sql };

// Helper function to test Vercel Postgres connection
export async function testPostgresConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('✅ Postgres connected:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('❌ Postgres connection failed:', error);
    return false;
  }
}

// =============================================================================
// MongoDB Connection - Projects & Dynamic Content
// =============================================================================
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI not found. MongoDB features will be disabled.');
}

let cachedConnection: typeof mongoose | null = null;

export async function connectMongoDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  if (cachedConnection) {
    console.log('✅ Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      bufferCommands: false, // Disable mongoose buffering
    });
    
    cachedConnection = connection;
    console.log('✅ MongoDB connected successfully');
    return connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

// =============================================================================
// Health Check for All Databases
// =============================================================================
export async function checkDatabaseHealth() {
  const health = {
    sqlite: false,
    postgres: false,
    mongodb: false,
    timestamp: new Date().toISOString()
  };

  // Check SQLite (Prisma)
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.sqlite = true;
    console.log('✅ SQLite: Healthy');
  } catch (error) {
    console.error('❌ SQLite: Unhealthy', error);
  }

  // Check Vercel Postgres
  if (process.env.POSTGRES_URL) {
    health.postgres = await testPostgresConnection();
  } else {
    console.warn('⚠️ Postgres: No connection string configured');
  }

  // Check MongoDB
  if (MONGODB_URI) {
    try {
      await connectMongoDB();
      health.mongodb = true;
      console.log('✅ MongoDB: Healthy');
    } catch (error) {
      console.error('❌ MongoDB: Unhealthy', error);
    }
  } else {
    console.warn('⚠️ MongoDB: No connection string configured');
  }

  return health;
}

// =============================================================================
// Database-specific helpers
// =============================================================================

// SQLite helpers (Blog Comments)
export const blogComments = {
  async getByPost(postSlug: string) {
    return await prisma.blogComment.findMany({
      where: { postSlug, isApproved: true, parentId: null },
      include: { replies: true },
      orderBy: { createdAt: 'desc' }
    });
  },

  async create(data: any) {
    return await prisma.blogComment.create({ data });
  },

  async approve(id: number) {
    return await prisma.blogComment.update({
      where: { id },
      data: { isApproved: true }
    });
  }
};

// Postgres helpers (Analytics)
export const analytics = {
  async recordPageView(path: string, userAgent?: string, ip?: string) {
    if (!process.env.POSTGRES_URL) return null;
    
    try {
      return await sql`
        INSERT INTO page_views (path, user_agent, ip_address, viewed_at)
        VALUES (${path}, ${userAgent}, ${ip}, NOW())
        RETURNING *
      `;
    } catch (error) {
      console.error('Failed to record page view:', error);
      return null;
    }
  },

  async getPopularPages(limit = 10) {
    if (!process.env.POSTGRES_URL) return [];
    
    try {
      const result = await sql`
        SELECT path, COUNT(*) as views
        FROM page_views
        WHERE viewed_at >= NOW() - INTERVAL '30 days'
        GROUP BY path
        ORDER BY views DESC
        LIMIT ${limit}
      `;
      return result.rows;
    } catch (error) {
      console.error('Failed to get popular pages:', error);
      return [];
    }
  }
};

// MongoDB helpers (Projects)
export const projects = {
  async getFeatured() {
    try {
      await connectMongoDB();
      const { Project } = await import('./mongodb-models');
      return await Project.find({ featured: true, status: 'completed' })
        .sort({ createdAt: -1 });
    } catch (error) {
      console.error('Failed to get featured projects:', error);
      return [];
    }
  },

  async incrementViews(slug: string) {
    try {
      await connectMongoDB();
      const { Project } = await import('./mongodb-models');
      return await Project.findOneAndUpdate(
        { slug },
        { $inc: { viewCount: 1 } },
        { new: true }
      );
    } catch (error) {
      console.error('Failed to increment project views:', error);
      return null;
    }
  }
};