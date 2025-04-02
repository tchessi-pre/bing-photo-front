import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@/assets/icons/close-square-svgrepo-com.svg';
import AddToFavoriteIcon from '@/assets/icons/gallery-favourite-svgrepo-com.svg';
import DeleteIcon from '@/assets/icons/trash.svg';
import ShareIcon from '@/assets/icons/share.svg';
import AddSquareIcon from '@/assets/icons/add-square-svgrepo-com.svg';
import PrivateHeartIcon from '@/assets/icons/private-heart.svg';
import TooltipCustom from '../customs/TooltipCustom';


type SelectedHeaderActionsProps = {
  isVisible: boolean;
  selectedImagesCount: number;
  onClose: () => void;
  onFavorite?: () => void;
  onDelete?: () => void;
  onShare?: () => void;
  onPrivate?: () => void;
  onDownload?: () => void;
};

const SelectedHeaderActions: React.FC<SelectedHeaderActionsProps> = ({
  isVisible,
  selectedImagesCount,
  onClose,
  onFavorite,
  onDelete,
  onShare,
  onPrivate,
}) => {
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

  const showTooltip = (tooltipId: string) => {
    setVisibleTooltip(tooltipId);
  };

  // Fonction pour masquer un tooltip
  const hideTooltip = () => {
    setVisibleTooltip(null);
  };

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
          {/* Bouton Fermer */}
          <div
            onMouseEnter={() => showTooltip('close')}
            onMouseLeave={hideTooltip}
          >
            <TooltipCustom message="Fermer" position="bottom" isVisible={visibleTooltip === 'close'}>
              <button
                onClick={onClose}
                className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600 hover:scale-110 transition-transform duration-200"
              >
                <CloseIcon className="w-10 h-10" />
              </button>
            </TooltipCustom>
          </div>

          {/* Bouton Ajouter aux favoris */}
          <div
            onMouseEnter={() => showTooltip('favorite')}
            onMouseLeave={hideTooltip}
          >
            <TooltipCustom message="Ajouter aux favoris" position="bottom" isVisible={visibleTooltip === 'favorite'}>
              <button
                onClick={onFavorite}
                className="flex flex-col items-center justify-center text-gray-600 hover:text-red-600 hover:scale-110 transition-transform duration-200"
              >
                <AddToFavoriteIcon className="w-10 h-10" />
              </button>
            </TooltipCustom>
          </div>

          {/* Bouton Ajouter */}
          <div
            onMouseEnter={() => showTooltip('add')}
            onMouseLeave={hideTooltip}
          >
            <TooltipCustom message="Ajouter à un album" position="bottom" isVisible={visibleTooltip === 'add'}>
              <button
                onClick={onFavorite}
                className="flex flex-col items-center justify-center text-gray-600 hover:text-red-600 hover:scale-110 transition-transform duration-200"
              >
                <AddSquareIcon className="w-10 h-10" />
              </button>
            </TooltipCustom>
          </div>

          {/* Compteur d'images sélectionnées */}
          <div className="text-sm font-medium text-gray-600">
            {selectedImagesCount} image
            {selectedImagesCount > 1 ? 's' : ''} sélectionnée
            {selectedImagesCount > 1 ? 's' : ''}
          </div>

          {/* Bouton Partager */}
          <div
            onMouseEnter={() => showTooltip('share')}
            onMouseLeave={hideTooltip}
          >
            <TooltipCustom message="Partager" position="bottom" isVisible={visibleTooltip === 'share'}>
              <button
                onClick={onShare}
                className="flex flex-col items-center justify-center rounded-xl p-2 bg-gray-400 text-gray-600 hover:text-green-600 hover:scale-110 transition-transform duration-200"
              >
                <ShareIcon className="w-6 h-6" />
              </button>
            </TooltipCustom>
          </div>

          {/* Bouton Privé */}
          <div
            onMouseEnter={() => showTooltip('private')}
            onMouseLeave={hideTooltip}
          >
            <TooltipCustom message="Privé" position="bottom" isVisible={visibleTooltip === 'private'}>
              <button
                onClick={onPrivate}
                className="flex flex-col items-center justify-center rounded-xl p-2 bg-gray-400 text-gray-600 hover:text-green-600 hover:scale-110 transition-transform duration-200"
              >
                <PrivateHeartIcon className="w-6 h-6" />
              </button>
            </TooltipCustom>
          </div>

          {/* Bouton Supprimer */}
          <div
            onMouseEnter={() => showTooltip('delete')}
            onMouseLeave={hideTooltip}
          >
            <TooltipCustom message="Supprimer" position="bottom" isVisible={visibleTooltip === 'delete'}>
              <button
                onClick={onDelete}
                className="flex flex-col items-center justify-center rounded-xl p-2 bg-gray-400 text-gray-600 hover:text-red-600 hover:scale-110 transition-transform duration-200"
              >
                <DeleteIcon className="w-6 h-6" />
              </button>
            </TooltipCustom>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectedHeaderActions;