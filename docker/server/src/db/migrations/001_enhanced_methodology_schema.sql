-- Enhanced Database Schema for BMAD+SAGE+Archon Integration
-- Migration 001: Add methodology-specific tables and enhance existing tables

-- =====================================================
-- ENHANCED EXISTING TABLES
-- =====================================================

-- Enhance tasks table with methodology support
ALTER TABLE tasks ADD COLUMN methodology_type TEXT DEFAULT 'general';
ALTER TABLE tasks ADD COLUMN task_metadata TEXT; -- JSON for methodology-specific data
ALTER TABLE tasks ADD COLUMN prototype_number INTEGER;
ALTER TABLE tasks ADD COLUMN is_prototype BOOLEAN DEFAULT FALSE;
ALTER TABLE tasks ADD COLUMN command_source TEXT; -- plan, implement, optimize, qa
ALTER TABLE tasks ADD COLUMN validation_status TEXT DEFAULT 'pending';

-- Enhance project_state table to replace session.json functionality
ALTER TABLE project_state ADD COLUMN current_command TEXT;
ALTER TABLE project_state ADD COLUMN current_step TEXT;
ALTER TABLE project_state ADD COLUMN current_prototype TEXT;
ALTER TABLE project_state ADD COLUMN step_context TEXT; -- JSON for step-specific data
ALTER TABLE project_state ADD COLUMN command_history TEXT; -- JSON array of command execution history

-- =====================================================
-- NEW METHODOLOGY CONFIGURATION TABLES
-- =====================================================

-- Project Settings (replaces DESIGN_PLAN template approach)
CREATE TABLE project_settings (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  setting_name TEXT NOT NULL,
  setting_value TEXT NOT NULL, -- NONE, MINIMAL, STANDARD, COMPREHENSIVE
  methodology TEXT NOT NULL, -- bmad, sage, archon, general
  description TEXT,
  impact_description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  UNIQUE(project_id, setting_name)
);

-- =====================================================
-- APPROVAL WORKFLOW SYSTEM
-- =====================================================

