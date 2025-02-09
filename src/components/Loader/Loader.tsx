import React from 'react';
import Logo from '@/assets/icons/logo.svg'; // Importez votre logo

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
      <div className="animate-pulse">
        <Logo className="w-20 h-20" />
      </div>
        <p className='mt-4'>Veuillez patienter...</p>
    </div>
  );
};

export default Loader;