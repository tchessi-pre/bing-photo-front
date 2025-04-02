import { useState } from 'react';
import { mainAlbumService } from '@/services/album/mainAlbumService';

export const useMainAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMainAlbumId = async (userId: number) => {
    setIsLoading(true);
    try {
      return await mainAlbumService.getMainAlbumId(userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMedia = async (albumId: number, file: File) => {
    setIsLoading(true);
    try {
      return await mainAlbumService.importMediaToMainAlbum(albumId, file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchMainAlbumId,
    uploadMedia,
    isLoading,
    error,
    clearError: () => setError(null)
  };
};