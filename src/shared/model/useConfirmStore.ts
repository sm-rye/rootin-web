import { create } from 'zustand';

interface ConfirmState {
  isOpen: boolean;
  message: string;
  confirmLabel: string;
  onConfirm: (() => void) | null;
  openConfirm: (message: string, onConfirm: () => void, confirmLabel?: string) => void;
  close: () => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  message: '',
  confirmLabel: '확인',
  onConfirm: null,
  openConfirm: (message, onConfirm, confirmLabel = '확인') =>
    set({ isOpen: true, message, onConfirm, confirmLabel }),
  close: () => set({ isOpen: false, message: '', onConfirm: null, confirmLabel: '확인' }),
}));
