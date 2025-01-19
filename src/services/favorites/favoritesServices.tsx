export interface ImageType {
  src: string;
  alt: string;
}

const favoriteImages: ImageType[] = [
  { src: '/images/fav1.jpg', alt: 'Image favorite 1' },
  { src: '/images/fav2.jpg', alt: 'Image favorite 2' },
  { src: '/images/fav3.jpg', alt: 'Image favorite 3' },
];

export const getFavoriteImages = (): ImageType[] => {
  return favoriteImages;
};

export const addImageToFavorites = (image: ImageType): void => {
  if (!favoriteImages.find((fav) => fav.src === image.src)) {
    favoriteImages.push(image);
  }
};

export const removeImageFromFavorites = (image: ImageType): void => {
  const index = favoriteImages.findIndex((fav) => fav.src === image.src);
  if (index !== -1) {
    favoriteImages.splice(index, 1);
  }
};

export const toggleFavoriteImage = (image: ImageType): void => {
  const index = favoriteImages.findIndex((fav) => fav.src === image.src);
  if (index !== -1) {
    favoriteImages.splice(index, 1); // Supprimer si déjà dans les favoris
  } else {
    favoriteImages.push(image); // Ajouter si pas encore dans les favoris
  }
};
