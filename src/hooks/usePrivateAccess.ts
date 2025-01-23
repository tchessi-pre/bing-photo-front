'use client';

import { useState, useEffect } from 'react';

const usePrivateAccess = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

  // Vérifie si un code PIN existe dans le localStorage
  const hasStoredPin = () => {
    return !!localStorage.getItem('privatePin');
  };

  // Vérifie si le code PIN est correct
  const verifyPin = (pin: string) => {
    const storedPin = localStorage.getItem('privatePin');
    if (pin === storedPin) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Réinitialise l'accès
  const resetAccess = () => {
    setIsAuthenticated(false);
  };

  // Vérifie l'authentification au chargement de la page
  useEffect(() => {
    if (hasStoredPin()) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return {
    isAuthenticated,
    verifyPin,
    resetAccess,
  };
};

export default usePrivateAccess;