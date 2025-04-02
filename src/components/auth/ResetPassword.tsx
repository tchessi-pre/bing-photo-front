'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/Header';
import LogoIcon from '@/assets/icons/logo.svg';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { resetPassword } from '@/services/auth/authService';
import SuccessMessage from '../customs/SuccessMessage';

const ResetPassword: React.FC = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsSuccess(false);

		// Validation côté client
		if (!token) {
			setError('Lien de réinitialisation invalide');
			return;
		}

		if (password !== confirmPassword) {
			setError('Les mots de passe ne correspondent pas');
			return;
		}

		if (password.length < 8) {
			setError('Le mot de passe doit contenir au moins 8 caractères');
			return;
		}

		setIsLoading(true);

		try {
			await resetPassword(token, password);
			setIsSuccess(true);
		} catch (err: any) {
			setError(err.message || 'Erreur lors de la réinitialisation');
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<SuccessMessage
				title='Mot de passe réinitialisé !'
				message='Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter avec vos nouveaux identifiants.'
				redirectUrl='/login'
				buttonText='Se connecter'
			/>
		);
	}

	return (
		<div className='w-full flex flex-col md:flex-row items-center justify-center h-screen p-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='flex-1 flex items-center justify-center'
			>
				<div className='w-full max-w-md p-8 bg-gray-200 rounded-lg shadow-md'>
					<div className='flex flex-col justify-center items-center mb-6'>
						<LogoIcon />
						<Logo />
					</div>

					<h2 className='mb-2 text-2xl font-bold text-center text-gray-800'>
						Réinitialisation du mot de passe
					</h2>

					<form onSubmit={handleSubmit}>
						<div className='mb-4'>
							<label
								htmlFor='password'
								className='block mb-2 text-sm font-medium text-gray-600'
							>
								Nouveau mot de passe
							</label>
							<input
								type='password'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/15'
								placeholder='Entrez votre nouveau mot de passe'
								required
								disabled={isLoading}
								minLength={8}
							/>
							<p className='mt-1 text-xs text-gray-500'>Minimum 8 caractères</p>
						</div>

						<div className='mb-4'>
							<label
								htmlFor='confirmPassword'
								className='block mb-2 text-sm font-medium text-gray-600'
							>
								Confirmer le mot de passe
							</label>
							<input
								type='password'
								id='confirmPassword'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/15'
								placeholder='Confirmez votre nouveau mot de passe'
								required
								disabled={isLoading}
							/>
						</div>

						{error && (
							<div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
								<p className='text-sm'>{error}</p>
							</div>
						)}

						<button
							type='submit'
							className='w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-[#227957] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700/15 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
							disabled={isLoading}
						>
							{isLoading ? (
								<span className='flex items-center justify-center'>
									<svg
										className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
									>
										<circle
											className='opacity-25'
											cx='12'
											cy='12'
											r='10'
											stroke='currentColor'
											strokeWidth='4'
										></circle>
										<path
											className='opacity-75'
											fill='currentColor'
											d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
										></path>
									</svg>
									Traitement...
								</span>
							) : (
								'Réinitialiser le mot de passe'
							)}
						</button>
					</form>

					<p className='mt-4 text-sm text-center text-gray-600'>
						Retourner à la{' '}
						<Link
							href='/login'
							className='text-sky-700 hover:underline font-medium'
						>
							page de connexion
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default ResetPassword;
