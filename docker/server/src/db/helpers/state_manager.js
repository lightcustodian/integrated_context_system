import { getDb } from '../sqlite.js';
import { logger } from '../../utils/logger.js';

/**
 * Database State Manager - Replaces session.json functionality
 * Provides persistent state management for CLI and web interface synchronization
 */
export class DatabaseStateManager {
  constructor(projectId) {
    this.projectId = projectId;
    this.db = getDb();
  }

  /**
   * Initialize project state if it doesn't exist
   */
  async initializeProjectState(initialData = {}) {
    const existing = await this.getProjectState();
    if (existing) {
      return existing;
    }

    const defaultState = {
      project_id: this.projectId,
      current_phase: null,
      current_command: null,
      current_step: null,
      current_prototype: null,
      context: JSON.stringify({}),
      step_context: JSON.stringify({}),
      command_history: JSON.stringify([]),
      history: JSON.stringify([]),
      last_claude_sync: new Date().toISOString(),
      ...initialData
    };

    const stmt = this.db.prepare(`
      INSERT INTO project_state (
        project_id, current_phase, current_command, current_step, 
        current_prototype, context, step_context, command_history, 
        history, last_claude_sync, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    stmt.run(
      defaultState.project_id,
      defaultState.current_phase,
      defaultState.current_command,
      defaultState.current_step,
      defaultState.current_prototype,
      defaultState.context,
      defaultState.step_context,
      defaultState.command_history,
      defaultState.history,
      defaultState.last_claude_sync
    );

    logger.info(`Initialized project state for: ${this.projectId}`);
    return await this.getProjectState();
  }

  /**
   * Get current project state
   */
  async getProjectState() {
    const stmt = this.db.prepare('SELECT * FROM project_state WHERE project_id = ?');
    const state = stmt.get(this.projectId);
    
    if (!state) {
      return null;
    }

    // Parse JSON fields
    return {
      ...state,
      context: JSON.parse(state.context || '{}'),
      step_context: JSON.parse(state.step_context || '{}'),
      command_history: JSON.parse(state.command_history || '[]'),
      history: JSON.parse(state.history || '[]')
    };
  }

  /**
   * Update project state
   */
  async updateState(updates) {
    const currentState = await this.getProjectState();
    if (!currentState) {
      await this.initializeProjectState();
    }

    // Prepare update object
    const updateData = { ...updates };
    
    // Stringify JSON fields if they exist in updates
    if (updateData.context && typeof updateData.context === 'object') {
      updateData.context = JSON.stringify(updateData.context);
    }
    if (updateData.step_context && typeof updateData.step_context === 'object') {
      updateData.step_context = JSON.stringify(updateData.step_context);
    }
    if (updateData.command_history && Array.isArray(updateData.command_history)) {
      updateData.command_history = JSON.stringify(updateData.command_history);
    }
    if (updateData.history && Array.isArray(updateData.history)) {
      updateData.history = JSON.stringify(updateData.history);
    }

    // Build dynamic UPDATE statement
    const fields = Object.keys(updateData).filter(key => key !== 'project_id');
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => updateData[field]);

    const stmt = this.db.prepare(`
      UPDATE project_state 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE project_id = ?
    `);

    stmt.run(...values, this.projectId);

    logger.debug(`Updated project state for: ${this.projectId}`, { fields });
    return await this.getProjectState();
  }

  /**
   * Set current operation (command and step)
   */
  async setCurrentOperation(command, step, stepContext = {}) {
    return await this.updateState({
      current_command: command,
      current_step: step,
      step_context: stepContext,
      last_claude_sync: new Date().toISOString()
    });
  }

  /**
   * Clear current operation
   */
  async clearCurrentOperation() {
    return await this.updateState({
      current_command: null,
      current_step: null,
      step_context: {},
      last_claude_sync: new Date().toISOString()
    });
  }

  /**
   * Add command to history
   */
  async addCommandToHistory(command, result, duration = null) {
    const currentState = await this.getProjectState();
    const history = currentState ? currentState.command_history : [];
    
    history.push({
      command,
      result,
      duration,
      timestamp: new Date().toISOString()
    });

    return await this.updateState({
      command_history: history
    });
  }

  /**
   * Set current prototype
   */
  async setCurrentPrototype(prototypeNumber, prototypeContext = {}) {
    return await this.updateState({
      current_prototype: prototypeNumber.toString(),
      step_context: prototypeContext
    });
  }

  /**
   * Get command execution context for resume operations
   */
  async getExecutionContext() {
    const state = await this.getProjectState();
    if (!state) {
      return null;
    }

    return {
      projectId: this.projectId,
      currentCommand: state.current_command,
      currentStep: state.current_step,
      currentPrototype: state.current_prototype,
      stepContext: state.step_context,
      projectContext: state.context,
      commandHistory: state.command_history,
      lastSync: state.last_claude_sync
    };
  }

  /**
   * Check if CLI can safely proceed (no recent web modifications)
   */
  async checkWebModificationConflicts() {
    const stmt = this.db.prepare(`
      SELECT COUNT(*) as count 
      FROM task_modifications tm
      JOIN tasks t ON tm.task_id = t.id
      WHERE t.project_id = ? 
        AND tm.source = 'web' 
        AND tm.created_at > datetime('now', '-5 minutes')
    `);
    
    const result = stmt.get(this.projectId);
    return result.count > 0;
  }

  /**
   * Sync state with web interface (notify of changes)
   */
  async syncWithWebInterface(socketIo) {
    const state = await this.getProjectState();
    if (state && socketIo) {
      socketIo.emit('project_state_updated', {
        projectId: this.projectId,
        state: {
          currentCommand: state.current_command,
          currentStep: state.current_step,
          currentPrototype: state.current_prototype,
          lastSync: state.last_claude_sync
        }
      });
    }
    return state;
  }
}

/**
 * Project Settings Manager - Handles methodology configuration
 */
export class ProjectSettingsManager {
  constructor(projectId) {
    this.projectId = projectId;
    this.db = getDb();
  }

  /**
   * Initialize project with default settings
   */
  async initializeDefaultSettings() {
    // Copy default settings template for this project
    const stmt = this.db.prepare(`
      INSERT INTO project_settings (id, project_id, setting_name, setting_value, methodology, description, impact_description)
      SELECT 
        ? || '_' || setting_name as id,
        ? as project_id,
        setting_name,
        setting_value,
        methodology,
        description,
        impact_description
      FROM project_settings 
      WHERE project_id = 'DEFAULT_TEMPLATE'
    `);

    stmt.run(this.projectId, this.projectId);
    logger.info(`Initialized default settings for project: ${this.projectId}`);
  }

  /**
   * Get all project settings grouped by methodology
   */
  async getProjectSettings() {
    const stmt = this.db.prepare(`
      SELECT * FROM project_settings 
      WHERE project_id = ? 
      ORDER BY methodology, setting_name
    `);
    
    const settings = stmt.all(this.projectId);
    
    // Group by methodology
    const grouped = settings.reduce((acc, setting) => {
      if (!acc[setting.methodology]) {
        acc[setting.methodology] = [];
      }
      acc[setting.methodology].push(setting);
      return acc;
    }, {});

    return grouped;
  }

  /**
   * Update specific setting
   */
  async updateSetting(settingName, settingValue) {
    const stmt = this.db.prepare(`
      UPDATE project_settings 
      SET setting_value = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE project_id = ? AND setting_name = ?
    `);

    const result = stmt.run(settingValue, this.projectId, settingName);
    
    if (result.changes === 0) {
      throw new Error(`Setting not found: ${settingName} for project ${this.projectId}`);
    }

    logger.info(`Updated setting ${settingName} to ${settingValue} for project ${this.projectId}`);
    return await this.getSetting(settingName);
  }

  /**
   * Get specific setting value
   */
  async getSetting(settingName) {
    const stmt = this.db.prepare(`
      SELECT * FROM project_settings 
      WHERE project_id = ? AND setting_name = ?
    `);
    
    return stmt.get(this.projectId, settingName);
  }

  /**
   * Batch update settings (for web interface "Submit All")
   */
  async batchUpdateSettings(settingsUpdates) {
    const transaction = this.db.transaction(() => {
      const stmt = this.db.prepare(`
        UPDATE project_settings 
        SET setting_value = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE project_id = ? AND setting_name = ?
      `);

      for (const { settingName, settingValue } of settingsUpdates) {
        stmt.run(settingValue, this.projectId, settingName);
      }
    });

    transaction();
    logger.info(`Batch updated ${settingsUpdates.length} settings for project ${this.projectId}`);
    return await this.getProjectSettings();
  }

  /**
   * Get settings configuration for web interface
   */
  async getSettingsForWebInterface() {
    const settings = await this.getProjectSettings();
    
    // Format for web interface with options
    const webSettings = {};
    
    for (const [methodology, methodologySettings] of Object.entries(settings)) {
      webSettings[methodology] = methodologySettings.map(setting => ({
        name: setting.setting_name,
        currentValue: setting.setting_value,
        description: setting.description,
        impactDescription: setting.impact_description,
        methodology: setting.methodology,
        options: [
          { level: 'NONE', description: 'Disabled', impact: this.getImpactForLevel(setting.impact_description, 'NONE') },
          { level: 'MINIMAL', description: 'Basic', impact: this.getImpactForLevel(setting.impact_description, 'MINIMAL') },
          { level: 'STANDARD', description: 'Standard', impact: this.getImpactForLevel(setting.impact_description, 'STANDARD') },
          { level: 'COMPREHENSIVE', description: 'Advanced', impact: this.getImpactForLevel(setting.impact_description, 'COMPREHENSIVE') }
        ]
      }));
    }

    return webSettings;
  }

  /**
   * Extract impact description for specific level
   */
  getImpactForLevel(impactDescription, level) {
    if (!impactDescription) return 'No description available';
    
    const levelMatch = impactDescription.match(new RegExp(`${level}:\\s*([^,]+)`, 'i'));
    return levelMatch ? levelMatch[1].trim() : 'No description available';
  }
}

/**
 * Approval Manager - Handles approval workflow
 */
export class ApprovalManager {
  constructor(projectId) {
    this.projectId = projectId;
    this.db = getDb();
  }

  /**
   * Create new approval document
   */
  async createApproval(command, phase, approvalType, title, content, autoApprove = false) {
    const id = `approval_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const stmt = this.db.prepare(`
      INSERT INTO approvals (
        id, project_id, command, phase, approval_type, title, 
        content, status, auto_approve, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    stmt.run(
      id, this.projectId, command, phase, approvalType, 
      title, content, autoApprove ? 'approved' : 'pending', autoApprove
    );

    logger.info(`Created approval: ${title} for project ${this.projectId}`);
    return await this.getApproval(id);
  }

  /**
   * Get approval by ID
   */
  async getApproval(approvalId) {
    const stmt = this.db.prepare('SELECT * FROM approvals WHERE id = ?');
    return stmt.get(approvalId);
  }

  /**
   * Get all pending approvals for project
   */
  async getPendingApprovals() {
    const stmt = this.db.prepare(`
      SELECT * FROM approvals 
      WHERE project_id = ? AND status = 'pending' 
      ORDER BY created_at ASC
    `);
    
    return stmt.all(this.projectId);
  }

  /**
   * Approve document
   */
  async approveDocument(approvalId, updatedContent = null) {
    const updateStmt = this.db.prepare(`
      UPDATE approvals 
      SET status = 'approved', 
          content = COALESCE(?, content),
          approved_at = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateStmt.run(updatedContent, approvalId);
    logger.info(`Approved document: ${approvalId}`);
    return await this.getApproval(approvalId);
  }

  /**
   * Reject document with reason
   */
  async rejectDocument(approvalId, rejectionReason) {
    const updateStmt = this.db.prepare(`
      UPDATE approvals 
      SET status = 'rejected', 
          rejection_reason = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    updateStmt.run(rejectionReason, approvalId);
    
    // Get the approval to create retry task
    const approval = await this.getApproval(approvalId);
    
    // Create task to rework the rejected item
    const taskStmt = this.db.prepare(`
      INSERT INTO tasks (
        id, project_id, title, description, status, 
        methodology_type, command_source, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    taskStmt.run(
      taskId,
      this.projectId,
      `Rework ${approval.command} - ${approval.phase}`,
      `Rejected: ${rejectionReason}\n\nOriginal content:\n${approval.content}`,
      'todo',
      'general',
      approval.command
    );

    logger.info(`Rejected document ${approvalId} and created retry task ${taskId}`);
    return { approval: await this.getApproval(approvalId), retryTaskId: taskId };
  }

  /**
   * Get all approvals for project (for history view)
   */
  async getAllApprovals() {
    const stmt = this.db.prepare(`
      SELECT * FROM approvals 
      WHERE project_id = ? 
      ORDER BY created_at DESC
    `);
    
    return stmt.all(this.projectId);
  }
}