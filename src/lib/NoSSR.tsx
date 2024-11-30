'use client';

import React, { useEffect, useState } from 'react';

const NoSSR: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true); // Ce composant est rendu uniquement côté client
	}, []);

	if (!isMounted) {
		return null;
	}

	return <>{children}</>;
};

export default NoSSR;
