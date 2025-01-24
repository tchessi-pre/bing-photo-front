'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CloudDownload } from 'lucide-react';
import AlbumCreateDialog from '@/components/Album/AlbumCreateDialog';
import DeleteIcon from '@/assets/icons/trash.svg';
import KillerFeatureIcon from '@/assets/icons/magic-stick-3-svgrepo-com.svg';
import { usePathname } from 'next/navigation';
import { ConfirmationDialog, TooltipCustom } from '@/components/customs';

type PageHeaderProps = {
  title: string;
  onImport: () => void,
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateAlbum: (albumName: string) => void;
  onDeleteSelectedImages: () => void;
  onSelectSimilarImages: () => void;
  onAction: () => void;
  albumCount?: number;
  imageCount?: number;
  selectedImageCount?: number;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onFileChange,
  onCreateAlbum,
  onDeleteSelectedImages,
  onSelectSimilarImages,
  albumCount,
  imageCount,
  selectedImageCount,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathname = usePathname(); // Récupérer l'URL actuelle

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteSelectedImages();
    setIsDialogOpen(false);
  };

  const isAlbumDetailPage = pathname?.startsWith('/albums/');

  return (
    <div className="sticky top-14 z-40 flex w-[90vw] items-center justify-between p-6 bg-gray-100 shadow-md ml-10 border border-gray-200 mt-14 ">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        {albumCount !== undefined && (
          <span className="text-sm font-medium text-primary bg-gray-200 px-3 py-1 rounded-full">
            {albumCount} album{albumCount > 1 ? 's' : ''}
          </span>
        )}
        {imageCount !== undefined && (
          <span className="text-sm font-medium text-primary bg-gray-200 px-3 py-1 rounded-full">
            {imageCount} photo{imageCount > 1 ? 's' : ''}
          </span>
        )}
        {selectedImageCount !== undefined && selectedImageCount > 0 && (
          <span className="text-sm font-medium text-primary bg-green-200 px-3 py-1 rounded-full">
            {selectedImageCount} sélectionnée{selectedImageCount > 1 ? 's' : ''}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {/* Bouton de suppression */}
        {selectedImageCount !== undefined && selectedImageCount > 0 && (
          <TooltipCustom message="Supprime les images" position="bottom">
            <Button
              onClick={handleDeleteClick}
              className="flex items-center gap-2 px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <DeleteIcon style={{ width: '25px', height: '25px' }} />
            </Button>
          </TooltipCustom>
        )}

        {/* Bouton pour sélectionner les images similaires */}
        {isAlbumDetailPage && (
          <TooltipCustom message="Sélectionner similaires" position="bottom">
            <Button
              onClick={onSelectSimilarImages}
              className="flex items-center gap-2 px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <KillerFeatureIcon style={{ width: '25px', height: '25px' }} />
            </Button>
          </TooltipCustom>
        )}

        {/* Champ d'importation de fichiers */}
        <TooltipCustom message="Importer des images" position="bottom">
          <label
            htmlFor="file-input"
            className="flex items-center gap-2 px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
          >
            <CloudDownload className="w-5 h-5" />
            Importer
          </label>
        </TooltipCustom>
        <input
          type="file"
          id="file-input"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
        <AlbumCreateDialog onCreateAlbum={onCreateAlbum} />
      </div>
      {/* Dialogue de confirmation pour la suppression */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDialogOpen(false)}
        title="Confirmer la suppression"
        description={`Êtes-vous sûr de vouloir supprimer ${selectedImageCount ?? 0
          } image${(selectedImageCount ?? 0) > 1 ? 's' : ''} ?`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
      />
    </div>
  );
};

export default PageHeader;
