'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Header
          onDownload={() => console.log('Téléchargement en cours...')}
          placeholder="Rechercher une photo..."
        />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
