import React from 'react';
import Link from 'next/link';
import BingPhotoLogo from '@/assets/icons/Bing-Photo.svg';
import appTexts from '@/data/appTexts.json'; // Import des textes globaux

const Logo: React.FC = () => {
	const texts = appTexts.header; // Texte spécifique au header

	return (
		<Link href='/' aria-label={texts.logoAltText}>
			<BingPhotoLogo className='w-28 h-10 cursor-pointer' />
		</Link>
	);
};

export default Logo;
