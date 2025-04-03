import { getAxiosInstance } from "@/api/apiConfig";

export const getUserAlbums = async (userId: number) => {
  try {
    const response = await getAxiosInstance().get(`/albums/user?user_id=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user albums');
  }
};