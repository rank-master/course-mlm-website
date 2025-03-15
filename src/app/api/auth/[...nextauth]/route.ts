import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with this email');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          referralCode: user.referralCode,
          balance: user.balance,
          isActive: user.isActive,
          isAdmin: user.isAdmin, // Added isAdmin
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.referralCode = user.referralCode;
        token.balance = user.balance;
        token.isActive = user.isActive;
        token.isAdmin = user.isAdmin; // Added isAdmin
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.referralCode = token.referralCode as string;
        session.user.balance = token.balance as number;
        session.user.isActive = token.isActive as boolean;
        session.user.isAdmin = token.isAdmin as boolean; // Added isAdmin
      }
      return session;
    },
  },
  pages: {
    signIn: '/login', // Custom login page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };