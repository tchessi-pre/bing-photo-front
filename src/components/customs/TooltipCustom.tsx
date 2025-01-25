// components/TooltipCustom.tsx
import React from 'react';

type TooltipCustomProps = {
  children: React.ReactNode;
  message: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isVisible?: boolean;
};

const TooltipCustom: React.FC<TooltipCustomProps> = ({
  children,
  message,
  position = 'top',
  isVisible = false,
}) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative">
      {children}
      {isVisible && (
        <span
          className={`absolute px-3 py-1 mt-4 text-sm text-white bg-gray-800 rounded-lg shadow-lg whitespace-nowrap ${positionClasses[position]}`}
        >
          {message}
        </span>
      )}
    </div>
  );
};

export default TooltipCustom;