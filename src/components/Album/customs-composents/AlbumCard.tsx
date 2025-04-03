'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { getRandomItems } from '@/lib/arrayUtils';

interface AlbumImage {
  src: string;
  alt: string;
}

type AlbumCardProps = {
  id: number;
  images: AlbumImage[];
  title: string;
  onClick: () => void;
  onDelete: () => void
};

const AlbumCard: React.FC<AlbumCardProps> = ({ id, images, title }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/albums/${id}`);
  };

  // Récupérer 4 images aléatoires
  const randomImages = getRandomItems(images ?? [], 4);

  return (
    <div className="p-4">
      <Card
        onClick={handleClick}
        className="relative w-[200px] h-[200px] cursor-pointer bg-gray-100 shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105 overflow-hidden"
      >
        
        {randomImages[0] && (
          <Image
            src={randomImages[0].src}
            alt={randomImages[0].alt}
            fill
            className="object-cover"
            priority={false}
          />
        )}
  
        
        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sm font-semibold p-2 truncate">
          {title}
        </div>
      </Card>
    </div>
  );
};

export default AlbumCard;
