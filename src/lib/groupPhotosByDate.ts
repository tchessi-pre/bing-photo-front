import { Photo } from "@/services/album/photoService";

export const groupPhotosByDate = (photos: Photo[]) => {
  // Vérification que photos existe et est un tableau
  if (!photos || !Array.isArray(photos)) {
    return [];
  }

  const grouped: { [key: string]: Photo[] } = {};

  photos.forEach((photo) => {
    if (!grouped[photo.date]) {
      grouped[photo.date] = [];
    }
    grouped[photo.date].push(photo);
  });

  return Object.entries(grouped).map(([date, photos]) => ({
    date,
    photos,
  }));
};