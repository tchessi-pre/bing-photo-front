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
import { mediaService } from '@/services/album/mediaService';

const AlbumDetailPage: React.FC = () => {
  const texts = appTexts.AlbumDetailPage;
  const params = useParams();
  const albumId = parseInt(params?.id as string, 10);

  const [album, setAlbum] = useState<any | null>(null);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [scanning, setScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 🔁 Récupère les images depuis le backend au montage
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAlbums(); // charge les albums dans le store
        const currentAlbum = getAlbumById(albumId);
        setAlbum(currentAlbum);

        const response = await mediaService.getAlbumMedia(albumId);
        const formattedImages = Array.isArray(response.media)
          ? response.media.map((media: any) => ({
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
  
        // 1. Affiche l’image immédiatement en local
        const tempImage = { src: previewSrc, alt: file.name };
        setImages((prev) => [...prev, tempImage]);
  
        try {
          // 2. Envoie au backend
          const media = await mediaService.importToAlbum(albumId, file);
  
          // 3. Si le backend répond bien, on remplace l’image locale par la vraie
          if (media && media.path) {
            const realImage = {
              src: `http://localhost:9090/${media.path}`,
              alt: media.name || file.name,
            };
  
            setImages((prev) =>
              prev.map((img) =>
                img.src === previewSrc ? realImage : img
              )
            );
          } else {
            console.warn('Path manquant, on garde le preview local.');
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

  const handleSelectSimilarImages = () => {
    const newSelection = new Set<number>();
    images.forEach((image, index) => {
      if (image.alt.includes('similar')) {
        newSelection.add(index);
      }
    });
    setSelectedImages(newSelection);
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
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
          <ImageGrid
            images={images}
            selectedImages={selectedImages}
            onImageSelect={handleImageSelect}
            onDelete={() => null}
            scanning={scanning}
          />
        )}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
