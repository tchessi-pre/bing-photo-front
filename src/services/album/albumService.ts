'use client';

import api from "@/api/apiConfig";
import { useAlbumStore } from "@/store/albumStore";
import { useAuthStore } from "@/store/authStore";
import { Album } from "@/types/types";




// const albums: Album[] = [
//   {
//     id: 1,
//     title: 'Vacances à la plage',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 2,
//     title: 'Anniversaire',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 3,
//     title: 'Randonnée en montagne',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 4,
//     title: 'Mariage de Julie et Paul',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 5,
//     title: 'Soirée entre amis',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 6,
//     title: 'Voyage à New York',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 7,
//     title: 'Noël en famille',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 8,
//     title: 'Pique-nique au parc',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 9,
//     title: 'Noël en famille',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 10,
//     title: 'Pique-nique au parc',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 11,
//     title: 'A la cascade',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 12,
//     title: 'Pique-nique à Borély',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 13,
//     title: 'A la cascade',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
//   {
//     id: 14,
//     title: 'Pique-nique à Borély',
//     images: [
//       { src: '/images/album1.jpg', alt: 'Image 1' },
//       { src: '/images/album2.jpg', alt: 'Image 2' },
//       { src: '/images/album3.jpg', alt: 'Image 3' },
//       { src: '/images/album4.jpg', alt: 'Image 4' },
//     ],
//   },
// ];

/**
 * Récupère tous les albums
 * @returns {Album[]} Liste des albums
 */
export const getAlbums = async (): Promise<Album[]> => {
  try {
    const user = useAuthStore.getState().user;
    if (!user) throw new Error('User not authenticated');

    const response = await api.get(`/albums/user`, {
      params: { user_id: user.id },
    });
    console.log(response.data)
    const albums: Album[] = response.data.albums;

    if (!Array.isArray(albums)) {
      throw new Error('Invalid response format: albums must be an array');
    }

    useAlbumStore.getState().setAlbums(albums); // Tu peux aussi faire addAlbums si tu veux les empiler

    return albums;
  } catch (error) {
    console.error('Erreur lors de la récupération des albums:', error);
    throw error;
  }
};
/**
 * Récupère un album par son ID
 * @param {number} id - L'ID de l'album
 * @returns {Album | undefined} L'album correspondant ou undefined s'il n'existe pas
 */
export const getAlbumById = (id: number): Album | undefined => {
  return albums.find((album:Album) => album.id === id);
};

/**
 * Ajoute un nouvel album
 * @param {string} title - Titre de l'album
 * @param {Array<{src: string, alt: string}>} images - Liste des images
 * @returns {Album} L'album ajouté
 */



export const addAlbum = async (
  name: string,
  description?: string
): Promise<Album> => {
  try {
    const user = useAuthStore.getState().user;
    if (user===null||!user) throw new Error('User not authenticated');
    const response = await api.post('/albums', {
      name,
      user_id: user.id,
      description,
    });
    const album: Album = response.data;

    if (!album || typeof album !== 'object') {
      throw new Error('Invalid response format');
    }

    useAlbumStore.getState().addAlbum(album); 

    return album;
  } catch (error) {
    throw error;
  }
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


