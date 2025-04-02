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
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        console.log(user, 'user', token, 'token');
        if(user===null||!user) {
          return
        }
        set({ user, token, isAuthenticated: !!user && !!token });
      },

      clearAuth: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      reset: () => {
        localStorage.removeItem('auth-storage'); // ← optionnel : vide le localStorage aussi
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
