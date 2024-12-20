'use client';

import { Plus } from 'lucide-react';
import React from 'react';

type EmptyPageProps = {
  title: string;
  message: string;
  imageSrc?: string | React.ReactNode;
  actionLabel?: string;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Ajout de la gestion des fichiers
};

const EmptyPage: React.FC<EmptyPageProps> = ({ title, message, imageSrc, actionLabel, onFileChange }) => {
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
      {actionLabel && onFileChange && (
        <>
          {/* Champ input de type file */}
          <input
            type="file"
            id="file-input"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFileChange}
          />
          {/* Bouton lié à l'input */}
          <label
            htmlFor="file-input"
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              {actionLabel}
            </span>
          </label>
        </>
      )}
    </div>
  );
};

export default EmptyPage;
