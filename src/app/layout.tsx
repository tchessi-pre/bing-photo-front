import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Sidebar from '@/components/Sidebar/Sidebar';
import NoSSR from '@/components/NoSSR';

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

export const metadata: Metadata = {
	title: 'Bing Photo',
	description:
		"Bienvenue sur Bing Photo, votre application de gestion de photos en ligne ! Explorez et gérez vos albums, profitez d'analyses visuelles intuitives, et retrouvez facilement vos photos préférées.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
			>
				<NoSSR>
					<div className='flex h-screen'>
						{/* Sidebar persistante */}
						<Sidebar />
						{/* Contenu principal */}
						<main className='flex-1 p-6'>{children}</main>
					</div>
				</NoSSR>
			</body>
		</html>
	);
}
