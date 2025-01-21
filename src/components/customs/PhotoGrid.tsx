import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig, ZoomIn, Heart } from 'lucide-react';
import ImageModal from '@/components/customs/ImageModal';
import ConfirmationDialog from '@/components/customs/ConfirmationDialog';

type Photo = {
  id: number;
  src: string;
  alt?: string;
};

type PhotoGridProps = {
  photos: Photo[];
};

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [favoriteImages, setFavoriteImages] = useState<Set<number>>(new Set());
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleImageSelect = (id: number) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
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

  return (
    <div className="w-full">
      <div className="px-4 py-6 mt-8">
        <div className="flex flex-wrap gap-4">
          {photos.map((photo, index) => {
            const isSelected = selectedImages.has(photo.id);
            const isFavorite = favoriteImages.has(photo.id);

            return (
              <motion.div
                key={photo.id}
                className={`relative overflow-hidden shadow-lg group w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)]`}
                initial={{ borderWidth: 0, borderColor: 'transparent', borderRadius: '0px' }}
                animate={
                  isSelected
                    ? { borderWidth: 4, borderColor: '#22c55e', borderRadius: '12px' }
                    : { borderWidth: 0, borderColor: 'transparent', borderRadius: '0px' }
                }
                transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                    className="absolute top-2 left-2 text-orange-500 gray-700/50 rounded-full p-2 shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart className="w-5 h-5 " />
                  </motion.div>
                )}

                <motion.div
                  className="absolute bottom-2 right-2 text-white bg-gray-700/50 p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedImageIndex(index);
                  }}
                >
                  <ZoomIn className="w-5 h-5" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

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
      </div>
    </div>
  );
};

export default PhotoGrid;