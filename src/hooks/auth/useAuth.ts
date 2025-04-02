import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  login as authLogin,
  logout as authLogout,
  signup as authSignup,
  LoginCredentials,
  SignUpCredentials,
} from '@/services/auth/authService';
import { useAuthStore } from '@/store/authStore';
import { jwtDecode } from 'jwt-decode';
interface DecodedToken {
  userID: string;
  username?: string;
  email?: string;
  exp?: number;
  iat?: number;
}

export const useAuth = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authLogin(credentials);
       
        const decoded = jwtDecode<DecodedToken>(response.Token);
        
        const user = {
          id: decoded.userID,
          email: decoded.email || '', // par sécurité
          name: decoded.username,
        };
        
        setAuth(user, response.Token);
        return response;
      } catch (err: any) {
        setError(err.response?.data?.message || 'Login failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router, setAuth]
  );

  const signup = useCallback(
    async (credentials: SignUpCredentials) => {
      setIsLoading(true);
      setError(null);
      try {
        // Register the user
        const registerResponse = await authSignup(credentials);
        return registerResponse;
      } catch (err: any) {
        setError(err.response?.data?.message || 'Signup failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

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

  return {
    login,
    logout,
    signup,
    isLoading,
    error,
  };
};
