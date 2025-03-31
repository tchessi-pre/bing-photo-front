import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Logo } from "@/components/Header";
import LogoIcon from "@/assets/icons/logo.svg";
import appTexts from '@/assets/appTexts.json';
import OkAmicoSvg from '@/assets/svg-animate/Ok-amico.svg'

interface SuccessMessageProps {
  title?: string;
  message?: string;
  redirectUrl?: string;
  buttonText?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  title = appTexts.SuccessPage.defaultTitle,
  message = appTexts.SuccessPage.defaultMessage,
  redirectUrl = '/login',
  buttonText = appTexts.SuccessPage.defaultButtonText
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center h-screen p-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center"
      >
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-green-100">
          <div className="flex flex-col justify-center items-center mb-6">
            <LogoIcon/>
            <Logo />
          </div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center text-center"
          >
            <OkAmicoSvg className="h-44 w-40" />
            <h2 className="mb-2 text-2xl font-bold text-gray-800">{title}</h2>
            <p className="mb-6 text-gray-600">{message}</p>
          </motion.div>

          <Link
            href={redirectUrl}
            className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-[#227957] rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {buttonText}
          </Link>

          <p className="mt-4 text-sm text-center text-gray-500">
            {appTexts.SuccessPage.contactText}{' '}
            <a href={`mailto:${appTexts.contactEmail}`} className="text-green-600 hover:underline">
              {appTexts.contactEmail}
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessMessage;