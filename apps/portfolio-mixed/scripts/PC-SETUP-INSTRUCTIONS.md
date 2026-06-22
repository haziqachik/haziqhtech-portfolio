# 🎮 Google Drive Auto-Sync for Clips

**Copy this file to your PC and run it - it does everything automatically!**

---

## 📦 What to Copy to Your PC

Copy **ONE file** to your PC:

```
setup-sync.ps1
```

That's it! This single script does everything.

---

## 🚀 How to Use (2 Steps)

### Step 1: Copy to Your PC
- Copy `setup-sync.ps1` to your PC (USB, email, Google Drive, whatever)
- Put it anywhere (Desktop is fine)

### Step 2: Run It
- Right-click `setup-sync.ps1`
- Click **"Run with PowerShell"**
- Follow the prompts (just press Enter for defaults!)

---

## 🎯 What It Does

1. **Finds your clips folder** - Auto-detects Medal, OBS, ShadowPlay, etc.
2. **Asks where to save** - Default: `G:\My Drive\Valorant Clips`
3. **Sets up auto-sync** - Choice of scheduled (every 5 min) or real-time

**That's it!** No editing needed. Just answer 3 simple questions.

---

## 📋 Example Run

```
[1/3] Searching for your clip folders...

Found folders with video files:
  [1] C:\Users\Haziq\Videos\Medal (47 files)
  [2] C:\Users\Haziq\Videos\Captures (12 files)

Select folder number: 1

[2/3] Setting up Google Drive destination...
Google Drive destination (press Enter for: G:\My Drive\Valorant Clips): [Enter]

[3/3] Choose sync method:
  [1] Scheduled Sync - Every 5 minutes (Recommended)
  [2] Real-time Sync - Instant when files change

Select method: [Enter]

✅ SUCCESS! Setup complete.
```

---

## ⚙️ Two Sync Options

### Option 1: Scheduled Sync (Recommended) ⭐
- Syncs every 5 minutes
- Runs in background (no window)
- Uses Windows Task Scheduler
- Most reliable

### Option 2: Real-time Sync
- Syncs instantly when files change
- PowerShell window stays open (minimize it)
- Starts automatically on PC boot
- Good for immediate backups

---

## 🛑 How to Stop/Remove

### If you chose Scheduled Sync:
```powershell
# Open Task Scheduler
taskschd.msc

# Find "GDrive Clips Auto-Sync" and delete it
```

Or run this command:
```powershell
Unregister-ScheduledTask -TaskName "GDrive Clips Auto-Sync" -Confirm:$false
```

### If you chose Real-time Sync:
- Just close the PowerShell window
- Or remove from startup: Delete `GDrive-Sync.lnk` from:
  ```
  C:\Users\YourName\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
  ```

---

## 🔧 Manual Setup (If You Want Custom Paths)

If the auto-detect doesn't work, you can manually edit paths:

1. When prompted "Select folder number", press Enter without typing anything
2. Type your custom path when it asks:
   ```
   C:\My\Custom\Clips\Folder
   ```

---

## 💡 Tips

- **First sync takes time** - It copies all existing clips first
- **Keep Google Drive running** - Make sure Desktop app is open
- **Check logs** - Task Scheduler shows run history
- **Change frequency** - Edit task in Task Scheduler to run every 1 min, 10 min, etc.

---

## 📞 Troubleshooting

### "Cannot run scripts" error?
Right-click PowerShell → Run as Administrator, then:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Task not running?
- Open `taskschd.msc`
- Find "GDrive Clips Auto-Sync"
- Right-click → "Run" to test
- Check "Last Run Result" (0x0 = success)

### Files not syncing?
- Verify Google Drive Desktop is running (G: drive exists)
- Check source folder path is correct
- Look for file locks (close Medal, OBS, etc. temporarily)

---

## 🎉 That's It!

Just run `setup-sync.ps1` and you're done. No editing, no complicated setup.

Your clips will automatically backup to Google Drive! 🚀
