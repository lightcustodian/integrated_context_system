import { promises as fs } from 'fs';
import path from 'path';
import { logger } from './logger.js';

/**
 * JSON Learning Storage System
 * Manages cross-project learning data in Docker persistent volumes
 */
export class JSONLearningStorage {
  constructor() {
    // Use Docker volume path for persistence across container restarts
    this.learningBasePath = path.join(process.cwd(), '..', 'docker', 'learning');
    this.approvalBasePath = path.join(process.cwd(), '..', 'docker', 'approvals');
    this.knowledgeBasePath = path.join(process.cwd(), '..', 'docker', 'knowledge');
    
    this.globalPatternsFile = path.join(this.learningBasePath, 'global_patterns.json');
    this.methodologyEffectivenessFile = path.join(this.learningBasePath, 'methodology_effectiveness.json');
    this.dependencyPatternsFile = path.join(this.learningBasePath, 'dependency_patterns.json');
    this.userPatternsFile = path.join(this.learningBasePath, 'user_patterns.json');
  }

  /**
   * Initialize learning storage directories and default files
   */
  async initialize() {
    try {
      // Create directories if they don't exist
      await this.ensureDirectoryExists(this.learningBasePath);
      await this.ensureDirectoryExists(this.approvalBasePath);
      await this.ensureDirectoryExists(this.knowledgeBasePath);
      
      // Create subdirectories for organization
      await this.ensureDirectoryExists(path.join(this.knowledgeBasePath, 'frameworks'));
      await this.ensureDirectoryExists(path.join(this.knowledgeBasePath, 'apis'));
      await this.ensureDirectoryExists(path.join(this.knowledgeBasePath, 'concepts'));
      
      // Initialize default learning files if they don't exist
      await this.initializeDefaultFiles();
      
      logger.info('JSON Learning Storage initialized successfully');
      return true;
      
    } catch (error) {
      logger.error('Failed to initialize JSON Learning Storage:', error);
      throw error;
    }
  }

  /**
   * Ensure directory exists, create if it doesn't
   */
  async ensureDirectoryExists(dirPath) {
    try {
      await fs.access(dirPath);
    } catch (error) {
      await fs.mkdir(dirPath, { recursive: true });
      logger.info(`Created directory: ${dirPath}`);
    }
  }

