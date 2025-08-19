# Task Create Command

## Purpose
Create a new task in the current project via the API.

## Usage
```
/task-create [projectId] "Task Title" "Description" [status] [priority] [assignedTo]
```

## Parameters
- **projectId** (required): The project ID to add the task to
- **title** (required): The task title
- **description** (optional): Task description
- **status** (optional): One of 'todo', 'in-progress', 'review', 'done' (default: 'todo')
- **priority** (optional): One of 'low', 'medium', 'high' (default: 'medium')
- **assignedTo** (optional): One of 'human', 'claude', 'automated' (default: 'human')

## Implementation

```javascript
const { createKanbanAPI } = require('../utils/kanban-api');

async function createTask(projectId, title, description = '', status = 'todo', priority = 'medium', assignedTo = 'claude') {
  try {
    const kanban = createKanbanAPI();
    
    // Check if Kanban system is available
    if (!(await kanban.isAvailable())) {
      console.warn('Kanban system not available, task created in local state only');
      return null;
    }
    
    const task = await kanban.createTask(projectId, title, description, {
      status,
      priority,
      assignedTo,
      command: 'task-create'
    });
    
    console.log(`✅ Task "${title}" created successfully`);
    console.log(`📋 Task ID: ${task.id}`);
    console.log(`📍 Status: ${status}`);
    console.log(`🌐 View at: http://localhost:3011`);
    
    return task;
  } catch (error) {
    console.error('❌ Failed to create task:', error.message);
    throw error;
  }
}
```

## Success Criteria
- Task is created in the database
- Task appears in the correct column on the Kanban board
- Socket.io broadcasts the creation event
- Returns the new task ID