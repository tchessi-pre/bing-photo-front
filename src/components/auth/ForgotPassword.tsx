'use client';

import React, { useState } from 'react';
import { Logo } from "@/components/Header";
import LogoIcon from "@/assets/icons/logo.svg";
import Link from "next/link";
import appTexts from '@/assets/appTexts.json';
import { forgotPassword } from '@/services/auth/authService';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const ForgotPassword: React.FC = () => {
  const texts = appTexts.ForgotPasswordPage;
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await forgotPassword(email);
      router.push('/success?message=Un email de réinitialisation a été envoyé');
    } catch (err: any) {
      if (err.message?.includes('certificate') || err.message?.includes('tls')) {
        setError('Une erreur technique est survenue lors de l\'envoi de l\'email. Veuillez réessayer plus tard ou contacter le support.');
      } else {
        setError(err.message || 'Une erreur inattendue est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center"
      >
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-gray-200 rounded-lg shadow-md">
          <div className="flex flex-col justify-center items-center mb-6">
            <LogoIcon />
            <Logo />
          </div>

          <h2 className="mb-2 text-2xl font-bold text-center text-gray-800">
            {texts.title}
          </h2>
          <p className="mb-6 text-sm text-center text-gray-600">
            {texts.description}
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                {texts.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/15"
                placeholder={texts.emailPlaceholder}
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="mb-4 text-sm text-red-600">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-[#227957] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700/15 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Envoi en cours...' : texts.submitButton}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            {texts.backToLoginPrefix}{" "}
            <Link href="/login" className="text-sky-700 hover:underline">
              {texts.backToLoginLink}
            </Link>
          </p>
        </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
