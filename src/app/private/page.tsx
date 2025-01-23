'use client';

import React, { useState } from 'react';
import PrivatePhotosGrid from '@/components/private/PrivatePhotosGrid';
import usePrivateAccess from '@/hooks/usePrivateAccess';
import AccessPrivatePageForm from '@/components/private/AccessPrivatePageForm';
const PrivatePage: React.FC = () => {
	const { isAuthenticated, verifyPin, resetAccess } = usePrivateAccess();
	const [error, setError] = useState('');

	const handleSubmit = (pin: string) => {
		const storedPin = localStorage.getItem('privatePin');
		if (pin === storedPin) {
			verifyPin(pin);
			setError('');
		} else {
			setError('Code PIN incorrect.');
		}
	};

	if (isAuthenticated === undefined) {
		return <div>Chargement en cours...</div>;
	}

	return (
		<div>
			{isAuthenticated ? (
				<PrivatePhotosGrid />
			) : (
				<AccessPrivatePageForm onSubmit={handleSubmit} error={error} />
			)}
		</div>
	);
};

export default PrivatePage;