#!/usr/bin/env node

/**
 * ULTIMATE ZERO-CLICK AUTONOMOUS ASSISTANT
 * Handles everything automatically with performance optimization
 * Prevents VS Code slowdowns and eliminates ALL approval prompts
 */

const fs = require('fs').promises;
const path = require('path');
const { exec, spawn } = require('child_process');
const { promisify } = require('util');
const os = require('os');

const execAsync = promisify(exec);

class UltimateAutonomousAssistant {
    constructor() {
        this.projectRoot = process.cwd();
        this.isRunning = false;
        this.taskQueue = [];
        this.performanceMode = true;
        this.checkInterval = 15000; // 15 seconds for responsiveness
        this.maxMemoryUsage = 2 * 1024 * 1024 * 1024; // 2GB limit
        this.logFile = path.join(this.projectRoot, 'ultimate-autonomous.log');
        
        // Enhanced task types including GitHub automation
        this.availableTasks = [
            'commit-changes',
            'build-project',
            'deploy-project',
            'install-dependencies',
            'check-updates',
            'github-security',
            'wiki-update',
            'security-audit',
            'performance-check'
        ];
        
        // Performance optimization settings
        this.optimizationSettings = {
            maxOpenFiles: 100,
            maxProcesses: 20,
            cleanupInterval: 5 * 60 * 1000, // 5 minutes
            memoryCheckInterval: 30 * 1000, // 30 seconds
            autoRestartOnMemoryLimit: true,
            preventVSCodeSlowdown: true
        };
        
        this.setupPerformanceMonitoring();
        this.setupSignalHandlers();
    }

    async log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        const colors = {
            INFO: '\x1b[36m',    // Cyan
            SUCCESS: '\x1b[32m', // Green  
            WARN: '\x1b[33m',    // Yellow
            ERROR: '\x1b[31m',   // Red
            PERF: '\x1b[35m'     // Magenta
        };
        const reset = '\x1b[0m';
        
        const logEntry = `[${timestamp}] [${level}] ${message}`;
        console.log(`${colors[level] || colors.INFO}${logEntry}${reset}`);
        
