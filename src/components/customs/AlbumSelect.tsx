'use client';

import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type Album = {
  id: number;
  title: string;
};

type AlbumSelectProps = {
  albums: Album[];
  onAlbumChange: (albumId: number) => void;
};

const AlbumSelect: React.FC<AlbumSelectProps> = ({ albums, onAlbumChange }) => {
  return (
    <Select >
      <Select onValueChange={(value) => onAlbumChange(parseInt(value, 10))}>
        <SelectTrigger className="mt-2 w-full border-gray-300 rounded-md shadow-sm">
          <SelectValue placeholder="-- Sélectionner un album --" />
        </SelectTrigger>
        <SelectContent>
          {albums.map((album) => (
            <SelectItem key={album.id} value={album.id.toString()}>
              {album.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Select>
  );
};

export default AlbumSelect;
