'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

type ScanSuccessMessageProps = {
  message?: string;
};

const ScanSuccessMessage: React.FC<ScanSuccessMessageProps> = ({
  message = 'Scan terminé avec succès !',
}) => {
  return (
    <div className="mb-2 flex items-center justify-center">
      <span
        className="
          inline-flex items-center
          px-8 py-4
          bg-gradient-to-r from-green-200 via-green-100 to-green-50
          text-green-800
          font-semibold
          rounded-lg
          shadow-lg
        "
      >
        {/* 2. Utilisation de l’icône lucide-react */}
        <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
        {message}
      </span>
    </div>
  );
};

export default ScanSuccessMessage;
