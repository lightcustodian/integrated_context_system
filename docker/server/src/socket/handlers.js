import { logger } from '../utils/logger.js';
import { getDb } from '../db/sqlite.js';

export function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);
    
    // Join project room
    socket.on('join:project', async (projectId) => {
      socket.join(`project:${projectId}`);
      logger.info(`Socket ${socket.id} joined project: ${projectId}`);
      
      // Send current project state
      const db = getDb();
      const tasks = await db.all('SELECT * FROM tasks WHERE project_id = ?', projectId);
      socket.emit('project:tasks', tasks);
    });
    
    // Leave project room
    socket.on('leave:project', (projectId) => {
      socket.leave(`project:${projectId}`);
      logger.info(`Socket ${socket.id} left project: ${projectId}`);
    });
    
    // Handle task drag and drop
    socket.on('task:drag', async (data) => {
      const { taskId, sourceStatus, targetStatus, sourceIndex, targetIndex, projectId } = data;
      
      try {
        const db = getDb();
        
        // Update task status and reorder
        await db.run('BEGIN TRANSACTION');
        
        // Remove from source column
        await db.run(`
          UPDATE tasks 
          SET column_order = column_order - 1 
          WHERE project_id = ? AND status = ? AND column_order > ?
        `, [projectId, sourceStatus, sourceIndex]);
        
        // Make space in target column
        await db.run(`
          UPDATE tasks 
          SET column_order = column_order + 1 
          WHERE project_id = ? AND status = ? AND column_order >= ?
        `, [projectId, targetStatus, targetIndex]);
        
        // Update the task
        await db.run(`
          UPDATE tasks 
          SET status = ?, column_order = ? 
          WHERE id = ?
        `, [targetStatus, targetIndex, taskId]);
        
        await db.run('COMMIT');
        
        // Broadcast to all clients in the project room
        io.to(`project:${projectId}`).emit('task:moved', {
          taskId,
          sourceStatus,
          targetStatus,
          sourceIndex,
          targetIndex
        });
        
      } catch (error) {
        logger.error('Error handling task drag:', error);
        await db.run('ROLLBACK');
        socket.emit('error', { message: 'Failed to move task' });
      }
    });
    
    // Handle real-time collaboration cursor
    socket.on('cursor:move', (data) => {
      socket.to(`project:${data.projectId}`).emit('cursor:update', {
        userId: socket.id,
        ...data
      });
    });
    
    // Handle live typing indicators
    socket.on('typing:start', (data) => {
      socket.to(`project:${data.projectId}`).emit('typing:indicator', {
        userId: socket.id,
        taskId: data.taskId,
        isTyping: true
      });
    });
    
    socket.on('typing:stop', (data) => {
      socket.to(`project:${data.projectId}`).emit('typing:indicator', {
        userId: socket.id,
        taskId: data.taskId,
        isTyping: false
      });
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
      // Notify others that this user disconnected
      io.emit('user:disconnected', { userId: socket.id });
    });
  });
}