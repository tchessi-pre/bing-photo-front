'use client';

import React, { useEffect, useCallback } from 'react';
import AlbumAnimateSVG from '@/assets/svg-animate/photo-album-pana.svg';
import appTexts from '@/assets/appTexts.json';
import { EmptyPage } from '../customs';
import PageHeader from '../customs/PageHeader';
import AlbumCard from './customs-composents/AlbumCard';
import { useAlbumStore } from '@/store/albumStore';
import { useAlbum } from '@/hooks/album/useAlbum';
import { getAlbums, deleteAlbum } from '@/services/album/albumService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AlbumImageCard: React.FC = () => {
  const texts = appTexts.albumPage;
  const router = useRouter();

  const { fetchAlbums, createAlbum, isLoading, error } = useAlbum();

  const albums = useAlbumStore((state) => state.albums);

  // const fetchAlbums = useCallback(async () => {
  //   try {
  //     const albums = await getAlbums();
  //     useAlbumStore.getState().setAlbums(albums);
  //   } catch (error) {
  //     console.error('Erreur lors du chargement des albums', error);
  //   }
  // }, []); // <- vide si pas de dépendances

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleCardClick = (albumId: number) => {
    console.log(`Album ${albumId} cliqué !`);
    // router.push(`/albums/${albumId}`); // Uncomment if navigation is desired
  };

  const handleImport = () => {
    console.log('Importer des images !');
  };

  const handleCreateAlbum = async () => {
    try {
      const newAlbum = await createAlbum('Nouvel Album');

      if (!newAlbum || typeof newAlbum !== 'object') {
        console.error('La réponse de createAlbum est invalide :', newAlbum);
        alert('Erreur : la création de l\'album a échoué.');
        return;
      }

      console.log('Album créé avec succès :', newAlbum);
    } catch (err) {
      console.error('Erreur lors de la création de l\'album :', err);
      alert('Erreur lors de la création de l\'album.');
    }
  };

  const handleDeleteAlbum = async (albumId: number) => {
    try {
      console.log(`Demande suppression de l'album ${albumId}`);
      await deleteAlbum(albumId);
      toast.success('Album supprimé avec succès');
      fetchAlbums();
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
      toast.error("Échec de la suppression de l'album");
    }
  };

  return (
    <div className="p-2">
      <PageHeader
        title={texts.pageTitle}
        onImport={handleImport}
        onFileChange={(e) => console.log('Fichiers sélectionnés', e.target.files)}
        onCreateAlbum={handleCreateAlbum}
        onDeleteSelectedImages={() => console.log('Suppression des images sélectionnées')}
        onSelectSimilarImages={() => console.log('Sélection d\'images similaires')}
        onAction={() => console.log('Action réalisée')}
        albumCount={albums?.length}
      />

      <div className="flex flex-wrap justify-center gap-4 mt-4 md:ml-8 md:mr-8">
        {albums?.length === 0 ? (
          <EmptyPage
            title={texts.emptyPageTitle}
            message={texts.emptyPageMessage}
            imageSrc={<AlbumAnimateSVG />}
            actionLabel={texts.emptyPageActionLabel}
            onAction={handleCreateAlbum}
          />
        ) : (
          albums?.map((album: any, index: any) => {
            const coverImage = album.media?.[0];
            const images = coverImage
              ? [{ src: `http://localhost:9090/${coverImage.path}`, alt: coverImage.name }]
              : [];

            return (
              <div
                key={`album-${album.id}`}
                className="opacity-0 translate-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 105}ms` }}
              >
                <AlbumCard
                  id={album.id}
                  images={images}
                  onClick={() => handleCardClick(album.id)}
                  onDelete={() => handleDeleteAlbum(album.id)}
                  title={album.name}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AlbumImageCard;
