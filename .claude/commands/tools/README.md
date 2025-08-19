# Claude Code Tools Directory

This directory contains utility commands and legacy commands that support the Context Engineering system. These are standalone tools that can be called directly or used by the enhanced commands.

## Available Tools

### Project Management Tools
- **project-create.md** - Create a new project in the BMAD Context Engineering system
- **project-status.md** - Check the status of a project and its tasks

### Task Management Tools  
- **task-create.md** - Create a new task in the current project
- **task-update.md** - Update properties of existing tasks

### Kanban Integration Tools
- **kanban-status.md** - Check Kanban board status and project overview
- **kanban-sync.md** - Synchronize with the Kanban board system

### System Tools
- **sync.md** - Synchronize Claude Code session with the web interface
- **document.md** - Generate comprehensive documentation for completed prototypes
- **ce-update.md** - Update the Context Engineering framework itself (for framework enhancement projects)

### Legacy Commands (Deprecated)
- **design.md** - Legacy design command (replaced by plan_enhanced.md)
- **plan.md** - Legacy plan command (replaced by plan_enhanced.md)
- **implement.md** - Legacy implement command (replaced by implement_enhanced.md)
- **optimize.md** - Legacy optimize command (replaced by optimize_enhanced.md)
- **qa.md** - Legacy QA command (replaced by qa_enhanced.md)

## Usage

These tools can be called directly from Claude Code using their command names:

```bash
# Project tools
/project-create "My Project" "Description" hybrid
/project-status project-123

# Task tools  
/task-create project-123 "New Task" "Description" todo medium claude
/task-update task-456 status=done priority=high

# Kanban tools
/kanban-status project-123
/kanban-sync project-123

# System tools
/sync project-123
```

## Integration with Enhanced Commands

The enhanced commands (plan_enhanced, implement_enhanced, optimize_enhanced, qa_enhanced) use these tools programmatically through API calls rather than calling the command files directly. This provides better error handling and integration.

## Tool Dependencies

Most tools require:
- Active Kanban system (localhost:3011)
- Project database with valid project ID
- Session state in `.claude/state/session.json`

## Error Handling

All tools include:
- Availability checks for required systems
- Graceful degradation when services are unavailable
- Clear error messages with suggested actions
- Fallback to local state when possible