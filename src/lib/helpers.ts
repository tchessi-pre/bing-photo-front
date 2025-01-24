import CryptoJS from 'crypto-js';
// Vérifie si la valeur est un chiffre (0-9)
export const isDigit = (value: string): boolean => {
  return /^\d$/.test(value); 
};

export const hashId = (id: number): string => {
  return CryptoJS.SHA256(id.toString()).toString(CryptoJS.enc.Hex);
};
