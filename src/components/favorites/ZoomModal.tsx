import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ZoomModalProps = {
  imageSrc: string;
  images: { src: string; alt?: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

const ZoomModal: React.FC<ZoomModalProps> = ({
  imageSrc,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}) => {
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Fonction pour gérer le passage à l'image suivante
  const handleNext = () => {
    setDirection('right');
    onNext();
  };

  // Fonction pour gérer le retour à l'image précédente
  const handlePrevious = () => {
    setDirection('left');
    onPrevious();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-gray-700/50 p-2 rounded-full z-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Conteneur pour l'image avec animation directionnelle */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction === 'right' ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction === 'right' ? -100 : 100 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="relative"
          >
            <img
              src={imageSrc}
              alt="Zoomed"
              className="max-w-full max-h-screen"
            />
          </motion.div>
        </AnimatePresence>

        {/* Bouton pour l'image précédente */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-700/50 p-2 rounded-full z-50"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}

        {/* Bouton pour l'image suivante */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-gray-700/50 p-2 rounded-full z-50"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ZoomModal;