@echo off
echo EMAIL SYSTEM SETUP WIZARD
echo =========================
echo.
echo This helps you configure automatic email sending for your contact form
echo Currently using mailto fallback (which works but needs user to send email)
echo.

echo Choose setup method:
echo [1] EmailJS (Free, 200 emails/month, recommended)
echo [2] Formspree (Free, 50 emails/month, simpler)  
echo [3] Keep current mailto system (works but manual)
echo [4] View documentation and test current system
echo.

set /p choice="Enter choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo Opening EmailJS setup guide...
    powershell -ExecutionPolicy Bypass -File "%~dp0scripts\setup-email-system.ps1"
) else if "%choice%"=="2" (
    echo.
    echo Opening Formspree setup guide...
    start https://formspree.io/
    echo.
    echo 1. Sign up on Formspree with your email
    echo 2. Create a new form
    echo 3. Copy the form endpoint URL
    echo 4. Update FORMSPREE_ENDPOINT in .env.local
    echo 5. Restart your dev server
) else if "%choice%"=="3" (
    echo.
    echo Your current mailto system is already working!
    echo Users can fill the form and it opens their email client.
    echo This is actually preferred by many users.
    echo.
    echo Test it: http://localhost:3000/contact
) else if "%choice%"=="4" (
    echo.
    echo Opening documentation...
    start docs\email-testing-guide.md
    start docs\email-test-results.md
    echo.
    echo Starting development server for testing...
    cd apps\portfolio-mixed
    npm run dev
) else (
    echo Invalid choice
)

echo.
pause