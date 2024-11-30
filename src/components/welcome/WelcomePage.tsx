import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { animated } from '@react-spring/web';
import CircularImages from './CircularImages';
import { useProgressiveImageVisibility } from '@/hooks/useProgressiveImageVisibility';
import { useImageTrail } from '@/hooks/useImageTrail';
import { useSpring } from '@react-spring/web';
import Logo from '@/assets/icons/logo.svg';
import appTexts from '@/assets/appTexts.json';

const WelcomePage = () => {
	const visibleImages = useProgressiveImageVisibility();
	const trail = useImageTrail(visibleImages);

	const [showCenterContent, setShowCenterContent] = useState(false);
	const router = useRouter();

	const centerSpring = useSpring({
		opacity: showCenterContent ? 1 : 0,
		transform: showCenterContent ? 'scale(1)' : 'scale(0.8)',
		config: { tension: 150, friction: 16 },
	});

	const logoSpring = useSpring({
		transform: 'scale(1.1)',
		from: { transform: 'scale(1)' },
		config: { tension: 300, friction: 10 },
		loop: { reverse: true },
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowCenterContent(true);
		}, 1200);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='relative flex items-center justify-center min-h-screen bg-gray-100'>
			{/* Images circulaires */}
			<div className='absolute inset-0 flex items-center justify-center'>
				<CircularImages trail={trail} />
			</div>

			{/* Contenu central */}
			<animated.div
				style={centerSpring}
				className='relative flex flex-col items-center text-center'
			>
				<p className='text-lg font-medium text-gray-600 mb-4'>
					{appTexts.welcomePage.welcomeMessage}
				</p>
				<h1 className='text-3xl font-bold text-green-700 mb-4'>
					{appTexts.welcomePage.appName}
				</h1>
				<animated.div
					style={logoSpring}
					className='cursor-pointer'
					onClick={() => router.push('/overview')}
				>
					<Logo className='w-14 h-14' />
				</animated.div>
				<p className='mt-2 text-sm text-gray-500'>
					{appTexts.welcomePage.logoAction}
				</p>
			</animated.div>
		</div>
	);
};

export default WelcomePage;
