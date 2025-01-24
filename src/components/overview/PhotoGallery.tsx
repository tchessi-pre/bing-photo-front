import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig, ZoomIn, Heart } from 'lucide-react';
import { groupPhotosByDate, Photo } from '@/services/album/photoService';
import Header from '@/components/Header/Header';
import ImageModal from '@/components/customs/ImageModal';
import ConfirmationDialog from '@/components/customs/ConfirmationDialog';
import ShareModal from '@/components/share/ShareModal'; // Importer le composant ShareModal

type PhotoGalleryProps = {
  photos: Photo[];
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const groupedPhotos = groupPhotosByDate(photos);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [favoriteImages, setFavoriteImages] = useState<Set<number>>(new Set());
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // État pour le modal de partage

  const handleImageSelect = (id: number) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id); // Désélectionner l'image
    } else {
      newSelected.add(id); // Sélectionner l'image
    }
    setSelectedImages(newSelected);
  };

  const handleCloseModal = () => {
    setZoomedImageIndex(null);
  };

  const handleDeselectAll = () => {
    setSelectedImages(new Set());
  };

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
    console.log('Images favorites mises à jour:', Array.from(newFavorites));
  };

  const handleOpenDeleteConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Images supprimées:', Array.from(selectedImages));
    setSelectedImages(new Set());
    setIsConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmationOpen(false);
  };

  const handleShare = () => {
    setIsShareModalOpen(true); // Ouvrir le modal de partage
  };

  // Récupérer les images sélectionnées
  const selectedPhotos = photos.filter((photo) => selectedImages.has(photo.id));

  return (
    <div className="w-full">
      {/* Header */}
      <Header
        onDownload={() => console.log('Télécharger')}
        placeholder="Rechercher..."
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
                      alt={photo.alt || 'Photo'}
                      className={`w-full h-48 object-cover transition-all duration-500 ${isSelected ? 'filter grayscale opacity-50' : ''
                        }`}
                      whileHover={{ scale: 1.05 }}
                    />
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
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Modal with Image Viewer */}
        {zoomedImageIndex !== null && (
          <ImageModal
            images={photos.map((photo) => ({
              src: photo.src,
              alt: photo.alt || 'Image sans description',
            }))}
            initialIndex={zoomedImageIndex}
            onClose={handleCloseModal}
            onDelete={(index) => {
              console.log(`Supprimer l'image à l'index : ${index}`);
              const updatedPhotos = photos.filter((_, i) => i !== index);
              // Mettez à jour les photos si nécessaire
            }}
            onAddToAlbum={(index) => {
              console.log(`Ajouter l'image à un album : ${index}`);
            }}
            onSelect={(index) => {
              console.log(`Sélectionner l'image : ${index}`);
            }}
          />
        )}

        {/* Confirmation Dialog */}
        <ConfirmationDialog
          isOpen={isConfirmationOpen}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          title="Supprimer les images"
          description="Êtes-vous sûr de vouloir supprimer les images sélectionnées ? Cette action est irréversible."
        />

        {/* Share Modal */}
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