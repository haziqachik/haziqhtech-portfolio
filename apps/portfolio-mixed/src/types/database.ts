// Type definitions for the portfolio system

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  year: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  slug?: string;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogComment {
  id: number;
  postSlug: string;
  authorName: string;
  authorEmail?: string;
  commentText: string;
  parentId?: number | null;
  ipAddress?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  replies?: BlogComment[];
}

export interface PageView {
  id: number;
  path: string;
  userAgent?: string;
  ipAddress?: string;
  viewedAt: Date;
}

export interface DatabaseHealth {
  sqlite: boolean;
  postgres: boolean;
  mongodb: boolean;
  timestamp: string;
}