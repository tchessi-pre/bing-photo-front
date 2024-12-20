'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type ImageModalProps = {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ images, initialIndex, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <Button
        onClick={onClose}
        className="absolute w-10 h-10 top-4 right-4 bg-black/70 hover:bg-black/90 text-white rounded-full"
      >
        <X className="w-10 h-10" />
      </Button>
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
    </div>
  );
};

export default ImageModal;
