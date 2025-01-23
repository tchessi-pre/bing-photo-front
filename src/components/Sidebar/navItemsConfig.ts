import OverviewIcon from '@/assets/icons/Overview.svg';
import FavoriteIcon from '@/assets/icons/favorite.svg';
import AlbumsIcon from '@/assets/icons/albums.svg';
import ArchiveIcon from '@/assets/icons/archive.svg';
import PrivateHeartIcon from '@/assets/icons/private-heart.svg';
import ShareIcon from '@/assets/icons/share.svg';
import DeletePictureIcon from '@/assets/icons/trash-bin-minimalistic-svgrepo-com.svg';
import appTexts from '@/assets/appTexts.json';

const navItems = [
	{
		href: '/overview',
		icon: OverviewIcon,
		label: appTexts.sidebar.navigation.overview,
	},
	{
		href: '/favorites',
		icon: FavoriteIcon,
		label: appTexts.sidebar.navigation.favorites,
	},
	{
		href: '/albums',
		icon: AlbumsIcon,
		label: appTexts.sidebar.navigation.albums,
	},
	// {
	// 	href: '/archive',
	// 	icon: ArchiveIcon,
	// 	label: appTexts.sidebar.navigation.archive,
	// },
	{
		href: '/private',
		icon: PrivateHeartIcon,
		label: appTexts.sidebar.navigation.private,
	},
	// { href: '/share', icon: ShareIcon, label: appTexts.sidebar.navigation.share },
	{
		href: '/trash',
		icon: DeletePictureIcon,
		label: appTexts.sidebar.navigation.trash,
	},
];

export default navItems;
