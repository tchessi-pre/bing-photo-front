'use client';

import React from 'react';
import LogoIcon from '@/assets/icons/logo.svg';
import NavItem from './NavItem';
import ProfileSection from './ProfileSection';
import LogoutButton from './LogoutButton';
import navItems from './navItemsConfig';

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
					<NavItem
						key={item.href}
						href={item.href}
						icon={item.icon}
						label={item.label}
					/>
				))}
				<ProfileSection />
			</nav>

			{/* Bouton de déconnexion */}
			<div className='flex items-center justify-center py-4'>
				<LogoutButton />
			</div>
		</div>
	);
};

export default Sidebar;
