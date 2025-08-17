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

  // CLI activity events
  socket.on('cli:active', (data) => {
    store.dispatch(addNotification({
      type: 'info',
      message: `CLI active: ${data.command}`,
    }));
    // Update CLI status in global state
    store.dispatch({ 
      type: 'ui/updateCliStatus', 
      payload: { 
        active: true, 
        currentCommand: data.command,
        currentStep: data.step 
      }
    });
  });

  socket.on('cli:inactive', (data) => {
    store.dispatch(addNotification({
      type: 'info',
      message: 'CLI session ended',
    }));
    // Update CLI status in global state
    store.dispatch({ 
      type: 'ui/updateCliStatus', 
      payload: { 
        active: false, 
        currentCommand: null,
        currentStep: null 
      }
    });
  });

  socket.on('cli:step_update', (data) => {
    // Update current step without notification
    store.dispatch({ 
      type: 'ui/updateCliStatus', 
      payload: { 
        active: true, 
        currentCommand: data.command,
        currentStep: data.step 
      }
    });
  });

  // Methodology integration events
  socket.on('settings_approval_required', (data) => {
    console.log('Settings approval required:', data);
    store.dispatch(addNotification({
      type: 'info',
      message: 'Project settings approval required',
    }));
  });

  socket.on('approval_required', (data) => {
    console.log('Approval required:', data);
    store.dispatch(addNotification({
      type: 'info',
      message: `Approval required: ${data.title}`,
    }));
  });

  socket.on('implementation_progress', (data) => {
    console.log('Implementation progress:', data);
    store.dispatch(addNotification({
      type: 'info',
      message: `Implementing: ${data.currentFeature} (${Math.round(data.progress * 100)}%)`,
    }));
  });

  socket.on('optimization_progress', (data) => {
    console.log('Optimization progress:', data);
    store.dispatch(addNotification({
      type: 'info',
      message: `Optimizing: ${data.optimization} (${Math.round(data.progress * 100)}%)`,
    }));
  });

  socket.on('qa_progress', (data) => {
    console.log('QA progress:', data);
    store.dispatch(addNotification({
      type: 'info',
      message: `QA Testing: ${data.testCategory} (${Math.round(data.progress * 100)}%)`,
    }));
  });

  socket.on('dependency_validation_task_created', (data) => {
    console.log('Dependency validation task created:', data);
    store.dispatch(addNotification({
      type: 'warning',
      message: `SAGE: Dependency validation required for ${data.taskTitle}`,
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

export function emitTaskUpdate(data: { taskId: string; changes: any; source: string }) {
  socket?.emit('task:update', data);
}

export function emitSettingsApproval(data: { projectId: string; settings: any }) {
  socket?.emit('settings:approved', data);
}

export function emitApprovalUpdate(data: { approvalId: string; status: string; content?: string; rejectionReason?: string }) {
  socket?.emit('approval:update', data);
}

export function emitCliStatusRequest() {
  socket?.emit('cli:status_request');
}

export function subscribeToCliStatus(callback: (status: any) => void) {
  socket?.on('cli:status_response', callback);
  socket?.on('cli:step_update', callback);
  socket?.on('cli:active', callback);
  socket?.on('cli:inactive', callback);
}

export function unsubscribeFromCliStatus() {
  socket?.off('cli:status_response');
  socket?.off('cli:step_update');
  socket?.off('cli:active');
  socket?.off('cli:inactive');
}