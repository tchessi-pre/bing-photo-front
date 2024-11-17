import OverviewIcon from '@/assets/icons/Overview.svg';
import FavoriteIcon from '@/assets/icons/favorite.svg';
import AlbumsIcon from '@/assets/icons/albums.svg';
import ArchiveIcon from '@/assets/icons/archive.svg';
import PrivateHeartIcon from '@/assets/icons/private-heart.svg';
import ShareIcon from '@/assets/icons/share.svg';
import DeletePictureIcon from '@/assets/icons/trash-bin-minimalistic-svgrepo-com.svg';

const navItems = [
	{ href: '/', icon: OverviewIcon, label: 'Afficher tout' },
	{ href: '/favorites', icon: FavoriteIcon, label: 'Mes favoris' },
	{ href: '/albums', icon: AlbumsIcon, label: 'Mes Albums' },
	{ href: '/archive', icon: ArchiveIcon, label: 'Mon Archive' },
	{ href: '/private', icon: PrivateHeartIcon, label: 'Photos Privées' },
	{ href: '/share', icon: ShareIcon, label: 'Partager' },
	{ href: '/trash', icon: DeletePictureIcon, label: 'Corbeille' },
];

export default navItems;