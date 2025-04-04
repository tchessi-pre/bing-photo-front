import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PersistStorage, StorageValue } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  zeutlandToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User | null, token: string | null, zeutlandToken?: string | null) => void;
  clearAuth: () => void;
}

const storage: PersistStorage<AuthState> = {
  getItem: (name) => {
    if (typeof window === 'undefined') return null;
    const value = localStorage.getItem(name);
    return value ? JSON.parse(value) as StorageValue<AuthState> : null;
  },
  setItem: (name, value) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      zeutlandToken: null,
      isAuthenticated: false,

      setAuth: (user, token, zeutlandToken = null) => {
        set({
          user,
          token,
          zeutlandToken,
          isAuthenticated: !!user && !!token,
        });
      },

      clearAuth: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('zeutland_token');
        }
        set({
          user: null,
          token: null,
          zeutlandToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: storage,
    }
  )
);
