import { useState, useEffect } from 'react';

export const useProgressiveImageVisibility = () => {
	const [visibleImages, setVisibleImages] = useState<number[]>([]);

	useEffect(() => {
		const timer = setInterval(() => {
			setVisibleImages((prev) =>
				prev.length < 10 ? [...prev, prev.length] : prev
			);
		}, 100);

		return () => clearInterval(timer);
	}, []);

	return visibleImages;
};
