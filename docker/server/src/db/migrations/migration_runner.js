import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class MigrationRunner {
  constructor(db) {
    this.db = db;
    this.migrationsDir = __dirname;
    this.setupMigrationTable();
  }

  setupMigrationTable() {
    // Create migration tracking table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS migrations (
        id TEXT PRIMARY KEY,
        filename TEXT NOT NULL UNIQUE,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        success BOOLEAN DEFAULT TRUE,
        error_message TEXT
      )
    `);
  }

  getAppliedMigrations() {
    const stmt = this.db.prepare('SELECT filename FROM migrations WHERE success = TRUE');
    return stmt.all().map(row => row.filename);
  }

  getPendingMigrations() {
    const allMigrations = readdirSync(this.migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    const appliedMigrations = this.getAppliedMigrations();
    return allMigrations.filter(migration => !appliedMigrations.includes(migration));
  }

  async runMigration(filename) {
    const migrationPath = join(this.migrationsDir, filename);
    const migrationId = `migration_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      logger.info(`Running migration: ${filename}`);
      
      const migrationSQL = readFileSync(migrationPath, 'utf8');
      
      // Execute migration in a transaction
      const transaction = this.db.transaction(() => {
        // Split by semicolon and execute each statement
        const statements = migrationSQL
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt.length > 0);
        
        for (const statement of statements) {
          if (statement.trim()) {
            this.db.exec(statement);
          }
        }
        
        // Record successful migration
        this.db.prepare(`
          INSERT INTO migrations (id, filename, applied_at, success)
          VALUES (?, ?, CURRENT_TIMESTAMP, TRUE)
        `).run(migrationId, filename);
      });
      
      transaction();
      logger.info(`Migration completed successfully: ${filename}`);
      return { success: true };
      
    } catch (error) {
      logger.error(`Migration failed: ${filename}`, error);
      
      // Record failed migration
      try {
        this.db.prepare(`
          INSERT INTO migrations (id, filename, applied_at, success, error_message)
          VALUES (?, ?, CURRENT_TIMESTAMP, FALSE, ?)
        `).run(migrationId, filename, error.message);
      } catch (recordError) {
        logger.error('Failed to record migration failure:', recordError);
      }
      
      return { success: false, error: error.message };
    }
  }

  async runPendingMigrations() {
    const pendingMigrations = this.getPendingMigrations();
    
    if (pendingMigrations.length === 0) {
      logger.info('No pending migrations to run');
      return { success: true, migrationsRun: 0 };
    }
    
    logger.info(`Found ${pendingMigrations.length} pending migrations`);
    const results = [];
    
    for (const migration of pendingMigrations) {
      const result = await this.runMigration(migration);
      results.push({ migration, ...result });
      
      if (!result.success) {
        logger.error(`Migration failed, stopping migration process: ${migration}`);
        break;
      }
    }
    
    const successfulMigrations = results.filter(r => r.success).length;
    const failedMigrations = results.filter(r => !r.success).length;
    
    logger.info(`Migration summary: ${successfulMigrations} successful, ${failedMigrations} failed`);
    
    return {
      success: failedMigrations === 0,
      migrationsRun: successfulMigrations,
      failed: failedMigrations,
      results
    };
  }

  // Utility method to check if specific migration has been applied
  isMigrationApplied(filename) {
    const stmt = this.db.prepare('SELECT COUNT(*) as count FROM migrations WHERE filename = ? AND success = TRUE');
    const result = stmt.get(filename);
    return result.count > 0;
  }

  // Rollback capability (for development use)
  async rollbackLastMigration() {
    const stmt = this.db.prepare(`
      SELECT filename FROM migrations 
      WHERE success = TRUE 
      ORDER BY applied_at DESC 
      LIMIT 1
    `);
    const lastMigration = stmt.get();
    
    if (!lastMigration) {
      logger.info('No migrations to rollback');
      return { success: true, message: 'No migrations to rollback' };
    }
    
    logger.warn(`Rolling back migration: ${lastMigration.filename}`);
    logger.warn('Note: This only removes the migration record. Schema changes are NOT automatically reversed.');
    
    try {
      this.db.prepare('DELETE FROM migrations WHERE filename = ?').run(lastMigration.filename);
      return { success: true, rolledBack: lastMigration.filename };
    } catch (error) {
      logger.error('Rollback failed:', error);
      return { success: false, error: error.message };
    }
  }
}