import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';
import taskReducer from './taskSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    tasks: taskReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;