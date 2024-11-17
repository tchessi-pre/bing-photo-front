"use client";

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import NoSSR from '@/components/NoSSR';
import Header from '@/components/Header/Header';

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

// export const metadata: Metadata = {
// 	title: 'Bing Photo',
// 	description:
// 		"Bienvenue sur Bing Photo, votre application de gestion de photos en ligne ! Explorez et gérez vos albums, profitez d'analyses visuelles intuitives, et retrouvez facilement vos photos préférées.",
// };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
	}) {
		const handleDownload = () => {
			console.log('Téléchargement en cours...');
		};

		return (
			<html lang='en'>
				<body
					className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
				>
					<NoSSR>
						<div className='flex h-screen'>
							<Sidebar />
							<main className='flex-1 p-6'>
							<Header
								onDownload={handleDownload}
								placeholder='Rechercher une photo...'
							/>
								{children}
							</main>
						</div>
					</NoSSR>
				</body>
			</html>
		);
	}
