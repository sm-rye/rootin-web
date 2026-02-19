import { create } from 'zustand';

export type ToastType = 'success' | 'error';

const TOAST_DURATION = 3000;

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  createdAt: number;
  duration: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
}

let nextId = 0;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type) => {
    const id = nextId++;
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id, message, type, createdAt: Date.now(), duration: TOAST_DURATION },
      ],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, TOAST_DURATION);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
