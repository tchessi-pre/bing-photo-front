import React from 'react';
import { Button } from '@/components/ui/button';
import DownloadIcon from '@/assets/icons/download.svg';
import appTexts from '@/assets/appTexts.json';

type DownloadButtonProps = {
	onFileSelected: (file: File) => void;
	onClick?: () => void;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ onFileSelected }) => {
	const texts = appTexts.header;
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			onFileSelected(file);
		}
	};

	return (
		<div className='relative flex items-center group'>
			<Button
				variant='secondary'
				onClick={handleClick}
				className='flex items-center gap-2 rounded hover:bg-gray-300'
			>
				<DownloadIcon style={{ width: '30px', height: '25px' }} />
			</Button>

			{/* Input file caché */}
			<input
				ref={fileInputRef}
				type="file"
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