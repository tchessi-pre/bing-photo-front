'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { CloudDownload, Plus } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  onImport: () => void;
  onCreateAlbum: () => void;
  albumCount?: number;
  imageCount?: number;
  selectedImageCount?: number;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onImport,
  onCreateAlbum,
  albumCount,
  imageCount,
  selectedImageCount,
}) => {
  return (
    <div className="z-50 flex w-[85vw] items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md ml-12 border border-gray-200 mt-14">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        {albumCount !== undefined && (
          <span className="text-sm font-medium text-primary bg-gray-200 px-3 py-1 rounded-full">
            {albumCount} album{albumCount > 1 ? 's' : ''}
          </span>
        )}
        {imageCount !== undefined && (
          <span className="text-sm font-medium text-primary bg-gray-200 px-3 py-1 rounded-full">
            {imageCount} photo{imageCount > 1 ? 's' : ''}
          </span>
        )}
        {selectedImageCount !== undefined && selectedImageCount > 0 && (
          <span className="text-sm font-medium text-primary bg-green-200 px-3 py-1 rounded-full">
            {selectedImageCount} sélectionnée{selectedImageCount > 1 ? 's' : ''}
          </span>
        )}

      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 font-bold text-gray-700 rounded-lg transition-colors"
          onClick={onImport}
        >
          <CloudDownload className="w-5 h-5" />
          Importer
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2 px-4 py-2 bg-green-900 text-white rounded-lg hover:bg-green-800 transition-colors"
          onClick={onCreateAlbum}
        >
          <Plus className="w-5 h-5" />
          Créer votre album
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
