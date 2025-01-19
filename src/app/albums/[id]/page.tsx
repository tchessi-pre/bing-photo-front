'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import ImageGrid from '@/components/Album/ImageGrid';
import AlbumAnimateSVG from '@/assets/svg-animate/photo-album-pana.svg';
import appTexts from '@/assets/appTexts.json';
import {
  getAlbumById,
  toggleImageSelection,
} from '@/services/album/albumDetailService';
import { PageHeader } from '@/components/Album';
import { EmptyPage } from '@/components/customs';

const AlbumDetailPage: React.FC = () => {
  const texts = appTexts.AlbumDetailPage;
  const params = useParams();
  const albumId = parseInt(params?.id as string, 10);

  const album = getAlbumById(albumId);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [images, setImages] = useState(album ? album.images : []);

  const handleImageSelect = (index: number) => {
    const updatedSelection = toggleImageSelection(selectedImages, index);
    setSelectedImages(updatedSelection);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const newImage = { src: reader.result as string, alt: file.name };
          setImages((prevImages) => [...prevImages, newImage]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteSelectedImages = () => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => !selectedImages.has(index))
    );
    setSelectedImages(new Set());
  };

  const handleSelectSimilarImages = () => {
    // Exemple logique : sélectionnez les images avec des "alt" similaires
    const newSelection = new Set<number>();
    images.forEach((image, index) => {
      if (image.alt.includes('similar')) {
        newSelection.add(index);
      }
    });
    setSelectedImages(newSelection);
  };

  if (!album) {
    return <div className="p-4">{texts.albumNotFound}</div>;
  }

  function handleCreateAlbum(): void {
    throw new Error('Function not implemented.');
  }

  function handleImport(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="p-4">
      <PageHeader
        title={album.title}
        onFileChange={handleFileChange}
        onCreateAlbum={(albumName) => console.log(`Créer l'album : ${albumName}`)}
        onDeleteSelectedImages={handleDeleteSelectedImages}
        onSelectSimilarImages={handleSelectSimilarImages}
        imageCount={images.length}
        selectedImageCount={selectedImages.size}
        onAction={handleCreateAlbum}
        onImport={handleImport}
      />

      <div className="mt-4 ml-10 mr-10">
        {images.length === 0 ? (
          <EmptyPage
            title={texts.emptyAlbumTitle}
            message={texts.emptyAlbumMessage}
            imageSrc={<AlbumAnimateSVG />}
            actionLabel={texts.addImagesAction}
            onFileChange={handleFileChange}
          />
        ) : (
          <ImageGrid
            images={images}
            selectedImages={selectedImages}
            onImageSelect={handleImageSelect} onDelete={function (index: number): void {
              throw new Error('Function not implemented.');
            }} />
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
