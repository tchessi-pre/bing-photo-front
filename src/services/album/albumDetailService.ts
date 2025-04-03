import api from "@/api/apiConfig";
import { useAlbumStore } from "@/store/albumStore";
import { useAuthStore } from "@/store/authStore";
import { Album } from "@/types/types";

export interface Image {
  src: string;
  alt: string;
}

// Récupère les albums de l'utilisateur depuis l'API
export const getAlbums = async (): Promise<Album[]> => {
  try {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    const response = await api.get(`/albums/user`, {
      params: { user_id: user.id },
    });

    const albums: Album[] = response.data.albums;

    if (!Array.isArray(albums)) {
      throw new Error('Invalid response format: albums must be an array');
    }

    // Mets à jour le store global
    useAlbumStore.getState().setAlbums(albums);

    return albums;
  } catch (error) {
    console.error('Erreur lors de la récupération des albums:', error);
    throw error;
  }
};

// Fonction pour récupérer un album par ID
export const getAlbumById = (id: number): Album | undefined => {
  const albums = useAlbumStore.getState().albums;
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
