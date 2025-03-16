// src/app/products/bronze/page.tsx
'use client';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function BronzeCourse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50 relative overflow-hidden">
      <Navbar />
      {/* Golden Ribbons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="ribbon ribbon-1"></div>
        <div className="ribbon ribbon-2"></div>
        <div className="ribbon ribbon-3"></div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 sm:px-6 max-w-3xl mx-auto relative z-10">
        <div className="bg-white shadow-lg rounded-lg p-8 border-l-8 border-teal-500">
          {/* Title and Price */}
          <h1 className="text-4xl font-extrabold text-teal-600 mb-2">Instagram Growth Bundle (Bronze)</h1>
          <p className="text-3xl font-bold text-pink-500 mb-6">₹100</p>

          {/* Bundle Includes */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">This Bundle Includes:</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-4 h-4 bg-teal-200 rounded-full mt-1"></span>
                <span>Instagram Growth Tips & Tricks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-4 h-4 bg-teal-200 rounded-full mt-1"></span>
                <span>90+ Powerful Set of Hashtags</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-4 h-4 bg-teal-200 rounded-full mt-1"></span>
                <span>75+ Instagram Highlight Covers</span>
              </li>
            </ul>
          </div>

          {/* Buy Now Button */}
          <Link
            href="https://wa.me/+1234567890?text=I%20want%20to%20buy%20the%20Bronze%20Bundle"
            target="_blank"
            className="btn bg-teal-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-teal-600 transition-all mb-6 inline-block shadow-md"
          >
            Buy Now
          </Link>
          <p className="text-sm text-gray-600 mb-8">
            You will be redirected to WhatsApp to complete your purchase.
          </p>

          {/* Key Features */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Key Features:</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-4 h-4 bg-pink-200 rounded-full mt-1"></span>
                <span>Earn by reselling this bundle with our referral system.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-4 h-4 bg-pink-200 rounded-full mt-1"></span>
                <span>Downloadable resources for offline access.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-4 h-4 bg-pink-200 rounded-full mt-1"></span>
                <span>24×7 customer support via WhatsApp.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-4 h-4 bg-pink-200 rounded-full mt-1"></span>
                <span>Proven strategies from industry experts.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />

      {/* Custom CSS for Golden Ribbons */}
      <style jsx>{`
        .ribbon {
          position: absolute;
          width: 200px;
          height: 20px;
          background: linear-gradient(45deg, #ffd700, #ff9800);
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
          transform-origin: center;
          animation: flow 6s infinite ease-in-out;
        }
        .ribbon-1 {
          top: 10%;
          left: -50px;
          transform: rotate(45deg);
          animation-delay: 0s;
        }
        .ribbon-2 {
          top: 50%;
          right: -50px;
          transform: rotate(-30deg);
          animation-delay: 2s;
        }
        .ribbon-3 {
          bottom: 20%;
          left: -50px;
          transform: rotate(60deg);
          animation-delay: 4s;
        }
        @keyframes flow {
          0% { transform: translateX(0) rotate(45deg); opacity: 0.7; }
          50% { transform: translateX(100vw) rotate(45deg); opacity: 1; }
          100% { transform: translateX(0) rotate(45deg); opacity: 0.7; }
        }
        .ribbon-2 { animation-direction: reverse; }
      `}</style>
    </div>
  );
}
