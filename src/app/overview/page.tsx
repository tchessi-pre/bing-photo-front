'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import appTexts from '@/assets/appTexts.json';
import { AlbumCarousel } from '@/components/overview';
import PhotoGallery from '@/components/overview/PhotoGallery';
import {
	mediaService,
	MediaResponse,
	Media,
} from '@/services/album/mediaService';
import { useMainAlbum } from '@/hooks/album/useMainAlbum';
import { decodeToken } from '@/services/auth/authService';
import { useAlbum } from '@/hooks/album/useAlbum';
import { useAlbumStore } from '@/store/albumStore';

const OverviewPage: React.FC = () => {
	const tokenData = decodeToken();
	const userId = tokenData?.userID;

	const { fetchMainAlbumId } = useMainAlbum();
	const router = useRouter();
	const texts = appTexts.overviewPage;

	const {
		fetchAlbums,
		isLoading: albumsLoading,
		error: albumsError,
	} = useAlbum();
	const albums = useAlbumStore((state) => state.albums);
	const [mainAlbumId, setMainAlbumId] = useState<number | null>(null);

	const [photos, setPhotos] = useState<
		Array<{ id: number; src: string; date: string; alt: string }>
	>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch album media
	const fetchAlbumMedia = useCallback(async (albumId: number) => {
		try {
			setIsLoading(true);
			const response: MediaResponse = await mediaService.getAlbumMedia(albumId);

			if (!response?.media || !Array.isArray(response.media)) {
				throw new Error('Invalid media data format');
			}

			const formattedPhotos = response.media
				.filter(
					(media): media is Media => media !== null && typeof media === 'object'
				)
				.map((media) => ({
					id: media.id || Date.now(),
					src: `${process.env.NEXT_PUBLIC_S3}/${media.path}` || '',
					date: media.createdAt || new Date().toISOString(),
					alt: media.name || 'Photo',
				}));

			setPhotos(formattedPhotos);
			setError(null);
		} catch (error) {
			setError('Aucune photo pour l\'instant');
			console.error('Error fetching media:', error);
			setPhotos([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Fetch main album ID and then media
	useEffect(() => {
		let isMounted = true;

		const initializeData = async () => {
			if (!userId) return;

			try {
				await fetchAlbums();
				const id = await fetchMainAlbumId(userId);
				if (isMounted && id !== null && id !== mainAlbumId) {
					setMainAlbumId(id);
					await fetchAlbumMedia(id);
				}
			} catch (err) {
				if (isMounted) {
					setError('Failed to fetch main album');
					console.error('Error fetching main album:', err);
				}
			}
		};

		initializeData();

		return () => {
			isMounted = false;
		};
	}, []);

	const getRandomImage = (images: { src: string; alt: string }[]) => {
		if (!images.length) return { src: '', alt: '' };
		const randomIndex = Math.floor(Math.random() * images.length);
		return images[randomIndex];
	};

	const carouselImages = albums
  .map((album) => {
    const coverImage = album?.media?.[0];
    if (!coverImage || !coverImage.path) return null;

    return {
      src: `${process.env.NEXT_PUBLIC_S3}/${coverImage.path}`,
      alt: `${album.title} - ${coverImage.name || 'Album cover'}`,
      id: album.id,
      albumTitle: album.title,
    };
  })
  .filter((img) => img !== null); // ✅ filtre les nulls


	const handleImageClick = (albumId: number) => {
		router.push(`/albums/${albumId}`);
	};

	return (
		<div className='mt-8 md:ml-8 md:mr-8'>
			{/* <div className='w-full'>
				<AlbumCarousel
					title={texts.title}
					images={carouselImages}
					onImageClick={handleImageClick}
				/>
			</div> */}
			<div>
			{isLoading ? (
			<div className="text-center py-10 text-gray-500">Chargement...</div>
			) : photos.length === 0 ? (
			<div className="flex flex-col items-center justify-center h-64 text-gray-500 text-lg">
				<p>Importer une photo pour commencer</p>
			</div>
			) : (
			<PhotoGallery photos={photos} />
			)}
			</div>
		</div>
	);
};

export default OverviewPage;
