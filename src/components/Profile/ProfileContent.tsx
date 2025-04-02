'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProfileProps {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	profileImage?: string;
	joinedDate?: string;
}

const StaticProfile = ({
	firstName = 'John',
	lastName = 'Doe',
	username = 'johndoe',
	email = 'john.doe@example.com',
	profileImage,
	joinedDate = 'Rejoint en janvier 2023',
}: ProfileProps) => {
	const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

	return (
		<Card className='max-w-md mx-auto border-0 shadow-lg overflow-hidden flex flex-col items-center justify-center'>
			<div className='bg-gradient-to-r from-blue-50 to-purple-50 p-6'>
				<div className='flex flex-col items-center space-y-4 '>
					<Avatar className='h-28 w-28 border-4 border-white shadow-md'>
						{profileImage ? (
							<AvatarImage
								src={profileImage}
								alt={`${firstName} ${lastName}`}
							/>
						) : (
							<AvatarFallback className='text-3xl font-semibold bg-white text-blue-600'>
								{initials}
							</AvatarFallback>
						)}
					</Avatar>

					<div className='text-center space-y-2'>
						<h1 className='text-2xl font-bold text-gray-900'>
							{firstName} {lastName}
						</h1>
						<div className='flex items-center justify-center space-x-2'>
							<p className='text-gray-600'>@{username}</p>
							<Badge variant='outline' className='text-xs'>
								Membre vérifié
							</Badge>
						</div>
						<p className='text-sm text-gray-500'>{joinedDate}</p>
					</div>
				</div>
			</div>

			<CardContent className='p-6'>
				<div className='space-y-6'>
					<div className='grid grid-cols-2 gap-4'>
						<div className='space-y-1'>
							<h3 className='text-sm font-medium text-gray-500'>Prénom</h3>
							<p className='text-gray-900 font-medium'>{firstName}</p>
						</div>
						<div className='space-y-1'>
							<h3 className='text-sm font-medium text-gray-500'>Nom</h3>
							<p className='text-gray-900 font-medium'>{lastName}</p>
						</div>
					</div>

					<div className='space-y-1'>
						<h3 className='text-sm font-medium text-gray-500'>Email</h3>
						<p className='text-gray-900 font-medium'>{email}</p>
					</div>

					<div className='space-y-1'>
						<h3 className='text-sm font-medium text-gray-500'>
							Nom d'utilisateur
						</h3>
						<p className='text-gray-900 font-medium'>@{username}</p>
					</div>
				</div>

				<div className='mt-8 flex justify-center'>
					<Button className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md transition-all hover:scale-105'>
						Modifier le profil
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default StaticProfile;
