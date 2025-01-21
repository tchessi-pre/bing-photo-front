import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import PhotoGrid from '../customs/PhotoGrid';
import { favoritePhotos } from '@/services/favorites/favoritePhotoService';
import PageHeader from '../customs/PageHeader';
import appTexts from '@/assets/appTexts.json';
import { groupPhotosByDate } from '@/lib/groupPhotosByDate';
import { Check, Square, CircleCheckBig, ZoomIn, X } from 'lucide-react';

type Photo = {
  id: number;
  src: string;
  alt?: string;
  date: string;
};

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
      // Désélectionner toutes les photos de cette date
      photosForDate.forEach((photo) => newSelected.delete(photo.id));
    } else {
      // Sélectionner toutes les photos de cette date
      photosForDate.forEach((photo) => newSelected.add(photo.id));
    }

    setSelectedImages(newSelected);
  };

  // Grouper les photos par date
  const groupedPhotos = groupPhotosByDate(images);

  return (
    <div className="p-4">
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
        {groupedPhotos.map((group) => {
          const allPhotosSelected = group.photos.every((photo) =>
            selectedImages.has(photo.id)
          );

          return (
            <div key={group.date} className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => handleSelectAllByDate(group.date)}
                  className="px-4 py-2 text-sm font-medium text-gray-800 flex items-center gap-2"
                >
                  {allPhotosSelected ? (
                    <Check className="w-5 h-5 text-green-800" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-500" />
                  )}
                  <span>
                    {new Date(group.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </button>
              </div>
              <div className="flex flex-wrap gap-4">
                {group.photos.map((photo) => {
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
                      <motion.img
                        src={photo.src}
                        alt={photo.alt || 'Photo'}
                        className={`w-full h-48 object-cover transition-all duration-500 ${isSelected ? 'filter grayscale opacity-50' : ''
                          }`}
                        whileHover={{ scale: 1.05 }}
                      />
                      {/* Icône de sélection */}
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
                      {/* Icône de zoom */}
                      <motion.div
                        className="absolute bottom-2 right-2 text-white bg-gray-700/50 p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomedImageIndex(photo.id); // Ouvrir le zoom pour cette image
                        }}
                      >
                        <ZoomIn className="w-5 h-5" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal pour le zoom (à implémenter) */}
      {zoomedImageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={images.find((img) => img.id === zoomedImageIndex)?.src}
              alt="Zoomed"
              className="max-w-full max-h-screen"
            />
            <button
              onClick={() => setZoomedImageIndex(null)}
              className="absolute top-4 right-4 text-white bg-gray-700/50 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritePhotosGrid;