# AI-Powered Portfolio Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER BROWSER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Blog Post    │  │ Comment Form │  │ Admin Panel  │          │
│  │ /blog/[slug] │  │              │  │ /admin       │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼──────────────────┘
          │                  │                  │
          │ GET /api/        │ POST             │ POST
          │ comments         │ /api/comments    │ /api/comments/
          │                  │                  │ moderate
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                  NEXT.JS API ROUTES (Vercel)                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ /api/comments/route.ts                                    │   │
│  │                                                            │   │
│  │  1. Receive comment                                       │   │
│  │  2. Check ENABLE_AI_MODERATION                           │   │
│  │  3. Call AI moderation if enabled ───────────┐           │   │
│  │  4. Save to database with approval status    │           │   │
│  │  5. Return response                          │           │   │
│  └──────────────────────────────────────────────┼───────────┘   │
│                                                  │               │
│  ┌──────────────────────────────────────────────▼───────────┐   │
│  │ src/lib/ai-moderation.ts                               │   │
│  │                                                          │   │
│  │  • moderateComment(text, author)                       │   │
│  │  • summarizeComments(comments[])                       │   │
│  │  • suggestReply(comment)                               │   │
│  │                                                          │   │
│  │  Calls ▼                                                │   │
│  └────────┼────────────────────────────────────────────────┘   │
│           │                                                     │
│  ┌────────▼────────────────────────────────────────────────┐   │
│  │ src/lib/llm.ts (LLM Adapter)                           │   │
│  │                                                          │   │
│  │  export function generateText(prompt, opts)            │   │
│  │  {                                                       │   │
│  │    if (AI_PROVIDER === 'anthropic') {                  │   │
│  │      // Call Anthropic Messages API                    │   │
│  │      fetch('https://api.anthropic.com/v1/messages')   │   │
│  │    }                                                     │   │
│  │  }                                                       │   │
│  └──────────────────────────┬───────────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────────┘
                              │
                              │ HTTPS Request
                              │ Headers:
                              │ - x-api-key: $ANTHROPIC_API_KEY
                              │ - anthropic-version: 2023-06-01
                              │
                              ▼
        ┌─────────────────────────────────────────────┐
        │     ANTHROPIC CLAUDE SONNET 4.5             │
        │     https://api.anthropic.com               │
        │                                             │
        │  Model: claude-3-5-sonnet-20241022         │
        │                                             │
        │  Request:                                   │
        │  {                                          │
        │    "model": "claude-3-5-sonnet-20241022",  │
        │    "messages": [{                          │
        │      "role": "user",                       │
        │      "content": "Analyze this comment..." │
        │    }]                                       │
        │  }                                          │
        │                                             │
        │  Response:                                  │
        │  {                                          │
        │    "content": [{                           │
        │      "type": "text",                       │
        │      "text": "{\"approved\": true, ...}"  │
        │    }]                                       │
        │  }                                          │
        └──────────────┬──────────────────────────────┘
                       │
                       │ JSON Response
                       │
                       ▼
        ┌─────────────────────────────────────────────┐
        │  Moderation Result                          │
        │  {                                          │
        │    approved: true/false,                   │
        │    confidence: 0.95,                       │
        │    reason: "Constructive comment",         │
        │    categories: {                           │
        │      spam: false,                          │
        │      inappropriate: false,                 │
        │      promotional: false                    │
        │    }                                        │
        │  }                                          │
        └──────────────┬──────────────────────────────┘
                       │
                       │ Returns to API route
                       │
                       ▼
        ┌─────────────────────────────────────────────┐
        │  Database (Vercel Postgres)                 │
        │                                             │
        │  BlogComment {                             │
        │    id: 1,                                   │
        │    postSlug: "maritime-security",          │
        │    authorName: "John Doe",                 │
        │    commentText: "Great article!",          │
        │    isApproved: true,  ← AI decision        │
        │    createdAt: "2024-..."                   │
        │  }                                          │
        └─────────────────────────────────────────────┘
```

## Data Flow: Posting a Comment

```
User Types Comment
       │
       ▼
Click "Post Comment"
       │
       ▼
CommentForm.tsx
  • POST /api/comments
  • Body: { postSlug, authorName, commentText }
       │
       ▼
