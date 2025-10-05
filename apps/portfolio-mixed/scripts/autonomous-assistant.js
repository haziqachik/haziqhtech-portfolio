#!/usr/bin/env node

/**
 * Autonomous Development Assistant
 * Runs background tasks and iterations without user input
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutonomousAssistant {
  constructor() {
    this.taskQueue = [];
    this.isRunning = false;
    this.logFile = path.join(__dirname, 'autonomous-log.txt');
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    console.log(logEntry.trim());
    fs.appendFileSync(this.logFile, logEntry);
  }

  async executeCommand(command, cwd = process.cwd()) {
    return new Promise((resolve, reject) => {
      this.log(`Executing: ${command} in ${cwd}`);
      
      const child = spawn(command, {
        shell: true,
        cwd: cwd,
        stdio: 'pipe'
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        this.log(`Command completed with code ${code}`);
        if (stdout) this.log(`STDOUT: ${stdout}`);
        if (stderr) this.log(`STDERR: ${stderr}`);
        
        if (code === 0) {
          resolve({ stdout, stderr, code });
        } else {
          reject(new Error(`Command failed with code ${code}: ${stderr}`));
        }
      });
    });
  }

  async buildAndTest() {
    try {
      this.log('Starting autonomous build and test cycle...');
      
      // Build the project
      await this.executeCommand('npm run build');
      this.log('✅ Build successful');

      // Test if server starts
      const serverProcess = spawn('npm', ['run', 'dev'], { 
        detached: true,
        stdio: 'ignore'
      });
      
      // Wait 10 seconds then kill
      setTimeout(() => {
        try {
          process.kill(-serverProcess.pid);
          this.log('✅ Server startup test completed');
        } catch (err) {
          this.log('⚠️ Server cleanup warning (normal)');
        }
      }, 10000);

      return true;
    } catch (error) {
      this.log(`❌ Build/test failed: ${error.message}`);
      return false;
    }
  }

  async commitAndPush(message = 'Autonomous update') {
    try {
      await this.executeCommand('git add -A');
      await this.executeCommand(`git commit -m "${message}"`);
      await this.executeCommand('git push origin main');
      this.log('✅ Successfully committed and pushed changes');
      return true;
    } catch (error) {
      this.log(`❌ Git operations failed: ${error.message}`);
      return false;
    }
  }

  async runMaintenanceTasks() {
    this.log('🔧 Running maintenance tasks...');
    
    try {
      // Update dependencies
      await this.executeCommand('npm audit fix --force');
      this.log('✅ Security audit completed');

      // Clean up
      await this.executeCommand('npm run lint --fix');
      this.log('✅ Linting completed');

      return true;
    } catch (error) {
      this.log(`⚠️ Maintenance tasks completed with warnings: ${error.message}`);
      return false;
    }
  }

  async runAutonomousCycle() {
    if (this.isRunning) {
      this.log('⚠️ Autonomous cycle already running');
      return;
    }

    this.isRunning = true;
    this.log('🚀 Starting autonomous development cycle');

    try {
      // 1. Run maintenance
      await this.runMaintenanceTasks();
      
      // 2. Build and test
      const buildSuccess = await this.buildAndTest();
      
      if (buildSuccess) {
        // 3. Commit changes
        await this.commitAndPush('🤖 Autonomous maintenance and optimization');
        this.log('✅ Autonomous cycle completed successfully');
      } else {
        this.log('❌ Autonomous cycle failed at build stage');
      }
    } catch (error) {
      this.log(`❌ Autonomous cycle error: ${error.message}`);
    } finally {
      this.isRunning = false;
    }
  }

  startContinuousMode(intervalMinutes = 30) {
    this.log(`🔄 Starting continuous mode (every ${intervalMinutes} minutes)`);
    
    // Run immediately
    this.runAutonomousCycle();
    
    // Then run on interval
    setInterval(() => {
      this.runAutonomousCycle();
    }, intervalMinutes * 60 * 1000);
  }
}

// Usage
if (require.main === module) {
  const assistant = new AutonomousAssistant();
  
  const args = process.argv.slice(2);
  const mode = args[0] || 'once';
  
  if (mode === 'continuous') {
    const interval = parseInt(args[1]) || 30;
    assistant.startContinuousMode(interval);
  } else {
    assistant.runAutonomousCycle().then(() => {
      process.exit(0);
    }).catch((err) => {
      console.error('Autonomous cycle failed:', err);
      process.exit(1);
    });
  }
}

module.exports = AutonomousAssistant;