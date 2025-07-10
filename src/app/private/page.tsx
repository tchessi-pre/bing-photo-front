'use client';

import React, { useState } from 'react';
import PrivatePhotosGrid from '@/components/private/PrivatePhotosGrid';
import usePrivateAccess from '@/hooks/usePrivateAccess';
import AccessPrivatePageForm from '@/components/private/AccessPrivatePageForm';
const PrivatePage: React.FC = () => {
  const { isAuthenticated, verifyPin, error } = usePrivateAccess();
  const [formError, setFormError] = useState('');

  const handleSubmit = async (pin: string) => {
    setFormError('');
    const ok = await verifyPin(pin);
    console.log('ok', ok);
    if (!ok) {
      setFormError(error || 'Code PIN incorrect');
    }
  };

  if (isAuthenticated === undefined) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <PrivatePhotosGrid />
      ) : (
        <AccessPrivatePageForm onSubmit={handleSubmit} error={formError} />
      )}
    </div>
  );
};

export default PrivatePage;