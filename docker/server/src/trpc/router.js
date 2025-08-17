import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../db/simple_init.js';
import { logger } from '../utils/logger.js';

const t = initTRPC.context().create();

export const createContext = ({ req, res, io }) => {
  return {
    req,
    res,
    io,
    userSource: req.headers['x-source'] || 'web'
  };
};

const router = t.router;
const publicProcedure = t.procedure;

// Project procedures
const projectRouter = router({
  list: publicProcedure
    .query(async () => {
      const db = getDatabase();
      const projects = db.prepare(`
        SELECT p.*, ps.current_phase, ps.context 
        FROM projects p
        LEFT JOIN project_state ps ON p.id = ps.project_id
        ORDER BY p.updated_at DESC
      `).all();
      
      return projects.map(p => ({
        ...p,
        metadata: p.metadata ? JSON.parse(p.metadata) : {},
        context: p.context ? JSON.parse(p.context) : {}
      }));
    }),

  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const db = getDatabase();
      const project = db.prepare(`
        SELECT p.*, ps.current_phase, ps.context, ps.history 
        FROM projects p
        LEFT JOIN project_state ps ON p.id = ps.project_id
        WHERE p.id = ?
      `).get(input.id);
      
      if (!project) throw new Error('Project not found');
      
      return {
        ...project,
        metadata: project.metadata ? JSON.parse(project.metadata) : {},
        context: project.context ? JSON.parse(project.context) : {},
        history: project.history ? JSON.parse(project.history) : []
      };
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      methodology: z.enum(['bmad', 'sage', 'archon', 'hybrid']).default('hybrid'),
      metadata: z.record(z.any()).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDatabase();
      const id = uuidv4();
      
      db.prepare(`
        INSERT INTO projects (id, name, description, methodology, metadata)
        VALUES (?, ?, ?, ?, ?)
      `).run(id, input.name, input.description, input.methodology, JSON.stringify(input.metadata || {}));

      db.prepare(`
        INSERT INTO project_state (project_id, current_phase, context, history)
        VALUES (?, ?, ?, ?)
      `).run(id, 'planning', '{}', '[]');

      // Transaction logging disabled for simple setup
      
      // Emit socket event
      ctx.io?.emit('project:created', { id, ...input });
      
      return { id, ...input };
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(['active', 'completed', 'paused']).optional(),
      metadata: z.record(z.any()).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDatabase();
      const { id, ...updates } = input;
      
      const oldProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);
      
      if (updates.metadata) {
        updates.metadata = JSON.stringify(updates.metadata);
      }
      
      const fields = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = Object.values(updates);
      
      db.prepare(`UPDATE projects SET ${fields} WHERE id = ?`).run(...values, id);
      
      // Transaction logging disabled for simple setup
      
      // Emit socket event
      ctx.io?.emit('project:updated', { id, ...updates });
      
      return { id, ...updates };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const db = getDatabase();
      
      const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(input.id);
      db.prepare('DELETE FROM projects WHERE id = ?').run(input.id);
      
      // Transaction logging disabled for simple setup
      
      // Emit socket event
      ctx.io?.emit('project:deleted', { id: input.id });
      
      return { success: true };
    })
});

