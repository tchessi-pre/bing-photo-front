'use client';

import api, { setAuthToken } from '@/api/apiConfig';
import { useAuthStore } from '@/store/authStore';
import { jwtDecode } from 'jwt-decode'; // ✅
interface DecodedToken {
  userID: string;
  email: string;
  username?: string;
  exp?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  confirmPassword?: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface AuthResponse {
  Token: string;
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

// Ajoutez cette fonction
export const clearToken = (): void => {
  localStorage.removeItem('token');
  // Ajoutez d'autres nettoyages si nécessaire (comme les refresh tokens)
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

// Fonction pour effectuer la connexion
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post('/auth/login', credentials);
    const data = response.data;
    const token = data?.token || data?.Token;
    if (!data || !token || typeof token !== 'string') {
      throw new Error('Invalid response format: missing or invalid token');
    }

    setToken(token);
    setAuthToken(token);
    const decoded = jwtDecode<DecodedToken>(token);
    useAuthStore.getState().setAuth(
      {
        id: decoded.userID,
        email: decoded.email || '',
        name: decoded.username,
      },
      token
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export interface RegisterResponse {
  Message: string;
}

// Fonction pour effectuer l'inscription
export const signup = async (credentials: SignUpCredentials): Promise<RegisterResponse> => {
  try {
    const response = await api.post('/auth/register', credentials);
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

// Fonction pour effectuer la déconnexion
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

// Fonction pour un mot de passe oublié
export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    const data = response.data;

    if (!data || typeof data.message !== 'string') {
      throw new Error('Format de réponse invalide : message manquant');
    }
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data || 'Une erreur est survenue lors de la demande de réinitialisation');
  }
};

// Fonction pour effectuer la réinitialisation du mot de passe
export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error('Token invalide ou expiré');
    }
    if (error.response?.status === 404) {
      throw new Error('Utilisateur non trouvé');
    }
    throw new Error(error.response?.data?.message || 'Échec de la réinitialisation');
  }
};


export const decodeToken = (): { userID: number } | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

