'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFromNavbar, setIsFromNavbar] = useState(false);

  // Check if the user came from the navbar (via a query param or referrer)
  useEffect(() => {
    const fromNavbar = searchParams.get('from') === 'navbar';
    setIsFromNavbar(fromNavbar);

    // Redirect to dashboard only if authenticated AND not coming from navbar
    if (status === 'authenticated' && !fromNavbar) {
      router.push('/dashboard');
    }
  }, [status, router, searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-100 text-2xl font-bold text-orange-600">
        <span className="animate-pulse flex items-center gap-3">
          <span className="text-3xl">🪔</span> Loading...
        </span>
      </div>
    );
  }

  const isLoggedIn = status === 'authenticated';

  return (
    <div className="min-h-screen bg-amber-100">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-orange-300 to-amber-100 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-800 mb-6 animate-fade-in">
            {isLoggedIn && isFromNavbar
              ? `Light Up Your Earnings, ${session?.user?.name || 'Star'}! 🌟`
              : 'Light Up Your Earnings! 🪔'}
          </h1>
          <p className="text-lg sm:text-xl text-orange-700 mb-8">
            {isLoggedIn && isFromNavbar
              ? 'Keep growing your earnings—invite more friends or explore your dashboard!'
              : 'Unleash your maximum earning potential, and watch your earnings grow like a festival of wins! 🌸'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoggedIn && isFromNavbar ? (
              <>
                <Link href="/dashboard" className="btn bg-orange-500 text-white hover:bg-orange-600 text-lg">
                  Go to Dashboard
                </Link>
                <Link href="/how-it-works" className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300 text-lg">
                  How It Works
                </Link>
              </>
            ) : (
              <Link href="/how-it-works" className="btn bg-orange-500 text-white hover:bg-orange-600 text-lg">
                Know How It Works
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto bg-amber-200">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-10 flex justify-center items-center gap-3">
          <span className="text-4xl sm:text-5xl">🪔</span> Explore Our Bundles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Bronze Course */}
          <div className="card bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600">Instagram Growth Bundle</h3>
            <p className="text-2xl font-extrabold text-orange-800 mt-2">₹100</p>
            <ul className="text-sm sm:text-base text-orange-700 mt-4 space-y-2">
              <li>🌸 Growth Tips & Tricks</li>
              <li>🎨 Instagram Booster Strategy</li>
              <li>🔥 Monetizing Instagram Account</li>
            </ul>
            <a
              href="/products/instagram-growth-bundle"
              className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300 mt-6 block text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          </div>

          {/* Gold Course */}
          <div className="card bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600">Youtube Growth Bundle</h3>
            <p className="text-2xl font-extrabold text-orange-800 mt-2">₹200</p>
            <ul className="text-sm sm:text-base text-orange-700 mt-4 space-y-2">
              <li>🎥 YouTube Growth Mastery</li>
              <li>🌟 High Quality Assets</li>
              <li>✨ Video Editing Guide</li>
            </ul>
            <a
              href="/products/youtube-growth-bundle"
              className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300 mt-6 block text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          </div>

          {/* Diamond Course */}
          <div className="card bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600">Video Editing Bundle (9ties Edition)</h3>
            <p className="text-2xl font-extrabold text-orange-800 mt-2">₹300</p>
            <ul className="text-sm sm:text-base text-orange-700 mt-4 space-y-2">
              <li>🌟 All Instagram & Youtube Growth Content</li>
              <li>✨ High Quality Assets & Resources</li>
            </ul>
            <a
              href="/products/video-editing-bundle"
              className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300 mt-6 block text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Now
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-10 flex justify-center items-center gap-3">
          How Your Journey Unfolds <span className="text-4xl sm:text-5xl">✨</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="card bg-yellow-400 text-orange-800 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow">
            <span className="text-5xl mb-4 block">🌟</span>
            <h3 className="text-xl sm:text-2xl font-bold">Pick Your Path</h3>
            <p className="text-sm sm:text-base mt-2">
              Choose a bundle that sparks your interest—start your adventure with a single step!
            </p>
          </div>
          <div className="card bg-green-400 text-orange-800 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow">
            <span className="text-5xl mb-4 block">📣</span>
            <h3 className="text-xl sm:text-2xl font-bold">Spread the Glow</h3>
            <p className="text-sm sm:text-base mt-2">
              Share your special invite link with friends and light up their journey too!
            </p>
          </div>
          <div className="card bg-pink-400 text-orange-800 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow">
            <span className="text-5xl mb-4 block">💸</span>
            <h3 className="text-xl sm:text-2xl font-bold">Reap the Rewards</h3>
            <p className="text-sm sm:text-base mt-2">
              Earn from every friend’s success—watch your riches grow with direct and bonus wins!
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 sm:px-6 bg-orange-500 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 flex justify-center items-center gap-3">
            <span className="text-4xl sm:text-5xl">🌟</span> Ready to Shine?
          </h2>
          <p className="text-lg sm:text-xl mb-8">
            {isLoggedIn && isFromNavbar
              ? 'Keep the party going—invite more friends or check your earnings!'
              : 'Sign up today and start your journey to big rewards!'}
          </p>
          <Link
            href={isLoggedIn && isFromNavbar ? '/dashboard' : '/signup'}
            className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300 text-lg"
          >
            {isLoggedIn && isFromNavbar ? 'Back to Dashboard' : 'Join the Party! 🎁'}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
