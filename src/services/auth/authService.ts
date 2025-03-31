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

// Add request interceptor to include auth token
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

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

const removeToken = (): void => {
  if (typeof window !== 'undefined') {
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
    useAuthStore.getState().setAuth(data.user, token); // data.user should be non-null here
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
  } catch (error) {
    throw error;
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