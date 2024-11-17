// components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Importation des icônes SVG
import OverviewIcon from '@/assets/icons/Overview.svg';
import LogoIcon from '@/assets/icons/logo.svg';
import FavoriteIcon from '@/assets/icons/favorite.svg';
import AlbumsIcon from '@/assets/icons/albums.svg';
import ArchiveIcon from '@/assets/icons/archive.svg';
import PrivateHeartIcon from '@/assets/icons/private-heart.svg';
import ShareIcon from '@/assets/icons/share.svg';
import DeletePictureIcon from '@/assets/icons/trash-bin-minimalistic-svgrepo-com.svg';
import LogoutIcon from '@/assets/icons/logout.svg';

const navItems = [
	{ href: '/', icon: OverviewIcon, label: 'Overview' },
	{ href: '/favorites', icon: FavoriteIcon, label: 'Favorites' },
	{ href: '/albums', icon: AlbumsIcon, label: 'Albums' },
	{ href: '/archive', icon: ArchiveIcon, label: 'Archive' },
	{ href: '/private', icon: PrivateHeartIcon, label: 'Private' },
	{ href: '/share', icon: ShareIcon, label: 'Share' },
	{ href: '/trash', icon: DeletePictureIcon, label: 'Trash' },
];

const Sidebar: React.FC = () => {
	return (
		<div className='w-18 bg-gray-100 text-white p-2 space-y-1 flex flex-col justify-between'>
			<div className='flex items-center justify-center py-4'>
				<LogoIcon className='w-8 h-8' alt='Logo' />
			</div>

			{/* Navigation */}
			<nav className='flex flex-col space-y-1'>
				<div className='text-center text-gray-500 text-sm font-semibold py-2'>
					Menu
				</div>
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className='relative group block py-2 px-2 rounded hover:bg-gray-300'
					>
						<item.icon
							className='w-8 h-8 transform transition-transform duration-200 ease-in-out hover:scale-110'
							alt={item.label}
						/>
						<span className='absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
							{item.label}
						</span>
					</Link>
				))}

				{/* Section Profil avec effet de survol sur l'Avatar */}
				<div className='flex flex-col items-center justify-center py-2 space-y-2'>
					<div className='text-center text-gray-500 text-sm font-semibold py-2'>
						Profil
					</div>
					<Avatar className='transform transition-transform duration-200 ease-in-out hover:scale-110'>
						<AvatarImage
							src='https://github.com/shadcn.png'
							alt='Photo de profil'
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
			</nav>

			{/* Bouton de déconnexion */}
			<div className='flex items-center justify-center py-4'>
				<button className='relative group block py-2 px-2 rounded hover:bg-gray-300'>
					<LogoutIcon
						className='w-8 h-8 transform transition-transform duration-200 ease-in-out hover:scale-110'
						alt='Logout'
					/>
					<span className='absolute left-20 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
						Déconnexion
					</span>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;
