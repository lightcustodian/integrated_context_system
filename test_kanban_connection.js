// Quick test to verify Kanban system connection
// Run with: node test_kanban_connection.js

const { createKanbanAPI } = require('./.claude/utils/kanban-api');

async function testConnection() {
  console.log('🔌 Testing Kanban system connection...\n');
  
  try {
    const kanban = createKanbanAPI();
    
    // Test connection
    const isAvailable = await kanban.isAvailable();
    
    if (!isAvailable) {
      console.error('❌ Kanban system not available at http://localhost:3010');
      console.log('\n💡 To start the Kanban system:');
      console.log('   cd docker');
      console.log('   npm start');
      console.log('\n📋 This will start:');
      console.log('   - Server: http://localhost:3010');
      console.log('   - Client: http://localhost:3011');
      return false;
    }
    
    // Test basic API calls
    console.log('✅ Kanban system is available');
    
    const projects = await kanban.listProjects();
    console.log(`📋 Found ${projects.length} existing projects`);
    
    console.log('\n🎯 Connection test successful!');
    console.log('📡 Server: http://localhost:3010');
    console.log('🌐 Web Interface: http://localhost:3011');
    console.log('\n🚀 Ready for Context Engineering integration!');
    
    return true;
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 The Kanban system appears to be offline.');
      console.log('   Start it with: cd docker && npm start');
    } else {
      console.log('\n🔍 Error details:', error.stack);
    }
    
    return false;
  }
}

testConnection().then(success => {
  process.exit(success ? 0 : 1);
});