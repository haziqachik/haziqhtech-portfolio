# Automatic File Sync to Google Drive
# This script watches a source folder and automatically copies changes to Google Drive

# Configuration
$sourceFolder = "C:\Path\To\Your\Source\Folder"  # Change this to your source folder
$destinationFolder = "G:\My Drive\Valorant"      # Your Google Drive destination

# Create destination folder if it doesn't exist
if (-not (Test-Path $destinationFolder)) {
    New-Item -ItemType Directory -Path $destinationFolder -Force
    Write-Host "Created destination folder: $destinationFolder" -ForegroundColor Green
}

# Initial sync - copy all files
Write-Host "Performing initial sync..." -ForegroundColor Cyan
Copy-Item -Path "$sourceFolder\*" -Destination $destinationFolder -Recurse -Force
Write-Host "Initial sync complete!" -ForegroundColor Green

# Set up file watcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $sourceFolder
$watcher.Filter = "*.*"
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Define actions for different events
$action = {
    $path = $Event.SourceEventArgs.FullPath
    $changeType = $Event.SourceEventArgs.ChangeType
    $timeStamp = $Event.TimeGenerated
    
    # Calculate relative path
    $relativePath = $path.Replace($sourceFolder, "")
    $destPath = Join-Path $destinationFolder $relativePath
    
    switch ($changeType) {
        'Created' {
            Write-Host "[$timeStamp] File created: $relativePath" -ForegroundColor Green
            $destDir = Split-Path $destPath -Parent
            if (-not (Test-Path $destDir)) {
                New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            }
            Copy-Item -Path $path -Destination $destPath -Force
        }
        'Changed' {
            Write-Host "[$timeStamp] File changed: $relativePath" -ForegroundColor Yellow
            Copy-Item -Path $path -Destination $destPath -Force
        }
        'Deleted' {
            Write-Host "[$timeStamp] File deleted: $relativePath" -ForegroundColor Red
            if (Test-Path $destPath) {
                Remove-Item -Path $destPath -Force
            }
        }
        'Renamed' {
            $oldPath = $Event.SourceEventArgs.OldFullPath
            $oldRelativePath = $oldPath.Replace($sourceFolder, "")
            $oldDestPath = Join-Path $destinationFolder $oldRelativePath
            
            Write-Host "[$timeStamp] File renamed: $oldRelativePath -> $relativePath" -ForegroundColor Cyan
            
            if (Test-Path $oldDestPath) {
                Remove-Item -Path $oldDestPath -Force
            }
            Copy-Item -Path $path -Destination $destPath -Force
        }
    }
}

# Register event handlers
Register-ObjectEvent -InputObject $watcher -EventName "Created" -Action $action | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName "Changed" -Action $action | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName "Deleted" -Action $action | Out-Null
Register-ObjectEvent -InputObject $watcher -EventName "Renamed" -Action $action | Out-Null

Write-Host "`n=== File Sync Active ===" -ForegroundColor Cyan
Write-Host "Source: $sourceFolder" -ForegroundColor White
Write-Host "Destination: $destinationFolder" -ForegroundColor White
Write-Host "Press Ctrl+C to stop watching...`n" -ForegroundColor Yellow

# Keep script running
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
}
finally {
    # Cleanup on exit
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    Get-EventSubscriber | Unregister-Event
    Write-Host "`nFile sync stopped." -ForegroundColor Red
}
