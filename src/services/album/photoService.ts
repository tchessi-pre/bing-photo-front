
export type Photo = {
  id: number;
  src: string;
  date: string; // Format : "YYYY-MM-DD"
  alt?: string; // Optionnel
};

export type GroupedPhotos = {
  date: string;
  photos: Photo[];
};

// Fonction pour grouper les photos par date
export const groupPhotosByDate = (photos: Photo[]): GroupedPhotos[] => {
  const grouped: { [date: string]: Photo[] } = {};

  photos.forEach((photo) => {
    if (!grouped[photo.date]) {
      grouped[photo.date] = [];
    }
    grouped[photo.date].push({
      ...photo,
      alt: photo.alt || 'Image sans description',
    });
  });

  return Object.entries(grouped).map(([date, photos]) => ({
    date,
    photos,
  }));
};
