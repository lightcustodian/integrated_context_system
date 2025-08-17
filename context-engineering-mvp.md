# BMAD Context Engineering System MVP - Implementation Plan

## Project Overview

You are implementing the **MVP (Minimum Viable Product)** for a unified Context Engineering system that combines methodologies from BMAD (structured planning), SAGE (adaptive learning), and Archon (AI agent generation) into a single, cohesive development environment.

### System Vision
The complete system will provide:
- **Unified Methodology**: Integration of BMAD planning workflows, SAGE self-assessment loops, and Archon agent generation
- **Dual Interface**: Claude Code command-line interface + Docker-based web Kanban board
- **Persistent State**: IndexedDB-based project and task management with real-time updates
- **Agent Orchestration**: Simplified but powerful AI agent coordination

### MVP Scope
This MVP focuses on **core infrastructure and basic functionality**:
- Docker web interface with Kanban board and project tabs
- HTTP API for Claude Code ↔ web interface communication
- IndexedDB persistence for projects, tasks, and state
- Basic Claude Code command integration
- Essential MCP server connections
- Simple project management workflow

## Current System Analysis

### Existing Assets to Preserve
- **`.claude/commands/`** - Command structure (keep and extend)
- **`.claude/mcp/`** - MCP integration framework (simplify but preserve)
- **`.claude/state/session.json`** - Local session state (keep for Claude Code operations)
- **`project_manager.md`** - Simple coordination model (basis for MVP)
- **`core_mcp.md`** - Tool coordination (modify for MVP needs)

### Existing Assets to Replace/Remove
- **`core_orchestrator.md`** - Complex orchestration (too complex for MVP)
- **Multiple validation agents** - Redundant complexity
- **Complex planning templates** - Simplify for MVP
- **Overlapping specialist agents** - Consolidate functionality

### Target Directory Structure
```
project_root/
├── .claude/
│   ├── commands/           # Claude Code commands (existing + new)
│   ├── mcp/               # MCP integration (simplified)
│   ├── state/             # Local session state
│   │   └── session.json   # Claude Code operational state
│   └── agents/            # Simplified agent definitions
├── docker/                # NEW - Docker web interface
│   ├── src/               # React application
│   ├── server/            # Express.js API server
│   ├── Dockerfile         # Container definition
│   └── docker-compose.yml # Development setup
└── docs/                  # Documentation and planning
```

## Technical Architecture

### Communication Flow
```
┌─────────────────┐    HTTP API    ┌──────────────────────┐
│   Claude Code   │ ───────────────▶│  Docker Container    │
│                 │                 │                      │
│ Commands:       │                 │ ┌─────────────────┐  │
│ ├─/project      │                 │ │  React Web App  │  │
│ ├─/task         │                 │ │  - Kanban Board │  │
│ ├─/implement    │                 │ │  - Project Tabs │  │
│ └─/status       │                 │ │  - Task Manager │  │
│                 │                 │ └─────────────────┘  │
│ Local State:    │                 │ ┌─────────────────┐  │
│ └─session.json  │                 │ │  Express Server │  │
└─────────────────┘                 │ │  - REST API     │  │
                                    │ │  - IndexedDB    │  │
                                    │ └─────────────────┘  │
                                    └──────────────────────┘
```

### Data Architecture
**IndexedDB Schema:**
```javascript
{
  projects: {
    id: string,
    name: string,
    description: string,
    status: 'active' | 'completed' | 'paused',
    created: timestamp,
    updated: timestamp,
    metadata: object
  },
  tasks: {
    id: string,
    projectId: string,
    title: string,
    description: string,
    status: 'todo' | 'in-progress' | 'review' | 'done',
    priority: 'low' | 'medium' | 'high',
    assignedTo: 'human' | 'claude' | 'automated',
    created: timestamp,
    updated: timestamp,
    estimatedHours: number,
    actualHours: number
  },
  state: {
    projectId: string,
    currentPhase: string,
    context: object,
    history: array,
    lastClaudeCodeSync: timestamp
  }
}
```

### API Endpoints
```javascript
// Project Management
GET    /api/projects              // List all projects
POST   /api/projects              // Create new project
GET    /api/projects/:id          // Get project details
PUT    /api/projects/:id          // Update project
DELETE /api/projects/:id          // Delete project

// Task Management
GET    /api/projects/:id/tasks    // Get project tasks
POST   /api/projects/:id/tasks    // Create task
PUT    /api/tasks/:id             // Update task
DELETE /api/tasks/:id             // Delete task

// State Management
GET    /api/projects/:id/state    // Get project state
PUT    /api/projects/:id/state    // Update project state

// Claude Code Integration
POST   /api/claude/sync           // Sync Claude Code session
POST   /api/claude/command        // Execute command and update state
```

## Implementation Plan

### Phase 1: Docker Infrastructure (Priority 1)
**Deliverables:**
- Docker container with Express.js server
- Basic React application with routing
- IndexedDB integration and schema setup
- REST API endpoints for projects and tasks
- Basic Kanban board interface
- Project tabs functionality

**Files to Create:**
```
docker/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server/
│   ├── index.js              # Express server setup
│   ├── routes/
│   │   ├── projects.js       # Project API routes
│   │   ├── tasks.js          # Task API routes
│   │   └── state.js          # State API routes
│   └── middleware/
│       └── cors.js           # CORS configuration
└── src/
    ├── App.js                # Main React application
    ├── components/
    │   ├── ProjectTabs.js    # Project tab navigation
    │   ├── KanbanBoard.js    # Kanban board component
    │   ├── TaskCard.js       # Individual task cards
    │   └── ProjectForm.js    # Project creation form
    ├── services/
    │   ├── api.js            # API communication layer
    │   └── indexeddb.js      # IndexedDB operations
    └── styles/
        └── main.css          # Basic styling
```

