import React from 'react';
import { Check, Square } from 'lucide-react';
import PhotoCard from './PhotoCard';
import {  DateGroupProps } from '@/types/types';

const DateGroup: React.FC<DateGroupProps> = ({
  date,
  photos,
  selectedImages,
  onSelectAllByDate,
  onSelect,
  onZoom,
}) => {
  const allPhotosSelected = photos.every((photo) => selectedImages.has(photo.id));

  return (
    <div key={date} className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => onSelectAllByDate(date)}
          className="py-2 text-sm font-medium text-gray-800 flex items-center gap-2"
        >
          {allPhotosSelected ? (
            <Check className="w-5 h-5 text-green-800" />
          ) : (
            <Square className="w-5 h-5 text-gray-500" />
          )}
          <span>
            {new Date(date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            isSelected={selectedImages.has(photo.id)}
            onSelect={onSelect}
            onZoom={onZoom}
          />
        ))}
      </div>
    </div>
  );
};

export default DateGroup;