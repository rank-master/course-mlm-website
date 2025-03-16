// src/app/products/bronze/page.tsx
'use client';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function BronzeCourse() {
  return (
    <div className="min-h-screen bg-yellow-50 relative">
      <Navbar />
      {/* Golden Lights */}
      <div className="absolute top-0 left-0 w-full h-20 bg-orange-400 overflow-hidden">
        <div className="lights"></div>
      </div>

      {/* Main Content */}
      <div className="pt-28 pb-8 px-4 sm:px-6 max-w-3xl mx-auto relative z-10">
        <div className="bg-white shadow-xl rounded-xl p-6 border-t-4 border-orange-500">
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
        .lights {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent 10%, #ffd700 20%, transparent 30%);
          background-size: 50px 100%;
          animation: glow 3s infinite linear;
        }
        @keyframes glow {
          0% { background-position: 0 0; }
          100% { background-position: 50px 0; }
        }
      `}</style>
    </div>
  );
}
