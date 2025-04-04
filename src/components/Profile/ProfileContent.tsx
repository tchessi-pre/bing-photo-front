// src/components/Profile/ProfileContent.tsx
'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { updateUserProfile } from '@/services/user/userService';
import toast from 'react-hot-toast';

interface ProfileProps {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	profileImage?: string;
	joinedDate?: string;
}

const ProfileContent = ({
	firstName,
	lastName,
	username,
	email,
	profileImage,
	joinedDate,
}: ProfileProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName,
		lastName,
		username,
		email,
		picture: profileImage || ''
	});

	const initials = `${username.charAt(0)}${username.charAt(1)}`.toUpperCase();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			await updateUserProfile(formData);
			toast.success('Profil mis à jour avec succès');
			setIsEditing(false);
		} catch (error) {
			toast.error('Erreur lors de la mise à jour du profil');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card className="max-w-md mx-auto border-0 shadow-lg mt-8">
			<CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
				<div className="flex flex-col items-center justify-center space-y-4">
					<Avatar className="h-28 w-28 border-4 border-white shadow-md">
						{profileImage ? (
							<AvatarImage src={profileImage} alt={`${firstName} ${lastName}`} />
						) : (
							<AvatarFallback className="text-3xl font-semibold bg-white text-blue-600">
								{initials}
							</AvatarFallback>
						)}
					</Avatar>
					<div className="text-center space-y-2">
						<h1 className="text-2xl font-bold text-gray-900">
							{firstName} {lastName}
						</h1>
						<div className="flex items-center justify-center space-x-2">
							<p className="text-green-700 font-semibold text-lg">@{username}</p>
							{/* <Badge variant="outline" className="text-xs">
								Membre vérifié
							</Badge> */}
						</div>
						<p className="text-sm text-gray-500">{joinedDate}</p>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-6 space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<h3 className="text-sm font-medium text-gray-500">Prénom</h3>
						{isEditing ? (
							<Input
								name="firstName"
								value={formData.firstName}
								onChange={handleInputChange}
								className="mt-1"
							/>
						) : (
							<p className="text-gray-900 font-medium">{firstName}</p>
						)}
					</div>
					<div>
						<h3 className="text-sm font-medium text-gray-500">Nom</h3>
						{isEditing ? (
							<Input
								name="lastName"
								value={formData.lastName}
								onChange={handleInputChange}
								className="mt-1"
							/>
						) : (
							<p className="text-gray-900 font-medium">{lastName}</p>
						)}
					</div>
				</div>
				<div>
					<h3 className="text-sm font-medium text-gray-500">Email</h3>
					{isEditing ? (
						<Input
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className="mt-1"
							disabled
						/>
					) : (
						<p className="text-gray-900 font-medium">{email}</p>
					)}
				</div>
				<div>
					<h3 className="text-sm font-medium text-gray-500">Nom d'utilisateur</h3>
					{isEditing ? (
						<Input
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							className="mt-1"
						/>
					) : (
						<p className="text-gray-900 font-medium">@{username}</p>
					)}
				</div>
				<div className="pt-4 flex justify-center space-x-4">
					{isEditing ? (
						<>
							<Button
								onClick={handleSubmit}
								disabled={loading}
								className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
							>
								{loading ? 'Enregistrement...' : 'Enregistrer'}
							</Button>
							<Button
								onClick={() => setIsEditing(false)}
								variant="outline"
								className="px-8 py-3"
							>
								Annuler
							</Button>
						</>
					) : (
						<Button
							onClick={() => setIsEditing(true)}
							className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
						>
							Modifier le profil
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileContent;