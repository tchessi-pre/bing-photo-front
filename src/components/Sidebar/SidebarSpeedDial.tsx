import React from 'react';
import { Menu, X } from 'lucide-react';
import navItems from './navItemsConfig';

type SidebarSpeedDialProps = {
	isOpen: boolean;
	toggleOpen: () => void;
};

const SidebarSpeedDial: React.FC<SidebarSpeedDialProps> = ({
	isOpen,
	toggleOpen,
}) => {
	return (
		<div className='fixed bottom-4 right-4 z-50'>
			{/* Bouton principal */}
			<div
				onClick={toggleOpen}
				className='w-14 h-14 rounded-full bg-green-800 text-white shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-300 ease-in-out'
			>
				{isOpen ? <X className='w-8 h-8' /> : <Menu className='w-8 h-8' />}
			</div>

			{isOpen && (
				<div className='absolute bottom-24 flex flex-col items-center space-y-4 transition-all duration-500 ease-in-out'>
					{/* Navigation items */}
					{navItems.map((item, index) => (
						<div
							key={item.href}
							onClick={() => (window.location.href = item.href)}
							className='w-14 h-14 rounded-full bg-gray-300 text-gray-800 shadow-md flex items-center justify-center hover:bg-gray-400 cursor-pointer transition-opacity duration-500 ease-in-out'
							style={{
								opacity: isOpen ? 1 : 0,
								transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
								transitionDelay: `${index * 100}ms`,
							}}
							aria-label={item.label}
						>
							<item.icon className='w-8 h-8' />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SidebarSpeedDial;
