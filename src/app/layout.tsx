import './globals.css';
import AuthProvider from '../components/AuthProvider'; // Add this import
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '800'] });

export const metadata = {
  title: '9ties',
  description: 'Become the Master of you Destiny with our referral system course selling platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" />
      </head>
      <body className={poppins.className}>
        <AuthProvider>
          <main className="flex-1">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}