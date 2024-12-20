

export interface Album {
  id: number;
  title: string;
  images: { src: string; alt: string }[];
}

const albums: Album[] = [
  {
    id: 1,
    title: 'Vacances à la plage',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 2,
    title: 'Anniversaire',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 3,
    title: 'Randonnée en montagne',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 4,
    title: 'Mariage de Julie et Paul',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 5,
    title: 'Soirée entre amis',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 6,
    title: 'Voyage à New York',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 7,
    title: 'Noël en famille',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 8,
    title: 'Pique-nique au parc',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 9,
    title: 'Noël en famille',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 10,
    title: 'Pique-nique au parc',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 11,
    title: 'A la cascade',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
  {
    id: 12,
    title: 'Pique-nique à Borély',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
    ],
  },
];

/**
 * Récupère tous les albums
 * @returns {Album[]} Liste des albums
 */
export const getAlbums = (): Album[] => {
  return albums;
};

/**
 * Récupère un album par son ID
 * @param {number} id - L'ID de l'album
 * @returns {Album | undefined} L'album correspondant ou undefined s'il n'existe pas
 */
export const getAlbumById = (id: number): Album | undefined => {
  return albums.find((album) => album.id === id);
};

/**
 * Ajoute un nouvel album
 * @param {string} title - Titre de l'album
 * @param {Array<{src: string, alt: string}>} images - Liste des images
 * @returns {Album} L'album ajouté
 */

export const addAlbum = (
  title: string,
  images: { src: string; alt: string }[] = []
): Album => {
  const newAlbum: Album = {
    id: albums.length > 0 ? Math.max(...albums.map((a) => a.id)) + 1 : 1,
    title,
    images,
  };
  albums.push(newAlbum);
  return newAlbum;
};

/**
 * Supprime un album par son ID
 * @param {number} id - L'ID de l'album à supprimer
 * @returns {boolean} Indique si la suppression a réussi
 */

export const deleteAlbum = (id: number): boolean => {
  const albumIndex = albums.findIndex((album) => album.id === id);
  if (albumIndex === -1) {
    return false;
  }
  albums.splice(albumIndex, 1);
  return true;
};

/**
 * Met à jour un album existant
 * @param {number} id - L'ID de l'album à mettre à jour
 * @param {Partial<Album>} updates - Les mises à jour de l'album
 * @returns {Album | undefined} L'album mis à jour ou undefined s'il n'existe pas
 */

export const updateAlbum = (
  id: number,
  updates: Partial<Omit<Album, 'id'>>
): Album | undefined => {
  const album = getAlbumById(id);
  if (!album) {
    return undefined;
  }
  Object.assign(album, updates);
  return album;
};
