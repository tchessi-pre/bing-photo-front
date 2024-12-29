'use client';

import { getAlbums } from '@/services/album/albumService';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import appTexts from '@/assets/appTexts.json';
import { AlbumCarousel } from '@/components/overview';
import PhotoGallery from '@/components/overview/PhotoGallery';


const OverviewPage: React.FC = () => {
	const [albums, setAlbums] = useState(getAlbums());
	const router = useRouter();
	const texts = appTexts.overviewPage;
	
	// Fonction pour obtenir une image aléatoire
	const getRandomImage = (images: { src: string; alt: string }[]) => {
		const randomIndex = Math.floor(Math.random() * images.length);
		return images[randomIndex];
	};

	// Construire une liste d'images pour le carrousel
	const carouselImages = albums.map((album) => {
		const randomImage = getRandomImage(album.images); 
		return {
			src: randomImage.src,
			alt: `${album.title} - ${randomImage.alt}`,
			id: album.id,
			albumTitle: album.title, 
		};
	});

	const handleImageClick = (albumId: number) => {
		router.push(`/albums/${albumId}`); 
	};


	const photos = [
		{ id: 1, src: '/images/album1.jpg', date: '2023-12-21', alt: 'Photo 1' },
		{ id: 2, src: '/images/album2.jpg', date: '2023-12-21', alt: 'Photo 1' },
		{ id: 3, src: '/images/album3.jpg', date: '2023-12-21', alt: 'Photo 1' },
		{ id: 4, src: '/images/album1.jpg', date: '2023-12-21', alt: 'Photo 1' },
		{ id: 5, src: '/images/album2.jpg', date: '2023-12-21', alt: 'Photo 1' },
		{ id: 6, src: '/images/album3.jpg', date: '2023-12-21', alt: 'Photo 1' },
		{ id: 7, src: '/images/album1.jpg', date: '2023-12-21', alt: 'Photo 1' },
		{ id: 8, src: '/images/album2.jpg', date: '2023-12-21', alt: 'Photo 2' },
		{ id: 9, src: '/images/album3.jpg', date: '2023-12-22', alt: 'Photo 3' },
		{ id: 10, src: '/images/album4.jpg', date: '2023-12-23', alt: 'Photo 4' },
	];

	return (
		<div className="p-2">
			<div className="container mx-auto flex justify-center">
			<AlbumCarousel title={texts.title} images={carouselImages} onImageClick={handleImageClick} />
			</div>
			<div className="container mx-auto">
				<PhotoGallery photos={photos} />
			</div>

		</div>
	);
};

export default OverviewPage;
