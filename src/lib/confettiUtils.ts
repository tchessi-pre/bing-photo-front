/** 
 * Génère un tableau de confettis, chacun ayant 
 * une position `left` aléatoire et une couleur. 
 */
export function generateConfetti(count: number) {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    color: randomColor(),
  }));
}

/** Retourne une couleur aléatoire parmi un set de couleurs */
function randomColor(): string {
  const colors = [
    '#EF4444', // red-500
    '#F59E0B', // amber-500
    '#84CC16', // lime-500
    '#22C55E', // green-500
    '#3B82F6', // blue-500
    '#6366F1', // indigo-500
    '#EC4899', // pink-500
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
