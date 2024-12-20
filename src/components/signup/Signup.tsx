"use client"; // Ajoutez cette directive en haut

import { useState } from "react";
import { signIn } from "next-auth/react"; // Pour Google OAuth
import { Logo } from "@/components/Header";
import appTexts from "@/assets/appTexts.json";
import Link from "next/link"; // Importer Link

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
    // Envoyez ces informations au backend pour l'inscription
  };

  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/" }); // Connexion via Google
  };

  return (
    <div className="flex h-screen p-9">
      {/* Image à gauche */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/image-login.png')` }}
      ></div>

      {/* Formulaire à droite */}
      <div className="flex items-center justify-center w-1/2 bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Inscription
          </h2>

          {/* Formulaire d'inscription */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                {appTexts.SignupPage.email}
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
                {appTexts.SignupPage.password}
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
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Confirmez votre mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-[#227957] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              S'inscrire
            </button>
          </form>

          {/* Autre méthode d'inscription */}
          <div className="flex items-center justify-between mb-4">
            <hr className="w-1/4 border-gray-300" />
            <span className="text-sm text-gray-600">
              Ou inscrivez-vous avec
            </span>
            <hr className="w-1/4 border-gray-300" />
          </div>

          {/* Bouton Google */}
          <button
            onClick={handleGoogleSignup}
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
            </svg>
            Google
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
  Vous avez déjà un compte ?{" "}
  <Link href="/" className="text-blue-500 hover:underline">
    Connectez-vous
  </Link>
</p>

        </div>
      </div>
    </div>
  );
};

export default Signup;
