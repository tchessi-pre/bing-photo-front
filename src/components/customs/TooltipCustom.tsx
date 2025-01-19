// 'use client';

import React, { ReactNode } from 'react';

type TooltipCustomProps = {
  children: ReactNode; // Contenu qui déclenche le tooltip (par ex. un bouton ou une icône)
  message: string; // Message à afficher dans le tooltip
  position?: 'top' | 'bottom' | 'left' | 'right'; // Position du tooltip
};

const TooltipCustom: React.FC<TooltipCustomProps> = ({ children, message, position = 'top' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative group">
      {children}
      <span
        className={`absolute px-3 py-1 text-sm text-white bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg whitespace-nowrap ${positionClasses[position]}`}
      >
        {message}
      </span>
    </div>
  );
};

export default TooltipCustom;
