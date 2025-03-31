import React, { useState } from 'react';
import { Logo } from '@/components/Header';
import LogoIcon from '@/assets/icons/logo.svg';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import GoogleButton from './GoogleButton';
import appTexts from '@/assets/appTexts.json';

interface AuthFormProps {
	type: 'login' | 'signup';
	onSubmit: (formData: {
		username?: string;
		email: string;
		password: string;
		confirmPassword?: string;
	}) => void;
	isLoading?: boolean;
	error?: string | null;
	onClearError?: () => void;
}
const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading, error }) => {
	const loginTexts = appTexts.LoginPage;
	const signupTexts = appTexts.SignupPage;
	const texts = type === 'login' ? loginTexts : signupTexts;
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className='w-full max-w-lg rounded-lg p-4 shadow-md sm:p-8 bg-gray-200'>
			<div className='flex flex-col justify-center items-center mb-6'>
				<LogoIcon />
				<Logo />
			</div>
			<div className='mb-2'>
				<h2 className='mb-2 text-xl font-bold text-center text-gray-800'>
					{texts.title}
				</h2>
				<p className='text-gray-700 text-center'>{texts.description}</p>
			</div>

			<form onSubmit={handleSubmit}>
				{type === 'signup' && (
					<div className='mb-4'>
						<label
							htmlFor='username'
							className='block mb-2 text-sm font-medium text-gray-600'
						>
							{signupTexts.usernameLabel}
						</label>
						<input
							type='text'
							id='username'
							name='username'
							value={formData.username}
							onChange={handleInputChange}
							placeholder={signupTexts.usernamePlaceholder}
							required
							className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
						/>
					</div>
				)}
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block mb-2 text-sm font-medium text-gray-600'
					>
						{texts.emailLabel}
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
						placeholder={texts.emailPlaceholder}
						required
					/>
				</div>
				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block mb-2 text-sm font-medium text-gray-600'
					>
						{texts.passwordLabel}
					</label>
					<div className='relative'>
						<input
							type={showPassword ? 'text' : 'password'}
							id='password'
							name='password'
							value={formData.password}
							onChange={handleInputChange}
							className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
							placeholder={texts.passwordPlaceholder}
							required
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
						>
							{showPassword ? (
								<EyeOff className='h-4 w-4' />
							) : (
								<Eye className='h-4 w-4' />
							)}
						</button>
					</div>
					{type === 'login' && (
						<Link
							href='/forgot-password'
							className='block mt-2 text-sm text-sky-700 hover:underline text-right'
						>
							{loginTexts.forgotPasswordLink}
						</Link>
					)}
				</div>
				{type === 'signup' && (
					<div className='mb-6'>
						<label
							htmlFor='confirmPassword'
							className='block mb-2 text-sm font-medium text-gray-600'
						>
							{signupTexts.confirmPasswordLabel}
						</label>
						<div className='relative'>
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								id='confirmPassword'
								name='confirmPassword'
								value={formData.confirmPassword}
								onChange={handleInputChange}
								className='w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
								placeholder={signupTexts.confirmPasswordPlaceholder}
								required
							/>
							<button
								type='button'
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
							>
								{showConfirmPassword ? (
									<EyeOff className='h-4 w-4' />
								) : (
									<Eye className='h-4 w-4' />
								)}
							</button>
						</div>
					</div>
				)}
				{error && (
					<div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-400 text-red-700">
						<p className="text-sm">{error}</p>
					</div>
				)}	
				<button
					type='submit'
					className='w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-green-800 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed'
					disabled={isLoading}
				>
					{isLoading ? (
						<span className="flex items-center justify-center">
							<svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Chargement...
						</span>
					) : (
						<>{type === 'login' ? loginTexts.loginButton : signupTexts.signupButton}</>
					)}
				</button>
			</form>

			<div className='relative my-2'>
				<div className='absolute inset-0 flex items-center'>
					<div className='w-full border-t-2 border-green-800/30'></div>
				</div>
				<div className='relative flex justify-center text-sm'>
					<span className='px-2 text-green-700 bg-gray-200'>Ou</span>
				</div>
			</div>

			<GoogleButton text={texts.googleButton} />

			<p className='mt-4 text-sm text-center text-gray-600'>
				{type === 'login' ? (
					<>
						{loginTexts.noAccountText}{' '}
						<Link
							href='/signup'
							className='text-sky-700 font-semibold hover:underline'
						>
							{loginTexts.signupLink}
						</Link>
					</>
				) : (
					<>
						{signupTexts.alreadyAccountText}{' '}
						<Link
							href='/login'
							className='text-sky-700 font-semibold hover:underline'
						>
							{signupTexts.loginLink}
						</Link>
					</>
				)}
			</p>
		</div>
	);
};

export default AuthForm;
