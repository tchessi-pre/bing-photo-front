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
  }
};