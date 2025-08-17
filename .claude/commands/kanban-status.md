# Kanban Status Command

## Purpose
Display current status of projects and tasks in the Kanban system

## Usage
```
/kanban-status [project-id]
```

## Parameters
- **project-id** (optional): Specific project ID to check. If not provided, shows all projects or current session project.

## Implementation

```javascript
const { createKanbanAPI } = require('../utils/kanban-api');

async function kanbanStatus(projectId = null) {
  try {
    const kanban = createKanbanAPI();
    
    // Check if Kanban system is available
    if (!(await kanban.isAvailable())) {
      console.error('❌ Kanban system not available at http://localhost:3010');
      console.log('💡 Start the Kanban system: cd docker && npm start');
      return false;
    }
    
    if (projectId) {
      // Show status for specific project
      return await showProjectStatus(kanban, projectId);
    } else {
      // Show status for all projects or current session project
      const sessionPath = '.claude/state/session.json';
      const sessionData = await kanban.syncWithSession(sessionPath);
      
      if (sessionData?.current_project_id) {
        console.log('📋 Current Session Project Status:');
        console.log('─'.repeat(50));
        return await showProjectStatus(kanban, sessionData.current_project_id);
      } else {
        console.log('📋 All Projects Status:');
        console.log('─'.repeat(50));
        return await showAllProjectsStatus(kanban);
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to get Kanban status:', error.message);
    throw error;
  }
}

async function showProjectStatus(kanban, projectId) {
  const project = await kanban.getProject(projectId);
  const tasks = await kanban.getProjectTasks(projectId);
  const projectState = await kanban.getProjectState(projectId);
  
  console.log(`🏗️  Project: ${project.name}`);
  console.log(`📋 ID: ${project.id}`);
  console.log(`📅 Created: ${new Date(project.created_at).toLocaleDateString()}`);
  console.log(`🔄 Status: ${project.status || 'active'}`);
  console.log(`⚙️  Methodology: ${project.methodology}`);
  console.log(`📍 Phase: ${projectState?.current_phase || 'Not set'}`);
  console.log();
  
  if (tasks.length === 0) {
    console.log('📝 No tasks created yet');
    return { project, tasks: [], projectState };
  }
  
  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter(t => t.status === 'todo'),
    'in-progress': tasks.filter(t => t.status === 'in-progress'),
    review: tasks.filter(t => t.status === 'review'),
    done: tasks.filter(t => t.status === 'done')
  };
  
  // Calculate progress
  const totalTasks = tasks.length;
  const completedTasks = tasksByStatus.done.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  console.log(`📊 Progress: ${completedTasks}/${totalTasks} tasks (${progressPercent}%)`);
  console.log();
  
  // Display tasks by column
  Object.entries(tasksByStatus).forEach(([status, statusTasks]) => {
    const emoji = {
      'todo': '📝',
      'in-progress': '⚡',
      'review': '👀',
      'done': '✅'
    }[status] || '📄';
    
    console.log(`${emoji} ${status.toUpperCase()} (${statusTasks.length})`);
    
    if (statusTasks.length > 0) {
      statusTasks.slice(0, 5).forEach(task => { // Show first 5 tasks
        const priority = {
          'high': '🔴',
          'medium': '🟡',
          'low': '🟢'
        }[task.priority] || '⚪';
        
        const assignee = {
          'claude': '🤖',
          'human': '👤',
          'automated': '⚙️'
        }[task.assigned_to] || '❓';
        
        console.log(`   ${priority} ${assignee} ${task.title}`);
      });
      
      if (statusTasks.length > 5) {
        console.log(`   ... and ${statusTasks.length - 5} more`);
      }
    }
    console.log();
  });
  
  // Show estimated vs actual time if available
  const estimatedHours = tasks.reduce((sum, task) => sum + (task.estimated_hours || 0), 0);
  const actualHours = tasks.reduce((sum, task) => sum + (task.actual_hours || 0), 0);
  
  if (estimatedHours > 0 || actualHours > 0) {
    console.log(`⏱️  Time: ${actualHours}h actual / ${estimatedHours}h estimated`);
    console.log();
  }
  
  console.log(`🌐 View at: http://localhost:3011`);
  
  return { project, tasks, projectState, tasksByStatus, progressPercent };
}

async function showAllProjectsStatus(kanban) {
  const projects = await kanban.listProjects();
  
  if (projects.length === 0) {
    console.log('📝 No projects created yet');
    console.log('💡 Create a project: /project-create "Project Name"');
    return { projects: [] };
  }
  
  console.log(`📊 Total Projects: ${projects.length}`);
  console.log();
  
  for (const project of projects) {
    const tasks = await kanban.getProjectTasks(project.id);
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const progressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
    
    console.log(`🏗️  ${project.name}`);
    console.log(`   📋 ${project.id}`);
    console.log(`   📊 ${completedTasks}/${tasks.length} tasks (${progressPercent}%)`);
    console.log(`   🔄 ${project.status || 'active'}`);
    console.log();
  }
  
  console.log(`🌐 View all at: http://localhost:3011`);
  
  return { projects };
}
```

## Success Criteria
- Successfully connects to Kanban system
- Displays comprehensive project status information
- Shows task breakdown by status with visual indicators
- Calculates and displays progress metrics
- Handles both single project and all projects views
- Provides actionable next steps if no data exists