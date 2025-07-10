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
			// Enregistre le code PIN et crée l’album privé si nécessaire
			await setPrivatePin(pin);
	
			// Pause de sécurité pour laisser le temps à l’album d’être créé
			await new Promise((res) => setTimeout(res, 300));
	
			// Déplace les images une à une (pour éviter les erreurs)
			for (const id of selectedImages) {
				await markMediaAsPrivate(id, false); 
			}
	
			toast.success('Image(s) déplacée(s) dans les photos privées');
	
			// Pause optionnelle avant la redirection
			await new Promise((res) => setTimeout(res, 500));
	
			router.push('/private');
		} catch (err) {
			toast.error('Échec du processus de sécurisation des images');
		} finally {
			setIsPinModalOpen(false);
		}
	};


	const handlePrivateClick = async () => {
		try {
			// Vérifie si un PIN est requis via une simulation
			const response = await markMediaAsPrivate(selectedImages[0], true); // simulate = true
	
			if (response?.pin_required) {
				// Affiche la modale de saisie du PIN si nécessaire
				setIsPinModalOpen(true);
				return;
			}
	
			// Sinon, effectue directement le déplacement des médias
			await Promise.all(
				selectedImages.map((id) => markMediaAsPrivate(id, false))
			);
	
			toast.success('Image(s) déplacée(s) dans les photos privées');
			router.push('/private'); // Redirection directe
		} catch (err) {
			console.error('Erreur lors de la simulation ou du marquage :', err);
			toast.error('Erreur lors du déplacement en privé.');
		}
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