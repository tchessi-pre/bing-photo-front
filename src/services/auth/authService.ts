import { AxiosInstance } from 'axios';
import api, { setAuthToken } from '@/api/apiConfig';
import { useAuthStore } from '@/store/authStore';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  confirmPassword?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username?: string;
  };
}

// Configuration de l'intercepteur
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Récupère le token depuis les cookies
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'auth-token') {
        return decodeURIComponent(value);
      }
    }
  }
  return null;
};

// Stocke le token dans les cookies et localStorage
const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    // Stockage dans les cookies (pour le middleware)
    document.cookie = `auth-token=${encodeURIComponent(token)}; path=/; max-age=${60 * 60 * 24 * 7}`; // 1 semaine

    // Stockage dans localStorage (pour l'application)
    localStorage.setItem('auth_token', token);
  }
};

// Supprime le token
const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    // Suppression du cookie
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    // Suppression du localStorage
    localStorage.removeItem('auth_token');
  }
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post('/login', credentials);
    const data = response.data;

    const token = data?.token || data?.Token;
    if (!data || !token || typeof token !== 'string') {
      throw new Error('Invalid response format: missing or invalid token');
    }

    setToken(token);
    setAuthToken(token);
    useAuthStore.getState().setAuth(data.user, token);

    return data;
  } catch (error) {
    throw error;
  }
};

export interface RegisterResponse {
  Message: string;
}

export const signup = async (credentials: SignUpCredentials): Promise<RegisterResponse> => {
  try {
    const response = await api.post('/register', credentials);
    const data = response.data;

    if (!data || typeof data.Message !== 'string') {
      throw new Error('Invalid response format: missing message');
    }
    return data;
  } catch (error: any) {
    if (error.response?.status === 500 && error.response?.data?.includes('existe déjà')) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }
    throw new Error(error.response?.data || 'Une erreur est survenue lors de l\'inscription');
  }
};

export const logout = async (): Promise<void> => {
  try {
    // await api.post('/logout');
    removeToken();
    setAuthToken(null);
    useAuthStore.getState().clearAuth();
  } catch (error) {
    throw error;
  }
};

export interface ForgotPasswordResponse {
  message: string;
}

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  try {
    const response = await api.post('/forgot-password', { email });
    const data = response.data;

    if (!data || typeof data.message !== 'string') {
      throw new Error('Format de réponse invalide : message manquant');
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Une erreur est survenue lors de la demande de réinitialisation');
  }
};