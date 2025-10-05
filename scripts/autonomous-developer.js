#!/usr/bin/env node
// Autonomous Development Assistant - Monitors and maintains development workflow
// Prevents VS Code issues and automates common tasks

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class AutonomousDeveloper {
    constructor() {
        this.projectRoot = process.cwd();
        this.logFile = path.join(this.projectRoot, 'autonomous-dev.log');
        this.isRunning = false;
        this.checkInterval = 30000; // 30 seconds
        this.lastActivity = Date.now();
    }

    log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${level}: ${message}\n`;
        
        console.log(`🤖 ${message}`);
        fs.appendFileSync(this.logFile, logEntry);
    }

    async executeCommand(command, description) {
        return new Promise((resolve, reject) => {
            this.log(`Executing: ${description}`);
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    this.log(`Error: ${error.message}`, 'ERROR');
                    reject(error);
                } else {
                    this.log(`Success: ${description}`);
                    resolve(stdout);
                }
            });
        });
    }

    async checkVSCodeHealth() {
        try {
            // Check if VS Code is responsive
            await this.executeCommand('code --version', 'Checking VS Code version');
            return true;
        } catch (error) {
            this.log('VS Code appears unresponsive', 'WARNING');
            return false;
        }
    }

    async optimizeWorkspace() {
        this.log('Starting workspace optimization...');
        
        try {
            // Close unused editors
            await this.executeCommand(
                'code --command "workbench.action.closeOtherEditors"',
                'Closing unused editors'
            );

            // Kill old terminals
            await this.executeCommand(
                'code --command "workbench.action.terminal.killAll"',
                'Cleaning up terminals'
            );

            // Restart Copilot if needed
            await this.executeCommand(
                'code --command "github.copilot.restart"',
                'Restarting Copilot services'
            );

            this.log('Workspace optimization completed');
        } catch (error) {
            this.log(`Workspace optimization failed: ${error.message}`, 'ERROR');
        }
    }

    async monitorGitChanges() {
        try {
            const result = await this.executeCommand('git status --porcelain', 'Checking git status');
            
            if (result.trim()) {
                this.log('Uncommitted changes detected');
                
                // Auto-commit if enabled
                if (process.env.AUTO_COMMIT === 'true') {
                    await this.executeCommand('git add -A', 'Adding all changes');
                    await this.executeCommand(
                        `git commit -m "Auto-commit: ${new Date().toISOString()}"`,
                        'Auto-committing changes'
                    );
                    this.log('Changes auto-committed');
                }
            }
        } catch (error) {
            this.log(`Git monitoring failed: ${error.message}`, 'ERROR');
        }
    }

    async checkDeploymentStatus() {
        try {
            // Check if build is successful
            const packageJson = JSON.parse(fs.readFileSync(path.join(this.projectRoot, 'apps/portfolio-mixed/package.json')));
            
            if (packageJson.scripts.build) {
                this.log('Checking build status...');
                await this.executeCommand('npm run build --prefix apps/portfolio-mixed', 'Building project');
                this.log('Build successful - ready for deployment');
            }
        } catch (error) {
            this.log(`Build check failed: ${error.message}`, 'ERROR');
        }
    }

    async runHealthChecks() {
        this.log('Running comprehensive health checks...');

        // Check VS Code health
        const vscodeHealthy = await this.checkVSCodeHealth();
        if (!vscodeHealthy) {
            await this.optimizeWorkspace();
        }

        // Monitor git changes
        await this.monitorGitChanges();

        // Check deployment readiness
        await this.checkDeploymentStatus();

        this.lastActivity = Date.now();
    }

    async start() {
        if (this.isRunning) {
            this.log('Autonomous developer already running');
            return;
        }

        this.isRunning = true;
        this.log('🚀 Autonomous Developer starting...');
        
        // Initial health check
        await this.runHealthChecks();

        // Set up monitoring interval
        const monitoringInterval = setInterval(async () => {
            if (!this.isRunning) {
                clearInterval(monitoringInterval);
                return;
            }

            try {
                await this.runHealthChecks();
            } catch (error) {
                this.log(`Monitoring error: ${error.message}`, 'ERROR');
            }
        }, this.checkInterval);

        // Handle graceful shutdown
        process.on('SIGINT', () => {
            this.log('Shutting down autonomous developer...');
            this.isRunning = false;
            clearInterval(monitoringInterval);
            process.exit(0);
        });

        this.log('✅ Autonomous Developer is now monitoring your workspace');
        this.log(`📊 Check logs at: ${this.logFile}`);
    }

    stop() {
        this.isRunning = false;
        this.log('Autonomous developer stopped');
    }
}

// CLI interface
if (require.main === module) {
    const developer = new AutonomousDeveloper();
    
    const command = process.argv[2];
    
    switch (command) {
        case 'start':
            developer.start();
            break;
        case 'stop':
            developer.stop();
            break;
        case 'optimize':
            developer.optimizeWorkspace();
            break;
        case 'check':
            developer.runHealthChecks();
            break;
        default:
            console.log(`
🤖 Autonomous Developer CLI

Usage:
  node autonomous-developer.js start    - Start monitoring
  node autonomous-developer.js stop     - Stop monitoring  
  node autonomous-developer.js optimize - Optimize workspace now
  node autonomous-developer.js check    - Run health checks

Environment Variables:
  AUTO_COMMIT=true  - Enable automatic git commits
            `);
    }
}

module.exports = AutonomousDeveloper;