'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar'; // Adjust path if needed
import Footer from '../../components/Footer'; // Adjust path if needed

export default function HowItWorks() {
  const router = useRouter();

  useEffect(() => {
    document.title = 'How It Works | 9ties';
  }, []);

  return (
    <div className="min-h-screen bg-amber-100 p-8">
      <Navbar />

      <div className="max-w-5xl mx-auto space-y-12 pt-12">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl font-bold text-orange-600 flex items-center justify-center gap-4">
            <span className="text-6xl animate-bounce">🚀</span> How It Works
          </h1>
          <p className="mt-4 text-xl text-orange-700">
            Earn money by learning and sharing—here’s how our referral system rewards you!
          </p>
          <button
            className="mt-6 btn bg-orange-500 text-white hover:bg-orange-600 text-lg px-8 py-3 rounded-full shadow-lg"
            onClick={() => router.push('/signup')}
          >
            Get Started Now
          </button>
        </header>

        {/* Step 1: Join the Program */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="card bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-3xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
              <span className="text-4xl">1️⃣</span> Join the Program
            </h2>
            <p className="text-orange-700">
              Sign up, get your unique referral link, and start sharing it with friends. When someone signs up using your link, they’re in your network!
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1377/1377226.png"
              alt="Sign Up Icon"
              className="w-32 h-32 md:w-48 md:h-48 animate-pulse"
            />
          </div>
        </section>

        {/* Step 2: First Sale */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921198.png"
              alt="Money Bag Icon"
              className="w-32 h-32 md:w-48 md:h-48 animate-spin-slow"
            />
          </div>
          <div className="order-1 md:order-2 card bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-3xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
              <span className="text-4xl">2️⃣</span> First Sale Rewards
            </h2>
            <p className="text-orange-700 mb-4">
              When someone in your network buys their first bundle, you earn big! Here’s how it breaks down:
            </p>
            <ul className="space-y-2 text-orange-700">
              <li>
                <strong>You (Seller):</strong> <span className="text-green-600">80%</span> of the bundle price.
              </li>
              <li>
                <strong>Your Referrer (Passive):</strong> <span className="text-green-600">10%</span> of the bundle price.
              </li>
              <li>
                <strong>Their Referrer (Super Passive):</strong> <span className="text-green-600">5%</span> of the bundle price.
              </li>
            </ul>
            <p className="text-orange-700 mt-4 italic">
              Example: A ₹300 bundle means ₹240 for you, ₹30 for your referrer, and ₹15 for their referrer!
            </p>
          </div>
        </section>

        {/* Step 3: Subsequent Sales */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="card bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-3xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
              <span className="text-4xl">3️⃣</span> Subsequent Sale Rewards
            </h2>
            <p className="text-orange-700 mb-4">
              Keep earning when your network buys more bundles. The rewards shift to encourage growth:
            </p>
            <ul className="space-y-2 text-orange-700">
              <li>
                <strong>You (Seller):</strong> <span className="text-green-600">60%</span> of the bundle price.
              </li>
              <li>
                <strong>Your Referrer (Passive):</strong> <span className="text-green-600">20%</span> of the bundle price.
              </li>
              <li>
                <strong>Their Referrer (Super Passive):</strong> <span className="text-green-600">10%</span> of the bundle price.
              </li>
            </ul>
            <p className="text-orange-700 mt-4 italic">
              Example: A ₹300 bundle now means ₹180 for you, ₹60 for your referrer, and ₹30 for their referrer!
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135679.png"
              alt="Growth Icon"
              className="w-32 h-32 md:w-48 md:h-48 animate-bounce"
            />
          </div>
        </section>

        {/* Step 4: Build Your Network */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              alt="Network Icon"
              className="w-32 h-32 md:w-48 md:h-48 animate-pulse"
            />
          </div>
          <div className="order-1 md:order-2 card bg-white shadow-xl rounded-2xl p-6">
            <h2 className="text-3xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
              <span className="text-4xl">4️⃣</span> Build Your Network
            </h2>
            <p className="text-orange-700">
              The more people you refer, the bigger your earning potential. Your referrals’ referrals (and beyond) keep the passive income flowing—up to three levels deep!
            </p>
          </div>
        </section>

        {/* Visual Example */}
        <section className="card bg-white shadow-xl rounded-2xl p-6 text-center">
          <h2 className="text-3xl font-semibold text-orange-600 mb-6">See It in Action</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="space-y-4">
              <p className="text-orange-700 font-semibold">First Sale (₹300 Bundle)</p>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-2xl">💰</span>
                <p className="text-orange-700">You: ₹240</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-2xl">➡️</span>
                <p className="text-orange-700">Referrer: ₹30</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-2xl">➡️</span>
                <p className="text-orange-700">Super Referrer: ₹15</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-orange-700 font-semibold">Subsequent Sale (₹300 bundle)</p>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-2xl">💰</span>
                <p className="text-orange-700">You: ₹180</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-2xl">➡️</span>
                <p className="text-orange-700">Referrer: ₹60</p>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-2xl">➡️</span>
                <p className="text-orange-700">Super Referrer: ₹30</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-orange-600 mb-4">Ready to Start Earning?</h2>
          <p className="text-orange-700 mb-6">
            Join now and turn your network into a money-making machine!
          </p>
          <Link
            href="/signup"
            className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300 text-lg px-8 py-3 rounded-full shadow-lg"
          >
            Sign Up Today
          </Link>
        </section>
      </div>

      <Footer />

      {/* Custom CSS for Animations */}
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
