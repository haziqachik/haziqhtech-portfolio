// MongoDB Models using Mongoose
// For Portfolio Projects, Skills, Certifications - Dynamic content

import mongoose from 'mongoose';

// Portfolio Project Schema
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  longDescription: String,
  technologies: [String], // ["React", "Next.js", "TypeScript"]
  category: {
    type: String,
    enum: ['web', 'automation', 'security', 'data-analysis', 'infrastructure'],
    default: 'web'
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned', 'archived'],
    default: 'in-progress'
  },
  githubUrl: String,
  liveUrl: String,
  images: [String], // URLs to project images
  featured: {
    type: Boolean,
    default: false
  },
  startDate: Date,
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Skill Schema
const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['programming', 'tools', 'platforms', 'security', 'networking', 'soft-skills'],
    required: true
  },
  proficiency: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'intermediate'
  },
  yearsOfExperience: Number,
  lastUsed: Date,
  certifications: [String], // Related certifications
  projects: [String], // Project IDs where this skill was used
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Certification Schema
const CertificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  provider: String, // "Cisco", "Microsoft", "CompTIA"
  credentialId: String,
  issueDate: Date,
  expirationDate: Date,
  verificationUrl: String,
  status: {
    type: String,
    enum: ['active', 'expired', 'in-progress', 'planned'],
    default: 'active'
  },
  relatedSkills: [String], // Skill names
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Dynamic Content Schema (for flexible content management)
const DynamicContentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true // 'achievement', 'testimonial', 'news', 'update'
  },
  title: String,
  content: String,
  metadata: mongoose.Schema.Types.Mixed, // Flexible data
  isPublished: {
    type: Boolean,
    default: false
  },
  publishDate: Date,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export models (will be created when we connect to MongoDB)
export const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const SkillModel = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
export const CertificationModel = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);
export const DynamicContentModel = mongoose.models.DynamicContent || mongoose.model('DynamicContent', DynamicContentSchema);