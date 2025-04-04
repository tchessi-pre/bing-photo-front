import { useState, useCallback } from 'react';
import { useAlbumStore } from '@/store/albumStore';
import { addAlbum, getAlbums } from '@/services/album/albumService';

export const useAlbum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setAll = useAlbumStore((state) => state.setAlbums);

  const fetchAlbums = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const albums = await getAlbums();
      setAll(albums);
      return albums;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Erreur lors de la récupération des albums'
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setAll]);

  const createAlbum = useCallback(
    async (name: string, description?: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await addAlbum(name, description);
        // Ne pas ajouter manuellement au store → on re-fetch
        const refreshedAlbums = await getAlbums();
        setAll(refreshedAlbums);
        return refreshedAlbums;
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            err.message ||
            'Erreur lors de la création de l’album'
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setAll]
  );

  return {
    createAlbum,
    fetchAlbums,
    isLoading,
    error,
  };
};
