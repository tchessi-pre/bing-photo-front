
// 'use client';
// import { Logo } from "@/components/Header";
// import appTexts from '@/assets/appTexts.json';
// import Link from "next/link"; // Importer Link


// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; 
// import { signIn } from 'next-auth/react';





// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Email:", email);
//     console.log("Password:", password);
//   };

//   const handleGoogleLogin = () => {
//     // Utilisation de next-auth pour se connecter via Google
//     signIn("google", {
//       callbackUrl: `${window.location.origin}/dashboard`, // Optionnel : redirige vers une page après la connexion réussie
//     });
//   };
  

//   const router = useRouter(); // Initialiser le router


//   const goToSignup = () => {
//     router.push('/signup'); // Rediriger vers la page Signup
//   };

//   return (
//     <div className="flex h-screen p-9">
//      <div
//   className="w-1/2 bg-cover bg-center"
//   style={{
//     backgroundImage: `url('/images/image-login.png')`
//   }}
// ></div>
 

//       <div className="flex items-center justify-center w-1/2 bg-gray-100">
//         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//           {/* Logo */}
//           <div className="flex justify-center mb-6">
//           <Logo />
//           </div>

//           <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
//             Connexion
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-600"
//               >
//             {appTexts.LoginPage.email}
            
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Entrez votre email"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-gray-600"
//               >
//                 {appTexts.LoginPage.Password}

//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Entrez votre mot de passe"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-[#227957] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               Se connecter
//             </button>
//           </form>


//           <div className="flex items-center justify-between mb-4">
//             <hr className="w-1/4 border-gray-300" />
//             <span className="text-sm text-gray-600">Ou connectez-vous avec</span>
//             <hr className="w-1/4 border-gray-300" />
//           </div>

//           <div className="flex gap-4">
//             <button
//               onClick={handleGoogleLogin}
//               className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <svg
//                 className="w-5 h-5 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 48 48"
//               >
//                 <path
//                   fill="#fbc02d"
//                   d="M43.6 20.2H42V20H24v8h11.3C33.5 32.5 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C33.8 5.2 29.1 3 24 3 11.9 3 2 12.9 2 25s9.9 22 22 22c11.6 0 21.3-8.5 22-20.1.1-.9.1-1.8.1-2.7 0-1-.1-1.9-.2-2.8z"
//                 />
//                 <path
//                   fill="#e53935"
//                   d="M6.3 14.7L12.3 19C14.3 13.4 18.7 10 24 10c3.1 0 5.9 1.2 8 3.1l6-6C33.8 5.2 29.1 3 24 3c-7.6 0-14.4 4.4-17.7 11.7z"
//                 />
//                 <path
//                   fill="#4caf50"
//                   d="M24 47c5.2 0 9.8-1.8 13.4-4.9l-6.5-5.3c-2.1 1.4-4.8 2.3-7.7 2.3-5.3 0-9.8-3.5-11.4-8.4l-6.2 4.8C9.3 42.3 16.1 47 24 47z"
//                 />
//                 <path
//                   fill="#1565c0"
//                   d="M43.6 20.2H42V20H24v8h11.3c-1.1 2.8-3.2 5.1-5.8 6.7l5.9 4.8C39.8 35.2 43.6 30.1 43.6 20.2z"
//                 />
//               </svg>
//               Google
//             </button>
           
//           </div>

//                       <p className="mt-4 text-sm text-center text-gray-600">
//               Pas encore de compte ?{" "}
//               <Link href="/signup" className="text-blue-500 hover:underline">
//                 Inscrivez-vous
//               </Link>
//             </p>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// 'use client';

// import { Logo } from "@/components/Header";
// import appTexts from '@/assets/appTexts.json';
// import Link from "next/link";
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null); // Gestion des erreurs
//   const [loading, setLoading] = useState<boolean>(false); // Gestion du chargement
//   const router = useRouter();

