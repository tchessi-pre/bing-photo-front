'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CloudDownload } from 'lucide-react';
import AlbumCreateDialog from '@/components/Album/AlbumCreateDialog';
import DeleteIcon from '@/assets/icons/trash.svg';
import KillerFeatureIcon from '@/assets/icons/magic-stick-3-svgrepo-com.svg';
import { usePathname } from 'next/navigation';
import { ConfirmationDialog, TooltipCustom } from '@/components/customs';
import { motion } from 'framer-motion';

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
    <div className="sticky top-14 z-40 flex flex-col md:flex-row w-full md:w-[90vw] items-start md:items-center justify-between md:p-6 bg-gray-100 shadow-md mx-2 md:ml-10 border border-gray-200 mt-14 space-y-4 md:space-y-0">
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <h1 className="text-lg md:text-xl font-bold text-gray-800">{title}</h1>
        {albumCount !== undefined && (
          <span className="text-xs md:text-sm font-medium text-primary bg-gray-200 px-2 md:px-3 py-1 rounded-full">
            {albumCount} album{albumCount > 1 ? 's' : ''}
          </span>
        )}
        {imageCount !== undefined && (
          <motion.div
            className="rounded-full cursor-pointer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs md:text-sm font-medium text-primary bg-gray-200 px-2 md:px-3 py-1 rounded-full">
              {imageCount} photo{imageCount > 1 ? 's' : ''}
            </span>
          </motion.div>
        )}
        {selectedImageCount !== undefined && selectedImageCount > 0 && (
          <motion.div
            className="rounded-full cursor-pointer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs md:text-sm font-medium text-primary bg-green-200 px-2 md:px-3 py-1 rounded-full">
              {selectedImageCount} sélectionnée{selectedImageCount > 1 ? 's' : ''}
            </span>
          </motion.div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        {selectedImageCount !== undefined && selectedImageCount > 0 && (
          <motion.div
            className="rounded-full cursor-pointer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TooltipCustom message="Supprime les images" position="bottom">
              <Button
                onClick={handleDeleteClick}
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-bold text-gray-700 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
              >
                <DeleteIcon style={{ width: '20px', height: '20px' }} />
              </Button>
            </TooltipCustom>
          </motion.div>
        )}

        {isAlbumDetailPage && (
          <TooltipCustom message="Sélectionner similaires" position="bottom">
            <Button
              onClick={onSelectSimilarImages}
              className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-bold text-gray-700 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <KillerFeatureIcon style={{ width: '20px', height: '20px' }} />
            </Button>
          </TooltipCustom>
        )}

        <TooltipCustom message="Importer des images" position="bottom">
          <label
            htmlFor="file-input"
            className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-bold text-gray-700 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300 transition-colors"
          >
            <CloudDownload className="w-4 h-4 md:w-5 md:h-5" />
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
