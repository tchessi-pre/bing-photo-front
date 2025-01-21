'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type AlbumCarouselProps = {
  title: string;
  images: { src: string; alt: string; id: number; albumTitle: string }[];
  onImageClick: (albumId: number) => void;
};

const AlbumCarousel: React.FC<AlbumCarouselProps> = ({ title, images, onImageClick }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Définir l'état monté après le montage du composant
  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Variants pour le conteneur principal
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  return (
    <motion.div
      className="w-full mt-20 ml-4 mr-4 flex flex-col items-center"
      initial="hidden"
      animate={isMounted ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <h2 className="text-2xl font-bold mb-4 text-left w-full">{title}</h2>
      <Carousel>
        <CarouselContent className="gap-4 sm:gap-6 md:gap-1">
          {images.map((image) => (
            <CarouselItem key={image.id} className="basis-auto">
              <div
                className="relative group cursor-pointer"
                onClick={() => onImageClick(image.id)}
              >
                <div
                  className="overflow-hidden transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                  style={{ width: '100%', height: '100%' }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-[150px] h-[200px] sm:w-[200px] sm:h-[250px] md:w-[250px] md:h-[300px] lg:w-[300px] lg:h-[350px]"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-black/60 rounded-t-xl py-2 sm:py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
                  >
                    <p className="text-center text-white text-sm font-bold mb-2">
                      {image.albumTitle}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-full w-56 -left-10 border-none rounded-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_40%,transparent)] hover:opacity-90 transition-opacity duration-300" />
        <CarouselNext className="h-full w-56 -right-10 rounded-none border-none [mask-image:linear-gradient(to_left,transparent,white_10%,white_40%,transparent)] hover:opacity-90 transition-opacity duration-300" />
      </Carousel>
    </motion.div>
  );
};

export default AlbumCarousel;
