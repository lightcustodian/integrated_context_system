import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDragging: boolean;
  activeModal: string | null;
  sidebarOpen: boolean;
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    timestamp: number;
  }>;
}

const initialState: UIState = {
  isDragging: false,
  activeModal: null,
  sidebarOpen: true,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action: PayloadAction<{
      type: 'info' | 'success' | 'warning' | 'error';
      message: string;
    }>) => {
      state.notifications.push({
        id: Date.now().toString(),
        timestamp: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const {
  setDragging,
  setActiveModal,
  toggleSidebar,
  addNotification,
  removeNotification,
} = uiSlice.actions;

export default uiSlice.reducer;