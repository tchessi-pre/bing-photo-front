'use client';

import { SessionProvider } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import NoSSR from '@/lib/NoSSR';
import localFont from 'next/font/local';
import './globals.css';
import { usePathname } from 'next/navigation';
import HomePage from './page';
import Loader from '@/components/Loader/Loader';

// Importation des polices locales
const robotoSans = localFont({
	src: '../assets/fonts/RobotoFlex.ttf',
	variable: '--font-roboto-sans',
	weight: '100 900',
});
const robotoMono = localFont({
	src: '../assets/fonts/RobotoMono.ttf',
	variable: '--font-roboto-mono',
	weight: '100 900',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isWelcomePage = pathname === '/';
	const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';
	const [isLoading, setIsLoading] = useState(true);

	// Simuler un chargement asynchrone
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000); // Simule un chargement de 2 secondes

		return () => clearTimeout(timer);
	}, []);

	return (
		<html lang="en">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#000000" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="BingPhoto" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="application-name" content="BingPhoto" />
				<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

			</head>
			<body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>
				<SessionProvider>
					<NoSSR>
					{isLoading ? (
						<Loader />
					) : isWelcomePage ? (
						<HomePage />
					) : isAuthPage ? (
						<div className="flex items-center justify-center h-screen bg-gray-100">
							{children}
						</div>
					) : (
						<div className="flex h-screen">
							<Header
								onDownload={() => console.log('Télécharger')}
								placeholder="Rechercher..."
								selectedImages={[]}
								onClose={() => { }}
								onFavorite={() => console.log('Ajouter aux favoris')}
								onDelete={() => console.log('Supprimer')}
								onShare={() => console.log('Partager')}
							/>
							<Sidebar />
							<main className="flex-1 flex justify-center p-6">{children}</main>
						</div>
					)}
					</NoSSR>
				</SessionProvider>
			</body>
		</html>
	);
}
