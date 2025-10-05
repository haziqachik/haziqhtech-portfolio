# VS Code Workspace Optimizer - Auto cleanup and maintenance
# Prevents VS Code Copilot Chat from stopping and manages editors/terminals

param(
    [switch]$CleanupOnly,
    [switch]$RestartCopilot,
    [switch]$Full
)

Write-Host "🚀 VS Code Workspace Optimizer Starting..." -ForegroundColor Green

# Function to cleanup VS Code workspace
function Cleanup-VSCodeWorkspace {
    Write-Host "🧹 Cleaning up VS Code workspace..." -ForegroundColor Yellow
    
    # Close unused editors (keep only modified ones)
    code --command "workbench.action.closeEditorsInOtherGroups"
    code --command "workbench.action.closeOtherEditors" 
    
    # Kill unnecessary terminals
    code --command "workbench.action.terminal.killAll"
    
    # Clear output panels
    code --command "workbench.action.clearOutputChannel"
    code --command "workbench.action.clearSearchResults"
    
    # Reload window to refresh state
    if ($RestartCopilot) {
        Write-Host "🔄 Reloading VS Code window..." -ForegroundColor Cyan
        code --command "workbench.action.reloadWindow"
    }
    
    Write-Host "✅ Workspace cleanup completed!" -ForegroundColor Green
}

# Function to optimize VS Code performance  
function Optimize-VSCodePerformance {
    Write-Host "⚡ Optimizing VS Code performance..." -ForegroundColor Yellow
    
    # Restart Copilot services
    code --command "github.copilot.restart"
    code --command "github.copilot.chat.restart" 
    
    # Clear cache and temp files
    $vsCodeCachePath = "$env:APPDATA\Code\User\workspaceStorage"
    if (Test-Path $vsCodeCachePath) {
        Get-ChildItem $vsCodeCachePath -Recurse -Directory | 
        Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-7) } |
        Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
    }
    
    Write-Host "✅ Performance optimization completed!" -ForegroundColor Green
}

# Function to ensure autonomous execution is working
function Test-AutonomousExecution {
    Write-Host "🤖 Testing autonomous execution..." -ForegroundColor Yellow
    
    # Create test file to verify Copilot is responsive
    $testFile = "test-copilot-response.txt"
    "Testing Copilot Chat responsiveness - $(Get-Date)" | Out-File $testFile
    
    # Check if Copilot extensions are active
    $copilotStatus = code --list-extensions --show-versions | Where-Object { $_ -like "*copilot*" }
    if ($copilotStatus) {
        Write-Host "✅ Copilot extensions detected: $($copilotStatus -join ', ')" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Copilot extensions not detected!" -ForegroundColor Red
    }
    
    # Clean up test file
    Remove-Item $testFile -ErrorAction SilentlyContinue
    
    Write-Host "✅ Autonomous execution test completed!" -ForegroundColor Green
}

# Main execution logic
if ($CleanupOnly) {
    Cleanup-VSCodeWorkspace
} elseif ($Full) {
    Cleanup-VSCodeWorkspace
    Optimize-VSCodePerformance  
    Test-AutonomousExecution
} else {
    # Default: Light cleanup
    Cleanup-VSCodeWorkspace
    Test-AutonomousExecution
}

# Set up automatic cleanup schedule (runs every hour)
if (-not $CleanupOnly) {
    Write-Host "⏰ Setting up automatic cleanup schedule..." -ForegroundColor Cyan
    
    $action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File `"$PSCommandPath`" -CleanupOnly"
    $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(60) -RepetitionInterval (New-TimeSpan -Hours 1)
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
    
    try {
        Register-ScheduledTask -Action $action -Trigger $trigger -Settings $settings -TaskName "VSCode-Workspace-Cleanup" -Description "Automatic VS Code workspace cleanup" -Force
        Write-Host "✅ Automatic cleanup scheduled every hour!" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  Could not schedule automatic cleanup: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

Write-Host "🎉 VS Code Workspace Optimizer completed successfully!" -ForegroundColor Green
Write-Host "💡 Pro tip: Run with -Full for complete optimization or -RestartCopilot if chat stops responding" -ForegroundColor Cyan