-- Approval Documents and Workflow
CREATE TABLE approvals (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  command TEXT NOT NULL,
  phase TEXT NOT NULL,
  approval_type TEXT NOT NULL, -- understanding, plan, prototype, settings
  title TEXT NOT NULL,
  content TEXT, -- markdown content
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  rejection_reason TEXT,
  auto_approve BOOLEAN DEFAULT FALSE, -- for settings that can't be rejected
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- =====================================================
-- SAGE LEARNING SYSTEM
-- =====================================================

-- Learning Sessions for SAGE pattern capture
CREATE TABLE learning_sessions (
  id TEXT PRIMARY KEY,
  project_id TEXT,
  command TEXT NOT NULL,
  methodology TEXT,
  context_data TEXT, -- JSON: project complexity, tech stack, etc.
  execution_data TEXT, -- JSON: approaches tried, outcomes, timing
  success_metrics TEXT, -- JSON: measurable results
  lessons_learned TEXT,
  pattern_signature TEXT, -- hash for similar situation recognition
  confidence_score REAL DEFAULT 0.5,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Pattern Recognition for Adaptive Behavior
CREATE TABLE adaptation_patterns (
  id TEXT PRIMARY KEY,
  pattern_type TEXT NOT NULL, -- dependency_change, failure_recovery, optimization
  pattern_name TEXT NOT NULL,
  situation_context TEXT, -- JSON: when this pattern applies
  recommended_actions TEXT, -- JSON: what to do
  success_rate REAL DEFAULT 0.5,
  usage_count INTEGER DEFAULT 1,
  auto_apply BOOLEAN DEFAULT FALSE, -- whether to apply automatically
  confidence_threshold REAL DEFAULT 0.7,
  last_used DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Dependency Tracking for SAGE change impact analysis
CREATE TABLE dependency_tracking (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  component_name TEXT NOT NULL,
  component_type TEXT, -- file, module, feature, prototype
  depends_on TEXT, -- JSON array of component names
  dependent_components TEXT, -- JSON array of component names that depend on this
  last_modified DATETIME DEFAULT CURRENT_TIMESTAMP,
  modification_impact TEXT, -- JSON: what changes might affect
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  UNIQUE(project_id, component_name)
);

-- =====================================================
-- METHODOLOGY-SPECIFIC METADATA
-- =====================================================

-- BMAD Validation Gates
CREATE TABLE validation_gates (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  gate_name TEXT NOT NULL,
  gate_type TEXT, -- security, performance, usability, integration
  criteria TEXT, -- JSON: validation criteria
  status TEXT DEFAULT 'pending', -- pending, passed, failed, skipped
  methodology TEXT DEFAULT 'bmad',
  prototype_number INTEGER,
  validation_results TEXT, -- JSON: detailed results
  validated_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Archon Agent Generation Tracking
CREATE TABLE generated_agents (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  agent_type TEXT, -- code_reviewer, security_scanner, performance_analyzer
  generation_context TEXT, -- JSON: why this agent was generated
  capabilities TEXT, -- JSON: what this agent can do
  knowledge_sources TEXT, -- JSON: documentation and knowledge used
  configuration TEXT, -- JSON: agent-specific configuration
  active BOOLEAN DEFAULT TRUE,
  generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_used DATETIME,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- =====================================================
-- TRACKING AND MODIFICATION HISTORY
-- =====================================================

-- Task Modifications for conflict resolution
CREATE TABLE task_modifications (
  id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL,
  changes TEXT, -- JSON: what was changed
  source TEXT, -- web, cli, system
  user_context TEXT, -- JSON: additional context about the change
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Learning Pattern Usage Tracking
CREATE TABLE pattern_usage (
  id TEXT PRIMARY KEY,
  pattern_id TEXT NOT NULL,
  project_id TEXT,
  usage_context TEXT, -- JSON: when and how the pattern was used
  effectiveness REAL, -- 0.0 to 1.0 rating of how well it worked
  feedback TEXT, -- user or system feedback on the pattern
  used_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pattern_id) REFERENCES adaptation_patterns(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Settings and Configuration Indexes
CREATE INDEX idx_project_settings_project_id ON project_settings(project_id);
CREATE INDEX idx_project_settings_methodology ON project_settings(methodology);

-- Approval Workflow Indexes
CREATE INDEX idx_approvals_project_id ON approvals(project_id);
CREATE INDEX idx_approvals_status ON approvals(status);
CREATE INDEX idx_approvals_command_phase ON approvals(command, phase);

-- Learning System Indexes
CREATE INDEX idx_learning_sessions_project_id ON learning_sessions(project_id);
CREATE INDEX idx_learning_sessions_pattern_signature ON learning_sessions(pattern_signature);
CREATE INDEX idx_learning_sessions_command ON learning_sessions(command);

CREATE INDEX idx_adaptation_patterns_type ON adaptation_patterns(pattern_type);
CREATE INDEX idx_adaptation_patterns_auto_apply ON adaptation_patterns(auto_apply);

CREATE INDEX idx_dependency_tracking_project_id ON dependency_tracking(project_id);
CREATE INDEX idx_dependency_tracking_component ON dependency_tracking(component_name);

-- Methodology-Specific Indexes
CREATE INDEX idx_validation_gates_project_id ON validation_gates(project_id);
CREATE INDEX idx_validation_gates_status ON validation_gates(status);
CREATE INDEX idx_validation_gates_prototype ON validation_gates(prototype_number);

CREATE INDEX idx_generated_agents_project_id ON generated_agents(project_id);
CREATE INDEX idx_generated_agents_active ON generated_agents(active);

-- History and Tracking Indexes
CREATE INDEX idx_task_modifications_task_id ON task_modifications(task_id);
CREATE INDEX idx_task_modifications_source ON task_modifications(source);
CREATE INDEX idx_pattern_usage_pattern_id ON pattern_usage(pattern_id);
CREATE INDEX idx_pattern_usage_effectiveness ON pattern_usage(effectiveness);

-- Enhanced Task Indexes
CREATE INDEX idx_tasks_methodology_type ON tasks(methodology_type);
CREATE INDEX idx_tasks_prototype ON tasks(is_prototype, prototype_number);
CREATE INDEX idx_tasks_command_source ON tasks(command_source);
CREATE INDEX idx_tasks_validation_status ON tasks(validation_status);

-- =====================================================
-- UPDATED TRIGGERS
-- =====================================================

-- Update triggers for new tables
CREATE TRIGGER update_project_settings_timestamp 
AFTER UPDATE ON project_settings
BEGIN
  UPDATE project_settings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_approvals_timestamp 
AFTER UPDATE ON approvals
BEGIN
  UPDATE approvals SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Dependency tracking automatic update
CREATE TRIGGER update_dependency_modification
AFTER UPDATE ON dependency_tracking
BEGIN
  UPDATE dependency_tracking SET last_modified = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- =====================================================
-- DEFAULT SETTINGS FOR NEW PROJECTS
-- =====================================================

-- Insert default methodology settings (these will be used as templates)
INSERT OR REPLACE INTO project_settings (id, project_id, setting_name, setting_value, methodology, description, impact_description) VALUES
-- BMAD Settings
('default_bmad_security', 'DEFAULT_TEMPLATE', 'security_testing', 'MINIMAL', 'bmad', 'Security validation and testing requirements', 'NONE: No security testing, MINIMAL: Basic security checks, STANDARD: Comprehensive security testing, COMPREHENSIVE: Advanced security auditing'),
('default_bmad_performance', 'DEFAULT_TEMPLATE', 'performance_testing', 'MINIMAL', 'bmad', 'Performance validation and benchmarking', 'NONE: No performance testing, MINIMAL: Basic performance checks, STANDARD: Load testing and optimization, COMPREHENSIVE: Advanced performance profiling'),
('default_bmad_integration', 'DEFAULT_TEMPLATE', 'integration_testing', 'STANDARD', 'bmad', 'Integration and system testing requirements', 'NONE: Unit tests only, MINIMAL: Basic integration tests, STANDARD: Comprehensive integration testing, COMPREHENSIVE: End-to-end system validation'),
('default_bmad_documentation', 'DEFAULT_TEMPLATE', 'documentation', 'STANDARD', 'bmad', 'Documentation requirements and completeness', 'NONE: Code comments only, MINIMAL: Basic README, STANDARD: User and technical docs, COMPREHENSIVE: Complete documentation suite'),

-- SAGE Settings
('default_sage_learning', 'DEFAULT_TEMPLATE', 'sage_learning_depth', 'STANDARD', 'sage', 'Depth of learning pattern capture and analysis', 'NONE: No learning capture, MINIMAL: Basic pattern recording, STANDARD: Comprehensive learning analysis, COMPREHENSIVE: Advanced pattern recognition'),
('default_sage_adaptation', 'DEFAULT_TEMPLATE', 'sage_adaptation_level', 'STANDARD', 'sage', 'Level of automatic adaptation and improvement', 'NONE: No adaptations, MINIMAL: Manual pattern application, STANDARD: Semi-automatic adaptation, COMPREHENSIVE: Fully automatic improvements'),
('default_sage_dependency', 'DEFAULT_TEMPLATE', 'dependency_tracking', 'STANDARD', 'sage', 'Dependency change impact analysis', 'NONE: No dependency tracking, MINIMAL: Basic change detection, STANDARD: Impact analysis with task creation, COMPREHENSIVE: Predictive dependency management'),

-- Archon Settings
('default_archon_generation', 'DEFAULT_TEMPLATE', 'agent_generation', 'MINIMAL', 'archon', 'Automatic AI agent generation for specialized tasks', 'NONE: No agent generation, MINIMAL: Basic specialized agents, STANDARD: Comprehensive agent toolkit, COMPREHENSIVE: Advanced agent ecosystems'),
('default_archon_knowledge', 'DEFAULT_TEMPLATE', 'knowledge_integration', 'STANDARD', 'archon', 'External knowledge base integration depth', 'NONE: No external knowledge, MINIMAL: Basic documentation access, STANDARD: Framework and API documentation, COMPREHENSIVE: Complete knowledge ecosystem'),

-- General Integration Settings
('default_general_mcp', 'DEFAULT_TEMPLATE', 'mcp_integration_scope', 'STANDARD', 'general', 'MCP server integration and capability access', 'NONE: Basic file operations, MINIMAL: Core development tools, STANDARD: Comprehensive tool ecosystem, COMPREHENSIVE: Advanced external integrations'),
('default_general_approval', 'DEFAULT_TEMPLATE', 'approval_workflow_complexity', 'MINIMAL', 'general', 'Approval workflow depth and validation gates', 'NONE: Auto-approve everything, MINIMAL: Essential approvals only, STANDARD: Comprehensive approval workflow, COMPREHENSIVE: Advanced validation gates');

-- =====================================================
-- VIEWS FOR CONVENIENT QUERYING
-- =====================================================

-- Project overview with current state and settings
CREATE VIEW project_overview AS
SELECT 
  p.id,
  p.name,
  p.description,
  p.status,
  p.methodology,
  ps.current_command,
  ps.current_step,
  ps.current_prototype,
  COUNT(t.id) as total_tasks,
  COUNT(CASE WHEN t.status = 'done' THEN 1 END) as completed_tasks,
  COUNT(CASE WHEN t.is_prototype = TRUE THEN 1 END) as total_prototypes,
  COUNT(CASE WHEN a.status = 'pending' THEN 1 END) as pending_approvals,
  p.created_at,
  p.updated_at
FROM projects p
LEFT JOIN project_state ps ON p.id = ps.project_id
LEFT JOIN tasks t ON p.id = t.project_id
LEFT JOIN approvals a ON p.id = a.project_id
GROUP BY p.id;

-- Learning insights view
CREATE VIEW learning_insights AS
SELECT 
  ls.pattern_signature,
  ls.command,
  ls.methodology,
  COUNT(*) as usage_count,
  AVG(ls.confidence_score) as avg_confidence,
  GROUP_CONCAT(DISTINCT ls.lessons_learned) as combined_lessons,
  MAX(ls.created_at) as last_used
FROM learning_sessions ls
GROUP BY ls.pattern_signature, ls.command, ls.methodology;

-- Task methodology distribution view
CREATE VIEW task_methodology_stats AS
SELECT 
  project_id,
  methodology_type,
  command_source,
  COUNT(*) as task_count,
  COUNT(CASE WHEN status = 'done' THEN 1 END) as completed_count,
  COUNT(CASE WHEN is_prototype = TRUE THEN 1 END) as prototype_count
FROM tasks
GROUP BY project_id, methodology_type, command_source;