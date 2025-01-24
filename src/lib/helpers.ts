
// Vérifie si la valeur est un chiffre (0-9)
export const isDigit = (value: string): boolean => {
  return /^\d$/.test(value); 
};