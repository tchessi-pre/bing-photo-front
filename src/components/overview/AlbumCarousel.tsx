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

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  return (
    <motion.div
      className="w-full mt-10 sm:mt-16 md:mt-20 px-2 sm:px-4 md:px-6 flex flex-col items-center"
      initial="hidden"
      animate={isMounted ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left w-full px-2">{title}</h2>
      <Carousel
        opts={{
          slidesToScroll: 'auto',
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent className="gap-2 sm:gap-4 md:gap-6">
          {images.map((image) => (
            <CarouselItem key={image.id} className="basis-auto pl-0 sm:pl-2">
              <div
                className="relative group cursor-pointer"
                onClick={() => onImageClick(image.id)}
              >
                <div
                  className="overflow-hidden transform transition-transform duration-500 ease-in-out group-hover:scale-105 rounded-lg"
                >
                  <img
                    src={image.src || '/images/placeholder.png'}
                    alt={image.alt}
                    className="object-cover w-[130px] h-[180px] xs:w-[150px] xs:h-[200px] sm:w-[200px] sm:h-[250px] md:w-[250px] md:h-[300px] lg:w-[300px] lg:h-[350px] xl:w-[350px] xl:h-[400px] transition-all duration-300"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-black/60 rounded-t-lg py-2 sm:py-3 md:py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
                  >
                    <p className="text-center text-white text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2">
                      {image.albumTitle}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex h-full w-12 sm:w-24 md:w-32 lg:w-40 -left-2 sm:-left-6 md:-left-8 border-none rounded-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_40%,transparent)] hover:opacity-90 transition-opacity duration-300" />
        <CarouselNext className="hidden sm:flex h-full w-12 sm:w-24 md:w-32 lg:w-40 -right-2 sm:-right-6 md:-right-8 border-none rounded-none [mask-image:linear-gradient(to_left,transparent,white_10%,white_40%,transparent)] hover:opacity-90 transition-opacity duration-300" />
      </Carousel>
    </motion.div>
  );
};

export default AlbumCarousel;