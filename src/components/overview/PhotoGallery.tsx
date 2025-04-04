'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig, ZoomIn, Heart } from 'lucide-react';
import { groupPhotosByDate, Photo } from '@/services/album/photoService';
import Header from '@/components/Header/Header';
import ImageModal from '@/components/customs/ImageModal';
import ConfirmationDialog from '@/components/customs/ConfirmationDialog';
import ShareModal from '@/components/share/ShareModal';
import appTexts from '@/assets/appTexts.json';
import { useMedia } from '@/hooks/album/useMedia';

type PhotoGalleryProps = {
  photos: Photo[];
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const texts = appTexts.OverviewPage.photoGallery;

  const groupedPhotos = groupPhotosByDate(photos);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [favoriteImages, setFavoriteImages] = useState<Set<number>>(new Set());
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const isPlaceholder = (src: string) => {
    return src === '/images/placeholder.png';
  };

  // Sélection d'images
  const handleImageSelect = (id: number) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedImages(newSelected);
  };

  // Fermer la modale de zoom
  const handleCloseModal = () => {
    setZoomedImageIndex(null);
  };

  // Désélectionner toutes les images
  const handleDeselectAll = () => {
    setSelectedImages(new Set());
  };

  // Gestion des favoris
  const handleFavorite = () => {
    const newFavorites = new Set(favoriteImages);
    selectedImages.forEach((id) => {
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
    });
    setFavoriteImages(newFavorites);
    console.log(texts.consoleFavoritesUpdate, Array.from(newFavorites));
  };

  // Ouvrir la boîte de dialogue de confirmation de suppression
  const handleOpenDeleteConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  // Confirm. suppression
  const { deleteMedia, isLoading: isDeletingMedia, error: deleteError } = useMedia();

  const handleConfirmDelete = async () => {
    try {
      const deletePromises = Array.from(selectedImages).map(id => deleteMedia(id));
      await Promise.all(deletePromises);
      setSelectedImages(new Set());
      setIsConfirmationOpen(false);
      // Recharger la galerie ou mettre à jour l'état local
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la suppression des médias:', error);
    }
  };

  // Annuler suppression
  const handleCancelDelete = () => {
    setIsConfirmationOpen(false);
  };

  // Ouvrir la modale de partage
  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  // Récupérer les images sélectionnées
  const selectedPhotos = photos.filter((photo) => selectedImages.has(photo.id));

  return (
    <div className="w-full">
      {/* Header */}
      <Header
        onDownload={() => console.log(texts.consoleDownload)}
        placeholder={texts.searchPlaceholder}
        selectedImages={Array.from(selectedImages)}
        onClose={handleDeselectAll}
        onFavorite={handleFavorite}
        onDelete={handleOpenDeleteConfirmation}
        onShare={handleShare}
      />

      <div className="px-4 py-6 mt-8">
        {groupedPhotos.map((group, groupIndex) => (
          <div key={group.date} className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-300">
              {new Date(group.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>
            <div className="flex flex-wrap gap-4">
              {group.photos.map((photo, photoIndex) => {
                const isSelected = selectedImages.has(photo.id);
                const isFavorite = favoriteImages.has(photo.id);
                const placeholder = isPlaceholder(photo.src);

                return (
                  <motion.div
                    key={photo.id}
                    className={`relative overflow-hidden shadow-lg group w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)] cursor-pointer`}
                    initial={{ borderWidth: 0, borderColor: 'transparent', borderRadius: '0px' }}
                    animate={
                      isSelected
                        ? { borderWidth: 4, borderColor: '#22c55e', borderRadius: '12px' }
                        : { borderWidth: 0, borderColor: 'transparent', borderRadius: '0px' }
                    }
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    onClick={() => handleImageSelect(photo.id)}
                  >
                    <motion.img
                      src={photo.src}
                      alt={photo.alt || texts.defaultPhotoAlt}
                      className={`w-full h-48 object-contain transition-all duration-500 ${isSelected ? 'filter grayscale opacity-50' : ''}`}
                      whileHover={{ scale: 1.05 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.png';
                        target.onerror = null;
                      }}
                    />

                    {!placeholder && (
                      <motion.div
                        className={`absolute top-2 right-2 text-white bg-green-700/50 rounded-full p-2 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 cursor-pointer'
                          }`}
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageSelect(photo.id);
                        }}
                      >
                        <CircleCheckBig className="w-5 h-5" />
                      </motion.div>
                    )}

                    {isFavorite && (
                      <motion.div
                        className="absolute top-2 left-2 text-orange-500 gray-700/50 rounded-full p-2 shadow-md cursor-pointer"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleImageSelect(photo.id);
                        }}
                      >
                        <Heart className="w-6 h-6 text-orange-500 fill-current" />
                      </motion.div>
                    )}

                    {!placeholder && (
                      <motion.div
                        className="absolute bottom-2 right-2 text-white bg-gray-700/50 p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomedImageIndex(groupIndex * 100 + photoIndex);
                        }}
                      >
                        <ZoomIn className="w-5 h-5" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Modal de visualisation d'images */}
        {zoomedImageIndex !== null && (
          <ImageModal
            images={photos.map((photo) => ({
              src: photo.src,
              alt: photo.alt || texts.modalAltPlaceholder
            }))}
            initialIndex={zoomedImageIndex}
            onClose={handleCloseModal}
            onDelete={(index) => {
              console.log(`${texts.consoleDeleteImageAtIndex} ${index}`);
            }}
            onAddToAlbum={(index) => {
              console.log(`${texts.consoleAddToAlbumAtIndex} ${index}`);
            }}
            onSelect={(index) => {
              console.log(`${texts.consoleSelectImageAtIndex} ${index}`);
            }}
          />
        )}

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={isConfirmationOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title={texts.confirmationDialogTitle}
          description={texts.confirmationDialogDescription}
        />

        {/* Modale de partage */}
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          selectedImages={selectedPhotos}
        />
      </div>
    </div>
  );
};

export default PhotoGallery;