export const getRandomGridSpan = (): string => {
  const sizes = [
    'col-span-1 row-span-1', // Taille normale
    'col-span-2 row-span-1', // Large en largeur
    'col-span-1 row-span-2', // Large en hauteur
    'col-span-2 row-span-2', // Très large
  ];

  // Pondération des tailles pour équilibrer les occurrences
  const weightedSizes = [
    ...Array(6).fill('col-span-1 row-span-1'), // Fréquent
    ...Array(3).fill('col-span-2 row-span-1'), // Moins fréquent
    ...Array(3).fill('col-span-1 row-span-2'), // Rare
    'col-span-2 row-span-2', // Très rare
  ];

  const randomIndex = Math.floor(Math.random() * weightedSizes.length);
  return weightedSizes[randomIndex];
};
