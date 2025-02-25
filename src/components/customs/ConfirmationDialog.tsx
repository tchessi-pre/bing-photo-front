'use client';

import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AlbumSelect from './AlbumSelect';

type Album = {
	id: number;
	title: string;
};

type ConfirmationDialogProps = {
	isOpen: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	title: string;
	description: string;
	confirmLabel?: string;
	cancelLabel?: string;
	albums?: Album[];
	onAlbumChange?: (albumId: number) => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
	isOpen,
	onConfirm,
	onCancel,
	title,
	description,
	confirmLabel = 'Confirmer',
	cancelLabel = 'Annuler',
	albums,
	onAlbumChange,
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{albums && onAlbumChange && (
					<AlbumSelect albums={albums} onAlbumChange={onAlbumChange} />
				)}
				<DialogFooter>
					<Button variant='secondary' onClick={onCancel}>
						{cancelLabel}
					</Button>
					<Button variant='destructive' onClick={onConfirm}>
						{confirmLabel}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmationDialog;
