import React from 'react';
import Link from 'next/link';
import BingPhotoLogo from '@/assets/icons/Bing-Photo.svg';

const Logo: React.FC = () => (
	<Link href='/' aria-label="Retour à l'accueil">
		<BingPhotoLogo className='w-28 h-10 cursor-pointer' />
	</Link>
);

export default Logo;
