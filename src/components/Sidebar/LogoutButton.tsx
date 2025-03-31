'use client';

import React, { useState } from 'react';
import LogoutIcon from '@/assets/icons/logout.svg';
import { useRouter } from 'next/navigation';
import { logout } from '@/services/auth/authService';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import appTexts from '@/assets/appTexts.json';

const LogoutButton: React.FC = () => {
	const texts = appTexts.sidebar.logoutButton;
	const [open, setOpen] = useState(false);
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logout();
			router.push('/');
			setOpen(false);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button
					className='relative block py-2 px-2 rounded hover:bg-gray-300'
					onMouseEnter={() => setIsTooltipVisible(true)}
					onMouseLeave={() => setIsTooltipVisible(false)}
				>
					<LogoutIcon className='w-8 h-8 transform transition-transform duration-200 ease-in-out hover:scale-110' />
					{isTooltipVisible && (
						<span
							className='absolute left-12 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1 transition-opacity duration-200'
							style={{
								clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)',
								marginLeft: '10px',
							}}
						>
							{texts.tooltip}
						</span>
					)}
				</button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>{texts.dialogTitle}</DialogTitle>
					<DialogDescription>{texts.dialogDescription}</DialogDescription>
				</DialogHeader>
				<div className='flex justify-end space-x-2 mt-4'>
					<button
						onClick={() => setOpen(false)}
						className='px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded hover:bg-gray-300'
					>
						{texts.cancelButton}
					</button>
					<button
						onClick={handleLogout}
						className='px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-700'
					>
						{texts.confirmButton}
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default LogoutButton;