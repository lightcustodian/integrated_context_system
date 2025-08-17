import Database from 'better-sqlite3';
import path from 'path';
import { logger } from '../utils/logger.js';
import { MigrationRunner } from './migrations/migration_runner.js';

let db;

export async function initDatabase() {
  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'bmad.db');
  
  logger.info(`Initializing SQLite database at: ${dbPath}`);
  
  // Create database connection
  db = new Database(dbPath);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');
  
  // Create tables
  await createTables();
  
  // Run database migrations
  const migrationRunner = new MigrationRunner(db);
  const migrationResult = await migrationRunner.runPendingMigrations();
  
  if (!migrationResult.success) {
    logger.error('Database migration failed:', migrationResult);
    throw new Error('Database migration failed');
  }
  
  if (migrationResult.migrationsRun > 0) {
    logger.info(`Applied ${migrationResult.migrationsRun} database migrations`);
  }
  
  logger.info('Database initialized successfully');
  return db;
}

async function createTables() {
  // Projects table
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT CHECK(status IN ('active', 'completed', 'paused')) DEFAULT 'active',
      methodology TEXT CHECK(methodology IN ('bmad', 'sage', 'archon', 'hybrid')) DEFAULT 'hybrid',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      metadata TEXT
    )
  `);

  // Tasks table
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT CHECK(status IN ('todo', 'in-progress', 'review', 'done')) DEFAULT 'todo',
      priority TEXT CHECK(priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
      assigned_to TEXT CHECK(assigned_to IN ('human', 'claude', 'automated')) DEFAULT 'human',
      column_order INTEGER DEFAULT 0,
      estimated_hours REAL,
      actual_hours REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      metadata TEXT,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    )
  `);

  // Project state table
  db.exec(`
    CREATE TABLE IF NOT EXISTS project_state (
      project_id TEXT PRIMARY KEY,
      current_phase TEXT,
      context TEXT,
      history TEXT,
      last_claude_sync DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    )
  `);

  // Agents table
  db.exec(`
    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      type TEXT CHECK(type IN ('bmad', 'sage', 'archon', 'custom')) DEFAULT 'custom',
      description TEXT,
      capabilities TEXT,
      configuration TEXT,
      active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Transaction log for recovery
  db.exec(`
    CREATE TABLE IF NOT EXISTS transaction_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      operation TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      old_value TEXT,
      new_value TEXT,
      user_source TEXT,
      success BOOLEAN DEFAULT 1,
      error_message TEXT
    )
  `);

  // Create indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
    CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
    CREATE INDEX IF NOT EXISTS idx_transaction_log_timestamp ON transaction_log(timestamp);
  `);

  // Create triggers for updated_at
  db.exec(`
    CREATE TRIGGER IF NOT EXISTS update_projects_timestamp 
    AFTER UPDATE ON projects
    BEGIN
      UPDATE projects SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

    CREATE TRIGGER IF NOT EXISTS update_tasks_timestamp 
    AFTER UPDATE ON tasks
    BEGIN
      UPDATE tasks SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

    CREATE TRIGGER IF NOT EXISTS update_project_state_timestamp 
    AFTER UPDATE ON project_state
    BEGIN
      UPDATE project_state SET updated_at = CURRENT_TIMESTAMP WHERE project_id = NEW.project_id;
    END;

    CREATE TRIGGER IF NOT EXISTS update_agents_timestamp 
    AFTER UPDATE ON agents
    BEGIN
      UPDATE agents SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;
  `);
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

// Transaction logging helper
export async function logTransaction(operation, entityType, entityId, oldValue, newValue, userSource, success = true, errorMessage = null) {
  try {
    const stmt = db.prepare(
      `INSERT INTO transaction_log (operation, entity_type, entity_id, old_value, new_value, user_source, success, error_message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    
    stmt.run(
      operation, entityType, entityId,
      oldValue ? JSON.stringify(oldValue) : null,
      newValue ? JSON.stringify(newValue) : null,
      userSource, success ? 1 : 0, errorMessage
    );
  } catch (error) {
    logger.error('Failed to log transaction:', error);
  }
}