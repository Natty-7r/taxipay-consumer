import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme } from '@/types/common.type';

interface UIState {
  theme: Theme;
  sidebarOpen: boolean;
  modalOpen: string | null;
  isLoading: boolean;
  toastMessage: { type: 'success' | 'error' | 'info'; message: string } | null;
  
  // Actions
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setLoading: (loading: boolean) => void;
  showToast: (type: 'success' | 'error' | 'info', message: string) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: false,
      modalOpen: null,
      isLoading: false,
      toastMessage: null,
      
      setTheme: (theme) => set({ theme }),
      
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      openModal: (modalId) => set({ modalOpen: modalId }),
      
      closeModal: () => set({ modalOpen: null }),
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      showToast: (type, message) =>
        set({ toastMessage: { type, message } }),
      
      hideToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'ui-storage',
    }
  )
);