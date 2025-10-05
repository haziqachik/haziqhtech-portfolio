@echo off
echo 🤖 AUTONOMOUS DEVELOPMENT ASSISTANT
echo =====================================
echo.
echo This will run development tasks automatically in the background.
echo You can close this window and tasks will continue running.
echo.
pause

echo 🚀 Starting autonomous mode...
echo.

REM Change to the correct directory
cd /d "C:\Users\hzham\haziqhtech\apps\portfolio-mixed"

REM Run autonomous tasks in background
start /min powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File "scripts\autonomous-tasks.ps1" -Command "Start-AutonomousMode -IntervalMinutes 30 -MaxHours 8"

echo ✅ Autonomous assistant is now running in the background!
echo 📝 Check autonomous-log.txt for progress updates.
echo 💡 Tasks will run every 30 minutes for the next 8 hours.
echo.
echo You can now close this window and walk away! 😊
echo.
pause