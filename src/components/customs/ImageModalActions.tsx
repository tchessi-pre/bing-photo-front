'use client';

import React from 'react';
import { X, Heart, Share2, Trash2, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipCustom } from '../customs';

type ImageModalActionsProps = {
  initialIndex: number;
  liked: boolean;
  onAddToAlbum: (index: number) => void;
  onToggleLike: (index: number) => void;
  onDelete: (index: number) => void;
  onSelect: (index: number) => void;
  onClose: () => void;
};

const ImageModalActions: React.FC<ImageModalActionsProps> = ({
  initialIndex,
  liked,
  onAddToAlbum,
  onToggleLike,
  onDelete,
  onSelect,
  onClose,
}) => (
  <div className="absolute top-4 right-4 flex items-center space-x-2">
    {/* Bouton Ajouter à un album */}
    <TooltipCustom message="Ajouter à un album" position="bottom">
      <Button
        onClick={() => onAddToAlbum(initialIndex)}
        className="w-10 h-10 bg-black/70 hover:bg-blue-600 text-white rounded-full"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </TooltipCustom>

    {/* Bouton Ajouter aux favoris */}
    <TooltipCustom message="Ajouter aux favoris" position="bottom">
      <Button
        onClick={() => onToggleLike(initialIndex)}
        className="w-10 h-10 bg-black/70 hover:bg-orange-500 text-white rounded-full"
      >
        {liked ? (
          <Heart className="w-6 h-6 text-white fill-current" />
        ) : (
          <Heart className="w-6 h-6" />
        )}
      </Button>
    </TooltipCustom>

    {/* Bouton Partager */}
    <TooltipCustom message="Partager" position="bottom">
      <Button
        onClick={() => console.log('Partager')}
        className="w-10 h-10 bg-black/70 hover:bg-black/90 text-white rounded-full"
      >
        <Share2 className="w-6 h-6" />
      </Button>
    </TooltipCustom>

    {/* Bouton Supprimer */}
    <TooltipCustom message="Supprimer" position="bottom">
      <Button
        onClick={() => onDelete(initialIndex)}
        className="w-10 h-10 bg-black/70 hover:bg-red-600 text-white rounded-full"
      >
        <Trash2 className="w-6 h-6" />
      </Button>
    </TooltipCustom>

    {/* Bouton Sélectionner */}
    <TooltipCustom message="Sélectionner" position="bottom">
      <Button
        onClick={() => onSelect(initialIndex)}
        className="w-10 h-10 bg-black/70 hover:bg-green-600 text-white rounded-full"
      >
        <Check className="w-6 h-6" />
      </Button>
    </TooltipCustom>

    {/* Bouton Fermer */}
    <TooltipCustom message="Fermer" position="bottom">
      <Button
        onClick={onClose}
        className="w-10 h-10 bg-black hover:bg-black/90 text-white rounded-full"
      >
        <X className="w-6 h-6" />
      </Button>
    </TooltipCustom>
  </div>
);

export default ImageModalActions;
