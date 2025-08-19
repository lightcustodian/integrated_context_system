# Kanban Sync Command

## Purpose
Manually synchronize current Context Engineering session with the Kanban board

## Usage
```
/kanban-sync [project-id]
```

## Parameters
- **project-id** (optional): Specific project ID to sync with. If not provided, uses current session project.

## Implementation

```javascript
const { createKanbanAPI } = require('../utils/kanban-api');

async function kanbanSync(projectId = null) {
  try {
    const kanban = createKanbanAPI();
    
    // Check if Kanban system is available
    if (!(await kanban.isAvailable())) {
      console.error('❌ Kanban system not available at http://localhost:3010');
      console.log('💡 Start the Kanban system: cd docker && npm start');
      return false;
    }
    
    const sessionPath = '.claude/state/session.json';
    
    // Sync with session file
    const sessionData = await kanban.syncWithSession(sessionPath);
    
    if (!projectId && sessionData?.current_project_id) {
      projectId = sessionData.current_project_id;
    }
    
    if (!projectId) {
      console.error('❌ No project ID specified and no current project in session');
      console.log('💡 Create a project first: /project-create "Project Name"');
      return false;
    }
    
    // Get project and tasks from Kanban
    const project = await kanban.getProject(projectId);
    const tasks = await kanban.getProjectTasks(projectId);
    const projectState = await kanban.getProjectState(projectId);
    
    console.log(`✅ Synchronized with Kanban project: ${project.name}`);
    console.log(`📋 Project ID: ${project.id}`);
    console.log(`📍 Current Phase: ${projectState?.currentPhase || 'Not set'}`);
    console.log(`📝 Tasks: ${tasks.length} total`);
    
    // Show task breakdown by status
    const tasksByStatus = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
    
    console.log('📊 Task Breakdown:');
    Object.entries(tasksByStatus).forEach(([status, count]) => {
      const emoji = {
        'todo': '📝',
        'in-progress': '⚡',
        'review': '👀',
        'done': '✅'
      }[status] || '📄';
      console.log(`   ${emoji} ${status}: ${count}`);
    });
    
    // Update session with latest sync
    await kanban.updateSession(sessionPath, {
      current_project_id: projectId,
      current_project_name: project.name,
      kanban_sync: {
        last_sync: new Date().toISOString(),
        task_count: tasks.length,
        completed_tasks: tasksByStatus.done || 0
      }
    });
    
    console.log(`🌐 View at: http://localhost:3011`);
    
    return {
      project,
      tasks,
      projectState,
      tasksByStatus
    };
    
  } catch (error) {
    console.error('❌ Failed to sync with Kanban:', error.message);
    throw error;
  }
}
```

## Success Criteria
- Successfully connects to Kanban system
- Retrieves project and task data
- Updates local session state with sync information
- Displays comprehensive project status
- Returns structured data for use by other commands