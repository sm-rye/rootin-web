import { create } from 'zustand';

interface ConfirmState {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
  openConfirm: (message: string, onConfirm: () => void) => void;
  close: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  message: '',
  onConfirm: null,
  openConfirm: (message, onConfirm) =>
    set({ isOpen: true, message, onConfirm }),
  close: () => set({ isOpen: false, message: '', onConfirm: null }),
}));
