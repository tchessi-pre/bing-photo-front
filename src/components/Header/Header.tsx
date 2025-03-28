'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import DownloadButton from './DownloadButton';
import SearchInput from './SearchInput';
import { useMobile } from '@/hooks/useMobile';
import DropdownMenu from '../Sidebar/DropdownMenu';
import LogoIcon from '@/assets/icons/logo.svg';
import SelectedHeaderActions from './SelectedHeaderActions';
import PinModal from '../private/PinModal';

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
	const hasSelectedImages = selectedImages.length > 0;
	const [isPinModalOpen, setIsPinModalOpen] = useState(false);
	const router = useRouter();

	// Vérifiez si un code PIN existe déjà
	const hasPin = localStorage.getItem('privatePin') !== null;

	// Gestion de la fermeture
	const handleClose = () => {
		onClose && onClose();
	};

	// Gestion de la soumission du code PIN
	const handlePinSubmit = (pin: string) => {
		console.log('Code PIN créé :', pin);
		localStorage.setItem('privatePin', pin);
		router.push('/private');
	};

	// Si l'utilisateur clique sur "Privé" et qu'un code PIN existe déjà, redirigez-le
	const handlePrivateClick = () => {
		if (hasPin) {
			router.push('/private');
		} else {
			setIsPinModalOpen(true);
		}
	};

	return (
		<header className="fixed z-50 top-0 left-0 w-full flex items-center justify-between bg-white text-gray-800 px-4 py-4 shadow">
			{hasSelectedImages ? (
				<SelectedHeaderActions
					isVisible={true}
					selectedImagesCount={selectedImages.length}
					onClose={handleClose}
					onFavorite={onFavorite}
					onShare={onShare}
					onPrivate={handlePrivateClick}
				/>
			) : (
				// Header par défaut
				<div className="flex items-center">
					<div className="flex items-center justify-normal">
						<LogoIcon className="mt-2 cursor-pointer transform hover:rotate-45 transition-transform duration-300" />
						{!isMobile && <Logo />}
					</div>

					<div className={`flex items-center ${isMobile ? 'w-full justify-between' : ''}`}>
						<DownloadButton onClick={onDownload} />
						<SearchInput
							placeholder={placeholder}
							className={isMobile ? 'w-44 ml-10' : 'w-auto ml-10 mr-10'}
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
				</div>
			)}

			{/* Modale pour créer un code PIN */}
			<PinModal
				isOpen={isPinModalOpen}
				onClose={() => setIsPinModalOpen(false)}
				onSubmit={handlePinSubmit}
			/>
		</header>
	);
};

export default Header;