/api/comments/route.ts
  • Check if ENABLE_AI_MODERATION=true
  • If yes:
       │
       ▼
    ai-moderation.ts
      • moderateComment(text, author)
           │
           ▼
        llm.ts
          • generateText(prompt)
               │
               ▼
            Anthropic API
              • Analyze comment
              • Return decision
               │
               ▼
            Parse response
            {approved: true, ...}
       │
       ▼
  • Save to Postgres with isApproved status
  • Return success/failure to client
       │
       ▼
CommentForm shows:
  "Comment added successfully!" (if approved)
  or
  "Comment submitted for review" (if rejected)
```

## Environment Variable Flow

```
Vercel Dashboard
  Environment Variables
    │
    ├─ ANTHROPIC_API_KEY ────────┐
    ├─ ENABLE_AI_MODERATION ─────┤
    ├─ AI_MODEL ─────────────────┤
    ├─ AI_PROVIDER ──────────────┤
    │                             │
    ▼                             ▼
Next.js Build                 Runtime
  • Bundles code            • process.env.ANTHROPIC_API_KEY
  • Type checks             • process.env.ENABLE_AI_MODERATION
  • Pre-renders pages       • Reads at API request time
                            • Passed to Anthropic API
```

## Fallback Strategy

```
Comment Submission
       │
       ▼
Is ANTHROPIC_API_KEY set?
       │
   ┌───┴───┐
   │       │
  YES     NO
   │       │
   │       └──► Auto-approve (skip AI)
   │
   ▼
Is AI API reachable?
   │
┌──┴──┐
│     │
YES   NO
│     │
│     └──► Log error → Auto-approve
│
▼
AI Moderation
 • Parse response
 • Save decision
```

## Admin Panel Flow

```
/admin
  │
  ├─ Database Health Check
  │    • Test SQLite connection
  │    • Test Postgres connection
  │    • Test MongoDB connection
  │    • Display ✅ or ❌
  │
  ├─ AI Moderation Panel
  │    • Input: Test comment
  │    • Click: "Analyze with Claude"
  │    • POST /api/comments/moderate
  │    • Display: AI decision + confidence
  │
  └─ Comment Management
       • List recent comments
       • Filter by approval status
       • Bulk approve/reject
```

## File Structure

```
apps/portfolio-mixed/
├── src/
│   ├── lib/
│   │   ├── llm.ts                    ← Core LLM adapter
│   │   ├── ai-moderation.ts          ← Moderation logic
│   │   └── database.ts               ← DB connections
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── comments/
│   │   │       ├── route.ts          ← Main API (with AI)
│   │   │       ├── moderate/
│   │   │       │   └── route.ts      ← Test moderation
│   │   │       └── summarize/
│   │   │           └── route.ts      ← AI summarization
│   │   │
│   │   ├── blog/[slug]/
│   │   │   └── page.tsx              ← Uses CommentSectionWithFallback
│   │   │
│   │   └── admin/
│   │       └── page.tsx              ← Includes AIModerationPanel
│   │
│   └── components/
│       ├── comments/
│       │   ├── comment-form.tsx
│       │   ├── comment-list.tsx
│       │   └── comment-section-with-fallback.tsx  ← Smart fallback
│       │
│       └── admin/
│           └── ai-moderation-panel.tsx            ← Test UI
│
├── prisma/
│   └── schema.prisma                 ← BlogComment model
│
├── .env.local (local dev)
├── .env.example (template)
├── SETUP_GUIDE.md (full guide)
├── QUICK_START.md (3-min setup)
└── NEXT_STEPS.md (what to do now)
```

## Key Technologies

```
┌──────────────────────────────────────────────────┐
│ Frontend                                         │
│  • Next.js 15 (App Router)                      │
│  • React Server Components                      │
│  • TailwindCSS + shadcn/ui                      │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Backend                                          │
│  • Next.js API Routes                           │
│  • Prisma ORM                                    │
│  • Vercel Postgres                              │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ AI                                               │
│  • Anthropic Claude Sonnet 4.5                  │
│  • Messages API (latest)                        │
│  • Model: claude-3-5-sonnet-20241022           │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│ Deployment                                       │
│  • Vercel (serverless)                          │
│  • GitHub auto-deploy                           │
│  • Environment variables per env                │
└──────────────────────────────────────────────────┘
```
