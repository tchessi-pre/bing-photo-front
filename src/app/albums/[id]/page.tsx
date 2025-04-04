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
        console.error('Erreur chargement de l’album ou des images :', err);
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

  const handleDeleteSelectedImages = () => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => !selectedImages.has(index))
    );
    setSelectedImages(new Set());
  };

  const handleSelectSimilarImages = async () => {
    try {
      setScanning(true);
      const response = await mediaService.detectSimilarMedia(albumId);
      const groups = response.groups ?? [];

      setSimilarGroups(groups.map((group) => group.media));

      const firstGroup = groups[0]?.media ?? [];
      const newSelection = new Set<number>();
      firstGroup.forEach((media) => {
        const index = images.findIndex((img) => img.id === media.id);
        if (index !== -1) newSelection.add(index);
      });

      setSelectedImages(newSelection);
    } catch (err) {
      console.error('Erreur détection similaires :', err);
    } finally {
      setTimeout(() => setScanning(false), 3000);
    }
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
        onAction={() => {}}
        onImport={() => {}}
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
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                  Groupes de médias similaires détectés
                </h2>

                <div className="space-y-6">
                  {similarGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                      <h3 className="text-sm text-gray-500 mb-2">Groupe {groupIndex + 1}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {group.map((media) => (
                          <img
                            key={media.id}
                            src={`http://localhost:9090/${media.path}`}
                            alt={media.name}
                            className="w-full h-auto object-cover rounded shadow"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
