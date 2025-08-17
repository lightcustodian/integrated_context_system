import { getDb } from '../sqlite.js';
import { logger } from '../../utils/logger.js';
import { createHash } from 'crypto';

/**
 * SAGE Learning System Manager
 * Handles pattern capture, recognition, and adaptive behavior
 */
export class LearningManager {
  constructor(projectId = null) {
    this.projectId = projectId;
    this.db = getDb();
  }

  /**
   * Create a learning session for pattern capture
   */
  async startLearningSession(command, methodology, contextData) {
    const sessionId = `learning_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const patternSignature = this.generatePatternSignature(contextData);
    
    const session = {
      id: sessionId,
      projectId: this.projectId,
      command,
      methodology,
      contextData,
      executionSteps: [],
      adaptations: [],
      startTime: Date.now()
    };

    // Store session in memory for duration of command execution
    this.currentSession = session;
    
    logger.debug(`Started learning session: ${sessionId} for command: ${command}`);
    return sessionId;
  }

  /**
   * Capture execution step during command execution
   */
  captureExecutionStep(step, outcome, duration, adaptationsMade = []) {
    if (!this.currentSession) {
      logger.warn('No active learning session for step capture');
      return;
    }

    this.currentSession.executionSteps.push({
      step,
      outcome, // success, failure, adapted
      duration,
      adaptationsMade,
      timestamp: Date.now()
    });

    logger.debug(`Captured execution step: ${step} with outcome: ${outcome.status || outcome}`);
  }

  /**
   * Capture adaptation during execution
   */
  captureAdaptation(trigger, action, result, confidence = 0.5) {
    if (!this.currentSession) {
      logger.warn('No active learning session for adaptation capture');
      return;
    }

    this.currentSession.adaptations.push({
      trigger, // dependency_change, test_failure, user_feedback, pattern_match
      action,  // created_task, modified_approach, requested_approval
      result,  // success, failure, pending
      confidence,
      timestamp: Date.now()
    });

    logger.debug(`Captured adaptation: ${trigger} -> ${action} = ${result}`);
  }

  /**
   * Save learning session to database
   */
  async saveLearningSession() {
    if (!this.currentSession) {
      logger.warn('No active learning session to save');
      return null;
    }

    const session = this.currentSession;
    const successMetrics = this.calculateSuccessMetrics(session);
    const lessonsLearned = this.extractLessons(session);
    const patternSignature = this.generatePatternSignature(session.contextData);
    const confidenceScore = this.calculateOverallConfidence(session);

    const stmt = this.db.prepare(`
      INSERT INTO learning_sessions (
        id, project_id, command, methodology, context_data, 
        execution_data, success_metrics, lessons_learned, 
        pattern_signature, confidence_score, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    stmt.run(
      session.id,
      session.projectId,
      session.command,
      session.methodology,
      JSON.stringify(session.contextData),
      JSON.stringify({
        executionSteps: session.executionSteps,
        adaptations: session.adaptations,
        duration: Date.now() - session.startTime
      }),
      JSON.stringify(successMetrics),
      lessonsLearned,
      patternSignature,
      confidenceScore
    );

    // Update global patterns
    await this.updateGlobalPatterns(session, lessonsLearned, patternSignature);

    logger.info(`Saved learning session: ${session.id} with confidence: ${confidenceScore}`);
    
    // Clear current session
    this.currentSession = null;
    
    return session.id;
  }

  /**
   * Generate pattern signature for similar situation recognition
   */
  generatePatternSignature(contextData) {
    const signatureData = {
      complexity: contextData.complexity || 'medium',
      techStack: Array.isArray(contextData.techStack) ? contextData.techStack.sort() : [],
      projectType: contextData.projectType || 'general',
      constraints: contextData.timeConstraints || 'normal'
    };

    const signatureString = JSON.stringify(signatureData);
    return createHash('sha256').update(signatureString).digest('hex').substring(0, 16);
  }

  /**
   * Calculate success metrics for session
   */
  calculateSuccessMetrics(session) {
    const totalSteps = session.executionSteps.length;
    const successfulSteps = session.executionSteps.filter(step => 
      step.outcome === 'success' || (step.outcome.status && step.outcome.status === 'success')
    ).length;
    
    const totalAdaptations = session.adaptations.length;
    const successfulAdaptations = session.adaptations.filter(adaptation => 
      adaptation.result === 'success'
    ).length;

    const avgStepDuration = totalSteps > 0 ? 
      session.executionSteps.reduce((sum, step) => sum + (step.duration || 0), 0) / totalSteps : 0;

    return {
      successRate: totalSteps > 0 ? successfulSteps / totalSteps : 0,
      adaptationSuccessRate: totalAdaptations > 0 ? successfulAdaptations / totalAdaptations : 1,
      avgStepDuration,
      totalAdaptations,
      sessionDuration: Date.now() - session.startTime
    };
  }

  /**
   * Extract lessons learned from session
   */
  extractLessons(session) {
    const lessons = [];

    // Extract lessons from successful adaptations
    session.adaptations
      .filter(adaptation => adaptation.result === 'success')
      .forEach(adaptation => {
        lessons.push({
          lesson: `When ${adaptation.trigger}, ${adaptation.action} was effective`,
          confidence: adaptation.confidence,
          context: session.contextData
        });
      });

    // Extract lessons from execution patterns
    const failedSteps = session.executionSteps.filter(step => 
      step.outcome === 'failure' || (step.outcome.status && step.outcome.status === 'failure')
    );

    if (failedSteps.length > 0) {
      lessons.push({
        lesson: `In ${session.contextData.projectType || 'general'} projects, watch out for ${failedSteps[0].step} complexity`,
        confidence: 0.6,
        context: session.contextData
      });
    }

    return JSON.stringify(lessons);
  }

  /**
   * Calculate overall confidence score for session
   */
  calculateOverallConfidence(session) {
    const metrics = this.calculateSuccessMetrics(session);
    const adaptationCount = session.adaptations.length;
    
    // Base confidence on success rate and adaptation effectiveness
    let confidence = metrics.successRate * 0.7 + metrics.adaptationSuccessRate * 0.3;
    
    // Boost confidence if we made successful adaptations
    if (adaptationCount > 0 && metrics.adaptationSuccessRate > 0.7) {
      confidence += 0.1;
    }
    
    // Cap at 0.95 (never 100% certain)
    return Math.min(confidence, 0.95);
  }

  /**
   * Update global patterns based on session results
   */
  async updateGlobalPatterns(session, lessonsLearned, patternSignature) {
    // Check if we have an existing pattern for this signature
    const existingPattern = this.db.prepare(`
      SELECT * FROM adaptation_patterns 
      WHERE pattern_signature = ?
    `).get(patternSignature);

    if (existingPattern) {
      // Update existing pattern with new data
      const newUsageCount = existingPattern.usage_count + 1;
      const newSuccessRate = this.calculateNewSuccessRate(
        existingPattern.success_rate, 
        existingPattern.usage_count,
        session
      );

      this.db.prepare(`
        UPDATE adaptation_patterns 
        SET success_rate = ?, usage_count = ?, last_used = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(newSuccessRate, newUsageCount, existingPattern.id);

    } else {
      // Create new pattern
      const patternId = `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const metrics = this.calculateSuccessMetrics(session);

      this.db.prepare(`
        INSERT INTO adaptation_patterns (
          id, pattern_type, pattern_name, situation_context,
          recommended_actions, success_rate, usage_count,
          auto_apply, confidence_threshold, created_at, last_used
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `).run(
        patternId,
        session.command + '_pattern',
        `${session.command} pattern for ${session.contextData.projectType || 'general'} projects`,
        JSON.stringify(session.contextData),
        lessonsLearned,
        metrics.successRate,
        1,
        metrics.successRate > 0.8 ? 1 : 0, // Auto-apply if very successful
        0.7 // Default confidence threshold
      );
    }
  }

  /**
   * Calculate new success rate when updating existing patterns
   */
  calculateNewSuccessRate(oldRate, oldCount, session) {
    const sessionMetrics = this.calculateSuccessMetrics(session);
    const totalCount = oldCount + 1;
    
    // Weighted average of old rate and new session success
    return ((oldRate * oldCount) + sessionMetrics.successRate) / totalCount;
  }

  /**
   * Find similar contexts for pattern matching
   */
  async findSimilarContexts(currentContext, command = null) {
    const currentSignature = this.generatePatternSignature(currentContext);
    
    // Find patterns with similar signatures or context elements
    let query = `
      SELECT *, 
        CASE 
          WHEN pattern_signature = ? THEN 1.0
          ELSE 0.7 
        END as similarity_score
      FROM adaptation_patterns 
      WHERE success_rate > 0.5
    `;
    
    const params = [currentSignature];
    
    if (command) {
      query += ` AND pattern_type LIKE ?`;
      params.push(`%${command}%`);
    }
    
    query += ` ORDER BY similarity_score DESC, success_rate DESC LIMIT 10`;
    
    const patterns = this.db.prepare(query).all(...params);
    
    return patterns.map(pattern => ({
      ...pattern,
      situation_context: JSON.parse(pattern.situation_context || '{}'),
      recommended_actions: JSON.parse(pattern.recommended_actions || '[]')
    }));
  }

  /**
   * Get adaptation suggestions based on current context
   */
  async suggestAdaptations(currentContext, currentStep, confidenceThreshold = 0.7) {
    const similarPatterns = await this.findSimilarContexts(currentContext, currentStep);
    
    return similarPatterns
      .filter(pattern => pattern.success_rate > confidenceThreshold)
      .map(pattern => ({
        id: pattern.id,
        name: pattern.pattern_name,
        description: `Based on ${pattern.usage_count} similar situations`,
        actions: pattern.recommended_actions,
        confidence: pattern.success_rate,
        autoApply: pattern.auto_apply === 1,
        pattern_type: pattern.pattern_type
      }));
  }

  /**
   * Apply automatic adaptations
   */
  async applyAutomaticAdaptations(currentContext, command) {
    const suggestions = await this.suggestAdaptations(currentContext, command, 0.85);
    const automaticAdaptations = suggestions.filter(s => s.autoApply);
    
    const appliedAdaptations = [];
    
    for (const adaptation of automaticAdaptations) {
      try {
        // Log the adaptation application
        await this.recordPatternUsage(adaptation.id, currentContext, 'auto_applied');
        
        appliedAdaptations.push({
          id: adaptation.id,
          name: adaptation.name,
          description: adaptation.description,
          confidence: adaptation.confidence
        });

        // Capture this as an adaptation in current session
        this.captureAdaptation(
          'pattern_match',
          `applied_pattern_${adaptation.id}`,
          'success',
          adaptation.confidence
        );
        
      } catch (error) {
        logger.error(`Failed to apply automatic adaptation ${adaptation.id}:`, error);
      }
    }
    
    if (appliedAdaptations.length > 0) {
      logger.info(`Applied ${appliedAdaptations.length} automatic adaptations`);
    }
    
    return appliedAdaptations;
  }

  /**
   * Record pattern usage for effectiveness tracking
   */
  async recordPatternUsage(patternId, context, effectiveness) {
    const usageId = `usage_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const effectivenessScore = typeof effectiveness === 'string' 
      ? (effectiveness === 'success' || effectiveness === 'auto_applied' ? 1.0 : 0.0)
      : effectiveness;

    this.db.prepare(`
      INSERT INTO pattern_usage (
        id, pattern_id, project_id, usage_context, 
        effectiveness, used_at
      ) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      usageId,
      patternId,
      this.projectId,
      JSON.stringify(context),
      effectivenessScore
    );
  }

  /**
   * Analyze dependency change impact
   */
  async analyzeDependencyChange(changedComponent, projectId, changeType = 'modification') {
    // Get dependency information for the component
    const dependencyInfo = this.db.prepare(`
      SELECT * FROM dependency_tracking 
      WHERE project_id = ? AND component_name = ?
    `).get(projectId, changedComponent);

    if (!dependencyInfo) {
      logger.debug(`No dependency information found for component: ${changedComponent}`);
      return [];
    }

    const dependentComponents = JSON.parse(dependencyInfo.dependent_components || '[]');
    const potentialImpacts = [];

    // Find patterns related to dependency changes
    const dependencyPatterns = this.db.prepare(`
      SELECT * FROM adaptation_patterns 
      WHERE pattern_type = 'dependency_change' 
        AND success_rate > 0.6
      ORDER BY success_rate DESC
    `).all();

    for (const component of dependentComponents) {
      for (const pattern of dependencyPatterns) {
        const context = JSON.parse(pattern.situation_context || '{}');
        
        // Check if pattern applies to this type of change
        if (this.patternMatchesDependencyChange(pattern, changedComponent, component, changeType)) {
          potentialImpacts.push({
            affectedComponent: component,
            changeType: changeType,
            riskLevel: this.calculateRiskLevel(pattern, changeType),
            recommendedAction: pattern.recommended_actions,
            confidence: pattern.success_rate,
            patternId: pattern.id
          });
        }
      }
    }

    // Create validation tasks for high-confidence impacts
    for (const impact of potentialImpacts.filter(i => i.confidence > 0.75)) {
      await this.createValidationTask(impact, projectId);
    }

    return potentialImpacts;
  }

  /**
   * Check if a pattern matches the current dependency change
   */
  patternMatchesDependencyChange(pattern, changedComponent, affectedComponent, changeType) {
    const context = JSON.parse(pattern.situation_context || '{}');
    const actions = JSON.parse(pattern.recommended_actions || '[]');
    
    // Simple matching logic - can be enhanced with more sophisticated pattern matching
    return (
      context.changeType === changeType ||
      actions.some(action => action.includes('validate') || action.includes('test'))
    );
  }

  /**
   * Calculate risk level for dependency change
   */
  calculateRiskLevel(pattern, changeType) {
    const baseRisk = changeType === 'breaking_change' ? 0.8 : 0.4;
    const patternRisk = 1 - pattern.success_rate; // Lower success rate = higher risk
    
    return Math.min((baseRisk + patternRisk) / 2, 1.0);
  }

  /**
   * Create validation task for dependency impact
   */
  async createValidationTask(impact, projectId) {
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const taskStmt = this.db.prepare(`
      INSERT INTO tasks (
        id, project_id, title, description, status,
        methodology_type, task_metadata, command_source,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    taskStmt.run(
      taskId,
      projectId,
      `Validate: ${impact.affectedComponent} after dependency change`,
      `SAGE detected potential impact from dependency change.\n\nRisk Level: ${impact.riskLevel.toFixed(2)}\nRecommended Action: ${impact.recommendedAction}\nConfidence: ${impact.confidence.toFixed(2)}`,
      'todo',
      'sage',
      JSON.stringify({
        type: 'dependency_validation',
        trigger: 'sage_adaptation',
        confidence: impact.confidence,
        riskLevel: impact.riskLevel,
        patternId: impact.patternId
      }),
      'sage_learning'
    );

    logger.info(`🔍 SAGE: Created validation task for ${impact.affectedComponent} (Risk: ${impact.riskLevel.toFixed(2)})`);
    return taskId;
  }

  /**
   * Get learning insights for project
   */
  async getLearningInsights(projectId = null) {
    const targetProjectId = projectId || this.projectId;
    
    const sessionInsights = this.db.prepare(`
      SELECT 
        command,
        methodology,
        AVG(confidence_score) as avg_confidence,
        COUNT(*) as session_count,
        MAX(created_at) as last_session
      FROM learning_sessions 
      ${targetProjectId ? 'WHERE project_id = ?' : ''}
      GROUP BY command, methodology
      ORDER BY avg_confidence DESC
    `).all(targetProjectId ? [targetProjectId] : []);

    const patternInsights = this.db.prepare(`
      SELECT 
        pattern_type,
        AVG(success_rate) as avg_success_rate,
        SUM(usage_count) as total_usage,
        COUNT(*) as pattern_count
      FROM adaptation_patterns
      GROUP BY pattern_type
      ORDER BY avg_success_rate DESC
    `).all();

    return {
      sessionInsights,
      patternInsights,
      summary: {
        totalSessions: sessionInsights.reduce((sum, s) => sum + s.session_count, 0),
        avgOverallConfidence: sessionInsights.length > 0 
          ? sessionInsights.reduce((sum, s) => sum + s.avg_confidence, 0) / sessionInsights.length 
          : 0,
        totalPatterns: patternInsights.reduce((sum, p) => sum + p.pattern_count, 0),
        mostSuccessfulPatternType: patternInsights[0]?.pattern_type || 'none'
      }
    };
  }
}