'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import NoSSR from '@/lib/NoSSR';
import localFont from 'next/font/local';
import './globals.css';
import { usePathname } from 'next/navigation';
import HomePage from './page';

// Importation des polices locales
const robotoSans = localFont({
	src: './fonts/RobotoFlex.ttf',
	variable: '--font-roboto-sans',
	weight: '100 900',
});
const robotoMono = localFont({
	src: './fonts/RobotoMono.ttf',
	variable: '--font-roboto-mono',
	weight: '100 900',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isWelcomePage = pathname === '/';

	// États pour gérer les images sélectionnées
	const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());

	return (
		<html lang="en">
			<body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>
				<NoSSR>
					{isWelcomePage ? (
						<HomePage />
					) : (
						<div className="flex h-screen">
							{/* Header avec gestion des images sélectionnées */}
							<Header
								onDownload={() => console.log('Télécharger')}
								placeholder="Rechercher..."
								selectedImages={Array.from(selectedImages)}
								onClose={() => setSelectedImages(new Set())}
								onFavorite={() => console.log('Ajouter aux favoris')}
								onDelete={() => console.log('Supprimer')}
								onShare={() => console.log('Partager')}
							/>

							<Sidebar />
							<main className="flex-1 flex justify-center p-6">{children}</main>
						</div>
					)}
				</NoSSR>
			</body>
		</html>
	);
}
