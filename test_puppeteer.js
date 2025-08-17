const puppeteer = require('puppeteer');
const axios = require('axios');

async function checkServers() {
  try {
    await axios.get('http://localhost:3010/health');
    console.log('✅ Server (port 3010) is running');
  } catch {
    console.error('❌ Server (port 3010) is not responding');
    return false;
  }
  
  try {
    await axios.get('http://localhost:3011');
    console.log('✅ Client (port 3011) is running');
  } catch {
    console.error('❌ Client (port 3011) is not responding');
    return false;
  }
  
  return true;
}

(async () => {
  console.log('🌐 Starting BMAD Context Engineering web interface test...\n');
  
  // Check if servers are running
  const serversRunning = await checkServers();
  if (!serversRunning) {
    console.log('\n💡 Please start both services:');
    console.log('   Server: cd docker/server && npm start');
    console.log('   Client: cd docker/client && npm run dev');
    process.exit(1);
  }
  
  console.log('');
  
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    console.log('Browser launched successfully');
    
    // Create new page
    const page = await browser.newPage();
    console.log('New page created');
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 720 });
    
    // Listen for console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Listen for network responses
    const apiResponses = [];
    page.on('response', response => {
      if (response.url().includes('/trpc/')) {
        apiResponses.push({
          url: response.url(),
          status: response.status(),
          statusText: response.statusText()
        });
      }
    });
    
    // Navigate to React app
    console.log('Navigating to http://localhost:3011...');
    await page.goto('http://localhost:3011', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    console.log('Successfully navigated to React app');
    
    // Wait for React app to load
    await page.waitForSelector('#root', { timeout: 10000 });
    console.log('✅ React app root element found');
    
    // Get page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Wait for app to initialize
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check for main app content
    const bodyText = await page.$eval('body', el => el.textContent.toLowerCase());
    const hasReactContent = bodyText.includes('bmad') || bodyText.includes('context') || bodyText.includes('project') || bodyText.includes('task');
    console.log(`📝 React content loaded: ${hasReactContent}`);
    
    // Look for key UI elements
    const hasProjectElements = await page.$('input, button, form, [class*="project"]') !== null;
    console.log(`🏗️  Project UI elements present: ${hasProjectElements}`);
    
    const hasKanbanElements = await page.$('[class*="kanban"], [class*="board"], [class*="column"], [class*="todo"], [class*="progress"], [class*="done"]') !== null;
    console.log(`📋 Kanban board elements present: ${hasKanbanElements}`);
    
    // Take screenshot
    const screenshotPath = 'bmad_interface_screenshot.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved to ${screenshotPath}`);
    
    // Check API responses
    console.log('\n📡 tRPC API Responses:');
    if (apiResponses.length > 0) {
      apiResponses.forEach(res => {
        console.log(`   ${res.status} ${res.statusText} - ${res.url}`);
      });
    } else {
      console.log('   No tRPC API calls detected yet');
    }
    
    // Check console errors
    if (consoleErrors.length > 0) {
      console.log('\n❌ JavaScript Console Errors:');
      consoleErrors.forEach(error => console.log(`   ${error}`));
    } else {
      console.log('\n✅ No JavaScript console errors detected');
    }
    
    // Get page metrics
    const metrics = await page.metrics();
    console.log('\n📊 Page metrics:', {
      'DOM nodes': metrics.Nodes,
      'JS heap size': Math.round(metrics.JSHeapUsedSize / 1024 / 1024) + ' MB',
      'Documents': metrics.Documents
    });
    
    // Close browser
    await browser.close();
    console.log('\nBrowser closed successfully');
    console.log('\n🎉 BMAD Context Engineering web interface test completed successfully!');
    
    if (hasReactContent && hasProjectElements) {
      console.log('\n✅ Web interface is fully functional');
      return true;
    } else {
      console.log('\n⚠️  Web interface may have loading issues');
      return false;
    }
    
  } catch (error) {
    console.error('\n❌ Error during web interface test:', error.message);
    
    if (error.message.includes('timeout')) {
      console.log('\n💡 Suggestion: Make sure both server and client are fully started');
    }
    
    process.exit(1);
  }
})();