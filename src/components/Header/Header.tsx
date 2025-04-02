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
import { useMainAlbum } from '@/hooks/album/useMainAlbum';
import { mainAlbumService } from '@/services/album/mainAlbumService';
import { decodeToken, getToken } from '@/services/auth/authService';

type HeaderProps = {
	onDownload?: (file?: File) => void; // Modifié pour accepter un fichier optionnel
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
	const { uploadMedia, isLoading, error } = useMainAlbum();
	const [albumId, setAlbumId] = useState<number | null>(null);

	useEffect(() => {
		const tokenData = decodeToken();
		if (tokenData?.userID) {
			mainAlbumService.getMainAlbumId(tokenData.userID)
				.then(id => setAlbumId(id))
				.catch(err => console.error('Error fetching main album:', err));
		}
	}, []);

	// Vérifie si un code PIN existe déjà
	const hasPin = typeof window !== 'undefined'
		? localStorage.getItem('privatePin') !== null
		: false;
	
	const handleClose = () => {
		onClose?.();
	};

	const handlePinSubmit = (pin: string) => {
		console.log('Code PIN créé :', pin);
		localStorage.setItem('privatePin', pin);
		router.push('/private');
	};

	const handlePrivateClick = () => {
		if (hasPin) {
			router.push('/private');
		} else {
			setIsPinModalOpen(true);
		}
	};

	// Gestion améliorée du téléchargement
	const handleFileSelected = async (file: File) => {
		console.log('Fichier sélectionné:', file.name);
		if (!albumId) {
			console.error('Album ID non disponible. Veuillez réessayer dans quelques instants.');
			return;
		}
		if (isLoading) {
			console.error('Chargement en cours. Veuillez patienter...');
			return;
		}
		try {
			const uploadedMedia = await uploadMedia(albumId, file);
			console.log('Media uploaded successfully:', uploadedMedia);
			onDownload?.(file);
		} catch (err) {
			console.error('Échec du téléchargement:', err);
		}
	};

	// Version alternative si vous voulez un vrai bouton de téléchargement
	const handleDownloadClick = () => {
		if (onDownload) {
			onDownload(); // Pour téléchargement depuis une URL
		} else {
			// Ouvre le sélecteur de fichier via le DownloadButton
			document.getElementById('file-input')?.click();
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
					onDownload={handleDownloadClick} // Ajouté
				/>
			) : (
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center">
						<LogoIcon
							className="mt-2 mr-6 cursor-pointer transform hover:rotate-45 transition-transform duration-300"
							onClick={() => router.push('/')}
						/>
						{!isMobile && <Logo />}
					</div>

					<div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-4'}`}>
						<DownloadButton
							onFileSelected={handleFileSelected}
							onClick={handleDownloadClick} // Nouvelle prop
						/>
						<SearchInput
							placeholder={placeholder}
							className={isMobile ? 'w-44' : 'w-64'}
						/>
					</div>

					{isMobile && (
						<div className="ml-2">
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

			<PinModal
				isOpen={isPinModalOpen}
				onClose={() => setIsPinModalOpen(false)}
				onSubmit={handlePinSubmit}
			/>
		</header>
	);
};

export default Header;