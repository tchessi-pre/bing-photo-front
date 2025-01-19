'use client';

import React, { useState } from 'react';
import { X, Heart, Share2, Trash2, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipCustom } from '../customs';
import { motion } from 'framer-motion';
import ConfirmationDialog from './ConfirmationDialog';
import { getAlbums } from '@/services/album/albumService';


type ImageModalActionsProps = {
  initialIndex: number;
  liked: boolean;
  onAddToAlbum: (index: number, albumId: number) => void;
  onToggleLike: (index: number) => void;
  onDelete: (index: number) => void;
  onSelect: (index: number) => void;
  onShare: (index: number) => void;
  onClose: () => void;
};

const ImageModalActions: React.FC<ImageModalActionsProps> = ({
  initialIndex,
  liked,
  onAddToAlbum,
  onToggleLike,
  onDelete,
  onSelect,
  onShare,
  onClose,
}) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<'add' | 'delete' | null>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<number | null>(null);

  const albums = getAlbums(); // Fetch existing albums

  const handleOpenDialog = (type: 'add' | 'delete') => {
    setActionType(type);
    setIsConfirmOpen(true);
  };

  const handleCloseDialog = () => {
    setIsConfirmOpen(false);
    setActionType(null);
    setSelectedAlbum(null);
  };

  const handleConfirm = () => {
    if (actionType === 'add' && selectedAlbum !== null) {
      onAddToAlbum(initialIndex, selectedAlbum);
    } else if (actionType === 'delete') {
      onDelete(initialIndex);
    }
    handleCloseDialog();
  };

  const handleAlbumChange = (albumId: number) => {
    setSelectedAlbum(albumId);
  };

  const animations = {
    addToAlbum: { whileHover: { scale: 1.3, rotate: 15 }, transition: { duration: 0.4 } },
    like: { whileHover: { scale: 1.3, rotate: [0, -10, 10, 0] }, transition: { duration: 0.6 } },
    share: { whileHover: { y: -4 }, transition: { duration: 0.3 } },
    delete: { whileHover: { scale: 1.1, opacity: 0.8 }, transition: { duration: 0.3 } },
    select: { whileHover: { scale: 1.4 }, transition: { duration: 0.5 } },
    close: { whileHover: { rotate: 90 }, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        {/* Bouton Ajouter à un album */}
        <TooltipCustom message="Ajouter à un album" position="bottom">
          <Button
            onClick={() => handleOpenDialog('add')}
            className="w-10 h-10 bg-black/70 hover:bg-blue-600 text-white rounded-full"
          >
            <motion.div {...animations.addToAlbum}>
              <Plus className="w-6 h-6" />
            </motion.div>
          </Button>
        </TooltipCustom>

        {/* Bouton Ajouter aux favoris */}
        <TooltipCustom message="Ajouter aux favoris" position="bottom">
          <Button
            onClick={() => onToggleLike(initialIndex)}
            className="w-10 h-10 bg-black/70 hover:bg-orange-500 text-white rounded-full"
          >
            <motion.div {...animations.like}>
              {liked ? (
                <Heart className="w-6 h-6 text-white fill-current" />
              ) : (
                <Heart className="w-6 h-6" />
              )}
            </motion.div>
          </Button>
        </TooltipCustom>

        {/* Bouton Partager */}
        <TooltipCustom message="Partager" position="bottom">
          <Button
            onClick={() => onShare(initialIndex)}
            className="w-10 h-10 bg-black/70 hover:bg-black/90 text-white rounded-full"
          >
            <motion.div {...animations.share}>
              <Share2 className="w-6 h-6" />
            </motion.div>
          </Button>
        </TooltipCustom>

        {/* Bouton Supprimer */}
        <TooltipCustom message="Supprimer" position="bottom">
          <Button
            onClick={() => handleOpenDialog('delete')}
            className="w-10 h-10 bg-black/70 hover:bg-red-600 text-white rounded-full"
          >
            <motion.div {...animations.delete}>
              <Trash2 className="w-6 h-6" />
            </motion.div>
          </Button>
        </TooltipCustom>

        {/* Bouton Sélectionner */}
        <TooltipCustom message="Sélectionner" position="bottom">
          <Button
            onClick={() => onSelect(initialIndex)}
            className="w-10 h-10 bg-black/70 hover:bg-green-600 text-white rounded-full"
          >
            <motion.div {...animations.select}>
              <Check className="w-6 h-6" />
            </motion.div>
          </Button>
        </TooltipCustom>

        {/* Bouton Fermer */}
        <TooltipCustom message="Fermer" position="bottom">
          <Button
            onClick={onClose}
            className="w-10 h-10 bg-black hover:bg-black/90 text-white rounded-full"
          >
            <motion.div {...animations.close}>
              <X className="w-6 h-6" />
            </motion.div>
          </Button>
        </TooltipCustom>
      </div>

      {/* ConfirmationDialog */}
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirm}
        onCancel={handleCloseDialog}
        title={actionType === 'add' ? 'Ajouter à un album' : 'Supprimer l\'image'}
        description={
          actionType === 'add'
            ? 'Choisissez l\'album dans lequel ajouter cette image.'
            : 'Voulez-vous vraiment supprimer cette image ? Cette action est irréversible.'
        }
        confirmLabel={actionType === 'add' ? 'Ajouter' : 'Supprimer'}
        cancelLabel="Annuler"
        albums={actionType === 'add' ? albums : undefined}
        onAlbumChange={handleAlbumChange}
      />
    </>
  );
};

export default ImageModalActions;
