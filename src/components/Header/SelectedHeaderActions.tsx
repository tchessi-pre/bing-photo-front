'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@/assets/icons/close-square-svgrepo-com.svg';
import AddToFavoriteIcon from '@/assets/icons/gallery-favourite-svgrepo-com.svg';
import DeleteIcon from '@/assets/icons/trash.svg';
import ShareIcon from '@/assets/icons/share.svg';

type SelectedHeaderActionsProps = {
  isVisible: boolean;
  selectedImagesCount: number;
  onClose: () => void;
  onFavorite?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
};

const SelectedHeaderActions: React.FC<SelectedHeaderActionsProps> = ({
  isVisible,
  selectedImagesCount,
  onClose,
  onFavorite,
  onDelete,
  onShare
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex items-center justify-around w-full gap-4"
        >
          <button
            onClick={onClose}
            className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-110 transition-transform duration-200"
          >
            <CloseIcon className="w-8 h-8" />
          </button>
          <button
            onClick={onFavorite}
            className="flex flex-col items-center justify-center text-gray-600 hover:text-red-600 hover:scale-110 transition-transform duration-200"
          >
            <AddToFavoriteIcon className="w-8 h-8" />
          </button>

          {/* Compteur d'images sélectionnées */}
          <div className="ml-2 text-sm font-medium text-gray-600">
            {selectedImagesCount} image
            {selectedImagesCount > 1 ? 's' : ''} sélectionnée
            {selectedImagesCount > 1 ? 's' : ''}
          </div>
          <button
            onClick={onDelete}
            className="flex flex-col items-center justify-center text-gray-600 hover:text-red-600 hover:scale-110 transition-transform duration-200"
          >
            <DeleteIcon className="w-8 h-8" />
          </button>
          <button
            onClick={onShare}
            className="flex flex-col items-center justify-center text-gray-600 hover:text-green-600 hover:scale-110 transition-transform duration-200"
          >
            <ShareIcon className="w-8 h-8" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectedHeaderActions;
