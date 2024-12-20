// Fonction pour mélanger un tableau et sélectionner un nombre limité d'éléments
export const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
