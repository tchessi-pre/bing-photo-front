import React, { useState, useEffect } from 'react';
import PageHeader from '../customs/PageHeader';
import appTexts from '@/assets/appTexts.json';
import { groupPhotosByDate } from '@/lib/groupPhotosByDate';
import DateGroup from '../customs/DateGroup';
import EmptyPage from '../customs/EmptyPage';
import AlbumAnimateSVG from '@/assets/svg-animate/photo-album-pana.svg';
import { getPrivateMedia } from '@/services/private/privatePhotoService';
import ZoomModal from '../favorites/ZoomModal';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '@/api/apiConfig';

type Photo = {
  id: number;
  name: string;
  path: string;
  date: string;
};

const PrivatePhotosGrid: React.FC = () => {
  const texts = appTexts.PrivatePage;

  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [images, setImages] = useState<Photo[]>([]);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPrivatePhotos = async () => {
      try {

        const { media } = await getPrivateMedia();
        // console.log('media:', media)
        const mappedPhotos = media.map((m: any) => ({
          id: m.id,
          name: m.name,
          path: m.path,
          date: new Date().toISOString().split('T')[0],
        }));

        setImages(mappedPhotos);
      } catch (error) {
        console.error('Erreur lors du chargement des photos privées:', error);
        toast.error('Erreur lors du chargement des photos privées');
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrivatePhotos();
  }, []);

  const handleImageSelect = (id: number) => {
    const newSelected = new Set(selectedImages);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedImages(newSelected);
  };

  const groupedPhotos = groupPhotosByDate(
    images.map((img) => ({
      id: img.id,
      src: `http://localhost:9090/${img.path}`,
      alt: img.name,
      date: img.date,
    }))
  );

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
        if (event.key === 'ArrowRight') handleNextImage();
        else if (event.key === 'ArrowLeft') handlePreviousImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImageIndex]);

  const handleDeleteSelectedImages = async () => {
    try {
      const selectedIds = Array.from(selectedImages);

      if (selectedIds.length === 0) {
        toast.error('Aucune image sélectionnée');
        return;
      }

      await Promise.all(
        selectedIds.map((id) => api.delete(`/media/${id}`))
      );

      setImages((prevImages) =>
        prevImages.filter((img) => !selectedIds.includes(img.id))
      );
      setSelectedImages(new Set());
      toast.success(`${selectedIds.length} image(s) supprimée(s)`);
    } catch (error) {
      console.error('Erreur lors de la suppression des images:', error);
      toast.error('Erreur lors de la suppression des images');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="p-4"
    >
      <PageHeader
        title={texts.title}
        imageCount={images?.length || 0}
        selectedImageCount={selectedImages.size}
        onDeleteSelectedImages={handleDeleteSelectedImages}
        onImport={() => {}}
        onFileChange={() => {}}
        onCreateAlbum={() => {}}
        onSelectSimilarImages={() => {}}
        onAction={() => {}}
      />

      <div className="mt-4 ml-10 mr-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Chargement des photos privées...</p>
          </div>
        ) : images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EmptyPage
              title={texts.emptyFavoritesTitle}
              message={texts.emptyFavoritesMessage}
              imageSrc={<AlbumAnimateSVG />}
              actionLabel={texts.actionLabel}
            />
          </motion.div>
        ) : (
          groupedPhotos.map((group, index) => (
            <motion.div
              key={group.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DateGroup
                date={group.date}
                photos={group.photos}
                selectedImages={selectedImages}
                onSelectAllByDate={() => {}}
                onSelect={handleImageSelect}
                onZoom={setZoomedImageIndex}
              />
            </motion.div>
          ))
        )}
      </div>

      {zoomedImageIndex !== null && images[zoomedImageIndex] && (() => {
        const currentImage = images[zoomedImageIndex];
        return (
          <ZoomModal
            imageSrc={`http://localhost:9090/${currentImage.path}`}
            images={images.map((img) => ({
              src: `http://localhost:9090/${img.path}`,
              alt: img.name,
            }))}
            currentIndex={zoomedImageIndex}
            onClose={() => setZoomedImageIndex(null)}
            onNext={handleNextImage}
            onPrevious={handlePreviousImage}
          />
        );
      })()}
    </motion.div>
  );
};

export default PrivatePhotosGrid;
