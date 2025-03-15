'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setMenuOpen(false);
  };

  return (
    <nav className="bg-orange-500 text-white shadow-lg fixed top-0 left-0 right-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-extrabold flex items-center gap-2">
          <span className="text-2xl">🌟</span> 9ties
        </div>
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        <div className="hidden md:flex gap-6 items-center">
          {status === 'authenticated' ? (
            <>
              <Link href="/?from=navbar" className="hover:text-yellow-200 transition-colors font-semibold">
                Home
              </Link>
              <Link href="/dashboard" className="hover:text-yellow-200 transition-colors font-semibold">
                Dashboard
              </Link>
              <Link href="/how-it-works" className="hover:text-yellow-200 transition-colors font-semibold">
                How It Works
              </Link>
              <Link href="/terms" className="hover:text-yellow-200 transition-colors font-semibold">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="hover:text-yellow-200 transition-colors font-semibold">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:text-yellow-200 transition-colors font-semibold">
                Contact Us
              </Link>
              <button
                onClick={handleLogout}
                className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/" className="hover:text-yellow-200 transition-colors font-semibold">
                Home
              </Link>
              <Link href="/how-it-works" className="hover:text-yellow-200 transition-colors font-semibold">
                How It Works
              </Link>
              <Link href="/terms" className="hover:text-yellow-200 transition-colors font-semibold">
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="hover:text-yellow-200 transition-colors font-semibold">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:text-yellow-200 transition-colors font-semibold">
                Contact Us
              </Link>
              <Link href="/login" className="hover:text-yellow-200 transition-colors font-semibold">
                Login
              </Link>
              <Link
                href={`/signup${referralCode ? `?ref=${referralCode}` : ''}`}
                className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-orange-500 p-4 space-y-4 animate-slide-in">
          {status === 'authenticated' ? (
            <>
              <Link href="/?from=navbar" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link href="/dashboard" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/how-it-works" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="/terms" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Privacy Policy
              </Link>
              <Link href="/contact" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
              <button
                onClick={handleLogout}
                className="block text-orange-800 bg-yellow-400 hover:bg-yellow-300 py-2 px-4 rounded-xl w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link href="/how-it-works" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="/terms" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Terms & Conditions
              </Link>
              <Link href="/privacy" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Privacy Policy
              </Link>
              <Link href="/contact" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
              <Link href="/login" className="block text-white hover:text-yellow-200" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link
                href={`/signup${referralCode ? `?ref=${referralCode}` : ''}`}
                className="block text-orange-800 bg-yellow-400 hover:bg-yellow-300 py-2 px-4 rounded-xl"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}