@echo off
echo 🤖 ULTIMATE AUTONOMOUS SYSTEM - ALL OPTIONS
echo ===========================================
echo.
echo Choose your autonomous mode:
echo.
echo [1] 🚀 Quick Background (runs for 8 hours)
echo [2] 🔄 Continuous Background (runs for 24 hours)  
echo [3] 🛡️  Windows Service (runs forever, survives reboots)
echo [4] 🔧 VS Code Only (autonomous coding environment)
echo [5] 📊 Check Status (see what's running)
echo.

set /p mode="Choose mode (1-5): "

if "%mode%"=="1" (
    echo 🚀 Starting 8-hour background autonomous session...
    call "%~dp0start-background-autonomous.bat"
) else if "%mode%"=="2" (
    echo 🔄 Starting 24-hour continuous autonomous session...
    powershell -WindowStyle Hidden -ExecutionPolicy Bypass -File "%~dp0scripts\ultimate-background-autonomous.ps1" -MaxHours 24
    echo ✅ 24-hour autonomous system started in background!
) else if "%mode%"=="3" (
    echo 🛡️  Setting up Windows Service...
    call "%~dp0manage-autonomous-service.bat"
) else if "%mode%"=="4" (
    echo 🔧 Starting VS Code autonomous mode...
    call "%~dp0start-autonomous-vscode.bat"
) else if "%mode%"=="5" (
    echo 📊 Checking autonomous system status...
    powershell -ExecutionPolicy Bypass -Command "Get-Process -Name 'powershell','Code' | Where-Object {$_.CommandLine -like '*autonomous*'} | Format-Table ProcessName,Id,StartTime"
    echo.
    echo 📝 Recent logs:
    if exist autonomous-background.log (
        powershell -ExecutionPolicy Bypass -Command "Get-Content autonomous-background.log -Tail 5"
    ) else (
        echo No background logs found
    )
) else (
    echo ❌ Invalid choice
    pause
    goto :EOF
)

echo.
echo ✅ Autonomous system configured!
echo 💡 You can now close this window and walk away!
echo 📝 Check logs: autonomous-background.log
echo � To stop: Use Task Manager or restart computer
echo.
pause