import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assigned_to: 'human' | 'claude' | 'automated';
  column_order: number;
  estimated_hours?: number;
  actual_hours?: number;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

interface TaskState {
  tasks: Record<string, Task[]>; // Keyed by project_id
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: {},
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<{ projectId: string; tasks: Task[] }>) => {
      state.tasks[action.payload.projectId] = action.payload.tasks;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const projectTasks = state.tasks[action.payload.project_id] || [];
      projectTasks.push(action.payload);
      state.tasks[action.payload.project_id] = projectTasks;
    },
    updateTask: (state, action: PayloadAction<Partial<Task> & { id: string; project_id: string }>) => {
      const projectTasks = state.tasks[action.payload.project_id] || [];
      const index = projectTasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        projectTasks[index] = { ...projectTasks[index], ...action.payload };
        state.tasks[action.payload.project_id] = projectTasks;
      }
    },
    deleteTask: (state, action: PayloadAction<{ id: string; projectId: string }>) => {
      const projectTasks = state.tasks[action.payload.projectId] || [];
      state.tasks[action.payload.projectId] = projectTasks.filter(t => t.id !== action.payload.id);
    },
    moveTask: (state, action: PayloadAction<{
      projectId: string;
      taskId: string;
      sourceStatus: string;
      targetStatus: string;
      sourceIndex: number;
      targetIndex: number;
    }>) => {
      const { projectId, taskId, targetStatus, targetIndex } = action.payload;
      const projectTasks = state.tasks[projectId] || [];
      const task = projectTasks.find(t => t.id === taskId);
      
      if (task) {
        task.status = targetStatus as Task['status'];
        task.column_order = targetIndex;
        
        // Reorder other tasks
        projectTasks.forEach(t => {
          if (t.id !== taskId && t.status === targetStatus && t.column_order >= targetIndex) {
            t.column_order += 1;
          }
        });
        
        state.tasks[projectId] = [...projectTasks];
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  setLoading,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;