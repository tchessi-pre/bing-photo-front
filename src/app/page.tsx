'use client';

import WelcomePage from '@/components/welcome/WelcomePage';
import React from 'react';
import Login from './login/Login';

const HomePage: React.FC = () => {

	return (
		<div>
			{/* <WelcomePage /> */}
			<Login />
		</div>
	);
};

export default HomePage;
