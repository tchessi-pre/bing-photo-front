import api from '@/api/apiConfig';
import { UserProfile } from '@/types/types';

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get('/auth/get-me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};