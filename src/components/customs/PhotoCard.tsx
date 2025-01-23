import React from 'react';
import { motion } from 'framer-motion';
import { CircleCheckBig, ZoomIn } from 'lucide-react';
import { PhotoCardProps } from '@/types/types';


const PhotoCard: React.FC<PhotoCardProps> = ({ photo, isSelected, onSelect, onZoom }) => {
  return (
    <motion.div
      className={`relative overflow-hidden shadow-lg group w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)]`}
      initial={{ borderWidth: 0, borderColor: 'transparent', borderRadius: '0px' }}
      animate={
        isSelected
          ? { borderWidth: 4, borderColor: '#22c55e', borderRadius: '12px' }
          : { borderWidth: 0, borderColor: 'transparent', borderRadius: '0px' }
      }
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <motion.img
        src={photo.src}
        alt={photo.alt || 'Photo'}
        className={`w-full h-48 object-cover transition-all duration-500 ${isSelected ? 'filter grayscale opacity-50' : ''
          }`}
        whileHover={{ scale: 1.05 }}
      />
      {/* Icône de sélection */}
      <motion.div
        className={`absolute top-2 right-2 text-white bg-green-700/50 rounded-full p-2 transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 cursor-pointer'
          }`}
        whileHover={{ scale: 1.1 }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(photo.id);
        }}
      >
        <CircleCheckBig className="w-5 h-5" />
      </motion.div>
      {/* Icône de zoom */}
      <motion.div
        className="absolute bottom-2 right-2 text-white bg-gray-700/50 p-2 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={(e) => {
          e.stopPropagation();
          onZoom(photo.id);
        }}
      >
        <ZoomIn className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
};

export default PhotoCard;