// src/services/auth/refresh.ts
import api from '@/api/apiConfig';

export const performRefreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('Aucun refresh token disponible');
  }

  const response = await api.post('/auth/refresh-token', {
    refresh_token: refreshToken,
  });

  const { access_token, refresh_token } = response.data;

  if (!access_token || !refresh_token) {
    throw new Error('Réponse invalide lors du refresh');
  }

  localStorage.setItem('auth_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);

  return access_token;
};
