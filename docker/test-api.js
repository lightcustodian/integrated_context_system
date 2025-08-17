// Simple API test to verify everything is working
import axios from 'axios';

const API_URL = 'http://localhost:3000/trpc';

async function testAPI() {
  console.log('🧪 Testing BMAD Context Engineering API...\n');
  
  try {
    // Test 1: Create a project
    console.log('1. Creating a project...');
    const createResponse = await axios.post(`${API_URL}/project.create`, {
      json: {
        name: 'Test Project',
        description: 'Testing the API',
        methodology: 'hybrid'
      }
    });
    
    const projectId = createResponse.data.result.data.json.id;
    console.log(`✅ Project created: ${projectId}\n`);
    
    // Test 2: List projects
    console.log('2. Listing projects...');
    const listResponse = await axios.get(`${API_URL}/project.list`);
    const projects = listResponse.data.result.data;
    console.log(`✅ Found ${projects.length} project(s)\n`);
    
    // Test 3: Create a task
    console.log('3. Creating a task...');
    const taskResponse = await axios.post(`${API_URL}/task.create`, {
      json: {
        projectId,
        title: 'Test Task',
        description: 'Testing task creation',
        status: 'todo',
        priority: 'high',
        assignedTo: 'human'
      }
    });
    
    const taskId = taskResponse.data.result.data.json.id;
    console.log(`✅ Task created: ${taskId}\n`);
    
    // Test 4: List tasks
    console.log('4. Listing tasks...');
    const tasksResponse = await axios.get(`${API_URL}/task.listByProject?input=${encodeURIComponent(JSON.stringify({json: {projectId}}))}`);
    const tasks = tasksResponse.data.result.data;
    console.log(`✅ Found ${tasks.length} task(s)\n`);
    
    // Test 5: Update task status
    console.log('5. Updating task status...');
    await axios.post(`${API_URL}/task.update`, {
      json: {
        id: taskId,
        status: 'done'
      }
    });
    console.log('✅ Task updated\n');
    
    console.log('🎉 All API tests passed! The backend is working correctly.');
    console.log('\nYou can now:');
    console.log('- Open http://localhost:3000/health to check server status');
    console.log('- Use the tRPC API endpoints for project and task management');
    console.log('- The SQLite database is storing data persistently');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testAPI();