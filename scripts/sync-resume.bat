@echo off
REM =====================================================================
REM  Resume Sync - Double-click to update your website resume
REM =====================================================================
REM  This script automatically syncs your latest resume from Google Drive
REM  to your portfolio website and deploys it to production.
REM =====================================================================

title Resume Sync - haziqhtech.sg

echo.
echo ========================================
echo   Resume Sync Automation
echo ========================================
echo.
echo This will:
echo  1. Find the latest resume in Google Drive
echo  2. Copy it to the portfolio project
echo  3. Commit and push to GitHub
echo  4. Trigger automatic Vercel deployment
echo.
echo Press Ctrl+C to cancel, or
pause

REM Run PowerShell script with execution policy bypass
PowerShell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0sync-resume.ps1"

REM Check exit code
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Resume updated.
    echo ========================================
    echo.
    echo Your resume has been synced to GitHub.
    echo Vercel will deploy it in 1-2 minutes.
    echo.
    echo Visit: https://haziqhtech.sg/resume
    echo.
) else (
    echo.
    echo ========================================
    echo   ERROR: Sync failed
    echo ========================================
    echo.
    echo Check the error messages above.
    echo Common issues:
    echo  - Google Drive not mounted
    echo  - Git not configured
    echo  - Network connection issues
    echo.
)

echo.
echo Press any key to close...
pause >nul
