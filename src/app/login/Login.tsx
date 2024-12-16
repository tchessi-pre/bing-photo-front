import React, { useState } from "react";

import loginImage from "../../assets/images/image-login.png";
import { Logo } from "@/components/Header";
import appTexts from '@/assets/appTexts.json';



const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoogleLogin = () => {
    console.log("Connexion avec Google");
  };

  const handleGithubLogin = () => {
    console.log("Connexion avec GitHub");
  };

  return (
    <div className="flex h-screen p-9">
     <div
  className="w-1/2 bg-cover bg-center"
  style={{
    backgroundImage: `url('/images/image-login.png')`
  }}
></div>
 

      <div className="flex items-center justify-center w-1/2 bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
          <Logo />
          </div>

          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Connexion
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
            {appTexts.LoginPage.email}
            
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                {appTexts.LoginPage.Password}

              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-[#227957] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Se connecter
            </button>
          </form>


          <div className="flex items-center justify-between mb-4">
            <hr className="w-1/4 border-gray-300" />
            <span className="text-sm text-gray-600">Ou connectez-vous avec</span>
            <hr className="w-1/4 border-gray-300" />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fbc02d"
                  d="M43.6 20.2H42V20H24v8h11.3C33.5 32.5 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C33.8 5.2 29.1 3 24 3 11.9 3 2 12.9 2 25s9.9 22 22 22c11.6 0 21.3-8.5 22-20.1.1-.9.1-1.8.1-2.7 0-1-.1-1.9-.2-2.8z"
                />
                <path
                  fill="#e53935"
                  d="M6.3 14.7L12.3 19C14.3 13.4 18.7 10 24 10c3.1 0 5.9 1.2 8 3.1l6-6C33.8 5.2 29.1 3 24 3c-7.6 0-14.4 4.4-17.7 11.7z"
                />
                <path
                  fill="#4caf50"
                  d="M24 47c5.2 0 9.8-1.8 13.4-4.9l-6.5-5.3c-2.1 1.4-4.8 2.3-7.7 2.3-5.3 0-9.8-3.5-11.4-8.4l-6.2 4.8C9.3 42.3 16.1 47 24 47z"
                />
                <path
                  fill="#1565c0"
                  d="M43.6 20.2H42V20H24v8h11.3c-1.1 2.8-3.2 5.1-5.8 6.7l5.9 4.8C39.8 35.2 43.6 30.1 43.6 20.2z"
                />
              </svg>
              Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-2"
                fill="currentColor"
              >
                <path
                  d="M12 .296c-6.626 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.615-4.042-1.615-.546-1.387-1.333-1.757-1.333-1.757-1.091-.746.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.997.108-.776.419-1.305.762-1.605-2.665-.303-5.466-1.332-5.466-5.931 0-1.31.469-2.382 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.403 1.02.004 2.047.137 3.006.403 2.29-1.553 3.296-1.23 3.296-1.23.655 1.653.243 2.873.119 3.176.77.838 1.234 1.91 1.234 3.22 0 4.609-2.807 5.625-5.479 5.921.43.37.823 1.1.823 2.219 0 1.604-.014 2.896-.014 3.293 0 .32.192.694.799.576C20.565 22.092 24 17.592 24 12.296c0-6.627-5.373-12-12-12"
                />
              </svg>
              GitHub
            </button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-600">
            Pas de compte ?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Inscrivez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
