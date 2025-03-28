import React from 'react';
import Link from 'next/link';
import BingPhotoLogo from '@/assets/icons/Bing-Photo.svg';
import appTexts from '@/assets/appTexts.json';

const Logo: React.FC = () => {
	const texts = appTexts.header;

	return (
		<Link href='/' aria-label={texts.logoAltText}>
			<BingPhotoLogo className='w-auto h-auto cursor-pointer mt-2' />
		</Link>
	);
};

export default Logo;
