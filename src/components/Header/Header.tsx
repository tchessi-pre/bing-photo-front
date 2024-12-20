'use client';

import React from 'react';
import Logo from './Logo';
import DownloadButton from './DownloadButton';
import SearchInput from './SearchInput';
import { useMobile } from '@/hooks/useMobile';
import DropdownMenu from '../Sidebar/DropdownMenu';

type HeaderProps = {
	onDownload: () => void;
	placeholder?: string;
};

const Header: React.FC<HeaderProps> = ({ onDownload, placeholder }) => {
	const isMobile = useMobile();

	// Exemple de données pour navItems
	const navItems = [
		{ name: 'Home', link: '/' },
		{ name: 'Profile', link: '/profile' },
		{ name: 'Settings', link: '/settings' },
	];

	return (
		<header className='fixed z-50  w-full flex items-center justify-between bg-white text-gray-800 px-4 py-4 ml-24 mr-24'>
			{!isMobile && <Logo />}
			<div
				className={`flex items-center mr-32 mt-4 ${isMobile ? 'w-full justify-between' : ''}`}
			>
				<DownloadButton onClick={onDownload} />

				<SearchInput
					placeholder={placeholder}
					className={isMobile ? 'w-44 ml-10' : 'w-auto ml-10'}
				/>
			</div>
			{isMobile && (
				<div className="mt-2 w-full">
					<DropdownMenu navItems={navItems} />
				</div>
			)}
		</header>
	);
};

export default Header;
