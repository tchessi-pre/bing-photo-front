'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig, ZoomIn } from 'lucide-react';
import { groupPhotosByDate, Photo } from '@/services/album/photoService';
import Header from '@/components/Header/Header';
import ImageModal from '@/components/customs/ImageModal';

type PhotoGalleryProps = {
  photos: Photo[];
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const groupedPhotos = groupPhotosByDate(photos);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());

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
    console.log('Images favorites:', Array.from(selectedImages));
  };

  const handleDelete = () => {
    console.log('Images supprimées:', Array.from(selectedImages));
  };

  const handleShare = () => {
    console.log('Images partagées:', Array.from(selectedImages));
  };

  function handleAddToAlbum(index: number): void {
    throw new Error('Function not implemented.');
  }

  function handleSelect(index: number): void {
    throw new Error('Function not implemented.');
  }
  return (
    <div className="w-full">
      {/* Header */}
      <Header
        onDownload={() => console.log('Télécharger')}
        placeholder="Rechercher..."
        selectedImages={Array.from(selectedImages)}
        onClose={handleDeselectAll}
        onFavorite={handleFavorite}
        onDelete={handleDelete}
        onShare={handleShare}
      />

      <div className="px-4 py-6 mt-8">
        {groupedPhotos.map((group, groupIndex) => (
          <div key={group.date} className="mb-8">
            {/* Date Title */}
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-300">
              {new Date(group.date).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>

            {/* Photo Row */}
            <div className="flex flex-wrap gap-4">
              {group.photos.map((photo, photoIndex) => {
                const isSelected = selectedImages.has(photo.id);

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
                    {/* Image avec Effet au Survol */}
                    <motion.img
                      src={photo.src}
                      alt={photo.alt || 'Photo'}
                      className={`w-full h-48 object-cover transition-all duration-500 ${isSelected ? 'filter grayscale opacity-50' : ''
                        }`}
                      whileHover={{ scale: 1.05 }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

                    {/* Check Icon */}
                    <motion.div
                      className={`absolute top-2 right-2 text-white bg-green-700/50 rounded-full p-2 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 cursor-pointer'
                        }`}
                      whileHover={{
                        scale: 1.1,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageSelect(photo.id);
                      }}
                    >
                      <CircleCheckBig className="w-5 h-5" />
                    </motion.div>

                    {/* ZoomIn Icon */}
                    <motion.div
                      className="absolute bottom-2 right-2 text-white bg-gray-700/50 p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                      whileHover={{
                        scale: 1.1,
                      }}
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
            onDelete={handleDelete}
            onAddToAlbum={handleAddToAlbum}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
