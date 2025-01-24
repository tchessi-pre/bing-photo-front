import React from 'react';
import Logo from '@/assets/icons/logo.svg'; // Importez votre logo

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div className="animate-pulse">
        <Logo className="w-24 h-24" />
      </div>
    </div>
  );
};

export default Loader;