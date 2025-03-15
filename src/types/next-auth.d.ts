import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      referralCode: string;
      balance: number;
      isActive: boolean;
      isAdmin: boolean; // Added isAdmin
    };
  }

  interface User {
    id: string;
    referralCode?: string;
    balance?: number;
    isActive?: boolean;
    isAdmin?: boolean; // Added isAdmin
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    referralCode?: string;
    balance?: number;
    isActive?: boolean;
    isAdmin?: boolean; // Added isAdmin
  }
}