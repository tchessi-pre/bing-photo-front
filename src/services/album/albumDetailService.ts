export interface Image {
  src: string;
  alt: string;
}

export interface Album {
  id: number;
  title: string;
  images: Image[];
}

// Données fictives pour les albums
const albums: Album[] = [
  {
    id: 1,
    title: 'Vacances à la plage',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
    ],
  },
  {
    id: 2,
    title: 'Au Makéda',
    images: [
      { src: '/images/album1.jpg', alt: 'Image 1' },
      { src: '/images/album2.jpg', alt: 'Image 2' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
      { src: '/images/album4.jpg', alt: 'Image 4' },
      { src: '/images/album3.jpg', alt: 'Image 3' },
    ],
  },
  {
    id: 3,
    title: 'Anniversaire',
    images: [],
  },
];

// Fonction pour récupérer un album par ID
export const getAlbumById = (id: number): Album | undefined => {
  return albums.find((album) => album.id === id);
};

// Fonction pour ajouter une image à un album
export const addImageToAlbum = (id: number, image: Image): boolean => {
  const album = getAlbumById(id);
  if (!album) {
    return false;
  }
  album.images.push(image);
  return true;
};

// Fonction pour sélectionner une image
export const toggleImageSelection = (
  selectedImages: Set<number>,
  index: number
): Set<number> => {
  const updatedSelection = new Set(selectedImages);
  if (updatedSelection.has(index)) {
    updatedSelection.delete(index);
  } else {
    updatedSelection.add(index);
  }
  return updatedSelection;
};
