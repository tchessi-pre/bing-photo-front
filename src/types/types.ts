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
