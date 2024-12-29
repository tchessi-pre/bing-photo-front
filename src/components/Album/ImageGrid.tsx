'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig, ZoomIn } from 'lucide-react';
import { getRandomGridSpan } from '@/lib/gridUtils';
import ImageModal from '@/components/Album/ImageModal';

type ImageGridProps = {
  images: { src: string; alt: string; label?: string }[];
  selectedImages: Set<number>;
  onImageSelect: (index: number) => void;
};

const ImageGrid: React.FC<ImageGridProps> = ({ images, selectedImages, onImageSelect }) => {
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

  // Gérer les spans de grille de manière immuable
  const gridSpansRef = useRef(images.map(() => getRandomGridSpan()));

  const handleCloseModal = () => {
    setZoomedImageIndex(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen py-6 sm:py-8 lg:py-12">
      <motion.div
        className="grid grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px] w-full"
        style={{
          gridAutoFlow: 'dense',
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {images.map((image, index) => {
          const isSelected = selectedImages.has(index);
          const gridSpan = gridSpansRef.current[index];

          return (
            <motion.div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg cursor-pointer group ${gridSpan} ${isSelected ? 'border-4 border-green-500' : ''
                }`}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
              }}
            >
              <motion.img
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${isSelected ? 'filter grayscale opacity-50' : ''
                  }`}
                whileHover={{ scale: 1.05 }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>
              <div
                className={`absolute top-2 right-2 text-white bg-green-700/50 rounded-full p-1 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageSelect(index);
                }}
              >
                <CircleCheckBig className="w-6 h-6" />
              </div>
              <div
                className="absolute bottom-2 right-2 text-white bg-gray-700/50 p-1 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedImageIndex(index);
                }}
              >
                <ZoomIn className="w-6 h-6" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Modal avec carrousel */}
      {zoomedImageIndex !== null && (
        <ImageModal
          images={images}
          initialIndex={zoomedImageIndex}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ImageGrid;
