'use client';

import React from 'react';
import Logo from './Logo';
import DownloadButton from './DownloadButton';
import SearchInput from './SearchInput';
import { useMobile } from '@/hooks/useMobile';

type HeaderProps = {
	onDownload: () => void;
	placeholder?: string;
};

const Header: React.FC<HeaderProps> = ({ onDownload, placeholder }) => {
	const isMobile = useMobile();

	return (
		<header className='flex items-center justify-between bg-white text-gray-800 px-4 py-2'>
			{!isMobile && <Logo />}
			<div
				className={`flex items-center ${
					isMobile ? 'w-full justify-between' : ''
				}`}
			>
				<DownloadButton onClick={onDownload} />
				<SearchInput
					placeholder={placeholder}
					className={isMobile ? 'w-3/4' : 'w-auto'}
				/>
			</div>
		</header>
	);
};

export default Header;