### Phase 2: Claude Code Integration (Priority 2)
**Deliverables:**
- Updated `.claude/commands/` with new commands
- HTTP client for API communication
- Session state synchronization
- Basic MCP integration cleanup

**Commands to Create:**
```
.claude/commands/
├── project-create.md         # Create new project
├── project-status.md         # Check project status
├── task-create.md            # Create new task
├── task-update.md            # Update task status
├── implement.md              # Execute implementation workflow
└── sync.md                   # Sync with web interface
```

**Files to Modify:**
```
.claude/
├── mcp/
│   ├── mcp_index.json        # Do not modify this file unless you are going to add MCP servers to it
│   └── runtime-mcp-registry.json  # Update for MVP needs
├── agents/
│   ├── project_manager.md    # Simplify for MVP coordination
│   └── core_mcp.md           # Update for simplified MCP integration
└── state/
    └── session.json          # Extend schema for web sync
```

### Phase 3: Basic Workflow Integration (Priority 3)
**Deliverables:**
- End-to-end project creation workflow
- Task management and status updates
- Real-time web interface updates
- Basic error handling and recovery

**Integration Points:**
- Claude Code creates project → Web interface shows new project tab
- Claude Code creates tasks → Tasks appear on Kanban board
- Web interface task updates → Available to Claude Code via API
- Session state synchronization between command line and web

## Specific Implementation Instructions

### 1. Docker Container Setup
```bash
# Development command
docker-compose up -d

# Production build
docker build -t bmad-context-engineering .
docker run -p 3000:3000 -v $(pwd):/workspace bmad-context-engineering
```

### 2. API Integration Pattern
```javascript
// Claude Code HTTP client pattern
const projectApi = {
  async createProject(name, description) {
    const response = await fetch('http://localhost:3000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description })
    });
    return response.json();
  },
  
  async updateTaskStatus(taskId, status) {
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json();
  }
};
```

### 3. IndexedDB Operations
```javascript
// Web interface IndexedDB pattern
class ProjectDatabase {
  async createProject(project) {
    const db = await this.openDB();
    const transaction = db.transaction(['projects'], 'readwrite');
    const store = transaction.objectStore('projects');
    const result = await store.add({
      ...project,
      id: generateId(),
      created: Date.now(),
      updated: Date.now()
    });
    return result;
  }
  
  async updateTaskStatus(taskId, status) {
    const db = await this.openDB();
    const transaction = db.transaction(['tasks'], 'readwrite');
    const store = transaction.objectStore('tasks');
    const task = await store.get(taskId);
    task.status = status;
    task.updated = Date.now();
    await store.put(task);
    return task;
  }
}
```

## Success Criteria

### MVP Completion Checklist
- [ ] Docker container runs successfully on `localhost:3000`
- [ ] Web interface displays project tabs and Kanban board
- [ ] Claude Code can create projects via API calls
- [ ] Claude Code can create and update tasks
- [ ] Web interface shows real-time updates from Claude Code
- [ ] IndexedDB persists data across browser sessions
- [ ] Basic error handling for API failures
- [ ] Essential MCP servers (filesystem, git) integrate properly

### Testing Requirements
- [ ] API endpoints return expected JSON responses
- [ ] IndexedDB schema handles all required operations
- [ ] Web interface loads without JavaScript errors
- [ ] Claude Code commands execute without failures
- [ ] Cross-browser compatibility (Chrome, Firefox, Safari)
- [ ] Docker container builds and runs on clean system

## Future Enhancement Path

### Post-MVP Development Phases
1. **Enhanced Methodology Integration**: Add BMAD planning workflows, SAGE learning loops
2. **Advanced Agent System**: Implement sophisticated agent orchestration
3. **Extended MCP Ecosystem**: Integrate additional MCP servers for research, testing, deployment
4. **Analytics and Learning**: Add project analytics, success pattern recognition
5. **Collaboration Features**: Multi-user support, team project management
6. **Advanced UI**: Rich text editing, drag-and-drop, advanced filtering

### Architecture Evolution
The MVP provides the foundation for these enhancements:
- **Modular Design**: Easy to add new agent types and workflows
- **API-First**: Simple to extend endpoints for new functionality
- **State Management**: Scalable to complex project state requirements
- **Component Architecture**: React components can be enhanced incrementally

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- Claude Code environment with MCP support

### Development Setup
1. **Clone/Setup Project Structure**: Create the directory structure outlined above
2. **Initialize Docker Environment**: Set up Docker container with Express + React
3. **Implement Core API**: Create basic CRUD operations for projects and tasks
4. **Build Web Interface**: Implement Kanban board with project tabs
5. **Integrate Claude Code**: Create commands that call the API endpoints
6. **Test Integration**: Verify end-to-end workflow from command line to web interface

### First Use Case
**Goal**: Create a project using Claude Code and see it appear in the web interface
1. Start Docker container: `docker-compose up`
2. Execute Claude Code command: `/project-create "Test Project" "First MVP test"`
3. Open browser to `localhost:3000`
4. Verify new project tab appears with empty Kanban board
5. Create a task via Claude Code: `/task-create "Implement feature X"`
6. Verify task appears in "Todo" column of Kanban board

This MVP provides immediate value while establishing the foundation for the complete BMAD Context Engineering system. Focus on solid core functionality that can be incrementally enhanced rather than trying to implement all features at once.