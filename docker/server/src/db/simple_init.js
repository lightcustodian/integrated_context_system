import Database from 'better-sqlite3';
import { logger } from '../utils/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = null;

export function initSimpleDatabase() {
  try {
    const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '..', '..', 'data', 'bmad.db');
    
    // Ensure data directory exists
    const dataDir = path.dirname(dbPath);
    mkdirSync(dataDir, { recursive: true });
    
    logger.info(`Initializing SQLite database at: ${dbPath}`);
    
    db = new Database(dbPath);
    
    // Create basic tables for development
    db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'active',
        methodology TEXT DEFAULT 'general',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        metadata TEXT
      );

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
        methodology_type TEXT DEFAULT 'general',
        validation_status TEXT DEFAULT 'pending',
        command_source TEXT,
        metadata TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
      CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
    `);
    
    logger.info('Simple database initialized successfully');
    return db;
  } catch (error) {
    logger.error('Failed to initialize simple database:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initSimpleDatabase() first.');
  }
  return db;
}