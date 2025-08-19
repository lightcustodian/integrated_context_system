# Sync Command

## Purpose
Synchronize Claude Code session with the web interface and pull recent changes.

## Usage
```
/sync [projectId]
```

## Parameters
- **projectId** (optional): Specific project to sync. If not provided, syncs all projects.

## Implementation

```javascript
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function syncWithServer(projectId = null) {
  try {
    // Get recent changes from server
    const changesResponse = await axios.post('http://localhost:3000/trpc/sync.pull', {
      json: {
        projectId,
        since: await getLastSyncTime()
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-source': 'claude-code'
      }
    });
    
    const changes = changesResponse.data.result.data.json;
    
    console.log(`\nReceived ${changes.length} changes from server`);
    
    // Process changes
    for (const change of changes) {
      console.log(`  ${change.timestamp}: ${change.operation} ${change.entity_type} ${change.entity_id}`);
    }
    
    // Update local session state
    const sessionPath = path.join('.claude', 'state', 'session.json');
    const session = JSON.parse(await fs.readFile(sessionPath, 'utf8'));
    
    session.last_sync = new Date().toISOString();
    session.sync_count = (session.sync_count || 0) + 1;
    session.last_changes = changes.length;
    
    await fs.writeFile(sessionPath, JSON.stringify(session, null, 2));
    
    // Push current session state to server
    await axios.post('http://localhost:3000/trpc/sync.push', {
      json: {
        command: 'sync',
        data: {
          session_id: session.session_id,
          current_command: session.current_command,
          current_project: projectId,
          timestamp: new Date().toISOString()
        },
        timestamp: new Date().toISOString()
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-source': 'claude-code'
      }
    });
    
    console.log('Sync completed successfully');
    
    return changes;
  } catch (error) {
    console.error('Failed to sync with server:', error.message);
    throw error;
  }
}

async function getLastSyncTime() {
  try {
    const sessionPath = path.join('.claude', 'state', 'session.json');
    const session = JSON.parse(await fs.readFile(sessionPath, 'utf8'));
    return session.last_sync || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // Default to 24 hours ago
  } catch {
    return new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  }
}
```

## Success Criteria
- Retrieves recent changes from server
- Updates local session state
- Pushes Claude Code state to server
- Maintains bidirectional synchronization