# BMAD Context Engineering MVP

A unified Context Engineering system combining BMAD (structured planning), SAGE (adaptive learning), and Archon (AI agent generation) methodologies with dual CLI and web interfaces.

## Features

- **Multi-Project Management**: Handle multiple projects with tab-based navigation
- **Kanban Board**: Visual task management with drag-and-drop functionality
- **Real-time Sync**: Live updates between CLI and web interfaces via Socket.io
- **Persistent Storage**: SQLite database for reliable data persistence
- **tRPC API**: Type-safe API communication
- **Redux State Management**: Predictable state updates in the React app
- **Claude Code Integration**: Command-line interface for AI-assisted development

## Tech Stack

- **Backend**: Node.js, Express, tRPC, Socket.io, SQLite
- **Frontend**: React, Redux Toolkit, TypeScript, Vite
- **Infrastructure**: Docker, Docker Compose
- **Communication**: tRPC for API, Socket.io for real-time updates

## Quick Start

### Option 1: Use the startup script (Windows)
```cmd
start-all.bat
```

### Option 2: Start services manually

**Terminal 1 - Server:**
```cmd
cd server
npm start
```

**Terminal 2 - Client:**
```cmd
cd client
npm run dev
```

## Access Points

- **Web Interface**: http://localhost:3011
- **API Server**: http://localhost:3010
- **Health Check**: http://localhost:3010/health

## Port Configuration

- **Server**: Port 3010 (configurable via PORT environment variable)
- **Client**: Port 3011 (configurable in vite.config.ts)

## Port Cleanup

Both services automatically kill any existing processes on their ports before starting:

- **Server**: Cleans port 3010
- **Client**: Cleans port 3011

Manual port cleanup:
```cmd
# In server directory
npm run kill-port

# In client directory  
npm run kill-port
```

### Building for Production

```bash
docker build -t bmad-context-engineering .
```

## Claude Code Commands

### Create a Project
```javascript
// From Claude Code environment
const response = await fetch('http://localhost:3000/trpc/project.create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-source': 'claude-code' },
  body: JSON.stringify({
    json: {
      name: "My Project",
      description: "Project description",
      methodology: "hybrid"
    }
  })
});
```

### Create a Task
```javascript
const response = await fetch('http://localhost:3000/trpc/task.create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-source': 'claude-code' },
  body: JSON.stringify({
    json: {
      projectId: "project-id-here",
      title: "Task title",
      description: "Task description",
      status: "todo",
      priority: "medium",
      assignedTo: "claude"
    }
  })
});
```

### Get Project Status
```javascript
const response = await fetch('http://localhost:3000/trpc/project.list', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-source': 'claude-code' },
  body: JSON.stringify({ json: {} })
});
```

## API Endpoints

### tRPC Routes

- `project.list` - List all projects
- `project.get` - Get specific project
- `project.create` - Create new project
- `project.update` - Update project
- `project.delete` - Delete project
- `task.listByProject` - List tasks for a project
- `task.create` - Create new task
- `task.update` - Update task
- `task.delete` - Delete task
- `task.reorder` - Reorder tasks in columns
- `state.get` - Get project state
- `state.update` - Update project state
- `sync.push` - Push changes from Claude Code
- `sync.pull` - Pull recent changes

## Database Schema

### Projects Table
- `id` - Unique identifier
- `name` - Project name
- `description` - Project description
- `status` - active/completed/paused
- `methodology` - bmad/sage/archon/hybrid
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Tasks Table
- `id` - Unique identifier
- `project_id` - Associated project
- `title` - Task title
- `description` - Task description
- `status` - todo/in-progress/review/done
- `priority` - low/medium/high
- `assigned_to` - human/claude/automated
- `column_order` - Position in column
- `estimated_hours` - Estimated time
- `actual_hours` - Actual time spent

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 [PID]
```

### Database Issues
```bash
# Reset database
rm docker/data/bmad.db
docker-compose restart
```

### Container Not Starting
```bash
# Check logs
docker-compose logs -f

# Rebuild container
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Moving to Parent Directory

When ready to move the Docker setup to serve multiple projects:

1. Move the docker directory up one level:
```bash
mv docker ../
```

2. Update the volume mount in docker-compose.yml:
```yaml
volumes:
  - ../:/workspace:rw  # Already configured for parent directory
```

3. Restart the container:
```bash
cd ../docker
docker-compose restart
```

## License

MIT