// src/app/products/bronze/page.tsx
'use client';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function BronzeCourse() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <Navbar />
      {/* Golden Flame Animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="flame flame-1"></div>
        <div className="flame flame-2"></div>
        <div className="flame flame-3"></div>
        <div className="spotlight"></div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 sm:px-6 max-w-3xl mx-auto relative z-10">
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl p-6 border border-yellow-500">
          {/* Title and Price */}
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-2 tracking-wide">
            Instagram Growth Bundle (Bronze)
          </h1>
          <p className="text-3xl font-bold text-green-400 mb-6">₹100</p>

          {/* Bundle Includes */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">This Bundle Includes:</h2>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Instagram Growth Tips & Tricks
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                90+ Powerful Set of Hashtags
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                75+ Instagram Highlight Covers
              </li>
            </ul>
          </div>

          {/* Buy Now Button */}
          <Link
            href="https://wa.me/+1234567890?text=I%20want%20to%20buy%20the%20Bronze%20Course"
            target="_blank"
            className="btn bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-6 py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all mb-6 inline-block"
          >
            Buy Now
          </Link>
          <p className="text-sm text-gray-400 mb-8">
            You will be redirected to WhatsApp to complete your purchase.
          </p>

          {/* Key Features */}
          <div>
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">Key Features:</h2>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Earn by reselling this course with our referral system.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Downloadable resources for offline access.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                24×7 customer support via WhatsApp.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Proven strategies from industry experts.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />

      {/* Custom CSS */}
      <style jsx>{`
        .flame {
          position: absolute;
          width: 15px;
          height: 30px;
          background: linear-gradient(to bottom, #ffd700, #ff4500);
          border-radius: 50% 50% 0 0;
          box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.5);
          animation: flicker 4s infinite ease-in-out;
        }
        .flame-1 { top: 10%; left: 15%; animation-delay: 0s; }
        .flame-2 { top: 60%; left: 75%; animation-delay: 1.5s; }
        .flame-3 { top: 80%; left: 40%; animation-delay: 3s; }
        .spotlight {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          animation: pulse 6s infinite ease-in-out;
        }
        @keyframes flicker {
          0%, 100% { transform: translateY(0) scaleY(1); opacity: 0.8; }
          50% { transform: translateY(-20px) scaleY(1.2); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
