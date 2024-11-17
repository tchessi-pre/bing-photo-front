import React from 'react';
import Link from 'next/link';

type NavItemProps = {
	href: string;
	icon: React.ElementType;
	label: string;
};

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label }) => {
	return (
		<Link
			href={href}
			className='relative group block py-2 px-2 rounded hover:bg-gray-300'
		>
			<Icon className='w-8 h-8 transform transition-transform duration-200 ease-in-out group-hover:scale-110' />

			<span
				className='absolute left-12 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm font-semibold rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg whitespace-nowrap ml-2'
				style={{
					transform: 'translateY(-50%)',
					clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)',
					marginLeft: '10px',
				}}
			>
				{label}
			</span>
		</Link>
	);
};

export default NavItem;
