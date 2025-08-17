// Integration test for BMAD Context Engineering MVP
// Run with: node test-integration.js

const axios = require('axios');

const API_URL = 'http://localhost:3003/trpc';
const headers = {
  'Content-Type': 'application/json',
  'x-source': 'test-client'
};

async function runTests() {
  console.log('🧪 Running integration tests...\n');
  
  let projectId;
  let taskId;
  
  try {
    // Test 1: Create a project
    console.log('Test 1: Creating a project...');
    const createProjectResponse = await axios.post(`${API_URL}/project.create`, {
      name: 'Test Project',
      description: 'Integration test project',
      methodology: 'hybrid'
    }, { headers });
    
    projectId = createProjectResponse.data.result.data.id;
    console.log(`✅ Project created with ID: ${projectId}\n`);
    
    // Test 2: List projects
    console.log('Test 2: Listing projects...');
    const listProjectsResponse = await axios.get(`${API_URL}/project.list`, { headers });
    
    const projects = listProjectsResponse.data.result.data;
    console.log(`✅ Found ${projects.length} project(s)\n`);
    
    // Test 3: Create a task
    console.log('Test 3: Creating a task...');
    const createTaskResponse = await axios.post(`${API_URL}/task.create`, {
      projectId,
      title: 'Test Task',
      description: 'Integration test task',
      status: 'todo',
      priority: 'high',
      assignedTo: 'claude'
    }, { headers });
    
    taskId = createTaskResponse.data.result.data.id;
    console.log(`✅ Task created with ID: ${taskId}\n`);
    
    // Test 4: List tasks
    console.log('Test 4: Listing tasks...');
    const listTasksResponse = await axios.get(`${API_URL}/task.listByProject?input=${encodeURIComponent(JSON.stringify({projectId}))}`, { headers });
    
    const tasks = listTasksResponse.data.result.data;
    console.log(`✅ Found ${tasks.length} task(s)\n`);
    
    // Test 5: Update task status
    console.log('Test 5: Updating task status...');
    await axios.post(`${API_URL}/task.update`, {
      id: taskId,
      status: 'in-progress'
    }, { headers });
    
    console.log('✅ Task status updated\n');
    
    // Test 6: Update project state
    console.log('Test 6: Updating project state...');
    await axios.post(`${API_URL}/state.update`, {
      projectId,
      currentPhase: 'testing',
      context: { test: true }
    }, { headers });
    
    console.log('✅ Project state updated\n');
    
    // Test 7: Sync operation
    console.log('Test 7: Testing sync...');
    await axios.post(`${API_URL}/sync.push`, {
      command: 'test',
      data: { test: 'integration' },
      timestamp: new Date().toISOString()
    }, { headers });
    
    console.log('✅ Sync push successful\n');
    
    // Test 8: Pull recent changes
    console.log('Test 8: Pulling recent changes...');
    const pullResponse = await axios.get(`${API_URL}/sync.pull?input=${encodeURIComponent(JSON.stringify({since: new Date(Date.now() - 60000).toISOString()}))}`, { headers });
    
    const changes = pullResponse.data.result.data;
    console.log(`✅ Pulled ${changes.length} recent changes\n`);
    
    // Cleanup: Delete test data
    console.log('Cleanup: Deleting test data...');
    await axios.post(`${API_URL}/task.delete`, {
      id: taskId
    }, { headers });
    
    await axios.post(`${API_URL}/project.delete`, {
      id: projectId
    }, { headers });
    
    console.log('✅ Test data cleaned up\n');
    
    console.log('🎉 All tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    process.exit(1);
  }
}

// Check if server is running
async function checkServer() {
  try {
    await axios.get('http://localhost:3003/health');
    return true;
  } catch {
    return false;
  }
}

// Main execution
(async () => {
  console.log('Checking if server is running...');
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error('❌ Server is not running. Please start it with: cd docker/server && npm start');
    process.exit(1);
  }
  
  console.log('✅ Server is running\n');
  await runTests();
})();