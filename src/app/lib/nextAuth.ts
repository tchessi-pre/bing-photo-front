import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { useAuthStore } from "@/store/authStore";
import type { NextAuthConfig, User, Account, Profile } from "next-auth";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      profile(profile: Profile & { sub: string }) {
        return {
          id: profile.sub,
          name: profile.name || profile.email?.split('@')[0],
          email: profile.email,
          image: profile.picture
        };
      },
      checks: ['none']
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn(params: {
      user: User,
      account: Account | null,
      profile?: Profile
    }) {
      const { user, account, profile } = params;
      try {
        if (account?.provider === "google") {
          if (!user?.email) {
            throw new Error('Google authentication failed - missing user data');
          }

          const userId = user.id || `google-${user.email}`;
          
          if (!account?.access_token) {
            throw new Error('Google authentication failed - missing access token');
          }

          // Vérification supplémentaire pour Zeutland
          if (!process.env.ZEUTLAND_API_URL) {
            console.warn('ZEUTLAND_API_URL not set - skipping Zeutland sync');
          }

          if (typeof window !== 'undefined') {
            useAuthStore.getState().setAuth({
              id: userId,
              email: user.email,
              name: user.name || user.email.split('@')[0]
            }, account.access_token);

            window.localStorage.setItem('auth_token', account.access_token);
          }

          if (process.env.ZEUTLAND_API_URL && typeof window !== 'undefined') {
            try {
              const zeutlandPayload = {
                id: userId,
                email: user.email,
                name: user.name || user.email.split('@')[0],
                provider: 'google',
                accessToken: account.access_token
              };

              const zeutlandResponse = await fetch(`${process.env.ZEUTLAND_API_URL}/auth/sync`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${account.access_token}`
                },
                body: JSON.stringify(zeutlandPayload)
              });

              if (zeutlandResponse.ok) {
                const zeutlandData = await zeutlandResponse.json();
                useAuthStore.getState().setAuth(null, null, zeutlandData.token);
                window.localStorage.setItem('zeutland_token', zeutlandData.token);
              }
            } catch (error) {
              console.warn('Zeutland sync warning:', error);
            }
          }
          return '/overview';
        }
        return false;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return `/login?error=${encodeURIComponent((error as Error).message)}`;
      }
    },
    async jwt(params: {
      token: any,
      user?: User,
      account?: Account | null
    }) {
      const { token, user, account } = params;
      try {
        if (user) {
          token.id = user.id;
        }
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      } catch (error) {
        console.error('JWT callback error:', error);
        return token;
      }
    },
    async session(params: {
      session: any,
      token: any
    }) {
      const { session, token } = params;
      try {
        if (session.user) {
          session.user.id = token.id as string;
        }
        session.accessToken = token.accessToken as string;
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return session;
      }
    }
  }
};

const handler = NextAuth(authOptions);
export default handler;
export { handler as GET, handler as POST };
