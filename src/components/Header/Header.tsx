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
import toast from 'react-hot-toast';
import { markMediaAsPrivate, setPrivatePin } from '@/services/private/privatePhotoService';

type HeaderProps = {
	onDownload?: (file?: File) => void; // Modifié pour accepter un fichier optionnel
	placeholder?: string;
	selectedImages?: number[];
	onClose?: () => void;
	onFavorite?: () => void;
	onDelete?: () => void;
	onShare?: () => void;
	onAddToAlbum?: () => void;
	hideImportButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({
	onDownload,
	placeholder,
	selectedImages = [],
	onClose,
	onFavorite,
	onDelete,
	onShare,
	onAddToAlbum,
	hideImportButton = false,
}) => {
	const isMobile = useMobile();
	const hasSelectedImages = selectedImages.length > 0;
	const [isPinModalOpen, setIsPinModalOpen] = useState(false);
	const router = useRouter();



	const handleClose = () => {
		onClose?.();
	};

	const handlePinSubmit = async (pin: string) => {
		try {
		  await setPrivatePin(pin);
	  
		  // Une fois le PIN défini, marquer les images comme privées
		  await Promise.all(
			selectedImages.map((id) => {
			  console.log('mediaID à traiter :', id);
			  return markMediaAsPrivate(id);
			})
		  );
		  
		  toast.success('Image(s) déplacée(s) dans les photos privées');
		} catch (err) {
		  toast.error('Échec de la création du code PIN');
		} finally {
		  setIsPinModalOpen(false);
		  router.push('/private');
		}
	  };

	  const handlePrivateClick = async () => {
		// const pin = localStorage.getItem('privatePin');
	
		// if (pin) {
			try {
				let shouldAskForPin = false;
	
				const results = await Promise.all(
					selectedImages.map(async (id) => {
						const response = await markMediaAsPrivate(id);
						if (response?.pin_required) shouldAskForPin = true;
						return response;
					})
				);
	
				if (shouldAskForPin) {
					setIsPinModalOpen(true);
				} else {
					toast.success('Image(s) déplacée(s) dans les photos privées');
				}
			} catch (err) {
				console.error(err);
				toast.error('Erreur lors du déplacement en privé.');
			}
		// } else {
			// setIsPinModalOpen(true); // Ouvre la modale pour créer un PIN
		// }
	};
	

	const handleFileSelected = (file: File) => {
		onDownload?.(file);
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
					onDownload={handleDownloadClick}
					onDelete={onDelete} // Ajout de la prop onDelete
					onAddToAlbum={onAddToAlbum}
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
					{!hideImportButton && (
						<DownloadButton
							onFileSelected={handleFileSelected}
							onClick={handleDownloadClick} // Nouvelle prop
						/>
					)}
						{/* <SearchInput
							placeholder={placeholder}
							className={isMobile ? 'w-44' : 'w-64'}
						/> */}
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