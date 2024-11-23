import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '@/assets/icons/logo.svg';
import { useRouter } from 'next/navigation';
import { useSpring, animated, useTrail } from '@react-spring/web';
import appTexts from '@/data/appTexts.json';

const WelcomePage = () => {
	const [visibleImages, setVisibleImages] = useState<number[]>([]);
	const [showCenterContent, setShowCenterContent] = useState(false);
	const router = useRouter();

	// Animation des images avec effet de zoom progressif et fondu
	const trail = useTrail(10, {
		opacity: visibleImages.length ? 1 : 0,
		transform: visibleImages.length
			? 'scale(1) rotate(0deg)'
			: 'scale(0.3) rotate(15deg)',
		from: { opacity: 0, transform: 'scale(0.3) rotate(15deg)' },
		config: { tension: 200, friction: 20 },
	});

	// Animation du contenu central
	const centerSpring = useSpring({
		opacity: showCenterContent ? 1 : 0,
		transform: showCenterContent ? 'scale(1)' : 'scale(0.8)',
		config: { tension: 150, friction: 16 },
	});

	// Animation continue du logo avec effet de zoom
	const logoSpring = useSpring({
		transform: 'scale(1.1)',
		from: { transform: 'scale(1)' },
		config: { tension: 300, friction: 10 },
		loop: { reverse: true },
	});

	useEffect(() => {
		let timer: NodeJS.Timeout;
		let centerContentTimer: NodeJS.Timeout;

		timer = setInterval(() => {
			setVisibleImages((prev) =>
				prev.length < 10 ? [...prev, prev.length] : prev
			);
		}, 100);

		centerContentTimer = setTimeout(() => {
			setShowCenterContent(true);
		}, 1200);

		return () => {
			clearInterval(timer);
			clearTimeout(centerContentTimer);
		};
	}, []);

	return (
		<div className='relative flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='absolute inset-0 flex items-center justify-center'>
				<div className='relative flex items-center justify-center w-[600px] h-[600px] rounded-full'>
					{trail.map((style, index) => (
						<animated.div
							key={`image-${index}`}
							style={{
								...style,
								position: 'absolute',
								width: '120px',
								height: '120px',
								borderRadius: '50%',
								overflow: 'hidden',
								border: '4px solid white',
								transform: `rotate(${
									index * (360 / 10)
								}deg) translate(240px) rotate(-${index * (360 / 10)}deg)`,
							}}
						>
							<Image
								src={`/images/photo${index + 1}.png`}
								alt={`Photo ${index + 1}`}
								width={120}
								height={120}
								className='object-cover shadow-md'
							/>
						</animated.div>
					))}
				</div>
			</div>
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