//   // Connexion classique
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const response = await fetch("localhost:8080/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//         mode: "no-cors", // Désactiver temporairement CORS
//       });

//       if (!response.ok) {
//         throw new Error("Identifiants incorrects. Veuillez réessayer.");
//       }

//       const data = await response.json();

//       // Exemple : Stocker le token dans localStorage
//       localStorage.setItem("token", data.token);

//       // Rediriger vers le tableau de bord
//       router.push("/dashboard");
//     } catch (err: any) {
//       setError(err.message || "Une erreur est survenue.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Connexion via Google
//   const handleGoogleLogin = () => {
//     signIn("google", {
//       callbackUrl: `${window.location.origin}/dashboard`,
//     });
//   };

//   const goToSignup = () => {
//     router.push('/signup'); // Redirection vers la page d'inscription
//   };

//   return (
//     <div className="flex h-screen p-9">
//       {/* Section de gauche avec une image */}
//       <div
//         className="w-1/2 bg-cover bg-center"
//         style={{ backgroundImage: `url('/images/image-login.png')` }}
//       ></div>

//       {/* Section de droite avec le formulaire */}
//       <div className="flex items-center justify-center w-1/2 bg-gray-100">
//         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//           {/* Logo */}
//           <div className="flex justify-center mb-6">
//             <Logo />
//           </div>

//           <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Connexion</h2>

//           {/* Formulaire de connexion classique */}
//           <form onSubmit={handleSubmit}>
//             {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-600"
//               >
//                 {appTexts.LoginPage.email}
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Entrez votre email"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-gray-600"
//               >
//                 {appTexts.LoginPage.Password}
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Entrez votre mot de passe"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-[#227957] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               disabled={loading}
//             >
//               {loading ? "Connexion en cours..." : "Se connecter"}
//             </button>
//           </form>

//           {/* Connexion via Google */}
//           <div className="flex items-center justify-between mb-4">
//             <hr className="w-1/4 border-gray-300" />
//             <span className="text-sm text-gray-600">Ou connectez-vous avec</span>
//             <hr className="w-1/4 border-gray-300" />
//           </div>

//           <div className="flex gap-4">
//             <button
//               onClick={handleGoogleLogin}
//               className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <svg
//                 className="w-5 h-5 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 48 48"
//               >
//                 <path
//                   fill="#fbc02d"
//                   d="M43.6 20.2H42V20H24v8h11.3C33.5 32.5 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C33.8 5.2 29.1 3 24 3 11.9 3 2 12.9 2 25s9.9 22 22 22c11.6 0 21.3-8.5 22-20.1.1-.9.1-1.8.1-2.7 0-1-.1-1.9-.2-2.8z"
//                 />
//                 <path
//                   fill="#e53935"
//                   d="M6.3 14.7L12.3 19C14.3 13.4 18.7 10 24 10c3.1 0 5.9 1.2 8 3.1l6-6C33.8 5.2 29.1 3 24 3c-7.6 0-14.4 4.4-17.7 11.7z"
//                 />
//                 <path
//                   fill="#4caf50"
//                   d="M24 47c5.2 0 9.8-1.8 13.4-4.9l-6.5-5.3c-2.1 1.4-4.8 2.3-7.7 2.3-5.3 0-9.8-3.5-11.4-8.4l-6.2 4.8C9.3 42.3 16.1 47 24 47z"
//                 />
//                 <path
//                   fill="#1565c0"
//                   d="M43.6 20.2H42V20H24v8h11.3c-1.1 2.8-3.2 5.1-5.8 6.7l5.9 4.8C39.8 35.2 43.6 30.1 43.6 20.2z"
//                 />
//               </svg>
//               Google
//             </button>
//           </div>

//           <p className="mt-4 text-sm text-center text-gray-600">
//             Pas encore de compte ?{" "}
//             <Link href="/signup" className="text-blue-500 hover:underline">
//               Inscrivez-vous
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



'use client';

import { Logo } from "@/components/Header";
import appTexts from '@/assets/appTexts.json';
import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Gestion des erreurs
  const [loading, setLoading] = useState<boolean>(false); // Gestion du chargement
  const router = useRouter();

  // Connexion classique
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    console.log("Début de la soumission du formulaire avec :", email, password);
  
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Réponse brute :", response);
  
      if (!response.ok) {
        console.error("Erreur lors de la connexion :", response.status, response.statusText);
        throw new Error("Identifiants incorrects. Veuillez réessayer.");
      }
  
      const data = await response.json();
      console.log("Données reçues :", data);
  
      // Stocker le token dans localStorage
      localStorage.setItem("token", data.Token);
      console.log("Token enregistré :", data.Token);
  
      // Redirection vers le tableau de bord
      router.push("/dashboard");
      console.log("Redirection réussie");
    } catch (err) {
      const errorMessage = (err as Error).message || "Une erreur est survenue.";
      console.error("Erreur attrapée :", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log("Fin de la soumission du formulaire");
    }
  };
  

  // Connexion via Google
  const handleGoogleLogin = () => {
    console.log("Connexion via Google initiée");
    signIn("google", {
      callbackUrl: `${window.location.origin}/dashboard`,
    });
  };

  const goToSignup = () => {
    console.log("Redirection vers la page d'inscription");
    router.push('/signup');
  };

  return (
    <div className="flex h-screen p-9">
      {/* Section de gauche avec une image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/image-login.png')` }}
      ></div>

      {/* Section de droite avec le formulaire */}
      <div className="flex items-center justify-center w-1/2 bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Connexion</h2>

          {/* Formulaire de connexion classique */}
          <form onSubmit={handleSubmit}>
            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
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
                onChange={(e) => {
                  console.log("Modification de l'email :", e.target.value);
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  console.log("Modification du mot de passe");
                  setPassword(e.target.value);
                }}
                className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mb-4 text-sm font-medium text-white bg-[#227957] rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          {/* Connexion via Google */}
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
              Google
            </button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-600">
            Pas encore de compte ?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
