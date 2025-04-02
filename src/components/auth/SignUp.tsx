import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CameraAimateSvg from '@/assets/svg-animate/camera-animate.svg';
import AuthForm from './AuthForm';
import { useMobile } from '@/hooks/useMobile';
import { containerVariants, itemVariants } from '@/lib/animationVariants';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import SuccessMessage from '../customs/SuccessMessage';

const SignUp: React.FC = () => {
	const router = useRouter();
	const isMobile = useMobile();
	const { signup, isLoading } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = async (formData: {
		email: string;
		password: string;
		confirmPassword?: string;
	}) => {
		try {
			await signup(formData);
			// router.push('/login?registered=true');
			setIsSuccess(true);
		} catch (error: any) {
			console?.error('Signup failed:', error);
			if (error?.response?.data?.message?.includes('email existe déjà') || error?.message?.includes('email existe déjà')) {
				setError('Un compte avec cet email existe déjà. Veuillez utiliser une autre adresse email ou vous connecter.');
			} else if (error?.response?.data?.message) {
				setError(error?.response?.data?.message);
			} else if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('Une erreur inattendue est survenue lors de l\'inscription');
			}
		}
	};

	// Afficher le message de succès si l'inscription a réussi
	if (isSuccess) {
		return (
			<SuccessMessage
				title="Inscription réussie !"
				message="Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter."
				redirectUrl="/login"
				buttonText="Se connecter"
			/>
		);
	}

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
				<AuthForm type='signup' onSubmit={handleSubmit} isLoading={isLoading} error={error} />
			</motion.div>
		</motion.div>
	);
};

export default SignUp;