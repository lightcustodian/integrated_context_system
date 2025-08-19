// Universal startup script for BMAD Context Engineering MVP
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting BMAD Context Engineering MVP...\n');

// Function to run a command in a specific directory
function runCommand(command, args, cwd, label) {
  return new Promise((resolve, reject) => {
    console.log(`📦 Starting ${label}...`);
    
    const process = spawn(command, args, {
      cwd: join(__dirname, cwd),
      stdio: 'inherit',
      shell: true
    });

    process.on('error', (error) => {
      console.error(`❌ Error starting ${label}:`, error);
      reject(error);
    });

    process.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ ${label} exited with code ${code}`);
        reject(new Error(`${label} failed`));
      } else {
        console.log(`✅ ${label} completed`);
        resolve();
      }
    });

    return process;
  });
}

async function startServices() {
  try {
    // Start server first
    console.log('🔧 Starting server on port 3010...');
    const serverProcess = spawn('npm', ['start'], {
      cwd: join(__dirname, 'server'),
      stdio: 'inherit',
      shell: true
    });

    // Wait a bit for server to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Start client
    console.log('🎨 Starting client on port 3011...');
    const clientProcess = spawn('npm', ['run', 'dev'], {
      cwd: join(__dirname, 'client'),
      stdio: 'inherit', 
      shell: true
    });

    console.log('\n🎉 Services starting...');
    console.log('📡 Server: http://localhost:3010');
    console.log('🌐 Client: http://localhost:3011');
    console.log('\n💡 Press Ctrl+C to stop all services\n');

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down services...');
      serverProcess.kill('SIGTERM');
      clientProcess.kill('SIGTERM');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Shutting down services...');
      serverProcess.kill('SIGTERM');
      clientProcess.kill('SIGTERM');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Failed to start services:', error);
    process.exit(1);
  }
}

startServices();