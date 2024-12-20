'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type EmptyPageProps = {
  title: string;
  message: string;
  imageSrc?: string | React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

const EmptyPage: React.FC<EmptyPageProps> = ({ title, message, imageSrc, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center  rounded-lg p-8 min-h-[400px]">
      {imageSrc && (
        <div className="w-48 h-48 mb-6">
          {typeof imageSrc === 'string' ? (
            <img src={imageSrc} alt="Illustration" className="w-full h-full object-contain" />
          ) : (
            imageSrc 
          )}
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-300">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
        >
          <Plus className="w-5 h-5" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyPage;
