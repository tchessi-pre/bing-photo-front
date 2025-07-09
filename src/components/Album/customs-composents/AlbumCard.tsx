'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { getRandomItems } from '@/lib/arrayUtils';
import { TrashIcon } from 'lucide-react';

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

const AlbumCard: React.FC<AlbumCardProps> = ({ id, images, title, onDelete }) => {
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
        {/* Bouton de suppression */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Empêche le clic sur la carte
            onDelete();
          }}
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 z-10"
          aria-label="Supprimer l'album"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
  
        {/* Image de couverture */}
        <Image
          src={randomImages[0]?.src || "/images/placeholder.png"}
          alt={randomImages[0]?.alt || "Album placeholder"}
          fill
          className="object-cover"
          priority={false}
        />
  
        {/* Titre de l’album */}
        <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sm font-semibold p-2 truncate">
          {title}
        </div>
      </Card>
    </div>
  );
  
};

export default AlbumCard;
