'use client';

import { Plus } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';

type EmptyPageProps = {
  title: string;
  message: string;
  imageSrc?: string | React.ReactNode;
  actionLabel?: string;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAction?: () => void;
  onDeleteSelectedImages?: () => void;
  onSelectSimilarImages?: () => void;
};

const EmptyPage: React.FC<EmptyPageProps> = ({
  title,
  message,
  imageSrc,
  actionLabel,
  onFileChange,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-lg p-8 min-h-[400px]">
      {imageSrc && (
        <motion.div
          className="w-48 h-48 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {typeof imageSrc === 'string' ? (
            <img src={imageSrc} alt="Illustration" className="w-full h-full object-contain" />
          ) : (
            imageSrc
          )}
        </motion.div>
      )}
      <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-300">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      {actionLabel && onFileChange && (
        <>
          <input
            type="file"
            id="file-input"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFileChange}
          />
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
