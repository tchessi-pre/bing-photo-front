'use client';

import api from "@/api/apiConfig";

export interface Media {
  id: number;
  name: string;
  path: string;
  type: string;
  createdAt: string;
  album_id: number;
  is_favorite?: boolean;
  is_private?: boolean;
}

export interface MediaResponse {
  media: Media[];
}

export interface MediaGroup {
  media: Media[];
}

export interface DetectSimilarMediaResponse {
  groups: MediaGroup[];
}

export const mediaService = {
  async getAlbumMedia(albumId: number): Promise<MediaResponse> {
    try {
      const response = await api.get(`/media/album/${albumId}`);
      console.log('response: >>>>>', response);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des médias:', error);
      throw error;
    }
  },
  async importToAlbum(albumId: number, file: File) {
    const formData = new FormData();
    formData.append('album_id', albumId.toString());
    formData.append('file', file);

    const res = await api.post('/media', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },
  async detectSimilarMedia(albumId: number): Promise<DetectSimilarMediaResponse> {
    const response = await api.post('/media/similar', { album_id: albumId });
    return response.data;
  }  
};

