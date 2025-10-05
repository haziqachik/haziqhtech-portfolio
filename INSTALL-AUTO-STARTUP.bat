@echo off
echo 🚀 WINDOWS AUTO-STARTUP INSTALLER
echo =================================
echo.
echo This will make the autonomous system start automatically when Windows boots
echo 💡 You'll never have to remember to start it again!
echo.

echo Choose an option:
echo [1] ✅ Install Auto-Startup (recommended)
echo [2] 📊 Check Current Status  
echo [3] 🗑️  Remove Auto-Startup
echo [4] 🧪 Test Startup Now
echo.

set /p choice="Enter choice (1-4): "

if "%choice%"=="1" (
    echo 🔧 Installing auto-startup configuration...
    powershell -ExecutionPolicy Bypass -File "%~dp0scripts\setup-windows-startup.ps1" -Install
    echo.
    echo 🎉 SUCCESS! Autonomous system will now start automatically!
    echo 💻 Next time you boot Windows, everything runs automatically
    echo 🚶‍♂️ You can literally turn on your PC and walk away!
    
) else if "%choice%"=="2" (
    echo 📊 Checking auto-startup status...
    powershell -ExecutionPolicy Bypass -File "%~dp0scripts\setup-windows-startup.ps1" -Status
    
) else if "%choice%"=="3" (
    echo 🗑️  Removing auto-startup...
    powershell -ExecutionPolicy Bypass -File "%~dp0scripts\setup-windows-startup.ps1" -Uninstall
    echo ✅ Auto-startup removed
    
) else if "%choice%"=="4" (
    echo 🧪 Testing startup process now...
    echo 🚀 Starting autonomous system...
    call "%~dp0ONE-CLICK-START.bat"
    
) else (
    echo ❌ Invalid choice
)

echo.
pause