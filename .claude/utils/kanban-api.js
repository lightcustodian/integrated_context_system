// Kanban API Client for Context Engineering Commands
// Provides HTTP client utilities for integrating with Docker Kanban system

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class KanbanAPI {
  constructor(baseURL = 'http://localhost:3010') {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      'x-source': 'claude-code'
    };
  }

  // Helper method to make tRPC calls
  async trpcCall(endpoint, data = {}, method = 'POST') {
    try {
      let response;
      
      if (method === 'GET') {
        // For queries, use GET with query parameters
        const params = Object.keys(data).length > 0 ? 
          `?input=${encodeURIComponent(JSON.stringify(data))}` : '';
        response = await axios.get(`${this.baseURL}/trpc/${endpoint}${params}`, {
          headers: this.headers,
          timeout: 10000
        });
      } else {
        // For mutations, use POST
        response = await axios.post(`${this.baseURL}/trpc/${endpoint}`, data, {
          headers: this.headers,
          timeout: 10000
        });
      }
      
      return response.data.result?.data || response.data;
    } catch (error) {
      console.error(`Kanban API Error (${endpoint}):`, error.message);
      if (error.response?.data) {
        console.error('Response:', error.response.data);
      }
      throw error;
    }
  }

  // Health check
  async isAvailable() {
    try {
      const response = await axios.get(`${this.baseURL}/health`, { timeout: 5000 });
      return response.status === 200;
    } catch {
      return false;
    }
  }

  // Project Management
  async createProject(name, description, methodology = 'hybrid') {
    return await this.trpcCall('project.create', {
      name,
      description,
      methodology,
      metadata: {
        created_by: 'claude-code',
        context_engineering: true
      }
    });
  }

  async getProject(id) {
    return await this.trpcCall('project.get', { id }, 'GET');
  }

  async listProjects() {
    return await this.trpcCall('project.list', {}, 'GET');
  }

  async updateProject(id, updates) {
    return await this.trpcCall('project.update', { id, ...updates });
  }

  async deleteProject(id) {
    return await this.trpcCall('project.delete', { id });
  }

  // Task Management
  async createTask(projectId, title, description, options = {}) {
    const taskData = {
      projectId,
      title,
      description,
      status: options.status || 'todo',
      priority: options.priority || 'medium',
      assigned_to: options.assignedTo || 'claude',
      estimated_hours: options.estimatedHours,
      metadata: {
        created_by: 'claude-code',
        command: options.command || 'manual',
        ...options.metadata
      }
    };

    return await this.trpcCall('task.create', taskData);
  }

  async updateTask(id, updates) {
    return await this.trpcCall('task.update', { id, ...updates });
  }

  async deleteTask(id) {
    return await this.trpcCall('task.delete', { id });
  }

  async getProjectTasks(projectId) {
    return await this.trpcCall('task.listByProject', { projectId }, 'GET');
  }

  async moveTask(taskId, newStatus, newOrder = null) {
    if (newOrder !== null) {
      return await this.trpcCall('task.reorder', {
        taskId,
        newStatus,
        newOrder
      });
    } else {
      return await this.updateTask(taskId, { status: newStatus });
    }
  }

  // State Management
  async getProjectState(projectId) {
    return await this.trpcCall('state.get', { projectId }, 'GET');
  }

  async updateProjectState(projectId, currentPhase, context = {}, historyEntry = null) {
    const updateData = {
      projectId,
      currentPhase,
      context
    };

    if (historyEntry) {
      updateData.addToHistory = {
        action: historyEntry.action,
        timestamp: new Date().toISOString(),
        details: historyEntry.details || {}
      };
    }

    return await this.trpcCall('state.update', updateData);
  }

  // Sync Operations
  async pushSync(command, data) {
    return await this.trpcCall('sync.push', {
      command,
      data,
      timestamp: new Date().toISOString()
    });
  }

  async pullSync(projectId = null, since = null) {
    const params = {};
    if (projectId) params.projectId = projectId;
    if (since) params.since = since;
    
    return await this.trpcCall('sync.pull', params, 'GET');
  }

  // Helper Methods for Common Workflows
  async createImplementationTasks(projectId, features) {
    const tasks = [];
    
    for (const feature of features) {
      const task = await this.createTask(projectId, 
        `Implement ${feature.name}`,
        feature.description || `Implementation of ${feature.name}`,
        {
          priority: feature.priority || 'medium',
          estimatedHours: feature.estimatedHours,
          command: 'implement',
          metadata: { feature: feature.name, type: 'implementation' }
        }
      );
      tasks.push(task);
    }

    return tasks;
  }

  async createQATasks(projectId, testTypes = ['unit', 'integration', 'e2e']) {
    const tasks = [];

    for (const testType of testTypes) {
      const task = await this.createTask(projectId,
        `${testType.toUpperCase()} Testing`,
        `Implement and run ${testType} tests`,
        {
          priority: 'high',
          command: 'qa',
          metadata: { test_type: testType, type: 'testing' }
        }
      );
      tasks.push(task);
    }

    return tasks;
  }

  async completeTask(taskId, actualHours = null) {
    const updates = { status: 'done' };
    if (actualHours) updates.actual_hours = actualHours;
    
    return await this.updateTask(taskId, updates);
  }

  // Session Integration
  async syncWithSession(sessionPath) {
    try {
      const sessionData = JSON.parse(await fs.readFile(sessionPath, 'utf8'));
      
      if (sessionData.current_project_id) {
        await this.pushSync('session_sync', {
          session_state: sessionData,
          project_id: sessionData.current_project_id
        });
      }

      return sessionData;
    } catch (error) {
      console.warn('Could not sync with session file:', error.message);
      return null;
    }
  }

  async updateSession(sessionPath, updates) {
    try {
      let sessionData = {};
      try {
        sessionData = JSON.parse(await fs.readFile(sessionPath, 'utf8'));
      } catch {
        // File doesn't exist, start with empty object
      }

      const updatedSession = { ...sessionData, ...updates };
      await fs.writeFile(sessionPath, JSON.stringify(updatedSession, null, 2));
      
      return updatedSession;
    } catch (error) {
      console.error('Failed to update session:', error.message);
      throw error;
    }
  }
}

// Factory function for easy import
function createKanbanAPI(baseURL) {
  return new KanbanAPI(baseURL);
}

module.exports = { KanbanAPI, createKanbanAPI };