'use client';

import React, { useState, useEffect } from 'react';
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

  // Set the mounted state to true after the component is mounted
  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`w-full max-w-7xl mt-14 transition-opacity duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
    >
      {/* Titre du carrousel */}
      <h2 className="text-2xl font-bold mb-4 text-start">{title}</h2>

      {/* Contenu du carrousel */}
      <Carousel>
        <CarouselContent className="gap-1">
          {images.map((image) => (
            <CarouselItem
              key={image.id}
              className="basis-auto transition-transform duration-500 ease-in-out"
            >
              <div className="relative group cursor-pointer" onClick={() => onImageClick(image.id)}>
                {/* Image */}
                <div
                  className="overflow-hidden rounded-lg transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                  style={{ width: '260px', height: '300px' }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-full"
                  />
                  {/* Titre en bas avec effet au hover */}
                  <div className="absolute bottom-[-50px] left-0 right-0 bg-black/60 py-2 rounded-lg transition-all duration-300 group-hover:bottom-0">
                    <p className="text-center text-white text-sm font-bold">{image.albumTitle}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-full w-56 -left-10 border-none rounded-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_20%,transparent)] hover:opacity-80 transition-opacity duration-300" />
        <CarouselNext className="h-full w-56 -right-10 rounded-none border-none [mask-image:linear-gradient(to_left,transparent,white_10%,white_20%,transparent)] hover:opacity-80 transition-opacity duration-300" />
      </Carousel>
    </div>
  );
};

export default AlbumCarousel;
