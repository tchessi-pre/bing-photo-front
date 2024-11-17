import OverviewIcon from '@/assets/icons/Overview.svg';
import FavoriteIcon from '@/assets/icons/favorite.svg';
import AlbumsIcon from '@/assets/icons/albums.svg';
import ArchiveIcon from '@/assets/icons/archive.svg';
import PrivateHeartIcon from '@/assets/icons/private-heart.svg';
import ShareIcon from '@/assets/icons/share.svg';
import DeletePictureIcon from '@/assets/icons/trash-bin-minimalistic-svgrepo-com.svg';

const navItems = [
	{ href: '/', icon: OverviewIcon, label: 'Acceuil' },
	{ href: '/favorites', icon: FavoriteIcon, label: 'Favoris' },
	{ href: '/albums', icon: AlbumsIcon, label: 'Albums' },
	{ href: '/archive', icon: ArchiveIcon, label: 'Archive' },
	{ href: '/private', icon: PrivateHeartIcon, label: 'Privées' },
	{ href: '/share', icon: ShareIcon, label: 'Partager' },
	{ href: '/trash', icon: DeletePictureIcon, label: 'Corbeille' },
];

export default navItems;
