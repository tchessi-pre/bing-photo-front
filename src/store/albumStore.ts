import { Album } from '@/types/types';
import { create } from 'zustand';

interface AlbumStore {
  albums: Album[];
  setAlbums: (albums: Album[]) => void;
  addAlbum: (album: Album) => void;
  removeAlbum: (id: number) => void;
  getAlbumById: (id: number) => Album | undefined;
  resetAlbums: () => void;
}

export const useAlbumStore = create<AlbumStore>((set, get) => ({
  albums: [],

  setAlbums: (albums: Album[]) => set({ albums }),

  addAlbum: (album: Album) =>
    set((state) => ({ albums: [...state.albums, album] })),

  removeAlbum: (id: number) =>
    set((state) => ({
      albums: state.albums.filter((a) => a.id !== id),
    })),

  getAlbumById: (id: number) =>
    get().albums.find((a) => a.id === id),

  resetAlbums: () => set({ albums: [] }),
}));
