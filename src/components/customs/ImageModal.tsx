'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ImageModalActions from './ImageModalActions';

type ImageModalProps = {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
  onDelete: (index: number) => void;
  onAddToAlbum: (index: number) => void;
  onSelect: (index: number) => void;
};

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  initialIndex,
  onClose,
  onDelete,
  onAddToAlbum,
  onSelect,
}) => {
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());

  const toggleLike = (index: number) => {
    const updatedLikes = new Set(likedImages);
    if (updatedLikes.has(index)) {
      updatedLikes.delete(index);
    } else {
      updatedLikes.add(index);
    }
    setLikedImages(updatedLikes);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Actions */}
        <ImageModalActions
          initialIndex={initialIndex}
          liked={likedImages.has(initialIndex)}
          onAddToAlbum={onAddToAlbum}
          onToggleLike={toggleLike}
          onDelete={onDelete}
          onSelect={onSelect}
          onClose={onClose}
        />

        {/* Carousel */}
        <Carousel className="w-full max-w-4xl">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <div className="flex items-center justify-center h-[500px]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-contain max-w-full max-h-full rounded-lg"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
