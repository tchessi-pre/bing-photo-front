'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LogoIcon from '@/assets/icons/logo.svg';
import { useMobile } from '@/hooks/useMobile';
import SidebarSpeedDial from './SidebarSpeedDial';
import SidebarDesktop from './SidebarDesktop';


const Sidebar: React.FC = () => {
	const isMobile = useMobile();
	const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

	const toggleSpeedDial = () => setIsSpeedDialOpen((prev) => !prev);

	return (
		<>
			{
				isMobile && (
					<div className='fixed top-8 left-4 z-50'>
						<Link href='/overview' aria-label="Retour à l'accueil">
							<LogoIcon className='w-8 h-8 cursor-pointer' />
						</Link>
					</div>
				)
			}
			
			{isMobile ? (
				<SidebarSpeedDial
					isOpen={isSpeedDialOpen}
					toggleOpen={toggleSpeedDial}
				/>
			) : (
				<SidebarDesktop />
			)}
		</>
	);
};

export default Sidebar;
