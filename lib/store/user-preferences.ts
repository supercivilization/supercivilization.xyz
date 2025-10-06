import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface UserPreferencesState {
  // Theme preferences
  sidebarOpen: boolean;
  compactMode: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCompactMode: () => void;
  setCompactMode: (compact: boolean) => void;
  reset: () => void;
}

const initialState = {
  sidebarOpen: true,
  compactMode: false,
};

export const useUserPreferences = create<UserPreferencesState>()(
  persist(
    (set) => ({
      ...initialState,

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleCompactMode: () => set((state) => ({ compactMode: !state.compactMode })),
      setCompactMode: (compact) => set({ compactMode: compact }),
      reset: () => set(initialState),
    }),
    {
      name: 'user-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
