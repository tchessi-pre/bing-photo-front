'use client';

import { useState, useEffect } from 'react';
import { verifyPrivatePin } from '@/services/private/privatePhotoService';
import { useAuthStore } from '@/store/authStore';

const usePrivateAccess = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Récupère l'utilisateur et le token depuis le store d'auth
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token); // À adapter selon ton store

  useEffect(() => {
    setIsAuthenticated(false);
  }, []);

  // Vérifie le code PIN via l'API sécurisée
  const verifyPin = async (pin: string) => {
    if (!user || !token) {
      setError('Utilisateur non authentifié');
      setIsAuthenticated(false);
      return false;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await verifyPrivatePin(pin, Number(user.id), token);
      if (result.valid) {
        setIsAuthenticated(true);
        return true;
      } else {
        setIsAuthenticated(false);
        setError('Code PIN incorrect');
        return false;
      }
    } catch (err) {
      setIsAuthenticated(false);
      setError("Erreur lors de la vérification du code PIN");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Réinitialise l'accès
  const resetAccess = () => {
    setIsAuthenticated(false);
    setError(null);
  };

  return {
    isAuthenticated,
    verifyPin,
    resetAccess,
    loading,
    error,
  };
};

export default usePrivateAccess;