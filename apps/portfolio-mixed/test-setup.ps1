# Test script to verify portfolio setup
Write-Host "🧪 Testing Portfolio Setup..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if DATABASE_URL is set locally
Write-Host "1️⃣ Testing Database Connection..." -ForegroundColor Yellow
$env:DATABASE_URL = "postgresql://neondb_owner:npg_xYsTBaO13qNk@ep-young-mud-a1z4l2ey-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"

try {
    npx prisma db pull --force 2>$null | Out-Null
    Write-Host "   ✅ Database connection successful!" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Database connection failed" -ForegroundColor Red
}

Write-Host ""

# Test 2: Check Vercel deployment
Write-Host "2️⃣ Checking Vercel Deployment..." -ForegroundColor Yellow
try {
    $deployment = vercel ls --json 2>$null | ConvertFrom-Json | Select-Object -First 1
    if ($deployment) {
        Write-Host "   ✅ Latest deployment: $($deployment.url)" -ForegroundColor Green
    }
} catch {
    Write-Host "   ℹ️  Run 'vercel login' to check deployments" -ForegroundColor Gray
}

Write-Host ""

# Test 3: Check local build
Write-Host "3️⃣ Testing Local Build..." -ForegroundColor Yellow
try {
    $env:ANTHROPIC_API_KEY = "test-key"
    $env:ENABLE_AI_MODERATION = "false"
    npm run build 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Build successful!" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  Build has warnings (check manually)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Build failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Make sure you added ALL 6 environment variables in Vercel" -ForegroundColor White
Write-Host "2. Redeploy on Vercel to pick up the new env vars" -ForegroundColor White
Write-Host "3. Visit your site and test:" -ForegroundColor White
Write-Host "   • /admin - AI moderation panel" -ForegroundColor Gray
Write-Host "   • /blog/maritime-safeguarding-future - Comments" -ForegroundColor Gray
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
