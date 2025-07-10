import api from '@/api/apiConfig';

export const markMediaAsPrivate = async (mediaID: number) => {
  const response = await api.post(`/media/${mediaID}/private`);
  return response.data;
};

export const getPrivateMedia = async () => {
  const response = await api.get('/media/private');
  return response.data;
};

export const setPrivatePin = async (pin: string) => {
  const response = await api.post('/users/pin', { pin });
  return response.data;
};

// Nouvelle fonction pour vérifier le code PIN côté serveur
export const verifyPrivatePin = async (pin: string, userId: number, token: string) => {
  const response = await api.post(
    '/users/pin/verify',
    { pin, user_id: userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
