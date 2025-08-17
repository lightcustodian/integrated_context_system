import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDragging: boolean;
  activeModal: string | null;
  sidebarOpen: boolean;
  cliStatus: {
    active: boolean;
    currentCommand?: string;
    currentStep?: string;
    lastUpdate?: number;
  };
  connectionStatus: {
    connected: boolean;
    lastPing?: number;
  };
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
  cliStatus: {
    active: false,
  },
  connectionStatus: {
    connected: true,
  },
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
    updateCliStatus: (state, action: PayloadAction<{
      active: boolean;
      currentCommand?: string;
      currentStep?: string;
    }>) => {
      state.cliStatus = {
        ...action.payload,
        lastUpdate: Date.now(),
      };
    },
    updateConnectionStatus: (state, action: PayloadAction<{
      connected: boolean;
    }>) => {
      state.connectionStatus = {
        ...action.payload,
        lastPing: Date.now(),
      };
    },
  },
});

export const {
  setDragging,
  setActiveModal,
  toggleSidebar,
  addNotification,
  removeNotification,
  updateCliStatus,
  updateConnectionStatus,
} = uiSlice.actions;

export default uiSlice.reducer;