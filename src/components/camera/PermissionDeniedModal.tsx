'use client';

import React from 'react';
import appTexts from '@/assets/appTexts.json';

type PermissionDeniedModalProps = {
  onClose: () => void;
};

const PermissionDeniedModal: React.FC<PermissionDeniedModalProps> = ({ onClose }) => {
  const texts = appTexts.permissionDeniedModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="p-4 bg-white rounded shadow-lg text-center">
        <p className="text-red-600 font-bold">{texts.title}</p>
        <p className="mt-2 text-gray-600">{texts.description}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {texts.buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default PermissionDeniedModal;
