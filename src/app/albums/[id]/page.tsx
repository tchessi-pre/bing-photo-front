'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageGrid from '@/components/Album/ImageGrid';
import AlbumAnimateSVG from '@/assets/svg-animate/photo-album-pana.svg';
import appTexts from '@/assets/appTexts.json';

import {
  getAlbumById,
  toggleImageSelection,
  getAlbums,
} from '@/services/album/albumDetailService';

import { PageHeader } from '@/components/Album';
import { EmptyPage } from '@/components/customs';
import { mediaService, Media } from '@/services/album/mediaService';
import { useMedia } from '@/hooks/album/useMedia';

const AlbumDetailPage: React.FC = () => {
  type Image = {
    id?: number;
    src: string;
    alt: string;
  };

  const texts = appTexts.AlbumDetailPage;
  const params = useParams();
  const albumId = parseInt(params?.id as string, 10);

  const [album, setAlbum] = useState<any | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [similarGroups, setSimilarGroups] = useState<Media[][]>([]);
  const [scanning, setScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAlbums();
        const currentAlbum = getAlbumById(albumId);
        setAlbum(currentAlbum);

        const response = await mediaService.getAlbumMedia(albumId);
        const formattedImages = Array.isArray(response.media)
          ? response.media.map((media: any) => ({
            id: media.id,
            src: `http://localhost:9090/${media.path}`,
            alt: media.name || 'image',
          }))
          : [];
        setImages(formattedImages);
      } catch (err) {
        console.error(`Erreur chargement de l'album ou des images :`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [albumId]);

  const handleImageSelect = (index: number) => {
    const updatedSelection = toggleImageSelection(selectedImages, index);
    setSelectedImages(updatedSelection);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      for (const file of Array.from(files)) {
        const previewSrc = URL.createObjectURL(file);
        const tempImage = { src: previewSrc, alt: file.name };
        setImages((prev) => [...prev, tempImage]);

        try {
          const media = await mediaService.importToAlbum(albumId, file);
          if (media && media.path) {
            const realImage = {
              id: media.id,
              src: `http://localhost:9090/${media.path}`,
              alt: media.name || file.name,
            };
            setImages((prev) =>
              prev.map((img) => (img.src === previewSrc ? realImage : img))
            );
          }
        } catch (err) {
          console.error('Erreur upload image :', err);
          setImages((prev) => prev.filter((img) => img.src !== previewSrc));
        }
      }
    }
  };

  const { deleteMedia, isLoading: isDeletingMedia } = useMedia();

  const handleDeleteSelectedImages = async () => {
    try {
      const selectedMediaIds = Array.from(selectedImages).map(index => images[index].id);
      for (const mediaId of selectedMediaIds) {
        if (mediaId) {
          await deleteMedia(mediaId);
        }
      }
      setImages((prevImages) =>
        prevImages.filter((_, index) => !selectedImages.has(index))
      );
      setSelectedImages(new Set());
      setSimilarGroups([]);
      setActiveGroupIndex(null);
    } catch (err) {
      console.error('Erreur lors de la suppression des médias:', err);
    }
  };

  const handleSelectSimilarImages = async () => {
    try {
      setScanning(true);
      const response = await mediaService.detectSimilarMedia(albumId);
      const groups = response.groups ?? [];
      setSimilarGroups(groups.map((group) => group.media));

      // Sélectionner automatiquement le premier groupe trouvé
      if (groups.length > 0) {
        selectGroup(0);
        setActiveGroupIndex(0);
      }
    } catch (err) {
      console.error('Erreur détection similaires :', err);
    } finally {
      setTimeout(() => setScanning(false), 3000);
    }
  };

  const selectGroup = (groupIndex: number) => {
    const group = similarGroups[groupIndex];
    if (!group) return;

    const newSelection = new Set<number>();
    group.forEach((media) => {
      const index = images.findIndex((img) => img.id === media.id);
      if (index !== -1) newSelection.add(index);
    });

    setSelectedImages(newSelection);
    setActiveGroupIndex(groupIndex);
  };

  if (!album) {
    return <div className="p-4">{texts.albumNotFound}</div>;
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
        onAction={() => { }}
        onImport={() => { }}
      />

      <div className="mt-4 ml-10 mr-10">
        {isLoading ? (
          <p>Chargement des images...</p>
        ) : images.length === 0 ? (
          <EmptyPage
            title={texts.emptyAlbumTitle}
            message={texts.emptyAlbumMessage}
            imageSrc={<AlbumAnimateSVG />}
            actionLabel={texts.addImagesAction}
            onFileChange={handleFileChange}
          />
        ) : (
          <>
            <ImageGrid
              images={images}
              selectedImages={selectedImages}
              onImageSelect={handleImageSelect}
              onDelete={() => null}
              scanning={scanning}
            />

            {similarGroups.length > 0 && (
              <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Groupes de médias similaires
                </h2>

                <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                  {similarGroups.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => selectGroup(index)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeGroupIndex === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                      Groupe {index + 1} ({similarGroups[index].length})
                    </button>
                  ))}
                </div>

                {activeGroupIndex !== null && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Groupe {activeGroupIndex + 1} - {similarGroups[activeGroupIndex].length} images similaires
                      </h3>
                      <button
                        onClick={() => {
                          const newSelection = new Set(selectedImages);
                          similarGroups[activeGroupIndex].forEach(media => {
                            const index = images.findIndex(img => img.id === media.id);
                            if (index !== -1) newSelection.delete(index);
                          });
                          setSelectedImages(newSelection);
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Désélectionner ce groupe
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {similarGroups[activeGroupIndex].map((media) => {
                        const imageIndex = images.findIndex(img => img.id === media.id);
                        return (
                          <div
                            key={media.id}
                            className={`relative rounded-lg overflow-hidden border-2 ${selectedImages.has(imageIndex)
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-transparent'
                              }`}
                          >
                            <img
                              src={`http://localhost:9090/${media.path}`}
                              alt={media.name}
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                              {selectedImages.has(imageIndex) && (
                                <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;