'use client';

import React from 'react';
import Logo from './Logo';
import DownloadButton from './DownloadButton';
import SearchInput from './SearchInput';

type HeaderProps = {
	onDownload: () => void;
	placeholder?: string;
};

const Header: React.FC<HeaderProps> = ({ onDownload, placeholder }) => {
	return (
		<header className='flex items-center justify-between bg-white text-gray-800'>
			<Logo />
			<div className='flex items-center'>
				<DownloadButton onClick={onDownload} />
				<SearchInput placeholder={placeholder} />
			</div>
		</header>
	);
};

export default Header;
