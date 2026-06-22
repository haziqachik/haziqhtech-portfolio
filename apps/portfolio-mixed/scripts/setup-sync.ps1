# ========================================
# EASY SETUP: Auto-Sync Clips to Google Drive
# ========================================
# Just run this script on your PC and follow the prompts!

Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Auto-Sync Setup for Google Drive            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan

# Step 1: Find clip folders
Write-Host "`n[1/3] Searching for your clip folders..." -ForegroundColor Yellow

$videosPath = "$env:USERPROFILE\Videos"
$foundFolders = @()

$possiblePaths = @(
    "$videosPath\Medal",
    "$videosPath\Captures",
    "$videosPath\OBS",
    "$videosPath\Outplayed\Valorant",
    "$videosPath\Valorant",
    "$videosPath\NVIDIA",
    "$videosPath\Radeon ReLive",
    "$videosPath"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $fileCount = (Get-ChildItem $path -File -Recurse -ErrorAction SilentlyContinue | Measure-Object).Count
        if ($fileCount -gt 0) {
            $foundFolders += [PSCustomObject]@{
                Path = $path
                Files = $fileCount
            }
        }
    }
}

if ($foundFolders.Count -eq 0) {
    Write-Host "`n❌ No video folders found. Please enter path manually." -ForegroundColor Red
    $sourceFolder = Read-Host "`nEnter the full path to your clips folder"
} else {
    Write-Host "`nFound folders with video files:" -ForegroundColor Green
    for ($i = 0; $i -lt $foundFolders.Count; $i++) {
        Write-Host "  [$($i + 1)] $($foundFolders[$i].Path) ($($foundFolders[$i].Files) files)" -ForegroundColor White
    }
    
    $selection = Read-Host "`nSelect folder number (or press Enter to type custom path)"
    
    if ([string]::IsNullOrWhiteSpace($selection)) {
        $sourceFolder = Read-Host "Enter the full path to your clips folder"
    } else {
        $index = [int]$selection - 1
        if ($index -ge 0 -and $index -lt $foundFolders.Count) {
            $sourceFolder = $foundFolders[$index].Path
        } else {
            Write-Host "Invalid selection. Using default Videos folder." -ForegroundColor Yellow
            $sourceFolder = $videosPath
        }
    }
}

Write-Host "`n✓ Source folder: $sourceFolder" -ForegroundColor Green

# Step 2: Set Google Drive destination
Write-Host "`n[2/3] Setting up Google Drive destination..." -ForegroundColor Yellow

$defaultDest = "G:\My Drive\Valorant Clips"
$destFolder = Read-Host "`nGoogle Drive destination (press Enter for: $defaultDest)"

if ([string]::IsNullOrWhiteSpace($destFolder)) {
    $destFolder = $defaultDest
}

Write-Host "✓ Destination: $destFolder" -ForegroundColor Green

# Step 3: Choose sync method
Write-Host "`n[3/3] Choose sync method:" -ForegroundColor Yellow
Write-Host "  [1] Scheduled Sync - Every 5 minutes (Recommended)" -ForegroundColor White
Write-Host "  [2] Real-time Sync - Instant when files change" -ForegroundColor White

$method = Read-Host "`nSelect method (1 or 2, press Enter for 1)"

if ([string]::IsNullOrWhiteSpace($method) -or $method -eq "1") {
    # Scheduled sync using robocopy
    Write-Host "`n⚙️ Creating scheduled task..." -ForegroundColor Cyan
    
    try {
        $action = New-ScheduledTaskAction -Execute "robocopy" `
            -Argument "`"$sourceFolder`" `"$destFolder`" /E /XO /Z /R:3 /W:5 /MT:8"
        
        $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) `
            -RepetitionInterval (New-TimeSpan -Minutes 5)
        
        $settings = New-ScheduledTaskSettingsSet `
            -AllowStartIfOnBatteries `
            -DontStopIfGoingOnBatteries `
            -StartWhenAvailable
        
        Register-ScheduledTask `
            -TaskName "GDrive Clips Auto-Sync" `
            -Action $action `
            -Trigger $trigger `
            -Settings $settings `
            -Description "Auto-sync clips to Google Drive every 5 minutes" `
            -Force | Out-Null
        
        Write-Host "`n✅ SUCCESS! Scheduled task created." -ForegroundColor Green
        Write-Host "`n📊 Task Details:" -ForegroundColor Cyan
        Write-Host "   Name: GDrive Clips Auto-Sync"
        Write-Host "   Frequency: Every 5 minutes"
        Write-Host "   From: $sourceFolder"
        Write-Host "   To: $destFolder"
        
        # Run first sync now
        Write-Host "`n🔄 Running initial sync..." -ForegroundColor Cyan
        Start-Process -FilePath "robocopy" -ArgumentList "`"$sourceFolder`" `"$destFolder`" /E /XO /Z /R:3 /W:5" -NoNewWindow -Wait
        
        Write-Host "`n✅ Initial sync complete!" -ForegroundColor Green
        
    } catch {
        Write-Host "`n❌ Error creating task: $_" -ForegroundColor Red
        exit 1
    }
    
} else {
    # Real-time sync script
    Write-Host "`n⚙️ Setting up real-time sync..." -ForegroundColor Cyan
    
    # Create the sync script
    $syncScriptPath = "$env:USERPROFILE\Documents\gdrive-realtime-sync.ps1"
    
    $syncScriptContent = @"
# Auto-generated sync script
# Source: $sourceFolder
# Destination: $destFolder

`$sourceFolder = "$sourceFolder"
`$destinationFolder = "$destFolder"

if (-not (Test-Path `$destinationFolder)) {
    New-Item -ItemType Directory -Path `$destinationFolder -Force | Out-Null
    Write-Host "Created destination folder" -ForegroundColor Green
}

Write-Host "Performing initial sync..." -ForegroundColor Cyan
Copy-Item -Path "`$sourceFolder\*" -Destination `$destinationFolder -Recurse -Force
Write-Host "Initial sync complete!" -ForegroundColor Green

`$watcher = New-Object System.IO.FileSystemWatcher
`$watcher.Path = `$sourceFolder
`$watcher.Filter = "*.*"
`$watcher.IncludeSubdirectories = `$true
`$watcher.EnableRaisingEvents = `$true

`$action = {
    `$path = `$Event.SourceEventArgs.FullPath
    `$changeType = `$Event.SourceEventArgs.ChangeType
    `$timeStamp = `$Event.TimeGenerated
    
    `$relativePath = `$path.Replace(`$sourceFolder, "")
    `$destPath = Join-Path `$destinationFolder `$relativePath
    
    switch (`$changeType) {
        'Created' {
            Write-Host "[`$timeStamp] Created: `$relativePath" -ForegroundColor Green
            `$destDir = Split-Path `$destPath -Parent
            if (-not (Test-Path `$destDir)) {
                New-Item -ItemType Directory -Path `$destDir -Force | Out-Null
            }
            Copy-Item -Path `$path -Destination `$destPath -Force
        }
        'Changed' {
            Write-Host "[`$timeStamp] Changed: `$relativePath" -ForegroundColor Yellow
            Copy-Item -Path `$path -Destination `$destPath -Force
        }
        'Deleted' {
            Write-Host "[`$timeStamp] Deleted: `$relativePath" -ForegroundColor Red
            if (Test-Path `$destPath) {
                Remove-Item -Path `$destPath -Force
            }
        }
        'Renamed' {
            `$oldPath = `$Event.SourceEventArgs.OldFullPath
            Write-Host "[`$timeStamp] Renamed: `$oldPath -> `$path" -ForegroundColor Cyan
            Copy-Item -Path `$path -Destination `$destPath -Force
        }
    }
}

