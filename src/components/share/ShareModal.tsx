'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Photo } from '@/types/types';
import { Copy } from 'lucide-react';
import { hashId } from '@/lib/helpers';
import appTexts from '@/assets/appTexts.json';

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedImages: Photo[];
};

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, selectedImages }) => {
  // Récupère les textes depuis la section ShareModal de votre JSON
  const texts = appTexts.ShareModal;

  if (!isOpen) return null;

  // Fonction pour copier le lien dans le presse-papiers
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      // Utilisez le texte issu de votre JSON
      alert(texts.copyAlert);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{texts.title}</h2>
        <div className="grid grid-cols-1 gap-4">
          {selectedImages.map((image) => {
            // Générer un lien unique avec l'ID hashé et le nom de l'image
            const hashedId = hashId(image.id);
            const imageName = encodeURIComponent(image.alt || 'image');
            const imageLink = `${window.location.origin}/image/${hashedId}/${imageName}`;

            return (
              <div key={image.id} className="border p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={image.src}
                    alt={image.alt || 'Image sélectionnée'}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">
                      {texts.shareLinkLabel}
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={imageLink}
                        readOnly
                        className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <button
                        onClick={() => handleCopyLink(imageLink)}
                        className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            {texts.closeButton}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;
