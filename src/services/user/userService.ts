import api from '@/api/apiConfig';
import { UserProfile } from '@/types/types';
import { UpdateUserProfileData } from '@/types/updateUserProfile';

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get('/auth/get-me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (data: UpdateUserProfileData): Promise<UserProfile> => {
  try {
    const response = await api.put('/auth/update-user', data);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};