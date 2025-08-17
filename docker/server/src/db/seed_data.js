import { getDatabase } from './simple_init.js';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';

export function seedSampleData() {
  try {
    const db = getDatabase();
    
    // Check if data already exists
    const existingProjects = db.prepare('SELECT COUNT(*) as count FROM projects').get();
    if (existingProjects.count > 0) {
      logger.info('Sample data already exists, skipping seed');
      return;
    }
    
    logger.info('Seeding sample data...');
    
    // Create sample projects
    const projects = [
      {
        id: 'simple_todo_application',
        name: 'Simple Todo Application',
        description: 'A basic todo application for testing drag functionality',
        status: 'active',
        methodology: 'general'
      },
      {
        id: 'integrated_context_system',
        name: 'Integrated Context System',
        description: 'Main project for BMAD+SAGE+Archon integration',
        status: 'active',
        methodology: 'bmad'
      },
      {
        id: 'ce_integration_test_project',
        name: 'CE Integration Test Project',
        description: 'Testing project for Context Engineering features',
        status: 'active',
        methodology: 'sage'
      }
    ];
    
    const insertProject = db.prepare(`
      INSERT INTO projects (id, name, description, status, methodology, metadata)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    for (const project of projects) {
      insertProject.run(
        project.id,
        project.name,
        project.description,
        project.status,
        project.methodology,
        JSON.stringify({ seeded: true })
      );
    }
    
    // Create sample tasks
    const tasks = [
      // Simple Todo Application tasks
      {
        project_id: 'simple_todo_application',
        title: 'Set up project structure',
        description: 'Create basic project files and folders',
        status: 'done',
        priority: 'high'
      },
      {
        project_id: 'simple_todo_application',
        title: 'Implement task creation',
        description: 'Add ability to create new tasks',
        status: 'done',
        priority: 'medium'
      },
      {
        project_id: 'simple_todo_application',
        title: 'Add drag and drop functionality',
        description: 'Enable moving tasks between columns',
        status: 'in-progress',
        priority: 'high'
      },
      {
        project_id: 'simple_todo_application',
        title: 'Style the interface',
        description: 'Make the UI look nice',
        status: 'todo',
        priority: 'low'
      },
      
      // Integrated Context System tasks
      {
        project_id: 'integrated_context_system',
        title: 'BMAD Framework Integration',
        description: 'Integrate Business Methodology and Development framework',
        status: 'in-progress',
        priority: 'high',
        methodology_type: 'bmad'
      },
      {
        project_id: 'integrated_context_system',
        title: 'SAGE Learning System',
        description: 'Implement Self-Adaptive Growth Engine',
        status: 'review',
        priority: 'high',
        methodology_type: 'sage'
      },
      {
        project_id: 'integrated_context_system',
        title: 'Archon Agent Generation',
        description: 'Create dynamic agent generation system',
        status: 'todo',
        priority: 'medium',
        methodology_type: 'archon'
      },
      
      // CE Integration Test Project tasks
      {
        project_id: 'ce_integration_test_project',
        title: 'Test BMAD validation gates',
        description: 'Verify BMAD quality gates work correctly',
        status: 'todo',
        priority: 'medium',
        methodology_type: 'bmad'
      },
      {
        project_id: 'ce_integration_test_project',
        title: 'Test SAGE learning patterns',
        description: 'Validate SAGE cross-project learning',
        status: 'todo',
        priority: 'medium',
        methodology_type: 'sage'
      },
      {
        project_id: 'ce_integration_test_project',
        title: 'Test Archon agent effectiveness',
        description: 'Measure Archon agent performance',
        status: 'todo',
        priority: 'low',
        methodology_type: 'archon'
      }
    ];
    
    const insertTask = db.prepare(`
      INSERT INTO tasks (
        id, project_id, title, description, status, priority, assigned_to,
        column_order, methodology_type, validation_status, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    tasks.forEach((task, index) => {
      insertTask.run(
        uuidv4(),
        task.project_id,
        task.title,
        task.description,
        task.status,
        task.priority,
        'human',
        index,
        task.methodology_type || 'general',
        'pending',
        JSON.stringify({ seeded: true })
      );
    });
    
    logger.info(`Seeded ${projects.length} projects and ${tasks.length} tasks`);
    
  } catch (error) {
    logger.error('Failed to seed sample data:', error);
  }
}