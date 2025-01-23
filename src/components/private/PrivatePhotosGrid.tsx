import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PageHeader from '../customs/PageHeader';
import appTexts from '@/assets/appTexts.json';
import { groupPhotosByDate } from '@/lib/groupPhotosByDate';
import DateGroup from '../customs/DateGroup';
import EmptyPage from '../customs/EmptyPage';
import AlbumAnimateSVG from '@/assets/svg-animate/photo-album-pana.svg';
import { Photo } from '@/types/types';
import { privatePhotos } from '@/services/private/privatePhotoService';
import ZoomModal from '../favorites/ZoomModal';

const PrivatePhotosGrid: React.FC = () => {
  const texts = appTexts.PrivatePage;
  const params = useParams();
  const albumId = parseInt(params?.id as string, 10);

  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [images, setImages] = useState<Photo[]>([]);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    // Charger les photos privées depuis une API ou un service
    setImages(privatePhotos);
  }, []);

  const handleImageSelect = (id: number) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedImages(newSelected);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      try {
        const newImages = await Promise.all(
          Array.from(files).map(async (file) => {
            const reader = new FileReader();
            reader.onload = () => {
              const newImage = {
                id: images.length + 1,
                src: reader.result as string,
                alt: file.name,
                date: new Date().toISOString().split('T')[0],
              };
              setImages((prevImages) => [...prevImages, newImage]);
            };
            reader.readAsDataURL(file);
          })
        );
      } catch (error) {
        console.error('Erreur lors de l\'importation des images :', error);
      }
    }
  };

  const handleDeleteSelectedImages = async () => {
    try {
      // Supprimer les images sélectionnées côté serveur
      await Promise.all(
        Array.from(selectedImages).map((id) =>
          fetch(`/api/private-photos/${id}`, { method: 'DELETE' })
        )
      );

      // Mettre à jour l'état local
      setImages((prevImages) =>
        prevImages.filter((_, index) => !selectedImages.has(index))
      );
      setSelectedImages(new Set());
    } catch (error) {
      console.error('Erreur lors de la suppression des images :', error);
    }
  };

  const handleSelectSimilarImages = () => {
    const newSelection = new Set<number>();
    images.forEach((image, index) => {
      if (image.alt?.includes('similar')) {
        newSelection.add(index);
      }
    });
    setSelectedImages(newSelection);
  };

  const handleImport = () => {
    console.log('Importer des images');
  };

  const handleSelectAllByDate = (date: string) => {
    const photosForDate = images.filter((photo) => photo.date === date);
    const allSelected = photosForDate.every((photo) => selectedImages.has(photo.id));

    const newSelected = new Set(selectedImages);

    if (allSelected) {
      photosForDate.forEach((photo) => newSelected.delete(photo.id));
    } else {
      photosForDate.forEach((photo) => newSelected.add(photo.id));
    }

    setSelectedImages(newSelected);
  };

  const groupedPhotos = groupPhotosByDate(images);

  const handleNextImage = () => {
    if (zoomedImageIndex !== null && zoomedImageIndex < images.length - 1) {
      setZoomedImageIndex(zoomedImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (zoomedImageIndex !== null && zoomedImageIndex > 0) {
      setZoomedImageIndex(zoomedImageIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (zoomedImageIndex !== null) {
        if (event.key === 'ArrowRight') {
          handleNextImage();
        } else if (event.key === 'ArrowLeft') {
          handlePreviousImage();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImageIndex]);

  return (
    <div className="p-4">
      <PageHeader
        title={texts.title}
        onFileChange={handleFileChange}
        onDeleteSelectedImages={handleDeleteSelectedImages}
        onSelectSimilarImages={handleSelectSimilarImages}
        imageCount={images.length}
        selectedImageCount={selectedImages.size}
        onImport={handleImport}
        onCreateAlbum={(albumName: string) => console.log(`Créer l'album : ${albumName}`)}
        onAction={() => console.log('Action déclenchée')}
      />
      <div className="mt-4 ml-10 mr-10">
        {images.length === 0 ? (
          <EmptyPage
            title={texts.emptyFavoritesTitle}
            message={texts.emptyFavoritesMessage}
            imageSrc={<AlbumAnimateSVG />}
            actionLabel={texts.actionLabel}
            onFileChange={handleFileChange}
          />
        ) : (
          groupedPhotos.map((group) => (
            <DateGroup
              key={group.date}
              date={group.date}
              photos={group.photos}
              selectedImages={selectedImages}
              onSelectAllByDate={handleSelectAllByDate}
              onSelect={handleImageSelect}
              onZoom={setZoomedImageIndex}
            />
          ))
        )}
      </div>

      {zoomedImageIndex !== null && (
        <ZoomModal
          imageSrc={images[zoomedImageIndex].src}
          images={images}
          currentIndex={zoomedImageIndex}
          onClose={() => setZoomedImageIndex(null)}
          onNext={handleNextImage}
          onPrevious={handlePreviousImage}
        />
      )}
    </div>
  );
};

export default PrivatePhotosGrid;