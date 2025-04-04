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
import { useAlbum } from '@/hooks/album/useAlbum';

const AlbumCreateDialog = () => {
	const [albumName, setAlbumName] = useState('');
	const [description, setDescription] = useState('');
	const { createAlbum, isLoading, error } = useAlbum();

	const texts = appTexts.albumPage.albumCreateDialog;

	const handleCreate = async () => {
		if (albumName.trim() === '') {
			alert(texts.emptyTitleAlert);
			return;
		}
		try {
			await createAlbum(albumName, description);
			setTimeout(() => {
				setAlbumName('');
				setDescription('');
			  }, 0);
		} catch (err) {
			console.error('Erreur création album', err);
			alert('Erreur lors de la création de l\'album.');
		}
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
						<Label htmlFor='albumName' className='block text-sm font-medium text-gray-700'>
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
					<div>
						<Label htmlFor='albumDescription' className='block text-sm font-medium text-gray-700'>
							{texts.albumDescriptionLabel || 'Description'}
						</Label>
						<Input
							id='albumDescription'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder={texts.albumDescriptionPlaceholder || 'Une petite description ?'}
							className='mt-2 w-full'
						/>
					</div>
					<Button
						onClick={handleCreate}
						disabled={isLoading}
						className='w-full bg-green-900 text-white hover:bg-green-800 transition-colors'
					>
						{isLoading ? texts.loadingLabel || 'Création...' : texts.createButton}
					</Button>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AlbumCreateDialog;
