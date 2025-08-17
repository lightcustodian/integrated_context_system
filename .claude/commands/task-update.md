# Task Update Command

## Purpose
Update task properties in the Kanban system via the API.

## Usage
```
/task-update <task-id> [property=value] [property=value] ...
```

## Parameters
- **task-id** (required): The task ID to update
- **status** (optional): One of 'todo', 'in-progress', 'review', 'done'
- **priority** (optional): One of 'low', 'medium', 'high'
- **title** (optional): Updated task title
- **description** (optional): Updated task description
- **assignedTo** (optional): One of 'human', 'claude', 'automated'
- **actualHours** (optional): Time spent on task (number)

## Examples
```
/task-update abc123 status=done actualHours=3
/task-update xyz789 priority=high assignedTo=claude
/task-update def456 title="Updated Task Title" status=in-progress
```

## Implementation

```javascript
const { createKanbanAPI } = require('../utils/kanban-api');

async function updateTask(taskId, ...updates) {
  try {
    const kanban = createKanbanAPI();
    
    // Check if Kanban system is available
    if (!(await kanban.isAvailable())) {
      console.error('❌ Kanban system not available at http://localhost:3010');
      console.log('💡 Start the Kanban system: cd docker && npm start');
      return false;
    }
    
    // Parse update parameters
    const updateData = {};
    for (const update of updates) {
      const [key, value] = update.split('=');
      if (key && value !== undefined) {
        // Handle different data types
        if (key === 'actualHours' || key === 'estimatedHours') {
          updateData[key] = parseFloat(value);
        } else if (key === 'assignedTo') {
          updateData.assigned_to = value; // Map to database column name
        } else {
          updateData[key] = value.replace(/^["']|["']$/g, ''); // Remove quotes
        }
      }
    }
    
    if (Object.keys(updateData).length === 0) {
      console.error('❌ No valid updates provided');
      console.log('💡 Usage: /task-update <task-id> property=value [property=value] ...');
      console.log('💡 Properties: status, priority, title, description, assignedTo, actualHours');
      return false;
    }
    
    // Validate status values
    if (updateData.status && !['todo', 'in-progress', 'review', 'done'].includes(updateData.status)) {
      console.error('❌ Invalid status. Use: todo, in-progress, review, done');
      return false;
    }
    
    // Validate priority values
    if (updateData.priority && !['low', 'medium', 'high'].includes(updateData.priority)) {
      console.error('❌ Invalid priority. Use: low, medium, high');
      return false;
    }
    
    // Validate assignedTo values
    if (updateData.assigned_to && !['human', 'claude', 'automated'].includes(updateData.assigned_to)) {
      console.error('❌ Invalid assignedTo. Use: human, claude, automated');
      return false;
    }
    
    const updatedTask = await kanban.updateTask(taskId, updateData);
    
    console.log(`✅ Task updated successfully`);
    console.log(`📋 Task ID: ${taskId}`);
    
    // Show what was updated
    Object.entries(updateData).forEach(([key, value]) => {
      const emoji = {
        'status': '📍',
        'priority': '🎯',
        'title': '📝',
        'description': '📄',
        'assigned_to': '👤',
        'actualHours': '⏱️'
      }[key] || '🔧';
      
      console.log(`${emoji} ${key}: ${value}`);
    });
    
    console.log(`🌐 View at: http://localhost:3011`);
    
    // If moving to done, log completion
    if (updateData.status === 'done') {
      console.log(`🎉 Task marked as complete!`);
      
      // Update session state if this was the current task
      const sessionPath = '.claude/state/session.json';
      try {
        const sessionData = await kanban.syncWithSession(sessionPath);
        if (sessionData?.current_task_id === taskId) {
          await kanban.updateSession(sessionPath, {
            current_task_id: null,
            last_completed_task: taskId,
            last_completion_time: new Date().toISOString()
          });
        }
      } catch (error) {
        // Session update is optional
        console.warn('Could not update session state');
      }
    }
    
    return updatedTask;
    
  } catch (error) {
    console.error('❌ Failed to update task:', error.message);
    throw error;
  }
}
```

## Success Criteria
- Task is updated in the database
- Changes appear immediately in the web interface
- Socket.io broadcasts the update event
- Transaction is logged for recovery