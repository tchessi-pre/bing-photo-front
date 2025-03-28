import React from 'react';
import Logo from '@/assets/icons/logo.svg';

const Loader = () => {
  return (
    <div
      className='fixed inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-50 transition-opacity duration-300'
      role='progressbar'
      aria-busy='true'
      aria-label='Loading content'
    >
      <div className='animate-pulse animate-spin'>
        <Logo    />
      </div>
      <p className='mt-8 text-md font-medium text-gray-600 animate-pulse'>
        Veuillez patienter...
      </p>
    </div>
  );
};

export default Loader;
