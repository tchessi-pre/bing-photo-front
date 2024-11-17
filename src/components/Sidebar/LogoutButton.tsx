// components/Sidebar/LogoutButton.tsx
import React from 'react';
import LogoutIcon from '@/assets/icons/logout.svg';

const LogoutButton: React.FC = () => {
	return (
		<button className='relative group block py-2 px-2 rounded hover:bg-gray-300'>
			<LogoutIcon
				className='w-8 h-8 transform transition-transform duration-200 ease-in-out hover:scale-110'
				alt='Logout'
			/>
			<span
				className='absolute left-12 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'
				style={{
					clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)',
					marginLeft: '10px',
				}}
			>
				Déconnexion
			</span>
		</button>
	);
};

export default LogoutButton;
