# Project Create Command

## Purpose
Create a new project in the BMAD Context Engineering system via the API.

## Usage
```
/project-create "Project Name" "Description" [methodology]
```

## Parameters
- **name** (required): The project name
- **description** (optional): Project description
- **methodology** (optional): One of 'bmad', 'sage', 'archon', 'hybrid' (default: 'hybrid')

## Implementation

```javascript
const { createKanbanAPI } = require('../utils/kanban-api');
const fs = require('fs').promises;

// Unified function to update all project state locations in session.json
async function updateUnifiedProjectState(sessionPath, project, projectName, wasCreated) {
  try {
    let sessionData = {};
    try {
      sessionData = JSON.parse(await fs.readFile(sessionPath, 'utf8'));
    } catch {
      // File doesn't exist, start with empty object
    }

    // SINGLE SOURCE OF TRUTH: Overwrite ALL project-related fields
    const timestamp = new Date().toISOString();
    
    // Update all project identification fields
    sessionData.project_name = projectName;
    sessionData.current_project_id = project.id;
    sessionData.current_project_name = projectName;
    
    // Update Kanban integration fields (centralized)
    sessionData.kanban_integration = {
      ...sessionData.kanban_integration,
      current_project_id: project.id,
      current_project_name: projectName,
      current_task_id: null, // Reset task context when switching projects
      kanban_sync: {
        last_sync: timestamp,
        project_created: wasCreated,
        task_count: sessionData.kanban_integration?.kanban_sync?.task_count || 0,
        completed_tasks: sessionData.kanban_integration?.kanban_sync?.completed_tasks || 0
      },
      active_tasks: sessionData.kanban_integration?.active_tasks || [],
      last_completed_task: sessionData.kanban_integration?.last_completed_task || null,
      last_completion_time: sessionData.kanban_integration?.last_completion_time || null
    };
    
    // Update top-level Kanban sync for backwards compatibility
    sessionData.kanban_sync = {
      last_sync: timestamp,
      project_created: wasCreated
    };

    await fs.writeFile(sessionPath, JSON.stringify(sessionData, null, 2));
    console.log(`📝 Session state updated with project: ${projectName} (${project.id})`);
    
    return sessionData;
  } catch (error) {
    console.error('❌ Failed to update session state:', error.message);
    throw error;
  }
}

async function createProject(name, description = '', methodology = 'hybrid') {
  try {
    const kanban = createKanbanAPI();
    
    // Check if Kanban system is available
    if (!(await kanban.isAvailable())) {
      console.warn('Kanban system not available, project created in local state only');
      return null;
    }
    
    // Check if project already exists by name
    console.log(`🔍 Checking for existing project: "${name}"`);
    const existingProjects = await kanban.listProjects();
    let project = existingProjects.find(p => p.name === name);
    
    if (project) {
      console.log(`📋 Found existing project: "${name}"`);
      console.log(`📋 Project ID: ${project.id}`);
      console.log(`🔄 Reusing existing project`);
      
        // Update session state with unified project information
      const sessionPath = '.claude/state/session.json';
      await updateUnifiedProjectState(sessionPath, project, name, false);
      
      console.log(`🌐 View at: http://localhost:3011`);
      return project;
    }
    
    // Create new project if it doesn't exist
    console.log(`➕ Creating new project: "${name}"`);
    project = await kanban.createProject(name, description, methodology);
    
    console.log(`✅ Project "${name}" created successfully`);
    console.log(`📋 Project ID: ${project.id}`);
    console.log(`🌐 View at: http://localhost:3011`);
    
    // Update session state with unified project information
    const sessionPath = '.claude/state/session.json';
    await updateUnifiedProjectState(sessionPath, project, name, !project.existed);
    
    return project;
  } catch (error) {
    console.error('❌ Failed to create/find project:', error.message);
    throw error;
  }
}
```

## Success Criteria
- If project doesn't exist: Project is created in the database
- If project exists: Existing project is reused
- Project appears in the web interface
- Session state is updated with current project
- Socket.io broadcasts events (if new project created)
- Returns the project object (new or existing)