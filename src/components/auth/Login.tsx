import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PhotoSharingSvg from '@/assets/svg-animate/photo-Sharing.svg';
import AuthForm from './AuthForm';
import GoogleButton from './GoogleButton';
import { useMobile } from '@/hooks/useMobile';
import { containerVariants, itemVariants } from '@/lib/animationVariants';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login: React.FC = () => {
	const isMobile = useMobile();
	const { login, isLoading, error } = useAuth();
	const [authError, setAuthError] = useState<string | null>(null);
	const setAuth = useAuthStore((state) => state.setAuth);
	const router = useRouter();
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	useEffect(() => {
		const checkAuth = async () => {
			// Vérifier à la fois le localStorage ET la session NextAuth
			const token = localStorage.getItem('auth_token');
			const session = await fetch('/api/auth/session').then(res => res.json());
			
			if (token || session?.user) {
				router.push('/overview');
				router.refresh();
			}
		};
		checkAuth();
	}, [router]);

	useEffect(() => {
		const checkSession = async () => {
			try {
				const session = await fetch('/api/auth/session');
				if (session.ok) {
					const data = await session.json();
					if (data.user) {
						useAuthStore.getState().setAuth({
							id: data.user.id,
							email: data.user.email,
							name: data.user.name
						}, null);
						router.push('/overview');
						router.refresh();
					}
				}
			} catch (error) {
				console.error('Session check failed:', error);
			}
		};
		checkSession();

		// Gestion des erreurs de connexion Google
		const urlParams = new URLSearchParams(window.location.search);
		const error = urlParams.get('error');
		if (error) {
			setAuthError(decodeURIComponent(error));
			// Nettoyer l'URL
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	}, [router]);

	const handleSubmit = async (formData: { email: string; password: string }) => {
		try {
			const response = await login(formData);
			await setAuth(response.user, response.token);
			await new Promise(resolve => setTimeout(resolve, 100));
			const result = await signIn('credentials', {
				redirect: false,
				email: formData.email,
				password: formData.password
			});
			
			if (result?.error) {
				console.error('Login failed:', result.error);
			} else {
				router.push('/overview');
			}
		} catch (error) {
			console.error('Login failed:', error);
			router.push('/login?error=AuthenticationFailed');
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
					<div className="w-full max-w-md">
						{authError && (
							<div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
								{authError}
							</div>
						)}
						<AuthForm type='login' onSubmit={handleSubmit} isLoading={isLoading} error={error} />
						<div className="mt-4">
							<GoogleButton text="Se connecter avec Google" />
						</div>
					</div>
				</motion.div>
		</motion.div>
	);
};

export default Login;
