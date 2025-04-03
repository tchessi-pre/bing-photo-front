'use client';

import { getAlbums } from '@/services/album/albumService';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import appTexts from '@/assets/appTexts.json';
import { AlbumCarousel } from '@/components/overview';
import PhotoGallery from '@/components/overview/PhotoGallery';
import { mediaService, MediaResponse, Media } from '@/services/album/mediaService';

const OverviewPage: React.FC = () => {
	const [albums] = useState(getAlbums()); // Charger les albums depuis le service
	const router = useRouter();
	const texts = appTexts.overviewPage;

	// Fonction pour obtenir une image aléatoire
	const getRandomImage = (images: { src: string; alt: string }[]) => {
		const randomIndex = Math.floor(Math.random() * images.length);
		return images[randomIndex];
	};

	// Construire une liste d'images pour le carrousel
	const carouselImages = albums.map((album) => {
		const randomImage = getRandomImage(album.images); // Obtenir une image aléatoire de l'album
		return {
			src: randomImage.src,
			alt: `${album.title} - ${randomImage.alt}`,
			id: album.id,
			albumTitle: album.title, // Ajouter le titre de l'album
		};
	});

	// Naviguer vers l'album spécifique au clic
	const handleImageClick = (albumId: number) => {
		router.push(`/albums/${albumId}`); // Rediriger vers la page de l'album
	};

	// const photos = [
	// 	{ id: 1, src: '/images/album1.jpg', date: '2023-12-21', alt: 'Photo 1' },
	// 	{ id: 2, src: '/images/album2.jpg', date: '2023-12-21', alt: 'Photo 1' },
	// 	{ id: 3, src: '/images/album3.jpg', date: '2023-12-21', alt: 'Photo 1' },
	// 	{ id: 4, src: '/images/album1.jpg', date: '2023-12-21', alt: 'Photo 1' },
	// 	{ id: 5, src: '/images/album2.jpg', date: '2023-12-21', alt: 'Photo 1' },
	// 	{ id: 6, src: '/images/album3.jpg', date: '2023-12-21', alt: 'Photo 1' },
	// 	{ id: 7, src: '/images/album1.jpg', date: '2023-12-21', alt: 'Photo 1' },
	// 	{ id: 8, src: '/images/album2.jpg', date: '2023-12-21', alt: 'Photo 2' },
	// 	{ id: 9, src: '/images/album3.jpg', date: '2023-12-22', alt: 'Photo 3' },
	// 	{ id: 10, src: '/images/album4.jpg', date: '2023-12-23', alt: 'Photo 4' },
	// ];


	// Photos à afficher dans la galerie
	const [photos, setPhotos] = useState<Array<{ id: number; src: string; date: string; alt: string }>>([]);

	useEffect(() => {
		const fetchAlbumMedia = async () => {
			try {
				const response: MediaResponse = await mediaService.getAlbumMedia(20);

				// Vérifier si la réponse contient un tableau de médias
				if (!response?.media || !Array.isArray(response.media)) {
					console.error('Les données reçues ne sont pas dans le format attendu:', response);
					setPhotos([]);
					return;
				}

				// Transformer les données en vérifiant chaque élément
				const formattedPhotos = response.media
					.filter((media): media is Media => media !== null && typeof media === 'object')
					.map(media => ({
						id: media.id || Date.now(), // Fallback si pas d'ID
						src: `${process.env.NEXT_PUBLIC_API_URL}/${media.path}` || '',
						date: media.createdAt || new Date().toISOString(),
						alt: media.name || 'Photo'
					}));

				setPhotos(formattedPhotos);
			} catch (error) {
				console.error('Erreur lors de la récupération des médias:', error);
				setPhotos([]); // Réinitialiser les photos en cas d'erreur
			}
		};

		fetchAlbumMedia();
	}, []);

	return (
		<div className="mt-8 md:ml-8 md:mr-8">
			<div className='w-full'>
				<AlbumCarousel title={texts.title} images={carouselImages} onImageClick={handleImageClick} />
			</div>
			<div>
				<PhotoGallery photos={photos} />
			</div>
		</div>
	);
};

export default OverviewPage;
