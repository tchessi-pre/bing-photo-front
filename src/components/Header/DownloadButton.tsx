import React from 'react';
import { Button } from '@/components/ui/button';
import DownloadIcon from '@/assets/icons/download.svg';
import appTexts from '@/assets/appTexts.json'; 

type DownloadButtonProps = {
	onClick: () => void;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick }) => {
	const texts = appTexts.header;
	return (
		<div className='relative flex items-center group'>
			<Button
				variant='secondary'
				onClick={onClick}
				className='flex items-center gap-2 rounded hover:bg-gray-300'
			>
				<DownloadIcon style={{ width: '30px', height: '25px' }} />
			</Button>
			<span className='absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg inline-block whitespace-nowrap'>
				{texts.downloadTooltip}
			</span>
		</div>
	);
};

export default DownloadButton;
