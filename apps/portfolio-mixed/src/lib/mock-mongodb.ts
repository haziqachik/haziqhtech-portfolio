// Mock MongoDB service using JSON files for development
import fs from 'fs';
import path from 'path';
import type { Project } from '@/types/database';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize projects file if it doesn't exist
if (!fs.existsSync(PROJECTS_FILE)) {
  const initialProjects = [
    {
      id: '1',
      title: 'Multi-Database Portfolio System',
      description: 'Full-stack portfolio with SQLite, PostgreSQL, and MongoDB integration',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'PostgreSQL', 'MongoDB'],
      status: 'completed',
      year: '2025',
      featured: true,
      githubUrl: 'https://github.com/haziqachik/haziqhtech-portfolio',
      liveUrl: 'http://localhost:3000',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Comment System with Real-time Updates',
      description: 'Interactive blog comment system with moderation and real-time display',
      technologies: ['React', 'SQLite', 'Prisma', 'TypeScript'],
      status: 'completed',
      year: '2025',
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(initialProjects, null, 2));
}

export const mockMongoDB = {
  async getProjects() {
    try {
      const data = fs.readFileSync(PROJECTS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading projects:', error);
      return [];
    }
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const projects = await this.getProjects();
      const newProject = {
        ...project,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      projects.push(newProject);
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
      return newProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  async updateProject(id: string, updates: Partial<Project>) {
    try {
      const projects = await this.getProjects();
      const index = projects.findIndex((p: Project) => p.id === id);
      if (index === -1) throw new Error('Project not found');
      
      projects[index] = {
        ...projects[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2));
      return projects[index];
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  async deleteProject(id: string) {
    try {
      const projects = await this.getProjects();
      const filteredProjects = projects.filter((p: Project) => p.id !== id);
      fs.writeFileSync(PROJECTS_FILE, JSON.stringify(filteredProjects, null, 2));
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  async testConnection() {
    try {
      await this.getProjects();
      return true;
    } catch {
      return false;
    }
  }
};