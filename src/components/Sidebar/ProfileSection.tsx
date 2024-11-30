import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import appTexts from '@/assets/appTexts.json';

const ProfileSection: React.FC = () => {
	const texts = appTexts.sidebar;

	return (
		<div className='flex flex-col items-center justify-center py-2 space-y-2'>
			<div className='text-center text-gray-500 text-sm font-semibold py-2'>
				{texts.profileSection}
			</div>
			<Avatar className='transform transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer'>
				<AvatarImage
					src='https://github.com/shadcn.png'
					alt='Photo de profil'
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
		</div>
	);
};

export default ProfileSection;
