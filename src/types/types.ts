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
  createdAt: string;
}

export interface Media {
  id: number;
  url: string;
  album_id: number;

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

export interface Media {
  id: number;
  album_id: number;
  path: string;
  name: string;
  type: string;
  is_favorite: boolean;
  is_private: boolean;
  hash: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}