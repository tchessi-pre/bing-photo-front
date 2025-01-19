'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import de Framer Motion
import Logo from './Logo';
import DownloadButton from './DownloadButton';
import SearchInput from './SearchInput';
import { useMobile } from '@/hooks/useMobile';
import DropdownMenu from '../Sidebar/DropdownMenu';
import CloseIcon from '@/assets/icons/close-square-svgrepo-com.svg';
import AddToFavoriteIcon from '@/assets/icons/gallery-favourite-svgrepo-com.svg';
import DeleteIcon from '@/assets/icons/trash.svg';
import ShareIcon from '@/assets/icons/share.svg';
import LogoIcon from '@/assets/icons/logo.svg';
import SelectedHeaderActions from './SelectedHeaderActions';

type HeaderProps = {
	onDownload: () => void;
	placeholder?: string;
	selectedImages?: number[];
	onClose?: () => void;
	onFavorite?: () => void;
	onDelete?: () => void;
	onShare?: () => void;
};

const Header: React.FC<HeaderProps> = ({
	onDownload,
	placeholder,
	selectedImages = [],
	onClose,
	onFavorite,
	onDelete,
	onShare,
}) => {
	const isMobile = useMobile();
	const hasSelectedImages = selectedImages.length > 0; // Vérifie si des images sont sélectionnées

	// État local pour contrôler la visibilité des icônes
	const [isVisible, setIsVisible] = useState(true);

	// Gestion de la fermeture
	const handleClose = () => {
		setIsVisible(false);
		setTimeout(() => {
			onClose && onClose();
			setIsVisible(true);
		}, 500);
	};

	return (
		<header className="fixed z-50 top-0 left-0 w-full flex items-center justify-between bg-white text-gray-800 px-4 py-4 shadow">
			{hasSelectedImages ? (
				<SelectedHeaderActions
					isVisible={isVisible}
					selectedImagesCount={selectedImages.length}
					onClose={handleClose}
					onFavorite={onFavorite}
					onDelete={onDelete}
					onShare={onShare}
				/>
			) : (
				// Header par défaut
				<>
					{!isMobile && (
						<div className="flex items-center">
							<LogoIcon  />
							<Logo />
						</div>
					)}

					<div
						className={`flex items-center ${isMobile ? 'w-full justify-between' : ''}`}
					>
						<DownloadButton onClick={onDownload} />
						<SearchInput
							placeholder={placeholder}
							className={isMobile ? 'w-44 ml-10' : 'w-auto ml-10'}
						/>
					</div>
					{isMobile && (
						<div className="mt-2 w-full">
							<DropdownMenu
								navItems={[
									{ name: 'Home', link: '/' },
									{ name: 'Profile', link: '/profile' },
									{ name: 'Settings', link: '/settings' },
								]}
							/>
						</div>
					)}
				</>
			)}
		</header>
	);
};

export default Header;
