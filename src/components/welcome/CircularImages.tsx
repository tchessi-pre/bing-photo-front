import React from 'react';
import { animated, SpringValue } from '@react-spring/web';
import Image from 'next/image';

const IMAGE_COUNT = 10;

interface CircularImagesProps {
	trail: {
		opacity: SpringValue<number>;
		transform: SpringValue<string>;
	}[];
}

const CircularImages: React.FC<CircularImagesProps> = ({ trail }) => {
	return (
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
							index * (360 / IMAGE_COUNT)
						}deg) translate(240px) rotate(-${index * (360 / IMAGE_COUNT)}deg)`,
					}}
				>
					<Image
						src={`/images/photo${index + 1}.png`}
						alt={`Photo ${index + 1}`}
						width={120}
						height={120}
						className='object-cover shadow-md '
					/>
				</animated.div>
			))}
		</div>
	);
};

export default CircularImages;
