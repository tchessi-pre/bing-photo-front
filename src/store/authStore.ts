import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User | null, token: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user: User | null, token: string | null) => {
    set({ user, token, isAuthenticated: !!user && !!token });
  },
  clearAuth: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },
}));