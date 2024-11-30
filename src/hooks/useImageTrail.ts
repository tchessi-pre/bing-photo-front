import { useTrail } from '@react-spring/web';

export const useImageTrail = (visibleImages: number[]) => {
	return useTrail(10, {
		opacity: visibleImages.length ? 1 : 0,
		transform: visibleImages.length
			? 'scale(1) rotate(0deg)'
			: 'scale(0.3) rotate(15deg)',
		from: { opacity: 0, transform: 'scale(0.3) rotate(15deg)' },
		config: { tension: 200, friction: 20 },
	});
};
