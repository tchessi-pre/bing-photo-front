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
  const randomImages = getRandomItems(images, 4);

  return (
    <div className="p-4">
      <Card
        onClick={handleClick}
        className="p-2 w-[200px] h-[200px] cursor-pointer bg-gray-100 shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-105"
      >
        <CardContent className="p-0 w-full h-full">
          <div className="grid grid-cols-2 gap-2 w-full h-full">
            {randomImages.map((image, index) => (
              <div key={index} className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-md"
                  priority={false}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <div className="text-left text-gray-700 text-sm font-semibold mt-4">
          {title}
        </div>
      </Card>
    </div>
  );
};

export default AlbumCard;
