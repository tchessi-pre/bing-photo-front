import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import DownloadIcon from '@/assets/icons/download.svg';
import appTexts from '@/assets/appTexts.json';
import { useMainAlbum } from '@/hooks/album/useMainAlbum';
import { mainAlbumService } from '@/services/album/mainAlbumService';
import { decodeToken } from '@/services/auth/authService';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader/Loader';

type DownloadButtonProps = {
	onFileSelected: (file: File) => void;
	onClick?: () => void;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({
	onFileSelected,
	onClick,
}) => {
	const texts = appTexts.header;
	const fileInputRef = React.useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { uploadMedia } = useMainAlbum();
	const [albumId, setAlbumId] = useState<number | null>(null);

	useEffect(() => {
		const tokenData = decodeToken();
		if (tokenData?.userID) {
			mainAlbumService
				.getMainAlbumId(tokenData.userID)
				.then((id) => setAlbumId(id))
				.catch((err) => console.error('Error fetching main album:', err));
		}
	}, []);

	const handleClick = () => {
		fileInputRef.current?.click();
		if (onClick) {
			onClick();
		}
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (files.length === 0) return;
		
		if (!albumId) {
			toast.error('Album not available. Please try again.');
			return;
		}
		
		if (isLoading) {
			toast.error('An upload is already in progress.');
			return;
		}
		
		setIsLoading(true);
		try {
			const loadingToast = toast.loading(`Uploading ${files.length} photo(s)...`);
		
			for (const file of files) {
				await uploadMedia(albumId, file);
				if (onFileSelected) await onFileSelected(file);
			}
		
			toast.success('Photos uploaded successfully!', { id: loadingToast });
			window.location.reload(); // à adapter selon ton app
		} catch (err) {
			console.error('File upload error:', err);
			toast.error('Upload failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
		
	};

	return (
		<div className='relative flex items-center group'>
			{isLoading && <Loader />}
			<Button
				variant='secondary'
				onClick={handleClick}
				className='flex items-center gap-2 rounded hover:bg-gray-300'
				disabled={isLoading}
			>
				<DownloadIcon style={{ width: '30px', height: '25px' }} />
			</Button>

			{/* Input file caché */}
			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				multiple
				onChange={handleFileChange}
				className='hidden'
			/>

			<span className='absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg inline-block whitespace-nowrap'>
				{texts.downloadTooltip}
			</span>
		</div>
	);
};

export default DownloadButton;