  /**
   * Initialize default learning pattern files
   */
  async initializeDefaultFiles() {
    // Global patterns structure
    const defaultGlobalPatterns = {
      dependency_tracking: [
        {
          pattern: "react_component_change_affects_parent",
          confidence: 0.85,
          contexts: ["react", "typescript", "component_library"],
          recommended_actions: ["check_parent_imports", "run_integration_tests"],
          usage_count: 0,
          last_applied: null
        }
      ],
      implementation_patterns: [
        {
          pattern: "tdd_faster_with_simple_tests_first",
          confidence: 0.9,
          contexts: ["time_pressure", "new_feature"],
          adaptation: "start_with_happy_path_test",
          usage_count: 0,
          success_rate: 0.9
        }
      ],
      failure_recovery: [
        {
          pattern: "test_failure_check_dependencies_first",
          confidence: 0.8,
          contexts: ["integration_test", "dependency_update"],
          recommended_actions: ["check_package_versions", "verify_imports"],
          usage_count: 0
        }
      ],
      optimization_patterns: [
        {
          pattern: "performance_test_before_optimization",
          confidence: 0.95,
          contexts: ["performance_improvement", "optimization_task"],
          recommended_actions: ["baseline_metrics", "profile_before_changes"],
          usage_count: 0
        }
      ]
    };

    // Methodology effectiveness tracking
    const defaultMethodologyEffectiveness = {
      bmad_validation_success_rate: 0.88,
      sage_adaptation_improvement: 0.65,
      archon_agent_generation_utility: 0.75,
      overall_system_effectiveness: 0.76,
      last_updated: new Date().toISOString(),
      project_count: 0,
      total_commands_executed: 0
    };

    // Dependency patterns
    const defaultDependencyPatterns = {
      common_dependencies: {
        "react_components": {
          typical_dependents: ["parent_components", "story_files", "test_files"],
          impact_factors: ["prop_changes", "component_rename", "export_changes"],
          validation_actions: ["check_imports", "run_component_tests", "verify_stories"]
        },
        "api_endpoints": {
          typical_dependents: ["frontend_calls", "documentation", "test_files"],
          impact_factors: ["response_schema_change", "endpoint_rename", "authentication_change"],
          validation_actions: ["update_api_calls", "check_documentation", "run_integration_tests"]
        },
        "utility_functions": {
          typical_dependents: ["calling_functions", "test_files", "documentation"],
          impact_factors: ["signature_change", "return_type_change", "function_rename"],
          validation_actions: ["check_all_usages", "update_tests", "verify_documentation"]
        }
      },
      change_impact_rules: [
        {
          condition: "component_prop_change",
          impact_scope: "all_parent_components",
          required_validations: ["type_checking", "integration_tests"],
          confidence: 0.9
        },
        {
          condition: "api_response_change",
          impact_scope: "all_frontend_consumers",
          required_validations: ["contract_tests", "frontend_integration"],
          confidence: 0.95
        }
      ]
    };

    // User behavior patterns
    const defaultUserPatterns = {
      approval_patterns: {
        frequent_approvals: [],
        frequent_rejections: [],
        approval_time_patterns: {},
        setting_preferences: {}
      },
      workflow_patterns: {
        preferred_prototype_sizes: "medium",
        typical_validation_depth: "standard",
        error_handling_preferences: "detailed_feedback"
      },
      learning_preferences: {
        auto_apply_threshold: 0.85,
        suggestion_frequency: "moderate",
        adaptation_aggressiveness: "conservative"
      }
    };

    // Write default files if they don't exist
    await this.writeFileIfNotExists(this.globalPatternsFile, defaultGlobalPatterns);
    await this.writeFileIfNotExists(this.methodologyEffectivenessFile, defaultMethodologyEffectiveness);
    await this.writeFileIfNotExists(this.dependencyPatternsFile, defaultDependencyPatterns);
    await this.writeFileIfNotExists(this.userPatternsFile, defaultUserPatterns);
  }

  /**
   * Write file only if it doesn't exist
   */
  async writeFileIfNotExists(filePath, defaultContent) {
    try {
      await fs.access(filePath);
      // File exists, don't overwrite
    } catch (error) {
      // File doesn't exist, create it
      await fs.writeFile(filePath, JSON.stringify(defaultContent, null, 2));
      logger.info(`Created default learning file: ${path.basename(filePath)}`);
    }
  }

