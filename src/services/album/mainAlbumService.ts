import { getAxiosInstance } from "@/api/apiConfig";
import { Album, Media } from "@/types/types";
import { getToken } from "../auth/authService";

export const mainAlbumService = {
  async getMainAlbumId(userId: number): Promise<number> {
    const token = getToken();
    if (!token) throw new Error("No authentication token");

    const { data } = await getAxiosInstance().get<{ album: Album }>('/albums/type', {
      params: {
        user_id: userId,
        type: 'main'
      },
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    return data.album.id;
  },

  async importMediaToMainAlbum(albumId: number, file: File): Promise<Media> {
    const token = getToken();
    if (!token) throw new Error("No authentication token");

    const formData = new FormData();
    formData.append('album_id', albumId.toString());
    formData.append('file', file);

    const { data } = await getAxiosInstance().post<Media>('/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    });

    return data;
  }
};