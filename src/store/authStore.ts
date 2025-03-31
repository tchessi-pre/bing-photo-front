import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: localStorage.getItem('auth_token'),
      isAuthenticated: false,
      setAuth: (user: User | null, token: string | null) => {
        if (token) {
          localStorage.setItem('auth_token', token);
        }
        set({ user, token, isAuthenticated: !!user && !!token });
      },
      clearAuth: () => {
        localStorage.removeItem('auth_token');
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);