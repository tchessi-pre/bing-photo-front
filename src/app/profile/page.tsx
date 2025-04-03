'use client';

import React, { useEffect, useState } from 'react';
import StaticProfile from '@/components/Profile/ProfileContent';
import { getUserProfile } from '@/services/user/userService';
import { UserProfile } from '@/types/types';

const ProfilePage = () => {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const userData = await getUserProfile();
				setProfile(userData);
			} catch (err) {
				setError('Failed to load profile');
				console.error('Error loading profile:', err);
			}
		};

		fetchProfile();
	}, []);

	if (error) {
		return <div className="text-center text-red-500 mt-4">{error}</div>;
	}

	if (!profile) {
		return <div className="text-center mt-4">Loading...</div>;
	}

	return (
		<StaticProfile
			firstName={profile.firstName}
			lastName={profile.lastName}
			username={profile.username}
			email={profile.email}
			profileImage={profile.profileImage}
			// joinedDate={profile.joinedDate}
		/>
	);
};

export default ProfilePage;
