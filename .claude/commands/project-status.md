# Project Status Command

## Purpose
Check the current status of a project including tasks and state.

## Usage
```
/project-status [projectId]
```

## Parameters
- **projectId** (optional): The project ID to check status for. If not provided, shows all projects.

## Implementation

```javascript
const axios = require('axios');

async function getProjectStatus(projectId = null) {
  try {
    if (projectId) {
      // Get specific project
      const projectResponse = await axios.post('http://localhost:3000/trpc/project.get', {
        json: { id: projectId }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-source': 'claude-code'
        }
      });
      
      // Get project tasks
      const tasksResponse = await axios.post('http://localhost:3000/trpc/task.listByProject', {
        json: { projectId }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-source': 'claude-code'
        }
      });
      
      const project = projectResponse.data.result.data.json;
      const tasks = tasksResponse.data.result.data.json;
      
      // Calculate task statistics
      const taskStats = {
        todo: tasks.filter(t => t.status === 'todo').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        review: tasks.filter(t => t.status === 'review').length,
        done: tasks.filter(t => t.status === 'done').length,
        total: tasks.length
      };
      
      console.log(`\nProject: ${project.name}`);
      console.log(`Status: ${project.status}`);
      console.log(`Methodology: ${project.methodology}`);
      console.log(`Current Phase: ${project.current_phase || 'N/A'}`);
      console.log(`\nTask Statistics:`);
      console.log(`  Todo: ${taskStats.todo}`);
      console.log(`  In Progress: ${taskStats.inProgress}`);
      console.log(`  Review: ${taskStats.review}`);
      console.log(`  Done: ${taskStats.done}`);
      console.log(`  Total: ${taskStats.total}`);
      console.log(`  Completion: ${Math.round((taskStats.done / taskStats.total) * 100)}%`);
      
      return { project, tasks, taskStats };
    } else {
      // Get all projects
      const response = await axios.post('http://localhost:3000/trpc/project.list', {
        json: {}
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-source': 'claude-code'
        }
      });
      
      const projects = response.data.result.data.json;
      
      console.log(`\nTotal Projects: ${projects.length}`);
      console.log('=====================================');
      
      projects.forEach(p => {
        console.log(`\n${p.name} (${p.id})`);
        console.log(`  Status: ${p.status}`);
        console.log(`  Methodology: ${p.methodology}`);
        console.log(`  Updated: ${new Date(p.updated_at).toLocaleString()}`);
      });
      
      return projects;
    }
  } catch (error) {
    console.error('Failed to get project status:', error.message);
    throw error;
  }
}
```

## Success Criteria
- Returns current project information
- Shows task distribution across columns
- Calculates completion percentage
- Lists all projects if no ID provided