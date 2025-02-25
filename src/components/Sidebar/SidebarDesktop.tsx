import React from 'react';
import Link from 'next/link';
import LogoIcon from '@/assets/icons/logo.svg';
import NavItem from './NavItem';
import ProfileSection from './ProfileSection';
import LogoutButton from './LogoutButton';
import navItems from './navItemsConfig';
import appTexts from '@/assets/appTexts.json';

const SidebarDesktop: React.FC = () => {
	const texts = appTexts.sidebar.navigation;
	
	return (
		<div className='fixed z-50 w-18 h-[100vh] text-white p-2 space-y-1 flex flex-col'>
			{/* Logo */}
			<div className='flex items-center justify-center py-4'>
				<Link href='/overview' aria-label="Retour à l'accueil">
					<LogoIcon className='w-8 h-8 cursor-pointer transform hover:rotate-45 transition-transform duration-300' />
				</Link>
			</div>

			{/* Navigation */}
			<nav className='flex flex-col space-y-1'>
				<div className='text-center text-gray-500 text-sm font-semibold py-2'>
					{texts.title}
				</div>
				{navItems.map((item) => (
					<NavItem
						key={item.href}
						href={item.href}
						icon={item.icon}
						label={item.label}
					/>
				))}
			</nav>

			{/* Bouton de déconnexion */}
			<div className='flex  flex-col justify-center py-4 absolute bottom-0 w-full w-18'>
				<ProfileSection />
				<LogoutButton />
			</div>
		</div>
	);
};

export default SidebarDesktop;
