import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { favoritePhotos } from '@/services/favorites/favoritePhotoService';
import PageHeader from '../customs/PageHeader';
import appTexts from '@/assets/appTexts.json';
import { groupPhotosByDate } from '@/lib/groupPhotosByDate';
import ZoomModal from './ZoomModal';
import DateGroup from '../customs/DateGroup';
import EmptyPage from '../customs/EmptyPage';
import AlbumAnimateSVG from '@/assets/svg-animate/photo-album-pana.svg';
import { Photo } from '@/types/types';
import { motion } from 'framer-motion'; // Importer motion depuis framer-motion

const FavoritePhotosGrid: React.FC = () => {
  const texts = appTexts.AlbumDetailPage;
  const params = useParams();
  const albumId = parseInt(params?.id as string, 10);

  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [images, setImages] = useState<Photo[]>(favoritePhotos);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

  const handleImageSelect = (id: number) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedImages(newSelected);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
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

  // Grouper les photos par date
  const groupedPhotos = groupPhotosByDate(images);

  // Fonction pour passer à l'image suivante
  const handleNextImage = () => {
    if (zoomedImageIndex !== null && zoomedImageIndex < images.length - 1) {
      setZoomedImageIndex(zoomedImageIndex + 1);
    }
  };

  // Fonction pour revenir à l'image précédente
  const handlePreviousImage = () => {
    if (zoomedImageIndex !== null && zoomedImageIndex > 0) {
      setZoomedImageIndex(zoomedImageIndex - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // État initial : invisible et légèrement décalé vers le bas
      animate={{ opacity: 1, y: 0 }} // État animé : visible et à sa position normale
      transition={{ duration: 0.5, ease: 'easeOut' }} // Durée et type de transition
      className="p-4"
    >
      <PageHeader
        title="Mes Favoris"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} // Animation pour la page vide
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }} // Délai pour un effet en cascade
          >
            <EmptyPage
              title="Aucune image favorite"
              message="Ajoutez des images à vos favoris pour les voir ici."
              imageSrc={<AlbumAnimateSVG />}
              actionLabel="Ajouter des images"
              onFileChange={handleFileChange}
            />
          </motion.div>
        ) : (
          groupedPhotos.map((group, index) => (
            <motion.div
              key={group.date}
              initial={{ opacity: 0, y: 20 }} // Animation pour chaque groupe de dates
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Délai pour un effet en cascade
            >
              <DateGroup
                date={group.date}
                photos={group.photos}
                selectedImages={selectedImages}
                onSelectAllByDate={handleSelectAllByDate}
                onSelect={handleImageSelect}
                onZoom={setZoomedImageIndex}
              />
            </motion.div>
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
    </motion.div>
  );
};

export default FavoritePhotosGrid;