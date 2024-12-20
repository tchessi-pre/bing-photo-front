'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import ImageGrid from '@/components/Album/ImageGrid';
import PageHeader from '@/components/Album/customs-composents/PageHeader';
import EmptyPage from '@/components/customs/EmptyPage';
import AlbumAnimateSVG from '@/assets/svg-animate/photo-album-pana.svg';
import appTexts from '@/assets/appTexts.json';
import {
  getAlbumById,
  addImageToAlbum,
  toggleImageSelection,
} from '@/services/album/albumDetailService';

const AlbumDetailPage: React.FC = () => {
  const texts = appTexts.AlbumDetailPage;
  const params = useParams();
  const albumId = params?.id as string;

  const album = getAlbumById(albumId);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());

  const handleImageSelect = (index: number) => {
    const updatedSelection = toggleImageSelection(selectedImages, index);
    setSelectedImages(updatedSelection);
  };

  const handleAddImage = () => {
    const newImage = { src: '/images/newImage.jpg', alt: 'Nouvelle image' };
    const success = addImageToAlbum(albumId, newImage);
    if (success) {
      console.log('Image ajoutée avec succès !');
    } else {
      console.log("Échec de l'ajout de l'image !");
    }
  };

  if (!album) {
    return <div className="p-4">{texts.albumNotFound}</div>;
  }

  return (
    <div className="p-4">
      <PageHeader
        title={album.title}
        onImport={() => console.log('Importer des images !')}
        onCreateAlbum={() => console.log('Créer un nouvel album !')}
        imageCount={album.images.length}
        selectedImageCount={selectedImages.size}
      />
      <div className="mt-4 ml-10 mr-10">
        {album.images.length === 0 ? (
          <EmptyPage
            title={texts.emptyAlbumTitle}
            message={texts.emptyAlbumMessage}
            imageSrc={<AlbumAnimateSVG />}
            actionLabel={texts.addImagesAction}
            onAction={handleAddImage}
          />
        ) : (
          <ImageGrid
            images={album.images}
            selectedImages={selectedImages}
            onImageSelect={handleImageSelect}
          />
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