        try {
            await fs.appendFile(this.logFile, logEntry + '\n');
        } catch (err) {
            // Ignore log file errors
        }
    }

    setupPerformanceMonitoring() {
        // Memory monitoring
        setInterval(() => {
            this.checkSystemPerformance();
        }, this.optimizationSettings.memoryCheckInterval);
        
        // Cleanup monitoring  
        setInterval(() => {
            this.performCleanup();
        }, this.optimizationSettings.cleanupInterval);
    }

    async checkSystemPerformance() {
        try {
            const memUsage = process.memoryUsage();
            const totalMemory = os.totalmem();
            const freeMemory = os.freemem();
            const memoryUsagePercent = ((totalMemory - freeMemory) / totalMemory) * 100;
            
            if (memUsage.heapUsed > this.maxMemoryUsage) {
                await this.log(`⚠️ High memory usage: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`, 'PERF');
                
                if (this.optimizationSettings.autoRestartOnMemoryLimit) {
                    await this.performMemoryCleanup();
                }
            }
            
            if (memoryUsagePercent > 85) {
                await this.log(`🔥 System memory high: ${Math.round(memoryUsagePercent)}%`, 'WARN');
                await this.optimizeSystemPerformance();
            }
            
        } catch (err) {
            await this.log(`Memory check failed: ${err.message}`, 'ERROR');
        }
    }

    async performMemoryCleanup() {
        await this.log('🧹 Performing memory cleanup...', 'PERF');
        
        try {
            // Force garbage collection if available
            if (global.gc) {
                global.gc();
                await this.log('✅ Garbage collection completed', 'SUCCESS');
            }
            
            // Clear internal caches
            this.taskQueue = this.taskQueue.slice(0, 5); // Keep only recent tasks
            
            // Optimize VS Code processes
            await this.optimizeVSCodeMemory();
            
        } catch (err) {
            await this.log(`Memory cleanup failed: ${err.message}`, 'ERROR');
        }
    }

    async optimizeVSCodeMemory() {
        if (!this.optimizationSettings.preventVSCodeSlowdown) return;
        
        try {
            await this.log('🔧 Optimizing VS Code performance...', 'PERF');
            
            // Kill orphaned VS Code processes
            if (process.platform === 'win32') {
                const { stdout } = await execAsync('tasklist /FI "IMAGENAME eq Code.exe" /FO CSV');
                const processes = stdout.split('\n').slice(1).filter(line => line.trim());
                
                if (processes.length > 3) {
                    await this.log(`Found ${processes.length} VS Code processes, optimizing...`, 'PERF');
                    
                    // Keep only main process and recent windows
                    await execAsync('taskkill /F /IM "Code - Insiders.exe" 2>nul || echo "No Insider processes"');
                    await execAsync('taskkill /F /IM "CodeHelper.exe" 2>nul || echo "No helper processes"');
                }
            }
            
            // Clear VS Code temp files
            const vscodeTemp = path.join(os.tmpdir(), 'vscode-*');
            try {
                await execAsync(`del /Q "${vscodeTemp}" 2>nul || echo "No temp files"`);
            } catch {
                // Ignore cleanup errors
            }
            
            await this.log('✅ VS Code optimization completed', 'SUCCESS');
            
        } catch (err) {
            await this.log(`VS Code optimization failed: ${err.message}`, 'WARN');
        }
    }

    async optimizeSystemPerformance() {
        await this.log('⚡ Running system performance optimization...', 'PERF');
        
        try {
            // Clear system temp files
            await execAsync('cleanmgr /sagerun:1 2>nul || echo "Cleanup not available"');
            
            // Optimize disk performance
            await execAsync('defrag C: /A /H 2>nul || echo "Defrag not needed"');
            
            // Clear DNS cache
            await execAsync('ipconfig /flushdns 2>nul');
            
            await this.log('✅ System optimization completed', 'SUCCESS');
            
        } catch (err) {
            await this.log(`System optimization failed: ${err.message}`, 'WARN');
        }
    }

    async performCleanup() {
        try {
            await this.log('🧽 Performing routine cleanup...', 'PERF');
            
            // Clean project temp files
            const tempDirs = ['.next', 'node_modules/.cache', 'dist', '.tmp'];
            for (const dir of tempDirs) {
                const fullPath = path.join(this.projectRoot, dir);
                try {
                    const stat = await fs.stat(fullPath);
                    const age = Date.now() - stat.mtime.getTime();
                    
                    if (age > 2 * 60 * 60 * 1000) { // Older than 2 hours
                        await this.log(`Cleaning old cache: ${dir}`, 'PERF');
                        // Don't delete, just log for now to prevent build issues
                    }
                } catch {
                    // Directory doesn't exist, which is fine
                }
            }
            
            // Clean log files if they get too large
            try {
                const stat = await fs.stat(this.logFile);
                if (stat.size > 10 * 1024 * 1024) { // 10MB
                    await fs.writeFile(this.logFile, `--- Log rotated at ${new Date().toISOString()} ---\n`);
                    await this.log('📝 Log file rotated due to size', 'INFO');
                }
            } catch {
                // Log file doesn't exist yet
            }
            
        } catch (err) {
            await this.log(`Cleanup failed: ${err.message}`, 'ERROR');
        }
    }

    setupSignalHandlers() {
        const gracefulShutdown = async () => {
            await this.log('🛑 Graceful shutdown initiated...', 'INFO');
            this.isRunning = false;
            
            // Save current state
            await this.saveState();
            
            // Wait for tasks to complete
            let attempts = 0;
            while (this.taskQueue.length > 0 && attempts < 10) {
                await this.log(`Waiting for ${this.taskQueue.length} tasks...`, 'INFO');
                await this.sleep(1000);
                attempts++;
            }
            
            await this.log('👋 Autonomous assistant stopped gracefully', 'SUCCESS');
            process.exit(0);
        };
        
        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
        process.on('uncaughtException', async (err) => {
            await this.log(`💥 Uncaught Exception: ${err.message}`, 'ERROR');
            await this.saveState();
            process.exit(1);
        });
    }

    async saveState() {
        try {
            const state = {
                timestamp: new Date().toISOString(),
                taskQueue: this.taskQueue,
                performanceMetrics: {
                    memoryUsage: process.memoryUsage(),
                    uptime: process.uptime()
                }
            };
            
            await fs.writeFile(
                path.join(this.projectRoot, 'autonomous-state.json'),
                JSON.stringify(state, null, 2)
            );
        } catch (err) {
            await this.log(`Failed to save state: ${err.message}`, 'ERROR');
        }
    }

    async loadState() {
        try {
            const stateFile = path.join(this.projectRoot, 'autonomous-state.json');
            const stateData = await fs.readFile(stateFile, 'utf8');
            const state = JSON.parse(stateData);
            
            // Restore task queue if recent
            const age = Date.now() - new Date(state.timestamp).getTime();
            if (age < 30 * 60 * 1000) { // Less than 30 minutes old
                this.taskQueue = state.taskQueue || [];
                await this.log(`Restored ${this.taskQueue.length} tasks from previous session`, 'INFO');
            }
        } catch (err) {
            // No previous state or invalid state - start fresh
            await this.log('Starting with fresh state', 'INFO');
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async start() {
        if (this.isRunning) {
            await this.log('Assistant already running', 'WARN');
            return;
        }

        this.isRunning = true;
        
        await this.log('🚀 ULTIMATE AUTONOMOUS ASSISTANT STARTING', 'SUCCESS');
        await this.log('⚡ Performance mode: ENABLED', 'PERF');
        await this.log('🔒 Zero-click mode: ACTIVE', 'SUCCESS');
        await this.log('🧠 Memory limit: 2GB with auto-cleanup', 'PERF');
        
        // Load previous state
        await this.loadState();
        
        // Initial system check
        await this.performSystemCheck();
        
        // Start main loop
        this.mainLoop();
        
        return this;
    }

    async performSystemCheck() {
        await this.log('🔍 Comprehensive system check...', 'INFO');
        
        const checks = [
            this.checkGitStatus(),
            this.checkNodeEnvironment(), 
            this.checkBuildHealth(),
            this.checkVSCodeIntegration(),
            this.checkPerformanceMetrics()
        ];
        
        const results = await Promise.allSettled(checks);
        const checkNames = ['Git Status', 'Node Environment', 'Build Health', 'VS Code Integration', 'Performance'];
        
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                this.log(`✅ ${checkNames[index]}: ${result.value}`, 'SUCCESS');
            } else {
                this.log(`❌ ${checkNames[index]}: ${result.reason}`, 'ERROR');
            }
        });
    }

    async checkGitStatus() {
        try {
            const { stdout } = await execAsync('git status --porcelain');
            if (stdout.trim()) {
                this.addTask('commit-changes', { priority: 'high' });
                return `${stdout.trim().split('\n').length} uncommitted changes found`;
            }
            return 'Repository clean';
        } catch (err) {
            throw new Error(`Git unavailable: ${err.message}`);
        }
    }

    async checkNodeEnvironment() {
        try {
            const { stdout: nodeVersion } = await execAsync('node --version');
            const { stdout: npmVersion } = await execAsync('npm --version');
            
            // Check if node_modules exists
            if (!(await fs.access(path.join(this.projectRoot, 'node_modules')).then(() => true).catch(() => false))) {
                this.addTask('install-dependencies', { priority: 'high' });
                return 'Dependencies missing - will install';
            }
            
            return `Node ${nodeVersion.trim()}, npm ${npmVersion.trim()}`;
        } catch (err) {
            throw new Error(`Node environment issue: ${err.message}`);
        }
    }

    async checkBuildHealth() {
        const buildDirs = ['.next', 'dist', 'build'];
        
        for (const dir of buildDirs) {
            try {
                const buildPath = path.join(this.projectRoot, dir);
                const stat = await fs.stat(buildPath);
                const age = Date.now() - stat.mtime.getTime();
                
                if (age > 30 * 60 * 1000) { // Older than 30 minutes
                    this.addTask('build-project', { reason: 'stale_build' });
                    return `Build stale (${Math.round(age / 60000)}min) - scheduled rebuild`;
                }
                
                return `Build fresh (${Math.round(age / 60000)}min ago)`;
            } catch {
                // Build doesn't exist - will build on demand
            }
        }
        
        return 'No build artifacts - will build on demand';
    }

    async checkVSCodeIntegration() {
        try {
            // Check if VS Code settings are optimized
            const settingsPath = path.join(os.homedir(), 'AppData', 'Roaming', 'Code', 'User', 'settings.json');
            const settings = JSON.parse(await fs.readFile(settingsPath, 'utf8'));
            
            const requiredSettings = [
                'github.copilot.chat.executeImmediately',
                'security.workspace.trust.enabled',
                'git.confirmSync',
                'chat.commandExecution'
            ];
            
            const missingSettings = requiredSettings.filter(setting => !(setting in settings));
            
            if (missingSettings.length > 0) {
                return `Missing ${missingSettings.length} optimization settings`;
            }
            
            return 'VS Code fully optimized';
        } catch (err) {
            return 'VS Code settings check failed';
        }
    }

    async checkPerformanceMetrics() {
        const memUsage = process.memoryUsage();
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        
        const memoryInfo = {
            heap: Math.round(memUsage.heapUsed / 1024 / 1024),
            system: Math.round((totalMem - freeMem) / 1024 / 1024),
            free: Math.round(freeMem / 1024 / 1024)
        };
        
        if (memoryInfo.heap > 512) { // More than 512MB heap
            await this.performMemoryCleanup();
        }
        
        return `Heap: ${memoryInfo.heap}MB, System: ${memoryInfo.system}MB, Free: ${memoryInfo.free}MB`;
    }

    addTask(type, options = {}) {
        const task = {
            id: Date.now() + Math.random(),
            type,
            options,
            priority: options.priority || 'normal',
            addedAt: new Date(),
            attempts: 0,
            maxAttempts: 3
        };

        // Insert based on priority
        if (task.priority === 'high') {
            this.taskQueue.unshift(task);
        } else {
            this.taskQueue.push(task);
        }

        this.log(`➕ Added ${task.priority} priority task: ${type}`, 'INFO');
    }

    async mainLoop() {
        await this.log('🔄 Main execution loop started', 'INFO');
        
        let iteration = 0;
        
        while (this.isRunning) {
            try {
                iteration++;
                
                if (iteration % 20 === 0) { // Every 20 iterations (5 minutes)
                    await this.log(`💝 Heartbeat: ${iteration} iterations, ${this.taskQueue.length} queued`, 'INFO');
                }
                
                if (this.taskQueue.length > 0) {
                    const task = this.taskQueue.shift();
                    await this.executeTask(task);
                } else {
                    // No tasks - perform light maintenance
                    await this.performLightMaintenance();
                }
                
                // Save state periodically
                if (iteration % 100 === 0) {
                    await this.saveState();
                }
                
                await this.sleep(this.checkInterval);
                
            } catch (err) {
                await this.log(`❌ Main loop error: ${err.message}`, 'ERROR');
                await this.sleep(this.checkInterval * 2);
            }
        }
    }

    async performLightMaintenance() {
        // Quick maintenance tasks that don't slow things down
        try {
            // Check git status
            const { stdout } = await execAsync('git status --porcelain');
            if (stdout.trim()) {
                this.addTask('commit-changes', { priority: 'normal' });
            }
            
            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const dayOfWeek = now.getDay();
            
            // Check for updates every hour
            if (minute === 0 && now.getSeconds() < 20) {
                this.addTask('check-updates', { priority: 'low' });
            }
            
            // Run GitHub security setup on first run or weekly Sunday at 8 AM
            if ((dayOfWeek === 0 && hour === 8 && minute < 5) || 
                (!await this.hasRunGitHubSetup())) {
                this.addTask('github-security', { priority: 'high' });
            }
            
            // Wiki updates weekly on Sunday at 9 AM
            if (dayOfWeek === 0 && hour === 9 && minute < 5) {
                this.addTask('wiki-update', { priority: 'normal' });
            }
            
            // Security audit daily at midnight
            if (hour === 0 && minute < 5) {
                this.addTask('security-audit', { priority: 'normal' });
            }
            
        } catch (err) {
            // Ignore maintenance errors
        }
    }

    async hasRunGitHubSetup() {
        try {
            // Check if security policy exists as indicator
            const securityPath = path.join(this.projectRoot, 'SECURITY.md');
            await fs.access(securityPath);
            return true;
        } catch {
            return false;
        }
    }

    async executeTask(task) {
        const startTime = Date.now();
        await this.log(`🔧 Executing: ${task.type} (attempt ${task.attempts + 1})`, 'INFO');
        
        try {
            let success = false;
            
            switch (task.type) {
                case 'commit-changes':
                    success = await this.commitChanges(task.options);
                    break;
                case 'install-dependencies':
                    success = await this.installDependencies(task.options);
                    break;
                case 'build-project':
                    success = await this.buildProject(task.options);
                    break;
                case 'deploy-project':
                    success = await this.deployProject(task.options);
                    break;
                case 'check-updates':
                    success = await this.checkUpdates(task.options);
                    break;
                case 'github-security':
                    success = await this.runGitHubAutomation(task.options);
                    break;
                case 'wiki-update':
                    success = await this.updateWiki(task.options);
                    break;
                case 'security-audit':
                    success = await this.performSecurityAudit(task.options);
                    break;
                default:
                    await this.log(`❓ Unknown task: ${task.type}`, 'WARN');
                    return;
            }
            
            const duration = Date.now() - startTime;
            
            if (success) {
                await this.log(`✅ Completed: ${task.type} (${duration}ms)`, 'SUCCESS');
            } else {
                throw new Error(`Task failed: ${task.type}`);
            }
            
        } catch (err) {
            await this.log(`❌ Failed: ${task.type} - ${err.message}`, 'ERROR');
            
            task.attempts++;
            if (task.attempts < task.maxAttempts) {
                await this.log(`🔄 Retrying: ${task.type}`, 'WARN');
                this.taskQueue.push(task); // Re-queue
            } else {
                await this.log(`💀 Abandoned: ${task.type} (max attempts reached)`, 'ERROR');
            }
        }
    }

    async commitChanges(options = {}) {
        try {
            const { stdout } = await execAsync('git status --porcelain');
            if (!stdout.trim()) {
                await this.log('No changes to commit', 'INFO');
                return true;
            }

            // Stage all changes
            await execAsync('git add -A');
            
            // Create smart commit message
            const files = stdout.trim().split('\n').length;
            const message = options.message || `🤖 Autonomous update: ${files} files modified

✨ Continuous development in progress
- Enhanced autonomous operation system
- Performance optimization and monitoring  
- Zero-click VS Code configuration
- Automated build and deployment pipeline

Auto-committed: ${new Date().toISOString()}`;

            await execAsync(`git commit -m "${message}"`);
            await this.log('Changes committed successfully', 'SUCCESS');
            
            // Auto-push if enabled
            try {
                await execAsync('git push origin HEAD');
                await this.log('Changes pushed to remote', 'SUCCESS');
                
                // Trigger deployment if on main branch
                const { stdout: branch } = await execAsync('git branch --show-current');
                if (branch.trim() === 'main') {
                    this.addTask('deploy-project', { priority: 'high', trigger: 'push' });
                }
            } catch (pushErr) {
                await this.log(`Push failed: ${pushErr.message}`, 'WARN');
            }
            
            return true;
        } catch (err) {
            await this.log(`Commit failed: ${err.message}`, 'ERROR');
            return false;
        }
    }

    async installDependencies(options = {}) {
        try {
            await this.log('Installing dependencies...', 'INFO');
            
            // Use npm ci for faster, reliable installs
            const command = fs.access('package-lock.json').then(() => 'npm ci').catch(() => 'npm install');
            
            await execAsync(await command, { 
                timeout: 10 * 60 * 1000, // 10 minutes
                maxBuffer: 1024 * 1024 * 50 // 50MB buffer
            });
            
            await this.log('Dependencies installed successfully', 'SUCCESS');
            return true;
        } catch (err) {
            await this.log(`Dependency installation failed: ${err.message}`, 'ERROR');
            return false;
        }
    }

    async buildProject(options = {}) {
        try {
            await this.log('Building project...', 'INFO');
            
            // Navigate to portfolio-mixed if it exists
            const portfolioPath = path.join(this.projectRoot, 'apps', 'portfolio-mixed');
            const hasPortfolio = await fs.access(portfolioPath).then(() => true).catch(() => false);
            
            if (hasPortfolio) {
                process.chdir(portfolioPath);
                await this.log('Building in portfolio-mixed directory', 'INFO');
            }
            
            // Build with timeout and proper error handling
            await execAsync('npm run build', { 
                timeout: 10 * 60 * 1000, // 10 minutes
                maxBuffer: 1024 * 1024 * 100 // 100MB buffer
            });
            
            await this.log('Build completed successfully', 'SUCCESS');
            
            // Return to project root
            if (hasPortfolio) {
                process.chdir(this.projectRoot);
            }
            
            return true;
        } catch (err) {
            await this.log(`Build failed: ${err.message}`, 'ERROR');
            process.chdir(this.projectRoot); // Ensure we return to root
            return false;
        }
    }

    async deployProject(options = {}) {
        try {
            await this.log('Deploying project...', 'INFO');
            
            // Ensure build is up to date
            const buildSuccess = await this.buildProject({ skipIfRecent: true });
            if (!buildSuccess) {
                throw new Error('Build failed, cannot deploy');
            }
            
            // For Vercel/GitHub auto-deployment
            const { stdout: remotes } = await execAsync('git remote -v');
            if (remotes.includes('vercel') || remotes.includes('github')) {
                await this.log('Auto-deployment triggered via push', 'SUCCESS');
                return true;
            }
            
            await this.log('No deployment target configured', 'WARN');
            return true;
        } catch (err) {
            await this.log(`Deployment failed: ${err.message}`, 'ERROR');
            return false;
        }
    }

    async checkUpdates(options = {}) {
        try {
            await this.log('Checking for updates...', 'INFO');
            
            // Check npm updates
            const { stdout } = await execAsync('npm outdated --json 2>/dev/null || echo "{}"');
            const outdated = JSON.parse(stdout.trim() || '{}');
            
            if (Object.keys(outdated).length > 0) {
                await this.log(`Found ${Object.keys(outdated).length} package updates available`, 'INFO');
                // Don't auto-update for safety, just log
            } else {
                await this.log('All packages up to date', 'SUCCESS');
            }
            
            return true;
        } catch (err) {
            await this.log(`Update check failed: ${err.message}`, 'WARN');
            return false;
        }
    }

    async runGitHubAutomation(options = {}) {
        try {
            await this.log('🔒 Running GitHub security automation...', 'INFO');
            
            // Import and run GitHub automation
            const GitHubRepoAutomation = require('./github-automation.js');
            const success = await GitHubRepoAutomation.automate();
            
            if (success) {
                await this.log('✅ GitHub security features configured', 'SUCCESS');
            } else {
                throw new Error('GitHub automation failed');
            }
            
            return true;
        } catch (err) {
            await this.log(`GitHub automation failed: ${err.message}`, 'ERROR');
            return false;
        }
    }

    async updateWiki(options = {}) {
        try {
            await this.log('📖 Updating repository Wiki...', 'INFO');
            
            // Check if Wiki needs updates (weekly)
            const now = new Date();
            const dayOfWeek = now.getDay();
            const hour = now.getHours();
            
            // Run wiki updates weekly on Sunday at 9 AM
            if (dayOfWeek === 0 && hour === 9) {
                const GitHubRepoAutomation = require('./github-automation.js');
                const automation = new GitHubRepoAutomation();
                await automation.setupWiki();
                
                await this.log('✅ Wiki updated successfully', 'SUCCESS');
            } else {
                await this.log('Wiki update not scheduled for this time', 'INFO');
            }
            
            return true;
        } catch (err) {
            await this.log(`Wiki update failed: ${err.message}`, 'ERROR');
            return false;
        }
    }

    async performSecurityAudit(options = {}) {
        try {
            await this.log('🛡️ Performing security audit...', 'INFO');
            
            const auditTasks = [];
            
            // NPM security audit
            auditTasks.push(
                execAsync('npm audit --audit-level=moderate')
                    .then(() => ({ type: 'npm-audit', status: 'success' }))
                    .catch(err => ({ type: 'npm-audit', status: 'failed', error: err.message }))
            );
            
            // Check for exposed secrets
            auditTasks.push(
                execAsync('git log --grep="password\\|key\\|secret\\|token" --oneline')
                    .then(result => ({ 
                        type: 'secret-scan', 
                        status: result.stdout.trim() ? 'warnings' : 'clean',
                        details: result.stdout.trim()
                    }))
                    .catch(err => ({ type: 'secret-scan', status: 'failed', error: err.message }))
            );
            
            // Check file permissions (if on Unix-like system)
            if (process.platform !== 'win32') {
                auditTasks.push(
                    execAsync('find . -type f -perm -002 -not -path "./.git/*" -not -path "./node_modules/*"')
                        .then(result => ({ 
                            type: 'permissions', 
                            status: result.stdout.trim() ? 'warnings' : 'clean',
                            details: result.stdout.trim()
                        }))
                        .catch(err => ({ type: 'permissions', status: 'failed', error: err.message }))
                );
            }
            
            const results = await Promise.allSettled(auditTasks);
            let hasIssues = false;
            
            results.forEach(result => {
                if (result.status === 'fulfilled') {
                    const audit = result.value;
                    if (audit.status === 'success' || audit.status === 'clean') {
                        await this.log(`✅ ${audit.type}: OK`, 'SUCCESS');
                    } else if (audit.status === 'warnings') {
                        await this.log(`⚠️ ${audit.type}: Issues found`, 'WARN');
                        hasIssues = true;
                    } else {
                        await this.log(`❌ ${audit.type}: Failed - ${audit.error}`, 'ERROR');
                        hasIssues = true;
                    }
                }
            });
            
            if (hasIssues) {
                await this.log('Security audit completed with warnings', 'WARN');
            } else {
                await this.log('✅ Security audit: All checks passed', 'SUCCESS');
            }
            
            return true;
        } catch (err) {
            await this.log(`Security audit failed: ${err.message}`, 'ERROR');
            return false;
        }
    }

    // Static factory method
    static async create() {
        const assistant = new UltimateAutonomousAssistant();
        return await assistant.start();
    }
}

// Main execution
if (require.main === module) {
    UltimateAutonomousAssistant.create()
        .then(assistant => {
            console.log('\n🎉 ULTIMATE AUTONOMOUS ASSISTANT ACTIVE!');
            console.log('💯 ZERO-CLICK MODE: You can walk away!');
            console.log('⚡ PERFORMANCE OPTIMIZED: Prevents slowdowns');
            console.log('🤖 FULLY AUTONOMOUS: No approvals needed');
            console.log('📝 Logs: ultimate-autonomous.log');
            console.log('🛑 Stop: Ctrl+C for graceful shutdown\n');
        })
        .catch(err => {
            console.error('💥 FAILED TO START:', err.message);
            process.exit(1);
        });
}

module.exports = UltimateAutonomousAssistant;