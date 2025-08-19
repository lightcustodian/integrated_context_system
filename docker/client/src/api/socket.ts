import { io, Socket } from 'socket.io-client';
import { store } from '../store/store';
import { addTask, updateTask, deleteTask, moveTask } from '../store/taskSlice';
import { addProject, updateProject, deleteProject } from '../store/projectSlice';
import { addNotification } from '../store/uiSlice';

let socket: Socket | null = null;

export function initSocket(): Socket {
  if (socket) return socket;

  socket = io('/', {
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id);
    store.dispatch(addNotification({
      type: 'success',
      message: 'Connected to server',
    }));
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
    store.dispatch(addNotification({
      type: 'warning',
      message: 'Disconnected from server',
    }));
  });

  // Project events
  socket.on('project:created', (project) => {
    store.dispatch(addProject(project));
    store.dispatch(addNotification({
      type: 'info',
      message: `Project "${project.name}" created`,
    }));
  });

  socket.on('project:updated', (project) => {
    store.dispatch(updateProject(project));
  });

  socket.on('project:deleted', (data) => {
    store.dispatch(deleteProject(data.id));
  });

  // Task events
  socket.on('task:created', (task) => {
    store.dispatch(addTask(task));
    store.dispatch(addNotification({
      type: 'info',
      message: `Task "${task.title}" created`,
    }));
  });

  socket.on('task:updated', (task) => {
    store.dispatch(updateTask(task));
  });

  socket.on('task:deleted', (data) => {
    store.dispatch(deleteTask({ id: data.id, projectId: data.projectId }));
  });

  socket.on('task:moved', (data) => {
    store.dispatch(moveTask(data));
  });

  // Claude sync events
  socket.on('claude:sync', (data) => {
    console.log('Claude sync:', data);
    store.dispatch(addNotification({
      type: 'info',
      message: `Claude executed: ${data.command}`,
    }));
  });

  return socket;
}

export function getSocket(): Socket | null {
  return socket;
}

export function joinProject(projectId: string) {
  socket?.emit('join:project', projectId);
}

export function leaveProject(projectId: string) {
  socket?.emit('leave:project', projectId);
}

export function emitTaskDrag(data: any) {
  socket?.emit('task:drag', data);
}