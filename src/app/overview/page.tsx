'use client';

import AlbumCarousel from '@/components/overview/AlbumCarousel';
import { getAlbums, addAlbum, deleteAlbum } from '@/services/album/albumService';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import appTexts from '@/assets/appTexts.json';


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

	return (
		<div className="p-2">
			<AlbumCarousel title={texts.title}  images={carouselImages} onImageClick={handleImageClick} />
		</div>
	);
};

export default OverviewPage;