Register-ObjectEvent -InputObject `$watcher -EventName "Created" -Action `$action | Out-Null
Register-ObjectEvent -InputObject `$watcher -EventName "Changed" -Action `$action | Out-Null
Register-ObjectEvent -InputObject `$watcher -EventName "Deleted" -Action `$action | Out-Null
Register-ObjectEvent -InputObject `$watcher -EventName "Renamed" -Action `$action | Out-Null

Write-Host "`n=== Real-Time Sync Active ===" -ForegroundColor Cyan
Write-Host "Source: `$sourceFolder"
Write-Host "Destination: `$destinationFolder"
Write-Host "Press Ctrl+C to stop...`n" -ForegroundColor Yellow

try {
    while (`$true) { Start-Sleep -Seconds 1 }
}
finally {
    `$watcher.EnableRaisingEvents = `$false
    `$watcher.Dispose()
    Get-EventSubscriber | Unregister-Event
    Write-Host "`nSync stopped." -ForegroundColor Red
}
"@
    
    Set-Content -Path $syncScriptPath -Value $syncScriptContent
    
    Write-Host "✓ Created sync script at: $syncScriptPath" -ForegroundColor Green
    
    # Create startup shortcut
    $startupPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup"
    $shortcutPath = "$startupPath\GDrive-Sync.lnk"
    
    try {
        $WScriptShell = New-Object -ComObject WScript.Shell
        $Shortcut = $WScriptShell.CreateShortcut($shortcutPath)
        $Shortcut.TargetPath = "powershell.exe"
        $Shortcut.Arguments = "-WindowStyle Minimized -ExecutionPolicy Bypass -File `"$syncScriptPath`""
        $Shortcut.WorkingDirectory = Split-Path $syncScriptPath
        $Shortcut.IconLocation = "shell32.dll,16"
        $Shortcut.Save()
        
        Write-Host "✓ Created startup shortcut" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Could not create startup shortcut (run as admin)" -ForegroundColor Yellow
    }
    
    Write-Host "`n✅ SUCCESS! Real-time sync configured." -ForegroundColor Green
    Write-Host "`n📊 Setup Details:" -ForegroundColor Cyan
    Write-Host "   Script: $syncScriptPath"
    Write-Host "   Startup: Will run automatically on PC startup"
    Write-Host "   From: $sourceFolder"
    Write-Host "   To: $destFolder"
    
    # Ask to start now
    $startNow = Read-Host "`nStart sync now? (Y/n)"
    if ([string]::IsNullOrWhiteSpace($startNow) -or $startNow -eq "Y" -or $startNow -eq "y") {
        Write-Host "`n🔄 Starting real-time sync (minimize this window)..." -ForegroundColor Cyan
        & $syncScriptPath
    } else {
        Write-Host "`n💡 To start manually, run: $syncScriptPath" -ForegroundColor Yellow
    }
}

Write-Host "`n╔════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║              SETUP COMPLETE! ✨                ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Green

Write-Host "`n📝 What happens next:" -ForegroundColor Cyan
if ([string]::IsNullOrWhiteSpace($method) -or $method -eq "1") {
    Write-Host "   • Syncs every 5 minutes automatically"
    Write-Host "   • Runs in background (no window)"
    Write-Host "   • View in Task Scheduler: taskschd.msc"
    Write-Host "`n🛑 To stop: Open Task Scheduler > Delete 'GDrive Clips Auto-Sync'"
} else {
    Write-Host "   • Syncs instantly when files change"
    Write-Host "   • Starts automatically on PC boot"
    Write-Host "   • Keep PowerShell window minimized"
    Write-Host "`n🛑 To stop: Close the PowerShell window"
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
