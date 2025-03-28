import React from 'react';
import { motion } from 'framer-motion'; // Importez Framer Motion
import CameraAimateSvg from '@/assets/svg-animate/camera-animate.svg';
import AuthForm from './AuthForm';
import { useMobile } from '@/hooks/useMobile';
import { containerVariants, itemVariants } from '@/lib/animationVariants';

const SignUp: React.FC = () => {
	const isMobile = useMobile();

	const handleSubmit = (formData: {
		email: string;
		password: string;
		confirmPassword?: string;
	}) => {
		console.log('Signup form submitted:', formData);
	};

	return (
		<motion.div
			className='w-full flex flex-col md:flex-row items-center justify-center p-4'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Afficher l'image uniquement sur les écrans non mobiles */}
			{!isMobile && (
				<motion.div
					className='flex-1 flex items-center justify-center'
					variants={itemVariants}
				>
					<CameraAimateSvg className='w-[400px] h-[400px]' />
				</motion.div>
			)}

			{!isMobile && (
				<div className='h-[500px] border-l-2 border-green-800/15 mx-8'></div>
			)}

			{/* Formulaire d'inscription */}
			<motion.div
				className='flex-1 flex items-center justify-center'
				variants={itemVariants}
			>
				<AuthForm type='signup' onSubmit={handleSubmit} />
			</motion.div>
		</motion.div>
	);
};

export default SignUp;
