'use client';

import React, { useEffect, useState } from 'react';
import AlbumAnimateSVG from '@/assets/svg-animate/photo-album-pana.svg';
import appTexts from '@/assets/appTexts.json';
import { EmptyPage } from '../customs';
import PageHeader from '../customs/PageHeader';
import AlbumCard from './customs-composents/AlbumCard';
import { useAlbumStore } from '@/store/albumStore'; // pour lire les albums
import { useAlbum } from '@/hooks/album/useAlbum';

const AlbumImageCard: React.FC = () => {
  const texts = appTexts.albumPage;

  const { fetchAlbums, createAlbum, isLoading, error } = useAlbum();
  const albums = useAlbumStore((state) => state.albums); // on lit depuis le store

  useEffect(() => {
    fetchAlbums(); // récupère les albums au montage
  }, [fetchAlbums]);

  const handleCardClick = (albumId: number) => {
    console.log(`Album ${albumId} cliqué !`);
  };

  const handleImport = () => {
    console.log('Importer des images !');
  };

  const handleCreateAlbum = async () => {
    try {
      const newAlbum = await createAlbum('Nouvel Album');
      console.log(`Album créé : ${newAlbum.title}`);
    } catch (err) {
      console.error('Erreur création album', err);
    }
  };

  const handleDeleteAlbum = (albumId: number) => {
    console.log(`Demande suppression de l'album ${albumId}`);
    // Tu peux ajouter une fonction deleteAlbum dans useAlbum si tu veux gérer ça aussi
  };

  return (
    <div className="p-2">
      <PageHeader
        title={texts.pageTitle}
        onImport={handleImport}
        onFileChange={(e) => console.log('Fichiers sélectionnés', e.target.files)}
        onCreateAlbum={handleCreateAlbum}
        onDeleteSelectedImages={() => console.log('Suppression des images sélectionnées')}
        onSelectSimilarImages={() => console.log('Sélection d’images similaires')}
        onAction={() => console.log('Action réalisée')}
        albumCount={albums.length}
      />

      <div className="flex flex-wrap justify-center gap-4 mt-4 md:ml-8 md:mr-8">
        {isLoading ? (
          <p>Chargement des albums...</p>
        ) : error ? (
          <p className="text-red-500">Erreur : {error}</p>
        ) : albums.length === 0 ? (
          <EmptyPage
            title={texts.emptyPageTitle}
            message={texts.emptyPageMessage}
            imageSrc={<AlbumAnimateSVG />}
            actionLabel={texts.emptyPageActionLabel}
            onAction={handleCreateAlbum}
          />
        ) : (
          albums.map((album, index) => (
            <div
              key={album.id}
              className="opacity-0 translate-y-4 animate-fade-in"
              style={{ animationDelay: `${index * 105}ms` }}
            >
              <AlbumCard
                id={album.id}
                images={album.images}
                onClick={() => handleCardClick(album.id)}
                onDelete={() => handleDeleteAlbum(album.id)}
                title={album.title}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlbumImageCard;