  /**
   * Load global patterns
   */
  async loadGlobalPatterns() {
    try {
      const data = await fs.readFile(this.globalPatternsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Failed to load global patterns:', error);
      await this.initializeDefaultFiles(); // Reinitialize if corrupted
      return await this.loadGlobalPatterns(); // Retry
    }
  }

  /**
   * Save global patterns
   */
  async saveGlobalPatterns(patterns) {
    try {
      // Add metadata
      patterns.last_updated = new Date().toISOString();
      patterns.version = patterns.version ? patterns.version + 1 : 1;
      
      await fs.writeFile(this.globalPatternsFile, JSON.stringify(patterns, null, 2));
      logger.debug('Saved global patterns');
    } catch (error) {
      logger.error('Failed to save global patterns:', error);
      throw error;
    }
  }

  /**
   * Update specific pattern in global patterns
   */
  async updatePattern(patternType, patternName, updates) {
    const patterns = await this.loadGlobalPatterns();
    
    if (!patterns[patternType]) {
      patterns[patternType] = [];
    }
    
    const existingPatternIndex = patterns[patternType].findIndex(p => p.pattern === patternName);
    
    if (existingPatternIndex >= 0) {
      // Update existing pattern
      patterns[patternType][existingPatternIndex] = {
        ...patterns[patternType][existingPatternIndex],
        ...updates,
        last_applied: new Date().toISOString()
      };
    } else {
      // Add new pattern
      patterns[patternType].push({
        pattern: patternName,
        ...updates,
        usage_count: 1,
        last_applied: new Date().toISOString()
      });
    }
    
    await this.saveGlobalPatterns(patterns);
    return patterns[patternType];
  }

  /**
   * Record pattern usage
   */
  async recordPatternUsage(patternType, patternName, success = true, context = {}) {
    const patterns = await this.loadGlobalPatterns();
    
    if (patterns[patternType]) {
      const pattern = patterns[patternType].find(p => p.pattern === patternName);
      if (pattern) {
        pattern.usage_count = (pattern.usage_count || 0) + 1;
        pattern.last_applied = new Date().toISOString();
        
        // Update success rate (simple moving average)
        const currentSuccessRate = pattern.success_rate || 0.5;
        const currentCount = pattern.usage_count;
        pattern.success_rate = ((currentSuccessRate * (currentCount - 1)) + (success ? 1 : 0)) / currentCount;
        
        // Store context for future analysis
        if (!pattern.usage_contexts) {
          pattern.usage_contexts = [];
        }
        pattern.usage_contexts.push({
          context,
          success,
          timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 contexts to prevent file bloat
        if (pattern.usage_contexts.length > 50) {
          pattern.usage_contexts = pattern.usage_contexts.slice(-50);
        }
        
        await this.saveGlobalPatterns(patterns);
      }
    }
  }

  /**
   * Load methodology effectiveness data
   */
  async loadMethodologyEffectiveness() {
    try {
      const data = await fs.readFile(this.methodologyEffectivenessFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Failed to load methodology effectiveness:', error);
      await this.initializeDefaultFiles();
      return await this.loadMethodologyEffectiveness();
    }
  }

  /**
   * Update methodology effectiveness
   */
  async updateMethodologyEffectiveness(updates) {
    const effectiveness = await this.loadMethodologyEffectiveness();
    
    const updatedEffectiveness = {
      ...effectiveness,
      ...updates,
      last_updated: new Date().toISOString()
    };
    
    await fs.writeFile(this.methodologyEffectivenessFile, JSON.stringify(updatedEffectiveness, null, 2));
    logger.debug('Updated methodology effectiveness');
  }

  /**
   * Load dependency patterns
   */
  async loadDependencyPatterns() {
    try {
      const data = await fs.readFile(this.dependencyPatternsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Failed to load dependency patterns:', error);
      await this.initializeDefaultFiles();
      return await this.loadDependencyPatterns();
    }
  }

  /**
   * Update dependency patterns
   */
  async updateDependencyPattern(componentType, patternData) {
    const patterns = await this.loadDependencyPatterns();
    
    if (!patterns.common_dependencies[componentType]) {
      patterns.common_dependencies[componentType] = patternData;
    } else {
      patterns.common_dependencies[componentType] = {
        ...patterns.common_dependencies[componentType],
        ...patternData
      };
    }
    
    patterns.last_updated = new Date().toISOString();
    await fs.writeFile(this.dependencyPatternsFile, JSON.stringify(patterns, null, 2));
    logger.debug(`Updated dependency pattern for: ${componentType}`);
  }

  /**
   * Store approval document in persistent storage
   */
  async storeApprovalDocument(projectId, approvalId, content, metadata = {}) {
    const approvalDir = path.join(this.approvalBasePath, projectId);
    await this.ensureDirectoryExists(approvalDir);
    
    const filePath = path.join(approvalDir, `${approvalId}.md`);
    const fullContent = `---
metadata:
  id: ${approvalId}
  project_id: ${projectId}
  created_at: ${new Date().toISOString()}
  ${Object.entries(metadata).map(([key, value]) => `${key}: ${value}`).join('\n  ')}
---

${content}`;
    
    await fs.writeFile(filePath, fullContent);
    logger.debug(`Stored approval document: ${approvalId}`);
    return filePath;
  }

  /**
   * Load approval document
   */
  async loadApprovalDocument(projectId, approvalId) {
    try {
      const filePath = path.join(this.approvalBasePath, projectId, `${approvalId}.md`);
      const content = await fs.readFile(filePath, 'utf8');
      
      // Parse metadata and content
      const metadataMatch = content.match(/^---\n(.*?)\n---\n\n(.*)$/s);
      if (metadataMatch) {
        return {
          metadata: metadataMatch[1],
          content: metadataMatch[2]
        };
      }
      
      return { content };
    } catch (error) {
      logger.error(`Failed to load approval document ${approvalId}:`, error);
      return null;
    }
  }

  /**
   * Store knowledge document
   */
  async storeKnowledgeDocument(category, filename, content, projectId = null) {
    const baseDir = projectId 
      ? path.join(this.knowledgeBasePath, 'projects', projectId)
      : path.join(this.knowledgeBasePath, category);
    
    await this.ensureDirectoryExists(baseDir);
    
    const filePath = path.join(baseDir, filename);
    await fs.writeFile(filePath, content);
    
    logger.debug(`Stored knowledge document: ${category}/${filename}`);
    return filePath;
  }

  /**
   * Load user patterns for personalization
   */
  async loadUserPatterns() {
    try {
      const data = await fs.readFile(this.userPatternsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      logger.error('Failed to load user patterns:', error);
      await this.initializeDefaultFiles();
      return await this.loadUserPatterns();
    }
  }

  /**
   * Update user behavior patterns
   */
  async updateUserPattern(category, patternData) {
    const patterns = await this.loadUserPatterns();
    
    if (!patterns[category]) {
      patterns[category] = {};
    }
    
    patterns[category] = {
      ...patterns[category],
      ...patternData,
      last_updated: new Date().toISOString()
    };
    
    await fs.writeFile(this.userPatternsFile, JSON.stringify(patterns, null, 2));
    logger.debug(`Updated user pattern: ${category}`);
  }

  /**
   * Get learning summary for analytics
   */
  async getLearningAnalytics() {
    const globalPatterns = await this.loadGlobalPatterns();
    const effectiveness = await this.loadMethodologyEffectiveness();
    const userPatterns = await this.loadUserPatterns();
    
    // Calculate summary statistics
    const totalPatterns = Object.values(globalPatterns)
      .filter(value => Array.isArray(value))
      .reduce((total, patterns) => total + patterns.length, 0);
    
    const avgConfidence = Object.values(globalPatterns)
      .filter(value => Array.isArray(value))
      .flat()
      .reduce((sum, pattern, index, arr) => sum + (pattern.confidence || 0.5), 0) / 
      Math.max(totalPatterns, 1);
    
    return {
      totalPatterns,
      avgConfidence,
      methodologyEffectiveness: effectiveness,
      patternCategories: Object.keys(globalPatterns).filter(key => 
        Array.isArray(globalPatterns[key])
      ),
      userPreferences: userPatterns,
      lastUpdated: new Date().toISOString()
    };
  }

  /**
   * Backup learning data
   */
  async backupLearningData() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(this.learningBasePath, 'backups', timestamp);
    
    await this.ensureDirectoryExists(backupDir);
    
    // Backup all learning files
    const filesToBackup = [
      this.globalPatternsFile,
      this.methodologyEffectivenessFile,
      this.dependencyPatternsFile,
      this.userPatternsFile
    ];
    
    for (const sourceFile of filesToBackup) {
      try {
        const filename = path.basename(sourceFile);
        const backupFile = path.join(backupDir, filename);
        const content = await fs.readFile(sourceFile, 'utf8');
        await fs.writeFile(backupFile, content);
      } catch (error) {
        logger.warn(`Failed to backup ${sourceFile}:`, error);
      }
    }
    
    logger.info(`Learning data backed up to: ${backupDir}`);
    return backupDir;
  }
}

// Export singleton instance
export const jsonLearningStorage = new JSONLearningStorage();