'use client';

import React from 'react';
import StaticProfile from '@/components/Profile/ProfileContent';

const ProfilePage = () => {
	return (
		<StaticProfile
			firstName='Emma'
			lastName='Johnson'
			username='emma_j'
			email='emma.johnson@company.com'
			joinedDate='Rejoint en mars 2022'
		/>
	);
};

export default ProfilePage;
