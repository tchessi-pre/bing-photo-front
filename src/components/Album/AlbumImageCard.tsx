'use client';

import React, { useState } from 'react';
import { getAlbums, addAlbum, deleteAlbum } from '@/services/album/albumService';
import AlbumAnimateSVG from '@/assets/svg-animate/photo-album-pana.svg';
import appTexts from '@/assets/appTexts.json';
import { EmptyPage } from '../customs';
import PageHeader from './customs-composents/PageHeader';
import AlbumCard from './customs-composents/AlbumCard';

const AlbumImageCard: React.FC = () => {
  const texts = appTexts.albumPage;

  const [albums, setAlbums] = useState(getAlbums());

  const handleCardClick = (albumId: number) => {
    console.log(`Album ${albumId} cliqué !`);
  };

  const handleImport = () => {
    console.log('Importer des images !');
  };

  const handleCreateAlbum = () => {
    const newAlbum = addAlbum('Nouvel Album');
    setAlbums(getAlbums());
    console.log(`Album créé : ${newAlbum.title}`);
  };

  const handleDeleteAlbum = (albumId: number) => {
    if (deleteAlbum(albumId)) {
      setAlbums(getAlbums());
      console.log(`Album ${albumId} supprimé.`);
    } else {
      console.log(`Échec de la suppression de l'album ${albumId}.`);
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
        onSelectSimilarImages={() => console.log('Sélection d’images similaires')}
        onAction={() => console.log('Action réalisée')}
        albumCount={albums.length}
      />
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {albums.length === 0 ? (
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
              className={`opacity-0 translate-y-4 animate-fade-in`}
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
