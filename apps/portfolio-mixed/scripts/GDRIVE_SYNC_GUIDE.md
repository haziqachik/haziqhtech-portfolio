# Google Drive Auto-Sync Setup Guide

## Overview
This guide helps you set up automatic file synchronization to Google Drive on Windows.

## Prerequisites
- Google Drive Desktop app installed and synced (G: drive mapped)
- Source folder with files you want to sync
- PowerShell 5.1 or higher

---

## Method 1: Real-time Sync (FileSystemWatcher)

### Features
- ✅ Instant sync when files change
- ✅ Monitors: Create, Modify, Delete, Rename
- ✅ Runs continuously in background
- ❌ Requires PowerShell window to stay open

### Setup

1. **Edit the script:**
   ```powershell
   notepad .\scripts\sync-to-gdrive.ps1
   ```

2. **Change these lines:**
   ```powershell
   $sourceFolder = "C:\Your\Source\Folder"     # Your files here
   $destinationFolder = "G:\My Drive\Valorant"  # Google Drive destination
   ```

3. **Run the script:**
   ```powershell
   .\scripts\sync-to-gdrive.ps1
   ```

4. **Keep it running:**
   - Minimize PowerShell window (don't close it)
   - Or run as background job: `Start-Job -FilePath .\scripts\sync-to-gdrive.ps1`

### Run on Startup (Optional)

Create shortcut in Windows Startup folder:
```powershell
# Run this to create startup shortcut
$scriptPath = "$PWD\scripts\sync-to-gdrive.ps1"
$shortcutPath = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\GDriveSync.lnk"
$WScriptShell = New-Object -ComObject WScript.Shell
$Shortcut = $WScriptShell.CreateShortcut($shortcutPath)
$Shortcut.TargetPath = "powershell.exe"
$Shortcut.Arguments = "-WindowStyle Minimized -ExecutionPolicy Bypass -File `"$scriptPath`""
$Shortcut.WorkingDirectory = Split-Path $scriptPath
$Shortcut.Save()
Write-Host "Created startup shortcut!" -ForegroundColor Green
```

---

## Method 2: Scheduled Sync (Every X Minutes)

### Features
- ✅ More reliable (doesn't need to stay running)
- ✅ Syncs only changed files (MD5 hash comparison)
- ✅ Creates log file for tracking
- ✅ Optional: Delete orphaned files
- ❌ Not instant (delay based on schedule)

### Setup

1. **Edit the script:**
   ```powershell
   notepad .\scripts\scheduled-sync.ps1
   ```

2. **Change these lines:**
   ```powershell
   [string]$SourceFolder = "C:\Your\Source\Folder",
   [string]$DestinationFolder = "G:\My Drive\Valorant",
   ```

3. **Test manually first:**
   ```powershell
   .\scripts\scheduled-sync.ps1
   # Check sync-log.txt for results
   ```

4. **Create Windows Task:**
   ```powershell
   # Run this script to create scheduled task
   $action = New-ScheduledTaskAction -Execute "PowerShell.exe" `
       -Argument "-ExecutionPolicy Bypass -File `"$PWD\scripts\scheduled-sync.ps1`""
   
   $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5)
   
   $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
   
   Register-ScheduledTask -TaskName "GDrive Sync to Valorant" `
       -Action $action `
       -Trigger $trigger `
       -Settings $settings `
       -Description "Auto-sync files to Google Drive every 5 minutes"
   
   Write-Host "Task created! Runs every 5 minutes." -ForegroundColor Green
   ```

5. **Adjust sync frequency:**
   - Open Task Scheduler (`taskschd.msc`)
   - Find "GDrive Sync to Valorant"
   - Edit trigger → Change "Repeat task every" to your preferred interval

---

## Method 3: Robocopy (Windows Built-in)

### Features
- ✅ Windows built-in tool (no scripts needed)
- ✅ Very efficient for large files
- ✅ Mirror mode available
- ✅ Detailed logging

### Command Line

**One-time sync:**
```powershell
robocopy "C:\Source\Folder" "G:\My Drive\Valorant" /E /Z /R:3 /W:5
```

**Mirror sync (deletes files in destination that don't exist in source):**
```powershell
robocopy "C:\Source\Folder" "G:\My Drive\Valorant" /MIR /Z /R:3 /W:5
```

**With logging:**
```powershell
robocopy "C:\Source\Folder" "G:\My Drive\Valorant" /MIR /Z /R:3 /W:5 /LOG:sync-log.txt
```

### Schedule with Task Scheduler

1. Open Task Scheduler
2. Create Basic Task
3. Name: "Valorant Folder Sync"
4. Trigger: Daily, repeat every 5 minutes
5. Action: Start a program
   - Program: `robocopy`
   - Arguments: `"C:\Source\Folder" "G:\My Drive\Valorant" /MIR /Z /R:3 /W:5`

---

## Robocopy Flags Explained

| Flag | Description |
|------|-------------|
| `/E` | Copy subdirectories, including empty ones |
| `/MIR` | Mirror mode (copy + delete orphans) |
| `/Z` | Restartable mode (resume if interrupted) |
| `/R:3` | Retry 3 times on failure |
| `/W:5` | Wait 5 seconds between retries |
| `/XO` | Exclude older files (only copy newer) |
| `/LOG:file.txt` | Write log to file |
| `/TEE` | Output to console AND log file |

---

## Comparison

| Method | Real-time | Reliable | Easy Setup | Background |
|--------|-----------|----------|------------|------------|
| FileSystemWatcher | ✅ Yes | ⚠️ Medium | ⚠️ Medium | ❌ No |
| Scheduled Task | ❌ No | ✅ Yes | ✅ Easy | ✅ Yes |
| Robocopy | ❌ No | ✅ Yes | ✅ Very Easy | ✅ Yes |

---

## Recommendations

### For Valorant clips/recordings:
**Use: Robocopy with Task Scheduler**
- Syncs every 5-10 minutes
- Simple, reliable, built into Windows
- Good for large video files

```powershell
robocopy "C:\Valorant\Clips" "G:\My Drive\Valorant" /E /XO /Z /R:3 /W:5
```

### For documents that change frequently:
**Use: FileSystemWatcher script**
- Instant sync
- Great for text files, configs
- Can run on startup

### For backups:
**Use: Scheduled Task with PowerShell**
- Runs daily or weekly
- Creates logs for verification
- Can delete old files

---

## Troubleshooting

### Files not syncing?
1. Check Google Drive Desktop is running
2. Verify G: drive is accessible
3. Check script logs
4. Ensure no file locks (close applications)

### Task not running?
1. Open Task Scheduler
2. Right-click task → "Run"
3. Check "Last Run Result" column
4. View "History" tab for errors

### Permission errors?
Run PowerShell or Task Scheduler as Administrator

---

## Example: Valorant Clips Setup

**Goal:** Auto-sync Valorant clips to Google Drive every 5 minutes

1. **Find your Valorant clips folder:**
   - Usually: `C:\Users\YourName\Videos\Valorant`

2. **Run this setup:**
   ```powershell
   # Create scheduled task
   $source = "C:\Users\$env:USERNAME\Videos\Valorant"
   $dest = "G:\My Drive\Valorant"
   
   $action = New-ScheduledTaskAction -Execute "robocopy" `
       -Argument "`"$source`" `"$dest`" /E /XO /Z /R:3 /W:5"
   
   $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) `
       -RepetitionInterval (New-TimeSpan -Minutes 5)
   
   Register-ScheduledTask -TaskName "Valorant Clips to GDrive" `
       -Action $action -Trigger $trigger
   
   Write-Host "Done! Syncs every 5 minutes." -ForegroundColor Green
   ```

3. **Test it:**
   - Record a clip in Valorant
   - Wait 5 minutes
   - Check G:\My Drive\Valorant

---

## Stop/Remove Sync

### Stop FileSystemWatcher:
Press `Ctrl+C` in PowerShell window

### Remove scheduled task:
```powershell
Unregister-ScheduledTask -TaskName "GDrive Sync to Valorant" -Confirm:$false
```

### Remove startup shortcut:
```powershell
Remove-Item "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\GDriveSync.lnk"
```
