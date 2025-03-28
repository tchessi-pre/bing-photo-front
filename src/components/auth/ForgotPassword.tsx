import React from 'react';
import { Logo } from "@/components/Header";
import LogoIcon from "@/assets/icons/logo.svg";
import Link from "next/link";
import appTexts from '@/assets/appTexts.json';

const ForgotPassword: React.FC = () => {
  const texts = appTexts.ForgotPasswordPage;

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center h-screen p-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-gray-200 rounded-lg shadow-md">
          <div className="flex flex-col justify-center items-center mb-6">
            <LogoIcon />
            <Logo />
          </div>

          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            {texts.title}
          </h2>

          <form>
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
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800/15"
                placeholder={texts.emailPlaceholder}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-[#227957] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700/15"
            >
              {texts.submitButton}
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
    </div>
  );
};

export default ForgotPassword;
