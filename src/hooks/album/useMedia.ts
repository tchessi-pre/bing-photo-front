'use client';

import { useState } from 'react';
import { mediaService } from '@/services/album/mediaService';

export const useMedia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMedia = async (mediaId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await mediaService.deleteMedia(mediaId);
    } catch (err) {
      setError('Erreur lors de la suppression du média');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteMedia,
    isLoading,
    error
  };
};