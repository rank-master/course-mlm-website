// src/app/products/bronze/page.tsx
'use client';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function BronzeCourse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-red-200 to-purple-200 relative overflow-hidden">
      <Navbar />
      {/* Golden Sparks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="spark spark-1"></div>
        <div className="spark spark-2"></div>
        <div className="spark spark-3"></div>
        <div className="spark spark-4"></div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 sm:px-6 max-w-3xl mx-auto relative z-10">
        <div className="bg-white shadow-2xl rounded-2xl p-6 border-2 border-yellow-400">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">Instagram Growth Bundle (Bronze)</h1>
          <p className="text-2xl font-extrabold text-orange-800 mb-4">₹100</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-orange-700 mb-2">This Bundle Includes:</h2>
            <ul className="list-disc list-inside text-orange-600">
              <li>Instagram Growth Tips & Tricks</li>
              <li>90+ Powerful Set of Hashtags</li>
              <li>75+ Instagram Highlight Covers</li>
            </ul>
          </div>

          <Link
            href="https://wa.me/+1234567890?text=I%20want%20to%20buy%20the%20Bronze%20Course"
            target="_blank"
            className="btn bg-orange-500 text-white hover:bg-orange-600 mb-6 inline-block px-6 py-2 rounded-lg"
          >
            Buy Now
          </Link>
          <p className="text-sm text-orange-600 mb-6">
            You will be redirected to WhatsApp to complete your purchase.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-orange-700 mb-2">Key Features:</h2>
            <ul className="list-disc list-inside text-orange-600">
              <li>Earn by reselling this course with our referral system.</li>
              <li>Downloadable resources for offline access.</li>
              <li>24×7 customer support via WhatsApp.</li>
              <li>Proven strategies from industry experts.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />

      {/* Custom CSS for Golden Sparks */}
      <style jsx>{`
        .spark {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #ffd700;
          border-radius: 50%;
          box-shadow: 0 0 10px 3px rgba(255, 215, 0, 0.7);
          animation: twinkle 5s infinite ease-in-out;
        }
        .spark-1 { top: 15%; left: 20%; animation-delay: 0s; }
        .spark-2 { top: 40%; left: 60%; animation-delay: 1.5s; }
        .spark-3 { top: 70%; left: 30%; animation-delay: 3s; }
        .spark-4 { top: 25%; left: 80%; animation-delay: 4s; }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
