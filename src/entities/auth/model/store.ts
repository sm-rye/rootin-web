import { create } from 'zustand';
import type { User } from '@/entities/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setAuth: (user: User) => void;
  logout: () => void;
}

export const authStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user) => {
    set({ user, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
