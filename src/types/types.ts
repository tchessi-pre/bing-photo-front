export type Photo = {
  id: number;
  src: string;
  alt?: string;
  date: string;
};

export type PhotoCardProps = {
  photo: Photo;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onZoom: (id: number) => void;
};

export type DateGroupProps = {
  date: string;
  photos: Photo[];
  selectedImages: Set<number>;
  onSelectAllByDate: (date: string) => void;
  onSelect: (id: number) => void;
  onZoom: (id: number) => void;
};

export type Album = {
  id: number;
  title: string;
  userId: number;
  description?: string;
};

export type AlbumSelectProps = {
  albums: Album[];
  onAlbumChange: (albumId: number) => void;
};

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage?: string;
  private_album_pin?: string;
  private_album_id?: number;
  main_album_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: number;
  name: string;
  path: string;
  type: string;
  album_id: number;
  is_favorite: boolean;
  is_private: boolean;
  hash: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

// types.ts
// export interface Album {
//   id: number;
//   name: string;
//   user_id: number;
//   type?: string;
//   created_at?: string;
//   updated_at?: string;
// }
// hash: string;
// file_size: number;
// created_at: string;
// updated_at: string;
// }