import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login as authLogin, logout as authLogout, signup as authSignup, LoginCredentials, SignUpCredentials } from '@/services/auth/authService';
import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authLogin(credentials);
      setAuth(response.user, response.token);
      router.push('/overview');
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router, setAuth]);
  

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authLogout();
      clearAuth();
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  }, [router, clearAuth]);

  const signup = useCallback(async (credentials: SignUpCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      // First register the user
      const registerResponse = await authSignup(credentials);

      // If registration is successful, automatically log in
      const loginResponse = await login(credentials);
      return loginResponse;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [router, setAuth]);

  return {
    login,
    logout,
    signup,
    isLoading,
    error
  };
};