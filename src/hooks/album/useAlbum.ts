import { useState, useCallback } from 'react';
import { useAlbumStore } from '@/store/albumStore';
import { addAlbum } from '@/services/album/albumService';

export const useAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const add = useAlbumStore((state) => state.addAlbum);

  const createAlbum = useCallback(
    async (name: string, description?: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const newAlbum = await addAlbum(name, description);
        add(newAlbum);
        return newAlbum;
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Erreur lors de la création de l’album');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [add]
  );

  return {
    createAlbum,
    isLoading,
    error,
  };
};
