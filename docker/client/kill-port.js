// Kill process on port 3011
const { exec } = require('child_process');

function killPort(port) {
  return new Promise((resolve) => {
    // For Windows, use netstat and taskkill
    if (process.platform === 'win32') {
      exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
        if (stdout) {
          const lines = stdout.split('\n');
          const pids = new Set();
          
          lines.forEach(line => {
            const parts = line.trim().split(/\s+/);
            if (parts.length >= 5 && parts[1].includes(`:${port}`)) {
              pids.add(parts[4]);
            }
          });
          
          if (pids.size > 0) {
            console.log(`Killing processes on port ${port}: ${Array.from(pids).join(', ')}`);
            pids.forEach(pid => {
              exec(`taskkill /PID ${pid} /F`, (error) => {
                if (error) console.log(`Could not kill PID ${pid}`);
              });
            });
          }
        }
        resolve();
      });
    } else {
      // For Unix/Linux/Mac
      exec(`lsof -ti :${port}`, (error, stdout) => {
        if (stdout) {
          const pids = stdout.trim().split('\n');
          console.log(`Killing processes on port ${port}: ${pids.join(', ')}`);
          pids.forEach(pid => {
            exec(`kill -9 ${pid}`, (error) => {
              if (error) console.log(`Could not kill PID ${pid}`);
            });
          });
        }
        resolve();
      });
    }
  });
}

killPort(3011).then(() => {
  console.log('Port 3011 cleanup completed');
  process.exit(0);
});