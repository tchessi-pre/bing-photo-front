import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export const useMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
		};
		// Vérifier à l'initialisation
		handleResize();
		// Écouter les changements de taille de fenêtre
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isMobile;
};
