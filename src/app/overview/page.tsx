'use client';

import { getAlbums } from '@/services/album/albumService';
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

const OverviewPage: React.FC = () => {
	const tokenData = decodeToken();
	const userId = tokenData?.userID;

	const { fetchMainAlbumId } = useMainAlbum();
	const router = useRouter();
	const texts = appTexts.overviewPage;

	const [albums] = useState(() => getAlbums());
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
			setError('Failed to load photos');
			console.error('Error fetching media:', error);
			setPhotos([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// Fetch main album ID and then media
	useEffect(() => {
		let isMounted = true;

		const getMainAlbumAndMedia = async () => {
			if (!userId) return;

			try {
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

		getMainAlbumAndMedia();

		return () => {
			isMounted = false;
		};
	}, []);

	const getRandomImage = (images: { src: string; alt: string }[]) => {
		if (!images.length) return { src: '', alt: '' };
		const randomIndex = Math.floor(Math.random() * images.length);
		return images[randomIndex];
	};

	// const carouselImages = albums.map((album) => {
	// 	const randomImage = getRandomImage(album.images);
	// 	return {
	// 		src: randomImage.src,
	// 		alt: `${album.title} - ${randomImage.alt}`,
	// 		id: album.id,
	// 		albumTitle: album.title,
	// 	};
	// });

	const handleImageClick = (albumId: number) => {
		router.push(`/albums/${albumId}`);
	};

	return (
		<div className='mt-8 md:ml-8 md:mr-8'>
			<div className='w-full'>
				{/* <AlbumCarousel title={texts.title} images={carouselImages} onImageClick={handleImageClick} /> */}
			</div>
			<div>
				{error && <div className='text-red-500 text-center my-4'>{error}</div>}
				{isLoading ? (
					<div className='text-center my-4'>Loading photos...</div>
				) : (
					<PhotoGallery photos={photos} />
				)}
			</div>
		</div>
	);
};

export default OverviewPage;
