-- Base Schema for BMAD Context Engineering System
-- Migration 000: Create base tables

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  methodology TEXT DEFAULT 'general',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT -- JSON for project-specific configuration
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo',
  priority TEXT DEFAULT 'medium',
  assigned_to TEXT DEFAULT 'human',
  column_order INTEGER DEFAULT 0,
  estimated_hours REAL,
  actual_hours REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  -- Enhanced methodology fields
  methodology_type TEXT DEFAULT 'general',
  validation_status TEXT DEFAULT 'pending',
  command_source TEXT,
  metadata TEXT, -- JSON for task-specific data
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Project state table (replaces session.json)
CREATE TABLE IF NOT EXISTS project_state (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  current_command TEXT,
  current_step TEXT,
  current_prototype TEXT,
  step_context TEXT, -- JSON for step-specific data
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- =====================================================
-- METHODOLOGY TABLES
-- =====================================================

-- Project settings for methodology configuration
CREATE TABLE IF NOT EXISTS project_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  setting_key TEXT NOT NULL,
  setting_value TEXT NOT NULL, -- JSON value
  setting_type TEXT DEFAULT 'user', -- user, bmad, sage, archon
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, setting_key),
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Approval system for web-based approvals
CREATE TABLE IF NOT EXISTS approvals (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  approval_type TEXT NOT NULL, -- settings, implementation, optimization, qa
  approval_category TEXT NOT NULL, -- bmad_gates, sage_patterns, archon_agents
  source_command TEXT NOT NULL, -- plan, implement, optimize, qa
  title TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown content
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  metadata TEXT, -- JSON for approval-specific data
  rejection_reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Learning sessions for SAGE
CREATE TABLE IF NOT EXISTS learning_sessions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  session_type TEXT NOT NULL, -- plan, implement, optimize, qa
  learning_mode TEXT NOT NULL, -- active, passive, hybrid
  session_metadata TEXT NOT NULL, -- JSON for session configuration
  status TEXT DEFAULT 'active', -- active, completed, failed
  insights_captured INTEGER DEFAULT 0,
  patterns_identified INTEGER DEFAULT 0,
  adaptations_applied INTEGER DEFAULT 0,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Learning insights for cross-project intelligence
CREATE TABLE IF NOT EXISTS learning_insights (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  insight_type TEXT NOT NULL, -- success_pattern, failure_pattern, optimization, dependency
  insight_data TEXT NOT NULL, -- JSON with insight details
  confidence_score REAL DEFAULT 0.5,
  application_count INTEGER DEFAULT 0,
  success_rate REAL DEFAULT 0.0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES learning_sessions(id) ON DELETE CASCADE
);

-- Adaptation patterns for SAGE learning
CREATE TABLE IF NOT EXISTS adaptation_patterns (
  id TEXT PRIMARY KEY,
  pattern_type TEXT NOT NULL, -- implementation, optimization, quality_assurance
  pattern_name TEXT NOT NULL,
  pattern_data TEXT NOT NULL, -- JSON with pattern configuration
  effectiveness_score REAL DEFAULT 0.5,
  usage_count INTEGER DEFAULT 0,
  success_contexts TEXT, -- JSON array of successful application contexts
  failure_contexts TEXT, -- JSON array of failed application contexts
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_methodology_type ON tasks(methodology_type);
CREATE INDEX IF NOT EXISTS idx_project_state_project_id ON project_state(project_id);
CREATE INDEX IF NOT EXISTS idx_project_settings_project_id ON project_settings(project_id);
CREATE INDEX IF NOT EXISTS idx_approvals_project_id ON approvals(project_id);
CREATE INDEX IF NOT EXISTS idx_approvals_status ON approvals(status);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_project_id ON learning_sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_learning_insights_session_id ON learning_insights(session_id);