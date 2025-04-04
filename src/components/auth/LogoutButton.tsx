import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    try {
      // Déconnexion NextAuth
      await signOut({ redirect: false });
      
      // Nettoyage Zustand et localStorage
      clearAuth();
      
      // Redirection vers la page de login
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Déconnexion
    </button>
  );
};
