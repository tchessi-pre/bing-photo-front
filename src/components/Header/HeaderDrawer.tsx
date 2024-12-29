'use client';

import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Share2, Trash, Heart, X, Square } from 'lucide-react'; // Ajout de Square pour désélectionner tout

type HeaderDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeselectAll: () => void; // Action pour désélectionner tout
  selectedImages: number[]; // Liste des IDs des images sélectionnées
};

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({
  isOpen,
  onClose,
  onDeselectAll,
  selectedImages,
}) => {
  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm p-4">
          {/* <DrawerHeader>
            <DrawerTitle>Options des images sélectionnées</DrawerTitle>
          </DrawerHeader> */}
          <div className="mt-4 grid grid-cols-5 gap-4 text-center">
            {/* Icone Partager */}
            <Button
              variant="outline"
              size="icon"
              className="flex flex-col items-center justify-center"
              onClick={() => console.log('Partager les images', selectedImages)}
            >
              <Share2 className="w-6 h-6" />
              <span className="text-xs mt-1">Partager</span>
            </Button>
            {/* Icone Supprimer */}
            <Button
              variant="destructive"
              size="icon"
              className="flex flex-col items-center justify-center"
              onClick={() => console.log('Supprimer les images', selectedImages)}
            >
              <Trash className="w-6 h-6" />
              <span className="text-xs mt-1">Supprimer</span>
            </Button>
            {/* Icone Liker */}
            <Button
              variant="outline"
              size="icon"
              className="flex flex-col items-center justify-center"
              onClick={() => console.log('Liker les images', selectedImages)}
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs mt-1">Liker</span>
            </Button>
            {/* Icone Désélectionner tout */}
            <Button
              variant="outline"
              size="icon"
              className="flex flex-col items-center justify-center"
              onClick={onDeselectAll} // Appel de la fonction onDeselectAll
            >
              <Square className="w-6 h-6" />
              <span className="text-xs mt-1">Désélect.</span>
            </Button>
            {/* Icone Fermer */}
            <Button
              variant="outline"
              size="icon"
              className="flex flex-col items-center justify-center"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
              <span className="text-xs mt-1">Fermer</span>
            </Button>
          </div>
        </div>
        {/* <DrawerFooter className="mt-6">
          <Button className="w-full" onClick={onDeselectAll}>
            Désélectionner tout
          </Button>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

export default HeaderDrawer;
