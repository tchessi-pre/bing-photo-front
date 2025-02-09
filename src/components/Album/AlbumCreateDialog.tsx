'use client';

import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import appTexts from '@/assets/appTexts.json';

type AlbumCreateDialogProps = {
	onCreateAlbum: (albumName: string) => void;
};

const AlbumCreateDialog: React.FC<AlbumCreateDialogProps> = ({
	onCreateAlbum,
}) => {
	const [albumName, setAlbumName] = useState('');

	const texts = appTexts.albumPage.albumCreateDialog;

	const handleCreate = () => {
		if (albumName.trim() === '') {
			alert(texts.emptyTitleAlert);
			return;
		}
		onCreateAlbum(albumName);
		setAlbumName('');
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='flex items-center gap-2 bg-green-900 text-white hover:bg-green-800 transition-colors'>
					<Plus className='w-5 h-5' />
					{texts.createAlbumButton}
				</Button>
			</DialogTrigger>
			<DialogContent className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
				<DialogHeader>
					<DialogTitle>{texts.dialogTitle}</DialogTitle>
				</DialogHeader>
				<div className='space-y-4'>
					<div>
						<Label
							htmlFor='albumName'
							className='block text-sm font-medium text-gray-700'
						>
							{texts.albumTitleLabel}
						</Label>
						<Input
							id='albumName'
							value={albumName}
							onChange={(e) => setAlbumName(e.target.value)}
							placeholder={texts.albumTitlePlaceholder}
							className='mt-2 w-full'
						/>
					</div>
					<Button
						onClick={handleCreate}
						className='w-full bg-green-900 text-white hover:bg-green-800 transition-colors'
					>
						{texts.createButton}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AlbumCreateDialog;
