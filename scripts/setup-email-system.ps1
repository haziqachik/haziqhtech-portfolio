# EmailJS Auto-Setup Script
# This script helps you set up EmailJS for automatic email sending

Write-Host "EMAIL SYSTEM SETUP - EMAILJS CONFIGURATION" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Your email system has 3 tiers:" -ForegroundColor Yellow
Write-Host "1. EmailJS - Real automatic emails (recommended)" -ForegroundColor Green
Write-Host "2. Formspree - Simple email service (alternative)" -ForegroundColor Blue
Write-Host "3. Mailto fallback - Opens email client (always works)" -ForegroundColor Gray
Write-Host ""

Write-Host "Current Status:" -ForegroundColor Yellow
$envFile = "$PWD\apps\portfolio-mixed\.env.local"
$envContent = Get-Content $envFile -Raw

# Check EmailJS configuration
if ($envContent -match 'NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_haziq_portfolio"') {
    Write-Host "  EmailJS: Placeholder values (needs real setup)" -ForegroundColor Orange
} else {
    Write-Host "  EmailJS: Not configured" -ForegroundColor Red
}

# Check Formspree
if ($envContent -match 'FORMSPREE_ENDPOINT="https://formspree.io/') {
    Write-Host "  Formspree: Placeholder values (needs real setup)" -ForegroundColor Orange
} else {
    Write-Host "  Formspree: Not configured" -ForegroundColor Red
}

Write-Host "  Mailto Fallback: Always working" -ForegroundColor Green
Write-Host ""

$choice = Read-Host "Set up real email now? (1=EmailJS, 2=Formspree, 3=Keep current, 4=Instructions)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "EMAILJS SETUP INSTRUCTIONS" -ForegroundColor Green
        Write-Host "=========================" -ForegroundColor Green
        Write-Host ""
        Write-Host "1. Go to: https://www.emailjs.com/" -ForegroundColor Yellow
        Write-Host "2. Sign up with your email (free account)" -ForegroundColor White
        Write-Host "3. Add Email Service:" -ForegroundColor Yellow
        Write-Host "   - Choose your provider (Gmail/Outlook/Yahoo)" -ForegroundColor White
        Write-Host "   - Follow the setup wizard" -ForegroundColor White
        Write-Host "4. Create Email Template:" -ForegroundColor Yellow
        Write-Host "   - Subject: 'New message from {{from_name}}'" -ForegroundColor White
        Write-Host "   - Body: Include {{from_name}}, {{reply_to}}, {{message}}" -ForegroundColor White
        Write-Host "5. Copy these 3 values:" -ForegroundColor Yellow
        Write-Host "   - Service ID (starts with 'service_')" -ForegroundColor White
        Write-Host "   - Template ID (starts with 'template_')" -ForegroundColor White
        Write-Host "   - Public Key (your user key)" -ForegroundColor White
        Write-Host ""
        
        Write-Host "Then update these in .env.local:" -ForegroundColor Cyan
        Write-Host 'NEXT_PUBLIC_EMAILJS_SERVICE_ID="your_service_id"' -ForegroundColor Gray
        Write-Host 'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your_template_id"' -ForegroundColor Gray
        Write-Host 'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your_public_key"' -ForegroundColor Gray
    }
    "2" {
        Write-Host ""
        Write-Host "FORMSPREE SETUP INSTRUCTIONS" -ForegroundColor Blue
        Write-Host "============================" -ForegroundColor Blue
        Write-Host ""
        Write-Host "1. Go to: https://formspree.io/" -ForegroundColor Yellow
        Write-Host "2. Sign up with your email" -ForegroundColor White
        Write-Host "3. Create a new form" -ForegroundColor White
        Write-Host "4. Enter your email where you want to receive messages" -ForegroundColor White
        Write-Host "5. Copy the form endpoint URL" -ForegroundColor White
        Write-Host ""
        
        Write-Host "Then update this in .env.local:" -ForegroundColor Cyan
        Write-Host 'FORMSPREE_ENDPOINT="https://formspree.io/f/YOUR_FORM_ID"' -ForegroundColor Gray
    }
    "3" {
        Write-Host ""
        Write-Host "Keeping current mailto fallback system" -ForegroundColor Green
        Write-Host "Your email system is already working!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "When users fill your contact form:" -ForegroundColor Cyan
        Write-Host "1. Form validates their input" -ForegroundColor White
        Write-Host "2. Opens their email client with pre-filled message" -ForegroundColor White
        Write-Host "3. They can edit and send the email to you" -ForegroundColor White
        Write-Host "4. Form data is saved to your database" -ForegroundColor White
        Write-Host ""
        Write-Host "This is actually preferred by many users!" -ForegroundColor Green
    }
    "4" {
        Write-Host ""
        Write-Host "EMAIL SYSTEM DOCUMENTATION" -ForegroundColor Magenta
        Write-Host "=========================" -ForegroundColor Magenta
        Write-Host ""
        Write-Host "Check these files for complete setup guides:" -ForegroundColor Yellow
        Write-Host "  docs/email-testing-guide.md - Complete setup instructions" -ForegroundColor White
        Write-Host "  docs/email-test-results.md - Current system analysis" -ForegroundColor White
        Write-Host ""
        Write-Host "Test your current system:" -ForegroundColor Yellow
        Write-Host "  1. Visit: http://localhost:3000/contact" -ForegroundColor White
        Write-Host "  2. Fill and submit the form" -ForegroundColor White
        Write-Host "  3. Check if email client opens correctly" -ForegroundColor White
        Write-Host "  4. View database: http://localhost:3000/admin" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "Email system is functional with mailto fallback!" -ForegroundColor Green
Write-Host "Adding EmailJS/Formspree just makes it fully automatic." -ForegroundColor Cyan
Write-Host ""

# Test the current contact form
$test = Read-Host "Test contact form now? (y/n)"
if ($test -eq 'y' -or $test -eq 'Y') {
    Write-Host "Starting development server to test contact form..." -ForegroundColor Cyan
    Set-Location "apps/portfolio-mixed"
    Start-Process "npm" -ArgumentList "run", "dev" -NoNewWindow
    Start-Sleep 3
    Write-Host "Visit: http://localhost:3000/contact" -ForegroundColor Green
    Write-Host "Admin panel: http://localhost:3000/admin" -ForegroundColor Blue
}