// Task procedures
const taskRouter = router({
  listByProject: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const db = getDatabase();
      const tasks = db.prepare(`
        SELECT * FROM tasks 
        WHERE project_id = ? 
        ORDER BY column_order, created_at
      `).all(input.projectId);
      
      return tasks.map(t => ({
        ...t,
        metadata: t.metadata ? JSON.parse(t.metadata) : {}
      }));
    }),

  create: publicProcedure
    .input(z.object({
      projectId: z.string(),
      title: z.string(),
      description: z.string().optional(),
      status: z.enum(['todo', 'in-progress', 'review', 'done']).default('todo'),
      priority: z.enum(['low', 'medium', 'high']).default('medium'),
      assignedTo: z.enum(['human', 'claude', 'automated']).default('human'),
      estimatedHours: z.number().optional(),
      metadata: z.record(z.any()).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDatabase();
      const id = uuidv4();
      
      // Get max column order for the status
      const maxOrder = db.prepare(`
        SELECT MAX(column_order) as max_order 
        FROM tasks 
        WHERE project_id = ? AND status = ?
      `).get(input.projectId, input.status);
      
      const columnOrder = (maxOrder?.max_order || 0) + 1;
      
      db.prepare(`
        INSERT INTO tasks (id, project_id, title, description, status, priority, assigned_to, column_order, estimated_hours, metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(id, input.projectId, input.title, input.description, input.status, input.priority, 
          input.assignedTo, columnOrder, input.estimatedHours, JSON.stringify(input.metadata || {}));

      // Transaction logging disabled for simple setup
      
      // Emit socket event
      ctx.io?.emit('task:created', { id, ...input });
      
      return { id, ...input };
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(['todo', 'in-progress', 'review', 'done']).optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      assignedTo: z.enum(['human', 'claude', 'automated']).optional(),
      columnOrder: z.number().optional(),
      actualHours: z.number().optional(),
      metadata: z.record(z.any()).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDatabase();
      const { id, ...updates } = input;
      
      const oldTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
      
      if (updates.metadata) {
        updates.metadata = JSON.stringify(updates.metadata);
      }
      
      // Handle column_order for status changes
      if (updates.status && updates.status !== oldTask.status) {
        const maxOrder = db.prepare(`
          SELECT MAX(column_order) as max_order 
          FROM tasks 
          WHERE project_id = ? AND status = ?
        `).get(oldTask.project_id, updates.status);
        
        updates.column_order = (maxOrder?.max_order || 0) + 1;
      }
      
      const fields = Object.keys(updates).map(k => `${k} = ?`).join(', ');
      const values = Object.values(updates);
      
      db.prepare(`UPDATE tasks SET ${fields} WHERE id = ?`).run(...values, id);
      
      // Transaction logging disabled for simple setup
      
      // Emit socket event
      ctx.io?.emit('task:updated', { id, projectId: oldTask.project_id, ...updates });
      
      return { id, ...updates };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const db = getDatabase();
      
      const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(input.id);
      db.prepare('DELETE FROM tasks WHERE id = ?').run(input.id);
      
      // Transaction logging disabled for simple setup
      
      // Emit socket event
      ctx.io?.emit('task:deleted', { id: input.id, projectId: task.project_id });
      
      return { success: true };
    }),

  reorder: publicProcedure
    .input(z.object({
      taskId: z.string(),
      newStatus: z.enum(['todo', 'in-progress', 'review', 'done']),
      newOrder: z.number()
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDatabase();
      
      const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(input.taskId);
      
      // Start transaction
      const updateOthers = db.prepare(`
        UPDATE tasks 
        SET column_order = column_order + 1 
        WHERE project_id = ? AND status = ? AND column_order >= ?
      `);
      
      const updateTask = db.prepare(`
        UPDATE tasks 
        SET status = ?, column_order = ? 
        WHERE id = ?
      `);
      
      db.transaction(() => {
        updateOthers.run(task.project_id, input.newStatus, input.newOrder);
        updateTask.run(input.newStatus, input.newOrder, input.taskId);
      })();
      
      // Emit socket event
      ctx.io?.emit('task:reordered', { 
        id: input.taskId, 
        projectId: task.project_id,
        newStatus: input.newStatus,
        newOrder: input.newOrder 
      });
      
      return { success: true };
    })
});

// State procedures
const stateRouter = router({
  get: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const db = getDatabase();
      const state = db.prepare('SELECT * FROM project_state WHERE project_id = ?').get(input.projectId);
      
      if (!state) return null;
      
      return {
        ...state,
        context: state.context ? JSON.parse(state.context) : {},
        history: state.history ? JSON.parse(state.history) : []
      };
    }),

  update: publicProcedure
    .input(z.object({
      projectId: z.string(),
      currentPhase: z.string().optional(),
      context: z.record(z.any()).optional(),
      addToHistory: z.object({
        action: z.string(),
        timestamp: z.string(),
        details: z.record(z.any())
      }).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDatabase();
      const { projectId, addToHistory, ...updates } = input;
      
      if (addToHistory) {
        const currentState = db.prepare('SELECT history FROM project_state WHERE project_id = ?').get(projectId);
        const history = currentState?.history ? JSON.parse(currentState.history) : [];
        history.push(addToHistory);
        updates.history = JSON.stringify(history);
      }
      
      if (updates.context) {
        updates.context = JSON.stringify(updates.context);
      }
      
      // Map camelCase to snake_case for database columns
      const mappedUpdates = {};
      for (const [key, value] of Object.entries(updates)) {
        if (key === 'currentPhase') {
          mappedUpdates['current_phase'] = value;
        } else {
          mappedUpdates[key] = value;
        }
      }
      
      const fields = Object.keys(mappedUpdates).map(k => `${k} = ?`).join(', ');
      const values = Object.values(mappedUpdates);
      
      db.prepare(`UPDATE project_state SET ${fields}, last_claude_sync = CURRENT_TIMESTAMP WHERE project_id = ?`)
        .run(...values, projectId);
      
      // Emit socket event
      ctx.io?.emit('state:updated', { projectId, ...updates });
      
      return { success: true };
    })
});

// Agent procedures
const agentRouter = router({
  list: publicProcedure
    .query(async () => {
      const db = getDatabase();
      const agents = db.prepare('SELECT * FROM agents WHERE active = 1 ORDER BY name').all();
      
      return agents.map(a => ({
        ...a,
        capabilities: a.capabilities ? JSON.parse(a.capabilities) : [],
        configuration: a.configuration ? JSON.parse(a.configuration) : {}
      }));
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      type: z.enum(['bmad', 'sage', 'archon', 'custom']).default('custom'),
      description: z.string().optional(),
      capabilities: z.array(z.string()).optional(),
      configuration: z.record(z.any()).optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const db = getDatabase();
      const id = uuidv4();
      
      db.prepare(`
        INSERT INTO agents (id, name, type, description, capabilities, configuration)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(id, input.name, input.type, input.description, 
          JSON.stringify(input.capabilities || []), 
          JSON.stringify(input.configuration || {}));
      
      return { id, ...input };
    })
});

// Claude Code sync procedures
const syncRouter = router({
  push: publicProcedure
    .input(z.object({
      command: z.string(),
      data: z.record(z.any()),
      timestamp: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      logger.info('Claude Code sync push:', input);
      
      // Emit to all web clients
      ctx.io?.emit('claude:sync', input);
      
      return { success: true, received: input };
    }),

  pull: publicProcedure
    .input(z.object({
      projectId: z.string().optional(),
      since: z.string().optional()
    }))
    .query(async ({ input }) => {
      const db = getDatabase();
      
      // Get recent changes
      let query = 'SELECT * FROM transaction_log WHERE 1=1';
      const params = [];
      
      if (input.since) {
        query += ' AND timestamp > ?';
        params.push(input.since);
      }
      
      query += ' ORDER BY timestamp DESC LIMIT 100';
      
      const changes = db.prepare(query).all(...params);
      
      return changes.map(c => ({
        ...c,
        old_value: c.old_value ? JSON.parse(c.old_value) : null,
        new_value: c.new_value ? JSON.parse(c.new_value) : null
      }));
    })
});

// Main router
export const appRouter = router({
  project: projectRouter,
  task: taskRouter,
  state: stateRouter,
  agent: agentRouter,
  sync: syncRouter
});