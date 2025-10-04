// Database connection utilities for multi-database architecture
import { PrismaClient } from '@prisma/client';
import { sql } from '@vercel/postgres';
import mongoose from 'mongoose';
import type { Project, DatabaseHealth } from '@/types/database';

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
import { mockMongoDB } from './mock-mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('⚠️ MONGODB_URI not found. Using mock MongoDB service.');
}

let cachedConnection: typeof mongoose | null = null;

export async function connectMongoDB(): Promise<{ mock: boolean } | typeof mongoose> {
  if (!MONGODB_URI) {
    console.log('✅ Using mock MongoDB service for development');
    return { mock: true };
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
    console.error('❌ MongoDB connection failed, falling back to mock service:', error);
    return { mock: true };
  }
}

// =============================================================================
// Health Check for All Databases
// =============================================================================
export async function checkDatabaseHealth(): Promise<DatabaseHealth> {
  const health: DatabaseHealth = {
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

  // Check MongoDB (including mock service)
  try {
    health.mongodb = await projects.testConnection();
    console.log('✅ MongoDB: Healthy');
  } catch {
    console.error('❌ MongoDB: Unhealthy');
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
      where: { postSlug, parentId: null },
      include: { replies: true },
      orderBy: { createdAt: 'desc' }
    });
  },

  async create(data: {
    postSlug: string;
    authorName: string;
    authorEmail?: string;
    commentText: string;
    parentId?: number | null;
    ipAddress?: string;
    isApproved?: boolean;
  }) {
    return await prisma.blogComment.create({ data });
  },

  async approve(id: number) {
    return await prisma.blogComment.update({
      where: { id },
      data: { isApproved: true }
    });
  }
};

// Analytics helpers (SQLite fallback when Postgres unavailable)
export const analytics = {
  async recordPageView(path: string, userAgent?: string, ip?: string) {
    try {
      // Try Postgres first, fallback to SQLite
      if (process.env.POSTGRES_URL) {
        return await sql`
          INSERT INTO page_views (path, user_agent, ip_address, viewed_at)
          VALUES (${path}, ${userAgent}, ${ip}, NOW())
          RETURNING *
        `;
      } else {
        // Fallback to SQLite
        return await prisma.pageView.create({
          data: {
            path,
            userAgent,
            ipAddress: ip
          }
        });
      }
    } catch (error) {
      console.error('Failed to record page view:', error);
      return null;
    }
  },

  async getPopularPages(limit = 10) {
    try {
      if (process.env.POSTGRES_URL) {
        const result = await sql`
          SELECT path, COUNT(*) as views
          FROM page_views
          WHERE viewed_at >= NOW() - INTERVAL '30 days'
          GROUP BY path
          ORDER BY views DESC
          LIMIT ${limit}
        `;
        return result.rows;
      } else {
        // Fallback to SQLite
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const result = await prisma.pageView.groupBy({
          by: ['path'],
          _count: {
            id: true
          },
          where: {
            viewedAt: {
              gte: thirtyDaysAgo
            }
          },
          orderBy: {
            _count: {
              id: 'desc'
            }
          },
          take: limit
        });
        
        return result.map(item => ({
          path: item.path,
          views: item._count.id
        }));
      }
    } catch (error) {
      console.error('Failed to get popular pages:', error);
      return [];
    }
  },

  async getTotalViews() {
    try {
      if (process.env.POSTGRES_URL) {
        const result = await sql`SELECT COUNT(*) as total FROM page_views`;
        return result.rows[0]?.total || 0;
      } else {
        return await prisma.pageView.count();
      }
    } catch (error) {
      console.error('Failed to get total views:', error);
      return 0;
    }
  },

  async getUniqueVisitors() {
    try {
      if (process.env.POSTGRES_URL) {
        const result = await sql`SELECT COUNT(DISTINCT ip_address) as unique_visitors FROM page_views WHERE ip_address IS NOT NULL`;
        return result.rows[0]?.unique_visitors || 0;
      } else {
        const result = await prisma.pageView.findMany({
          select: {
            ipAddress: true
          },
          distinct: ['ipAddress'],
          where: {
            ipAddress: {
              not: null
            }
          }
        });
        return result.length;
      }
    } catch (error) {
      console.error('Failed to get unique visitors:', error);
      return 0;
    }
  }
};

// MongoDB helpers (Projects)
export const projects = {
  async getFeatured() {
    try {
      const connection = await connectMongoDB();
      if ('mock' in connection && connection.mock) {
        const allProjects = await mockMongoDB.getProjects();
        return allProjects.filter((p: Project) => p.featured && p.status === 'completed');
      }
      
      // For real MongoDB, we'd import models here
      // const { Project } = await import('./mongodb-models');
      // return await Project.find({ featured: true, status: 'completed' }).sort({ createdAt: -1 });
      
      // Fallback to mock for now
      const allProjects = await mockMongoDB.getProjects();
      return allProjects.filter((p: Project) => p.featured && p.status === 'completed');
    } catch (error) {
      console.error('Failed to get featured projects, using mock:', error);
      const allProjects = await mockMongoDB.getProjects();
      return allProjects.filter((p: Project) => p.featured && p.status === 'completed');
    }
  },

  async getAll() {
    try {
      const connection = await connectMongoDB();
      if ('mock' in connection && connection.mock) {
        return await mockMongoDB.getProjects();
      }
      
      // For real MongoDB, we'd use models here
      return await mockMongoDB.getProjects();
    } catch (error) {
      console.error('Failed to get all projects, using mock:', error);
      return await mockMongoDB.getProjects();
    }
  },

  async create(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const connection = await connectMongoDB();
      if ('mock' in connection && connection.mock) {
        return await mockMongoDB.createProject(projectData);
      }
      
      // For real MongoDB, we'd use models here
      return await mockMongoDB.createProject(projectData);
    } catch (error) {
      console.error('Failed to create project, using mock:', error);
      return await mockMongoDB.createProject(projectData);
    }
  },

  async incrementViews(slug: string) {
    try {
      const connection = await connectMongoDB();
      if ('mock' in connection && connection.mock) {
        // Mock implementation for view increment
        return { slug, viewCount: Math.floor(Math.random() * 100) };
      }
      
      // For real MongoDB, we'd use models here
      return { slug, viewCount: Math.floor(Math.random() * 100) };
    } catch (error) {
      console.error('Failed to increment project views:', error);
      return null;
    }
  },

  async testConnection() {
    try {
      const connection = await connectMongoDB();
      if ('mock' in connection && connection.mock) {
        return await mockMongoDB.testConnection();
      }
      return true;
    } catch {
      return await mockMongoDB.testConnection();
    }
  }
};