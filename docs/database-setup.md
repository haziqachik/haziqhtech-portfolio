# Database Setup Guide

## Current Status
- ✅ SQLite: Comments (production ready)
- ✅ PostgreSQL: Analytics (real database configured)
- ⚠️ MongoDB: Currently using mock service (JSON files)

## MongoDB Options for Production

### Option 1: MongoDB Atlas (Cloud) - RECOMMENDED
```bash
# 1. Sign up at https://cloud.mongodb.com/
# 2. Create a free cluster (512MB free forever)
# 3. Get connection string like:
# mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE

# Update .env.local:
MONGODB_URI="mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE"
USE_MOCK_MONGODB=false
```

### Option 2: Local MongoDB
```powershell
# Install MongoDB locally
winget install MongoDB.Server

# Start MongoDB service
net start MongoDB

# Update .env.local:
MONGODB_URI="mongodb://localhost:27017/portfolio"
USE_MOCK_MONGODB=false
```

### Option 3: Docker MongoDB
```powershell
# Run MongoDB in Docker
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest

# Update .env.local:
MONGODB_URI="mongodb://admin:password@localhost:27017/portfolio?authSource=admin"
USE_MOCK_MONGODB=false
```

## Production Deployment Strategy

### Current Setup Benefits
1. **SQLite**: Self-contained, zero configuration
2. **PostgreSQL**: Scalable analytics, works with Vercel Postgres
3. **MongoDB Mock**: No external dependencies

### For Production Deployment

#### Vercel (Recommended)
```env
# .env.local for production
DATABASE_URL="postgres://..."  # Vercel Postgres
POSTGRES_URL="postgres://..."   # Vercel Postgres  
MONGODB_URI="mongodb+srv://..." # MongoDB Atlas
USE_MOCK_MONGODB=false
```

#### Self-hosted
```env
# All databases on your server
DATABASE_URL="file:./portfolio.db"
POSTGRES_URL="postgresql://user:pass@localhost:5432/analytics"
MONGODB_URI="mongodb://localhost:27017/portfolio"
USE_MOCK_MONGODB=false
```

## Testing Current Setup

Your PostgreSQL is now working! Test at:
- Health: http://localhost:3000/api/health
- Analytics: http://localhost:3000/admin/analytics
- Comments: http://localhost:3000/blog/[any-post]

## Migration Notes

The system is designed to switch between mock and real databases with just environment variables. No code changes needed!