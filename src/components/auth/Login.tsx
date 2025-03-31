import React from 'react';
import { motion } from 'framer-motion';
import PhotoSharingSvg from '@/assets/svg-animate/photo-Sharing.svg';
import AuthForm from './AuthForm';
import { useMobile } from '@/hooks/useMobile';
import { containerVariants, itemVariants } from '@/lib/animationVariants';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthStore } from '@/store/authStore';

const Login: React.FC = () => {
	const isMobile = useMobile();
	const { login, isLoading, error } = useAuth();
	const setAuth = useAuthStore((state) => state.setAuth);

	const handleSubmit = async (formData: { email: string; password: string }) => {
		try {
			const response = await login(formData);
			setAuth(response.user, response.token);
		} catch (error) {
			console.error('Login failed:', error);
		}
	};
	return (
		<motion.div
			className='w-full flex flex-col md:flex-row items-center justify-center p-4'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{!isMobile && (
				<motion.div
					className='flex-1 flex items-center justify-center'
					variants={itemVariants}
				>
					<PhotoSharingSvg className='w-[400px] h-[400px]' />
				</motion.div>
			)}

			{!isMobile && (
				<div className='h-[500px] border-l-2 border-gray-300 mx-8'></div>
			)}

			{/* Formulaire de connexion */}
			<motion.div
				className='flex-1 flex items-center justify-center'
				variants={itemVariants}
			>
				<AuthForm type='login' onSubmit={handleSubmit} isLoading={isLoading} error={error} />
			</motion.div>
		</motion.div>
	);
};

export default Login;
