// src/app/products/bronze/page.tsx
'use client';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function BronzeCourse() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-200 via-yellow-100 to-red-100 relative overflow-hidden">
      <Navbar />
      {/* Floating Diyas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="diya diya-1"></div>
        <div className="diya diya-2"></div>
        <div className="diya diya-3"></div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 sm:px-6 max-w-3xl mx-auto relative z-10">
        <div className="bg-white shadow-2xl rounded-2xl p-6 border-2 border-orange-400">
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
            className="btn bg-orange-500 text-white hover:bg-orange-600 mb-6 inline-block"
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

      {/* Custom CSS */}
      <style jsx>{`
        .diya {
          position: absolute;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, #ff9800 20%, #ffd700 80%);
          border-radius: 50%;
          box-shadow: 0 0 15px 5px rgba(255, 152, 0, 0.5);
          animation: float 8s infinite ease-in-out;
        }
        .diya-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .diya-2 { top: 50%; left: 70%; animation-delay: 2s; }
        .diya-3 { top: 80%; left: 30%; animation-delay: 4s; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-50px); }
        }
      `}</style>
    </div>
  );
}
